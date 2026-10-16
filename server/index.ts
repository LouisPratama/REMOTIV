import 'dotenv/config';
import process from 'node:process';
import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { PREMIUM_COURSES } from '../src/data/premiumCourses.ts';

const app = express();
const port = Number(process.env.API_PORT ?? 3002);
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false }
      })
    : null;
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const getUserFromRequest = async (request: Request) => {
  if (!supabaseAdmin) throw new Error('Supabase server credentials are not configured.');
  const authorization = request.header('authorization');
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return null;

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error) return null;
  return data.user;
};

const getConfiguredBaseUrl = () => {
  const configuredUrl = process.env.APP_URL;
  if (!configuredUrl) throw new Error('APP_URL is not configured.');
  return new URL(configuredUrl).origin;
};

const grantCourseAccess = async (userId: string, courseId: string, checkoutSessionId: string) => {
  if (!supabaseAdmin) throw new Error('Supabase server credentials are not configured.');
  const { error } = await supabaseAdmin.from('course_entitlements').upsert(
    {
      user_id: userId,
      course_id: courseId,
      stripe_checkout_session_id: checkoutSessionId
    },
    { onConflict: 'user_id,course_id' }
  );
  if (error) throw error;
};

const isValidTutorSchedule = (schedule: unknown): schedule is string => {
  if (typeof schedule !== 'string' || !/^\d{4}-\d{2}-\d{2}\|(10:00|13:00|16:00|19:00)$/.test(schedule)) {
    return false;
  }

  const [date, time] = schedule.split('|');
  const parsedDate = new Date(`${date}T00:00:00.000Z`);
  if (
    !Number.isFinite(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  ) {
    return false;
  }
  const scheduledAt = new Date(`${date}T${time}:00+07:00`);
  return Number.isFinite(scheduledAt.getTime()) && scheduledAt.getTime() > Date.now();
};

const grantTutorSession = async (
  userId: string,
  courseId: string,
  checkoutSessionId: string,
  scheduledAt: string
) => {
  if (!supabaseAdmin) throw new Error('Supabase server credentials are not configured.');
  const { error } = await supabaseAdmin.from('course_tutor_sessions').upsert(
    {
      user_id: userId,
      course_id: courseId,
      stripe_checkout_session_id: checkoutSessionId,
      scheduled_at: scheduledAt
    },
    { onConflict: 'stripe_checkout_session_id' }
  );
  if (error) throw error;
};

app.post(
  '/api/stripe/webhook',
  express.raw({ type: 'application/json' }),
  async (request: Request, response: Response) => {
    if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
      response.status(503).json({ error: 'Stripe webhook is not configured.' });
      return;
    }

    let event: Stripe.Event;
    try {
      const signature = request.header('stripe-signature');
      if (!signature) {
        response.status(400).json({ error: 'Missing Stripe signature.' });
        return;
      }
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error('Stripe webhook signature validation failed:', error);
      response.status(400).json({ error: 'Invalid Stripe webhook signature.' });
      return;
    }

    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded'
    ) {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.supabase_user_id;
      const courseId = session.metadata?.course_id;
      const course = courseId ? PREMIUM_COURSES[courseId] : undefined;
      const tutorSchedule = session.metadata?.tutor_schedule;
      if (
        session.payment_status === 'paid' &&
        session.mode === 'payment' &&
        session.status === 'complete' &&
        session.currency === 'idr' &&
        courseId &&
        course &&
        session.amount_total === course.price &&
        userId
      ) {
        try {
          await grantCourseAccess(userId, courseId, session.id);
          if (tutorSchedule !== undefined) {
            if (!isValidTutorSchedule(tutorSchedule)) {
              response.status(400).json({ error: 'Invalid tutor schedule in Stripe metadata.' });
              return;
            }
            await grantTutorSession(userId, courseId, session.id, tutorSchedule);
          }
        } catch (error) {
          console.error('Could not save paid course access and tutor session:', error);
          response.status(500).json({ error: 'Could not save course access and tutor session.' });
          return;
        }
      }
    }

    response.json({ received: true });
  }
);

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/courses/entitlements', async (request, response) => {
  try {
    if (!supabaseAdmin) {
      response.status(503).json({ error: 'Supabase belum dikonfigurasi di server.' });
      return;
    }
    const user = await getUserFromRequest(request);
    if (!user) {
      response.status(401).json({ error: 'Silakan masuk terlebih dahulu.' });
      return;
    }
    const { data, error } = await supabaseAdmin
      .from('course_entitlements')
      .select('course_id')
      .eq('user_id', user.id);
    if (error) throw error;

    const { data: tutorSessions, error: tutorSessionsError } = await supabaseAdmin
      .from('course_tutor_sessions')
      .select('course_id, scheduled_at')
      .eq('user_id', user.id);
    if (tutorSessionsError) throw tutorSessionsError;

    response.json({
      courseIds: data.map((row) => row.course_id),
      tutorSessions: tutorSessions.map((session) => ({
        courseId: session.course_id,
        scheduledAt: session.scheduled_at
      }))
    });
  } catch (error) {
    console.error('Could not load course entitlements:', error);
    response.status(500).json({ error: 'Gagal memuat akses pelatihan.' });
  }
});

app.post('/api/stripe/checkout-session', async (request, response) => {
  try {
    if (!supabaseAdmin || !stripe) {
      response.status(503).json({ error: 'Supabase atau Stripe belum dikonfigurasi di server.' });
      return;
    }
    const user = await getUserFromRequest(request);
    if (!user) {
      response.status(401).json({ error: 'Masuk dengan akun terlebih dahulu untuk membeli kelas.' });
      return;
    }
    const { courseId, tutorSchedule } = request.body as {
      courseId?: unknown;
      tutorSchedule?: unknown;
    };
    if (typeof courseId !== 'string' || !PREMIUM_COURSES[courseId]) {
      response.status(400).json({ error: 'Pelatihan premium tidak valid.' });
      return;
    }
    if (tutorSchedule !== undefined && !isValidTutorSchedule(tutorSchedule)) {
      response.status(400).json({ error: 'Pilih jadwal tutor Zoom yang masih tersedia.' });
      return;
    }

    const course = PREMIUM_COURSES[courseId];
    const baseUrl = getConfiguredBaseUrl();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: user.email ?? undefined,
      line_items: [
        {
          price_data: {
            currency: 'idr',
            product_data: { name: course.title },
            unit_amount: course.price
          },
          quantity: 1
        }
      ],
      metadata: {
        supabase_user_id: user.id,
        course_id: courseId,
        ...(typeof tutorSchedule === 'string' ? { tutor_schedule: tutorSchedule } : {})
      },
      success_url: `${baseUrl}/?payment=success&course_id=${encodeURIComponent(courseId)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?payment=cancel&course_id=${encodeURIComponent(courseId)}`
    });

    if (!session.url) throw new Error('Stripe did not return a checkout URL.');
    response.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Could not create Stripe Checkout session:', error);
    response.status(500).json({ error: 'Tidak dapat memulai pembayaran. Silakan coba lagi.' });
  }
});

app.post('/api/stripe/verify-session', async (request, response) => {
  try {
    if (!supabaseAdmin || !stripe) {
      response.status(503).json({ error: 'Supabase atau Stripe belum dikonfigurasi di server.' });
      return;
    }
    const user = await getUserFromRequest(request);
    if (!user) {
      response.status(401).json({ error: 'Silakan masuk kembali untuk memverifikasi pembayaran.' });
      return;
    }
    const { sessionId } = request.body as { sessionId?: unknown };
    if (typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
      response.status(400).json({ error: 'Sesi pembayaran tidak valid.' });
      return;
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const courseId = session.metadata?.course_id;
    const course = courseId ? PREMIUM_COURSES[courseId] : undefined;
    const tutorSchedule = session.metadata?.tutor_schedule;
    if (
      session.payment_status !== 'paid' ||
      session.mode !== 'payment' ||
      session.status !== 'complete' ||
      session.metadata?.supabase_user_id !== user.id ||
      !courseId ||
      !course ||
      session.currency !== 'idr' ||
      session.amount_total !== course.price
    ) {
      response.status(403).json({ error: 'Pembayaran belum terverifikasi untuk akun ini.' });
      return;
    }

    await grantCourseAccess(user.id, courseId, session.id);
    if (tutorSchedule !== undefined) {
      if (!isValidTutorSchedule(tutorSchedule)) {
        response.status(403).json({ error: 'Jadwal tutor pada sesi pembayaran tidak valid.' });
        return;
      }
      await grantTutorSession(user.id, courseId, session.id, tutorSchedule);
    }
    response.json({ courseId, tutorSchedule });
  } catch (error) {
    console.error('Could not verify Stripe Checkout session:', error);
    response.status(500).json({ error: 'Verifikasi pembayaran gagal. Silakan muat ulang halaman.' });
  }
});

app.listen(port, () => {
  console.log(`Remotiv payment API listening on port ${port}`);
});

import React, { useState, useEffect, useCallback } from 'react';
import type { User } from '@supabase/supabase-js';
import {
  Job,
  Course,
  CommunityPost,
  UserProfile,
  JobApplication,
  UserAccount,
  ActiveRole,
  ActiveTab,
  JobCategory,
  JobType
} from './types';
import {
  INITIAL_JOBS,
  INITIAL_COURSES,
  INITIAL_COMMUNITY_POSTS,
  DEFAULT_USER_PROFILE
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { JobList } from './components/JobList';
import { JobDetailModal } from './components/JobDetailModal';
import { PostJobModal } from './components/PostJobModal';
import { CoursesView } from './components/CoursesView';
import { CommunityView } from './components/CommunityView';
import { ProfileView } from './components/ProfileView';
import { CompanyDashboardView } from './components/CompanyDashboardView';
import { RegistrationModal } from './components/RegistrationModal';
import { Footer } from './components/Footer';
import { supabase } from './lib/supabase';
import { CareerTestModal } from './components/CareerTestModal';
import { LandingPage } from './components/LandingPage';

export default function App() {
  // Registration & Session State
  const [currentAccount, setCurrentAccount] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('remotiv_user_account');
    return saved ? JSON.parse(saved) : null;
  });

  // Modal Registration is open on start if no account is found!
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  const [activeRole, setActiveRole] = useState<ActiveRole>(() => {
    const saved = localStorage.getItem('remotiv_user_account');
    if (saved) {
      const acc = JSON.parse(saved);
      return acc.role;
    }
    return 'guest';
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('beranda');

  // Core Data Lists
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('remotiv_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('remotiv_applications');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'app-sample-1',
        jobId: 'job-1',
        jobTitle: 'Admin Chat & Customer Support Toko Online',
        companyName: 'Batik Lestari Nusantara',
        applicantName: DEFAULT_USER_PROFILE.name,
        applicantEmail: DEFAULT_USER_PROFILE.email,
        applicantPhone: DEFAULT_USER_PROFILE.phone,
        applicantPersona: DEFAULT_USER_PROFILE.persona,
        coverNote:
          'Saya terbiasa membalas WhatsApp dengan cepat dan ramah, serta sudah menyelesaikan modul dasar CS Remotiv.',
        portfolioUrl: DEFAULT_USER_PROFILE.portfolioLink,
        status: 'Ditinjau',
        appliedAt: 'Kemarin'
      }
    ];
  });

  const [courses] = useState<Course[]>(INITIAL_COURSES);
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('remotiv_completed_lessons');
    return saved ? JSON.parse(saved) : ['c1-l1', 'c2-l1'];
  });

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('remotiv_posts');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_POSTS;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('remotiv_profile');
    return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
  });

  // Filters for Jobs
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>('Semua Kategori');
  const [selectedJobType, setSelectedJobType] = useState<JobType>('Semua Tipe');
  const [selectedAudience, setSelectedAudience] = useState<string>('all');

  // Modals
  const [selectedJobForModal, setSelectedJobForModal] = useState<Job | null>(null);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isCareerTestOpen, setIsCareerTestOpen] = useState(false);
  const [recommendedCourseId, setRecommendedCourseId] = useState<string | null>(null);

  // Persistence
  useEffect(() => {
    if (currentAccount) {
      localStorage.setItem('remotiv_user_account', JSON.stringify(currentAccount));
    } else {
      localStorage.removeItem('remotiv_user_account');
    }
  }, [currentAccount]);

  useEffect(() => {
    localStorage.setItem('remotiv_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('remotiv_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('remotiv_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('remotiv_posts', JSON.stringify(communityPosts));
  }, [communityPosts]);

  useEffect(() => {
    localStorage.setItem('remotiv_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Auth / Registration Handlers
  const handleRegister = (account: UserAccount) => {
    setCurrentAccount(account);
    setActiveRole(account.role);
    setIsRegisterOpen(false);

    if (account.role === 'seeker') {
      setUserProfile((prev) => ({
        ...prev,
        name: account.name,
        email: account.email,
        phone: account.phone,
        persona: (account.subRole as any) || 'Ibu Rumah Tangga'
      }));
      setActiveTab('lowongan');
    } else {
      setUserProfile((prev) => ({
        ...prev,
        name: account.name,
        email: account.email,
        phone: account.phone
      }));
      setActiveTab('kelola-lowongan');
    }
  };

  const handleContinueAsGuest = () => {
    void supabase?.auth.signOut();
    setCurrentAccount(null);
    setActiveRole('guest');
    setIsRegisterOpen(false);
  };

  const handleLogout = () => {
    void supabase?.auth.signOut();
    setCurrentAccount(null);
    setActiveRole('guest');
    setIsRegisterOpen(true);
  };

  const handleSupabaseAuthChange = useCallback((user: User | null) => {
    if (!user) {
      setCurrentAccount(null);
      setActiveRole('guest');
      return;
    }

    const account: UserAccount = {
      id: user.id,
      name:
        typeof user.user_metadata.full_name === 'string'
          ? user.user_metadata.full_name
          : user.email ?? 'Pengguna Remotiv',
      email: user.email ?? '',
      phone: typeof user.user_metadata.phone === 'string' ? user.user_metadata.phone : '',
      role: 'seeker',
      subRole: 'Pencari Kerja'
    };

    setCurrentAccount(account);
    setActiveRole('seeker');
    setUserProfile((profile) => ({
      ...profile,
      id: user.id,
      name: account.name,
      email: account.email,
      phone: account.phone
    }));
  }, []);

  // Job Application Flow
  const handleApplyJob = (
    jobId: string,
    appData: { coverNote: string; phone: string; portfolioUrl: string }
  ) => {
    const targetJob = jobs.find((j) => j.id === jobId);
    if (!targetJob) return;

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: targetJob.title,
      companyName: targetJob.companyName,
      applicantName: userProfile.name,
      applicantEmail: userProfile.email,
      applicantPhone: appData.phone || userProfile.phone,
      applicantPersona: userProfile.persona,
      coverNote: appData.coverNote,
      portfolioUrl: appData.portfolioUrl,
      status: 'Terkirim',
      appliedAt: 'Baru saja'
    };

    setApplications((prev) => [newApp, ...prev]);
  };

  const handleToggleLesson = (lessonId: string) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  const handleAddPost = (newPostData: Omit<CommunityPost, 'id' | 'likes' | 'comments' | 'createdAt'>) => {
    const created: CommunityPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      likes: 1,
      isLiked: true,
      comments: [],
      createdAt: 'Baru saja'
    };
    setCommunityPosts((prev) => [created, ...prev]);
  };

  const handleAddComment = (postId: string, text: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: `com-${Date.now()}`,
                authorName: userProfile.name,
                authorPersona: userProfile.persona,
                content: text,
                createdAt: 'Baru saja'
              }
            ]
          };
        }
        return post;
      })
    );
  };

  const handleToggleLike = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const nextIsLiked = !post.isLiked;
          return {
            ...post,
            isLiked: nextIsLiked,
            likes: nextIsLiked ? post.likes + 1 : Math.max(0, post.likes - 1)
          };
        }
        return post;
      })
    );
  };

  const handleJobCreated = (newJob: Job) => {
    setJobs((prev) => [newJob, ...prev]);
    setActiveTab('lowongan');
  };

  const handleUpdateAppStatus = (appId: string, newStatus: JobApplication['status']) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
    );
  };

  // Filter computation
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Semua Kategori' || job.category === selectedCategory;

    const matchesJobType =
      selectedJobType === 'Semua Tipe' || job.jobType === selectedJobType;

    const matchesAudience =
      selectedAudience === 'all' ||
      job.targetAudience.includes(selectedAudience as any);

    return matchesSearch && matchesCategory && matchesJobType && matchesAudience;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Semua Kategori');
    setSelectedJobType('Semua Tipe');
    setSelectedAudience('all');
  };

  const userHasApplied = (jobId: string) => {
    return applications.some((a) => a.jobId === jobId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-sky-50/50 text-neutral-900 font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeRole={activeRole}
        currentAccount={currentAccount}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenPostJob={() => {
          if (activeRole === 'guest') {
            setIsRegisterOpen(true);
            return;
          }
          setIsPostJobModalOpen(true);
        }}
        onLogout={handleLogout}
        onOpenCareerTest={() => setIsCareerTestOpen(true)}
        applicationCount={applications.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'beranda' && (
          <LandingPage
            jobs={jobs}
            courses={courses}
            onBrowseJobs={() => setActiveTab('lowongan')}
            onBrowseCourses={() => setActiveTab('pelatihan')}
            onRegister={() => setIsRegisterOpen(true)}
          />
        )}

        {activeTab === 'lowongan' && (
          <>
            <HeroSection
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedAudience={selectedAudience}
              setSelectedAudience={setSelectedAudience}
              totalJobs={jobs.length}
            />
            <JobList
              jobs={filteredJobs}
              onSelectJob={(job) => setSelectedJobForModal(job)}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedJobType={selectedJobType}
              setSelectedJobType={setSelectedJobType}
              onClearFilters={clearFilters}
            />
          </>
        )}

        {activeTab === 'pelatihan' && (
          <CoursesView
            courses={courses}
            completedLessons={completedLessons}
            onToggleLesson={handleToggleLesson}
            onAuthChange={handleSupabaseAuthChange}
            initialCourseId={recommendedCourseId}
            onInitialCourseHandled={() => setRecommendedCourseId(null)}
          />
        )}

        {activeTab === 'komunitas' && (
          <CommunityView
            posts={communityPosts}
            onAddPost={handleAddPost}
            onAddComment={handleAddComment}
            onToggleLike={handleToggleLike}
            currentUser={userProfile}
          />
        )}

        {activeTab === 'profil' && (
          <ProfileView
            profile={userProfile}
            onUpdateProfile={setUserProfile}
            applications={applications}
          />
        )}

        {activeTab === 'kelola-lowongan' && (
          <CompanyDashboardView
            jobs={jobs.filter((j) => j.employerId === currentAccount?.id)}
            applications={applications.filter((application) =>
              jobs.some((job) => job.id === application.jobId && job.employerId === currentAccount?.id)
            )}
            onOpenPostJob={() => setIsPostJobModalOpen(true)}
            onUpdateAppStatus={handleUpdateAppStatus}
          />
        )}
      </main>

      {/* Registration Modal Gate */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onRegister={handleRegister}
        onContinueAsGuest={handleContinueAsGuest}
      />

      {/* Job Detail & Application Modal */}
      {selectedJobForModal && (
        <JobDetailModal
          job={selectedJobForModal}
          onClose={() => setSelectedJobForModal(null)}
          currentUser={userProfile}
          activeRole={activeRole}
          onApply={handleApplyJob}
          hasApplied={userHasApplied(selectedJobForModal.id)}
          onTriggerRegister={() => setIsRegisterOpen(true)}
        />
      )}

      {/* Post Job Modal for UMKM */}
      {isPostJobModalOpen && (
        <PostJobModal
          onClose={() => setIsPostJobModalOpen(false)}
          onJobCreated={handleJobCreated}
          employerId={currentAccount?.id ?? 'emp-custom'}
          initialCompanyName={currentAccount?.companyName ?? ''}
        />
      )}

      {isCareerTestOpen && (
        <CareerTestModal
          jobs={jobs}
          courses={courses}
          onClose={() => setIsCareerTestOpen(false)}
          onSelectJob={(job) => {
            setIsCareerTestOpen(false);
            setSelectedJobForModal(job);
          }}
          onSelectCourse={(course) => {
            setIsCareerTestOpen(false);
            setRecommendedCourseId(course.id);
            setActiveTab('pelatihan');
          }}
        />
      )}

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

import React, { useState } from 'react';
import { CommunityPost, UserProfile } from '../types';
import { MessageSquare, Heart, PlusCircle, Send, X, Users } from 'lucide-react';

interface CommunityViewProps {
  posts: CommunityPost[];
  onAddPost: (post: Omit<CommunityPost, 'id' | 'likes' | 'comments' | 'createdAt'>) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onToggleLike: (postId: string) => void;
  currentUser: UserProfile;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  posts,
  onAddPost,
  onAddComment,
  onToggleLike,
  currentUser
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<CommunityPost['category']>('Tanya Komunitas');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  const categories = [
    'Semua',
    'Tips & Manajemen Waktu',
    'Tanya Komunitas',
    'Cerita Berhasil',
    'Peluang & Kolaborasi'
  ];

  const filteredPosts =
    selectedCategory === 'Semua'
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    onAddPost({
      authorName: currentUser.name,
      authorPersona: currentUser.headline || 'Anggota Komunitas Remotiv',
      category: newCategory,
      title: newTitle,
      content: newContent
    });

    setNewTitle('');
    setNewContent('');
    setShowCreateModal(false);
  };

  const handleSendComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    onAddComment(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-800 bg-sky-100/80 px-2.5 py-1 rounded mb-2">
            <Users className="w-3.5 h-3.5 text-sky-600" />
            <span>Ruang Diskusi & Dukungan</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            Diskusi Komunitas Kerja Remote
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
            Berbagi pengalaman, tips membagi waktu, dan tanya jawab ramah pemula.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tulis Cerita / Pertanyaan</span>
        </button>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Discussion List */}
      <div className="space-y-4 max-w-3xl">
        {filteredPosts.map((post) => {
          const isCommentsOpen = expandedComments[post.id];

          return (
            <article
              key={post.id}
              className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs hover:border-sky-300 transition-all"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-neutral-900">{post.authorName}</span>
                    <span aria-hidden="true" className="text-neutral-300">·</span>
                    <span className="text-neutral-500">{post.authorPersona}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                    <span className="text-sky-600 font-medium">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Title & Content */}
              <h3 className="text-sm font-bold text-neutral-900 mt-1 mb-1 leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-neutral-700 leading-relaxed whitespace-pre-line mb-3">
                {post.content}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-4 text-xs text-neutral-500 pt-3 border-t border-neutral-100">
                <button
                  onClick={() => onToggleLike(post.id)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors cursor-pointer ${
                    post.isLiked
                      ? 'text-rose-600 bg-rose-50 font-semibold'
                      : 'hover:text-neutral-800 hover:bg-neutral-50'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-rose-600' : ''}`} />
                  <span>{post.likes} Suka</span>
                </button>

                <button
                  onClick={() =>
                    setExpandedComments((prev) => ({ ...prev, [post.id]: !prev[post.id] }))
                  }
                  className="flex items-center gap-1.5 px-2 py-1 rounded hover:text-neutral-800 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.comments.length} Tanggapan</span>
                </button>
              </div>

              {/* Comments Section */}
              {isCommentsOpen && (
                <div className="mt-3.5 pt-3 border-t border-neutral-100 space-y-2.5 bg-neutral-50 p-3 rounded-xl text-xs">
                  <div className="space-y-2">
                    {post.comments.length === 0 ? (
                      <p className="text-neutral-400 italic">
                        Belum ada tanggapan. Jadilah yang pertama memberikan masukan!
                      </p>
                    ) : (
                      post.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-white p-2.5 rounded-lg border border-neutral-200"
                        >
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="font-semibold text-neutral-800">
                              {comment.authorName}
                            </span>
                            <span className="text-neutral-400">{comment.createdAt}</span>
                          </div>
                          <p className="text-neutral-700 leading-relaxed">{comment.content}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Comment Input */}
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Tulis tanggapan santai..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSendComment(post.id);
                        }
                      }}
                      className="flex-1 p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500 text-xs"
                    />
                    <button
                      onClick={() => handleSendComment(post.id)}
                      className="px-3 py-1.5 font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors shrink-0 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-sky-100 overflow-hidden">
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-sky-50">
              <h3 className="font-bold text-neutral-900 text-sm">
                Tulis Cerita atau Pertanyaan
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Kategori
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
                >
                  <option value="Tanya Komunitas">Tanya Komunitas</option>
                  <option value="Tips & Manajemen Waktu">Tips & Manajemen Waktu</option>
                  <option value="Cerita Berhasil">Cerita Berhasil</option>
                  <option value="Peluang & Kolaborasi">Peluang & Kolaborasi</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Judul Topik *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Tips bagi waktu saat anak sedang sekolah..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Isi Tulisan *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ceritakan pengalaman Anda atau tanyakan yang ingin Anda ketahui..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  Terbitkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

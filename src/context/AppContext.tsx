import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  PostComment,
  ContentReport,
  NotificationItem,
  FontPreference,
  ThemePreference,
  UserRole,
  ArenaAnnouncement,
  VerificationTier,
  VerificationAuditLog
} from '../types';
import { PRIVATE_UNIVERSITIES, PrivateUniversity } from '../data/universities';
import { INITIAL_POSTS, MockPost, PostCategory } from '../data/posts';
import { INITIAL_CIVYN_OPPORTUNITIES, CivynOpportunity } from '../data/civyn';
import { INITIAL_PRODUCTS, StoreProduct } from '../data/store';
import { ACADEMIC_TUTORIALS, KNOWLEDGE_DIRECTORY, AcademicTutorial, UniversityKnowledgeEntry } from '../data/academics';
import { COLLEGIATE_RANKINGS, ARENA_TOURNAMENTS, CollegiateRanking, ArenaTournament } from '../data/arena';
import { INITIAL_EVENTS, CampusEvent } from '../data/events';

interface AppContextType {
  // Theme & Font
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  font: FontPreference;
  setFont: (font: FontPreference) => void;

  // User Profile & Onboarding
  currentUser: UserProfile | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  onboardUser: (userData: Partial<UserProfile>) => void;
  signOut: () => void;
  showWelcomeModal: boolean;
  setShowWelcomeModal: (show: boolean) => void;
  authModalType: 'login' | 'signup' | null;
  setAuthModalType: (type: 'login' | 'signup' | null) => void;

  // Universities
  universities: PrivateUniversity[];
  selectedUniversityId: string;
  setSelectedUniversityId: (id: string) => void;
  selectedUniversity: PrivateUniversity | undefined;

  // Posts & Interactions
  posts: MockPost[];
  createPost: (content: string, category: PostCategory, universityId?: string, quotedPost?: MockPost) => MockPost;
  editPost: (postId: string, newContent: string) => void;
  deletePost: (postId: string) => void;
  toggleLikePost: (postId: string) => void;
  toggleBookmarkPost: (postId: string) => void;
  repostPost: (postId: string, quoteText?: string) => void;
  
  // Comments
  comments: Record<string, PostComment[]>;
  addComment: (postId: string, content: string) => void;
  getCommentsForPost: (postId: string) => PostComment[];

  // CIVYN Opportunities
  opportunities: CivynOpportunity[];
  toggleBookmarkOpportunity: (id: string) => void;
  createOpportunity: (data: Omit<CivynOpportunity, 'id' | 'createdAt'>) => void;
  deleteOpportunity: (id: string) => void;

  // Store & Products
  products: StoreProduct[];
  createProduct: (data: Omit<StoreProduct, 'id' | 'createdAt'>) => void;
  toggleProductAvailability: (id: string) => void;

  // Academics & Knowledge
  tutorials: AcademicTutorial[];
  academicResources: AcademicTutorial[];
  knowledgeDirectory: UniversityKnowledgeEntry[];
  knowledgeEntries: UniversityKnowledgeEntry[];
  events: CampusEvent[];

  // Univyx Arena
  rankings: CollegiateRanking[];
  tournaments: ArenaTournament[];
  arenaAnnouncements: ArenaAnnouncement[];
  stores: { id: string; name: string; description: string; vendorName: string; universityName: string }[];
  arenaWaitlistJoined: boolean;
  joinArenaWaitlist: (email: string) => void;

  // Content Moderation & Reports
  reports: ContentReport[];
  submitReport: (contentId: string, contentType: 'post' | 'comment' | 'opportunity' | 'product' | 'user', reason: string, snippet: string) => void;
  resolveReport: (reportId: string, status: 'dismissed' | 'action_taken', notes?: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;

  // Shell Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  isComposerOpen: boolean;
  setIsComposerOpen: (open: boolean) => void;
  selectedPostForDetail: MockPost | null;
  setSelectedPostForDetail: (post: MockPost | null) => void;

  // Hidden Admin Panel State (Accessible only via /admin/login URL)
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;
  adminPath: string;
  setAdminPath: (path: string) => void;

  // Verification System
  verificationLogs: VerificationAuditLog[];
  setVerificationTierForUser: (userId: string, tier: VerificationTier, reason: string) => void;
  gainFollowers: (count: number) => void;

  // Toasts
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const DEFAULT_USER: UserProfile = {
  id: 'usr-chidi',
  fullName: 'Chidi Okafor',
  full_name: 'Chidi Okafor',
  username: 'chidi_cu',
  email: 'chidi.okafor@stu.cu.edu.ng',
  bio: 'Software Engineering scholar @ Covenant University · Building campus tech & decentralised student tools.',
  universityId: 'covenant',
  university_id: 'covenant',
  universityName: 'Covenant University',
  university_name: 'Covenant University',
  faculty: 'College of Science & Technology',
  department: 'Computer & Information Sciences',
  academicLevel: '400L',
  academic_level: '400L',
  interests: ['Technology', 'Academics', 'Campus Gist', 'Collegiate Gaming'],
  isVerified: false,
  is_verified: false,
  verificationTier: 'none',
  verification_tier: 'none',
  role: 'user',
  createdAt: '2026-01-15T09:00:00Z',
  created_at: '2026-01-15T09:00:00Z',
  postsCount: 12,
  posts_count: 12,
  followersCount: 742,
  followers_count: 742,
  followingCount: 185,
  following_count: 185
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setThemeState] = useState<ThemePreference>(() => {
    return (localStorage.getItem('univyx_theme') as ThemePreference) || 'system';
  });

  // Font state
  const [font, setFontState] = useState<FontPreference>(() => {
    return (localStorage.getItem('univyx_font') as FontPreference) || 'jakarta';
  });

  // Current User
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('univyx_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  // Welcome modal and Auth states
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(() => {
    return localStorage.getItem('univyx_welcomed') !== 'true';
  });
  const [authModalType, setAuthModalType] = useState<'login' | 'signup' | null>(null);

  // University selector
  const [universities] = useState<PrivateUniversity[]>(PRIVATE_UNIVERSITIES);
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>('all');

  // Navigation
  const [activeTab, setActiveTabState] = useState<string>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [selectedPostForDetail, setSelectedPostForDetail] = useState<MockPost | null>(null);

  // Hidden Admin Panel state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('univyx_admin_auth') === 'true';
  });
  const [adminPath, setAdminPath] = useState<string>('overview');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Data Entities
  const [posts, setPosts] = useState<MockPost[]>(() => {
    const saved = localStorage.getItem('univyx_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [comments, setComments] = useState<Record<string, PostComment[]>>(() => {
    const saved = localStorage.getItem('univyx_comments');
    if (saved) return JSON.parse(saved);
    return {
      'post-1': [
        {
          id: 'comm-1',
          postId: 'post-1',
          authorId: 'usr-korede',
          authorName: 'Korede Balogun',
          username: 'korede_babcock',
          verificationTier: 'blue',
          verification_tier: 'blue',
          universityName: 'Babcock University',
          content: 'Huge congratulations Chidi! The CST faculty projects this year are setting national standards.',
          likesCount: 14,
          isLiked: false,
          createdAt: '2026-10-16T11:45:00Z'
        },
        {
          id: 'comm-2',
          postId: 'post-1',
          authorId: 'usr-cst-council',
          authorName: 'CST Student Council',
          username: 'cst_council',
          verificationTier: 'gold',
          verification_tier: 'gold',
          universityName: 'Covenant University',
          content: 'Exemplary project presentation! The council is proud to have CST scholars driving software innovation.',
          likesCount: 29,
          isLiked: true,
          createdAt: '2026-10-16T11:50:00Z'
        },
        {
          id: 'comm-3',
          postId: 'post-1',
          authorId: 'usr-tobi',
          authorName: 'Tobi Adebayo',
          username: 'tobi_adebayo',
          verificationTier: 'none',
          verification_tier: 'none',
          universityName: 'Babcock University',
          content: 'Solid work bro! Looking forward to seeing your live demo at the inter-varsity expo.',
          likesCount: 5,
          isLiked: false,
          createdAt: '2026-10-16T11:55:00Z'
        }
      ],
      'post-official-cu': [
        {
          id: 'comm-4',
          postId: 'post-official-cu',
          authorId: 'usr-zainab',
          authorName: 'Zainab Al-Hassan',
          username: 'zainab_nile',
          verificationTier: 'blue',
          verification_tier: 'blue',
          universityName: 'Nile University of Nigeria',
          content: 'Noted with thanks. Sharing this with our collegiate academic liaisons.',
          likesCount: 12,
          isLiked: false,
          createdAt: '2026-10-16T12:15:00Z'
        }
      ]
    };
  });

  const [verificationLogs, setVerificationLogs] = useState<VerificationAuditLog[]>(() => {
    const saved = localStorage.getItem('univyx_verification_logs');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'val-1',
        userId: 'usr-pulse',
        username: 'univyx_official',
        oldTier: 'none',
        newTier: 'gold',
        adminId: 'adm-super',
        adminUsername: 'superadmin@univyx.ng',
        reason: 'Official Univyx collegiate announcement & platform operations channel',
        createdAt: '2026-01-01T00:00:00Z'
      },
      {
        id: 'val-2',
        userId: 'usr-covenant-admin',
        username: 'covenant_official',
        oldTier: 'none',
        newTier: 'gold',
        adminId: 'adm-super',
        adminUsername: 'superadmin@univyx.ng',
        reason: 'Verified university administration & senate registry representative',
        createdAt: '2026-02-15T09:30:00Z'
      },
      {
        id: 'val-3',
        userId: 'usr-cst-council',
        username: 'cst_council',
        oldTier: 'none',
        newTier: 'gold',
        adminId: 'adm-super',
        adminUsername: 'superadmin@univyx.ng',
        reason: 'Accredited student faculty association (College of Science & Technology)',
        createdAt: '2026-03-10T14:15:00Z'
      },
      {
        id: 'val-4',
        userId: 'usr-korede',
        username: 'korede_babcock',
        oldTier: 'none',
        newTier: 'blue',
        adminId: 'system',
        adminUsername: 'Univyx Automation Trigger',
        reason: 'Automated achievement: Reached 1,000 collegiate follower milestone',
        createdAt: '2026-10-16T10:45:00Z'
      }
    ];
  });

  const [opportunities, setOpportunities] = useState<CivynOpportunity[]>(() => {
    const saved = localStorage.getItem('univyx_opps');
    return saved ? JSON.parse(saved) : INITIAL_CIVYN_OPPORTUNITIES;
  });

  const [products, setProducts] = useState<StoreProduct[]>(() => {
    const saved = localStorage.getItem('univyx_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [tutorials] = useState<AcademicTutorial[]>(ACADEMIC_TUTORIALS);
  const [knowledgeDirectory] = useState<UniversityKnowledgeEntry[]>(KNOWLEDGE_DIRECTORY);
  const [events] = useState<CampusEvent[]>(INITIAL_EVENTS);
  const [rankings] = useState<CollegiateRanking[]>(COLLEGIATE_RANKINGS);
  const [tournaments] = useState<ArenaTournament[]>(ARENA_TOURNAMENTS);

  const [arenaWaitlistJoined, setArenaWaitlistJoined] = useState<boolean>(() => {
    return localStorage.getItem('univyx_arena_waitlist') === 'true';
  });

  const [reports, setReports] = useState<ContentReport[]>([
    {
      id: 'rep-1',
      reporterUsername: 'zainab_nile',
      contentId: 'post-8',
      contentType: 'product',
      contentSnippet: 'Texas Instruments graphing calculator listing verification',
      reason: 'Check warranty and student ownership serial',
      status: 'pending',
      createdAt: '2026-10-15T19:30:00Z'
    }
  ]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      userId: 'usr-chidi',
      actorName: 'Univyx Campus Pulse',
      actorUsername: 'univyx_official',
      type: 'announcement',
      content: 'The 2026 All-Private Inter-Campus Collegiate Debate motions have been posted in Academics.',
      targetType: 'announcement',
      isRead: false,
      createdAt: '2026-10-16T10:00:00Z'
    },
    {
      id: 'notif-2',
      userId: 'usr-chidi',
      actorName: 'Adedamola Adeleke',
      actorUsername: 'damola_abuad',
      type: 'like',
      content: 'liked your post on College of Science & Tech capstone defense.',
      targetType: 'post',
      isRead: true,
      createdAt: '2026-10-16T11:20:00Z'
    }
  ]);

  // URL hash/pathname listener for /admin/login routing
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path === '/admin/login' || hash === '#/admin/login' || hash === '#admin-login') {
        setActiveTabState('admin_login');
      } else if (path.startsWith('/admin') || hash === '#/admin' || hash === '#admin') {
        if (sessionStorage.getItem('univyx_admin_auth') === 'true') {
          setActiveTabState('admin_panel');
        } else {
          setActiveTabState('admin_login');
        }
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    window.addEventListener('hashchange', handleUrlRoute);
    return () => {
      window.removeEventListener('popstate', handleUrlRoute);
      window.removeEventListener('hashchange', handleUrlRoute);
    };
  }, []);

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    if (tab !== 'post_detail') {
      setSelectedPostForDetail(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast feedback
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  // Theme synchronization
  useEffect(() => {
    localStorage.setItem('univyx_theme', theme);
    const root = document.documentElement;
    const metaTheme = document.getElementById('meta-theme-color');

    const applyDark = (dark: boolean) => {
      if (dark) {
        root.classList.add('dark');
        if (metaTheme) metaTheme.setAttribute('content', '#0A0A0A');
      } else {
        root.classList.remove('dark');
        if (metaTheme) metaTheme.setAttribute('content', '#FFFFFF');
      }
    };

    if (theme === 'dark') {
      applyDark(true);
    } else if (theme === 'light') {
      applyDark(false);
    } else {
      // System mode
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      applyDark(mql.matches);

      const listener = (e: MediaQueryListEvent) => applyDark(e.matches);
      mql.addEventListener('change', listener);
      return () => mql.removeEventListener('change', listener);
    }
  }, [theme]);

  const setTheme = (t: ThemePreference) => {
    setThemeState(t);
    showToast(`Theme updated to ${t.charAt(0).toUpperCase() + t.slice(1)}`);
  };

  // Font synchronization
  useEffect(() => {
    localStorage.setItem('univyx_font', font);
    document.documentElement.setAttribute('data-font', font);
  }, [font]);

  const setFont = (f: FontPreference) => {
    setFontState(f);
    showToast(`Typography set to ${f.charAt(0).toUpperCase() + f.slice(1)}`);
  };

  // Persist State
  useEffect(() => {
    localStorage.setItem('univyx_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('univyx_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('univyx_opps', JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem('univyx_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('univyx_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const selectedUniversity = universities.find((u) => u.id === selectedUniversityId);

  // User Onboarding & Auth
  const onboardUser = (userData: Partial<UserProfile>) => {
    const uni = universities.find((u) => u.id === userData.universityId) || universities[0];
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: userData.fullName || 'Scholar',
      username: userData.username || `scholar_${Date.now().toString().slice(-4)}`,
      email: userData.email || '',
      universityId: uni.id,
      universityName: uni.name,
      faculty: userData.faculty || 'Sciences',
      department: userData.department || 'Computer Science',
      academicLevel: userData.academicLevel || '200L',
      interests: userData.interests || ['Academics', 'Tech'],
      isVerified: true,
      role: 'user',
      createdAt: new Date().toISOString(),
      postsCount: 0,
      followersCount: 15,
      followingCount: 30
    };

    setCurrentUser(newUser);
    localStorage.setItem('univyx_welcomed', 'true');
    setShowWelcomeModal(false);
    setAuthModalType(null);
    showToast(`Welcome to Univyx, ${newUser.fullName}!`);
  };

  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('univyx_user');
    setIsDrawerOpen(false);
    showToast('Signed out of Univyx');
  };

  // Post Actions
  const createPost = (
    content: string,
    category: PostCategory,
    universityId?: string,
    quotedPost?: MockPost
  ): MockPost => {
    if (!currentUser) throw new Error('Sign in required to post');

    const uId = universityId || (selectedUniversityId !== 'all' ? selectedUniversityId : currentUser.universityId);
    const uObj = universities.find((u) => u.id === uId);

    const newPost: MockPost = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.fullName,
      verificationTier: currentUser.verificationTier || currentUser.verification_tier || 'none',
      verification_tier: currentUser.verificationTier || currentUser.verification_tier || 'none',
      author: {
        id: currentUser.id,
        fullName: currentUser.fullName,
        full_name: currentUser.fullName,
        username: currentUser.username,
        isVerified: (currentUser.verificationTier === 'blue' || currentUser.verificationTier === 'gold'),
        is_verified: (currentUser.verificationTier === 'blue' || currentUser.verificationTier === 'gold'),
        verificationTier: currentUser.verificationTier || currentUser.verification_tier || 'none',
        verification_tier: currentUser.verificationTier || currentUser.verification_tier || 'none',
        universityName: uObj?.name || currentUser.universityName,
        university_name: uObj?.name || currentUser.universityName
      },
      username: currentUser.username,
      universityId: uId,
      universityName: uObj?.name || currentUser.universityName,
      content: content.trim(),
      category: category,
      likesCount: 0,
      commentsCount: 0,
      repostsCount: 0,
      quotesCount: 0,
      isLiked: false,
      isBookmarked: false,
      isReposted: false,
      createdAt: new Date().toISOString(),
      quotedPost: quotedPost
        ? {
            id: quotedPost.id,
            authorName: quotedPost.authorName,
            username: quotedPost.username,
            content: quotedPost.content
          }
        : undefined
    };

    setPosts((prev) => [newPost, ...prev]);
    showToast('Post published to Univyx network');
    return newPost;
  };

  const editPost = (postId: string, newContent: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, content: newContent.trim() } : p))
    );
    showToast('Post updated');
  };

  const deletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    showToast('Post deleted');
  };

  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nowLiked = !p.isLiked;
          return {
            ...p,
            isLiked: nowLiked,
            likesCount: nowLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
          };
        }
        return p;
      })
    );
  };

  const toggleBookmarkPost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nowBookmarked = !p.isBookmarked;
          showToast(nowBookmarked ? 'Saved to Bookmarks' : 'Removed from Bookmarks');
          return { ...p, isBookmarked: nowBookmarked };
        }
        return p;
      })
    );
  };

  const repostPost = (postId: string, quoteText?: string) => {
    if (quoteText && quoteText.trim().length > 0) {
      const original = posts.find((p) => p.id === postId);
      if (original) {
        createPost(quoteText, original.category, original.universityId, original);
      }
      return;
    }

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nowReposted = !p.isReposted;
          showToast(nowReposted ? 'Reposted to your profile' : 'Undo repost');
          return {
            ...p,
            isReposted: nowReposted,
            repostsCount: nowReposted ? p.repostsCount + 1 : Math.max(0, p.repostsCount - 1)
          };
        }
        return p;
      })
    );
  };

  const addComment = (postId: string, content: string) => {
    if (!currentUser) return;
    const tier = currentUser.verificationTier || currentUser.verification_tier || 'none';
    const newComment: PostComment = {
      id: `comm-${Date.now()}`,
      postId,
      authorId: currentUser.id,
      authorName: currentUser.fullName,
      username: currentUser.username,
      verificationTier: tier,
      verification_tier: tier,
      author: {
        id: currentUser.id,
        fullName: currentUser.fullName,
        full_name: currentUser.fullName,
        username: currentUser.username,
        verificationTier: tier,
        verification_tier: tier
      },
      universityName: currentUser.universityName,
      content: content.trim(),
      likesCount: 0,
      isLiked: false,
      createdAt: new Date().toISOString()
    };

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));

    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p))
    );

    showToast('Reply posted');
  };

  // Save verification logs to localStorage
  useEffect(() => {
    localStorage.setItem('univyx_verification_logs', JSON.stringify(verificationLogs));
  }, [verificationLogs]);

  const setVerificationTierForUser = (userId: string, tier: VerificationTier, reason: string) => {
    if (!reason || reason.trim().length === 0) {
      showToast('A reason is required to adjust verification');
      return;
    }

    const trimmedReason = reason.trim();
    let oldTier: VerificationTier = 'none';
    let targetUsername = '';

    // If target is current user
    if (currentUser && currentUser.id === userId) {
      oldTier = currentUser.verificationTier || currentUser.verification_tier || 'none';
      targetUsername = currentUser.username;
      const updatedUser: UserProfile = {
        ...currentUser,
        verificationTier: tier,
        verification_tier: tier,
        isVerified: tier !== 'none',
        is_verified: tier !== 'none',
        verifiedAt: tier !== 'none' ? new Date().toISOString() : undefined,
        verified_at: tier !== 'none' ? new Date().toISOString() : undefined,
        verifiedBy: 'adm-super',
        verified_by: 'adm-super',
        verificationSource: 'manual',
        verification_source: 'manual',
        verificationLocked: true,
        verification_locked: true
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('univyx_user', JSON.stringify(updatedUser));
    } else {
      const p = posts.find((post) => post.authorId === userId || post.author?.id === userId);
      if (p) {
        oldTier = p.verificationTier || p.verification_tier || 'none';
        targetUsername = p.username;
      }
    }

    // Update posts authored by this user
    setPosts((prev) =>
      prev.map((post) => {
        if (post.authorId === userId || post.author?.id === userId) {
          return {
            ...post,
            verificationTier: tier,
            verification_tier: tier,
            isVerified: tier !== 'none',
            is_verified: tier !== 'none',
            author: post.author
              ? {
                  ...post.author,
                  verificationTier: tier,
                  verification_tier: tier,
                  isVerified: tier !== 'none',
                  is_verified: tier !== 'none'
                }
              : undefined
          };
        }
        return post;
      })
    );

    // Update comments authored by this user
    setComments((prev) => {
      const updated: Record<string, PostComment[]> = {};
      Object.entries(prev).forEach(([postId, commentList]) => {
        updated[postId] = commentList.map((c) =>
          c.authorId === userId
            ? {
                ...c,
                verificationTier: tier,
                verification_tier: tier,
                author: c.author
                  ? {
                      ...c.author,
                      verificationTier: tier,
                      verification_tier: tier
                    }
                  : undefined
              }
            : c
        );
      });
      return updated;
    });

    // Create Audit Log Entry
    const logEntry: VerificationAuditLog = {
      id: `val-${Date.now()}`,
      userId,
      username: targetUsername || userId,
      oldTier,
      newTier: tier,
      adminId: 'adm-super',
      adminUsername: 'superadmin@univyx.ng',
      reason: trimmedReason,
      createdAt: new Date().toISOString()
    };

    setVerificationLogs((prev) => [logEntry, ...prev]);

    // Send in-app notification if user was affected
    if (currentUser && currentUser.id === userId) {
      const notifContent =
        tier === 'gold'
          ? 'Your account has been granted the Univyx Gold Tick by administration.'
          : tier === 'blue'
          ? 'Your account has been granted the Univyx Blue Tick by administration.'
          : `Your verification status has been updated by administration: ${trimmedReason}`;

      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        userId,
        actorName: 'Univyx Administration',
        actorUsername: 'univyx_admin',
        actorVerificationTier: 'gold',
        type: 'announcement',
        content: notifContent,
        isRead: false,
        createdAt: new Date().toISOString()
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }

    showToast(
      tier === 'none'
        ? `Verification revoked for @${targetUsername || userId}`
        : `Granted ${tier === 'gold' ? 'Gold' : 'Blue'} tick to @${targetUsername || userId}`
    );
  };

  const gainFollowers = (count: number) => {
    if (!currentUser) return;
    const oldFollowers = currentUser.followersCount ?? 0;
    const newFollowers = oldFollowers + count;
    const currentTier = currentUser.verificationTier || currentUser.verification_tier || 'none';
    const isLocked = currentUser.verificationLocked || currentUser.verification_locked || false;

    let willEarnBlue = false;
    let newTier: VerificationTier = currentTier;

    if (newFollowers >= 1000 && oldFollowers < 1000 && currentTier === 'none' && !isLocked) {
      willEarnBlue = true;
      newTier = 'blue';
    }

    const updatedUser: UserProfile = {
      ...currentUser,
      followersCount: newFollowers,
      followers_count: newFollowers,
      verificationTier: newTier,
      verification_tier: newTier,
      isVerified: newTier !== 'none',
      is_verified: newTier !== 'none',
      verifiedAt: willEarnBlue ? new Date().toISOString() : currentUser.verifiedAt,
      verified_at: willEarnBlue ? new Date().toISOString() : currentUser.verified_at,
      verifiedBy: willEarnBlue ? 'system' : currentUser.verifiedBy,
      verified_by: willEarnBlue ? 'system' : currentUser.verified_by,
      verificationSource: willEarnBlue ? 'auto' : currentUser.verificationSource,
      verification_source: willEarnBlue ? 'auto' : currentUser.verification_source
    };

    setCurrentUser(updatedUser);
    localStorage.setItem('univyx_user', JSON.stringify(updatedUser));

    if (willEarnBlue) {
      // Add audit log
      const logEntry: VerificationAuditLog = {
        id: `val-${Date.now()}`,
        userId: currentUser.id,
        username: currentUser.username,
        oldTier: 'none',
        newTier: 'blue',
        adminId: 'system',
        adminUsername: 'Univyx Automation Trigger',
        reason: 'Automated promotion: Reached 1,000 collegiate follower milestone',
        createdAt: new Date().toISOString()
      };
      setVerificationLogs((prev) => [logEntry, ...prev]);

      // Add celebratory notification
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        userId: currentUser.id,
        actorName: 'Univyx Campus Pulse',
        actorUsername: 'univyx_official',
        actorVerificationTier: 'gold',
        type: 'announcement',
        content: "Congratulations! You've reached 1,000 followers and earned your Univyx Blue Tick!",
        isRead: false,
        createdAt: new Date().toISOString()
      };
      setNotifications((prev) => [newNotif, ...prev]);

      showToast("🎉 Milestone Reached: You earned your Univyx Blue Tick!");
    } else {
      showToast(`+${count} collegiate followers joined your network`);
    }
  };

  const getCommentsForPost = (postId: string) => comments[postId] || [];

  // CIVYN
  const toggleBookmarkOpportunity = (id: string) => {
    setOpportunities((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          const saved = !o.isBookmarked;
          showToast(saved ? 'Opportunity saved to CIVYN tracker' : 'Removed from saved opportunities');
          return { ...o, isBookmarked: saved };
        }
        return o;
      })
    );
  };

  const createOpportunity = (data: Omit<CivynOpportunity, 'id' | 'createdAt'>) => {
    const newOpp: CivynOpportunity = {
      ...data,
      id: `opp-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setOpportunities((prev) => [newOpp, ...prev]);
    showToast('CIVYN opportunity created');
  };

  const deleteOpportunity = (id: string) => {
    setOpportunities((prev) => prev.filter((o) => o.id !== id));
    showToast('Opportunity removed');
  };

  // Store
  const createProduct = (data: Omit<StoreProduct, 'id' | 'createdAt'>) => {
    const newProd: StoreProduct = {
      ...data,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast('Product listed on Univyx Store');
  };

  const toggleProductAvailability = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isAvailable: !p.isAvailable } : p))
    );
    showToast('Product status updated');
  };

  // Arena waitlist
  const joinArenaWaitlist = (email: string) => {
    setArenaWaitlistJoined(true);
    localStorage.setItem('univyx_arena_waitlist', 'true');
    showToast(`You are on the Univyx Arena collegiate roster! We will notify ${email}`);
  };

  // Content Reports
  const submitReport = (
    contentId: string,
    contentType: 'post' | 'comment' | 'opportunity' | 'product' | 'user',
    reason: string,
    snippet: string
  ) => {
    const newReport: ContentReport = {
      id: `rep-${Date.now()}`,
      reporterUsername: currentUser?.username || 'scholar_user',
      contentId,
      contentType,
      contentSnippet: snippet,
      reason,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setReports((prev) => [newReport, ...prev]);
    showToast('Report submitted for campus moderation review. Thank you for protecting our private university community.');
  };

  const resolveReport = (reportId: string, status: 'dismissed' | 'action_taken', notes?: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status, moderatorNotes: notes } : r))
    );
    showToast(`Report marked as ${status}`);
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All notifications marked as read');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  // Hidden Admin Login
  const adminLogin = (email: string, pass: string): boolean => {
    // Mock credentials check
    if (email && pass) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('univyx_admin_auth', 'true');
      setActiveTabState('admin_panel');
      showToast('Welcome, Administrator. Admin session active.');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('univyx_admin_auth');
    setActiveTabState('home');
    showToast('Admin logged out');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        font,
        setFont,
        currentUser,
        setCurrentUser,
        onboardUser,
        signOut,
        showWelcomeModal,
        setShowWelcomeModal,
        authModalType,
        setAuthModalType,
        universities,
        selectedUniversityId,
        setSelectedUniversityId,
        selectedUniversity,
        posts,
        createPost,
        editPost,
        deletePost,
        toggleLikePost,
        toggleBookmarkPost,
        repostPost,
        comments,
        addComment,
        getCommentsForPost,
        opportunities,
        toggleBookmarkOpportunity,
        createOpportunity,
        deleteOpportunity,
        products,
        createProduct,
        toggleProductAvailability,
        tutorials,
        academicResources: tutorials,
        knowledgeDirectory,
        knowledgeEntries: knowledgeDirectory,
        events,
        rankings,
        tournaments,
        arenaAnnouncements: [
          {
            id: 'ann-1',
            title: 'National Collegiate Debate Bracket Announced',
            content: 'Debate motions for 2026 Season 1 released across private universities.',
            description: 'Debate motions for 2026 Season 1 released across private universities.',
            date: '2026-10-15',
            event_date: '2026-10-15',
            category: 'Debate'
          },
          {
            id: 'ann-2',
            title: 'Private Varsity Esports Tournament Registration',
            content: 'Valorant & EA FC 26 collegiate qualifiers open for verified scholars.',
            description: 'Valorant & EA FC 26 collegiate qualifiers open for verified scholars.',
            date: '2026-10-12',
            event_date: '2026-10-12',
            category: 'Esports'
          }
        ],
        stores: [
          { id: 'store-1', name: 'Covenant Scent Studio', description: 'Student-run perfumery & collegiate grooming essentials.', vendorName: 'Covenant Scent Studio', universityName: 'Covenant University' },
          { id: 'store-2', name: 'Ilishan Tech Vault', description: 'Gadgets, chargers, and computing accessories for campus labs.', vendorName: 'Ilishan Tech Vault', universityName: 'Babcock University' },
          { id: 'store-3', name: 'Ado Legal Print & Robes', description: 'Collegiate formal attire, legal drafts, and study stationery.', vendorName: 'Ado Legal Print & Robes', universityName: 'Afe Babalola University (ABUAD)' }
        ],
        arenaWaitlistJoined,
        joinArenaWaitlist,
        reports,
        submitReport,
        resolveReport,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationsCount,
        activeTab,
        setActiveTab,
        isDrawerOpen,
        setIsDrawerOpen,
        isComposerOpen,
        setIsComposerOpen,
        selectedPostForDetail,
        setSelectedPostForDetail,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        adminPath,
        setAdminPath,
        verificationLogs,
        setVerificationTierForUser,
        gainFollowers,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

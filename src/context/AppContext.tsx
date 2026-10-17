import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  PostComment,
  ContentReport,
  NotificationItem,
  FontPreference,
  ThemePreference,
  TextSizePreference,
  UserRole,
  ArenaAnnouncement,
  VerificationTier,
  VerificationAuditLog
} from '../types';
import { PRIVATE_UNIVERSITIES, PrivateUniversity } from '../data/universities';
import { INITIAL_POSTS, MockPost, PostCategory, PostPoll } from '../data/posts';
import { INITIAL_CIVYN_OPPORTUNITIES, CivynOpportunity } from '../data/civyn';
import { INITIAL_PRODUCTS, StoreProduct } from '../data/store';
import { ACADEMIC_TUTORIALS, KNOWLEDGE_DIRECTORY, AcademicTutorial, UniversityKnowledgeEntry } from '../data/academics';
import { COLLEGIATE_RANKINGS, ARENA_TOURNAMENTS, CollegiateRanking, ArenaTournament } from '../data/arena';
import { INITIAL_EVENTS, CampusEvent } from '../data/events';
import { INITIAL_ROOMS, GistRoom } from '../data/rooms';
import { INITIAL_CONVERSATIONS, INITIAL_MESSAGES, Conversation, DirectMessage, ConversationParticipant } from '../data/messages';
import { INITIAL_ADS, SponsoredAd } from '../data/ads';
import { INITIAL_LIBRARY_RESOURCES, AcademicLibraryResource } from '../data/academicLibrary';
import { supabase } from '../lib/supabase';

interface AppContextType {
  // Theme & Font
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  font: FontPreference;
  setFont: (font: FontPreference) => void;
  textSize: TextSizePreference;
  setTextSize: (size: TextSizePreference) => void;
  resetTextSize: () => void;

  // User Profile & Authentication
  currentUser: UserProfile | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  onboardUser: (userData: Partial<UserProfile>) => void;
  signOut: () => void;
  logout: () => Promise<void>;
  showWelcomeModal: boolean;
  setShowWelcomeModal: (show: boolean) => void;
  authModalType: 'login' | 'signup' | 'student_email' | 'onboarding' | 'forgot_password' | null;
  setAuthModalType: (type: 'login' | 'signup' | 'student_email' | 'onboarding' | 'forgot_password' | null) => void;
  updateLocation: (loc: string) => void;
  toggleShowLocationOnProfile: () => void;
  toggleAllowLocationTags: () => void;

  // Multi-Provider Auth & Verification
  signInWithGoogle: () => Promise<{ error?: string }>;
  signInWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (data: any) => Promise<{ success: boolean; error?: string; requireVerification?: boolean }>;
  sendStudentEmailCode: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyStudentEmailCode: (email: string, code: string) => Promise<{ success: boolean; error?: string }>;
  completeOnboarding: (data: { username: string; universityId: string; universityName: string; department: string; academicLevel: string }) => Promise<{ success: boolean; error?: string }>;
  sendPasswordResetEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  verifyStudentEmailFromSettings: (email: string, code: string) => Promise<{ success: boolean; error?: string }>;

  // Universities
  universities: PrivateUniversity[];
  selectedUniversityId: string;
  setSelectedUniversityId: (id: string) => void;
  selectedUniversity: PrivateUniversity | undefined;

  // Posts & Interactions
  posts: MockPost[];
  createPost: (content: string, category: PostCategory, universityId?: string, quotedPost?: MockPost, poll?: Omit<PostPoll, 'id'> | null, location?: string) => MockPost;
  editPost: (postId: string, newContent: string) => void;
  deletePost: (postId: string) => void;
  toggleLikePost: (postId: string) => void;
  toggleBookmarkPost: (postId: string) => void;
  repostPost: (postId: string, quoteText?: string) => void;
  votePoll: (postId: string, optionId: string) => void;
  
  // Comments
  comments: Record<string, PostComment[]>;
  addComment: (postId: string, content: string) => void;
  getCommentsForPost: (postId: string) => PostComment[];

  // Gist Rooms (Live voice rooms)
  rooms: GistRoom[];
  activeRoom: GistRoom | null;
  isRoomModalOpen: boolean;
  isRoomMiniPlayerOpen: boolean;
  isCreateRoomModalOpen: boolean;
  setIsCreateRoomModalOpen: (open: boolean) => void;
  endedRoomSummary: { roomTitle: string; duration: string; peakListeners: number; hostName: string } | null;
  joinRoom: (room: GistRoom) => void;
  leaveRoom: () => void;
  minimizeRoom: () => void;
  maximizeRoom: () => void;
  endRoom: (summary: { duration: string; peakListeners: number }) => void;
  closeEndedSummary: () => void;
  createRoom: (roomData: Omit<GistRoom, 'id'>) => void;
  toggleRoomReminder: (roomId: string) => void;

  // Direct Messages
  conversations: Conversation[];
  messages: Record<string, DirectMessage[]>;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, text: string) => void;
  deleteMessage: (conversationId: string, messageId: string) => void;
  startConversation: (participant: ConversationParticipant) => string;
  unreadMessagesCount: number;

  // Sponsored Ads (Ad Center)
  ads: SponsoredAd[];
  createAd: (adData: Omit<SponsoredAd, 'id' | 'impressions' | 'clicks' | 'ctr' | 'createdAt'>) => void;
  updateAd: (id: string, adData: Partial<SponsoredAd>) => void;
  deleteAd: (id: string) => void;
  hiddenAdIds: string[];
  hideAd: (adId: string) => void;

  // Academic Library (Past Questions & Notes)
  libraryResources: AcademicLibraryResource[];
  toggleSaveLibraryResource: (id: string) => void;
  addLibraryResource: (res: Omit<AcademicLibraryResource, 'id' | 'downloadsCount' | 'createdAt'>) => void;
  incrementDownloadResource: (id: string) => void;

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
  studentVerified: true,
  student_verified: true,
  studentEmail: 'chidi.okafor@student.placeholder-cu.edu',
  student_email: 'chidi.okafor@student.placeholder-cu.edu',
  studentVerifiedAt: '2026-01-15T09:00:00Z',
  student_verified_at: '2026-01-15T09:00:00Z',
  emailVerified: true,
  email_verified: true,
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
  // Theme state (Default to system setting)
  const [theme, setThemeState] = useState<ThemePreference>(() => {
    return (localStorage.getItem('univyx_theme') as ThemePreference) || 'system';
  });

  // Font state
  const [font, setFontState] = useState<FontPreference>(() => {
    return (localStorage.getItem('univyx_font') as FontPreference) || 'figtree';
  });

  // Text Size state (Small 12px, Default 15px, Large 17px, Extra large 19px)
  const [textSize, setTextSizeState] = useState<TextSizePreference>(() => {
    return (localStorage.getItem('univyx_text_size') as TextSizePreference) || 'default';
  });

  // Current User (Session persistence & route protection)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (localStorage.getItem('univyx_logged_out') === 'true') {
      return null;
    }
    const saved = localStorage.getItem('univyx_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  // Welcome modal and Auth states
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(() => {
    if (localStorage.getItem('univyx_logged_out') === 'true') return true;
    return localStorage.getItem('univyx_welcomed') !== 'true';
  });
  const [authModalType, setAuthModalType] = useState<
    'login' | 'signup' | 'student_email' | 'onboarding' | 'forgot_password' | null
  >(null);

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

  // Gist Rooms (Live Voice Spaces)
  const [rooms, setRooms] = useState<GistRoom[]>(() => {
    const saved = localStorage.getItem('univyx_rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });
  const [activeRoom, setActiveRoom] = useState<GistRoom | null>(null);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [isRoomMiniPlayerOpen, setIsRoomMiniPlayerOpen] = useState(false);
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);
  const [endedRoomSummary, setEndedRoomSummary] = useState<{ roomTitle: string; duration: string; peakListeners: number; hostName: string } | null>(null);

  // Direct Messages
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('univyx_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });
  const [messages, setMessages] = useState<Record<string, DirectMessage[]>>(() => {
    const saved = localStorage.getItem('univyx_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv-self');

  // Sponsored Ads (Ad Center)
  const [ads, setAds] = useState<SponsoredAd[]>(() => {
    const saved = localStorage.getItem('univyx_ads');
    return saved ? JSON.parse(saved) : INITIAL_ADS;
  });
  const [hiddenAdIds, setHiddenAdIds] = useState<string[]>(() => {
    const saved = sessionStorage.getItem('univyx_hidden_ads');
    return saved ? JSON.parse(saved) : [];
  });

  // Academic Library (Past Questions & Notes)
  const [libraryResources, setLibraryResources] = useState<AcademicLibraryResource[]>(() => {
    const saved = localStorage.getItem('univyx_academic_library');
    return saved ? JSON.parse(saved) : INITIAL_LIBRARY_RESOURCES;
  });

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
        root.classList.remove('light');
        root.style.colorScheme = 'dark';
        if (metaTheme) metaTheme.setAttribute('content', '#000000');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        root.style.colorScheme = 'light';
        if (metaTheme) metaTheme.setAttribute('content', '#F4F7FC');
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

  // Text Size synchronization (Small 12px, Default 15px, Large 17px, Extra large 19px)
  useEffect(() => {
    let pxVal = typeof textSize === 'number' ? textSize : parseInt(textSize as string, 10);
    if (isNaN(pxVal)) {
      if (textSize === 'small') pxVal = 12;
      else if (textSize === 'large') pxVal = 17;
      else if (textSize === 'extra-large') pxVal = 19;
      else pxVal = 15;
    }
    pxVal = Math.min(19, Math.max(12, pxVal));
    localStorage.setItem('univyx_text_size', pxVal.toString());
    document.documentElement.style.setProperty('--app-font-size', `${pxVal}px`);
    document.documentElement.style.setProperty('--text-scale', `${pxVal / 15}`);
    document.documentElement.setAttribute('data-text-size', pxVal.toString());
  }, [textSize]);

  const setTextSize = (size: TextSizePreference) => {
    let pxVal = typeof size === 'number' ? size : parseInt(size as string, 10);
    if (isNaN(pxVal)) {
      if (size === 'small') pxVal = 12;
      else if (size === 'large') pxVal = 17;
      else if (size === 'extra-large') pxVal = 19;
      else pxVal = 15;
    }
    pxVal = Math.min(19, Math.max(12, pxVal));
    setTextSizeState(pxVal);
    localStorage.setItem('univyx_text_size', pxVal.toString());
    document.documentElement.style.setProperty('--app-font-size', `${pxVal}px`);
    document.documentElement.style.setProperty('--text-scale', `${pxVal / 15}`);
    document.documentElement.setAttribute('data-text-size', pxVal.toString());
  };

  const resetTextSize = () => {
    setTextSize(15);
    showToast('Text size reset to default (15px)');
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

  const logout = async () => {
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase signOut error:', e);
      }
    }
    setCurrentUser(null);
    localStorage.removeItem('univyx_user');
    localStorage.setItem('univyx_logged_out', 'true');
    setShowWelcomeModal(true);
    setIsDrawerOpen(false);
    showToast('Signed out of Univyx');
  };

  const signOut = () => {
    logout();
  };

  const signInWithGoogle = async (): Promise<{ error?: string }> => {
    if (supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) return { error: error.message };
      return {};
    } else {
      const demoUser: UserProfile = {
        id: `usr-${Date.now()}`,
        fullName: 'Google Scholar',
        username: 'google_scholar',
        email: 'scholar@gmail.com',
        universityId: 'covenant',
        universityName: 'Covenant University',
        department: 'Computer Science',
        academicLevel: '200L',
        interests: ['Academics', 'Tech'],
        isVerified: true,
        role: 'user',
        createdAt: new Date().toISOString(),
        postsCount: 0,
        followersCount: 15,
        followingCount: 30
      };
      setCurrentUser(demoUser);
      localStorage.setItem('univyx_user', JSON.stringify(demoUser));
      localStorage.removeItem('univyx_logged_out');
      localStorage.setItem('univyx_welcomed', 'true');
      setShowWelcomeModal(false);
      setAuthModalType(null);
      showToast('Signed in with Google');
      return {};
    }
  };

  const signInWithEmail = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass
      });
      if (error) {
        return { success: false, error: error.message };
      }
      if (data.user) {
        let isStudentVerified = false;
        let uniId = data.user.user_metadata?.university_id || 'covenant';
        let uniName = data.user.user_metadata?.university_name || 'Covenant University';

        try {
          const res = await fetch('/api/auth/check-domain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: data.user.email })
          });
          const dRes = await res.json();
          if (dRes.approved) {
            isStudentVerified = true;
            uniId = dRes.universityId || uniId;
            uniName = dRes.universityName || uniName;
          }
        } catch {
          // Non-blocking
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const userObj: UserProfile = {
          id: data.user.id,
          fullName: profile?.full_name || data.user.user_metadata?.full_name || email.split('@')[0],
          username: profile?.username || email.split('@')[0],
          email: data.user.email || email,
          universityId: profile?.university_id || uniId,
          universityName: profile?.university_name || uniName,
          department: profile?.department || 'Computer Science',
          academicLevel: profile?.academic_level || '200L',
          role: profile?.role || 'user',
          isVerified: profile?.is_verified ?? true,
          verificationTier: profile?.verification_tier || 'none',
          studentVerified: profile?.student_verified ?? isStudentVerified,
          studentEmail: profile?.student_email || (isStudentVerified ? data.user.email : undefined),
          createdAt: profile?.created_at || new Date().toISOString(),
          postsCount: 0,
          followersCount: 10,
          followingCount: 20
        };

        setCurrentUser(userObj);
        localStorage.setItem('univyx_user', JSON.stringify(userObj));
        localStorage.removeItem('univyx_logged_out');
        localStorage.setItem('univyx_welcomed', 'true');
        setShowWelcomeModal(false);
        setAuthModalType(null);
        return { success: true };
      }
      return { success: false, error: 'Sign in failed' };
    } else {
      const userObj: UserProfile = {
        id: `usr-${Date.now()}`,
        fullName: email.split('@')[0],
        username: email.split('@')[0],
        email: email,
        universityId: 'covenant',
        universityName: 'Covenant University',
        department: 'Computer Science',
        academicLevel: '200L',
        interests: ['Academics'],
        isVerified: true,
        role: 'user',
        createdAt: new Date().toISOString(),
        postsCount: 0,
        followersCount: 10,
        followingCount: 20
      };
      setCurrentUser(userObj);
      localStorage.setItem('univyx_user', JSON.stringify(userObj));
      localStorage.removeItem('univyx_logged_out');
      localStorage.setItem('univyx_welcomed', 'true');
      setShowWelcomeModal(false);
      setAuthModalType(null);
      return { success: true };
    }
  };

  const signUpWithEmail = async (data: any): Promise<{ success: boolean; error?: string; requireVerification?: boolean }> => {
    if (supabase) {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            username: data.username,
            university_id: data.universityId,
            university_name: data.universityName,
            department: data.department,
            academic_level: data.academicLevel
          }
        }
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, requireVerification: true };
    } else {
      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        universityId: data.universityId,
        universityName: data.universityName,
        department: data.department,
        academicLevel: data.academicLevel,
        interests: ['Academics'],
        isVerified: true,
        role: 'user',
        createdAt: new Date().toISOString(),
        postsCount: 0,
        followersCount: 5,
        followingCount: 15
      };
      setCurrentUser(newUser);
      localStorage.setItem('univyx_user', JSON.stringify(newUser));
      localStorage.removeItem('univyx_logged_out');
      localStorage.setItem('univyx_welcomed', 'true');
      return { success: true, requireVerification: false };
    }
  };

  const sendStudentEmailCode = async (studentEmail: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: studentEmail })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || data.message || 'Unable to send code' };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error sending code' };
    }
  };

  const verifyStudentEmailCode = async (studentEmail: string, code: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: studentEmail, code })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Invalid verification code' };
      }

      if (currentUser) {
        const updated: UserProfile = {
          ...currentUser,
          studentVerified: true,
          student_verified: true,
          studentEmail: studentEmail,
          student_email: studentEmail,
          studentVerifiedAt: data.verified_at || new Date().toISOString(),
          student_verified_at: data.verified_at || new Date().toISOString(),
          universityId: data.universityId || currentUser.universityId,
          university_id: data.universityId || currentUser.universityId,
          universityName: data.universityName || currentUser.universityName,
          university_name: data.universityName || currentUser.universityName
        };
        setCurrentUser(updated);
        localStorage.setItem('univyx_user', JSON.stringify(updated));
      } else {
        const newUser: UserProfile = {
          id: `usr-${Date.now()}`,
          fullName: 'Verified Scholar',
          username: '',
          email: studentEmail,
          universityId: data.universityId || 'covenant',
          universityName: data.universityName || 'Covenant University',
          department: '',
          academicLevel: '200L',
          role: 'user',
          isVerified: true,
          studentVerified: true,
          studentEmail: studentEmail,
          createdAt: new Date().toISOString(),
          postsCount: 0,
          followersCount: 15,
          followingCount: 30,
          needsOnboarding: true
        };
        setCurrentUser(newUser);
        localStorage.setItem('univyx_user', JSON.stringify(newUser));
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Verification failed' };
    }
  };

  const completeOnboarding = async (data: {
    username: string;
    universityId: string;
    universityName: string;
    department: string;
    academicLevel: string;
  }): Promise<{ success: boolean; error?: string }> => {
    if (!currentUser) return { success: false, error: 'User session not found' };

    const updatedUser: UserProfile = {
      ...currentUser,
      username: data.username,
      universityId: data.universityId,
      universityName: data.universityName,
      department: data.department,
      academicLevel: data.academicLevel as any,
      needsOnboarding: false
    };

    setCurrentUser(updatedUser);
    localStorage.setItem('univyx_user', JSON.stringify(updatedUser));
    localStorage.setItem('univyx_welcomed', 'true');
    setShowWelcomeModal(false);
    setAuthModalType(null);

    if (supabase) {
      try {
        await supabase.from('profiles').upsert({
          id: currentUser.id,
          username: data.username,
          university_id: data.universityId,
          university_name: data.universityName,
          department: data.department,
          academic_level: data.academicLevel
        });
      } catch (err) {
        console.warn('Could not persist profile to Supabase:', err);
      }
    }

    return { success: true };
  };

  const sendPasswordResetEmail = async (email: string): Promise<{ success: boolean; error?: string }> => {
    if (supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/#reset-password`
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
    return { success: true };
  };

  const updatePassword = async (newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (supabase) {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
    return { success: true };
  };

  const verifyStudentEmailFromSettings = async (email: string, code: string): Promise<{ success: boolean; error?: string }> => {
    return verifyStudentEmailCode(email, code);
  };

  // Post Actions
  const createPost = (
    content: string,
    category: PostCategory,
    universityId?: string,
    quotedPost?: MockPost,
    poll?: Omit<PostPoll, 'id'> | null,
    location?: string
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
      location: location || (currentUser.allowLocationTags !== false ? currentUser.location : undefined),
      poll: poll
        ? {
            id: `poll-${Date.now()}`,
            question: poll.question || content.trim(),
            options: poll.options.map((opt, idx) => ({
              id: `opt-${Date.now()}-${idx}`,
              text: opt.text,
              votes: 0
            })),
            totalVotes: 0,
            duration: poll.duration,
            expiresAt: poll.expiresAt || new Date(Date.now() + 86400000).toISOString(),
            isClosed: false
          }
        : undefined,
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

  const votePoll = (postId: string, optionId: string) => {
    setPosts((prev) => {
      const updated = prev.map((post) => {
        if (post.id !== postId || !post.poll) return post;
        if (post.poll.userVotedOptionId || post.poll.isClosed) return post;

        const updatedOptions = post.poll.options.map((opt) => {
          if (opt.id === optionId) {
            return { ...opt, votes: opt.votes + 1 };
          }
          return opt;
        });

        return {
          ...post,
          poll: {
            ...post.poll,
            options: updatedOptions,
            totalVotes: post.poll.totalVotes + 1,
            userVotedOptionId: optionId
          }
        };
      });
      localStorage.setItem('univyx_posts', JSON.stringify(updated));
      return updated;
    });
    showToast('Vote recorded');
  };

  // Location Profile Settings
  const updateLocation = (location: string) => {
    if (!currentUser) return;
    const updated = { ...currentUser, location };
    setCurrentUser(updated);
    localStorage.setItem('univyx_user', JSON.stringify(updated));
    showToast(`Campus location set to "${location}"`);
  };

  const toggleShowLocationOnProfile = () => {
    if (!currentUser) return;
    const nextVal = !(currentUser.showLocationOnProfile ?? true);
    const updated = { ...currentUser, showLocationOnProfile: nextVal };
    setCurrentUser(updated);
    localStorage.setItem('univyx_user', JSON.stringify(updated));
    showToast(nextVal ? 'Location visible on profile' : 'Location hidden from profile');
  };

  const toggleAllowLocationTags = () => {
    if (!currentUser) return;
    const nextVal = !(currentUser.allowLocationTags ?? true);
    const updated = { ...currentUser, allowLocationTags: nextVal };
    setCurrentUser(updated);
    localStorage.setItem('univyx_user', JSON.stringify(updated));
    showToast(nextVal ? 'Location tags enabled on posts' : 'Location tags disabled');
  };

  // Gist Room Handlers
  const joinRoom = (room: GistRoom) => {
    setActiveRoom(room);
    setIsRoomModalOpen(true);
    setIsRoomMiniPlayerOpen(false);
  };

  const leaveRoom = () => {
    setIsRoomModalOpen(false);
    setIsRoomMiniPlayerOpen(false);
    setActiveRoom(null);
    showToast('Left Gist Room');
  };

  const minimizeRoom = () => {
    setIsRoomModalOpen(false);
    setIsRoomMiniPlayerOpen(true);
  };

  const maximizeRoom = () => {
    setIsRoomMiniPlayerOpen(false);
    setIsRoomModalOpen(true);
  };

  const endRoom = (summary: { duration: string; peakListeners: number }) => {
    if (activeRoom) {
      setEndedRoomSummary({
        roomTitle: activeRoom.title,
        duration: summary.duration,
        peakListeners: summary.peakListeners,
        hostName: activeRoom.host.name
      });
      setRooms((prev) => {
        const updated = prev.map((r) => (r.id === activeRoom.id ? { ...r, status: 'ended' as const } : r));
        localStorage.setItem('univyx_rooms', JSON.stringify(updated));
        return updated;
      });
    }
    setIsRoomModalOpen(false);
    setIsRoomMiniPlayerOpen(false);
    setActiveRoom(null);
  };

  const closeEndedSummary = () => {
    setEndedRoomSummary(null);
  };

  const createRoom = (roomData: Omit<GistRoom, 'id'>) => {
    const newRoom: GistRoom = {
      ...roomData,
      id: `room-${Date.now()}`
    };
    setRooms((prev) => {
      const updated = [newRoom, ...prev];
      localStorage.setItem('univyx_rooms', JSON.stringify(updated));
      return updated;
    });
    if (newRoom.status === 'live') {
      joinRoom(newRoom);
    }
    showToast(`Gist room created: "${newRoom.title}"`);
  };

  const toggleRoomReminder = (roomId: string) => {
    setRooms((prev) => {
      const updated = prev.map((r) => {
        if (r.id === roomId) {
          const nextVal = !r.isReminderSet;
          showToast(nextVal ? 'Reminder set for upcoming Gist Room' : 'Reminder removed');
          return { ...r, isReminderSet: nextVal };
        }
        return r;
      });
      localStorage.setItem('univyx_rooms', JSON.stringify(updated));
      return updated;
    });
  };

  // Direct Messages Handlers
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim() || !currentUser) return;
    const newMsg: DirectMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      senderUsername: currentUser.username,
      text: text.trim(),
      createdAt: new Date().toISOString(),
      status: 'sent'
    };

    setMessages((prev) => {
      const thread = prev[conversationId] || [];
      const updated = { ...prev, [conversationId]: [...thread, newMsg] };
      localStorage.setItem('univyx_messages', JSON.stringify(updated));
      return updated;
    });

    setConversations((prev) => {
      const updated = prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text.trim(),
            lastMessageTime: 'Just now'
          };
        }
        return c;
      });
      localStorage.setItem('univyx_conversations', JSON.stringify(updated));
      return updated;
    });

    // Simulate reply if chatting with another scholar
    const currentConv = conversations.find((c) => c.id === conversationId);
    if (currentConv && !currentConv.isSelf) {
      setTimeout(() => {
        setMessages((prev) => {
          const thread = prev[conversationId] || [];
          const updated = {
            ...prev,
            [conversationId]: thread.map((m) => (m.id === newMsg.id ? { ...m, status: 'seen' as const } : m))
          };
          localStorage.setItem('univyx_messages', JSON.stringify(updated));
          return updated;
        });
      }, 1000);

      setTimeout(() => {
        const replyMsg: DirectMessage = {
          id: `msg-${Date.now()}-reply`,
          conversationId,
          senderId: currentConv.participant.id,
          senderName: currentConv.participant.fullName,
          senderUsername: currentConv.participant.username,
          text: `Got your note! Let's connect on this at the campus tech lab. 🎓`,
          createdAt: new Date().toISOString(),
          status: 'seen'
        };
        setMessages((prev) => {
          const thread = prev[conversationId] || [];
          const updated = { ...prev, [conversationId]: [...thread, replyMsg] };
          localStorage.setItem('univyx_messages', JSON.stringify(updated));
          return updated;
        });
        setConversations((prev) => {
          const updated = prev.map((c) => {
            if (c.id === conversationId) {
              return {
                ...c,
                lastMessage: replyMsg.text,
                lastMessageTime: 'Just now'
              };
            }
            return c;
          });
          localStorage.setItem('univyx_conversations', JSON.stringify(updated));
          return updated;
        });
      }, 2800);
    }
  };

  const deleteMessage = (conversationId: string, messageId: string) => {
    setMessages((prev) => {
      const thread = prev[conversationId] || [];
      const updated = { ...prev, [conversationId]: thread.filter((m) => m.id !== messageId) };
      localStorage.setItem('univyx_messages', JSON.stringify(updated));
      return updated;
    });
    showToast('Message deleted');
  };

  const startConversation = (participant: ConversationParticipant): string => {
    const existing = conversations.find((c) => c.participant.id === participant.id);
    if (existing) {
      setActiveConversationId(existing.id);
      setActiveTabState('messages');
      return existing.id;
    }
    const newConvId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      participant,
      lastMessage: 'Conversation opened',
      lastMessageTime: 'Just now',
      unreadCount: 0,
      isSelf: participant.isSelf
    };
    setConversations((prev) => {
      const updated = [newConv, ...prev];
      localStorage.setItem('univyx_conversations', JSON.stringify(updated));
      return updated;
    });
    setMessages((prev) => {
      const updated = { ...prev, [newConvId]: [] };
      localStorage.setItem('univyx_messages', JSON.stringify(updated));
      return updated;
    });
    setActiveConversationId(newConvId);
    setActiveTabState('messages');
    return newConvId;
  };

  // Sponsored Ads Handlers
  const createAd = (adData: Omit<SponsoredAd, 'id' | 'impressions' | 'clicks' | 'ctr' | 'createdAt'>) => {
    const newAd: SponsoredAd = {
      ...adData,
      id: `ad-${Date.now()}`,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      createdAt: new Date().toISOString()
    };
    setAds((prev) => {
      const updated = [newAd, ...prev];
      localStorage.setItem('univyx_ads', JSON.stringify(updated));
      return updated;
    });
    showToast(`Ad campaign "${newAd.title}" published`);
  };

  const updateAd = (id: string, adData: Partial<SponsoredAd>) => {
    setAds((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, ...adData } : a));
      localStorage.setItem('univyx_ads', JSON.stringify(updated));
      return updated;
    });
    showToast('Ad campaign updated');
  };

  const deleteAd = (id: string) => {
    setAds((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      localStorage.setItem('univyx_ads', JSON.stringify(updated));
      return updated;
    });
    showToast('Ad campaign deleted');
  };

  const hideAd = (adId: string) => {
    setHiddenAdIds((prev) => {
      const updated = [...prev, adId];
      sessionStorage.setItem('univyx_hidden_ads', JSON.stringify(updated));
      return updated;
    });
    showToast('Ad hidden from feed');
  };

  // Academic Library Handlers
  const toggleSaveLibraryResource = (id: string) => {
    setLibraryResources((prev) => {
      const updated = prev.map((r) => {
        if (r.id === id) {
          const nextVal = !r.isSaved;
          showToast(nextVal ? 'Resource saved to your bookmarks' : 'Resource removed from saved');
          return { ...r, isSaved: nextVal };
        }
        return r;
      });
      localStorage.setItem('univyx_academic_library', JSON.stringify(updated));
      return updated;
    });
  };

  const addLibraryResource = (res: Omit<AcademicLibraryResource, 'id' | 'downloadsCount' | 'createdAt'>) => {
    const newRes: AcademicLibraryResource = {
      ...res,
      id: `res-${Date.now()}`,
      downloadsCount: 1,
      createdAt: new Date().toISOString()
    };
    setLibraryResources((prev) => {
      const updated = [newRes, ...prev];
      localStorage.setItem('univyx_academic_library', JSON.stringify(updated));
      return updated;
    });
    showToast(`Uploaded "${newRes.courseCode}" for student review`);
  };

  const incrementDownloadResource = (id: string) => {
    setLibraryResources((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, downloadsCount: r.downloadsCount + 1 } : r));
      localStorage.setItem('univyx_academic_library', JSON.stringify(updated));
      return updated;
    });
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
        logout,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        sendStudentEmailCode,
        verifyStudentEmailCode,
        completeOnboarding,
        sendPasswordResetEmail,
        updatePassword,
        verifyStudentEmailFromSettings,
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
        showToast,
        textSize,
        setTextSize,
        resetTextSize,
        updateLocation,
        toggleShowLocationOnProfile,
        toggleAllowLocationTags,
        votePoll,
        rooms,
        activeRoom,
        isRoomModalOpen,
        isRoomMiniPlayerOpen,
        isCreateRoomModalOpen,
        setIsCreateRoomModalOpen,
        endedRoomSummary,
        joinRoom,
        leaveRoom,
        minimizeRoom,
        maximizeRoom,
        endRoom,
        closeEndedSummary,
        createRoom,
        toggleRoomReminder,
        conversations,
        messages,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        deleteMessage,
        startConversation,
        unreadMessagesCount,
        ads,
        createAd,
        updateAd,
        deleteAd,
        hiddenAdIds,
        hideAd,
        libraryResources,
        toggleSaveLibraryResource,
        addLibraryResource,
        incrementDownloadResource
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

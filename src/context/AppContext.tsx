import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  University,
  Post,
  PostComment,
  CareerOpportunity,
  Product,
  Store,
  AcademicResource,
  KnowledgeEntry,
  CampusEvent,
  UniversityRanking,
  ArenaAnnouncement,
  NotificationItem,
  ContentReport,
  FontPreference,
  ThemePreference,
  PostCategory
} from '../types';
import {
  CURRENT_USER,
  INITIAL_UNIVERSITIES,
  INITIAL_POSTS,
  INITIAL_CIVYN_OPPORTUNITIES,
  INITIAL_PRODUCTS,
  INITIAL_STORES,
  INITIAL_ACADEMIC_RESOURCES,
  INITIAL_KNOWLEDGE_ENTRIES,
  INITIAL_EVENTS,
  INITIAL_RANKINGS,
  INITIAL_ARENA_ANNOUNCEMENTS
} from '../lib/initialData';
import { isSupabaseConfigured } from '../lib/supabase';

interface AppContextType {
  currentUser: UserProfile | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  universities: University[];
  selectedUniversityId: string;
  setSelectedUniversityId: (id: string) => void;
  selectedUniversity: University | undefined;
  
  // Posts
  posts: Post[];
  createPost: (content: string, category: PostCategory, universityId?: string, quotePost?: Post) => Post;
  editPost: (postId: string, newContent: string) => void;
  deletePost: (postId: string) => void;
  toggleLikePost: (postId: string) => void;
  toggleBookmarkPost: (postId: string) => void;
  repostPost: (postId: string, quoteText?: string) => void;
  
  // Comments
  comments: Record<string, PostComment[]>;
  addComment: (postId: string, content: string) => void;
  getCommentsForPost: (postId: string) => PostComment[];

  // Opportunities (CIVYN)
  opportunities: CareerOpportunity[];
  toggleBookmarkOpportunity: (id: string) => void;
  createOpportunity: (data: Omit<CareerOpportunity, 'id' | 'created_at'>) => void;
  deleteOpportunity: (id: string) => void;

  // Store & Products
  products: Product[];
  stores: Store[];
  createProduct: (product: Omit<Product, 'id' | 'created_at'>) => void;
  toggleProductAvailability: (id: string) => void;

  // Academics
  academicResources: AcademicResource[];
  knowledgeEntries: KnowledgeEntry[];
  events: CampusEvent[];
  createAcademicResource: (data: Omit<AcademicResource, 'id' | 'created_at'>) => void;

  // Arena
  rankings: UniversityRanking[];
  arenaAnnouncements: ArenaAnnouncement[];
  createArenaAnnouncement: (announcement: Omit<ArenaAnnouncement, 'id' | 'created_at'>) => void;

  // Moderation & Reports
  reports: ContentReport[];
  submitReport: (contentId: string, contentType: 'post' | 'comment' | 'opportunity' | 'product' | 'user', reason: string, snippet: string) => void;
  resolveReport: (reportId: string, status: 'dismissed' | 'action_taken', notes?: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;

  // Navigation & Shell State
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  isComposerOpen: boolean;
  setIsComposerOpen: (open: boolean) => void;
  selectedPostForModal: Post | null;
  setSelectedPostForModal: (post: Post | null) => void;

  // Personalization
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  font: FontPreference;
  setFont: (font: FontPreference) => void;

  // Toast Feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // System
  isSupabaseConfigured: boolean;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme & Font
  const [theme, setThemeState] = useState<ThemePreference>(() => {
    return (localStorage.getItem('univyx_theme') as ThemePreference) || 'dark';
  });

  const [font, setFontState] = useState<FontPreference>(() => {
    return (localStorage.getItem('univyx_font') as FontPreference) || 'inter';
  });

  // User
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('univyx_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  // Selected University filter ('all' or university_id)
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>('all');

  // Navigation state
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [selectedPostForModal, setSelectedPostForModal] = useState<Post | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Entities
  const [universities] = useState<University[]>(INITIAL_UNIVERSITIES);
  const [posts, setPosts] = useState<Post[]>(() => {
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
          post_id: 'post-1',
          author_id: 'usr-4',
          author: {
            username: 'tunde_law',
            full_name: 'Babatunde Adeleke',
            is_verified: true,
            university_name: 'OAU'
          },
          content: 'Huge congratulations Engineer Uche! The entire campus network celebrates with you.',
          likes_count: 9,
          is_liked: false,
          created_at: '2026-10-16T10:00:00Z'
        }
      ]
    };
  });

  const [opportunities, setOpportunities] = useState<CareerOpportunity[]>(() => {
    const saved = localStorage.getItem('univyx_opps');
    return saved ? JSON.parse(saved) : INITIAL_CIVYN_OPPORTUNITIES;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('univyx_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [stores] = useState<Store[]>(INITIAL_STORES);
  const [academicResources, setAcademicResources] = useState<AcademicResource[]>(INITIAL_ACADEMIC_RESOURCES);
  const [knowledgeEntries] = useState<KnowledgeEntry[]>(INITIAL_KNOWLEDGE_ENTRIES);
  const [events] = useState<CampusEvent[]>(INITIAL_EVENTS);
  const [rankings] = useState<UniversityRanking[]>(INITIAL_RANKINGS);
  const [arenaAnnouncements, setArenaAnnouncements] = useState<ArenaAnnouncement[]>(INITIAL_ARENA_ANNOUNCEMENTS);

  const [reports, setReports] = useState<ContentReport[]>([
    {
      id: 'rep-1',
      reporter_username: 'amina_ui',
      content_id: 'post-5',
      content_type: 'product',
      content_snippet: 'Suspicious cheap Apple charger post on Hebron hostel channel',
      reason: 'Verify vendor authenticity and warranty',
      status: 'pending',
      created_at: '2026-10-15T19:00:00Z'
    }
  ]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      user_id: 'usr-me',
      actor_name: 'Campus Dispatch',
      actor_username: 'campus_pulse',
      type: 'announcement',
      content: 'Official Inter-University debate registrations are now active in Academics.',
      target_type: 'event',
      is_read: false,
      created_at: '2026-10-16T08:15:00Z'
    },
    {
      id: 'notif-2',
      user_id: 'usr-me',
      actor_name: 'Uche Nnamdi',
      actor_username: 'uche_tech',
      type: 'like',
      content: 'liked your latest comment on Nigerian Tech Ecosystem report.',
      target_type: 'post',
      is_read: true,
      created_at: '2026-10-15T11:00:00Z'
    }
  ]);

  // Persist key states
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

  // Apply Theme
  useEffect(() => {
    localStorage.setItem('univyx_theme', theme);
    const root = document.documentElement;
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } else if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Apply Font
  useEffect(() => {
    localStorage.setItem('univyx_font', font);
    document.body.classList.remove(
      'font-pref-inter',
      'font-pref-roboto',
      'font-pref-georgia',
      'font-pref-dyslexic',
      'font-pref-system'
    );
    document.body.classList.add(`font-pref-${font}`);
  }, [font]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const setTheme = (t: ThemePreference) => {
    setThemeState(t);
    showToast(`Theme changed to ${t}`);
  };

  const setFont = (f: FontPreference) => {
    setFontState(f);
    showToast(`Typography set to ${f.toUpperCase()}`);
  };

  const selectedUniversity = universities.find((u) => u.id === selectedUniversityId);

  // Social interactions
  const createPost = (
    content: string,
    category: PostCategory,
    universityId?: string,
    quotePost?: Post
  ): Post => {
    if (!currentUser) throw new Error('Must be logged in to create a post');

    const uId = universityId || (selectedUniversityId !== 'all' ? selectedUniversityId : currentUser.university_id);
    const uObj = universities.find((u) => u.id === uId);

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author_id: currentUser.id,
      author: {
        username: currentUser.username,
        full_name: currentUser.full_name,
        is_verified: currentUser.is_verified,
        university_name: currentUser.university_name || uObj?.short_name,
        role: currentUser.role
      },
      content: content.trim(),
      category: category,
      university_id: uId,
      university_name: uObj?.name,
      likes_count: 0,
      comments_count: 0,
      reposts_count: 0,
      quotes_count: 0,
      created_at: new Date().toISOString(),
      is_liked: false,
      is_bookmarked: false,
      is_reposted: false,
      quoted_post: quotePost
        ? {
            id: quotePost.id,
            author_name: quotePost.author.full_name,
            author_username: quotePost.author.username,
            content: quotePost.content
          }
        : undefined
    };

    setPosts((prev) => [newPost, ...prev]);
    showToast('Post published to campus network');
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
    showToast('Post removed');
  };

  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const currentlyLiked = !!p.is_liked;
          return {
            ...p,
            is_liked: !currentlyLiked,
            likes_count: currentlyLiked ? Math.max(0, p.likes_count - 1) : p.likes_count + 1
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
          const currentlyBookmarked = !!p.is_bookmarked;
          showToast(currentlyBookmarked ? 'Removed from saved items' : 'Saved to Bookmarks');
          return {
            ...p,
            is_bookmarked: !currentlyBookmarked
          };
        }
        return p;
      })
    );
  };

  const repostPost = (postId: string, quoteText?: string) => {
    if (quoteText && quoteText.trim().length > 0) {
      const original = posts.find((p) => p.id === postId);
      if (original) {
        createPost(quoteText, original.category, original.university_id, original);
      }
      return;
    }

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const currentlyReposted = !!p.is_reposted;
          showToast(currentlyReposted ? 'Undo repost' : 'Reposted to your profile');
          return {
            ...p,
            is_reposted: !currentlyReposted,
            reposts_count: currentlyReposted ? Math.max(0, p.reposts_count - 1) : p.reposts_count + 1
          };
        }
        return p;
      })
    );
  };

  const addComment = (postId: string, content: string) => {
    if (!currentUser) return;
    const newComment: PostComment = {
      id: `comm-${Date.now()}`,
      post_id: postId,
      author_id: currentUser.id,
      author: {
        username: currentUser.username,
        full_name: currentUser.full_name,
        is_verified: currentUser.is_verified,
        university_name: currentUser.university_name
      },
      content: content.trim(),
      likes_count: 0,
      is_liked: false,
      created_at: new Date().toISOString()
    };

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));

    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments_count: p.comments_count + 1 } : p))
    );

    showToast('Reply added to discussion');
  };

  const getCommentsForPost = (postId: string) => comments[postId] || [];

  // Opportunities
  const toggleBookmarkOpportunity = (id: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => {
        if (opp.id === id) {
          const nowSaved = !opp.is_bookmarked;
          showToast(nowSaved ? 'Opportunity saved to CIVYN tracker' : 'Removed from saved opportunities');
          return { ...opp, is_bookmarked: nowSaved };
        }
        return opp;
      })
    );
  };

  const createOpportunity = (data: Omit<CareerOpportunity, 'id' | 'created_at'>) => {
    const newOpp: CareerOpportunity = {
      ...data,
      id: `opp-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setOpportunities((prev) => [newOpp, ...prev]);
    showToast('CIVYN opportunity listing created');
  };

  const deleteOpportunity = (id: string) => {
    setOpportunities((prev) => prev.filter((o) => o.id !== id));
    showToast('Opportunity removed');
  };

  // Store
  const createProduct = (productData: Omit<Product, 'id' | 'created_at'>) => {
    const newProd: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast('Product listed on Campus Store');
  };

  const toggleProductAvailability = (id: string) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, is_available: !prod.is_available } : prod))
    );
    showToast('Product status updated');
  };

  // Academics
  const createAcademicResource = (data: Omit<AcademicResource, 'id' | 'created_at'>) => {
    const newRes: AcademicResource = {
      ...data,
      id: `res-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setAcademicResources((prev) => [newRes, ...prev]);
    showToast('Academic resource published');
  };

  // Arena
  const createArenaAnnouncement = (data: Omit<ArenaAnnouncement, 'id' | 'created_at'>) => {
    const newAnn: ArenaAnnouncement = {
      ...data,
      id: `arena-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setArenaAnnouncements((prev) => [newAnn, ...prev]);
    showToast('Arena announcement published');
  };

  // Moderation
  const submitReport = (
    contentId: string,
    contentType: 'post' | 'comment' | 'opportunity' | 'product' | 'user',
    reason: string,
    snippet: string
  ) => {
    const newReport: ContentReport = {
      id: `rep-${Date.now()}`,
      reporter_username: currentUser?.username || 'anonymous',
      content_id: contentId,
      content_type: contentType,
      content_snippet: snippet,
      reason,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    setReports((prev) => [newReport, ...prev]);
    showToast('Report submitted for administrative review. Thank you for keeping univyX safe.');
  };

  const resolveReport = (reportId: string, status: 'dismissed' | 'action_taken', notes?: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status, moderator_notes: notes } : r))
    );
    showToast(`Report marked as ${status}`);
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    showToast('All notifications marked as read');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.is_read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
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
        stores,
        createProduct,
        toggleProductAvailability,
        academicResources,
        knowledgeEntries,
        events,
        createAcademicResource,
        rankings,
        arenaAnnouncements,
        createArenaAnnouncement,
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
        selectedPostForModal,
        setSelectedPostForModal,
        theme,
        setTheme,
        font,
        setFont,
        toastMessage,
        showToast,
        isSupabaseConfigured
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

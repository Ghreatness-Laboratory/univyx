export type PostCategory =
  | 'general'
  | 'entertainment'
  | 'academics'
  | 'career'
  | 'gaming'
  | 'campus_news'
  | 'events'
  | 'marketplace';

export interface PostAuthor {
  id: string;
  fullName: string;
  full_name: string;
  username: string;
  isVerified?: boolean;
  is_verified?: boolean;
  universityName?: string;
  university_name?: string;
}

export interface MockPost {
  id: string;
  authorId: string;
  author_id?: string;
  authorName: string;
  author: PostAuthor;
  username: string;
  universityId: string;
  university_id?: string;
  universityName: string;
  university_name?: string;
  content: string;
  category: PostCategory;
  likesCount: number;
  likes_count?: number;
  commentsCount: number;
  comments_count?: number;
  repostsCount: number;
  reposts_count?: number;
  quotesCount: number;
  quotes_count?: number;
  isLiked?: boolean;
  is_liked?: boolean;
  isBookmarked?: boolean;
  is_bookmarked?: boolean;
  isReposted?: boolean;
  is_reposted?: boolean;
  isPinned?: boolean;
  is_pinned?: boolean;
  createdAt: string;
  created_at?: string;
  quotedPost?: {
    id: string;
    authorName: string;
    username: string;
    content: string;
  };
}

export const INITIAL_POSTS: MockPost[] = [
  {
    id: 'post-1',
    authorId: 'usr-chidi',
    author_id: 'usr-chidi',
    authorName: 'Chidi Okafor',
    author: {
      id: 'usr-chidi',
      fullName: 'Chidi Okafor',
      full_name: 'Chidi Okafor',
      username: 'chidi_cu',
      isVerified: true,
      is_verified: true,
      universityName: 'Covenant University',
      university_name: 'Covenant University'
    },
    username: 'chidi_cu',
    universityId: 'covenant',
    university_id: 'covenant',
    universityName: 'Covenant University',
    university_name: 'Covenant University',
    content: 'Final year software engineering capstone presentation complete at the College of Science & Technology! Shoutout to everyone burning the midnight oil at CST labs. Next stop: Convocation Arena! #CovenantTech #UnivyxScholars',
    category: 'academics',
    likesCount: 142,
    likes_count: 142,
    commentsCount: 28,
    comments_count: 28,
    repostsCount: 19,
    reposts_count: 19,
    quotesCount: 4,
    quotes_count: 4,
    isLiked: false,
    is_liked: false,
    isBookmarked: false,
    is_bookmarked: false,
    isReposted: false,
    is_reposted: false,
    createdAt: '2026-10-16T11:15:00Z',
    created_at: '2026-10-16T11:15:00Z'
  },
  {
    id: 'post-2',
    authorId: 'usr-pulse',
    author_id: 'usr-pulse',
    authorName: 'Univyx Campus Pulse',
    author: {
      id: 'usr-pulse',
      fullName: 'Univyx Campus Pulse',
      full_name: 'Univyx Campus Pulse',
      username: 'univyx_official',
      isVerified: true,
      is_verified: true,
      universityName: 'All Private Universities',
      university_name: 'All Private Universities'
    },
    username: 'univyx_official',
    universityId: 'covenant',
    university_id: 'covenant',
    universityName: 'Inter-Collegiate Network',
    university_name: 'Inter-Collegiate Network',
    content: 'Welcome to Univyx — Revolutionizing the student experience. Strictly connecting verified scholars across Nigeria\'s premier private universities: Covenant, Babcock, ABUAD, Pan-Atlantic, Redeemer\'s, Nile, Baze, Bowen and 20+ member campuses.',
    category: 'campus_news',
    likesCount: 520,
    likes_count: 520,
    commentsCount: 84,
    comments_count: 84,
    repostsCount: 112,
    reposts_count: 112,
    quotesCount: 31,
    quotes_count: 31,
    isLiked: true,
    is_liked: true,
    isBookmarked: true,
    is_bookmarked: true,
    isReposted: false,
    is_reposted: false,
    isPinned: true,
    is_pinned: true,
    createdAt: '2026-10-16T08:00:00Z',
    created_at: '2026-10-16T08:00:00Z'
  },
  {
    id: 'post-3',
    authorId: 'usr-zainab',
    author_id: 'usr-zainab',
    authorName: 'Zainab Al-Hassan',
    author: {
      id: 'usr-zainab',
      fullName: 'Zainab Al-Hassan',
      full_name: 'Zainab Al-Hassan',
      username: 'zainab_nile',
      isVerified: true,
      is_verified: true,
      universityName: 'Nile University of Nigeria',
      university_name: 'Nile University of Nigeria'
    },
    username: 'zainab_nile',
    universityId: 'nile',
    university_id: 'nile',
    universityName: 'Nile University of Nigeria',
    university_name: 'Nile University of Nigeria',
    content: 'Our Nile Cybersecurity team just qualified for the Univyx Inter-Collegiate Cyber Drill Finals in Abuja! Huge shoutout to the Baze and Veritas squads for an intense semi-final capture-the-flag match. #NileTech #CyberSecurity #UnivyxArena',
    category: 'gaming',
    likesCount: 98,
    likes_count: 98,
    commentsCount: 15,
    comments_count: 15,
    repostsCount: 12,
    reposts_count: 12,
    quotesCount: 2,
    quotes_count: 2,
    isLiked: false,
    is_liked: false,
    isBookmarked: false,
    is_bookmarked: false,
    isReposted: false,
    is_reposted: false,
    createdAt: '2026-10-16T10:30:00Z',
    created_at: '2026-10-16T10:30:00Z'
  },
  {
    id: 'post-4',
    authorId: 'usr-damola',
    author_id: 'usr-damola',
    authorName: 'Adedamola Adeleke',
    author: {
      id: 'usr-damola',
      fullName: 'Adedamola Adeleke',
      full_name: 'Adedamola Adeleke',
      username: 'damola_abuad',
      isVerified: true,
      is_verified: true,
      universityName: 'Afe Babalola University (ABUAD)',
      university_name: 'Afe Babalola University (ABUAD)'
    },
    username: 'damola_abuad',
    universityId: 'abuad',
    university_id: 'abuad',
    universityName: 'Afe Babalola University (ABUAD)',
    university_name: 'Afe Babalola University (ABUAD)',
    content: 'ABUAD Law Clinic just published the 2026 Student Evidence Act Digest in the Academics section! Check it out if you\'re taking Jurisprudence or Commercial Law tests this semester. Free open PDF link provided. #ABUADLaw #Academics',
    category: 'academics',
    likesCount: 215,
    likes_count: 215,
    commentsCount: 39,
    comments_count: 39,
    repostsCount: 45,
    reposts_count: 45,
    quotesCount: 7,
    quotes_count: 7,
    isLiked: false,
    is_liked: false,
    isBookmarked: true,
    is_bookmarked: true,
    isReposted: false,
    is_reposted: false,
    createdAt: '2026-10-16T09:45:00Z',
    created_at: '2026-10-16T09:45:00Z'
  },
  {
    id: 'post-5',
    authorId: 'usr-simi',
    author_id: 'usr-simi',
    authorName: 'Simisola Davies',
    author: {
      id: 'usr-simi',
      fullName: 'Simisola Davies',
      full_name: 'Simisola Davies',
      username: 'simi_pau',
      isVerified: false,
      is_verified: false,
      universityName: 'Pan-Atlantic University',
      university_name: 'Pan-Atlantic University'
    },
    username: 'simi_pau',
    universityId: 'pau',
    university_id: 'pau',
    universityName: 'Pan-Atlantic University',
    university_name: 'Pan-Atlantic University',
    content: 'Who else attended the Media & Tech Summit at PAU main auditorium today? The panel on African fintech and design systems by Flutterwave alumni was pure gold. Networking opportunities on CIVYN were shared on stage! #PAULife #CIVYN',
    category: 'career',
    likesCount: 88,
    likes_count: 88,
    commentsCount: 14,
    comments_count: 14,
    repostsCount: 9,
    reposts_count: 9,
    quotesCount: 1,
    quotes_count: 1,
    isLiked: false,
    is_liked: false,
    isBookmarked: false,
    is_bookmarked: false,
    isReposted: false,
    is_reposted: false,
    createdAt: '2026-10-15T18:20:00Z',
    created_at: '2026-10-15T18:20:00Z'
  },
  {
    id: 'post-6',
    authorId: 'usr-korede',
    author_id: 'usr-korede',
    authorName: 'Korede Balogun',
    author: {
      id: 'usr-korede',
      fullName: 'Korede Balogun',
      full_name: 'Korede Balogun',
      username: 'korede_babcock',
      isVerified: false,
      is_verified: false,
      universityName: 'Babcock University',
      university_name: 'Babcock University'
    },
    username: 'korede_babcock',
    universityId: 'babcock',
    university_id: 'babcock',
    universityName: 'Babcock University',
    university_name: 'Babcock University',
    content: 'Babcock classical music orchestra rehearsals for the All-Private Carol Gala kick off tonight at Pioneer Church auditorium. Any acoustic violinists or tenors interested in joining? Leave a comment or message on Univyx! #BabcockChoir #Entertainment',
    category: 'entertainment',
    likesCount: 134,
    likes_count: 134,
    commentsCount: 22,
    comments_count: 22,
    repostsCount: 16,
    reposts_count: 16,
    quotesCount: 3,
    quotes_count: 3,
    isLiked: false,
    is_liked: false,
    isBookmarked: false,
    is_bookmarked: false,
    isReposted: false,
    is_reposted: false,
    createdAt: '2026-10-15T16:05:00Z',
    created_at: '2026-10-15T16:05:00Z'
  }
];

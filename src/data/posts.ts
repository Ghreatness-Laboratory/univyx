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
  verificationTier?: 'none' | 'blue' | 'gold';
  verification_tier?: 'none' | 'blue' | 'gold';
  followersCount?: number;
  followers_count?: number;
  universityId?: string;
  university_id?: string;
  universityName?: string;
  university_name?: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PostPoll {
  id: string;
  question?: string;
  options: PollOption[];
  totalVotes: number;
  duration: '1h' | '1d' | '3d' | '7d';
  expiresAt: string;
  isClosed?: boolean;
  userVotedOptionId?: string;
}

export interface MockPost {
  id: string;
  authorId: string;
  author_id?: string;
  authorName: string;
  author?: PostAuthor;
  username: string;
  universityId: string;
  university_id?: string;
  universityName: string;
  university_name?: string;
  isVerified?: boolean;
  is_verified?: boolean;
  verificationTier?: 'none' | 'blue' | 'gold';
  verification_tier?: 'none' | 'blue' | 'gold';
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
  location?: string;
  mediaUrl?: string;
  media_url?: string;
  poll?: PostPoll;
  createdAt: string;
  created_at?: string;
  quotedPost?: {
    id?: string;
    authorName?: string;
    author_name?: string;
    username?: string;
    author_username?: string;
    verificationTier?: 'none' | 'blue' | 'gold';
    verification_tier?: 'none' | 'blue' | 'gold';
    content?: string;
  };
}

export const INITIAL_POSTS: MockPost[] = [
  {
    id: 'post-poll-academics',
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
      verificationTier: 'blue',
      verification_tier: 'blue',
      followersCount: 742,
      followers_count: 742,
      universityName: 'Covenant University',
      university_name: 'Covenant University'
    },
    username: 'chidi_cu',
    universityId: 'covenant',
    university_id: 'covenant',
    universityName: 'Covenant University',
    university_name: 'Covenant University',
    verificationTier: 'blue',
    verification_tier: 'blue',
    content: 'Quick poll for 300L/400L Software Engineering & Computer Science scholars across CU, Babcock, PAU & ABUAD: Which backend architectural pattern is your capstone project utilizing this session?',
    category: 'academics',
    likesCount: 184,
    likes_count: 184,
    commentsCount: 36,
    comments_count: 36,
    repostsCount: 28,
    reposts_count: 28,
    quotesCount: 7,
    quotes_count: 7,
    isLiked: false,
    isBookmarked: false,
    isReposted: false,
    location: 'Covenant University, Ota (Canaanland)',
    poll: {
      id: 'poll-1',
      question: 'Which backend architecture for final capstone projects?',
      options: [
        { id: 'opt-1', text: 'Distributed Microservices (Go / Rust)', votes: 142 },
        { id: 'opt-2', text: 'Modular Monolith (Node.js / TypeScript)', votes: 98 },
        { id: 'opt-3', text: 'Serverless Edge / Cloud Run (GCP)', votes: 64 },
        { id: 'opt-4', text: 'Event-Driven (Kafka / RabbitMQ)', votes: 34 }
      ],
      totalVotes: 338,
      duration: '3d',
      expiresAt: '2026-10-19T18:00:00Z',
      isClosed: false
    },
    createdAt: '2026-10-16T15:30:00Z',
    created_at: '2026-10-16T15:30:00Z'
  },
  {
    id: 'post-poll-campus-news',
    authorId: 'usr-korede',
    author_id: 'usr-korede',
    authorName: 'Korede Balogun',
    author: {
      id: 'usr-korede',
      fullName: 'Korede Balogun',
      full_name: 'Korede Balogun',
      username: 'korede_babcock',
      isVerified: true,
      is_verified: true,
      verificationTier: 'blue',
      verification_tier: 'blue',
      followersCount: 1040,
      followers_count: 1040,
      universityName: 'Babcock University',
      university_name: 'Babcock University'
    },
    username: 'korede_babcock',
    universityId: 'babcock',
    university_id: 'babcock',
    universityName: 'Babcock University',
    university_name: 'Babcock University',
    verificationTier: 'blue',
    verification_tier: 'blue',
    content: 'Inter-Collegiate Debate: Should private university student councils partner with Univyx Arena to host an official cross-campus collegiate FIFA/FC26 tournament with cash prizes?',
    category: 'campus_news',
    likesCount: 245,
    likes_count: 245,
    commentsCount: 52,
    comments_count: 52,
    repostsCount: 41,
    reposts_count: 41,
    quotesCount: 12,
    quotes_count: 12,
    isLiked: false,
    isBookmarked: false,
    isReposted: false,
    location: 'Babcock University, Ilishan-Remo (Main Campus)',
    poll: {
      id: 'poll-2',
      question: 'Cross-campus collegiate gaming tournament?',
      options: [
        { id: 'opt-2-1', text: 'Yes, full varsity league with trophy', votes: 486 },
        { id: 'opt-2-2', text: 'Yes, but casual weekend cups only', votes: 124 },
        { id: 'opt-2-3', text: 'Prioritize tech hackathons first', votes: 68 }
      ],
      totalVotes: 678,
      duration: '7d',
      expiresAt: '2026-10-23T18:00:00Z',
      isClosed: false
    },
    createdAt: '2026-10-16T14:15:00Z',
    created_at: '2026-10-16T14:15:00Z'
  },
  {
    id: 'post-official-cu',
    authorId: 'usr-covenant-admin',
    author_id: 'usr-covenant-admin',
    authorName: 'Covenant University',
    author: {
      id: 'usr-covenant-admin',
      fullName: 'Covenant University',
      full_name: 'Covenant University',
      username: 'covenant_official',
      isVerified: true,
      is_verified: true,
      verificationTier: 'gold',
      verification_tier: 'gold',
      followersCount: 18400,
      followers_count: 18400,
      universityName: 'Covenant University',
      university_name: 'Covenant University'
    },
    username: 'covenant_official',
    universityId: 'covenant',
    university_id: 'covenant',
    universityName: 'Covenant University',
    university_name: 'Covenant University',
    verificationTier: 'gold',
    verification_tier: 'gold',
    content: 'Official Senate Bulletin: Second semester timetable and faculty project defense guidelines have been gazetted on the portal. Please ensure departmental clearances are completed before Friday. #CovenantOfficial #Academics',
    category: 'campus_news',
    likesCount: 640,
    likes_count: 640,
    commentsCount: 92,
    comments_count: 92,
    repostsCount: 184,
    reposts_count: 184,
    quotesCount: 38,
    quotes_count: 38,
    isLiked: false,
    is_liked: false,
    isBookmarked: true,
    is_bookmarked: true,
    isReposted: false,
    is_reposted: false,
    isPinned: true,
    is_pinned: true,
    location: 'Covenant University, Ota (Canaanland)',
    createdAt: '2026-10-16T12:00:00Z',
    created_at: '2026-10-16T12:00:00Z'
  },
  {
    id: 'post-org-cst',
    authorId: 'usr-cst-council',
    author_id: 'usr-cst-council',
    authorName: 'CST Student Council',
    author: {
      id: 'usr-cst-council',
      fullName: 'CST Student Council',
      full_name: 'CST Student Council',
      username: 'cst_council',
      isVerified: true,
      is_verified: true,
      verificationTier: 'gold',
      verification_tier: 'gold',
      followersCount: 4200,
      followers_count: 4200,
      universityName: 'Covenant University',
      university_name: 'Covenant University'
    },
    username: 'cst_council',
    universityId: 'covenant',
    university_id: 'covenant',
    universityName: 'Covenant University',
    university_name: 'Covenant University',
    verificationTier: 'gold',
    verification_tier: 'gold',
    content: 'Registration for the 2026 Inter-Faculty Hackathon & Collegiate Tech Summit is officially open! Teams from Computer Science, Software Engineering, and Electrical Engineering can submit project briefs now. #CSTCouncil #UnivyxArena',
    category: 'academics',
    likesCount: 310,
    likes_count: 310,
    commentsCount: 45,
    comments_count: 45,
    repostsCount: 62,
    reposts_count: 62,
    quotesCount: 14,
    quotes_count: 14,
    isLiked: true,
    is_liked: true,
    isBookmarked: false,
    is_bookmarked: false,
    location: 'Covenant University, Ota (Canaanland)',
    createdAt: '2026-10-16T11:40:00Z',
    created_at: '2026-10-16T11:40:00Z'
  },
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
      isVerified: false,
      is_verified: false,
      verificationTier: 'none',
      verification_tier: 'none',
      followersCount: 742,
      followers_count: 742,
      universityName: 'Covenant University',
      university_name: 'Covenant University'
    },
    username: 'chidi_cu',
    universityId: 'covenant',
    university_id: 'covenant',
    universityName: 'Covenant University',
    university_name: 'Covenant University',
    verificationTier: 'none',
    verification_tier: 'none',
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
    location: 'Hebron Tech Quarter, Ota',
    createdAt: '2026-10-16T11:15:00Z',
    created_at: '2026-10-16T11:15:00Z'
  },
  {
    id: 'post-korede',
    authorId: 'usr-korede',
    author_id: 'usr-korede',
    authorName: 'Korede Balogun',
    author: {
      id: 'usr-korede',
      fullName: 'Korede Balogun',
      full_name: 'Korede Balogun',
      username: 'korede_babcock',
      isVerified: true,
      is_verified: true,
      verificationTier: 'blue',
      verification_tier: 'blue',
      followersCount: 1000,
      followers_count: 1000,
      universityName: 'Babcock University',
      university_name: 'Babcock University'
    },
    username: 'korede_babcock',
    universityId: 'babcock',
    university_id: 'babcock',
    universityName: 'Babcock University',
    university_name: 'Babcock University',
    verificationTier: 'blue',
    verification_tier: 'blue',
    content: 'Just hit exactly 1,000 followers and earned my Univyx Blue Tick verification badge! Truly grateful to the Babcock music & arts community for connecting and sharing ideas. #BlueTick #Milestone #BabcockVarsity',
    category: 'entertainment',
    likesCount: 288,
    likes_count: 288,
    commentsCount: 54,
    comments_count: 54,
    repostsCount: 39,
    reposts_count: 39,
    quotesCount: 9,
    quotes_count: 9,
    isLiked: true,
    is_liked: true,
    isBookmarked: false,
    is_bookmarked: false,
    isReposted: false,
    is_reposted: false,
    createdAt: '2026-10-16T10:45:00Z',
    created_at: '2026-10-16T10:45:00Z'
  },
  {
    id: 'post-tobi',
    authorId: 'usr-tobi',
    author_id: 'usr-tobi',
    authorName: 'Tobi Adebayo',
    author: {
      id: 'usr-tobi',
      fullName: 'Tobi Adebayo',
      full_name: 'Tobi Adebayo',
      username: 'tobi_adebayo',
      isVerified: false,
      is_verified: false,
      verificationTier: 'none',
      verification_tier: 'none',
      followersCount: 999,
      followers_count: 999,
      universityName: 'Babcock University',
      university_name: 'Babcock University'
    },
    username: 'tobi_adebayo',
    universityId: 'babcock',
    university_id: 'babcock',
    universityName: 'Babcock University',
    university_name: 'Babcock University',
    verificationTier: 'none',
    verification_tier: 'none',
    content: 'Currently sitting at 999 followers on Univyx! Just 1 more scholar to reach the 1,000 follower threshold for the automatic Blue Tick. Who will be scholar number 1,000? #Medicine #BabcockScholars',
    category: 'general',
    likesCount: 165,
    likes_count: 165,
    commentsCount: 31,
    comments_count: 31,
    repostsCount: 22,
    reposts_count: 22,
    quotesCount: 6,
    quotes_count: 6,
    isLiked: false,
    is_liked: false,
    isBookmarked: false,
    is_bookmarked: false,
    isReposted: false,
    is_reposted: false,
    createdAt: '2026-10-16T10:00:00Z',
    created_at: '2026-10-16T10:00:00Z'
  },
  {
    id: 'post-zainab',
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
      verificationTier: 'blue',
      verification_tier: 'blue',
      followersCount: 2150,
      followers_count: 2150,
      universityName: 'Nile University of Nigeria',
      university_name: 'Nile University of Nigeria'
    },
    username: 'zainab_nile',
    universityId: 'nile',
    university_id: 'nile',
    universityName: 'Nile University of Nigeria',
    university_name: 'Nile University of Nigeria',
    verificationTier: 'blue',
    verification_tier: 'blue',
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
    createdAt: '2026-10-16T09:30:00Z',
    created_at: '2026-10-16T09:30:00Z'
  },
  {
    id: 'post-damola',
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
      verificationTier: 'blue',
      verification_tier: 'blue',
      followersCount: 1420,
      followers_count: 1420,
      universityName: 'Afe Babalola University (ABUAD)',
      university_name: 'Afe Babalola University (ABUAD)'
    },
    username: 'damola_abuad',
    universityId: 'abuad',
    university_id: 'abuad',
    universityName: 'Afe Babalola University (ABUAD)',
    university_name: 'Afe Babalola University (ABUAD)',
    verificationTier: 'blue',
    verification_tier: 'blue',
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
    createdAt: '2026-10-16T08:45:00Z',
    created_at: '2026-10-16T08:45:00Z'
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
      verificationTier: 'gold',
      verification_tier: 'gold',
      followersCount: 35000,
      followers_count: 35000,
      universityName: 'All Private Universities',
      university_name: 'All Private Universities'
    },
    username: 'univyx_official',
    universityId: 'covenant',
    university_id: 'covenant',
    universityName: 'Inter-Collegiate Network',
    university_name: 'Inter-Collegiate Network',
    verificationTier: 'gold',
    verification_tier: 'gold',
    content: 'Welcome to Univyx — Revolutionalizing the student experience. Strictly connecting verified scholars across Nigeria\'s premier private universities: Covenant, Babcock, ABUAD, Pan-Atlantic, Redeemer\'s, Nile, Baze, Bowen and 20+ member campuses.',
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
    createdAt: '2026-10-16T08:00:00Z',
    created_at: '2026-10-16T08:00:00Z'
  }
];

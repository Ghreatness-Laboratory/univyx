export type UserRole = 'user' | 'moderator' | 'admin' | 'superadmin';

export interface University {
  id: string;
  name: string;
  short_name: string;
  code: string;
  country: string;
  state: string;
  city: string;
  website?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  bio?: string;
  university_id?: string;
  university_name?: string;
  faculty?: string;
  department?: string;
  academic_level?: string; // '100L', '200L', '300L', '400L', '500L', 'Postgraduate', 'Alumni'
  is_verified?: boolean;
  role: UserRole;
  created_at: string;
  post_count?: number;
  followers_count?: number;
  following_count?: number;
}

export type PostCategory =
  | 'general'
  | 'entertainment'
  | 'academics'
  | 'career'
  | 'gaming'
  | 'campus_news'
  | 'events'
  | 'marketplace';

export interface Post {
  id: string;
  author_id: string;
  author: {
    username: string;
    full_name: string;
    is_verified?: boolean;
    university_name?: string;
    role?: UserRole;
  };
  content: string;
  category: PostCategory;
  university_id?: string;
  university_name?: string;
  likes_count: number;
  comments_count: number;
  reposts_count: number;
  quotes_count: number;
  is_pinned?: boolean;
  created_at: string;
  // Client state
  is_liked?: boolean;
  is_bookmarked?: boolean;
  is_reposted?: boolean;
  quoted_post?: {
    id: string;
    author_name: string;
    author_username: string;
    content: string;
  };
}

export interface PostComment {
  id: string;
  post_id: string;
  author_id: string;
  author: {
    username: string;
    full_name: string;
    is_verified?: boolean;
    university_name?: string;
  };
  content: string;
  likes_count: number;
  is_liked?: boolean;
  created_at: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  organizer: string;
  university_id?: string;
  university_name?: string;
  venue: string;
  start_time: string;
  end_time?: string;
  registration_url?: string;
  category: string;
  status: 'draft' | 'published' | 'archived' | 'cancelled';
  created_at: string;
}

export type AcademicResourceType =
  | 'book'
  | 'tutorial'
  | 'study_note'
  | 'course_summary'
  | 'exam_paper'
  | 'reference';

export interface AcademicResource {
  id: string;
  title: string;
  author: string;
  subject: string;
  description: string;
  university_id?: string;
  university_name?: string;
  resource_type: AcademicResourceType;
  external_url?: string;
  is_free: boolean;
  contributor_name?: string;
  status: 'pending' | 'published' | 'rejected';
  created_at: string;
}

export interface KnowledgeEntry {
  id: string;
  title: string;
  summary: string;
  content: string;
  category:
    | 'university_info'
    | 'faculty'
    | 'department'
    | 'academic_procedure'
    | 'grading_system'
    | 'campus_facility'
    | 'student_service'
    | 'faq';
  university_id?: string;
  tags: string[];
  source_attribution?: string;
  last_updated: string;
}

export type OpportunityType =
  | 'student_job'
  | 'internship'
  | 'siwes'
  | 'graduate_trainee'
  | 'scholarship'
  | 'fellowship'
  | 'volunteering'
  | 'entry_level'
  | 'career_event';

export interface CareerOpportunity {
  id: string;
  title: string;
  organization: string;
  type: OpportunityType;
  location: string;
  workplace_type: 'remote' | 'hybrid' | 'onsite';
  compensation?: string;
  eligibility: string;
  required_skills: string[];
  deadline: string;
  description: string;
  application_url: string;
  university_id?: string;
  university_name?: string;
  status: 'draft' | 'published' | 'expired' | 'archived';
  created_at: string;
  is_bookmarked?: boolean;
}

export type ProductCategory =
  | 'perfumes'
  | 'clothing'
  | 'shoes'
  | 'gadgets'
  | 'phones_accessories'
  | 'books_stationery'
  | 'beauty_care'
  | 'food_snacks'
  | 'essentials'
  | 'thrift_preowned'
  | 'other';

export interface Store {
  id: string;
  name: string;
  owner_id: string;
  owner_name: string;
  university_id: string;
  university_name: string;
  description: string;
  contact_email?: string;
  contact_phone?: string;
  contact_whatsapp?: string;
  is_verified: boolean;
  status: 'active' | 'suspended' | 'closed';
  created_at: string;
}

export interface Product {
  id: string;
  store_id: string;
  store_name: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: ProductCategory;
  condition: 'new' | 'pre-owned';
  pickup_location: string;
  university_name: string;
  contact_url?: string;
  is_available: boolean;
  created_at: string;
}

export interface ArenaAnnouncement {
  id: string;
  title: string;
  description: string;
  category: string;
  event_date?: string;
  status: string;
  created_at: string;
}

export interface UniversityRanking {
  id: string;
  university_id: string;
  university_name: string;
  university_short: string;
  power_score: number;
  academic_score: number;
  gaming_score: number;
  sports_score: number;
  tournaments_won: number;
  badge?: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  actor_name: string;
  actor_username: string;
  type: 'like' | 'comment' | 'mention' | 'repost' | 'quote' | 'follow' | 'announcement' | 'opportunity_deadline';
  content: string;
  target_id?: string;
  target_type?: string;
  is_read: boolean;
  created_at: string;
}

export interface ContentReport {
  id: string;
  reporter_username: string;
  content_id: string;
  content_type: 'post' | 'comment' | 'opportunity' | 'product' | 'user';
  content_snippet: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'dismissed' | 'action_taken';
  moderator_notes?: string;
  created_at: string;
}

export type FontPreference = 'inter' | 'roboto' | 'georgia' | 'dyslexic' | 'system';
export type ThemePreference = 'light' | 'dark' | 'system';

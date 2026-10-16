import { PrivateUniversity } from '../data/universities';
import { MockPost, PostCategory } from '../data/posts';
import { CivynOpportunity, CivynType } from '../data/civyn';
import { StoreProduct, StoreCategory } from '../data/store';
import { AcademicTutorial, UniversityKnowledgeEntry } from '../data/academics';
import { CollegiateRanking, ArenaTournament } from '../data/arena';
import { CampusEvent } from '../data/events';

// Core User Roles
export type UserRole = 'user' | 'moderator' | 'admin' | 'superadmin';

// User Profile model with full camelCase and compatibility snake_case access
export interface UserProfile {
  id: string;
  fullName: string;
  full_name?: string;
  username: string;
  email: string;
  bio?: string;
  universityId: string;
  university_id?: string;
  universityName: string;
  university_name?: string;
  faculty?: string;
  department?: string;
  academicLevel?: '100L' | '200L' | '300L' | '400L' | '500L' | 'Postgraduate' | 'Alumni';
  academic_level?: '100L' | '200L' | '300L' | '400L' | '500L' | 'Postgraduate' | 'Alumni';
  interests?: string[];
  isVerified?: boolean;
  is_verified?: boolean;
  role: UserRole;
  createdAt: string;
  created_at?: string;
  postsCount?: number;
  posts_count?: number;
  followersCount?: number;
  followers_count?: number;
  followingCount?: number;
  following_count?: number;
  store_name?: string;
}

// Re-exported Domain Models & Aliases
export type Post = MockPost;
export { MockPost, PostCategory };

export type University = PrivateUniversity;
export { PrivateUniversity };

export type CareerOpportunity = CivynOpportunity;
export type OpportunityType = CivynType;
export { CivynOpportunity, CivynType };

export type Product = StoreProduct;
export type ProductCategory = StoreCategory;
export { StoreProduct, StoreCategory };

export interface Store {
  id: string;
  name: string;
  description: string;
  vendorName: string;
  universityName: string;
}

export type AcademicResource = AcademicTutorial;
export type KnowledgeEntry = UniversityKnowledgeEntry;
export { AcademicTutorial, UniversityKnowledgeEntry };

export type UniversityRanking = CollegiateRanking;
export { CollegiateRanking, ArenaTournament, CampusEvent };

export interface ArenaAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
}

// Comment Model
export interface PostComment {
  id: string;
  postId: string;
  post_id?: string;
  authorId: string;
  author_id?: string;
  authorName: string;
  author?: {
    id: string;
    fullName: string;
    full_name: string;
    username: string;
  };
  username: string;
  universityName: string;
  university_name?: string;
  content: string;
  likesCount: number;
  likes_count?: number;
  isLiked?: boolean;
  createdAt: string;
  created_at?: string;
}

// Moderation & Reports
export interface ContentReport {
  id: string;
  reporterUsername: string;
  reporter_username?: string;
  contentId: string;
  content_id?: string;
  contentType: 'post' | 'comment' | 'opportunity' | 'product' | 'user';
  content_type?: 'post' | 'comment' | 'opportunity' | 'product' | 'user';
  contentSnippet: string;
  content_snippet?: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'dismissed' | 'action_taken';
  moderatorNotes?: string;
  createdAt: string;
  created_at?: string;
}

// In-App Notification
export interface NotificationItem {
  id: string;
  userId: string;
  user_id?: string;
  actorName: string;
  actor_name?: string;
  actorUsername: string;
  actor_username?: string;
  type: 'like' | 'comment' | 'mention' | 'repost' | 'quote' | 'follow' | 'announcement' | 'opportunity_deadline';
  content: string;
  targetId?: string;
  targetType?: string;
  isRead: boolean;
  is_read?: boolean;
  createdAt: string;
  created_at?: string;
}

// Typography & Appearance Preferences
export type FontPreference = 'jakarta' | 'inter' | 'roboto' | 'georgia' | 'dyslexic' | 'system';
export type ThemePreference = 'light' | 'dark' | 'system';

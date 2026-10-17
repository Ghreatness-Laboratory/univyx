export interface SponsoredAd {
  id: string;
  title: string;
  headline?: string;
  text: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  ctaLabel: string;
  ctaUrl: string;
  advertiserName: string;
  targetUniversityId: string; // 'all' or university id
  placement?: 'home' | 'academics' | 'store' | 'all';
  spend?: string;
  startDate: string;
  endDate: string;
  status: 'Running' | 'Active' | 'Paused' | 'Pending' | 'Completed';
  impressions: number;
  clicks: number;
  ctr: number;
  createdAt: string;
}

export const INITIAL_ADS: SponsoredAd[] = [
  {
    id: 'ad-1',
    title: 'Private Campus Student Tech Bundle',
    headline: 'M3 MacBooks & ThinkPads for Verified Scholars',
    text: 'Special verified collegiate pricing on Apple M3 MacBooks, Lenovo ThinkPads & noise-cancelling headphones for scholars. Direct verified delivery to Covenant, Babcock, PAU, and ABUAD halls.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    ctaLabel: 'Claim Student Discount',
    ctaUrl: '#store',
    advertiserName: 'Campus Gadget Hub Nigeria',
    targetUniversityId: 'all',
    placement: 'home',
    spend: '₦125,000',
    startDate: '2026-10-01',
    endDate: '2026-11-30',
    status: 'Running',
    impressions: 16420,
    clicks: 1045,
    ctr: 6.36,
    createdAt: '2026-10-01T08:00:00Z'
  },
  {
    id: 'ad-2',
    title: 'Univyx Inter-Collegiate Coding Championship 2026',
    headline: '₦5,000,000 Prize Pool & Direct SIWES Placements',
    text: 'Represent your university in the biggest algorithmic hackathon for private varsity students. ₦5,000,000 in collegiate grants and direct summer internships with top African fintechs.',
    mediaType: 'video',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    ctaLabel: 'Register Varsity Team',
    ctaUrl: '#arena',
    advertiserName: 'Univyx Arena Collegiate Foundation',
    targetUniversityId: 'all',
    placement: 'home',
    spend: '₦240,000',
    startDate: '2026-10-10',
    endDate: '2026-12-15',
    status: 'Running',
    impressions: 28400,
    clicks: 2190,
    ctr: 7.71,
    createdAt: '2026-10-10T10:00:00Z'
  }
];

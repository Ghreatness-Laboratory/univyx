export type CivynType =
  | 'internship'
  | 'siwes'
  | 'graduate_trainee'
  | 'scholarship'
  | 'student_job'
  | 'campus_gig';

export interface CivynOpportunity {
  id: string;
  title: string;
  organization: string;
  type: CivynType;
  location: string;
  workplaceType?: 'remote' | 'hybrid' | 'onsite';
  workplace_type?: 'remote' | 'hybrid' | 'onsite';
  compensation: string;
  eligibility: string;
  requiredSkills?: string[];
  required_skills?: string[];
  deadline: string;
  description: string;
  applicationUrl?: string;
  application_url?: string;
  universityEligibility?: string;
  status: 'published' | 'expired';
  createdAt: string;
  created_at?: string;
  isBookmarked?: boolean;
  is_bookmarked?: boolean;
}

export const INITIAL_CIVYN_OPPORTUNITIES: CivynOpportunity[] = [
  {
    id: 'opp-1',
    title: 'Fintech Software Engineering Intern (Summer 2027)',
    organization: 'Moniepoint Group',
    type: 'internship',
    location: 'Lagos Island / Hybrid',
    workplaceType: 'hybrid',
    compensation: '₦250,000 / month stipend + Lunch stipend',
    eligibility: 'Penultimate & Final year Computer Science & Software Engineering students from accredited private universities.',
    requiredSkills: ['TypeScript', 'React', 'Go / Node.js', 'REST APIs', 'Git'],
    deadline: '2026-11-30T23:59:59Z',
    description: 'Join core infrastructure engineering teams developing banking software and POS transaction rails handling tens of billions of Naira daily.',
    applicationUrl: 'https://moniepoint.com/careers',
    universityEligibility: 'Open to Covenant, Babcock, ABUAD, PAU, Nile & Baze students',
    status: 'published',
    createdAt: '2026-10-14T09:00:00Z',
    isBookmarked: true
  },
  {
    id: 'opp-2',
    title: 'SIWES Industrial Training (IT) Placement (6 Months)',
    organization: 'TotalEnergies EP Nigeria',
    type: 'siwes',
    location: 'Port Harcourt / Lagos Onsite',
    workplaceType: 'onsite',
    compensation: '₦190,000 / month + Transport Allowance',
    eligibility: '300L/400L students in Mechanical, Electrical, Chemical, or Petroleum Engineering with official university IT letters.',
    requiredSkills: ['AutoCAD', 'Process Safety', 'Instrumentation', 'Analytical Writing'],
    deadline: '2026-11-20T23:59:59Z',
    description: 'Hands-on six-month supervised technical training across energy facilities, maintenance instrumentation, and industrial operations.',
    applicationUrl: 'https://totalenergies.com/careers',
    universityEligibility: 'All private universities with NUC-accredited engineering faculties',
    status: 'published',
    createdAt: '2026-10-12T14:00:00Z',
    isBookmarked: false
  },
  {
    id: 'opp-3',
    title: 'Management Consulting & Strategy Analyst Trainee',
    organization: 'KPMG West Africa',
    type: 'graduate_trainee',
    location: 'Victoria Island, Lagos / Hybrid',
    workplaceType: 'hybrid',
    compensation: 'Competitive Graduate Salary + Professional Exam Sponsorship (ACCA / CFA)',
    eligibility: 'Graduating seniors and recent private university alumni with First Class or Second Class Upper in Accounting, Economics, Law, or STEM.',
    requiredSkills: ['Financial Modeling', 'Data Analytics', 'Critical Reasoning', 'Presentation Deck Design'],
    deadline: '2026-12-15T23:59:59Z',
    description: 'Work with cross-border partners on financial advisory, enterprise transformation, ESG governance, and tax compliance across West Africa.',
    applicationUrl: 'https://kpmg.com/ng/careers',
    status: 'published',
    createdAt: '2026-10-15T11:00:00Z',
    isBookmarked: false
  },
  {
    id: 'opp-4',
    title: 'Mo Ibrahim Leadership & Governance Scholarship',
    organization: 'Mo Ibrahim Foundation',
    type: 'scholarship',
    location: 'London, United Kingdom / Full Sponsorship',
    workplaceType: 'onsite',
    compensation: 'Full Tuition Waiver + £16,500 Annual Living Stipend + Economy Flights',
    eligibility: 'Outstanding graduating students from private universities with proven leadership and community impact.',
    requiredSkills: ['Academic Excellence', 'Public Policy Analysis', 'Leadership Heritage'],
    deadline: '2026-11-15T12:00:00Z',
    description: 'Fully sponsored Master’s degree studies in International Development, Governance, and Public Policy at select UK universities.',
    applicationUrl: 'https://moibrahimfoundation.org/fellowships',
    status: 'published',
    createdAt: '2026-10-08T10:00:00Z',
    isBookmarked: true
  },
  {
    id: 'opp-5',
    title: 'Univyx Private Campus Community Lead',
    organization: 'Univyx Student Network',
    type: 'campus_gig',
    location: 'On-Campus (Your University)',
    workplaceType: 'remote',
    compensation: '₦80,000 / month + Tech Gear & Certification',
    eligibility: 'Enrolled student in any verified private university with strong campus social leadership.',
    requiredSkills: ['Event Organizing', 'Peer Mentoring', 'Social Media', 'Communication'],
    deadline: '2026-11-25T23:59:59Z',
    description: 'Organize collegiate study groups, coordinate campus sports tournaments, and serve as the official Univyx liaison on your private university campus.',
    applicationUrl: 'https://univyx.com/ambassadors',
    status: 'published',
    createdAt: '2026-10-16T08:00:00Z',
    isBookmarked: false
  }
];

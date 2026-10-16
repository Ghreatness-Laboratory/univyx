import {
  University,
  UserProfile,
  Post,
  CampusEvent,
  AcademicResource,
  KnowledgeEntry,
  CareerOpportunity,
  Product,
  Store,
  UniversityRanking,
  ArenaAnnouncement
} from '../types';

export const INITIAL_UNIVERSITIES: University[] = [
  {
    id: 'uni-1',
    name: 'University of Lagos',
    short_name: 'UNILAG',
    code: 'UNILAG',
    country: 'Nigeria',
    state: 'Lagos',
    city: 'Akoka, Yaba',
    website: 'https://unilag.edu.ng'
  },
  {
    id: 'uni-2',
    name: 'University of Ibadan',
    short_name: 'UI',
    code: 'UI',
    country: 'Nigeria',
    state: 'Oyo',
    city: 'Ibadan',
    website: 'https://ui.edu.ng'
  },
  {
    id: 'uni-3',
    name: 'Obafemi Awolowo University',
    short_name: 'OAU',
    code: 'OAU',
    country: 'Nigeria',
    state: 'Osun',
    city: 'Ile-Ife',
    website: 'https://oauife.edu.ng'
  },
  {
    id: 'uni-4',
    name: 'Covenant University',
    short_name: 'CU',
    code: 'CU',
    country: 'Nigeria',
    state: 'Ogun',
    city: 'Ota',
    website: 'https://covenantuniversity.edu.ng'
  },
  {
    id: 'uni-5',
    name: 'Ahmadu Bello University',
    short_name: 'ABU',
    code: 'ABU',
    country: 'Nigeria',
    state: 'Kaduna',
    city: 'Zaria',
    website: 'https://abu.edu.ng'
  },
  {
    id: 'uni-6',
    name: 'University of Nigeria, Nsukka',
    short_name: 'UNN',
    code: 'UNN',
    country: 'Nigeria',
    state: 'Enugu',
    city: 'Nsukka',
    website: 'https://unn.edu.ng'
  }
];

export const CURRENT_USER: UserProfile = {
  id: 'usr-me',
  username: 'folayemi',
  full_name: 'Fola Ladipo',
  bio: 'Computer Science Scholar @ UNILAG · Building next-gen campus systems & web tech.',
  university_id: 'uni-1',
  university_name: 'University of Lagos',
  faculty: 'Science',
  department: 'Computer Sciences',
  academic_level: '400L',
  is_verified: true,
  role: 'admin',
  created_at: '2026-01-15T09:00:00Z',
  post_count: 14,
  followers_count: 248,
  following_count: 182
};

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    author_id: 'usr-1',
    author: {
      username: 'uche_tech',
      full_name: 'Uche Nnamdi',
      is_verified: true,
      university_name: 'UNILAG',
      role: 'user'
    },
    content: 'Final year project defense done! 4 years of sleepless nights at the engineering faculty library summarized in 20 minutes. Grateful to everyone who shared past project notes and simulation files. #EngineeringLife #UNILAG',
    category: 'academics',
    university_id: 'uni-1',
    university_name: 'University of Lagos',
    likes_count: 84,
    comments_count: 19,
    reposts_count: 12,
    quotes_count: 4,
    created_at: '2026-10-16T09:30:00Z',
    is_liked: false,
    is_bookmarked: false
  },
  {
    id: 'post-2',
    author_id: 'usr-2',
    author: {
      username: 'campus_pulse',
      full_name: 'univyX Campus Dispatch',
      is_verified: true,
      university_name: 'Campus Network',
      role: 'admin'
    },
    content: 'BREAKING: Inter-University collegiate debate registrations are officially open across UI, UNILAG, and OAU. Check the Academics section for registration guidelines and tournament schedule. #CampusNews #DebateLeague',
    category: 'campus_news',
    university_id: 'uni-1',
    university_name: 'University of Lagos',
    likes_count: 156,
    comments_count: 32,
    reposts_count: 45,
    quotes_count: 8,
    is_pinned: true,
    created_at: '2026-10-16T08:15:00Z',
    is_liked: true,
    is_bookmarked: true
  },
  {
    id: 'post-3',
    author_id: 'usr-3',
    author: {
      username: 'amina_ui',
      full_name: 'Amina Bello',
      is_verified: false,
      university_name: 'UI',
      role: 'user'
    },
    content: 'Nothing prepares you for Pathology ward rounds at UCH. You will memorize 50 pharmacology classifications, only to be asked how many glasses of water the patient drank on Tuesday. #MedSchool #UI',
    category: 'entertainment',
    university_id: 'uni-2',
    university_name: 'University of Ibadan',
    likes_count: 210,
    comments_count: 48,
    reposts_count: 27,
    quotes_count: 6,
    created_at: '2026-10-15T20:45:00Z',
    is_liked: false,
    is_bookmarked: false
  },
  {
    id: 'post-4',
    author_id: 'usr-4',
    author: {
      username: 'tunde_law',
      full_name: 'Babatunde Adeleke',
      is_verified: true,
      university_name: 'OAU',
      role: 'user'
    },
    content: 'Just dropped a comprehensive study guide on Nigerian Constitutional Law & Jurisprudence in the univyX Academics repository. Includes case summaries for Marbury v. Madison & Lakanmi v. AG Western State. #OAU #LawFaculty',
    category: 'academics',
    university_id: 'uni-3',
    university_name: 'Obafemi Awolowo University',
    likes_count: 92,
    comments_count: 14,
    reposts_count: 38,
    quotes_count: 3,
    created_at: '2026-10-15T18:20:00Z',
    is_liked: false,
    is_bookmarked: true
  },
  {
    id: 'post-5',
    author_id: 'usr-5',
    author: {
      username: 'chidi_cu',
      full_name: 'Chidi Okafor',
      is_verified: false,
      university_name: 'CU',
      role: 'user'
    },
    content: 'Just listed 3 authentic Apple 20W USB-C fast chargers on the univyX Store for students in Hebron & Canaanland. Tested, working perfectly. Pickup available at Student Center! #CU #Marketplace',
    category: 'marketplace',
    university_id: 'uni-4',
    university_name: 'Covenant University',
    likes_count: 39,
    comments_count: 7,
    reposts_count: 5,
    quotes_count: 1,
    created_at: '2026-10-15T16:10:00Z',
    is_liked: false,
    is_bookmarked: false
  },
  {
    id: 'post-6',
    author_id: 'usr-6',
    author: {
      username: 'fatima_abu',
      full_name: 'Fatima Danjuma',
      is_verified: true,
      university_name: 'ABU',
      role: 'user'
    },
    content: 'The univyX Arena Season 1 Power Rankings have UNILAG and UI neck-and-neck! Let it be known that ABU Zaria is organizing a collegiate chess and tactical e-sports team to challenge the top spot. Game on! #Arena #ABUZaria',
    category: 'gaming',
    university_id: 'uni-5',
    university_name: 'Ahmadu Bello University',
    likes_count: 118,
    comments_count: 29,
    reposts_count: 18,
    quotes_count: 5,
    created_at: '2026-10-15T14:00:00Z',
    is_liked: false,
    is_bookmarked: false
  }
];

export const INITIAL_CIVYN_OPPORTUNITIES: CareerOpportunity[] = [
  {
    id: 'opp-1',
    title: 'Software Engineering Intern (Summer 2027)',
    organization: 'Flutterwave Technologies',
    type: 'internship',
    location: 'Lagos / Hybrid',
    workplace_type: 'hybrid',
    compensation: '₦220,000 / month stipend',
    eligibility: 'Penultimate & Final year Computer Science, Engineering, or Mathematics students across all accredited universities.',
    required_skills: ['TypeScript', 'React', 'REST APIs', 'Data Structures', 'Git'],
    deadline: '2026-11-30T23:59:59Z',
    description: 'Work alongside core payments infrastructure engineers to build resilient payment processing systems handling millions of daily transactions across Africa.',
    application_url: 'https://flutterwave.com/careers',
    university_id: 'uni-1',
    university_name: 'University of Lagos',
    status: 'published',
    created_at: '2026-10-10T08:00:00Z',
    is_bookmarked: true
  },
  {
    id: 'opp-2',
    title: 'SIWES Industrial Training Placement (6 Months)',
    organization: 'TotalEnergies Exploration & Production',
    type: 'siwes',
    location: 'Port Harcourt / Onsite',
    workplace_type: 'onsite',
    compensation: '₦180,000 / month + Transport Allowance',
    eligibility: '300L & 400L students in Mechanical, Electrical, Chemical, and Petroleum Engineering with valid ITF clearance letters.',
    required_skills: ['AutoCAD', 'Thermodynamics', 'Process Safety', 'Analytical Problem Solving'],
    deadline: '2026-11-15T23:59:59Z',
    description: 'Structured 6-month Industrial Training program covering offshore operations support, instrumentation engineering, and industrial safety compliance.',
    application_url: 'https://totalenergies.com/careers',
    university_id: 'uni-6',
    university_name: 'University of Nigeria, Nsukka',
    status: 'published',
    created_at: '2026-10-12T10:00:00Z',
    is_bookmarked: false
  },
  {
    id: 'opp-3',
    title: 'Graduate Trainee Analyst Programme 2027',
    organization: 'PwC West Africa',
    type: 'graduate_trainee',
    location: 'Lagos / Hybrid',
    workplace_type: 'hybrid',
    compensation: 'Competitive graduate salary + Professional Exam Support (ICAN / ACCA)',
    eligibility: 'Final year students and fresh graduates (First Class or Second Class Upper) in any discipline.',
    required_skills: ['Financial Modeling', 'Data Analysis', 'Critical Thinking', 'Business Writing'],
    deadline: '2026-12-15T23:59:59Z',
    description: 'Join PwC assurance, tax, and advisory lines of service. Receive rigorous coaching, mentorship from partners, and sponsored certification pathways.',
    application_url: 'https://pwc.com/ng/careers',
    university_id: 'uni-2',
    university_name: 'University of Ibadan',
    status: 'published',
    created_at: '2026-10-14T11:00:00Z',
    is_bookmarked: false
  },
  {
    id: 'opp-4',
    title: 'Chevening Postgraduate Merit Scholarship',
    organization: 'UK Foreign, Commonwealth and Development Office',
    type: 'scholarship',
    location: 'United Kingdom / Full Sponsorship',
    workplace_type: 'onsite',
    compensation: '100% Tuition Fees + Living Stipend + Return Economy Flights',
    eligibility: 'Graduating students with a minimum of 2:1 degree and demonstrable leadership potential.',
    required_skills: ['Academic Excellence', 'Community Leadership', 'Research Aptitude'],
    deadline: '2026-11-05T12:00:00Z',
    description: 'Fully funded one-year master degree study at leading UK universities for emerging leaders across science, governance, climate, and technology.',
    application_url: 'https://chevening.org/scholarship',
    university_id: 'uni-3',
    university_name: 'Obafemi Awolowo University',
    status: 'published',
    created_at: '2026-10-08T09:00:00Z',
    is_bookmarked: true
  },
  {
    id: 'opp-5',
    title: 'Campus Student Ambassador (Product & Tech)',
    organization: 'Moniepoint Financial Services',
    type: 'student_job',
    location: 'Campus-wide / Remote',
    workplace_type: 'remote',
    compensation: '₦75,000 / month stipend + Free Swag & Tech Perks',
    eligibility: 'Active university students in any year with strong social and community presence.',
    required_skills: ['Campus Networking', 'Event Organization', 'Social Media', 'Peer Mentoring'],
    deadline: '2026-11-20T23:59:59Z',
    description: 'Represent Moniepoint on your campus, coordinate peer workshops, organize fintech awareness events, and connect students with financial tools.',
    application_url: 'https://moniepoint.com/ambassadors',
    status: 'published',
    created_at: '2026-10-15T15:00:00Z',
    is_bookmarked: false
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    store_id: 'store-1',
    store_name: 'Akoka Scent Studio',
    name: 'Khamrah & Amber Oud Eau De Parfum (Decant 30ml)',
    description: 'Long-lasting winter and evening vanilla spice fragrance decanted for university students. 12+ hours projection on campus fabrics.',
    price: 8500,
    currency: 'NGN',
    category: 'perfumes',
    condition: 'new',
    pickup_location: 'New Hall Quadrangle / Engineering Gate',
    university_name: 'University of Lagos',
    contact_url: 'https://wa.me/2348012345678',
    is_available: true,
    created_at: '2026-10-14T10:00:00Z'
  },
  {
    id: 'prod-2',
    store_id: 'store-2',
    store_name: 'Campus Tech Hub UI',
    name: 'Baseus 65W GaN Fast Charger & 100W Braided Cable',
    description: 'Charges MacBook, Dell XPS, HP laptops and smartphones simultaneously during library study sessions. Compact and surge-protected.',
    price: 24000,
    currency: 'NGN',
    category: 'gadgets',
    condition: 'new',
    pickup_location: 'SUB (Student Union Building), UI Ibadan',
    university_name: 'University of Ibadan',
    contact_url: 'https://wa.me/2348023456789',
    is_available: true,
    created_at: '2026-10-15T12:00:00Z'
  },
  {
    id: 'prod-3',
    store_id: 'store-3',
    store_name: 'Ife Scholar Books',
    name: 'Stroud Engineering Mathematics (7th Ed. Hardcover)',
    description: 'Excellent condition engineering textbook with worked examples and exercise solutions. Perfect for 100L–300L engineering foundation.',
    price: 11500,
    currency: 'NGN',
    category: 'books_stationery',
    condition: 'pre-owned',
    pickup_location: 'White House Amphitheater, OAU Ife',
    university_name: 'Obafemi Awolowo University',
    contact_url: 'https://wa.me/2348034567890',
    is_available: true,
    created_at: '2026-10-13T14:00:00Z'
  },
  {
    id: 'prod-4',
    store_id: 'store-4',
    store_name: 'Zaria Minimalist Thrift',
    name: 'Vintage Oversized Heavyweight Cotton Hoodie (Black)',
    description: 'Thrifted 400gsm fleece hoodie in pristine 9/10 condition. Fits sizes Medium to XL with clean kangaroo pocket and dropped shoulders.',
    price: 9000,
    currency: 'NGN',
    category: 'clothing',
    condition: 'pre-owned',
    pickup_location: 'Ribadu Hall, ABU Samaru Campus',
    university_name: 'Ahmadu Bello University',
    contact_url: 'https://wa.me/2348045678901',
    is_available: true,
    created_at: '2026-10-15T08:30:00Z'
  },
  {
    id: 'prod-5',
    store_id: 'store-5',
    store_name: 'Covenant Campus Essentials',
    name: 'Waterproof Anti-Theft Student Laptop Backpack (15.6 Inch)',
    description: 'Features hidden back zipper pocket, external USB pass-through port, water bottle side mesh, and padded shoulder straps for daily walks.',
    price: 16500,
    currency: 'NGN',
    category: 'essentials',
    condition: 'new',
    pickup_location: 'Covenant University Cafeteria 2 Corridor',
    university_name: 'Covenant University',
    contact_url: 'https://wa.me/2348056789012',
    is_available: true,
    created_at: '2026-10-12T16:00:00Z'
  }
];

export const INITIAL_STORES: Store[] = [
  {
    id: 'store-1',
    name: 'Akoka Scent Studio',
    owner_id: 'usr-7',
    owner_name: 'Tomiwa Balogun',
    university_id: 'uni-1',
    university_name: 'University of Lagos',
    description: 'Authentic designer fragrance decants and pocket sprays for students on a budget. Same-day campus hand delivery.',
    contact_phone: '+2348012345678',
    contact_whatsapp: 'https://wa.me/2348012345678',
    is_verified: true,
    status: 'active',
    created_at: '2026-02-01T10:00:00Z'
  },
  {
    id: 'store-2',
    name: 'Campus Tech Hub UI',
    owner_id: 'usr-8',
    owner_name: 'Kelechi Eze',
    university_id: 'uni-2',
    university_name: 'University of Ibadan',
    description: 'Verified laptop accessories, phone chargers, adapters, and study electronics.',
    contact_phone: '+2348023456789',
    contact_whatsapp: 'https://wa.me/2348023456789',
    is_verified: true,
    status: 'active',
    created_at: '2026-03-10T12:00:00Z'
  }
];

export const INITIAL_RANKINGS: UniversityRanking[] = [
  {
    id: 'rank-1',
    university_id: 'uni-1',
    university_name: 'University of Lagos',
    university_short: 'UNILAG',
    power_score: 94.2,
    academic_score: 93.5,
    gaming_score: 95.0,
    sports_score: 94.1,
    tournaments_won: 8,
    badge: 'Current League Leader'
  },
  {
    id: 'rank-2',
    university_id: 'uni-2',
    university_name: 'University of Ibadan',
    university_short: 'UI',
    power_score: 92.8,
    academic_score: 96.0,
    gaming_score: 89.5,
    sports_score: 91.0,
    tournaments_won: 6,
    badge: 'Top Academic Score'
  },
  {
    id: 'rank-3',
    university_id: 'uni-3',
    university_name: 'Obafemi Awolowo University',
    university_short: 'OAU',
    power_score: 91.4,
    academic_score: 92.0,
    gaming_score: 90.0,
    sports_score: 92.5,
    tournaments_won: 5,
    badge: 'Debate Champion'
  },
  {
    id: 'rank-4',
    university_id: 'uni-4',
    university_name: 'Covenant University',
    university_short: 'CU',
    power_score: 90.6,
    academic_score: 94.5,
    gaming_score: 88.0,
    sports_score: 87.0,
    tournaments_won: 4
  },
  {
    id: 'rank-5',
    university_id: 'uni-5',
    university_name: 'Ahmadu Bello University',
    university_short: 'ABU',
    power_score: 88.9,
    academic_score: 89.0,
    gaming_score: 86.5,
    sports_score: 91.5,
    tournaments_won: 3
  },
  {
    id: 'rank-6',
    university_id: 'uni-6',
    university_name: 'University of Nigeria, Nsukka',
    university_short: 'UNN',
    power_score: 87.5,
    academic_score: 88.5,
    gaming_score: 85.0,
    sports_score: 89.0,
    tournaments_won: 2
  }
];

export const INITIAL_ARENA_ANNOUNCEMENTS: ArenaAnnouncement[] = [
  {
    id: 'arena-1',
    title: 'univyX Inter-Campus Esports Championship 2026',
    description: 'Official university tournament for collegiate e-football and tactical arena teams. Qualifying rounds begin across campus gaming hubs.',
    category: 'Tournament',
    event_date: '2026-11-01T14:00:00Z',
    status: 'published',
    created_at: '2026-10-15T12:00:00Z'
  },
  {
    id: 'arena-2',
    title: 'Campus Power League: Season 1 Rankings Announced',
    description: 'Top universities ranked across verified student challenge performance, academic hackathons, and inter-faculty sports.',
    category: 'Rankings',
    event_date: '2026-10-18T18:00:00Z',
    status: 'published',
    created_at: '2026-10-14T09:00:00Z'
  }
];

export const INITIAL_ACADEMIC_RESOURCES: AcademicResource[] = [
  {
    id: 'res-1',
    title: 'Differential Calculus & Complex Numbers Made Easy',
    author: 'Prof. K. A. Adebowale',
    subject: 'General Mathematics (MTH 101/102)',
    description: 'Step-by-step lecture revision guide breaking down limits, derivatives, L\'Hopital\'s rule, and De Moivre\'s theorem with past exam drills.',
    university_id: 'uni-2',
    university_name: 'University of Ibadan',
    resource_type: 'tutorial',
    external_url: 'https://open.umn.edu/opentextbooks/textbooks/calculus',
    is_free: true,
    contributor_name: 'Dept. of Mathematics UI',
    status: 'published',
    created_at: '2026-09-20T10:00:00Z'
  },
  {
    id: 'res-2',
    title: 'Organic Chemistry Reaction Mechanisms Pocket Compendium',
    author: 'Dr. O. Folorunsho',
    subject: 'Pure & Applied Chemistry',
    description: 'Summary tables of SN1, SN2, E1, E2 reaction kinetics, electrophilic aromatic substitutions, and functional group diagnostic tests.',
    university_id: 'uni-1',
    university_name: 'University of Lagos',
    resource_type: 'study_note',
    external_url: 'https://chem.libretexts.org',
    is_free: true,
    contributor_name: 'Chemical Science Students Assoc.',
    status: 'published',
    created_at: '2026-10-02T11:30:00Z'
  },
  {
    id: 'res-3',
    title: 'Principles of Macroeconomics & Fiscal Policy in Developing Nations',
    author: 'Dr. Chinedu Eze',
    subject: 'Economics (ECO 201)',
    description: 'Analysis of inflation, monetary policy tools, exchange rate management, and Keynesian vs Classical macroeconomic frameworks.',
    university_id: 'uni-3',
    university_name: 'Obafemi Awolowo University',
    resource_type: 'book',
    external_url: 'https://www.core-econ.org',
    is_free: true,
    contributor_name: 'OAU Economics Faculty',
    status: 'published',
    created_at: '2026-09-28T14:00:00Z'
  }
];

export const INITIAL_KNOWLEDGE_ENTRIES: KnowledgeEntry[] = [
  {
    id: 'know-1',
    title: 'Cumulative Grade Point Average (CGPA) Calculation (5.0 Scale)',
    summary: 'Standard mathematical formula for calculating semester GPA and graduation honors.',
    content: `The 5.0 Nigerian University grading system calculates performance as follows:
- A (70-100%): 5 Points
- B (60-69%): 4 Points
- C (50-59%): 3 Points
- D (45-49%): 2 Points
- E (40-44%): 1 Point
- F (0-39%): 0 Points

To calculate your Grade Point Average (GPA):
1. Multiply the Credit Units of each registered course by the Grade Point earned to obtain the Quality Point (QP).
2. Sum all Quality Points across the semester: Total QP = Sum(Units * Grade Point).
3. Divide Total Quality Points by Total Registered Credit Units: GPA = Total QP / Total Units.

Honors Classification:
- 4.50 - 5.00: First Class Honours
- 3.50 - 4.49: Second Class Honours (Upper Division)
- 2.40 - 3.49: Second Class Honours (Lower Division)
- 1.50 - 2.39: Third Class Honours
- Below 1.50: Probationary Status`,
    category: 'grading_system',
    tags: ['GPA', 'CGPA', 'Grading Scale', 'First Class', 'Honors'],
    source_attribution: 'National Universities Commission (NUC) Academic Standard Benchmark',
    last_updated: '2026-09-15T12:00:00Z'
  },
  {
    id: 'know-2',
    title: 'SIWES & Industrial Training (IT) Defense Requirements',
    summary: 'Mandatory prerequisites for defending the 3-6 month Student Industrial Work Experience.',
    content: `All participating engineering, computer science, and applied science students must complete the following prior to departmental defense:
1. Form 8 (End of Attachment Evaluation) sealed and signed by the industrial supervisor with the company stamp.
2. Complete Weekly Logbook with detailed technical activity summaries, schematics, and weekly sign-offs.
3. Bound Technical IT Report (minimum 25-40 pages formatted according to faculty style).
4. PowerPoint presentation (maximum 10 slides, 10-minute presentation followed by question-and-answer panel).`,
    category: 'academic_procedure',
    tags: ['SIWES', 'Industrial Training', 'IT Defense', 'Logbook', 'Form 8'],
    source_attribution: 'Industrial Training Fund (ITF) Academic Senate Directive',
    last_updated: '2026-10-01T10:00:00Z'
  },
  {
    id: 'know-3',
    title: 'Course Add/Drop & Semester Deferment Guidelines',
    summary: 'Procedures for adjusting semester study load or applying for temporary study suspension.',
    content: `1. Course Add/Drop Window: Students are allowed to add or drop elective courses within the first 3 weeks of semester resumption through the student portal. Once the window closes, un-dropped courses receive automatic F grades if examinations are unattended.
2. Semester Deferment: Any student seeking temporary study leave on health or compassionate grounds must forward a formal application through their Academic Advisor and Head of Department (HOD) to the Dean of Faculty, accompanied by medical reports from the University Health Centre.`,
    category: 'academic_procedure',
    tags: ['Registration', 'Add Drop', 'Deferment', 'Academic Calendar'],
    source_attribution: 'University Academic Senate Handbook',
    last_updated: '2026-08-30T09:00:00Z'
  }
];

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'evt-1',
    title: 'univyX Inter-Campus Tech & Venture Summit 2026',
    description: 'Keynotes from student founders, hackathon showcase, and on-the-spot internship interviews with leading tech firms.',
    organizer: 'Collegiate Tech Alliance & univyX',
    university_id: 'uni-1',
    university_name: 'University of Lagos',
    venue: 'J.F. Ade Ajayi Main Auditorium, UNILAG',
    start_time: '2026-11-12T10:00:00Z',
    end_time: '2026-11-12T17:00:00Z',
    registration_url: 'https://univyx.campus/events/summit-2026',
    category: 'Conference',
    status: 'published',
    created_at: '2026-10-10T12:00:00Z'
  },
  {
    id: 'evt-2',
    title: 'University of Ibadan Literary & Arts Festival',
    description: 'Poetry slams, drama performances, student debate finals, and book exhibition featuring African literature.',
    organizer: 'Faculty of Arts Students Association',
    university_id: 'uni-2',
    university_name: 'University of Ibadan',
    venue: 'Trenchard Hall, UI',
    start_time: '2026-10-28T16:00:00Z',
    end_time: '2026-10-28T21:00:00Z',
    registration_url: 'https://ui.edu.ng/events/litfest',
    category: 'Arts & Culture',
    status: 'published',
    created_at: '2026-10-12T09:00:00Z'
  }
];

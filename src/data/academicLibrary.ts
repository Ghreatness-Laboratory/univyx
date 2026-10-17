export type LibraryResourceType = 'past_question' | 'lecture_note' | 'summary';

export interface AcademicLibraryResource {
  id: string;
  courseCode: string;
  courseTitle: string;
  type: LibraryResourceType;
  universityId: string;
  universityName: string;
  faculty: string;
  department: string;
  academicLevel: '100L' | '200L' | '300L' | '400L' | '500L' | 'Postgraduate';
  semester: 'First Semester' | 'Second Semester';
  year: string;
  uploaderName: string;
  uploaderUsername: string;
  uploaderUniversity: string;
  downloadsCount: number;
  isSaved?: boolean;
  pagesCount: number;
  fileSize: string;
  description: string;
  mockContent: {
    overview: string;
    sections: { heading: string; body: string }[];
    sampleQuestions?: { q: string; marks: number }[];
  };
  createdAt: string;
}

export const INITIAL_LIBRARY_RESOURCES: AcademicLibraryResource[] = [
  {
    id: 'res-csc412-notes',
    courseCode: 'CSC 412',
    courseTitle: 'Distributed Systems & Cloud Computing Architectures',
    type: 'lecture_note',
    universityId: 'covenant',
    universityName: 'Covenant University',
    faculty: 'College of Science & Technology',
    department: 'Computer & Information Sciences',
    academicLevel: '400L',
    semester: 'First Semester',
    year: '2025/2026',
    uploaderName: 'Chidi Okafor',
    uploaderUsername: 'chidi_cu',
    uploaderUniversity: 'Covenant University',
    downloadsCount: 342,
    isSaved: true,
    pagesCount: 48,
    fileSize: '3.2 MB',
    description: 'Complete lecture notes on RPC protocols, Lamport logical clocks, Paxos consensus algorithm, and microservice containerization.',
    mockContent: {
      overview: 'This comprehensive study dossier synthesizes the 400L Distributed Systems curriculum under the Department of Computer & Information Sciences at Covenant University.',
      sections: [
        {
          heading: '1. Fundamentals of Distributed Consistency',
          body: 'A distributed system is one in which hardware or software components located at networked computers communicate and coordinate their actions only by passing messages. We examine CAP theorem tradeoffs, network partitions, and linearizability guarantees.'
        },
        {
          heading: '2. Clocks, Logical Time and State Synchronization',
          body: 'Because physical clocks drift, distributed algorithms rely heavily on logical timestamps. Lamport logical clocks ensure that if event A happens before event B, then L(A) < L(B). Vector clocks extend this to track causality across arbitrary network topologies.'
        },
        {
          heading: '3. Byzantine Fault Tolerance and Raft Consensus',
          body: 'Detailed comparison of the Raft leader-election consensus protocol versus Multi-Paxos in high-throughput database clusters.'
        }
      ],
      sampleQuestions: [
        { q: 'Distinguish between strong and eventual consistency with real-world examples.', marks: 10 },
        { q: 'Illustrate the state transitions of a node in the Raft consensus algorithm.', marks: 15 }
      ]
    },
    createdAt: '2026-10-10T09:30:00Z'
  },
  {
    id: 'res-cst311-pq',
    courseCode: 'CST 311',
    courseTitle: 'Database Systems & Query Optimization',
    type: 'past_question',
    universityId: 'covenant',
    universityName: 'Covenant University',
    faculty: 'College of Science & Technology',
    department: 'Computer & Information Sciences',
    academicLevel: '300L',
    semester: 'Second Semester',
    year: '2024/2025',
    uploaderName: 'Chidi Okafor',
    uploaderUsername: 'chidi_cu',
    uploaderUniversity: 'Covenant University',
    downloadsCount: 512,
    isSaved: false,
    pagesCount: 6,
    fileSize: '1.4 MB',
    description: 'Official Omega semester past examination paper covering B-Tree indexing, ACID isolation levels, relational algebra, and normal forms.',
    mockContent: {
      overview: 'Covenant University Department of Computer & Information Sciences. B.Sc Degree Examination — Omega Semester 2024/2025.',
      sections: [
        {
          heading: 'Section A: Relational Algebra & Schema Normalization',
          body: 'Mandatory section testing 1NF through BCNF decompositions, lossless joins, and dependency preservation proofs.'
        },
        {
          heading: 'Section B: Transaction Management & Locking Protocols',
          body: 'Detailed analysis of Two-Phase Locking (2PL), deadlock prevention through Wait-Die and Wound-Wait schemes, and Write-Ahead Logging (WAL).'
        }
      ],
      sampleQuestions: [
        { q: 'Given relation R(A, B, C, D, E) with FDs: A->B, BC->D, D->E. Determine the candidate keys and decompose R into BCNF.', marks: 20 },
        { q: 'Explain how multi-version concurrency control (MVCC) eliminates read locks in modern database engines.', marks: 15 }
      ]
    },
    createdAt: '2026-09-18T14:00:00Z'
  },
  {
    id: 'res-buse402-pq',
    courseCode: 'BU-SE 402',
    courseTitle: 'Software Testing, Metrics & Quality Engineering',
    type: 'past_question',
    universityId: 'babcock',
    universityName: 'Babcock University',
    faculty: 'School of Computing & Engineering Sciences',
    department: 'Software Engineering',
    academicLevel: '400L',
    semester: 'First Semester',
    year: '2024/2025',
    uploaderName: 'Korede Balogun',
    uploaderUsername: 'korede_babcock',
    uploaderUniversity: 'Babcock University',
    downloadsCount: 289,
    isSaved: true,
    pagesCount: 8,
    fileSize: '1.8 MB',
    description: 'First semester comprehensive examination questions covering cyclomatic complexity, mutation testing, CI/CD automated test suites, and ISO 25010.',
    mockContent: {
      overview: 'Babcock University School of Computing & Engineering Sciences. Semester I Examination.',
      sections: [
        {
          heading: 'White-Box Testing & Control Flow Graphs',
          body: 'Drawing control flow graphs, calculating McCabe cyclomatic complexity, and determining basis paths.'
        },
        {
          heading: 'Integration and Stress Testing Paradigms',
          body: 'Designing contract testing for microservices and chaos engineering principles.'
        }
      ],
      sampleQuestions: [
        { q: 'Calculate the cyclomatic complexity for the provided payment processor loop and write test cases for 100% branch coverage.', marks: 20 },
        { q: 'Explain the difference between statement coverage, branch coverage, and condition coverage.', marks: 15 }
      ]
    },
    createdAt: '2026-10-02T11:20:00Z'
  },
  {
    id: 'res-law401-summary',
    courseCode: 'LAW 401',
    courseTitle: 'Commercial Law & Corporate Governance Principles',
    type: 'summary',
    universityId: 'abuad',
    universityName: 'Afe Babalola University (ABUAD)',
    faculty: 'College of Law',
    department: 'Private & Commercial Law',
    academicLevel: '400L',
    semester: 'First Semester',
    year: '2025/2026',
    uploaderName: 'Adedamola Adeleke',
    uploaderUsername: 'damola_abuad',
    uploaderUniversity: 'Afe Babalola University (ABUAD)',
    downloadsCount: 420,
    isSaved: false,
    pagesCount: 24,
    fileSize: '2.1 MB',
    description: 'Executive revision summary covering Companies and Allied Matters Act (CAMA 2020), director fiduciary duties, minority protection (rule in Foss v Harbottle), and corporate insolvency.',
    mockContent: {
      overview: 'High-yield revision dossier prepared by the ABUAD Law Clinic for 400L Bar-preparation candidates.',
      sections: [
        {
          heading: '1. The Corporate Veil & Exceptions',
          body: 'Analysis of Salomon v A. Salomon & Co Ltd and Nigerian statutory exceptions under CAMA 2020 regarding fraudulent trading.'
        },
        {
          heading: '2. Director Duties and Breach Remedies',
          body: 'Summary of duty of care, duty to avoid conflicts of interest, and statutory enforcement procedures.'
        }
      ],
      sampleQuestions: [
        { q: 'Examine the exceptions to the rule in Foss v Harbottle with reference to Nigerian case law and CAMA 2020.', marks: 25 }
      ]
    },
    createdAt: '2026-10-08T16:00:00Z'
  },
  {
    id: 'res-cyb302-summary',
    courseCode: 'CYB 302',
    courseTitle: 'Network Defense & Cryptographic Protocols',
    type: 'summary',
    universityId: 'nile',
    universityName: 'Nile University of Nigeria',
    faculty: 'Faculty of Engineering & Computing',
    department: 'Cybersecurity',
    academicLevel: '300L',
    semester: 'Second Semester',
    year: '2024/2025',
    uploaderName: 'Zainab Al-Hassan',
    uploaderUsername: 'zainab_nile',
    uploaderUniversity: 'Nile University of Nigeria',
    downloadsCount: 195,
    isSaved: true,
    pagesCount: 32,
    fileSize: '2.9 MB',
    description: 'Summary charts and cheat sheets covering TLS 1.3 handshake, Diffie-Hellman key exchange, AES-GCM encryption, and zero-trust authentication architecture.',
    mockContent: {
      overview: 'Nile University of Nigeria Cybersecurity Capstone Preparation Summary.',
      sections: [
        {
          heading: '1. Modern Symmetric and Asymmetric Cryptography',
          body: 'Comparison of block ciphers, stream ciphers, elliptic curve cryptography (ECC), and quantum-resistant algorithms.'
        },
        {
          heading: '2. Zero-Trust Network Architecture',
          body: 'Implementing micro-segmentation, continuous verification, and identity-aware proxies.'
        }
      ],
      sampleQuestions: [
        { q: 'Trace the TLS 1.3 1-RTT handshake and explain how it prevents replay attacks.', marks: 20 }
      ]
    },
    createdAt: '2026-10-12T13:40:00Z'
  },
  {
    id: 'res-smc204-notes',
    courseCode: 'SMC 204',
    courseTitle: 'Media Ethics & Digital Intellectual Property',
    type: 'lecture_note',
    universityId: 'pau',
    universityName: 'Pan-Atlantic University',
    faculty: 'School of Media & Communication',
    department: 'Media & Communication',
    academicLevel: '200L',
    semester: 'First Semester',
    year: '2025/2026',
    uploaderName: 'Folake Adeyemi',
    uploaderUsername: 'folake_pau',
    uploaderUniversity: 'Pan-Atlantic University',
    downloadsCount: 164,
    isSaved: false,
    pagesCount: 22,
    fileSize: '1.7 MB',
    description: 'Lecture notes covering fair use doctrines, copyright in digital broadcasting, journalism ethics, and privacy laws in digital publishing.',
    mockContent: {
      overview: 'Pan-Atlantic University SMC Lecture Series. Digital Media Law & Intellectual Property.',
      sections: [
        {
          heading: '1. Copyright Framework in Digital Creative Industries',
          body: 'Analysis of author economic rights, moral rights, licensing agreements, and Creative Commons.'
        },
        {
          heading: '2. Defamation and Online Social Media Liability',
          body: 'Examining defamation in collegiate networks and liability of digital platforms.'
        }
      ],
      sampleQuestions: [
        { q: 'Evaluate the boundaries of fair use for academic research versus commercial streaming.', marks: 15 }
      ]
    },
    createdAt: '2026-10-05T08:50:00Z'
  }
];

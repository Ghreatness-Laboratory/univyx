import { Resource } from "../../types/academics";

export const resources: Resource[] = [
  {
    id: 1,
    title: 'Introduction to Programming',
    description: 'Comprehensive notes on programming basics',
    type: 'note',
    level: 100,
    collegeId: 'engineering',
    departmentId: 'computer',
    url: '/notes/intro-programming.pdf',
    image: '/images/intro-programming.jpg',
    isRowReverse: false
  },
  {
    id: 2,
    title: 'Data Structures and Algorithms',
    description: 'Lecture slides covering fundamental data structures',
    type: 'pastQuestion',
    level: 200,
    collegeId: 'engineering',
    departmentId: 'computer',
    url: '/slides/data-structures.pdf',
    image: '/images/data-structures.jpg',
    isRowReverse: true
  },
  {
    id: 3,
    title: 'Web Development Masterclass',
    description: 'Complete guide to modern web development',
    type: 'tutorial',
    level: 300,
    collegeId: 'engineering',
    departmentId: 'computer',
    url: '/tutorials/web-development.pdf',
    image: '/images/web-dev-tutorial.jpg',
    isRowReverse: false
  },
  {
    id: 4,
    title: 'Digital Logic Design',
    description: 'Past exam questions on digital circuits',
    type: 'pastQuestion',
    level: 300,
    collegeId: 'engineering',
    departmentId: 'electrical',
    url: '/exams/digital-logic.pdf',
    image: '/images/digital-logic.jpg',
    isRowReverse: true
  },
  {
    id: 5,
    title: 'Thermodynamics Basics',
    description: 'Lecture notes on thermodynamic principles',
    type: 'note',
    level: 200,
    collegeId: 'engineering',
    departmentId: 'mechanical',
    url: '/notes/thermodynamics.pdf',
    image: '/images/thermodynamics.jpg',
    isRowReverse: false
  },
  {
    id: 6,
    title: 'Quantum Mechanics Overview',
    description: 'Comprehensive lecture notes on quantum mechanics',
    type: 'note',
    level: 300,
    collegeId: 'sciences',
    departmentId: 'physics',
    url: '/notes/quantum-mechanics.pdf',
    image: '/images/quantum-mechanics.jpg',
    isRowReverse: true
  },
  {
    id: 7,
    title: 'Electromagnetism Practice Questions',
    description: 'Past exam questions on electromagnetism',
    type: 'pastQuestion',
    level: 200,
    collegeId: 'sciences',
    departmentId: 'physics',
    url: '/exams/electromagnetism.pdf',
    image: '/images/electromagnetism.jpg',
    isRowReverse: false
  },
  {
    id: 8,
    title: 'Principles of Management',
    description: 'Lecture slides on key management principles',
    type: 'pastQuestion',
    level: 100,
    collegeId: 'management-science',
    departmentId: 'business-admin',
    url: '/slides/principles-management.pdf',
    image: '/images/principles-management.jpg',
    isRowReverse: true
  },
  {
    id: 9,
    title: 'Introduction to Building Design',
    description: 'Detailed notes on architectural design principles',
    type: 'note',
    level: 100,
    collegeId: 'environmental-science',
    departmentId: 'architecture',
    url: '/notes/building-design.pdf',
    image: '/images/building-design.jpg',
    isRowReverse: false
  },
  {
    id: 10,
    title: 'Nigerian Constitutional Law',
    description: 'Comprehensive textbook on Nigerian law',
    type: 'tutorial',
    level: 400,
    collegeId: 'law',
    departmentId: 'law',
    url: '/textbooks/nigerian-law.pdf',
    image: '/images/nigerian-law.jpg',
    isRowReverse: true
  },
  {
    id: 11,
    title: 'Educational Psychology',
    description: 'Lecture slides on psychological principles in education',
    type: 'pastQuestion',
    level: 200,
    collegeId: 'education',
    departmentId: 'education-management',
    url: '/slides/educational-psychology.pdf',
    image: '/images/educational-psychology.jpg',
    isRowReverse: false
  },
  {
    id: 12,
    title: 'Soil Science Fundamentals',
    description: 'Lecture notes on soil composition and properties',
    type: 'note',
    level: 300,
    collegeId: 'agriculture',
    departmentId: 'soil-science',
    url: '/notes/soil-science.pdf',
    image: '/images/soil-science.jpg',
    isRowReverse: true
  },
  {
    id: 13,
    title: 'Artificial Intelligence Basics',
    description: 'Introduction to AI concepts and applications',
    type: 'tutorial',
    level: 400,
    collegeId: 'engineering',
    departmentId: 'computer',
    url: '/tutorials/ai-basics.pdf',
    image: '/images/ai-basics.jpg',
    isRowReverse: false
  },
  {
    id: 14,
    title: 'Fluid Mechanics Principles',
    description: 'Comprehensive notes on fluid dynamics',
    type: 'note',
    level: 300,
    collegeId: 'engineering',
    departmentId: 'mechanical',
    url: '/notes/fluid-mechanics.pdf',
    image: '/images/fluid-mechanics.jpg',
    isRowReverse: true
  },
  {
    id: 15,
    title: 'Marketing Strategies',
    description: 'Key principles of marketing and branding',
    type: 'tutorial',
    level: 200,
    collegeId: 'management-science',
    departmentId: 'marketing',
    url: '/tutorials/marketing-strategies.pdf',
    image: '/images/marketing-strategies.jpg',
    isRowReverse: false
  },
  {
    id: 16,
    title: 'Database Management Systems',
    description: 'Fundamentals of database design and SQL',
    type: 'note',
    level: 300,
    collegeId: 'engineering',
    departmentId: 'computer',
    url: '/notes/database-systems.pdf',
    image: '/images/database-systems.jpg',
    isRowReverse: true
  },
  {
    id: 17,
    title: 'Microeconomics Overview',
    description: 'Lecture notes on microeconomic principles',
    type: 'note',
    level: 200,
    collegeId: 'management-science',
    departmentId: 'economics',
    url: '/notes/microeconomics.pdf',
    image: '/images/microeconomics.jpg',
    isRowReverse: false
  },
  {
    id: 18,
    title: 'Software Engineering Concepts',
    description: 'A guide to software development methodologies',
    type: 'tutorial',
    level: 400,
    collegeId: 'engineering',
    departmentId: 'computer',
    url: '/tutorials/software-engineering.pdf',
    image: '/images/software-engineering.jpg',
    isRowReverse: true
  },
  {
    id: 19,
    title: 'Chemical Reactions and Stoichiometry',
    description: 'Lecture notes on chemical reaction principles',
    type: 'note',
    level: 100,
    collegeId: 'sciences',
    departmentId: 'chemistry',
    url: '/notes/stoichiometry.pdf',
    image: '/images/stoichiometry.jpg',
    isRowReverse: false
  },
  {
    id: 20,
    title: 'Structural Analysis for Civil Engineers',
    description: 'Key concepts in structural engineering',
    type: 'tutorial',
    level: 300,
    collegeId: 'engineering',
    departmentId: 'civil',
    url: '/tutorials/structural-analysis.pdf',
    image: '/images/structural-analysis.jpg',
    isRowReverse: true
  }
];

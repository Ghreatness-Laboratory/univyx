export interface AcademicTutorial {
  id: string;
  title: string;
  author: string;
  department: string;
  universityName: string;
  level: string;
  resourceType: 'tutorial' | 'study_note' | 'book' | 'exam_prep';
  summary: string;
  downloadOrSourceUrl: string;
}

export interface UniversityKnowledgeEntry {
  id: string;
  title: string;
  category: 'grading_system' | 'academic_regulations' | 'siwes_clearance' | 'library_access' | 'exam_rules';
  summary: string;
  content: string;
  source: string;
}

export const ACADEMIC_TUTORIALS: AcademicTutorial[] = [
  {
    id: 'tut-1',
    title: 'Differential Calculus & Complex Numbers Made Easy',
    author: 'Engr. D. Adeleke',
    department: 'Computer & Electrical Engineering',
    universityName: 'Covenant University',
    level: '100L / 200L',
    resourceType: 'tutorial',
    summary: 'Step-by-step mathematical guide covering limits, derivatives, L\'Hopital\'s rule, and De Moivre\'s theorem with worked collegiate drills.',
    downloadOrSourceUrl: 'https://open.umn.edu/opentextbooks'
  },
  {
    id: 'tut-2',
    title: 'Epidemiology, Biostatistics & Pathogen Surveillance Notes',
    author: 'Dr. O. Adebayo',
    department: 'Public Health & Nursing Sciences',
    universityName: 'Babcock University',
    level: '300L',
    resourceType: 'study_note',
    summary: 'Summary tables of disease incidence rates, confidence intervals, p-value interpretation, and WHO outbreak protocols.',
    downloadOrSourceUrl: 'https://ncbi.nlm.nih.gov'
  },
  {
    id: 'tut-3',
    title: 'Law of Evidence & Judicial Cross-Examination Handbook',
    author: 'Barr. Folake Thomas',
    department: 'Faculty of Law',
    universityName: 'Afe Babalola University (ABUAD)',
    level: '400L',
    resourceType: 'book',
    summary: 'In-depth analysis of admissibility of electronic evidence under the Nigerian Evidence Act with appellate precedents.',
    downloadOrSourceUrl: 'https://nigerianlawguru.com'
  },
  {
    id: 'tut-4',
    title: 'Media Ethics & Digital Communication Strategy',
    author: 'Prof. K. Nwachukwu',
    department: 'School of Media & Communication',
    universityName: 'Pan-Atlantic University',
    level: '200L / 300L',
    resourceType: 'exam_prep',
    summary: 'Review framework covering copyright fair use, broadcast defamation laws, and journalistic truth in digital newsrooms.',
    downloadOrSourceUrl: 'https://core.ac.uk'
  }
];

export const KNOWLEDGE_DIRECTORY: UniversityKnowledgeEntry[] = [
  {
    id: 'know-1',
    title: 'Private University 5.0 CGPA Computation Formula',
    category: 'grading_system',
    summary: 'Standard NUC-approved formula for semester GPA and Cumulative Grade Point Average calculation.',
    content: `Private universities in Nigeria adhere to the National Universities Commission (NUC) 5.0 scale:
• A (70% - 100%): 5 Points (Excellent)
• B (60% - 69%): 4 Points (Very Good)
• C (50% - 59%): 3 Points (Good)
• D (45% - 49%): 2 Points (Pass)
• F (0% - 44%): 0 Points (Fail)

Calculation:
1. Quality Point (QP) = Course Credit Units × Grade Point earned.
2. Semester GPA = (Total Quality Points in Semester) ÷ (Total Registered Units in Semester).
3. Cumulative GPA (CGPA) = (Cumulative Quality Points across all semesters) ÷ (Cumulative Credit Units registered to date).

Graduation Honors:
• 4.50 – 5.00: First Class Honours
• 3.50 – 4.49: Second Class Honours (Upper Division)
• 2.40 – 3.49: Second Class Honours (Lower Division)
• 1.50 – 2.39: Third Class Honours`,
    source: 'National Universities Commission (NUC) Benchmark Minimum Academic Standards'
  },
  {
    id: 'know-2',
    title: 'SIWES Industrial Training (IT) Defense & Logbook Clearance',
    category: 'siwes_clearance',
    summary: 'Mandatory prerequisites for defending 3 to 6-month Industrial Work Experience.',
    content: `All participating engineering, computer science, and mass communication undergraduates must complete the following prior to departmental defense:
1. Completed ITF Form 8 signed and officially stamped by the Industry Training Supervisor.
2. Fully documented Weekly Logbook featuring technical summaries, system architecture diagrams, and weekly supervisor endorsement.
3. Formatted Technical Report (minimum 25–40 pages according to faculty typography standard).
4. Powerpoint slide deck (maximum 10 slides, 10-minute presentation followed by question-and-answer panel).`,
    source: 'Industrial Training Fund (ITF) Collegiate Advisory'
  },
  {
    id: 'know-3',
    title: 'Course Add/Drop Protocols & Semester Deferment Guidelines',
    category: 'academic_regulations',
    summary: 'Official protocol for adjusting semester course loads or requesting temporary academic leave.',
    content: `1. Course Add/Drop Period: Students may adjust elective or general courses during the first three (3) weeks of semester resumption through the student portal. Once the window closes, un-dropped courses receive automatic F grades if examinations are unattended.
2. Semester Deferment: Requests for deferment on medical or compassionate grounds must be formally addressed through the Course Advisor and Head of Department (HOD) to the Dean of Faculty, accompanied by medical validation from the University Health Centre.`,
    source: 'Private University Academic Senate Handbook'
  }
];

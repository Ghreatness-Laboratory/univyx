export interface CampusEvent {
  id: string;
  title: string;
  universityName: string;
  location?: string;
  venue: string;
  date: string;
  start_time?: string;
  registration_url?: string;
  category: 'Conference' | 'Arts' | 'Sports' | 'Debate' | 'Tech';
  description: string;
  rsvpCount: number;
}

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'evt-1',
    title: 'Covenant University Tech & Entrepreneurship Gala',
    universityName: 'Covenant University',
    location: 'Covenant University, Ota (Canaanland)',
    venue: 'Covenant University Chapel Foyer & CST Quad',
    date: 'Nov 12, 2026',
    category: 'Tech',
    description: 'Keynotes from alumni founders at Flutterwave, Paystack & Moniepoint, collegiate demos, and internship speed-networking.',
    rsvpCount: 420
  },
  {
    id: 'evt-2',
    title: 'Babcock Annual Classical & Choral Festival',
    universityName: 'Babcock University',
    location: 'Babcock University, Ilishan-Remo (Main Campus)',
    venue: 'Babcock University Pioneer Church Auditorium',
    date: 'Nov 18, 2026',
    category: 'Arts',
    description: 'Choral orchestras, solo recitals, and musical presentations from university choirs across private institutions.',
    rsvpCount: 310
  },
  {
    id: 'evt-3',
    title: 'ABUAD Law Week & Appellate Moot Court Finals',
    universityName: 'Afe Babalola University (ABUAD)',
    location: 'Afe Babalola University (ABUAD), Ado-Ekiti',
    venue: 'Justice Babalola Moot Courtroom, ABUAD',
    date: 'Nov 24, 2026',
    category: 'Debate',
    description: 'Annual moot court competition with visiting SANs, legal clinics, and inter-faculty jurisprudence symposium.',
    rsvpCount: 260
  },
  {
    id: 'evt-4',
    title: 'Pan-Atlantic Creative Arts & Media Colloquium',
    universityName: 'Pan-Atlantic University',
    location: 'Pan-Atlantic University (PAU), Ibeju-Lekki',
    venue: 'SMC Media Auditorium, PAU Campus',
    date: 'Dec 02, 2026',
    category: 'Arts',
    description: 'Filmmaking panels, student photography awards, and creative writing symposium with notable Nollywood writers and producers.',
    rsvpCount: 195
  },
  {
    id: 'evt-5',
    title: 'Nile AI & Cybersecurity Inter-Collegiate Challenge',
    universityName: 'Nile University',
    location: 'Nile University of Nigeria, Abuja (Jabi Campus)',
    venue: 'Nile Innovation Complex Lab 4',
    date: 'Dec 10, 2026',
    category: 'Tech',
    description: 'CTF security challenges, ethical hacking drills, and machine learning model benchmarks between top private varsity teams.',
    rsvpCount: 340
  }
];

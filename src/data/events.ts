export interface CampusEvent {
  id: string;
  title: string;
  universityName: string;
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
    venue: 'Justice Babalola Moot Courtroom, ABUAD',
    date: 'Nov 24, 2026',
    category: 'Debate',
    description: 'Annual moot court competition with visiting SANs, legal clinics, and inter-faculty jurisprudence symposium.',
    rsvpCount: 260
  }
];

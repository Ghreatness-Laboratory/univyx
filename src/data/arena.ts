export interface CollegiateRanking {
  id: string;
  universityId: string;
  university_id?: string;
  universityName: string;
  university_name?: string;
  shortName: string;
  university_short?: string;
  powerScore: number;
  power_score: number;
  academicScore: number;
  academic_score: number;
  gamingScore: number;
  gaming_score: number;
  sportsScore: number;
  sports_score: number;
  tournamentsWon: number;
  tournaments_won: number;
  badge?: string;
}

export interface ArenaTournament {
  id: string;
  title: string;
  category: 'Esports' | 'Debate' | 'Hackathon' | 'Chess';
  startDate: string;
  description: string;
  participatingSchools: string[];
}

export const COLLEGIATE_RANKINGS: CollegiateRanking[] = [
  {
    id: 'rank-1',
    universityId: 'covenant',
    universityName: 'Covenant University',
    shortName: 'Covenant',
    powerScore: 96.4,
    academicScore: 97.0,
    gamingScore: 95.5,
    sportsScore: 96.0,
    tournamentsWon: 9,
    badge: 'National Private Leader'
  },
  {
    id: 'rank-2',
    universityId: 'babcock',
    universityName: 'Babcock University',
    shortName: 'Babcock',
    powerScore: 94.8,
    academicScore: 95.5,
    gamingScore: 93.0,
    sportsScore: 95.0,
    tournamentsWon: 7,
    badge: 'Top Medical & Debating'
  },
  {
    id: 'rank-3',
    universityId: 'abuad',
    universityName: 'Afe Babalola University (ABUAD)',
    shortName: 'ABUAD',
    powerScore: 93.9,
    academicScore: 96.2,
    gamingScore: 91.0,
    sportsScore: 94.5,
    tournamentsWon: 6,
    badge: 'Law & Moot Champion'
  },
  {
    id: 'rank-4',
    universityId: 'pau',
    universityName: 'Pan-Atlantic University',
    shortName: 'PAU',
    powerScore: 92.5,
    academicScore: 94.0,
    gamingScore: 92.0,
    sportsScore: 91.0,
    tournamentsWon: 5
  },
  {
    id: 'rank-5',
    universityId: 'nile',
    universityName: 'Nile University of Nigeria',
    shortName: 'Nile',
    powerScore: 91.8,
    academicScore: 92.5,
    gamingScore: 93.5,
    sportsScore: 90.0,
    tournamentsWon: 4
  },
  {
    id: 'rank-6',
    universityId: 'baze',
    universityName: 'Baze University',
    shortName: 'Baze',
    powerScore: 90.6,
    academicScore: 91.5,
    gamingScore: 92.0,
    sportsScore: 88.5,
    tournamentsWon: 3
  },
  {
    id: 'rank-7',
    universityId: 'bowen',
    universityName: 'Bowen University',
    shortName: 'Bowen',
    powerScore: 89.4,
    academicScore: 90.0,
    gamingScore: 87.5,
    sportsScore: 91.0,
    tournamentsWon: 2
  },
  {
    id: 'rank-8',
    universityId: 'landmark',
    universityName: 'Landmark University',
    shortName: 'Landmark',
    powerScore: 88.7,
    academicScore: 91.0,
    gamingScore: 85.0,
    sportsScore: 90.0,
    tournamentsWon: 2
  }
];

export const ARENA_TOURNAMENTS: ArenaTournament[] = [
  {
    id: 'tourn-1',
    title: 'Univyx All-Private Collegiate Esports Invitational 2026',
    category: 'Esports',
    startDate: 'November 14, 2026',
    description: 'Collegiate e-football and tactical arena teams representing Covenant, Babcock, Nile, ABUAD, and Baze clash for collegiate glory.',
    participatingSchools: ['Covenant', 'Babcock', 'Nile', 'ABUAD', 'Baze', 'PAU']
  },
  {
    id: 'tourn-2',
    title: 'Private Universities Hackathon: Tech for Campus Impact',
    category: 'Hackathon',
    startDate: 'December 2, 2026',
    description: '48-hour student software sprint developing open-source educational and campus safety utilities.',
    participatingSchools: ['All 28 Private Universities']
  }
];

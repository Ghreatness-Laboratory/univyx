export interface GamingEvent {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  category: string;
  registrationLink: string;
  platforms: string[];
  prizePool: string;
}

export interface Tournament {
  id: string;
  title: string;
  image: string;
  game: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  registrationLink: string;
  type: "intra" | "inter";
  university?: string;
  participants: number;
  prizePool: string;
  status: "upcoming" | "ongoing" | "completed";
}

export interface University {
  id: string;
  name: string;
  logo: string;
  shortName: string;
}

export interface PlayerRanking {
  id: string;
  name: string;
  avatar: string;
  university: string;
  universityLogo: string;
  points: number;
  rank: number;
  game: string;
  winRate: number;
  badges: string[];
}
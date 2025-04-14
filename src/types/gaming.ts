export interface GamingEvent {
  id: string;
  title: string;
  image: string;
  date: string;
}

export interface Tournament {
  id: string;
  title: string;
  image: string;
  game: string;
  date: string;
  registrationLink: string;
  type: "intra" | "inter";
  university?: string;
}

export interface University {
  id: string;
  name: string;
  logo: string;
  shortName: string;
}

export interface LeaderboardEntry {
  rank: number;
  universityId: string;
  universityName: string;
  logo: string;
  members: number;
}

export interface GameLeaderboard {
  gameId: number;
  gameName: string;
  leaderboard: LeaderboardEntry[];
}

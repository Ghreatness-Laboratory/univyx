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

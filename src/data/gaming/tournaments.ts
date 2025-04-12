import { Tournament, University } from "../../types/gaming";

import Gaming1 from "../../assets/images/gaming/gaming-1.jpg";
import Gaming2 from "../../assets/images/gaming/gaming-2.jpg";
import Gaming3 from "../../assets/images/gaming/gaming-3.jpg";
import Gaming4 from "../../assets/images/gaming/gaming-4.jpg";
import Gaming5 from "../../assets/images/gaming/gaming-5.jpg";
import Gaming6 from "../../assets/images/gaming/gaming-6.jpg";
import Gaming7 from "../../assets/images/gaming/gaming-7.jpg";

export const popularGames = [
  "Valorant",
  "League of Legends",
  "CS:GO",
  "Dota 2",
  "Overwatch",
  "FIFA 23",
  "Rocket League",
  "Apex Legends",
];

export const universities: University[] = [
  {
    id: "1",
    name: "Bells University",
    logo: "/api/placeholder/50/50",
    shortName: "Stanford",
  },
  {
    id: "2",
    name: "Babcock University",
    logo: "/api/placeholder/50/50",
    shortName: "Harvard",
  },
  { id: "3", name: "MIT", logo: "/api/placeholder/50/50", shortName: "MIT" },
  {
    id: "4",
    name: "Covenant University",
    logo: "/api/placeholder/50/50",
    shortName: "Yale",
  },
  {
    id: "5",
    name: "Crawford University",
    logo: "/api/placeholder/50/50",
    shortName: "Princeton",
  },
  {
    id: "6",
    name: "Baze University",
    logo: "/api/placeholder/50/50",
    shortName: "Oxford",
  },
];

export const tournaments: Tournament[] = [
  {
    id: "1",
    title: "Valorant Championship",
    image: Gaming1,
    game: "Valorant",
    date: "May 15, 2025",
    registrationLink: "/register/t1",
    type: "inter",
  },
  {
    id: "2",
    title: "UTech League of Legends Tournament",
    image: Gaming2,
    game: "League of Legends",
    date: "May 20, 2025",
    registrationLink: "/register/t2",
    type: "intra",
    university: "University of Technology",
  },
  {
    id: "3",
    title: "SU FIFA Tournament",
    image: Gaming3,
    game: "FIFA 23",
    date: "May 5, 2025",
    registrationLink: "/register/t4",
    type: "intra",
    university: "State University",
  },
  {
    id: "4",
    title: "National Dota 2 League",
    image: Gaming4,
    game: "Dota 2",
    date: "April 18, 2025",
    registrationLink: "/register/t5",
    type: "inter",
  },
  {
    id: "5",
    title: "MetU Rocket League Cup",
    image: Gaming5,
    game: "Rocket League",
    date: "April 10, 2025",
    registrationLink: "/register/t6",
    type: "intra",
    university: "Metropolitan University",
  },
  {
    id: "6",
    title: "Overwatch Intercollegiate",
    image: Gaming6,
    game: "Overwatch",
    date: "May 22, 2025",
    registrationLink: "/register/t7",
    type: "inter",
  },
  {
    id: "7",
    title: "NC Apex Legends Challenge",
    image: Gaming7,
    game: "Apex Legends",
    date: "April 30, 2025",
    registrationLink: "/register/t8",
    type: "intra",
    university: "National College",
  },
];

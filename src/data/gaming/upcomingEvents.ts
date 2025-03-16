import { GamingEvent } from "../../types/gaming";

export const upcomingEvents: GamingEvent[] = [
  {
    id: "1",
    title: "Call of Duty Warzone Tournament",
    image: "/api/placeholder/400/200",
    date: "March 25, 2025",
    time: "6:00 PM - 10:00 PM",
    venue: "Virtual Event",
    description: "Join the ultimate battle royale experience! Squad up with your friends and compete against other teams in this high-stakes Call of Duty Warzone tournament. Top teams will walk away with exclusive merch and bragging rights.",
    category: "FPS",
    registrationLink: "/events/cod-warzone",
    platforms: ["PC", "PlayStation", "Xbox"],
    prizePool: "$2,000"
  },
  {
    id: "2",
    title: "League of Legends Championship",
    image: "/api/placeholder/400/200",
    date: "April 3-5, 2025",
    time: "4:00 PM - 9:00 PM",
    venue: "University Gaming Arena",
    description: "The biggest LoL event of the semester is here! Form your dream team of 5 and battle it out in Summoner's Rift. The winning team will represent the university in the inter-university championship next month.",
    category: "MOBA",
    registrationLink: "/events/lol-championship",
    platforms: ["PC"],
    prizePool: "$3,500"
  },
  {
    id: "3",
    title: "FIFA 25 1v1 Tournament",
    image: "/api/placeholder/400/200",
    date: "March 18, 2025",
    time: "3:00 PM - 8:00 PM",
    venue: "Student Center - Room 302",
    description: "Show off your football skills in our FIFA 25 tournament! Single elimination brackets with best-of-three finals. Bring your own controller or use one of ours.",
    category: "Sports",
    registrationLink: "/events/fifa-tournament",
    platforms: ["PlayStation 5"],
    prizePool: "$750"
  },
  {
    id: "4",
    title: "Valorant Campus Cup",
    image: "/api/placeholder/400/200",
    date: "April 10, 2025",
    time: "5:00 PM - 11:00 PM",
    venue: "Virtual Event",
    description: "The most anticipated tactical shooter tournament is back! Form your squad of 5 and compete in this intense competition. Strategy, communication, and raw skill will be put to the test.",
    category: "FPS",
    registrationLink: "/events/valorant-cup",
    platforms: ["PC"],
    prizePool: "$2,500"
  },
  {
    id: "5",
    title: "Super Smash Bros Ultimate Showdown",
    image: "/api/placeholder/400/200",
    date: "March 22, 2025",
    time: "2:00 PM - 8:00 PM",
    venue: "Gaming Lounge - Student Union",
    description: "It's time to Smash! Join our Super Smash Bros Ultimate tournament and prove you're the best fighter on campus. Single elimination with winners and losers brackets.",
    category: "Fighting",
    registrationLink: "/events/smash-showdown",
    platforms: ["Nintendo Switch"],
    prizePool: "$1,000"
  },
];

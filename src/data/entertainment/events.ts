import Event1 from "../../assets/images/entertainment/events/event1.jpg"
import Event2 from "../../assets/images/entertainment/events/event2.jpg"
import Event3 from "../../assets/images/entertainment/events/event3.jpg"
import Event4 from "../../assets/images/entertainment/events/event4.jpg"


export interface EventProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  category: string;
  attendees: number;
  isRegistered: boolean;
}

export const events: EventProps[] = [
  {
    id: "event-1",
    title: "Spring Festival Concert",
    date: "March 15, 2025",
    time: "7:00 PM - 11:00 PM",
    location: "University Amphitheater",
    description: "Annual spring concert featuring top artists and student performers. This year's headliner is a surprise guest with multiple Grammy awards.",
    imageUrl: Event1,
    category: "Music",
    attendees: 1250,
    isRegistered: false,
  },
  {
    id: "event-2",
    title: "Tech Career Fair",
    date: "March 10, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Business School Atrium",
    description: "Connect with over 50 tech companies for internship and job opportunities. Bring your resume and prepare your elevator pitch!",
    imageUrl: Event2,
    category: "Career",
    attendees: 875,
    isRegistered: true,
  },
  {
    id: "event-3",
    title: "International Food Festival",
    date: "March 18, 2025",
    time: "12:00 PM - 6:00 PM",
    location: "Central Campus Quad",
    description: "Sample cuisines from over 20 countries prepared by international student associations. Food tickets available at the entrance.",
    imageUrl: Event3,
    category: "Cultural",
    attendees: 1800,
    isRegistered: false,
  },
  {
    id: "event-4",
    title: "Hackathon 2025",
    date: "March 22-24, 2025",
    time: "48 Hours",
    location: "Engineering Building",
    description: "Annual coding competition with prizes worth $10,000. Form teams and build innovative solutions to real-world problems.",
    imageUrl: Event4,
    category: "Technology",
    attendees: 420,
    isRegistered: false,
  },
];
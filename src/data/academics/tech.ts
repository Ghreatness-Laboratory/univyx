import Tech1 from "../../assets/images/academics/image 4.png";
import Tech2 from "../../assets/images/academics/image 5.png";
import Tech3 from "../../assets/images/academics/image 6.png";

export interface TechProps {
  name: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  category: string;
  description: string;
  link: string;
}

export const techs: TechProps[] = [
  {
    name: "Building Your Tech Network in University",
    date: "Sep 4, 2024",
    time: "2:00 PM - 4:00 PM",
    venue: "Innovation Hub, Building 5",
    image: Tech1,
    category: "Networking",
    description:
      "Building a strong tech network during your university years can significantly impact your career trajectory. Start by joining tech clubs and attending campus hackathons.",
    link: "",
  },
  {
    name: "Student-Led Innovations Shaping Campus Life",
    date: "Aug 28, 2024",
    time: "3:30 PM - 5:30 PM",
    venue: "Student Center, Room 204",
    image: Tech2,
    category: "Innovation",
    description:
      "From smart campus navigation apps to food delivery platforms specifically designed for dining halls, student entrepreneurs are revolutionizing campus experiences.",
    link: "",
  },
  {
    name: "From Campus Projects to Startup Success",
    date: "Aug 15, 2024",
    time: "1:00 PM - 3:00 PM",
    venue: "Business School Auditorium",
    image: Tech3,
    category: "Startup",
    description:
      "Many successful startups began as humble university projects. Take time to identify problems within your campus community that technology could solve.",
    link: "",
  },
  {
    name: "Emerging Tech Skills Every Student Should Master",
    date: "Aug 5, 2024",
    time: "10:00 AM - 12:00 PM",
    venue: "Computer Science Building, Lab 3",
    image: Tech1,
    category: "Skills",
    description:
      "Beyond programming fundamentals, today's tech industry demands familiarity with AI/ML concepts, cloud computing platforms, and data analytics.",
    link: "",
  },
];
import News1 from "../../assets/images/entertainment/news/news1.png";
import News2 from "../../assets/images/entertainment/news/news2.png";
import News3 from "../../assets/images/entertainment/news/news3.png";
import News4 from "../../assets/images/entertainment/news/news4.jpg";
import News5 from "../../assets/images/entertainment/news/news5.jpg";

export interface NewsProps {
  id: number;
  title: string;
  source: string;
  date: string;
  description: string;
  category: string;
  imageUrl: string;
  likes: number;
  readTime: string;
  section: string;
  content?: string;
}

export const universityNews: NewsProps[] = [
  {
    id: 1,
    title: "BELLS 20th Anniversary",
    source: "University Press",
    date: "February 20, 2025",
    description: "20 years of academic brilliance and community impact honoring the past, embracing the future!",
    category: "Campus",
    imageUrl: News1,
    likes: 245,
    readTime: "3 min",
    section: "news",
    content: `Bells University is proud to celebrate its 20th anniversary, marking two decades of academic excellence and community impact. 
              Established in 2005, the university has grown into a leading institution known for innovation, research, and student development.
              The anniversary event will feature speeches from esteemed alumni, a showcase of achievements over the years, and the unveiling of new strategic goals.
              Students, faculty, and stakeholders are encouraged to participate in the week-long celebration as the university embraces the future while honoring its remarkable past.`
  },
  {
    id: 2,
    title: "Adeleke FYB Week",
    source: "SUG",
    date: "February 18, 2025",
    description: "“Final Year Brethren” week A whole week of fun activities and unforgettable moments as we honor the journey so far!",
    category: "Campus",
    imageUrl: News2,
    likes: 312,
    readTime: "4 min",
    section: "news",
    content: `The Student Union Government is excited to announce the upcoming Final Year Brethren (FYB) Week, a tradition dedicated to celebrating the journey of final-year students.
              This year's event is packed with exciting activities, including a grand gala night, career workshops, talent showcases, and fun games.
              It's a time to reflect on shared experiences, make lasting memories, and prepare for the transition to the next phase of life.
              Students are encouraged to participate in the events and make the most of their final days on campus!`
  },
  {
    id: 3,
    title: "Student Awards Ceremony",
    source: "Academic Affairs",
    date: "February 15, 2025",
    description: "Celebrating the achievements of students in various fields.",
    category: "Academics",
    imageUrl: News3,
    likes: 187,
    readTime: "2 min",
    section: "news",
    content: `The Academic Affairs Office is set to host the annual Student Awards Ceremony, recognizing outstanding achievements in academics, leadership, sports, and community service.
              The event will feature notable speakers, award presentations, and scholarship announcements.
              Students who have excelled in their respective fields will be honored, inspiring others to strive for excellence.
              Family, friends, and faculty members are invited to attend and celebrate the exceptional accomplishments of the university’s brightest minds.`
  },
  {
    id: 4,
    title: "Basketball Team Advances to Finals",
    source: "Sports Department",
    date: "February 18, 2025",
    description: "Our university basketball team has made it to the finals after a nail-biting semifinal match against our rivals.",
    category: "Sports",
    imageUrl: News4,
    likes: 312,
    readTime: "4 min",
    section: "news",
    content: `The university basketball team has secured a spot in the finals after a thrilling semi-final match against their long-time rivals.
              The game was intense, with both teams giving their all, but our team’s determination and teamwork led them to victory.
              The finals are set to take place next week at the university stadium, and students are encouraged to come out in full support.
              Let's rally behind our team and cheer them on as they compete for the championship title!`
  },
  {
    id: 5,
    title: "New Student Center Opening Next Month",
    source: "University Press",
    date: "February 20, 2025",
    description: "The long-awaited student center will finally open its doors with state-of-the-art facilities and collaborative spaces.",
    category: "Campus",
    imageUrl: News5,
    likes: 245,
    readTime: "3 min",
    section: "news",
    content: `Exciting news for students! The university is set to open its brand-new Student Center next month.
              The facility will offer modern study lounges, collaborative workspaces, recreational areas, and a variety of dining options.
              Designed to enhance student life, the center will serve as a hub for relaxation, networking, and academic collaboration.
              A grand opening ceremony is planned, featuring guest speakers and entertainment, so be sure to mark your calendars and be part of this historic moment!`
  }
];

import News1 from "../../assets/images/entertainment/news/news1.png"
import News2 from "../../assets/images/entertainment/news/news2.png"
import News3 from "../../assets/images/entertainment/news/news3.png"
import News4 from "../../assets/images/entertainment/news/news4.jpg"
import News5 from "../../assets/images/entertainment/news/news5.jpg"

export interface NewsProps {
  id: string;
  title: string;
  source: string;
  date: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  likes: number;
  readTime: string;
}

export const universityNews: NewsProps[] = [
  {
    id: "news-1",
    title: "BELLS 20th Anniversary",
    source: "University Press",
    date: "February 20, 2025",
    excerpt: "20 years of academic brilliance and community impact honoring the past, embracing the future!",
    category: "Campus",
    imageUrl: News1,
    likes: 245,
    readTime: "3 min",
  },
  {
    id: "news-2",
    title: "Adeleke FYB week ",
    source: "SUG",
    date: "February 18, 2025",
    excerpt: "“Final Year Brethren” week A whole week of fun activities and unforgettable moments as we honor the journey so far!",
    category: "Campus",
    imageUrl: News2,
    likes: 312,
    readTime: "4 min",
  },
  {
    id: "news-3",
    title: "Student Awards Ceremony",
    source: "Academic Affairs",
    date: "February 15, 2025",
    excerpt: "Celebrating the achievements of students in various fields.",
    category: "Academics",
    imageUrl: News3,
    likes: 187,
    readTime: "2 min",
  },
  {
    id: "news-5",
    title: "Basketball Team Advances to Finals",
    source: "Sports Department",
    date: "February 18, 2025",
    excerpt: "Our university basketball team has made it to the finals after a nail-biting semifinal match against our rivals.",
    category: "Sports",
    imageUrl: News4,
    likes: 312,
    readTime: "4 min",
  },
  {
    id: "news-4",
    title: "New Student Center Opening Next Month",
    source: "University Press",
    date: "February 20, 2025",
    excerpt: "The long-awaited student center will finally open its doors with state-of-the-art facilities and collaborative spaces.",
    category: "Campus",
    imageUrl: News5,
    likes: 245,
    readTime: "3 min",
  },
];

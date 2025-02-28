import Article1 from "../../assets/images/entertainment/articles/article1.png"
import Article2 from "../../assets/images/entertainment/articles/article2.jpg"
import Article3 from "../../assets/images/entertainment/articles/article3.png"
import Article4 from "../../assets/images/entertainment/articles/article4.jpg"

export interface ArticleProps {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  likes: number;
  comments: number;
  isBookmarked: boolean;
  readTime: string;
}

export const studentArticles: ArticleProps[] = [
  {
    id: "article-1",
    title: "How I Survived Finals Week with Zero Sleep",
    excerpt: "A humorous take on the finals week experience and tips to actually avoid my mistakes.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
    author: "Alex Johnson",
    date: "February 25, 2025",
    category: "Student Life",
    imageUrl: Article1,
    likes: 432,
    comments: 56,
    isBookmarked: false,
    readTime: "7 min",
  },
  {
    id: "article-2",
    title: "5 Hidden Spots on Campus You Need to Visit",
    excerpt: "Discover these secret study spots and hangout areas that most students don't know about.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
    author: "Jamie Smith",
    date: "February 22, 2025",
    category: "Campus Life",
    imageUrl: Article2,
    likes: 387,
    comments: 42,
    isBookmarked: true,
    readTime: "5 min",
  },
  {
    id: "article-3",
    title: "My Semester Abroad in Tokyo: What I Learned",
    excerpt: "Personal reflections on cultural exchange, language barriers, and finding yourself overseas.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
    author: "Taylor Rodriguez",
    date: "February 20, 2025",
    category: "Travel",
    imageUrl: Article3,
    likes: 512,
    comments: 78,
    isBookmarked: false,
    readTime: "8 min",
  },
  {
    id: "article-4",
    title: "Balancing Part-Time Work and Full-Time Studies",
    excerpt: "Practical advice on managing your schedule, priorities, and mental health while working through college.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
    author: "Jordan Lee",
    date: "February 18, 2025",
    category: "Advice",
    imageUrl: Article4,
    likes: 298,
    comments: 35,
    isBookmarked: false,
    readTime: "6 min",
  },
];
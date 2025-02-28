import Topic1 from "../../assets/images/entertainment/topics/topic1.jpg"
import Topic2 from "../../assets/images/entertainment/topics/topic2.jpg"
import Topic3 from "../../assets/images/entertainment/topics/topic3.jpg"
import Topic4 from "../../assets/images/entertainment/topics/topic4.jpg"

export interface TrendingTopicProps {
  id: string;
  title: string;
  tags: string[];
  discussionCount: number;
  lastUpdated: string;
  imageUrl: string;
}

export const trendingTopics: TrendingTopicProps[] = [
  {
    id: "topic-1",
    title: "Should Final Exams Be Replaced with Projects?",
    tags: ["academics", "exams", "education"],
    discussionCount: 87,
    lastUpdated: "2 hours ago",
    imageUrl: Topic1,
  },
  {
    id: "topic-2",
    title: "New Campus Housing Policy Debate",
    tags: ["housing", "policy", "student life"],
    discussionCount: 132,
    lastUpdated: "5 hours ago",
    imageUrl: Topic2,
  },
  {
    id: "topic-3",
    title: "Best Study Playlists for Different Subjects",
    tags: ["music", "study", "productivity"],
    discussionCount: 64,
    lastUpdated: "1 day ago",
    imageUrl: Topic3,
  },
  {
    id: "topic-4",
    title: "Mental Health Resources on Campus",
    tags: ["health", "wellness", "resources"],
    discussionCount: 93,
    lastUpdated: "8 hours ago",
    imageUrl: Topic4,
  },
];
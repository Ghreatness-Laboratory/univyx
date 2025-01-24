import Blogs from "../components/layouts/blogs/Blogs";
import MemberStories from "../components/layouts/blogs/MemberStories";

export default function Blog() {
  return (
    <main data-testid="blog-page">
      <Blogs />
      <MemberStories />
    </main>
  );
}

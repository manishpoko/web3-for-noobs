import type { LocalPostType } from "../pages/CategoryPage";
import ArticleListItem from "./ArticleListItem";

interface ArticleListProps {
  posts: LocalPostType[];
}

export default function ArticleList({ posts }: ArticleListProps) {
  return (
    // jjjust a clean grid. The sharp corners of the children handle the style.
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <ArticleListItem 
            key={post.postId} 
            id={post.postId} 
            title={post.title}
            description={post.description} 
            category={post.category || ""} 
            slug={post.slug}
          />
        ))}
    </div>
  );
}
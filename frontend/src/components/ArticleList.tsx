//received the posts array as prop (categoryPost)
//maps the item objects to render each articleListItem component

import type { LocalPostType } from "../pages/CategoryPage";
import ArticleListItem from "./ArticleListItem";

interface ArticleListProps {
  posts: LocalPostType[];
}

export default function ArticleList({ posts }: ArticleListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {posts.map((post) => (
          <ArticleListItem 
            key={post.postId} 
            id={post.postId} 
            title={post.title}
            description={post.description} 
            slug={post.slug || ""} // Fallback if slug is missing
          />
        ))}
    </div>
  );
}

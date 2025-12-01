//received the posts array as prop (categoryPost)
//maps the item objects to render each articleListItem component

import type { LocalPostType } from "../pages/CategoryPage";
import ArticleListItem from "./ArticleListItem";

interface ArticleListProps {
  posts: LocalPostType[];
}

export default function ArticleList({ posts }: ArticleListProps) {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <ArticleListItem key={post.id} id={post.id} title={post.title}  slug={post.slug} />
        ))}
      </ul>
    </div>
  );
}

//received the posts array as prop
//maps the item objects to render each articleListItem component

import type { PostType } from "../pages/CategoryPage";
import ArticleListItem from "./ArticleListItem";

interface ArticleListProps {
  items: PostType[];
}

export default function ArticleList({ items }: ArticleListProps) {
  return (
    <div>
      <ul>
        {items.map((item) => (
          <ArticleListItem key={item.id} id={item.id} title={item.title}  slug={item.slug} />
        ))}
      </ul>
    </div>
  );
}

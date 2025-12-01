import { Link } from "react-router-dom";

interface ArticleListItemProps {
  title: string;
  id: string;
  description: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
  authorName: string;
}

export const ArticleListItem = (props: ArticleListItemProps) => {
  return (
    <Link to={`/post/${props.slug}`}>
      <div>{props.title}</div>
    </Link>
  );
};

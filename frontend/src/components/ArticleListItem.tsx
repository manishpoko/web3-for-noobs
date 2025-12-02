import { Link } from "react-router-dom";

export interface ArticleListItemProps {
  title: string;
  id: string;
  description?: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
  authorName?: string;
}

export default function ArticleListItem(props: ArticleListItemProps){
  return (
    <Link to={`/post/${props.slug}`}>
      <div>{props.title}</div>
    </Link>
  );
};

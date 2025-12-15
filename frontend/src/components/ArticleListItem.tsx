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
    <Link to={`/post/${props.id}`}>
      <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
        <h3 className="font-bold text-lg">{props.title}</h3>
      </div>
    </Link>
  );
};

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

export default function ArticleListItem(props: ArticleListItemProps) {
  return (
    <Link to={`/post/${props.id}`}>
      <div className="p-4 cursor-pointer ">
        <h3
          className=" 
                
                bg-brand-pop
                border-4 border-black
                px-4 py-6
                shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                hover:shadow-[12px_12px_0px_0px_rgba(85,34,224,1)]
                hover:-translate-y-1
                transition-all
                cursor-pointer
                rounded-xl
                flex

                
        "
        >
          {props.title}
        </h3>
        <p className="font-body text-sm text-black opacity-90 line-clamp-3">
          {props.description || "no description available"}
        </p>
      </div>
    </Link>
  );
}

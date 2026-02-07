import { Link } from "react-router-dom";

export interface ArticleListItemProps {
  title: string;
  id: string;
  description?: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
  authorName?: string;
  category?: string
}

export default function ArticleListItem(props: ArticleListItemProps) {
  return (
    <Link to={`/post/${props.slug}`} className="block group h-full">
      <div 
        className="
          relative
          h-full
          p-6 
          
          /* BRUTALIST BASE: Solid Black, Sharp Corners */
          bg-black
          border border-white/20
          
          /* ACID HOVER: Glows green and shifts up */
          hover:border-acid
          hover:shadow-[0_0_15px_rgba(204,255,0,0.2)]
          hover:-translate-y-1
          
          transition-all duration-200
          cursor-pointer
          overflow-hidden
          flex flex-col
        "
      >
        <div className="relative z-10 flex flex-col flex-grow">
          {/* header: Date or ID */}
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2 group-hover:border-acid/30 transition-colors">
            <span className="text-xs font-mono text-gray-500 group-hover:text-acid">
              LOG_ID: {props.id.slice(0, 8)}
            </span>
          </div>

          {/* title: Big, White, Bold */}
          <h3 className="text-xl font-bold font-mono text-white mb-3 group-hover:text-acid transition-colors leading-tight">
            {props.title}
          </h3>

          {/* description- */}
          <p className="text-sm text-gray-400 font-sans line-clamp-3 leading-relaxed mb-6 flex-grow">
            {props.description || "No data available."}
          </p>

          {/* // Footer */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10 group-hover:border-acid/30 transition-colors">
             <span className="text-xs font-mono text-gray-600 group-hover:text-acid/80 transition-colors">
              [ READ_ENTRY ]
            </span>
            <span className="text-acid opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
              &gt;&gt;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
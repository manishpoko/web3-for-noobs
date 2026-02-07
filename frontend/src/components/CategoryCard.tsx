import { Link } from "react-router-dom";

interface CategoryCardInterface {
  title: string;
  description: string;
  category: string;
}

export default function CategoryCard(categoryCard: CategoryCardInterface) {
  return (
    <Link
      to={`/categories/${categoryCard.category}`}
      className="
                group
                relative
                block
                bg-black
                /* Sharp Acid Border */
                border-2 border-acid/50
                /* The Glow Effect on Hover */
                hover:border-acid
                hover:shadow-[0_0_30px_-5px_rgba(204,255,0,0.3)]
                hover:-translate-y-1
                transition-all duration-200
                p-8
                /* No rounded corners! Brutalist style. */
                cursor-pointer
                flex flex-col
                overflow-hidden
                "
    >
      <div className="relative z-10">
        {/* title */}
        <div className="text-3xl font-mono font-bold text-white mb-4 tracking-tight group-hover:text-acid transition-colors">
          <h1>{categoryCard.title}</h1>
        </div>

        {/* description */}
        <p className="text-textMuted font-mono text-sm leading-relaxed mb-12 flex-grow">
          {categoryCard.description}
        </p>

        {/* footer */}
        <div className="flex justify-between items-end mt-auto border-t border-acid/20 pt-6 group-hover:border-acid/50 transition-colors">
          <span className="font-mono text-xs text-acid/70 uppercase">
            LEVEL: NOOB
          </span>
          <span className="font-mono text-sm text-acid font-bold group-hover:underline">
            [ CLICK TO ENTER ]
          </span>
        </div>
      </div>
    </Link>
  );
}
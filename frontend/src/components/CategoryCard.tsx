import { Link } from "react-router-dom";

interface CategoryCardInterface {
  title: string;
  description: string;
  category: string
}

export default function CategoryCard(categoryCard: CategoryCardInterface) {
  return (
    <Link
      to={`/categories/${categoryCard.category}`}
      className="
                block
                bg-brand-pop
                border-4 border-black
                p-6
                shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                hover:shadow-[12px_12px_0px_0px_rgba(85,34,224,1)]
                hover:-translate-y-1
                transition-all
                cursor-pointer
                rounded-xl
                flex flex-col
                

                "
    >
      <span className="bg-brand-accent font-retro text-xs border-2 border-black px-2 py-2 mb-6 inline-flex items-center uppercase ">
        LEVEL: noob
      </span>

      <div className=" text-3xl font-display text-brand-primary mb-3 uppercase tracking-tight">
        <h1>{categoryCard.title}</h1>
      </div>

      <p className="font-body text-gray-600 mb-8 flex-grow">
        {categoryCard.description}
      </p>

      <div className="flex justify-between items-center mt-auto border-t-2 border-gray-100 pt-4">
        <span className="font-retro text-[10px] text-gray-900 animate-pulse">
          PRESS START TO ENTER
        </span>
        <span className="text-xl font-bold text-brand-primary">→</span>
      </div>
    </Link>
  );
}

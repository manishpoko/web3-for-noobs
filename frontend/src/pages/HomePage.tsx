
import CategoryCard from "../components/CategoryCard";
import LatestArticleBox from "../components/LatestArticlesBox";

import { CATEGORIES } from "../constants"; // import from a separte dedicated file for categories





export default function HomePage() {


  return (
    <div className="max-w-7xl mx-auto px-4 py-8  ">
        <h1 className=" text-4xl md:text-5xl font-reading  mb-8 px-2 ">mr noob, pick your card-</h1>

        <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((categ) => (
                <CategoryCard
                key={categ.id}
                title={categ.label}
                description={categ.description}
                category={categ.value}
                
                />

            ))
            
            }
        </div>
        <div className="flex-1 container mx-auto px-4 py-8">

          <div className="">
          <LatestArticleBox/>

          </div>

        </div>

    </div>
  );
}


import CategoryCard from "../components/CategoryCard";
import LatestArticleBox from "../components/LatestArticlesBox";
import { CATEGORIES } from "../constants"; 

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* HERO SECTION */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-mono font-bold text-white mb-4 tracking-tight">
            EVEN THE <span className="text-acid">PRO</span> WAS ONCE A <span className="text-acid">NOOB</span>.
          </h1>
          <p className="text-lg font-mono text-textMuted">
            Select a category below to initiate your learning sequence. // 0x1337
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {CATEGORIES.map((categ) => (
                <CategoryCard
                  key={categ.id}
                  title={categ.label}
                  description={categ.description}
                  category={categ.value}
                />
            ))}
        </div>

        {/* LATEST ARTICLES CONTAINER */}
        <div className="border-t border-white/10 pt-12">
           <LatestArticleBox/>
        </div>

    </div>
  );
}
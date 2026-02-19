import CategoryCard from "../components/CategoryCard";
import LatestArticleBox from "../components/LatestArticlesBox";
import { CATEGORIES } from "../constants"; 
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function HomePage() {

  const location = useLocation();

  //listen for hash changes and scroll smoothly (for the navbar clicks)
  useEffect(()=> {
    if(location.hash) {
      //extract the id(remove the #)-
      const targetId = location.hash.substring(1)
      const element = document.getElementById(targetId)

      if(element){
        //small timeout to let the dom load fully all its comoonents before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth"})
          
        }, 100);
      }
    } else {
      //if no hash, ensure we stay at the top
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [location]) //rerun whenever the url changes


  return (
    <div id="home" className="max-w-7xl mx-auto px-6 py-16">
        
        {/* HERO SECTION */}
        <div className="mb-16 text-center pt-8">
          <h1 className="text-4xl md:text-6xl font-mono font-bold text-white mb-4 tracking-tight">
            EVEN THE <span className="text-acid">PRO</span> WAS ONCE A <span className="text-acid">NOOB</span>.
          </h1>
          <p className="text-lg font-mono text-textMuted">
            Select a category below to initiate your learning sequence. // 0x1337
          </p>
        </div>

        {/* GRID */}
        <div id="categories" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 pt-8">
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
        <div id="latest" className="border-t border-white/10 pt-16" >
           <LatestArticleBox/>
        </div>

    </div>
  );
}
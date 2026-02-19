import { useLatestArticle } from "../hooks/useLatestArticles";
import ArticleListItem from "./ArticleListItem";

export default function LatestArticleBox() {
  const { data: latestArticles, isPending } = useLatestArticle();

  if (isPending) {
    // LOADING (Blinking cursor vibe)
    return (
        <div className="p-8 border border-white/10 border-l-4 border-l-acid bg-black"
        >
            <div className="font-mono text-acid animate-pulse">
                &gt; SEARCHING_DATABASE...
            </div>
        </div>
    );
  }

  const posts = latestArticles || [];

  return (
    // CONTAINER: Minimalist Industrial
    <div className="mt-16">
      
      {/* HEADER: Technical Label */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px bg-white/20 flex-grow"></div>
        <h2 className="text-xl font-mono font-bold text-white tracking-widest uppercase">
          <span className="text-acid mr-2">///</span> 
          FRESHLY MINTED!
        </h2>
        <div className="h-px bg-white/20 flex-grow"></div>
      </div>

      {/* THE GRID */}
 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <ArticleListItem
            key={post.postId}
            id={post.postId}
            title={post.title}
            description={post.description}
            slug={post.slug || ""}
          />
        ))}
      </div>
      
      {/* Empty State Handler */}
      {posts.length === 0 && (
          <div className="p-8 border border-white/10 border-l-4 border-l-red-500 bg-black font-mono text-gray-500">
              [!] NO_LOGS_FOUND
          </div>
      )}
    </div>
  );
}
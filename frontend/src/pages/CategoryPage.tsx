import { useParams } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import { API_BASE_URL } from "../config";
import { useQuery } from "@tanstack/react-query";

export interface LocalPostType {
  postId: string;
  title: string;
  category: string;
  description?: string;
  slug: string
}

const CategoryPage = () => {
  const params = useParams(); 

  const { isPending, error, data } = useQuery <LocalPostType[]>({
    queryKey: ['posts', params.category],
    queryFn: async() => {
      const response  = await fetch(`${API_BASE_URL}/posts?category=${params.category}`);
      if(!response.ok){
        throw new Error(`Server Error: ${response.status}`)
      }
      return await response.json()
    },
    staleTime: 1000 * 60 * 5 
  })

  if (isPending) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
         <div className="font-mono text-acid animate-pulse tracking-widest text-xl">
             &gt; LOADING_MODULE: {params.category?.toUpperCase()}...
         </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="border border-red-500/30 p-4 text-red-500 font-mono">
            [ERROR]: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-12">
        <div className="h-px bg-white/20 flex-grow"></div>
        <h1 className="text-2xl md:text-3xl font-mono font-bold text-white tracking-tight uppercase">
          <span className="text-acid mr-3">///</span> 
          CATEGORY_INDEX: <span className="text-acid">{params.category}</span>
        </h1>
        <div className="h-px bg-white/20 flex-grow"></div>
      </div>

      <ArticleList posts= {data || []} />
    </div>
  );
};

export default CategoryPage;
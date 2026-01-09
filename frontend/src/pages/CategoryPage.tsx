import { useParams } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import { API_BASE_URL } from "../config";

import { useQuery } from "@tanstack/react-query";


export interface LocalPostType {
  postId: string;
  title: string;
  slug?: string;
  description?: string //an idea of what the article is about (added later)
}

const CategoryPage = () => {
  const params = useParams(); //grabs the slug (eg /defi) to give to useeffect



//we have replaced the useEffect, usestate hooks with useQuery to do the same job faster - define posts, fetch from the backend and render as items inside a category in the frontend-
const { isPending, error, data } = useQuery <LocalPostType[]>({
  //the key (eg - posts: defi)
  queryKey: ['posts', params.category],
  
  //the fetcher fn - 
  queryFn: async() => {
    const response  = await fetch(`${API_BASE_URL}/posts?category=${params.category}`);

    if(!response.ok){
      throw new Error("network response error")
    }
    return await response.json()
  },

  staleTime: 1000 * 60 * 5 //keep data fresh for 5 mins, but cache it forever (no time there)

})

  if (isPending) {
    return (
      <div className="text-center mt-20 font-retro text-xl animate-pulse text-brand-primary">
      loading data...
      </div>
    )
  }

  if (error) {
    return <div>error loading data : {error.message}</div>;
  } else {
    return (
      //the categoryPage component will render the list components under <ArticleList posts = {categoryPost}/>

      <div className="  max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold ">CATEGORY: {params.category}</h1>
        <ArticleList posts= {data || []} />
      </div>
    );
  }
};

export default CategoryPage;

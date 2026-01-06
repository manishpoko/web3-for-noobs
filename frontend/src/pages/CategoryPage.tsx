import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import { API_BASE_URL } from "../config";

export interface LocalPostType {
  postId: string;
  title: string;
  slug?: string;
  description?: string //an idea of what the article is about (added later)
}

const CategoryPage = () => {
  const params = useParams(); //grabs the slug (eg /defi) to give to useeffect

  //need a posts variable to hold list of articles returned from API

  const [posts, setPosts] = useState<LocalPostType[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  //useeffect fires and runs the network call to fetch the "defi" category, and stores the data in categoryPost
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        //fetches the data from the backend via an api call-
        const response = await fetch(`${API_BASE_URL}/posts?category=${params.category}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch postss: ${response.status}`);
        }
        //response.ok returns true only when status is 200-300 range

        const categoryData = await response.json();
        console.log("📦 Data from Backend:", categoryData); // 👈 Add this line!
        setPosts(categoryData);
      } catch {
        console.error("error in fetching data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [params.category]);

  if (isLoading) {
    return <div>loading posts, pls waitt...</div>;
  } else {
    return (
      //the categoryPage component will render the list components under <ArticleList posts = {categoryPost}/>

      <div className="  max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold ">CATEGORY: {params.category}</h1>
        <ArticleList posts= {posts} />
      </div>
    );
  }
};

export default CategoryPage;

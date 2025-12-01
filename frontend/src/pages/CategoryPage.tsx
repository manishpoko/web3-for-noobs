import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface PostType {
  id: string;
  title: string;
  slug: string;
}

const CategoryPage = () => {
  const params = useParams(); //grabs the slug (eg /defi) to give to useeffect

  //need a posts variable to hold list of articles returned from API

  const [categoryPost, setCategoryPost] = useState<PostType[]>([]);

  //useeffect fires and runs the network call to fetch the "defi" category, and stores the data in categoryPost
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/posts?category=${params.category}`);
        const categoryData = await response.json();
        setCategoryPost(categoryData);
      } catch {
        console.error("error in fetching data");
      }
    };
    fetchData();
  }, [params.category]);

  return (
    //the categoryPage component will render the list components under <ArticleList posts = {categoryPost}/>

    
    <div className="  grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 mb-4 max-w-7xl mx-auto">
      <h1>related category posts</h1>
      <p>page category: {params.category}</p>
      <ul>
        {categoryPost.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;

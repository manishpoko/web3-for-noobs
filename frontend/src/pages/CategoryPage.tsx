import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface PostType {
    id: string,
    title: string,
    slug: string,

}


const CategoryPage = () => {
  const params = useParams();

  //need a posts variable to hold list of articles returned from API

  const [categoryPost, setCategoryPost] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/posts?category=${params.category}`);
        const categoryData = await response.json();
        setCategoryPost(categoryData);
      } catch {
        console.error("error in fetching data") ;
      }
    };
    fetchData();
  }, [params.category]);

  return (
    <div>
        <h1>related category posts</h1>
      <p>page category: {params.category}</p>
      <ul>{categoryPost.map((post) =>(
        <li key={post.id}>{post.title}</li>
      ))}</ul>
    </div>
  );
};

export default CategoryPage;

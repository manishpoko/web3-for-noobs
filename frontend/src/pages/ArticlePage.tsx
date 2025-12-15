import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { LocalPostType } from "./CategoryPage"; // Re-using your type

export default function ArticlePage() {
  const { article } = useParams(); // Matches path="post/:article" in App.tsx
  const [post, setPost] = useState<LocalPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // We use the ID from the URL to fetch from the backend
        const res = await fetch(`/api/posts/${article}`); 
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [article]);

  if (loading) return <div>Loading article...</div>;
  if (!post) return <div>Post not found!</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-8">Post ID: {post.postId}</p>
      {/* Assuming your backend returns 'content' */}
      <div className="prose lg:prose-xl">
        {/* We will handle the actual content rendering here */}
        <p>Content goes here...</p> 
      </div>
    </div>
  );
}
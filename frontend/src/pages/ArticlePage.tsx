import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


interface SinglePostType {
  postId: string;
  title: string;
  content: string;
  createdAt: string;
  author?: {
    username: string;
  };
}

export default function ArticlePage() {
  const { article } = useParams(); //grABS THE ID FROM THE URL

  const [post, setPost] = useState<SinglePostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${article}`);
        if (!res.ok) {
          throw new Error("post not found :(");
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError("could not load article");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (article) {
      fetchPost();
    }
  }, [article]);

  if (loading)
    return <div className="text-center p-10">Loading article...</div>;
  if (error)
    return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!post) return <div className="text-center p-10">Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      //header here//
      <div className="border-b pb-4 mb-6">
        <h1 className="texxt-4xl font-bold text-gray-900 nb-2">{post.title}</h1>
        <div className="flex items-center text-gray-500 text-sm">
          <span className="font-semibold text-indigo-600 mr-2">
            by {post.author?.username || "unknown author"}
          </span>
          <span className="">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      //content section//
      <div className="prose prose-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>
    </div>
  );
}

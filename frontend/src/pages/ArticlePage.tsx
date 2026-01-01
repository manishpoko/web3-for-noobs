import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import toast from "react-hot-toast";

interface SinglePostType {
  postId: string;
  title: string;
  content: string;
  createdAt: string;
  author?: {
    username: string;
  };
  authorId: string;
}

function getUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload)); //atob decodes the weird payload into readable message

    return decoded.userId;
  } catch (err) {
    return err;
  }
}

export default function ArticlePage() {
  const { article } = useParams(); //grABS THE ID FROM THE URL
  const navigate = useNavigate(); //for redirecting after delete

  const [post, setPost] = useState<SinglePostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentUserId = getUserIdFromToken(); //storing the current user id

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/posts/${article}`);
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

  //function to delete a post(only by the post author and not anyone else )
  const handleDelete = async () => {
    if (!confirm("are you sure you want to delete this post?")) return; //this means if the user doesnt confirm to delete post, returrn

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/posts/${post?.postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("post deleted!");
        navigate("/");
      } else {
        toast.error("failed to delete");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <div className="text-center p-10">Loading article...</div>;
  if (error)
    return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!post) return <div className="text-center p-10">Post not found.</div>;

  const isOwner = currentUserId === post.authorId; //returns true if currenUserId matches with the id of the author(from the backend)

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      //header here//
      <div className="border-b pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 nb-2">{post.title}</h1>
        <div className="flex items-center text-gray-500 text-sm">
          <span className="font-semibold text-indigo-600 mr-2">
            by {post.author?.username || "unknown author"}
          </span>
          <span className="">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      //shows only if isOwner is true(i.e. if the owner wants to edit or delete)
      {isOwner && (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/edit/${post.postId}`)}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 text-sm font-bold"
          >
            EDIT
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 text-sm font-bold"
          >
            DELETE
          </button>
        </div>
      )}
      //content section//
      <div className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML = {{ __html: post.content }}>
        
      </div>
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import { useQuery } from "@tanstack/react-query";

interface SinglePostType {
  postId: string;
  title: string;
  slug: string;
  category: string;
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
    const decoded = JSON.parse(atob(payload)); 
    return decoded.userId;
  } catch (err) {
    return err;
  }
}

export default function ArticlePage() {
  const { slug } = useParams(); 
  const navigate = useNavigate();
  const currentUserId = getUserIdFromToken(); 

  const { isPending, error, data } = useQuery<SinglePostType>({
    queryKey: ["post", slug],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/posts/${slug}`);
      if (!response.ok) {
        throw new Error("Article not found");
      }
      return await response.json();
    },
    retry: false,
  });

  if (isPending) {
    return (
      <div className="flex justify-center mt-20">
        <div className="text-acid animate-pulse font-mono text-xl tracking-widest">
          &gt; ACCESSING_DATABASE...
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-8 border border-red-500/50 bg-black text-red-500 font-mono text-center">
        [ERROR]: {error.message}
      </div>
    );
  }

  const post = data!;

  const handleDelete = async () => {
    if (!confirm("CONFIRM DELETION: This action cannot be undone.")) return; 

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/posts/${post?.postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("LOG_ENTRY_DELETED");
        navigate("/");
      } else {
        toast.error("DELETION_FAILED");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isOwner = currentUserId === post.authorId; 

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER SECTION */}
      <div className="border-b border-white/20 pb-8 mb-12">
        {/* Category Tag */}
        {post.category && (
           <div className="mb-6 flex">
             <span className="bg-acid text-black text-xs font-bold font-mono px-3 py-1 uppercase tracking-widest">
               /// {post.category}
             </span>
           </div>
        )}
        
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold font-mono text-white mb-8 leading-tight tracking-tight">
          {post.title}
        </h1>
        
        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-gray-400 border-l-2 border-acid pl-4">
          <div className="flex items-center gap-2">
            <span className="text-acid">AUTH:</span>
            <span className="text-white uppercase">{post.author?.username || "UNKNOWN"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-acid">DATE:</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* ADMIN ACTIONS */}
      {isOwner && (
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => navigate(`/edit/${post.postId}`)}
            className="px-6 py-2 bg-black border border-white/20 text-white font-mono text-sm hover:border-acid hover:text-acid transition-colors"
          >
            [ EDIT_LOG ]
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-black border border-red-500/50 text-red-500 font-mono text-sm hover:bg-red-500 hover:text-black transition-colors"
          >
            [ DELETE_LOG ]
          </button>
        </div>
      )}

      {/* CONTENT READER */}
      <div
        className="
          prose prose-lg prose-invert max-w-none
          
          /* TEXT BASE */
          font-sans text-gray-300 leading-relaxed
          
          /* HEADINGS */
          prose-headings:font-mono prose-headings:text-white prose-headings:uppercase prose-headings:tracking-tight
          
          /* LINKS (Acid Green) */
          prose-a:text-acid prose-a:no-underline hover:prose-a:underline
          
          /* CODE BLOCKS */
          prose-code:text-acid prose-code:font-mono prose-code:bg-white/5 prose-code:px-1 prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-black prose-pre:border prose-pre:border-white/10
          
          /* BLOCKQUOTES */
          prose-blockquote:border-l-acid prose-blockquote:bg-white/5 prose-blockquote:not-italic prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:text-gray-400
          
          /* IMAGES */
          prose-img:border prose-img:border-white/10 prose-img:rounded-none
          
          /* LISTS */
          prose-li:marker:text-acid
        "
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
      />
    </div>
  );
}
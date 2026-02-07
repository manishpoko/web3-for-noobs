import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import toast from "react-hot-toast";
import Editor from "../components/Editor";
import CategorySelectDropdown from "../components/CategorySelectDropdown";

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/posts/id/${id}`);
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        setDescription(data.description || "");
        setCategory(data.category);
      } catch  {
        toast.error("DATA_CORRUPTION_DETECTED");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, description, category }),
      });
      if (res.ok) {
        const updatedPost = await res.json();
        toast.success("DATABASE_UPDATED");
        navigate(`/post/${updatedPost.slug}`);
      } else {
        throw new Error();
      }
    } catch {
      toast.error("UPDATE_FAILED");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <div className="text-acid font-mono text-xl animate-pulse tracking-widest">
          &gt; RETRIEVING_ARCHIVES...
        </div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-8 mt-8 bg-black border border-white/20">
      
      {/* HEADER */}
      <div className="mb-8 border-b border-white/10 pb-4">
        <h1 className="text-3xl font-mono font-bold text-white uppercase tracking-tight">
          <span className="text-acid mr-3">::</span>
          MODIFY_LOG_ENTRY
        </h1>
      </div>

      <form onSubmit={handleUpdate} className="flex flex-col gap-6">
        
        {/* TITLE */}
        <div>
          <label className="block font-mono text-xs text-acid mb-2 tracking-widest">
            // TITLE
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black border border-white/20 p-3 text-white font-mono focus:border-acid focus:outline-none rounded-none transition-colors"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block font-mono text-xs text-acid mb-2 tracking-widest">
            // DESCRIPTION
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            rows={3}
            className="w-full bg-black border border-white/20 p-3 text-white font-mono focus:border-acid focus:outline-none rounded-none resize-none transition-colors"
          />
          <div className="text-right font-mono text-[10px] text-gray-500 mt-1">
            CAPACITY: {description.length}/200
          </div>
        </div>

        {/* CATEGORY */}
        <CategorySelectDropdown value={category} onChange={setCategory} />

        {/* EDITOR */}
        <div>
          <label className="block font-mono text-xs text-acid mb-2 tracking-widest">
            // CONTENT_BLOCK
          </label>
          <Editor content={content} onChange={setContent} editable={true} />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-4 border border-white/20 text-gray-400 font-mono text-sm hover:text-white hover:border-white transition-colors uppercase tracking-widest"
          >
            [ ABORT ]
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-[2] bg-acid text-black font-mono font-bold py-4 hover:bg-white transition-colors uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "OVERWRITING..." : "[ SAVE_CHANGES ]"}
          </button>
        </div>
      </form>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import toast from "react-hot-toast";
import Editor from "../components/Editor";
import CategorySelectDropdown from "../components/CategorySelectDropdown";

export default function CreatePostPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); 
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("defi"); // Default to defi or empty

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("AUTHENTICATION_REQUIRED");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          content: content,
          category: category, 
          description 
        }),
      });

      if (!response.ok) {
        const ErrData = await response.json();
        throw new Error(ErrData.message || "UPLOAD_FAILED");
      }

      const newCreatedPost = await response.json();
      toast.success("LOG_ENTRY_CREATED");
      navigate(`/post/${newCreatedPost.slug}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message); 
      } else {
        setError("UNKNOWN_SYSTEM_ERROR");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-black border border-white/20">
      
      <div className="mb-8 border-b border-white/10 pb-4">
          <h1 className="text-2xl font-mono font-bold text-white uppercase tracking-tight">
            <span className="text-acid mr-2">&gt;</span> 
            INITIATE_NEW_LOG
          </h1>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 text-red-500 p-4 mb-6 font-mono text-sm">
          [ERROR]: {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* TITLE INPUT */}
        <div>
          <label className="block text-xs font-bold text-acid mb-2 font-mono tracking-widest">
            // LOG_TITLE
          </label>
          <input
            type="text"
            required
            className="w-full p-3 bg-black text-white border border-white/20 rounded-none focus:border-acid focus:outline-none font-mono placeholder:text-gray-700 transition-colors"
            placeholder="ENTER_TITLE_HERE..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* DESCRIPTION INPUT */}
        <div>
          <label className="block text-xs font-bold text-acid mb-2 font-mono tracking-widest">
            // BRIEFING (MAX 200)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            rows={3}
            className="w-full p-3 bg-black text-white border border-white/20 rounded-none focus:border-acid focus:outline-none font-mono placeholder:text-gray-700 resize-none transition-colors"
            placeholder="ENTER_BRIEF_DESCRIPTION..."
          />
          <div className="text-right font-mono text-xs text-gray-600 mt-1">
            CHARS: {description.length}/200
          </div>
        </div>

        {/* CATEGORY SELECTOR */}
        <CategorySelectDropdown value={category} onChange={setCategory} />

        {/* MAIN EDITOR */}
        <div className="min-h-[400px]">
          <label className="block text-xs font-bold text-acid mb-2 font-mono tracking-widest">
             // MAIN_CONTENT
          </label>
          <Editor
            content={content}
            onChange={(html) => setContent(html)}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-6 border-t border-white/10">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-acid text-black font-mono font-bold py-4 hover:bg-white transition-colors disabled:bg-gray-800 disabled:text-gray-500 uppercase tracking-widest"
            >
              {isSubmitting ? "[ UPLOADING_DATA... ]" : "[ PUBLISH_LOG_ENTRY ]"}
            </button>
        </div>

      </form>
    </div>
  );
}
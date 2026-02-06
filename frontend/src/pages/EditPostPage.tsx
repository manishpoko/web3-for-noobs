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

  //fetch existing data (prefill the form)-
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`${API_BASE_URL}/posts/id/${id}`); //add additional /id in between to ensure no slugs gets captured and this goes through its distinct id route
      const data = await res.json();

      setTitle(data.title);
      setContent(data.content);
      setDescription(data.description || "");
      setLoading(false);
      setCategory(data.category);
    };
    fetchPost();
  }, [id]);

  //handle update (set PUT requests) - this triggers on clicking the "PUBLISH" button (not while editing)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); //start loading state

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content, //sends the updated html
          description,
          category, //just added
        }),
      });
      if (res.ok) {
        const updatedPost = await res.json();
        toast.success("post updated");
        navigate(`/post/${updatedPost.slug}`); // Changed from navigate(`/post/${id}`) to use the SLUG
      } else {
        toast.error("failed to update!");
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error("update failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-20 font-retro text-xl animate-pulse text-brand-primary">
        Loading existing data...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 py-8 ">
      <h1 className="text-4xl font-display text-brand-primary mb-8 text-center uppercase">
        edit post
      </h1>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block font-retro text-xs mb-2">title</label>
          <input
            type="text"
            value={title} //controlled by the state
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-4 border-black p-4 font-display text-xl focus:outline-none focus:bg-brand-peach"
            required
          />
        </div>
        <div>
          <label className="black font-retro text-xs mb-2">description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            rows={3}
            className="
          w-full border-4 border-black p-4 font-reading text-gray-800 focus:outline-none focus:bg-brand-peach resize-none
          "
            placeholder="describe your piece in a few words"
          />
          <div className="text-right font-retro text-[10px] text-gray-500 mt-1">
            {description.length}/200 chars
          </div>
        </div>

        <div>
          <CategorySelectDropdown value={category} onChange={setCategory} />
        </div>

        {/* editor stuff--- */}
        <div>
          <label className="block font-retro text-xs mb-2 ">content</label>
          <Editor content={content} onChange={setContent} editable={true} />
        </div>
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 font-retro text-xs py-4 border-4 border-black hover:bg-gray-100 transition-all"
          >
            cancel
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-[2] bg-brand-primary text-white font-retro py-4 border-4 border-black shadow-[4px_4px_0px_0px_black] hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 "
        >
          {isSubmitting ? "saving..." : "save changes"}
        </button>
      </form>
    </div>
  );
}

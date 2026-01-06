import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import toast from "react-hot-toast";
import Editor from "../components/Editor";

//import { useAuth } from "../context/AuthContext";
const CATEGORIES = [
  { label: "DeFi", value: "defi" },
  { label: "NFTs & Art", value: "nfts-art" },
  { label: "Security", value: "security-wallets" },
  { label: "DAOs", value: "daos-governance" },
  { label: "Layer 2s", value: "layer-2s" },
  { label: "Solana", value: "solana" },
];

//we will have a form field here that takes the input and creates a new post in the backend using this data

export default function CreatePostPage() {

    //const {token} = useAuth(); //connect to the global auth state (optional, may be useful in future)
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); //this will now hold html (instead of markdown)
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [category, setCategory] = useState(CATEGORIES[0].value) //default value

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("you must be logged in first!");
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
          slug: category, //the category tag (eg defi)
          description //latest addition!
        }),
      });

      if (!response.ok) {
        const ErrData = await response.json();
        throw new Error(ErrData.message || "failed to create post :( ");
      }

      const newCreatedPost = await response.json();


      toast.success("post creeeeated successfully!");
      navigate(`/post/${newCreatedPost.postId}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message); //for extra visibility
      } else {
        //for any other weird error fallback
        setError("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        write a new article
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        //title input//
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            TITLE
          </label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            placeholder="choose a cool title "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="">
          <label className="block font-retro text-xs mb-2">
            DESCRIPTION
          </label>
          <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
          rows={3}
          className=" w-full border-4 border-black p-4 font-reading text-gray-800 focus:outline-none focus:bg-brand-peach resize-none"
          placeholder="give an idea of what this is about"

          />
          {/* character-count helper */}
          <div className="text-right font-retro text-[10px] text-gray-500 mt-1">
            {description.length}
          </div>
        </div>

        //category type (dropdown)
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">CATEGORY
            </label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                        {cat.label}
                    </option>
                ))}


            </select>

        </div>

        //content input//
        <div className="min-h-[400px]">
          <Editor
          content={content}
          onChange = {(html) => setContent(html)}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isSubmitting ? "publishing, plsss wait :) " : "publish article"}
        </button>
      </form>
    </div>
  );
}

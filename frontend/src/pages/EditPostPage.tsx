import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import toast from "react-hot-toast";
import Editor from "../components/Editor";

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //fetch existing data (prefill the form)-
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`${API_BASE_URL}/posts/${id}`);
      const data = await res.json();

      setTitle(data.title);
      setContent(data.content);
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  //handle update (set PUT requests)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

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
        }),
      });
      if (res.ok) {
        toast.success("post updated");
        navigate(`/post/${id}`);
      } else {
        toast.error("failed to update!");
      }
    } catch (err) {
      if(err instanceof Error) {
      toast.error("update failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return <div className="p-10 text-white">Loading existing data...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6">edit post</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <div>
          <label className="font-bold">title</label>
          <input
            type="text"
            value={title} //controlled by the state
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border-rounded"
            required
          />
        </div>
        <div>
          <label className="font-bold ">content</label>
          <Editor content={content} onChange={setContent} editable={true} />
        </div>
        <div className="flex gap-4 self-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-gray-600 hover:text-black"
          >
            cancel
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white font-bold py-3 rounded-full hover:bg-gray-800 disabled:opacity-50"
        >
          {isSubmitting ? "saving..." : "save changes"}
        </button>
      </form>
    </div>
  );
}

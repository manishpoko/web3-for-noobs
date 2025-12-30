import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import toast from "react-hot-toast";

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

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
    const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      toast.success("post updated");
      navigate(`/post/${id}`);
    } else {
      toast.error("failed to update!");
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
          />
        </div>
        <div>
          <label className="font-bold ">content</label>
          <textarea
            rows={10}
            value={content} //controlled by state
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border-rounded"
          />
        </div>

        <button className="bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700">
          SAVE CHANGES
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

//we will have a form field here that takes the input and creates a new post in the backend using this data

export default function CreatePostPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          content: content,
          slug: title.toLowerCase().replace(/ /g, "-") + "-" + Date.now(),
        }),
      });

      if (!response.ok) {
        const ErrData = await response.json();
        throw new Error(ErrData.message || "failed to create post :/ ");
      }

      alert("post createed successfully!");
      navigate("/");
    } catch (err: any) {
      setError(err.message);
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
            placeholder="eg - my thoughts on the future of SOL"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        //content input//
        <div className="">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CONTENT
          </label>

          <textarea
            required
            rows={6}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            placeholder="write your thoughts here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        //temp. token input//
        <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
          <label className="text-xs block font-bold text-yellow-800 mb-1 uppercase">
            secret token (from postman)
          </label>
          <input
            type="password"
            required
            className="width-full p-2 text-sm border border-yellow-300 rounded"
            placeholder="place your long token here"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />

          <p className="text-xs text-yellow-700 mt-1">
            //this is needed because there is no login page yet
          </p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled: bg-gray-400"
        >
          {isSubmitting ? "publishing, plls wait :) " : "publish article"}
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router";

function CreatePostPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    cover: "",
    date: new Date().toISOString(),
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      setError("Title and Content are required!");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, date: new Date().toISOString() }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border border-purple-600 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium">
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="w-full border border-purple-600 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium">
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="w-full border border-purple-600 rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="cover" className="block text-sm font-medium">
            Cover URL:
          </label>
          <input
            type="text"
            id="cover"
            name="cover"
            value={formData.cover}
            onChange={handleInputChange}
            className="w-full border border-purple-600 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreatePostPage;

import { useState } from "react";
import { useNavigate } from "react-router";

function CreatePostPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    cover: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.author) {
      setError("Recipe Title, Content, and Author are required!");
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
          body: JSON.stringify({
            ...formData,
          }),
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
      <h1 className="text-2xl font-bold mb-4 text-emerald-800">
        Create a New Post
      </h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Recipe Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border border-emerald-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Recipe Content:
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="w-full min-h-96 border border-emerald-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
        </div>
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author Name:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="w-full border border-emerald-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div>
          <label
            htmlFor="cover"
            className="block text-sm font-medium text-gray-700"
          >
            Cover Image URL:
          </label>
          <input
            type="text"
            id="cover"
            name="cover"
            value={formData.cover}
            onChange={handleInputChange}
            className="w-full border border-emerald-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter image URL for recipe"
          />
        </div>
        <button
          type="submit"
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreatePostPage;

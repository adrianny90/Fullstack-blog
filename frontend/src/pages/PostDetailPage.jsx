import { Link, useParams, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { useFetchPostById } from "../utils/useFetchPost";
import { updatePost } from "../utils/updatePost";
import { deletePost } from "../utils/deletePost";

function PostDetailPage() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { data, load, error } = useFetchPostById(id);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (data) setEntry(data[0]);
  }, [data]);

  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const authorRef = useRef(null);

  useEffect(() => {
    if (entry) {
      handleInput(titleRef);
      handleInput(contentRef);
      handleInput(authorRef);
    }
  }, [entry?.title, entry?.content, entry?.author]);

  const handleInput = (ref) => {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  if (load || !entry)
    return <div className="p-6 text-gray-700">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error! {error}</div>;

  const handleUpdate = async () => {
    setEditMode(!editMode);
    try {
      await updatePost({
        ...entry,
      });
      setSuccessMessage("Recipe successfully updated!");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (err) {
      setErrorMessage("Failed to update recipe: " + err.message);
    }
  };

  const handleDelete = async () => {
    setEditMode(false);
    document.getElementById("my_modal_2").close();

    try {
      const result = await deletePost(entry);
      if (result.error) {
        setErrorMessage("Failed to delete recipe: " + result.error);
      } else {
        setSuccessMessage("Recipe successfully deleted!");
        setTimeout(() => navigate("/"), 3000);
      }
    } catch (error) {
      setErrorMessage("Failed to delete recipe: " + error.message);
    }
  };

  return (
    <div className="post-detail-page p-6 max-w-xl mx-auto">
      {successMessage && (
        <div className="bg-emerald-100 text-emerald-800 p-4 rounded-lg mb-4 flex justify-between items-center">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4 flex justify-between items-center">
          {errorMessage}
        </div>
      )}

      <div key={entry.id} className="space-y-4">
        <img
          src={entry.cover}
          alt="Recipe Cover"
          className="w-full h-96 object-contain rounded-lg"
        />
        <textarea
          ref={titleRef}
          rows="1"
          disabled={!editMode}
          value={entry.title}
          onChange={(e) => setEntry({ ...entry, title: e.target.value })}
          className={`w-full border text-center text-xl rounded-lg px-3 py-2 font-bold  ${
            editMode
              ? "border-emerald-500 focus:ring-2 focus:ring-emerald-400"
              : "border-gray-300"
          } focus:outline-none`}
        />
        <div className="flex gap-4 items-center">
          <span className="py-2 px-3 text-gray-700 font-medium">Author:</span>
          <textarea
            ref={authorRef}
            rows="1"
            disabled={!editMode}
            value={entry.author}
            onChange={(e) => setEntry({ ...entry, author: e.target.value })}
            className={`w-full text-left  border rounded-lg px-3 py-2 ${
              editMode
                ? "border-emerald-500 focus:ring-2 focus:ring-emerald-400"
                : "border-gray-300"
            } focus:outline-none`}
          />
        </div>

        <textarea
          ref={contentRef}
          rows="1"
          disabled={!editMode}
          value={entry.content || ""}
          onChange={(e) => setEntry({ ...entry, content: e.target.value })}
          className={`w-full border rounded-lg px-3 py-2 ${
            editMode
              ? "border-emerald-500 focus:ring-2 focus:ring-emerald-400"
              : "border-gray-300"
          } focus:outline-none`}
        />
      </div>

      <div className="flex justify-between items-center mt-6">
        <Link to="/" className="text-emerald-600 hover:underline font-medium">
          Go Back
        </Link>
        <div className="flex gap-4">
          {editMode === false ? (
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors duration-200"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => handleUpdate()}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors duration-200"
            >
              Save
            </button>
          )}
          <button
            onClick={() => document.getElementById("my_modal_2").showModal()}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>

      <dialog id="my_modal_2" className="modal">
        <form
          method="dialog"
          className="modal-box fixed inset-0 flex items-center justify-center"
        >
          <div className="bg-gray-50 rounded-lg shadow-lg p-6 w-96">
            <h3 className="font-bold text-lg text-center text-emerald-800">
              WARNING
            </h3>
            <p className="py-4 text-center text-gray-700">
              Do you really want to delete this recipe?
            </p>
            <div className="modal-action mt-4 flex justify-center gap-6">
              <button
                onClick={() => handleDelete()}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Yes, DELETE
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                onClick={() => document.getElementById("my_modal_2").close()}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default PostDetailPage;

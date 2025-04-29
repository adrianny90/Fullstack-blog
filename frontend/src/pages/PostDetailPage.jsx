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

  const navigate = useNavigate();

  useEffect(() => {
    if (data) setEntry(data[0]);
  }, [data]);

  // Making Textarea grow
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const authorRef = useRef(null);

  useEffect(() => {
    if (entry) {
      handleInput(titleRef);
      handleInput(contentRef);
    }
  }, [entry?.title, entry?.content]);

  const handleInput = (ref) => {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  if (load || !entry) return <div>Loading...</div>;
  if (error) return <div>Error! {error}</div>;

  const handleUpdate = async () => {
    setEditMode(!editMode);

    await updatePost(entry);
    setSuccessMessage("Entry successfully updated!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  const handleDelete = async () => {
    setEditMode(false);
    document.getElementById("my_modal_2").close();

    try {
      const result = await deletePost(entry);

      if (result.error) {
        console.error("Error:", result.error);
      } else {
        setSuccessMessage("Entry successfully deleted!");
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="post-detail-page p-6 max-w-xl mx-auto overflow-y-scroll-auto">
      {successMessage && (
        <div className="bg-purple-200 text-red-800 p-4 rounded mb-4 flex justify-between items-center">
          {successMessage}
        </div>
      )}

      <div key={entry.id} className="space-y-4">
        <img
          src={entry.cover}
          alt="Post Cover"
          className="w-full h-96 object-contain rounded"
        />
        <textarea
          ref={titleRef}
          rows="1"
          disabled={!editMode}
          value={entry.title}
          onChange={(e) => setEntry({ ...entry, title: e.target.value })}
          className={`w-full border rounded px-3 py-2 my-0 font-bold text-xl ${
            editMode ? "border-blue-500" : "border-gray-300"
          }`}
        />
        <div className="flex gap-4">
          {" "}
          <span className="py-2 px-3">Author:</span>
          <textarea
            ref={authorRef}
            rows="1"
            disabled={!editMode}
            value={entry.author}
            onChange={(e) => setEntry({ ...entry, author: e.target.value })}
            className={`w-full border rounded px-3 py-2 my-0 ${
              editMode ? "border-blue-500" : "border-gray-300"
            }`}
          />
        </div>
        <textarea
          ref={contentRef}
          rows="1"
          disabled={!editMode}
          value={entry.content || ""}
          onChange={(e) => setEntry({ ...entry, content: e.target.value })}
          className={`w-full border rounded px-3 py-2 ${
            editMode ? "border-blue-500" : "border-gray-300"
          }`}
        />
        <textarea
          disabled={true}
          value={new Date(entry.date).toLocaleDateString("de-DE")}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
        />
      </div>

      {/* Buttons Section */}
      <div className="flex justify-between items-center mt-6">
        <Link to="/" className="text-blue-500 hover:underline font-medium">
          Go Back
        </Link>
        <div className="flex gap-4">
          {editMode === false ? (
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => handleUpdate()}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          )}

          <button
            onClick={() => document.getElementById("my_modal_2").showModal()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {/* MODAL */}
      <dialog id="my_modal_2" className="modal">
        <form
          method="dialog"
          className="modal-box fixed inset-0 flex items-center justify-center"
        >
          <div className="bg-purple-200  rounded-lg shadow-lg p-6 w-96">
            <h3 className="font-bold text-lg text-center">WARNING</h3>
            <p className="py-4 text-center">
              Do you really want to delete this entry?
            </p>

            <div className="modal-action mt-4 flex justify-center gap-6">
              <button
                onClick={() => handleDelete()}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, DELETE
              </button>
              {/* <form method="dialog"> */}
              <button className="btn bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                Close
              </button>
              {/* </form> */}
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
}
export default PostDetailPage;

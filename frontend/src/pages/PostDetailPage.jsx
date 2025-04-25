import { Link, useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useFetchPostById } from "../utils/useFetchPost";
import { demoData } from "../utils/demodata";
import { updatePost } from "../utils/updatePost";
import { deletePost } from "../utils/deletePost";

function PostDetailPage() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { data, load, error } = useFetchPostById(id);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) setEntry(data[0]);
  }, [data]);

  if (load || !entry) return <div>Loading...</div>;
  if (error) return <div>Error! {error}</div>;

  const handleUpdate = async () => {
    setEditMode(!editMode);

    await updatePost(entry);
  };

  const handleDelete = async () => {
    setEditMode(false);
    document.getElementById("my_modal_2").close();

    try {
      const result = await deletePost(entry);

      if (result.error) {
        console.error("Error:", result.error);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="post-detail-page">
      <div className="flex justify-between">
        <Link to="/">Go Back</Link>
        <div className="flex gap-2">
          {editMode === false ? (
            <button onClick={() => setEditMode(!editMode)}>Edit</button>
          ) : (
            <button onClick={() => handleUpdate()}>Save</button>
          )}

          <button
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            Delete
          </button>
        </div>
      </div>
      <div key={entry.id}>
        <img src={entry.cover}></img>
        <textarea
          disabled={!editMode}
          value={entry.title}
          onChange={(e) => setEntry({ ...entry, title: e.target.value })}
        />
        <textarea
          disabled={!editMode}
          value={entry.author}
          onChange={(e) => setEntry({ ...entry, author: e.target.value })}
        />
        <textarea
          disabled={!editMode}
          value={entry.content || ""}
          onChange={(e) => setEntry({ ...entry, content: e.target.value })}
        />
        <textarea disabled={true} value={entry.date} />
      </div>

      {/* MODAL */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">WARNING</h3>
          <p className="py-4">Do you really want to delete this entry?</p>
          <button onClick={() => handleDelete()}>Yes, DELETE</button>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
export default PostDetailPage;

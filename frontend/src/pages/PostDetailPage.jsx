import { Link, useParams } from "react-router";

function PostDetailPage() {
  const { id } = useParams();

  return (
    <div className="post-detail-page">
      <h1>Post Detail Page</h1>
      <p>This is the post detail page.</p>
      {/* You can add more details about the post here */}
    </div>
  );
}
export default PostDetailPage;

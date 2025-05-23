import "./App.css";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PostDetailPage from "./pages/PostDetailPage";
import CreatePostPage from "./pages/CreatePostPage";

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/posts" element={<CreatePostPage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

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
          {/* 
          Parent route with Layout component
          All child routes will be rendered inside the Layout's <Outlet>
        */}
          <Route path="/" element={<Layout />}>
            {/* Index route (homepage) */}
            <Route index element={<Home />} />

            {/* Static routes */}
            <Route path="/posts" element={<CreatePostPage />} />

            {/* Dynamic route with URL parameter */}
            <Route path="/posts/:id" element={<PostDetailPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

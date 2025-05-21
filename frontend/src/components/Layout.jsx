import { Link, Outlet } from "react-router";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-purple-800 text-white p-4">
        <Link to="/" className="">
          <h1 className="text-2xl">My Fullstack Blog</h1>
        </Link>
      </header>
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <footer className="bg-purple-800 text-white p-4 text-center mt-auto">
        &copy; 2025 My Blog
      </footer>
    </div>
  );
}
export default Layout;

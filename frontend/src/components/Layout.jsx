import { Link, Outlet } from "react-router";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-emerald-600 text-white p-4">
        <Link to="/" className="">
          <h1 className="text-2xl font-serif">My Culinary Blog</h1>
        </Link>
      </header>
      <main className="flex-grow p-6 bg-gray-50">
        <Outlet />
      </main>
      <footer className="bg-emerald-700 text-white p-4 text-center mt-auto">
        © 2025 My Culinary Blog
      </footer>
    </div>
  );
}
export default Layout;

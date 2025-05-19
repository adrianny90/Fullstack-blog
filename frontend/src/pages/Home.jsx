import { useFetchPosts } from "../utils/useFetchPost";
import { Link, useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const { data, load, error } = useFetchPosts();
  if (load) return <div>Loading...</div>;
  if (error) return <div>Error! {error}</div>;
  const handleCreateEntry = () => {
    navigate("/posts");
  };

  return (
    <>
      <div className="text-gray-600 mb-4">
        <button
          onClick={handleCreateEntry}
          className="flex justify-items-end bg-purple-500 text-white px-3 py-3 rounded hover:bg-purple-800"
        >
          <img
            src="https://img.freepik.com/iconos-gratis/hospital_318-502960.jpg"
            alt="Create entry"
            className="w-7 h-7 mr-2"
          />
          New Entry
        </button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_300px)] justify-center gap-6">
        {data
          .slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((e) => (
            <Link key={e.id} to={`/posts/${e.id}`}>
              <div className="flex flex-col gap-2 bg-amber-50 rounded-xl px-4 py-3 shadow-md h-full hover:shadow-purple-800 transition-shadow duration-300">
                <div className=" ">
                  <img
                    src={e.cover}
                    className="w-full object-contain object-center rounded-b-sm mb-3 h-[30vh]"
                  ></img>
                </div>
                <p className="font-bold">{e.title}</p>
                <p className="text-gray-600">{e.author}</p>
                <p className="text-sm">
                  {e.content.slice(0, 45)}
                  {e.content.length > 45 ? "..." : null}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(e.date).toLocaleDateString("de-DE")}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Home;

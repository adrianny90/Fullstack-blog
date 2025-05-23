import { useFetchPosts } from "../utils/useFetchPost";
import { Link, useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const { data, load, error } = useFetchPosts();
  if (load)
    return (
      <>
        <div>Loading...</div>
        <div>
          <p className="m-3">
            If it takes so long, please refresh service using below button
          </p>
          <p></p>
          <div>
            <a
              className="bg-blue-400 m-21 p-22 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors duration-200"
              href="https://fullstack-blog-m0xr.onrender.com"
              target="_blank"
            >
              Click here
            </a>
          </div>
        </div>
      </>
    );
  if (error) return <div>Error! {error}</div>;
  const handleCreateEntry = () => {
    navigate("/posts");
  };

  return (
    <>
      <div className="text-gray-600 mb-4">
        <button
          onClick={handleCreateEntry}
          className="flex justify-end bg-emerald-500 text-white px-3 py-3 rounded-lg hover:bg-emerald-600 transition-colors duration-200"
        >
          <img
            src="https://img.freepik.com/iconos-gratis/hospital_318-502960.jpg"
            alt="Create entry"
            className="w-7 h-7 mr-2"
          />
          Create Entry
        </button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_300px)] justify-center gap-6">
        {data
          .slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((e) => (
            <Link key={e.id} to={`/posts/${e.id}`}>
              <div className="flex flex-col gap-2 bg-emerald-50 rounded-xl px-4 py-3 shadow-md h-full hover:shadow-emerald-800 transition-shadow duration-300">
                <div className=" ">
                  <img
                    src={e.cover}
                    className="w-full object-contain object-center rounded-b-sm mb-3 h-[30vh]"
                    alt="Recipe Cover"
                  ></img>
                </div>
                <p className="font-bold text-2xl text-center">{e.title}</p>
                <p className="text-gray-600 text-center">{e.author}</p>
                <p className="text-sm text-left">
                  {e.content.slice(0, 120)}
                  {e.content.length > 120 ? "..." : null}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Home;

import { useState, useEffect } from "react";
import { useFetchPosts } from "../utils/useFetchPost";
import { Link } from "react-router";
import { demoData } from "../utils/demodata";

const Home = () => {
  const [posts, setPosts] = useState([]);

  // const {data, load, error} = useFetchPosts()
  // if (load) return <div>Loading...</div>;
  // if (error) return <div>Error! {error}</div>;
  useEffect(() => {
    setPosts(demoData);
  }, []);

  return (
    <>
      <p>HOMEPAGE</p>
      {console.log(posts)}
      <div className="grid grid-cols-3 gap-4">
        {posts.map((e) => (
          <Link key={e.id} to={`/posts/${e.id}`}>
            <div className="bg-amber-50 rounded-xl">
              <p>{e.title}</p>
              <p>{e.author}</p>
              <p>
                {e.content.slice(0, 45)}
                {e.content.length > 45 ? "..." : null}
              </p>
              <p>{e.date}</p>
              <img src={e.cover}></img>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;

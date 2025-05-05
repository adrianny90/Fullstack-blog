import { useState, useEffect } from "react";

export const useFetchPosts = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const url = "/posts";
      try {
        setLoad(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status:  ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        setData(json);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoad(false);
      }
    };

    fetchPosts();
  }, []);

  return { data, load, error };
};

export const useFetchPostById = (id) => {
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostById = async () => {
      const url = `/posts/${id}`;
      try {
        setLoad(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status:  ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        setData(json);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoad(false);
      }
    };

    fetchPostById();
  }, [id]);

  return { data, load, error };
};

import { useState, useEffect } from "react";

export const fetchPosts = async () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);

  const url = "http://localhost:3000";
  try {
    setLoad(true);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status:  ${response.status}`);
    }
    const json = await response.json;
    console.log(json);
    setData(json);
  } catch (error) {
    console.error(error.message);
    setError(error.message);
  } finally {
    setLoad(false);
  }

  return { data, load, error };
};

export const fetchPostById = async ({ id }) => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);

  const url = `http://localhost:3000/${id}`;
  try {
    setLoad(true);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status:  ${response.status}`);
    }
    const json = await response.json;
    console.log(json);
    setData(json);
  } catch (error) {
    console.error(error.message);
    setError(error.message);
  } finally {
    setLoad(false);
  }

  return { data, load, error };
};

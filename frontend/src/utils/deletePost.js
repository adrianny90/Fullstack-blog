export const deletePost = async (entry) => {
  const url = `http://localhost:3000/posts/${entry.id}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status:  ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
};

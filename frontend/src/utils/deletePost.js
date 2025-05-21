export const deletePost = async (entry) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/posts/${entry.id}`;

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

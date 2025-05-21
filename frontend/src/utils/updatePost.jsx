export const updatePost = async (entry) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/posts/${entry.id}`;

  if (!entry) {
    console.error("Entry is undefined!");
    return { error: "Entry is undefined" };
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: entry.id,
        author: entry.author,
        title: entry.title,
        content: entry.content,
        cover: entry.cover,
        date: entry.date,
      }),
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

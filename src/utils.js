export const getTodos = async () => {
  try {
    const url = new URL(import.meta.env.VITE_LOCAL_DJANGO_URL);
    const accesKey = import.meta.env.VITE_ACCESS_KEY;
    const options = {
      headers: {
        Authorization: `Bearer ${accesKey}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('getTodos error', error);
    return [];
  }
};

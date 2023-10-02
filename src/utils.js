export const getTodos = async () => {
  try {
    const url = new URL(import.meta.env.VITE_LOCAL_DJANGO_URL);
    const accesKey = import.meta.env.VITE_ACCESS_KEY;
    const options = {
      headers: {
        Authorization: `Bearer ${accesKey}`,
        Origin: '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'My Client',
      },
    };
    const response = await fetch(url, options);
    // fetch('https://jsonplaceholder.typicode.com/posts/1', {
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     id: 1,
    //     title: 'foo',
    //     body: 'bar',
    //     userId: 1,
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('getTodos error', error);
    return [];
  }
};

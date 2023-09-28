export const getTodos = async () => {
  try {
    const url = 'http://127.0.0.1:8000/api/todos/';
    const accesKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2Mzk5NzU1LCJpYXQiOjE2OTU3MTE1NDQsImp0aSI6ImZlODZjOGYzZTI0MTQ1Zjc4MDFhN2M1N2JiYTJjMTc5IiwidXNlcl9pZCI6MX0.YHpZcNs_powC4edo1QNzcMu6lOLQxL3Z5uxaFlfl2Qc';
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

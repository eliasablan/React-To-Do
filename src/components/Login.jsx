import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <form
      className="text-center col-span-2 m-14 md:col-span-1 md:text-left"
      onSubmit={handleSubmit}
    >
      <h2 className="py-3 text-3xl font-semibold">Login</h2>
      <p className="py-3">
        <input
          value={username}
          type="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </p>
      <p className="py-3">
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </p>
      <p className="py-3">
        <button>Login</button>
      </p>
    </form>
  );
};

export { LoginForm };

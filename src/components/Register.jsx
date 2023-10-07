import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    register(username, email, password);
  };

  return (
    <form
      className="text-center col-span-2 m-14 md:col-span-1 md:text-left"
      onSubmit={handleSubmit}
    >
      <h2 className="py-3 text-3xl font-semibold"> or Register</h2>
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
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button>Register</button>
      </p>
    </form>
  );
};

export { RegisterForm };

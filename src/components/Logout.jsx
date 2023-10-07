import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="text-right m-5">
      <button className="py-1 px-2 text-lg" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export { LogoutButton };

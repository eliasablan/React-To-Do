import { useEffect, createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

const auth_url = import.meta.env.VITE_AUTH_URL;
const users_url = import.meta.env.VITE_USERS_URL;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    // Carga los tokens del localStorage
    const localAccess = localStorage.getItem('ACCESS_V1');
    const localRefresh = localStorage.getItem('REFRESH_V1');
    const localUsername = localStorage.getItem('USERNAME_V1');

    if (localUsername) {
      setIsAuthenticated(true);
      setUsername(localUsername);
      setAccessToken(localAccess);
      setRefreshToken(localRefresh);
    }
  }, []);

  const login = async (username, password) => {
    setIsAuthLoading(true);
    // Realiza la solicitud POST para generar los tokens de acceso y refresh
    const options = {
      method: 'POST',
      headers: {
        Origin: '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch(auth_url, options);

    // Verifica el estado de la respuesta
    if (!response.ok) {
      alert('Credentials Error');
      console.log('login error response', response);
    } else {
      // Parsea los tokens de la respuesta
      const { access, refresh } = await response.json();

      // Actualiza los estados
      setIsAuthenticated(true);
      setUsername(username);
      localStorage.setItem('USERNAME_V1', username);
      setAccessToken(access);
      localStorage.setItem('ACCESS_V1', access);
      setRefreshToken(refresh);
      localStorage.setItem('REFRESH_V1', refresh);
    }
    setIsAuthLoading(false);
  };

  const register = async (username, email, password) => {
    setIsAuthLoading(true);
    // Realiza la solicitud POST para crear el usuario
    const options = {
      method: 'POST',
      headers: {
        Origin: '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    };
    const response = await fetch(new URL('create/', users_url), options);

    // Verifica el estado de la respuesta
    if (response.ok) {
      // Muestra un mensaje de exito
      alert('Usuario creado con exito');
    } else {
      // Muestra un mensaje de error
      alert('Ocurrió un error al crear el usuario');
      console.log('register error response', response);
    }
    setIsAuthLoading(false);
  };

  const refreshAccessToken = async () => {
    setIsAuthLoading(true);
    // Realiza la solicitud POST para refrescar el token de acceso
    const response = await fetch(new URL('refresh/', auth_url), {
      method: 'POST',
      headers: {
        Origin: '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    // Verifica el estado de la respuesta
    if (response.status == 401) {
      alert('Refresh tokens expired');
      logout();
    } else {
      const responseJson = await response.json();
      setAccessToken(responseJson.access);
      localStorage.setItem('ACCESS_V1', responseJson.access);
    }
    setIsAuthLoading(false);
  };

  const logout = () => {
    // Elimina los tokens del localStorage
    localStorage.removeItem('USERNAME_V1');
    localStorage.removeItem('ACCESS_V1');
    localStorage.removeItem('ACCESS_EXPIRATION_V1');
    localStorage.removeItem('REFRESH_V1');
    localStorage.removeItem('REFRESH_EXP_V1');
    
    // Actualiza los estados
    setIsAuthenticated(false);
    setUsername(null);
    setAccessToken(null);
    setRefreshToken(null);
    // redirect('/');
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
        isAuthenticated,
        isAuthLoading,
        accessToken,
        refreshToken,
        login,
        register,
        refreshAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export { AuthContext, AuthProvider };

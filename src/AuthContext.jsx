import { useEffect, createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

const auth_url = import.meta.env.VITE_AUTH_URL;
const users_url = import.meta.env.VITE_USERS_URL;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  useEffect(() => {
    // Carga los tokens del localStorage
    const tokens = localStorage.getItem('authTokens');
    if (tokens) {
      console.log('tokens useeffect', tokens);
      const { access, refresh } = JSON.parse(tokens);
      console.log('accessToken useeffect', access);
      setIsAuthenticated(true);
      setAccessToken(access);
      setRefreshToken(refresh);
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
    if (response.ok) {
      // Parsea los tokens de la respuesta
      const { access, refresh } = await response.json();
      console.log('access Token', access);
      console.log('refresh Token', refresh);

      // Guarda los tokens en el localStorage
      localStorage.setItem(
        'authTokens',
        JSON.stringify({ access, refresh }),
      );

      // Actualiza los estados
      setIsAuthenticated(true);
      setAccessToken(access);
      setRefreshToken(refresh);
    }
    setIsAuthLoading(false);
  };

  const register = async (username, email, password) => {
    setIsAuthLoading(true);
    // Realiza la solicitud POST para crear el usuario
    console.log('{ username, email, password }', {
      username,
      email,
      password,
    });
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
      const { username } = await response.json();
      setUsername(username);
    } else {
      console.log('error response', response);
      // Muestra un mensaje de error
      alert('Ocurrió un error al crear el usuario');
    }
    setIsAuthLoading(false);
  };

  const refreshAccessToken = async () => {
    // Realiza la solicitud POST para refrescar el token de acceso
    const response = await fetch(auth_url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    });

    // Verifica el estado de la respuesta
    if (response.status === 200) {
      // Parsea el nuevo token de acceso de la respuesta
      const accessToken = await response.json();

      // Actualiza el estado
      setAccessToken(accessToken);
    }
  };

  const logout = () => {
    // Elimina los tokens del localStorage
    localStorage.removeItem('authTokens');

    // Actualiza los estados
    setIsAuthenticated(false);
    setAccessToken(null);
    setRefreshToken(null);
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
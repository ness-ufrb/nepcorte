import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const login = (token, refreshToken, user) => {
    setToken(token);
    setRefreshToken(refreshToken);
    setUser(user);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('/api/user/token/refresh/', {
        refresh: refreshToken,
      });
      const newToken = response.data.access;
      setToken(newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      console.log('Token atualizado com sucesso');
    } catch (e) {
      console.log('Erro ao atualizar o token', e);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, refreshToken, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import api from '../services/api';

interface User {
  id: string;
  avatar_url: string;
  name: string;
}
interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
  profileType: string;
  domain: string;
  uniqueId: string;
}

interface AuthContextData {
  token: string;
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password, profileType, domain, uniqueId }) => {
      const response = await api.post('/v1/account/login', {
        email,
        password,
        profileType,
        domain,
        uniqueId,
      });

      const { token, user } = response.data;

      localStorage.setItem('@GoBarber:token', token);

      localStorage.setItem('@GoBarber:user', JSON.stringify(user));
      

      var nomeDaVariavel: User = { avatar_url : 'https://xesque.rocketseat.dev/users/avatar/profile-d3da56a2-02d3-4f54-aa7c-0e447b40eb48.jpg', id: "16", name:"Roberto"};

      setData({ token: token, user: nomeDaVariavel });
    },
    [],
  );

  

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');
    setData({} as AuthState);
  }, [data]);

  return (
    <AuthContext.Provider
      value={{ token: data.token, user: data.user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };

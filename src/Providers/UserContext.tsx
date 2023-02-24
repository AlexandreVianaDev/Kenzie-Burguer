import { AxiosError } from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface iUserContextProps {
  children: ReactNode;
}

interface iUser {
  email: string;
  name: string;
  id?: number;
}

export interface iUserLogin {
  email: string;
  password: string;
}

export interface iUserRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface iUserResponse {
  accessToken: string;
  user: iUser;
}

export interface iRequestError {
  error: string;
  response: iRequestErrorResponse | undefined;
}

export interface iRequestErrorResponse {
  data: string | undefined;
}

interface iUserContext {
  userLogin: (props: iUserLogin) => void;
  userRegister: (props: iUserRegister) => void;
  userLogout: () => void;
  user: iUser | undefined | null;
  token: string | undefined | null;
}

export const UserContext = createContext<iUserContext>({} as iUserContext);

export const UserProvider = ({ children }: iUserContextProps) => {
  const [user, setUser] = useState<iUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

  // AUTOLOGIN
  useEffect(() => {
    const tokenLS = localStorage.getItem('@TOKEN');
    setToken(tokenLS);
    if (tokenLS) {
      navigate('/shop');
    }
  }, []);

  const userLogin = async (data: iUserLogin) => {
    try {
      const response = await api.post<iUserResponse>('/login', data);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      setToken(response.data.accessToken);
      navigate('/shop');
    } catch (error) {
      const currentError = error as AxiosError<iRequestError>;
      console.log(currentError.response?.data);
    }
  };

  const userRegister = async (data: iUserRegister) => {
    try {
      await api.post<iUserResponse>('/users', data);
      navigate('/');
    } catch (error) {
      const currentError = error as AxiosError<iRequestError>;
      console.log(currentError.response?.data);
    }
  };

  const userLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{
        userLogin,
        userRegister,
        userLogout,
        user,
        token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

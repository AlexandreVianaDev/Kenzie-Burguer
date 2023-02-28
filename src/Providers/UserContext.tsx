/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
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
  userLogin: (props: iUserLogin) => Promise<void>;
  userRegister: (props: iUserRegister) => Promise<void>;
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
    const userId = localStorage.getItem('@USERID');
    setToken(tokenLS);
    if (userId) {
      try {
        const autoLogin = async () => {
          const response = await api.get<iUser>(`/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${tokenLS}`,
            },
          });
          setUser(response.data);
        };
        navigate('/shop');
      } catch (error) {
        const currentError = error as AxiosError<iRequestError>;
        console.log(currentError.response?.data);
      }
    }
  }, []);

  const userLogin = async (data: iUserLogin) => {
    try {
      const response = await api.post<iUserResponse>('/login', data);
      localStorage.setItem('@USERID', JSON.stringify(response.data.user.id));
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

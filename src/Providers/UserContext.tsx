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

interface iUserResponse{
    accessToken: string
    user: iUser;
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
    // const userAutoLogin = async () => {
    //   try {
    //     const response = await api.get(`/login`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     setUser(await response.data.user);

    // window.location.pathname !== "/shop"
    // ? navigate("/shop")
    // : null;
    // }
    // catch (error) {
    //   console.log(error)
    //   localStorage.clear();
    // }
    // };
    // userAutoLogin();
    // }
  }, []);

  const userLogin = async (data: iUserLogin) => {
    try {
      const response = await api.post<iUserResponse>('/login', data);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      setToken(response.data.accessToken);
      navigate('/shop');
    } catch (error) {
      // console.log(error);
    }
  };

  const userRegister = async (data: iUserRegister) => {
    try {
      const response = await api.post<iUserResponse>('/users', data);
      navigate('/');
    } catch (error) {
      // console.log(error);
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

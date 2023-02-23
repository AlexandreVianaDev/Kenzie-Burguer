import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface iUserContextProps {
  children: ReactNode;
}

interface iUser {
  email: string;
  name: string;
  id: number;
}

interface iUserContext {
  userLogin: (data: any) => void;
  userRegister: (data: any) => void;
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

  const userLogin = async (data) => {
    try {
      const response = await api.post('/login', data);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      setToken(response.data.accessToken);
      navigate('/shop');
    } catch (error) {
      // console.log(error);
    }
  };

  const userRegister = async (data) => {
    try {
      const response = await api.post('/users', data);
      navigate('/');
      return response;
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

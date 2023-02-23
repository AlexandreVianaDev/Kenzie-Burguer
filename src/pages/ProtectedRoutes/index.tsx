import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../Providers/UserContext';

const ProtectedRoutes = () => {
  const tokenLS: string | null = localStorage.getItem('@TOKEN');

  const { token } = useContext(UserContext);

  return <>{token || tokenLS ? <Outlet /> : <Navigate to='/' />}</>;
};

export default ProtectedRoutes;

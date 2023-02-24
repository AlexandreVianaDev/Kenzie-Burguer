import { ReactNode } from 'react';
import { CartProvider } from './CartContext';
import { UserProvider } from './UserContext';

interface iChildren {
  children: ReactNode;
}

const Providers = ({ children }: iChildren) => (
  <UserProvider>
    <CartProvider>{children}</CartProvider>
  </UserProvider>
);

export default Providers;

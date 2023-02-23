import { CartProvider } from './CartContext';
import { UserProvider } from './UserContext';

const Providers = ({ children }) => (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  );


export default Providers;

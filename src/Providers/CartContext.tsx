import { AxiosError } from 'axios';
import { createContext, ReactNode, useState } from 'react';
import { iRequestError } from './UserContext';
import api from '../services/api';

interface iCartContextProps {
  children: ReactNode;
}

export interface iProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface iCartContext {
  cart: iProduct[];
  setCart: (props: iProduct[]) => void;
  cards: iProduct[];
  addProduct: (props: iProduct) => void;
  removeProduct: (props: iProduct) => void;
  getProducts: () => void;
  modalOpen: boolean;
  setModalOpen: (props: boolean) => void;
}

export const CartContext = createContext<iCartContext>({} as iCartContext);

export const CartProvider = ({ children }: iCartContextProps) => {
  const [cart, setCart] = useState<iProduct[]>([]);
  const [cards, setCards] = useState<iProduct[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const getProducts = async () => {
    try {
      const tokenLS = localStorage.getItem('@TOKEN');
      const response = await api.get<iProduct[]>('/products', {
        headers: {
          Authorization: `Bearer ${tokenLS}`,
        },
      });
      setCards(response.data);
    } catch (error) {
      const currentError = error as AxiosError<iRequestError>;
      console.log(currentError.response?.data);
    }
  };

  const addProduct = (product: iProduct) => {
    setCart([...cart, product]);
  };

  const removeProduct = (productToRemove: iProduct) => {
    const newCart = cart.filter(
      (product) => product.name !== productToRemove.name
    );
    setCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cards,
        addProduct,
        removeProduct,
        getProducts,
        modalOpen,
        setModalOpen,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

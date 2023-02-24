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

export interface iProductCart {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
  quantity: number;
}

interface iCartContext {
  cart: iProductCart[];
  setCart: (props: iProductCart[]) => void;
  cards: iProduct[];
  addProduct: (props: iProduct) => void;
  removeProduct: (props: iProduct) => void;
  increaseProduct: (props: number) => void;
  decreaseProduct: (props: number) => void;
  filterProducts: (props: string) => void;
  getProducts: () => void;
  modalOpen: boolean;
  setModalOpen: (props: boolean) => void;
}

export const CartContext = createContext<iCartContext>({} as iCartContext);

export const CartProvider = ({ children }: iCartContextProps) => {
  const [cart, setCart] = useState<iProductCart[]>([]);
  const [cards, setCards] = useState<iProduct[]>([]);
  const [cardsAPI, setCardsAPI] = useState<iProduct[]>([]);
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
      setCardsAPI(response.data)
    } catch (error) {
      const currentError = error as AxiosError<iRequestError>;
      console.log(currentError.response?.data);
    }
  };

  const addProduct = (product: iProduct) => {
    const productExistInCart = cart.findIndex(
      (productCart) => productCart.id === product.id
    );

    if (productExistInCart === -1) {
      const productToAdd = product as iProductCart
      productToAdd.quantity = 1;
      setCart([...cart, productToAdd]);
    } else {
      increaseProduct(product.id);
    }
  };

  const increaseProduct = (id: number) => {
    const index = cart.findIndex((product) => product.id === id);
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
  };

  const decreaseProduct = (id: number) => {
    const index = cart.findIndex((product) => product.id === id);
    const newCart = [...cart];
    if (newCart[index].quantity >= 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
      if (newCart[index].quantity < 1) {
        const cartFiltred = newCart.filter((product) => product.quantity > 0);
        setCart(cartFiltred);
      }
    } else {
      setCart(newCart);
    }
  };

  const removeProduct = (productToRemove: iProduct) => {
    const newCart = cart.filter(
      (product) => product.name !== productToRemove.name
    );
    setCart(newCart);
  };

  const filterProducts = (inputValue: string) => {
    const filtered = cardsAPI.filter((product) => (inputValue
        ? product.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            product.category.toLowerCase().includes(inputValue.toLowerCase())
        : true)
    );
    setCards(filtered)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cards,
        addProduct,
        removeProduct,
        increaseProduct,
        decreaseProduct,
        getProducts,
        filterProducts,
        modalOpen,
        setModalOpen,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

import { useContext, useEffect } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext } from '../../Providers/CartContext';

const ProductList = () => {
  const { cards, getProducts } = useContext(CartContext);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <StyledProductList>
      {cards.map((card) => (
        <ProductCard
          key={card.id}
          name={card.name}
          category={card.category}
          img={card.img}
          price={card.price}
          id={card.id}
        />
      ))}
    </StyledProductList>
  );
};

export default ProductList;

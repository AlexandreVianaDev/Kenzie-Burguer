import { CartContext } from '../../pages/Providers/CartContext';
import { useContext, useEffect } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';

const ProductList = () => {
  const { cards, getProducts} = useContext(CartContext)
  
  useEffect(() => {
    getProducts()
  },[])

  return(
    <StyledProductList>
      {cards.map(card => <ProductCard key={card.id} name={card.name} category={card.category} img={card.img} price={card.price}/>)}
    </StyledProductList>
  )
};

export default ProductList;

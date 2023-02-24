import { useContext } from 'react';
import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CartContext } from '../../../Providers/CartContext';

const CartProductList = () => {
  const { cart, setCart } = useContext(CartContext);

  const handleRemoveAllProducts = () => {
    setCart([]);
  };

  return (
    <StyledCartProductList>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((card) => (
              <CartProductCard
                key={card.id}
                name={card.name}
                category={card.category}
                img={card.img}
                price={card.price}
                id={card.id}
                quantity={card.quantity}
              />
            ))}
          </ul>

          <div className='totalBox'>
            <StyledParagraph>
              <strong>Total</strong>
            </StyledParagraph>
            <StyledParagraph className='total'>
              {cart
                .reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.price * currentValue.quantity,
                  0
                )
                .toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
            </StyledParagraph>
          </div>
          <StyledButton
            $buttonSize='default'
            $buttonStyle='gray'
            onClick={handleRemoveAllProducts}
          >
            Remover todos
          </StyledButton>
        </>
      ) : null}
    </StyledCartProductList>
  );
};

export default CartProductList;

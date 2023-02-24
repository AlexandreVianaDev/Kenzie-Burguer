import { MdDelete } from 'react-icons/md';
import { useContext } from 'react';
import { StyledCartProductCard } from './style';
import { StyledParagraph, StyledTitle } from '../../../../styles/typography';
import {
  CartContext,
  iProduct,
  iProductCart,
} from '../../../../Providers/CartContext';

const CartProductCard = ({
  name,
  category,
  img,
  price,
  id,
  quantity,
}: iProductCart) => {
  const { removeProduct, increaseProduct, decreaseProduct } =
    useContext(CartContext);

  const handleRemoveProduct = (product: iProduct) => {
    removeProduct(product);
  };

  const handleIncreaseProduct = (productId: number) => {
    increaseProduct(productId);
  };

  const handleDecreaseProduct = (productId: number) => {
    decreaseProduct(productId);
  };

  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img src={img} alt={name} />
      </div>
      <div className='contentBox'>
        <div>
          <StyledTitle tag='h3' $fontSize='three'>
            {name}
          </StyledTitle>
          <div className='quantityBox'>
            <button type='button' onClick={() => handleDecreaseProduct(id)}>
              -
            </button>
            <StyledParagraph>{quantity}</StyledParagraph>
            <button type='button' onClick={() => handleIncreaseProduct(id)}>
              +
            </button>
          </div>
        </div>
        <button
          type='button'
          aria-label='Remover'
          onClick={() =>
            handleRemoveProduct({ name, category, img, price, id })
          }
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;

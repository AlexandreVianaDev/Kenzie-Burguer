import { MdDelete } from 'react-icons/md';
import { useContext } from 'react';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { CartContext, iProduct } from '../../../../Providers/CartContext';

const CartProductCard = ({ name, category, img, price, id }: iProduct) => {
  const { removeProduct } = useContext(CartContext);

  const handleRemoveProduct = (product: iProduct) => {
    removeProduct(product);
  };

  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img src={img} alt={name} />
      </div>
      <div className='contentBox'>
        <StyledTitle tag='h3' $fontSize='three'>
          {name}
        </StyledTitle>
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

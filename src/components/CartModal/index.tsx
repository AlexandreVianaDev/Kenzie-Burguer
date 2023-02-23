import { MdClose } from 'react-icons/md';
import { useContext, useRef } from 'react';
import CartProductList from './CartProductList';
import { StyledCartModalBox } from './style';
import { StyledParagraph, StyledTitle } from '../../styles/typography';
import { CartContext } from '../../Providers/CartContext';

const CartModal = () => {
  const { modalOpen, setModalOpen, cart } = useContext(CartContext);

  const modal = useRef();

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen ? (
        <StyledCartModalBox>
          <dialog ref={modal}>
            <header>
              <StyledTitle tag='h2' $fontSize='three'>
                Carrinho de compras
              </StyledTitle>
              <button
                type='button'
                aria-label='Fechar'
                onClick={() => {
                  closeModal();
                }}
              >
                <MdClose size={21} />
              </button>
            </header>
            <div className='cartBox'>
              <CartProductList />
              {cart.length === 0 ? (
                <div className='emptyBox'>
                  <StyledTitle tag='h3' $fontSize='three' textAlign='center'>
                    Sua sacola está vazia
                  </StyledTitle>
                  <StyledParagraph textAlign='center'>
                    Adicione itens
                  </StyledParagraph>
                </div>
              ) : null}
            </div>
          </dialog>
        </StyledCartModalBox>
      ) : null}
    </>
  );
};

export default CartModal;

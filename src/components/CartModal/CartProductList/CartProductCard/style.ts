import styled from 'styled-components';

export const StyledCartProductCard = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;

  .imageBox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: ${({ theme }) => theme.colors.gray100};

    img {
      width: 80px;
      height: 80px;
      object-fit: contain;
    }
    @media (max-width: 450px) {
      width: 40px;
      height: 40px;

      img {
        width: 40px;
        height: 40px;
      }
    }
  }

  .contentBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
    gap: 20px;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 16px;
    }

    button {
      background: transparent;
      opacity: 0.4;
      transition: 0.4s;

      :hover {
        opacity: 0.7;
      }
    }

    .quantityBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      max-width: fit-content;
    }

    .quantityBox > button {
      color: #eb5757;
      padding: 6px 12px;
      font-size: 1rem;
      font-weight: 700;
      background: ${({ theme }) => theme.colors.gray100};
    }
  }
`;

import { useContext } from 'react';
import CartProductCard from './CartProductCard';

import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { ProductsContext } from '../../../providers/productsContext';

const CartProductList = () => {
  const { removeAll, total, currentSale } = useContext(ProductsContext);
  return (
    <StyledCartProductList>
      <ul>
        {currentSale.map((product) => (
          <CartProductCard product={product} />
        ))}
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>
          {total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </StyledParagraph>
      </div>
      <StyledButton
        $buttonSize='default'
        $buttonStyle='gray'
        onClick={() => removeAll()}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;

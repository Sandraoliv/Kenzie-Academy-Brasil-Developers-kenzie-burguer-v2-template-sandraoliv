import { useContext } from 'react';
import { MdDelete } from 'react-icons/md';

import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import {
  iProductCardProps,
  ProductsContext,
} from '../../../../providers/productsContext';

const CartProductCard = ({ product }: iProductCardProps) => {
  const { removeProductFromCart } = useContext(ProductsContext);
  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img src={product.img} alt='Hamburguer' />
      </div>
      <div className='contentBox'>
        <StyledTitle tag='h3' $fontSize='three'>
          {product.name}
        </StyledTitle>
        <button
          type='button'
          aria-label='Remover'
          onClick={() => removeProductFromCart(product.id)}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;

import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';

import {
  iProductCardProps,
  ProductsContext,
} from '../../../providers/productsContext';

const ProductCard = ({ product }: iProductCardProps) => {
  const { addProductToCart } = useContext(ProductsContext);

  return (
    <StyledProductCard>
      <div className='imageBox'>
        <img src={product.img} alt='Hamburguer' />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {product.name}
        </StyledTitle>
        <StyledParagraph className='category'>
          {product.category}
        </StyledParagraph>
        <StyledParagraph className='price'>
          {product.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </StyledParagraph>
        <StyledButton
          $buttonSize='medium'
          $buttonStyle='green'
          onClick={() => addProductToCart(product)}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;

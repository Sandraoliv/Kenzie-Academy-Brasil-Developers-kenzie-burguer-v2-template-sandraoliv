import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { StyledCartProductList } from '../../CartModal/CartProductList/style';
import {
  iProductCardProps,
  productsContext,
} from '../../../providers/productsContext';

const ProductCard = ({ product }: iProductCardProps) => {
  // li
  const { products, setProducts, addProductToCart } =
    useContext(productsContext);

  <StyledProductCard>
    return (
    <div className='imageBox'>
      <img src={product.img} alt='Hamburguer' />
    </div>
    <div className='content'>
      <StyledTitle tag='h3' $fontSize='three'>
        {product.name}
      </StyledTitle>
      <StyledParagraph className='category'>{product.category}</StyledParagraph>
      <StyledParagraph className='price'>{product.price}</StyledParagraph>
      <StyledButton
        $buttonSize='medium'
        $buttonStyle='green'
        onClick={() => addProductToCart()}
      >
        Adicionar
      </StyledButton>
    </div>
    );
  </StyledProductCard>;
};

export default ProductCard;

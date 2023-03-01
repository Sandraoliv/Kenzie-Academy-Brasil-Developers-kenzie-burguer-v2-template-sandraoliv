import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import {
  iProductCardProps,
  iProducts,
  productsContext,
} from '../../providers/productsContext';

const ProductList = (product) => {
  const { products, setProducts } = useContext(productsContext);
  return (
    <StyledProductList>
      {products.map((product: iProductCardProps) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </StyledProductList>
  );
};
export default ProductList;

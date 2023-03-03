import { useContext, useEffect } from 'react';
import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';

import { StyledContainer } from '../../styles/grid';
import { ProductsContext } from '../../providers/productsContext';

const ShopPage = () => {
  const { loadProducts } = useContext(ProductsContext);
  useEffect(() => {
    loadProducts();
  }, []);

  const { openModal } = useContext(ProductsContext);
  return (
    <StyledShopPage>
      <>
        {openModal ? <CartModal /> : null}
        <Header />
        <main>
          <StyledContainer containerWidth={1300}>
            <ProductList />
          </StyledContainer>
        </main>
      </>
    </StyledShopPage>
  );
};

export default ShopPage;

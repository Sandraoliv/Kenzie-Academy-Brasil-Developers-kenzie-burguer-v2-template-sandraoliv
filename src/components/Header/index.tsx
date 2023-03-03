import { useContext } from 'react';
import { MdShoppingCart, MdLogout } from 'react-icons/md';

import SearchForm from './SearchForm';
import { StyledHeader } from './style';
import LogoKenzieBurguer from '../../assets/LogoKenzieBurguer.svg';

import { StyledContainer } from '../../styles/grid';
import { ProductsContext } from '../../providers/productsContext';
import { UserContext } from '../../providers/userContext';

const Header = () => {
  const { handleModal } = useContext(ProductsContext);
  const { userLogout } = useContext(UserContext);
  return (
    <StyledHeader>
      <StyledContainer containerWidth={1300}>
        <div className='flexGrid'>
          <img
            src={LogoKenzieBurguer}
            alt='Kenzie Burguer Logo'
            className='logo'
          />
          <nav className='nav' role='navigation'>
            <SearchForm />
            <div className='buttons'>
              <button
                type='button'
                onClick={() => {
                  handleModal();
                }}
              >
                <MdShoppingCart size={28} />
              </button>
              <button type='button' onClick={() => userLogout()}>
                <MdLogout size={28} />
              </button>
            </div>
          </nav>
        </div>
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;

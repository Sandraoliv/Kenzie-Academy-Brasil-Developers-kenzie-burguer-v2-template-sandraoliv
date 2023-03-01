import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import { UserContext } from './providers/userContext';

const Router = () => {
  const { tokenFromLocalStorage } = useContext(UserContext);
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route
        path='/shop'
        element={tokenFromLocalStorage ? <ShopPage /> : <Navigate to='/' />}
      />
    </Routes>
  );
};

export default Router;

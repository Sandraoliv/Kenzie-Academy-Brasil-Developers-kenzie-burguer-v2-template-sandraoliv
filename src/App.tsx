import { ToastContainer, toast } from 'react-toastify';
import { UserProvider } from './providers/userContext';
import 'react-toastify/dist/ReactToastify.css';
import Router from './routes';
import { GlobalStyles } from './styles/global';
import { ProductProvider } from './providers/productsContext';

const App = () => (
  <>
    <GlobalStyles />
    <UserProvider>
      <ProductProvider>
        <Router />
      </ProductProvider>
    </UserProvider>
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
  </>
);

export default App;

import { Children, createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';

interface iProductsContext {
  closeModal: () => void;
  handleModal: () => void;
  openModal: boolean;
  loadProducts: () => Promise<void>;
  products: [] | iProducts;
  addProductToCart: () => void;
  cartTotal: number;
  setCartTotal: React.Dispatch<React.SetStateAction<number>>;
  setCurrentSale: React.Dispatch<any>;
  currentSale: any;
  removeAll: any;
  filteredProducts: string;
  setFilteredProducts: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<[] | iProducts>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface iProductsContextProviderProps {
  children: React.ReactNode;
}

export interface iProducts {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export interface iProductCardProps {
  product: iProducts;
}

export const productsContext = createContext({} as iProductsContext);

export const productProvider = ({
  children,
}: iProductsContextProviderProps) => {
  const [products, setProducts] = useState<iProducts | []>([]);
  const [openModal, setOpenModal] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState('');
  const localStaregeCurrentSale = localStorage.getItem('@currentSale');
  const [currentSale, setCurrentSale] = useState(
    localStaregeCurrentSale ? JSON.parse(localStaregeCurrentSale) : []
  );

  const handleModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const loadProducts = async () => {
    const token = localStorage.getItem('@TOKEN');
    try {
      const response = await api.get('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error();
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);

  const addProductToCart = (products) => {
    if (
      !currentSale.some((newProducts) => newProducts.name === products.name)
    ) {
      setCurrentSale([...currentSale, products]);
      toast.success('Produto adicionado!');
    } else {
      toast.error('Produto já adicionado!');
    }
  };

  useEffect(() => {
    localStorage.setItem('@currentSale', JSON.stringify(currentSale));
  }, [currentSale]);

  const removeProductFromCart = (productId) => {
    const newCurrentSale = currentSale.filter((sale) => sale.id !== productId);

    setCurrentSale(newCurrentSale);
    toast.error('Produto removido!');
  };
  const removeAll = () => {
    setCurrentSale([]);
    toast.success('Todos os itens removidos!');
  };

  const selectedProduct = products.filter((product) =>
    filteredProducts === ''
      ? true
      : product.name.toLowerCase().includes(filteredProducts.toLowerCase())
  );

  return (
    <productsContext.Provider
      value={{
        addProductToCart,
        loadProducts,
        closeModal,
        handleModal,
        openModal,
        products,
        setProducts,
        setOpenModal,
        removeAll,
        setCurrentSale,
        removeProductFromCart,
        selectedProduct,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};

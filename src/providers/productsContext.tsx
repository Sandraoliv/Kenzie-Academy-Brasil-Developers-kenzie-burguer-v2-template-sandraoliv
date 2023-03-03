import { Children, createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';

interface iProductsContext {
  closeModal: () => void;
  handleModal: () => void;
  openModal: boolean;
  loadProducts: () => Promise<void>;
  products: iProducts[];
  addProductToCart: (products: iProducts) => void;
  cartTotal: number;
  setCartTotal: React.Dispatch<React.SetStateAction<number>>;
  setCurrentSale: React.Dispatch<React.SetStateAction<iProducts[]>>;
  currentSale: iProducts[];
  removeAll: () => void;
  filteredProducts: string;
  selectedProduct: iProducts[];
  removeProductFromCart: (productId: number) => void;
  setFilteredProducts: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<[] | iProducts[]>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  total: number;
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

export const ProductsContext = createContext({} as iProductsContext);

export const ProductProvider = ({
  children,
}: iProductsContextProviderProps) => {
  const localStaregeCurrentSale = localStorage.getItem('@currentSale');

  const [products, setProducts] = useState<iProducts[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState('');
  const [currentSale, setCurrentSale] = useState<iProducts[]>(
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

  const addProductToCart = (product: iProducts) => {
    if (!currentSale.some((newProducts) => newProducts.name === product.name)) {
      setCurrentSale([...currentSale, product]);
      toast.success('Produto adicionado com sucesso');
    } else {
      toast.error('Produto já está no carrinho!');
    }
  };

  useEffect(() => {
    localStorage.setItem('@currentSale', JSON.stringify(currentSale));
  }, [currentSale]);

  const removeProductFromCart = (productId: number) => {
    const newCurrentSale = currentSale.filter((sale) => sale.id !== productId);

    setCurrentSale(newCurrentSale);
    toast.success('Produto removido!');
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
  const total = currentSale.reduce(
    (previosValue, currentValue) => previosValue + currentValue.price,
    0
  );

  return (
    <ProductsContext.Provider
      value={{
        total,
        closeModal,
        handleModal,
        openModal,
        loadProducts,
        products,
        addProductToCart,
        cartTotal,
        setCartTotal,
        setCurrentSale,
        currentSale,
        removeAll,
        filteredProducts,
        selectedProduct,
        removeProductFromCart,
        setFilteredProducts,
        setProducts,
        setOpenModal,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

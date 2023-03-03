import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../services/api';

interface iUser {
  id: string;
  name: string;
  email: string;
}

interface iUserContextProviderProps {
  children: React.ReactNode;
}

export interface iRegisterFormValue {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface iLoginFormValue {
  email: string;
  password: string;
}

interface iUserContext {
  setTokenFromLocalStorage: React.Dispatch<React.SetStateAction<string | null>>;
  tokenFromLocalStorage: string | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: iUser | null;
  setUser: React.Dispatch<React.SetStateAction<iUser | null>>;
  userRegister: (data: iRegisterFormValue) => Promise<void>;
  userLogin: (data: iLoginFormValue) => Promise<void>;
  userAutoLogin: () => Promise<void>;
  userLogout: () => void;
}

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: iUserContextProviderProps) => {
  const [user, setUser] = useState<iUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [tokenFromLocalStorage, setTokenFromLocalStorage] = useState(
    localStorage.getItem('@TOKEN') || null
  );

  const navigate = useNavigate();

  const userRegister = async (data: iRegisterFormValue) => {
    try {
      await api.post('/users ', data);
      toast.success('Usuário cadastrado com sucesso!');

      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Não foi possível realizar o cadastro');
    }
  };

  const userLogin = async (data: iLoginFormValue) => {
    try {
      setLoading(true);

      const response = await api.post('/login ', data);
      setUser(response.data.user);
      setTokenFromLocalStorage(response.data.accessToken);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      localStorage.setItem('@USERID', response.data.user.id);

      navigate('/shop');
      toast.success('Bem vindo!');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const userAutoLogin = async () => {
    const token = localStorage.getItem('@TOKEN');
    if (token) {
      try {
        setLoading(true);
        const response = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);

        navigate('/shop');

        toast.success('Bem vindo de volta!');
      } catch (error) {
        console.log(error);
        toast.error('Não foi possível carregar as informações!');

        localStorage.removeItem(' @TOKEN ');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    userAutoLogin();
  }, []);

  const userLogout = () => {
    setUser(null);
    localStorage.removeItem('@TOKEN');
    localStorage.removeItem('@USERID');
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{
        setTokenFromLocalStorage,
        tokenFromLocalStorage,
        userRegister,
        userLogin,
        userAutoLogin,
        userLogout,
        loading,
        user,
        setUser,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

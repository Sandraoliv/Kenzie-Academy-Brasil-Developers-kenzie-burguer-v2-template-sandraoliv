import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from './loginSchema';
import { iLoginFormValue, UserContext } from '../../../providers/userContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

const LoginForm = () => {
  const { userLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iLoginFormValue>({ resolver: yupResolver(loginSchema) });

  const submit: SubmitHandler<iLoginFormValue> = async (data) => {
    await userLogin(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        label='Email'
        type='email '
        placeholder='Digite o seu email'
        register={register('email')}
        error={errors.email}
      />
      <Input
        label='Senha'
        type='password '
        placeholder='Digite uma senha'
        register={register('password')}
        error={errors.password}
      />
      <StyledButton $buttonSize='default' $buttonStyle='green' type='submit'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};
export default LoginForm;

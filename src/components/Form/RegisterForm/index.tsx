import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { registerSchema } from './schema';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import {
  UserContext,
  iRegisterFormValue,
} from '../../../providers/userContext';

const RegisterForm = () => {
  const { userRegister } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iRegisterFormValue>({
    resolver: yupResolver(registerSchema),
  });

  const submit: SubmitHandler<iRegisterFormValue> = (data) => {
    userRegister(data);
  };
  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        label='Nome'
        type='text'
        register={register('name')}
        error={errors.name}
        placeholder='Digite seu nome'
      />
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

      <Input
        label='Confirmar Senha'
        type='password '
        placeholder='Confirme a sua senha'
        register={register('passwordConfirm')}
        error={errors.passwordConfirm}
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray' type='submit'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};
export default RegisterForm;

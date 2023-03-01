import * as yup from 'yup';

export const loginSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email('Insira um email válido')
      .required('E-mail obrigatório'),
    password: yup.string().required('Senha é obrigatória'),
  })
  .required();

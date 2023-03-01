import * as yup from 'yup';

export const registerSchema = yup
  .object({
    name: yup.string().required('Nome obrigatório!'),
    email: yup
      .string()
      .required('E-mail obrigatório')
      .email('Insira um email válido'),
    password: yup
      .string()
      .required('A senha é obrigatória')
      .matches(/.{6}/, 'Sua senha deve ter no mínimo 6 dígitos'),
    passwordConfirm: yup
      .string()
      .oneOf(
        [yup.ref(' password')],
        ' A confirmação  e senha devem ser idênticos'
      )
      .required('A confirmação de senha é obrigatória'),
  })
  .required();

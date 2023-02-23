import * as yup from 'yup';

const formSchema = yup
  .object()
  .shape({
    name: yup.string().required('Digite seu nome'),
    email: yup
      .string()
      .required('Digite seu email')
      .email('Digite um email válido'),
    password: yup
      .string()
      .required('Digite uma senha')
      .matches(/(\d)/, 'Deve conter ao menos 1 número')
      .matches(/[a-z]/, 'Deve conter ao menos 1 letra minúscula')
      .matches(/[A-Z]/, 'Deve conter ao menos 1 letra maiúscula')
      .matches(/(\W|_)/, 'Deve conter ao menos 1 caractere especial')
      .matches(/.{8,}/, 'Deve conter ao menos 8 caracteres'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Senhas não coincidem')
      .typeError('Senhas não coincidem')
      .required('Confirmação de senha é obrigatória'),
  })
  .required();

export default formSchema;

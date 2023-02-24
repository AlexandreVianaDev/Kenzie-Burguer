import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import formSchema from './validations';
import { iUserLogin, UserContext } from '../../../Providers/UserContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

const LoginForm = () => {
  const { userLogin } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iUserLogin>({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data: iUserLogin) => {
    userLogin(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmitFunction)}>
      <Input
        label='Email'
        type='text'
        {...register('email')}
        errorInput={errors.email?.message}
      />
      <Input
        label='Senha'
        type='password'
        {...register('password')}
        errorInput={errors.password?.message}
      />
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;

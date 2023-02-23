import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import formSchema from './validations';
import { UserContext } from '../../../pages/Providers/UserContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginForm = () => {
  const { userLogin, userRegister, userLogout, user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => {
    // console.log(data)
    userLogin(data)
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmitFunction)}>
      <Input type='text' {...register("email")} error={errors.email?.message}/>
      <Input type='password' {...register("password")} error={errors.password?.message}/>
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;

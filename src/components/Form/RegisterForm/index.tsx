import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import formSchema from './validations';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { iUserRegister, UserContext } from '../../../Providers/UserContext';

const RegisterForm = () => {
  const { userRegister } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iUserRegister>({
    resolver: yupResolver(formSchema),
  });
  const onSubmitFunction = (data: iUserRegister) => {
    userRegister(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmitFunction)}>
      <Input
        label='Nome'
        type='text'
        {...register('name')}
        errorInput={errors.name?.message}
      />
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
      <Input
        label='Confirmar senha'
        type='password'
        {...register('confirmPassword')}
        errorInput={errors.confirmPassword?.message}
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;

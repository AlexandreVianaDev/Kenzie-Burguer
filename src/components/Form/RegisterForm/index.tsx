import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import formSchema from './validations';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { UserContext } from '../../../Providers/UserContext';

const RegisterForm = () => {
  const { userRegister } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => {
    userRegister(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmitFunction)}>
      <Input type='text' {...register('name')} error={errors.name?.message} />
      <Input type='text' {...register('email')} error={errors.email?.message} />
      <Input
        type='password'
        {...register('password')}
        error={errors.password?.message}
      />
      <Input
        type='password'
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;

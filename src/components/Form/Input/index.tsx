import { forwardRef } from 'react';
import { TextFieldProps } from '@mui/material';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

type IInputProps = {
  label: string;
  errorInput?: string | undefined;
} & TextFieldProps;

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, type, errorInput, ...rest }, ref) => (
    <fieldset>
      <StyledTextField label={label} type={type} ref={ref} {...rest} />
      <StyledParagraph fontColor='red'>{errorInput}</StyledParagraph>
    </fieldset>
  )
);

export default Input;

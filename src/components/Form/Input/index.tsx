import { forwardRef, InputHTMLAttributes } from 'react';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface iInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  error?: string | undefined;
}

const Input = forwardRef<HTMLInputElement, iInputProps>(
  ({ type, error, ...rest }, ref) => (
    <fieldset>
      <StyledTextField label={rest.name} type={type} ref={ref} {...rest} />
      <StyledParagraph fontColor='red'>{error}</StyledParagraph>
    </fieldset>
  )
);

export default Input;

import { forwardRef, InputHTMLAttributes } from 'react';
// import { FieldError, FieldErrors, FieldErrorsImpl } from 'react-hook-form/dist/types';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface iInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  error?: string | undefined;
}
//  | FieldError | FieldErrorsImpl <- soluciona no form mas da erro no error do componente

const Input = forwardRef<HTMLInputElement, iInputProps>(
  ({ type, error, ...rest }, ref) => {
    console.log(rest)
    return(
    <fieldset>
      <StyledTextField label={rest.name} type={type} ref={ref} {...rest} />
      <StyledParagraph fontColor='red'>{error}</StyledParagraph>
    </fieldset>
  )}
);

// const Input = forwardRef<HTMLInputElement, iInputProps>(
//   ({ type, error, ...rest }, ref) => (
//     <fieldset>
//       <StyledTextField label={rest.name} type={type} ref={ref} {...rest} />
//       <StyledParagraph fontColor='red'>{error}</StyledParagraph>
//     </fieldset>
//   )
// );

export default Input;

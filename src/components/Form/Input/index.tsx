import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface IinputProps {
  label: string;
  type: 'text' | 'email ' | 'password ' | 'passwordConfirm';
  error?: FieldError;
  register: UseFormRegisterReturn<string>;
  placeholder?: string;
}

const Input = ({ label, type, register, error, placeholder }: IinputProps) => (
  <fieldset>
    <StyledTextField label={label} {...register} type={type} />

    {error ? <StyledParagraph fontColor='red'>Erro</StyledParagraph> : null}
  </fieldset>
);

export default Input;

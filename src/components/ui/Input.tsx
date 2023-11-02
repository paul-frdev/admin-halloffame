import { Input as InputAntd } from 'antd';

interface InputProps {
  label?: string;
  type?: string;
}

export const Input = ({ label, type = 'text' }: InputProps) => {
  return (
    <InputAntd type={type} />
  );
};

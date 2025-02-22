import { LogIn } from 'lucide-react';

interface SubmitButtonProps {
  text?: string;
  icon?: boolean;
}

const SubmitButton = ({ text, icon = true }: SubmitButtonProps) => {
  return (
    <button type='submit' className='button-modern'>
      {icon ? <LogIn className='size-5' /> : text}
    </button>
  );
};

export default SubmitButton;

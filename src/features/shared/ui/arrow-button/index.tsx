import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface ArrowProps {
  direction: string;
}

const Arrow = ({ direction }: ArrowProps) => {
  return direction == 'left' ? <ChevronLeftIcon size={16} /> : <ChevronRightIcon size={16} />;
};

export default Arrow;

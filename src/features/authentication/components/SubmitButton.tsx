import { SubmitButtonProps } from '@/types/Auth'
import { LogIn } from 'lucide-react'

const SubmitButton = ({ text, icon = true }: SubmitButtonProps) => {
  return (
    <button className='button-modern' type='submit'>
      {icon ? <LogIn className='size-5' /> : text}
    </button>
  )
}

export default SubmitButton

import CustomError from '@/features/shared/utils/custom-errors'

export default function Custom404() {
  return (
    <CustomError 
      code="404"
      title="Not Found"
      message="The page you're looking for doesn't exist"
      buttonText="Home"
      buttonHref="/"
    />
  )
}
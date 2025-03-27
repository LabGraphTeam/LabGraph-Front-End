import CustomError from '@/shared/utils/components/custom-errors'

export default function Custom404() {
  return (
    <CustomError
      buttonHref='/'
      buttonText='Home'
      code='404'
      message="The page you're looking for doesn't exist"
      title='Not Found'
    />
  )
}

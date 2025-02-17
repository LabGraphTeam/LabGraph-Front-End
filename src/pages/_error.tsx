import CustomError from '@/features/authentication/custom-errors';
import { NextPageContext } from 'next';
import { ErrorProps } from 'next/error';

const MyError = ({ statusCode }: ErrorProps) => {
  const errorData = {
    400: {
      title: 'Bad Request',
      message: 'The server cannot process the request due to invalid syntax',
      buttonText: 'Home',
      buttonHref: '/',
    },
    401: {
      title: 'Unauthorized',
      message: 'You need to be authenticated to access this page',
      buttonText: 'Home',
      buttonHref: '/',
    },
    403: {
      title: 'Forbidden',
      message: "You don't have permission to access this resource",
      buttonText: 'Home',
      buttonHref: '/',
    },
    404: {
      title: 'Not Found',
      message: "The page you're looking for doesn't exist",
      buttonText: 'Home',
      buttonHref: '/',
    },
    500: {
      title: 'Server Error',
      message: 'Something went wrong on our servers',
      buttonText: 'Home',
      buttonHref: '/',
    },
    503: {
      title: 'Connection Failed',
      message:
        'Unable to connect to the server. Please check your internet connection and try again.',
      buttonText: 'Retry Connection',
      buttonHref: '#',
    },
  };

  const error = errorData[statusCode as keyof typeof errorData] || {
    title: 'Error',
    message: 'An unexpected error has occurred',
    buttonText: 'Home',
    buttonHref: '/',
  };

  return <CustomError code={statusCode?.toString() ?? 'Error'} {...error} />;
};

MyError.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default MyError;

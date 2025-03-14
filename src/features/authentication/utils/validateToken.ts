import router from 'next/router';

const validateToken = async () => {
  const response = await fetch('/api/validate-token');
  const data = await response.json();

  if (!data.valid) {
    router.push('/login');
  }
};

export default validateToken;

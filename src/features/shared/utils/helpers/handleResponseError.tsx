const handleResponseError = async (response: Response) => {
  try {
    if (!response.ok) {
      const resp = await response.json();
      throw new Error(`${resp.status} - ${resp.details}`);
    }
  } catch (error) {
    console.error('Error handling response:', error);
  }
};

export default handleResponseError;

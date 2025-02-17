const handleLogout = async () => {
  try {
    await fetch('/api/logout', { method: 'POST' });
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export default handleLogout;

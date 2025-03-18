import { fetchWrapper } from '@/services/wrappers/fetch-wrapper'

const handleLogout = async () => {
  await fetchWrapper({ route: '/api/logout', method: 'POST' })
  return window.location.reload()
}

export default handleLogout

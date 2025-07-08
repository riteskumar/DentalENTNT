
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

export default PublicOnlyRoute
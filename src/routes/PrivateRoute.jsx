import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'



// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
   
    const {user,loading} = useAuth()
    const location = useLocation()
    
    if (loading) {
        return <h1 className='flex justify-center items-center'>...loading</h1>
    }

    if (user) {
        return children
    }

  return <Navigate state={location?.pathname} to={'/login'} /> 
}

export default PrivateRoute
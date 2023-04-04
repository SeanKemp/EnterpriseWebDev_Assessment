import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAuthBool } from './authslice';

export default function PrivateRoute({ children }) {
    const authUser = useSelector(getAuthBool)//sessionStorage.getItem('auth');
    console.log(authUser)
    if (!authUser) {
        console.log("Not logged in!")
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />
    }

    // authorized so return child components
    return children;
}

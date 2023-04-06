import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAuthBool } from './authslice';

// Private route for logout navigating back to login page
export default function PrivateRoute({ children }) {
    const authUser = useSelector(getAuthBool)
    console.log(authUser)
    if (!authUser) {
        console.log("Not logged in!")
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />
    }

    // authorized so return child components
    return children;
}

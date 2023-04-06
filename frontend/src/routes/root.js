import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getAuthBool, setAuthBool } from '../authslice'
import { getAdminBool, setAdminBool } from '../adminslice'

// Root component navigation bar for all pages
export default function Root() {
  
  const dispatch = useDispatch()
  // Set global variables based on auth token if user wants to come back to auth session after page load
  const auth = sessionStorage.getItem('auth')
  if (auth) {dispatch(setAuthBool()); if (JSON.parse(auth).user.is_admin == true) dispatch(setAdminBool())} 

  // if user is logged in display logout link, otherwise display Login/Register link
  let loginDisplay = <Link className="nav-link" to='/login'>Login/Register</Link>
  if (useSelector(getAuthBool)) {
    loginDisplay = <Link className="nav-link" to='/logout'>Logout</Link>
  }
  // If user is admin display Rates page link
  let ratesDisplay;
  if (useSelector(getAdminBool)) {
    ratesDisplay = <Link className="nav-link" to='/admin/rates'>Rates</Link>
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Quotes & Budgets</a>
        <div className="navbar-expand" id="">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to='/'>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/quotes'>Quotes</Link>
                </li>
                <li className="nav-item">
                    {ratesDisplay}
                </li>
                <li className="nav-item">
                    {loginDisplay}
                </li>
            </ul>
        </div>
      </nav>
      <div id="detail">
          <Outlet />
      </div>
    </>
  );
}

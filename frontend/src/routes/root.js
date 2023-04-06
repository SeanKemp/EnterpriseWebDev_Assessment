import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getAuthBool, setAuthBool } from '../authslice'
import { getAdminBool, setAdminBool } from '../adminslice'


export default function Root() {
  
  const dispatch = useDispatch()
  const auth = sessionStorage.getItem('auth')
  if (auth) {dispatch(setAuthBool()); if (JSON.parse(auth).user.is_admin == true) dispatch(setAdminBool())} //console.log("Checking AUTH");

  let loginDisplay = <Link className="nav-link" to='/login'>Login/Register</Link>
  if (useSelector(getAuthBool)) {
    loginDisplay = <Link className="nav-link" to='/logout'>Logout</Link>
  }
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

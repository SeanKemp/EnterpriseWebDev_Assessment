import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getAuthBool, setAuthBool, unsetAuthBool } from '../authslice'
import { getAdminBool, setAdminBool, unsetAdminBool } from '../adminslice'


export default function Root() {
  
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const auth = sessionStorage.getItem('auth')
  if (auth) {dispatch(setAuthBool()); if (JSON.parse(auth).user.is_admin == true) dispatch(setAdminBool())} //console.log("Checking AUTH");

  // const logout = (e) => {
  //   sessionStorage.removeItem("auth")
  //   dispatch(unsetAuthBool())
  //   dispatch(unsetAdminBool())
  //   navigate('/logout')
  // }


  let loginDisplay = <Link className="nav-link" to='/login'>Login/Register</Link>
  if (useSelector(getAuthBool)) {
    // loginDisplay = <a className="nav-link" type="button" onClick={logout}>Logout</a> 
    loginDisplay = <Link className="nav-link" to='/logout'>Logout</Link>
  }
  let acountDisplay;
  if (useSelector(getAuthBool)) {
    acountDisplay = <Link className="nav-link" to='/account'>Account</Link>
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
                    {acountDisplay}
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

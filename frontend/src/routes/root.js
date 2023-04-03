import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getAuthBool, unsetAuthBool } from '../reduxslice'


export default function Root() {
  
  //const authUser = sessionStorage.getItem('auth')
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const logout = (e) => {
    sessionStorage.removeItem("auth")
    dispatch(unsetAuthBool())
    navigate('/logout')
  }


  let loginDisplay = <Link className="nav-link" to='/login'>Login</Link>//<a class="nav-link" href={'/login'}>Login/Register</a>
  if (useSelector(getAuthBool)) {
    loginDisplay = <a className="nav-link" type="button" onClick={logout}>Logout</a> //href={'/logout'}
  }
  let acountDisplay;
  if (useSelector(getAuthBool)) {
    acountDisplay = <Link className="nav-link" to='/account'>Account</Link>//<a class="nav-link"  href={'/account'}>Account</a>
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Quotes & Budgets</a>
        <div className="navbar-expand" id="">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to='/'>Home</Link>
                    {/* <a class="nav-link" href="/">Home</a> */}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/quotes'>Quotes</Link>
                    {/* <a class="nav-link" href="/quotes">Quotes</a> */}
                </li>
                <li className="nav-item">
                    {acountDisplay}
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

import { Outlet } from "react-router-dom";
import { Redirect } from 'react-router';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Root() {
  
  const authUser = sessionStorage.getItem('auth')
  let navigate = useNavigate()

  const logout = (e) => {
    sessionStorage.removeItem("auth")
    navigate('/logout')
  }


  let loginDisplay = <Link className="nav-link" to='/login'>Login</Link>//<a class="nav-link" href={'/login'}>Login/Register</a>
  if (authUser) {
    loginDisplay = <a className="nav-link" type="button" onClick={logout}>Logout</a> //href={'/logout'}
  }
  let acountDisplay;
  if (authUser) {
    acountDisplay = <Link className="nav-link" to='/account'>Login</Link>//<a class="nav-link"  href={'/account'}>Account</a>
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
      {/* <div id="sidebar">
        <h1>Menu</h1>
        <div>
          <a href={'/login'}>Login</a>
        </div>
        <div>
          <a href={'/signUp'}>Sign up</a>
        </div>
      </div>
      <div id="detail"></div> */}
    </>
  );
}

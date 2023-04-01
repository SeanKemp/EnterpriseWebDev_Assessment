import { Outlet } from "react-router-dom";
import { Redirect } from 'react-router';
import { useNavigate } from "react-router-dom";

export default function Root() {
  
  const authUser = sessionStorage.getItem('auth')
  let navigate = useNavigate()

  const logout = (e) => {
    sessionStorage.removeItem("auth")
    navigate('/logout')
  }


  let loginDisplay = <a class="nav-link" href={'/login'}>Login/Register</a>
  if (authUser) {
    loginDisplay = <a class="nav-link" type="button" onClick={logout}>Logout</a> //href={'/logout'}
  }
  let acountDisplay;
  if (authUser) {
    acountDisplay = <a class="nav-link"  href={'/account'}>Account</a>
  }

  
  
  return (
    <>
      <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="/">Quotes & Budgets</a>
        <div class="navbar-expand" id="">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/quotes">Quotes</a>
                </li>
                <li class="nav-item">
                    {acountDisplay}
                </li>
                <li class="nav-item">
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

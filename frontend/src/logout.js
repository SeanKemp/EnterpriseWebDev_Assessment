import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { unsetAuthBool } from "./authslice";
import { unsetAdminBool } from "./adminslice";

// Logout page
export default function Logout() {
    const dispatch = useDispatch()
    // On page load remove auth token and set user and admin global variables to false
    useEffect(() => {
      sessionStorage.removeItem("auth")
      dispatch(unsetAuthBool())
      dispatch(unsetAdminBool())
    }, [])

    return (
      <>
        <div class="formStyle">
          <h1>Logged out now! </h1>
        </div>
      </>
    );
}

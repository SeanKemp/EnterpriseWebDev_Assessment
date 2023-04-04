import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { unsetAuthBool } from "./authslice";
import { unsetAdminBool } from "./adminslice";

export default function Logout() {
    //sessionStorage.removeItem("auth")
    //window.location.reload(false);
    const dispatch = useDispatch()
    useEffect(() => {
      sessionStorage.removeItem("auth")
      dispatch(unsetAuthBool())
      dispatch(unsetAdminBool())
      //navigate('/logout')
    }, [])

    return (
      <>
        <div class="formStyle">
          <h1>Logged out now! </h1>
        </div>
      </>
    );
}

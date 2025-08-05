import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // Check if user is signed in
  const isSignedIn = currentUser !== null;

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {/* Only show Signin and Signup if user is NOT signed in */}
      {!isSignedIn && (
        <>
          <NavLink to="/Kambaz/Account/Signin" id="wd-account-signin-link"
            className={({ isActive }) =>
               `list-group-item border border-0 ${isActive ? 'active text-black' : 'text-danger'}`
            }> Signin </NavLink>
          <NavLink to="/Kambaz/Account/Signup" id="wd-account-signup-link"
            className={({ isActive }) =>
               `list-group-item border border-0 ${isActive ? 'active text-black' : 'text-danger'}`
            }> Signup </NavLink>
        </>
      )}
      
      {/* Only show Profile if user IS signed in */}
      {isSignedIn && (
        <NavLink to="/Kambaz/Account/Profile" id="wd-account-profile-link"
          className={({ isActive }) =>
             `list-group-item border border-0 ${isActive ? 'active text-black' : 'text-danger'}`
          }> Profile </NavLink>
      )}
    </div>
  );
}
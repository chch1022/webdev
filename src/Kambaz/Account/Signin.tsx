import { Link } from "react-router-dom";
export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <input defaultValue="alice" className="wd-username" placeholder="username" /> <br />
      <input defaultValue="123"className="wd-password" placeholder="password" type="password" /> <br />
      <Link id="wd-signin-btn" to="/Kambaz/Dashboard">
        Sign in
      </Link>
      <br />
      <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
        Sign up
      </Link>
    </div>

);}

import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <Form.Control defaultValue="Alice" 
                    placeholder="username" 
                    className="wd-username mb-2" /><br/>
      <Form.Control defaultValue="123" 
                    placeholder="password" 
                    type="password" 
                    className="wd-password mb-2" /><br/>
      <Link to="/Kambaz/Account/Profile" 
            className="btn btn-primary w-100 mb-2"> 
            Profile 
      </Link><br />
      <Link to="/Kambaz/Account/Signin" 
            className="btn btn-secondary w-100">
            Sign in
      </Link>
    </div>
  );
}
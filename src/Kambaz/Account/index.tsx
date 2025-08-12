import { Routes, Route, Navigate } from "react-router";
import { useSelector } from "react-redux";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import AccountNavigation from "./Navigation";
import Users from "./Users";
import PeopleDetails from "../Courses/People/Details";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-account-screen" style={{ display: 'flex' }}>
      <div style={{ width: '250px', flexShrink: 0 }}>
        <AccountNavigation />
      </div>
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to={ currentUser ? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin" }/>}/>
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Users/:uid" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}
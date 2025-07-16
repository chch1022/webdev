import { Routes, Route, Navigate } from "react-router";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import AccountNavigation from "./Navigation";

export default function Account() {
  return (
    <div id="wd-account-screen" style={{ display: 'flex' }}>
      <div style={{ width: '250px', flexShrink: 0 }}>
        <AccountNavigation />
      </div>
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="Signin" />} />
          <Route path="Signin" element={<Signin />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="Profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
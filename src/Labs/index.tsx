import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Kambaz from "../Kambaz";
export default function Labs() {
  return (
    <>
      <div>
        <h1>Welcome to Web Dev</h1>
        <h2>Chen Chen - SUMMER2 2025 - SEC 01</h2>
        <h3><a href="https://github.com/chch1022/webdev.git" id="wd-github">Github</a></h3>
        <h1>Labs</h1>
        <TOC />
        <Routes>
          <Route path="/" element={<Navigate to="Lab1" />} />
          <Route path="Lab1" element={<Lab1 />} />
          <Route path="Lab2/*" element={<Lab2 />} />
          <Route path="Lab3/*" element={<Lab3 />} />
          <Route path="Kambaz/*" element={<Kambaz />} />
        </Routes>
       
      </div>
    </>
  ); 
}

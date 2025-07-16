import Modules from "../Modules";
import CourseStatus from "./Status";
import { HomeTopButtons } from "./Status";
export default function Home() {
  return (
    <div>
      <div className="d-flex" id="wd-home">
        <div className="flex-fill me-3"></div>
        <HomeTopButtons />
        <Modules />
      </div>
      <div className="d-none d-xl-block"></div>
      <CourseStatus />
    </div >
  );
}
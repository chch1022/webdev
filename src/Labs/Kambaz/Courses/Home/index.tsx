import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row" id="wd-home">
        <div className="col-12 col-xl-8">
          <Modules />
        </div>
        <div className="col-12 col-xl-4">
          <CourseStatus />
        </div>
      </div>
    </div>
  );
}
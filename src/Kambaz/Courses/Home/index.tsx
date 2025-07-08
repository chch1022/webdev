import Modules from "../Modules";
import CourseStatus from "./Status";
import { HomeTopButtons } from "./Status";
export default function Home() {
  return (
    <table id="wd-home">
      <tbody>
        <tr>
          <td valign="top">
            <div>
              <HomeTopButtons />
              <Modules />
            </div>
          </td>
          <td valign="top">
            <CourseStatus />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
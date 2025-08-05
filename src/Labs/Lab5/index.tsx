import EnvironmentVariables from "./EnvironmentVariables";
import PathParameters from "./PathParameters";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";

const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;
export default function Lab5() {
    return (
        <div id="wd-lab5">
            <h2>Lab 5</h2>
            <div className="list-group">
                <a href={`${HTTP_SERVER}/lab5/welcome`} className="list-group-item">

                    Welcome
                </a>
            </div><hr />
            <EnvironmentVariables />
            <PathParameters />
            <WorkingWithObjects />
            <WorkingWithArrays />
            <WorkingWithObjectsAsynchronously />
            <WorkingWithArraysAsynchronously />
        </div>


    );
}

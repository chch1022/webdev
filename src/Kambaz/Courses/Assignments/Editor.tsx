export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description">
                The assignment is available online Submit a link to the landing page of
            </textarea>
            <br />
            <table>
                <tbody>
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-points">Points</label>
                        </td>
                        <td>
                            <input id="wd-points" defaultValue={100} />
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-group">Assignment Group</label>
                        </td>
                        <td>
                            <select id="wd-group">
                                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-display-grade-as">Display Grade As</label>
                        </td>
                        <td>
                            <select id="wd-display-grade-as">
                                <option value="Percentage">Percentage</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-submission-type">Submission Type</label>
                        </td>
                        <td>
                            <select id="wd-submission-type">
                                <option value="Online">Online</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td>
                            <label>Online Entry Options</label><br />
                            <input type="checkbox" name="wd-text-entry" id="wd-text-entry" defaultChecked />
                            <label htmlFor="wd-text-entry">Text Entry</label><br />
                            <input type="checkbox" name="wd-website-url" id="wd-website-url" defaultChecked />
                            <label htmlFor="wd-website-url">Website URL</label><br />
                            <input type="checkbox" name="wd-media-recordings" id="wd-media-recordings" defaultChecked />
                            <label htmlFor="wd-media-recordings">Media Recordings</label><br />
                            <input type="checkbox" name="wd-student-annotation" id="wd-student-annotation" defaultChecked />
                            <label htmlFor="wd-student-annotation">Student Annotation</label><br />
                            <input type="checkbox" name="wd-file-uploads" id="wd-file-uploads" defaultChecked />
                            <label htmlFor="wd-file-uploads">File Uploads</label>
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-assign-to">Assign to</label>
                        </td>
                        <td>
                            <input id="wd-assign-to" defaultValue="Everyone" />
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-due-date">Due</label>
                        </td>
                        <td>
                            <input type="date" id="wd-due-date" defaultValue="2024-05-13" />
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-available-from">Available from</label>
                        </td>
                        <td>
                            <input type="date" id="wd-available-from" defaultValue="2024-05-06" />
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-available-until">Until</label>
                        </td>
                        <td>
                            <input type="date" id="wd-available-until" defaultValue="2024-05-20" />
                        </td>
                    </tr>
                </tbody>
            </table>

            <hr />
            <button>Cancel</button>
            <button>Save</button>


        </div>
    );
}

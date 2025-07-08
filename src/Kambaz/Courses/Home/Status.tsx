export default function CourseStatus() {
  return (
    <div id="wd-course-status">
      <h2>Course Status</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <button>Unpublish</button>
        <button>Publish</button>
      </div>
      <div><button>Import Existing Content</button></div>
      <div><button>Choose Home Page</button></div>
      <div><button>View Course Stream</button></div>
      <div><button>New Announcement</button></div>
      <div><button>New Analytics</button></div>
      <div><button>View Course Notifications</button></div>
    </div>
  );
}

// Add Home page top buttons
export function HomeTopButtons() {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
      <button>Collapse All</button>
      <button>View Progress</button>
      <div style={{ position: 'relative' }}>
        <button>Publish All ▼</button>
        {/* Example dropdown, not functional */}
        {/* <div style={{ position: 'absolute', top: '100%', left: 0, background: '#fff', border: '1px solid #ccc', zIndex: 1 }}>
          <div>Publish All Modules</div>
          <div>Publish All Assignments</div>
        </div> */}
      </div>
      <button style={{ background: '#1976d2', color: '#fff', fontWeight: 'bold' }}>+ Module</button>
    </div>
  );
}
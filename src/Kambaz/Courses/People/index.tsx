import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PeopleTable from "./Table";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsersForCourse = async () => {
    if (!cid) return;
    
    try {
      setLoading(true);
      setError("");
      
      // Call the backend API endpoint
      const response = await fetch(`/api/courses/${cid}/users`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }
      
      const courseUsers = await response.json();
      console.log("Fetched users for course:", courseUsers);
      setUsers(courseUsers);
    } catch (error) {
      console.error("Error fetching course users:", error);
      setError("Failed to load users for this course");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersForCourse();
  }, [cid]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        {error}
      </div>
    );
  }

  return <PeopleTable users={users} />;
}
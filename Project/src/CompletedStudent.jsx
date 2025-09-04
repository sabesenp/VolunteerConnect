import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
import supabase from "./Client"; // Ensure you import the Supabase client
import "./Nav.css";

function CompletedStudent() {
  // State to control the sidebar visibility
  const [isOpen, setIsOpen] = useState(false);
  const [completedPosts, setCompletedPosts] = useState([]); // State to store fetched posts
  const [tHours, setTHours] = useState(0); //track total hours as a number, not an array

  // Function to toggle sidebar
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  // Fetch posts with Completed_Status = true
  const fetchCompletedTasks = async () => {
    // Fetch posts that are marked as completed, including all necessary fields
    const { data, error } = await supabase
      .from("Posts")
      .select("Postid, Poster, Hours, Address, Description") // Select necessary fields
      .eq("Completed_Status", true); // Filter tasks where Completed_Status is true

    if (error) {
      console.error("Error fetching completed tasks:", error.message);
    } else {
      setCompletedPosts(data || []); // Set the completed tasks to state

      // Sum the Hours from the fetched posts
      const totalHours = data.reduce((sum, post) => sum + (post.Hours || 0), 0);
      setTHours(totalHours); // Set the total hours to state
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCompletedTasks(); // Fetch completed tasks when component mounts
  }, []);

  return (
    <div>
      <header>Completed Tasks</header>

      {/* Side Navigation */}
      <div
        id="mySidenav"
        className="sidenav"
        style={{ width: isOpen ? "250px" : "0" }}
      >
        <a href="javascript:void(0)" className="closebtn" onClick={toggleNav}>
          <IoCloseCircleOutline />
        </a>

        <Link to="/PostProfile">Profile</Link>
        <Link to="/display-listing">All Tasks</Link>
        <Link to="/ClientPage">Create/Edit/Delete Task</Link>
        <Link to="/PendingApproval">Pending Approval</Link>
        <Link to="/">Logout</Link>
      </div>

      {/* Open Navigation Button */}
      <span
        style={{
          fontSize: "30px",
          cursor: "pointer",
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
        onClick={toggleNav}
      >
        <CgProfile />
      </span>

      {/* Completed Task List */}
      <div className="task-grid">
        {completedPosts.length > 0 ? (
          completedPosts.map((post) => (
            <div key={post.Postid} className="task-card">
              <div className="task-details">
                <strong>Poster:</strong> {post.Poster} <br />
                <strong>Hours:</strong> {post.Hours} <br />
                <strong>Address:</strong> {post.Address} <br />
                <strong>Description:</strong> {post.Description} <br />
              </div>
            </div>
          ))
        ) : (
          <p>No Completed Tasks Found.</p>
        )}
      </div>

      <h3>Total Completed Hours: {tHours}</h3> {/* Display the sum of hours */}
    </div>
  );
}

export default CompletedStudent;
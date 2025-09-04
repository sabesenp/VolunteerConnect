import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
import supabase from "./Client"; // Ensure the Supabase client is correctly imported
import "./Nav.css";

function CompletedStudent() {
  // State to control the sidebar visibility
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]); // State to store fetched posts

  // Function to toggle sidebar
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  // Function to fetch posts where CanComplete is true
  const fetchCompletedTasks = async () => {
    const { data, error } = await supabase
      .from("Posts")
      .select("*")
      .eq("CanComplete", true); // Filter tasks where CanComplete is true

    if (error) {
      console.error("Error fetching completed tasks:", error.message);
    } else {
      setPosts(data || []);
    }
  };

  // Function to handle task completion
  const completeTask = async (taskId) => {
    try {
      const { error } = await supabase
        .from("Posts")
        .update({ Completed_Status: true }) // Set Completed_Status to true
        .eq("Postid", taskId); // Match task by its Postid

      if (error) {
        console.error("Error updating Completed_Status:", error.message);
        return;
      }

      // Refresh posts to reflect the change
      fetchCompletedTasks();
    } catch (err) {
      console.error("Error completing task:", err.message);
    }
  };

  // Fetch completed tasks on component mount
  useEffect(() => {
    fetchCompletedTasks();
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

        <Link to="/Profile">Profile</Link>
        <Link to="/Student">All Tasks</Link>
        <Link to="/accepted-tasks">Accepted Tasks</Link>
        <Link to="/Compl-tasks">Completed Tasks</Link>
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

      {/* Task List */}
      <div className="task-grid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.Postid} className="task-card">
              <div className="task-details">
                <strong>Poster:</strong> {post.Poster} <br />
                <strong>Hours:</strong> {post.Hours} <br />
                <strong>Address:</strong> {post.Address} <br />
                <strong>Description:</strong> {post.Description}
              </div>

              <div className="button-group">
                <button
                  className="Complete-button"
                  disabled={post.Completed_Status} // Disable if Completed_Status is true
                  style={{
                    backgroundColor: post.Completed_Status ? "#d3d3d3" : "#28a745", // Green if not completed
                    cursor: post.Completed_Status ? "not-allowed" : "pointer",
                  }}
                  onClick={() => completeTask(post.Postid)} // Mark the task as completed
                >
                  {post.Completed_Status ? "Task Completed" : "Complete Task"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Tasks Available to Complete.</p>
        )}
      </div>
    </div>
  );
}

export default CompletedStudent;
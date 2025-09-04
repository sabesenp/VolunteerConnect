import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import "./Card.css";
import { CgProfile } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
import supabase from "./Client";

function Student() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Toggle the side navigation open/close
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  // Fetch tasks from Supabase
  const fetchTasks = async () => {
    try {
      const { data: tasksData, error } = await supabase.from("Posts").select("*");
      if (error) {
        console.error("Error fetching tasks:", error.message);
        return;
      }

      setTasks(tasksData || []);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  // Accept task handler
  const acceptTask = async (task) => {
    try {
      // Update the "accepted" column in the database
      const { error } = await supabase
        .from("Posts")
        .update({ accepted: true }) // Set the accepted column to true
        .eq("Postid", task.Postid); // Match the task by its Postid

      if (error) {
        console.error("Error updating task:", error.message);
        return;
      }

      alert(`Task ${task.Postid} has been accepted.`);
      fetchTasks(); // Refresh tasks to reflect the update
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <header>All Tasks</header>

      {/* Side Navigation */}
      <div
        id="mySidenav"
        className="sidenav"
        style={{
          width: isOpen ? "250px" : "0",
        }}
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
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.Postid} className="task-card">
              <div className="task-details">
                <strong>Poster:</strong> {task.Poster} <br />
                <br />
                <strong>Hours:</strong> {task.Hours} <br />
                <br />
                <strong>Address:</strong> {task.Address} <br />
                <br />
                <strong>Description:</strong> {task.Description}
              </div>

              <button
                className="accept-button"
                disabled={task.accepted} // Disable if task is already accepted
                style={{
                  backgroundColor: task.accepted ? "#d3d3d3" : "#007BFF",
                  cursor: task.accepted ? "not-allowed" : "pointer",
                }}
                onClick={() => acceptTask(task)}
              >
                {task.accepted ? "Accepted" : "Accept Task"}
              </button>
            </div>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
}

export default Student;
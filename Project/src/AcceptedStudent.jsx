import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
import supabase from "./Client";
import "./Nav.css";
import "./Card.css";
import "./Button.css";

function AcceptedStudent() {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null); // Track current task for upload
  const [showPopup, setShowPopup] = useState(false); // Popup state for task completion

  // Toggle the side navigation open/close
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    const { data, error } = await supabase.from("Posts").select("*");
    if (error) {
      console.error("Error fetching posts:", error.message);
    } else {
      setPosts(data || []);
    }
  };

  // Simulate file upload and update "CanComplete" column
  const uploadProof = async (taskId) => {
    try {
      console.log(taskId);
      const { error } = await supabase
        .from("Posts")
        .update({ CanComplete: true }) // Update CanComplete column to true
        .eq("Postid", taskId); // Match the task by its APid

      if (error) {
        console.error("Error updating CanComplete column:", error.message);
        return;
      }

      // Refresh posts to reflect the change
      fetchPosts();
      setShowUploadModal(false); // Close modal after update
      setShowPopup(true); // Show completion popup
      setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  // Open upload modal
  const openUploadModal = (taskId) => {
    setCurrentTaskId(taskId);
    setShowUploadModal(true);
  };

  // Close upload modal
  const closeUploadModal = () => {
    setShowUploadModal(false);
  };

  // Load posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {/* Header */}
      <header>Accepted Tasks</header>

      {/* Side Navigation */}
      <div id="mySidenav" className="sidenav" style={{ width: isOpen ? "250px" : "0" }}>
        <a href="javascript:void(0)" className="closebtn" onClick={toggleNav}>
          <IoCloseCircleOutline />
        </a>
        <Link to="/Profile">Profile</Link>
        <Link to="/Student">All Tasks</Link>
        <Link to="/accepted-tasks">Accepted Tasks</Link>
        <Link to="/Compl-tasks">Completed Tasks</Link>
      </div>

      {/* Open Navigation Button */}
      <span
        style={{ fontSize: "30px", cursor: "pointer", position: "absolute", top: "20px", left: "20px" }}
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
          <br />
          <strong>Hours:</strong> {post.Hours} <br />
          <br />
          <strong>Address:</strong> {post.Address} <br />
          <br />
          <strong>Description:</strong> {post.Description}
        </div>

        <div className="button-group">
          <button
            className="Upload-button"
            disabled={post.CanComplete} // Disable if CanComplete is true
            style={{
              backgroundColor: post.CanComplete ? "#d3d3d3" : "#007BFF",
              cursor: post.CanComplete ? "not-allowed" : "pointer",
            }}
            onClick={() => openUploadModal(post.Postid)} // Pass the correct ID
          >
            {post.CanComplete ? "Proof Uploaded" : "Upload Proof"}
          </button>
        </div>
      </div>
    ))
  ) : (
    <p>No Accepted Tasks Yet.</p>
  )}
</div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="upload-modal">
          <div className="upload-modal-content">
            <h2>Upload Proof</h2>
            <p>Select an image to upload for the task.</p>
            <button onClick={() => uploadProof(currentTaskId)}>Simulate Upload</button>
            <button onClick={closeUploadModal}>Close</button>
          </div>
        </div>
      )}

      {/* Task Completed Popup */}
      {showPopup && (
        <div className="popup">
          Proof Uploaded Successfully!
        </div>
      )}
    </div>
  );
}

export default AcceptedStudent;

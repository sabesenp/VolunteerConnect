import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ClientPage.css'; // Add styling for this page
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
import "./Nav.css";
import { useState } from "react";


function ClientPage() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle sidebar
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="client-page">
      {/* Side Navigation */}
      <div id="mySidenav" className="sidenav" style={{ width: isOpen ? "250px" : "0", }}>
        <a href="javascript:void(0)" className="closebtn" onClick={toggleNav}> <IoCloseCircleOutline /> </a>
        
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

      <h1>Welcome to the Volunteer Management System</h1>
      <div className="button-group">
        <button onClick={() => navigate('/display-listing')} className="nav-button">
          Edit Listing
        </button>
        <button onClick={() => navigate('/delete-listing')} className="nav-button">
          Delete Listing
        </button>
        <button onClick={() => navigate('/post-request')} className="nav-button">
          Post Request
        </button>
      </div>
    </div>
  );
}

export default ClientPage;

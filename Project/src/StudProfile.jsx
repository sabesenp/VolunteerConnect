import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
import "./Nav.css";

function StudProfile() {

    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle sidebar
    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <header>Student</header>

            {/* Side Navigation */}
            <div id="mySidenav" className="sidenav" style={{ width: isOpen ? "250px" : "0", }}>
            <a href="javascript:void(0)" className="closebtn" onClick={toggleNav}> <IoCloseCircleOutline /> </a>
            
            <Link to="/Profile">Profile</Link>
            <Link to="/Student">All Tasks</Link>
            <Link to="/accepted-tasks">Pending Tasks</Link>
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
        </div>
    );
}

export default StudProfile;
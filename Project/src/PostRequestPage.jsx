import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { IoCloseCircleOutline } from 'react-icons/io5';
import supabase from './Client'; 
import './PostRequestPage.css';


function VolunteerRequestPage() {
  // State to store form data
  const navigate = useNavigate();
  const [poster, setPoster] = useState('');
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle sidebar
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!poster || !hours || !description || !address ) {
      setError('Please fill in all fields.');
      return;
    }

    // Create the volunteer request object
    const volunteerRequest = {
      Poster: poster,         // Match the exact casing
      Hours: hours,           
      Description: description, 
      Address: address        
    };

    try {
      // Insert the data into the Supabase database
      const { data, error } = await supabase
        .from('Posts') 
        .insert([volunteerRequest]);

      if (error) {
        setError('There was an error submitting your request. Please try again.');
        console.error(error);
      } else {
        console.log('Volunteer request submitted:', data);
        setSubmitted(true);
        setError('');
      }

      // Reset form fields
      setPoster('');
      setHours('');
      setDescription('');
      setAddress('');
    } catch (error) {
      console.error('Error submitting request:', error);
      setError('Error submitting request');
    }
  };

  return (
    <div className="post-request-page">
      <h2>Post a Volunteer Request</h2>

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

      {submitted && <p>Your request has been submitted successfully!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form className="post-request-form" onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <label htmlFor="poster">Full Name:</label>
            <input
              type="text"
              id="poster"
              value={poster}
              onChange={(e) => setPoster(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label htmlFor="hours">Hours:</label>
            <input
              type="number"
              id="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="How many hours"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a description of the task"
            required
          />
        </div>

        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <button type="submit">Post Request</button>
      </form>

      <button onClick={() => navigate(-1)} className="back-button">Back</button>


    </div>
  );
}

export default VolunteerRequestPage;

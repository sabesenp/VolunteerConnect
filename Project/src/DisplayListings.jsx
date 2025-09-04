import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { IoCloseCircleOutline } from 'react-icons/io5';
import supabase from './Client'; // Ensure this points to your Supabase client
import './Nav.css'; // Navigation styles
import './Card.css'; // Card grid styles

function DisplayListings() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const navigate = useNavigate(); // For redirecting to the edit page

  // Fetch all listings when the component mounts
  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase.from('Posts').select('*');

      if (error) {
        setError('Error fetching listings.');
        console.error(error);
      } else {
        setListings(data);
      }

      setLoading(false);
    };

    fetchListings();
  }, []);

  // Redirect user to the Edit Listing page with the specific listing ID
  const handleEdit = (Postid) => {
    navigate(`/edit-listing/${Postid}`);
  };

  // Toggle the sidebar navigation
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="display-listing-page">
      {/* Sidebar Navigation */}
      <div
        id="mySidenav"
        className="sidenav"
        style={{
          width: isOpen ? '250px' : '0',
        }}
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
          fontSize: '30px',
          cursor: 'pointer',
          position: 'absolute',
          top: '20px',
          left: '20px',
        }}
        onClick={toggleNav}
      >
        <CgProfile />
      </span>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Listings Content */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="task-grid">
          {listings.map((listing) => (
            <div key={listing.Postid} className="task-card">
              <div className="task-details">
                <p>
                  <strong>Poster:</strong> {listing.Poster}
                </p>
                <p>
                  <strong>Hours:</strong> {listing.Hours}
                </p>
                <p>
                  <strong>Description:</strong> {listing.Description}
                </p>
                <p>
                  <strong>Address:</strong> {listing.Address}
                </p>
              </div>
              <button
                className="accept-button"
                onClick={() => handleEdit(listing.Postid)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

       <button onClick={() => navigate(-1)} className="back-button">Back</button>
    </div>
  );
}

export default DisplayListings;

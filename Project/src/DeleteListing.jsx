import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { IoCloseCircleOutline } from 'react-icons/io5';
import supabase from './Client'; // Ensure this points to your configured Supabase client
import './DeleteListing.css'; // CSS file for styling
import './Nav.css'; // For navbar styles
import './Card.css'; // For card styles

function DeleteListing() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Toggle side navigation
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  // Fetch all listings on component mount
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

  // Handle delete functionality
  const handleDelete = async (Postid) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    const { error } = await supabase
      .from('Posts')
      .delete()
      .eq('Postid', Postid);

    if (error) {
      setError('Error deleting listing.');
      console.error('Supabase error:', error);
    } else {
      alert('Listing deleted successfully!');
      setListings((prevListings) => prevListings.filter((listing) => listing.Postid !== Postid));
    }
  };

  return (
    <div>
      {/* Side Navigation */}
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

      {/* Page Content */}
      <div className="delete-listing-page">
        <h2 color = "white">Delete a Volunteer Listing</h2>

        {error && <p className="error">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : listings.length > 0 ? (
          <div className="task-grid">
            {listings.map((listing) => (
              <div key={listing.Postid} className="task-card">
                <div className="task-details">
                  <p><strong>Poster:</strong> {listing.Poster}</p>
                  <p><strong>Hours:</strong> {listing.Hours}</p>
                  <p><strong>Address:</strong> {listing.Address}</p>
                  <p><strong>Description:</strong> {listing.Description}</p>
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(listing.Postid)}
                  style={{
                    backgroundColor: '#FF6347',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No listings available.</p>
        )}
      </div>

      <button onClick={() => navigate(-1)} className="back-button">Back</button>
    </div>
  );
}

export default DeleteListing;

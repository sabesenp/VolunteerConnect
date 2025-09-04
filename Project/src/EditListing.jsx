import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from './Client'; // Adjust to match your Supabase client path
import './EditListing.css'; // Import the CSS file for styling

function EditListing() {
  const { id } = useParams(); // Get the listing ID from the URL
  const navigate = useNavigate();

  const [poster, setPoster] = useState('');
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch the existing listing data
  useEffect(() => {
    const fetchListing = async () => {
      const { data, error } = await supabase
        .from('Posts') // Correct table name
        .select('*')
        .eq('Postid', id)
        .single();

      if (error) {
        setError('Error fetching the listing.');
        console.error(error);
        setLoading(false);
      } else {
        setPoster(data.Poster);
        setHours(data.Hours);
        setDescription(data.Description);
        setAddress(data.Address);
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!poster || !hours || !description || !address) {
      setError('Please fill in all fields.');
      return;
    }

    const updatedListing = {
      Poster: poster,
      Hours: hours,
      Description: description,
      Address: address,
    };

    try {
      const { error } = await supabase
        .from('Posts') // Correct table name
        .update(updatedListing)
        .eq('Postid', id); // Use Postid for matching

      if (error) {
        setError('Error updating the listing.');
        console.error(error);
      } else {
        navigate('/display-listing'); // Redirect to home after update
      }
    } catch (error) {
      console.error('Error updating listing:', error);
      setError('Error updating listing.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-listing-page">
      <h2>Edit Volunteer Listing</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form className="edit-listing-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="poster">Full Name:</label>
          <input
            type="text" // Correct input type
            id="poster"
            value={poster}
            onChange={(e) => setPoster(e.target.value)} // Correct state update
          />
        </div>

        <div>
          <label htmlFor="hours">Number of Hours:</label>
          <input
            type="number" // Correct input type
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)} // Correct state update
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Correct state update
          />
        </div>

        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text" // Correct input type
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)} // Correct state update
          />
        </div>

        <button type="submit">Update Listing</button>
      </form>
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
    </div>
  );
}

export default EditListing;


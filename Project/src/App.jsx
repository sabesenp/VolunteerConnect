import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Student from './Student';
import ClientPage from './ClientPage';
import AcceptedStudent from './AcceptedStudent';
import CompletedStudent from './CompletedStudent';
import PostRequestPage from './PostRequestPage';
import EditListing from './EditListing';
import DeleteListing from './DeleteListing';
import DisplayListings from './DisplayListings';
import StudProfile from './StudProfile';
import PendingApproval from './PendingApproval';
import PostProfile from './PostProfile';
import { handleSignup, handleLogin } from './Authentication';
import './App.css';

function App() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Student'); // Default role
    const [message, setMessage] = useState('');

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <h1>Welcome to Volunteer Connect!</h1>
                            <div className="main">
                                <input type="checkbox" id="chk" aria-hidden="true" />

                                {/* Signup Form */}
                                <div className="signup">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSignup(email, password, role, setMessage);
                                        }}
                                    >
                                        <label htmlFor="chk" aria-hidden="true">Sign up</label>
                                        {message && (
                                            <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                                                {message}
                                            </p>
                                        )}
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                                            <option value="Student">Student</option>
                                            <option value="Poster">Poster</option>
                                        </select>
                                        <button type="submit">Sign up</button>
                                    </form>
                                </div>

                                {/* Login Form */}
                                <div className="login">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleLogin(email, password, setMessage, navigate);
                                        }}
                                    >
                                        <label htmlFor="chk" aria-hidden="true">Login</label>
                                        {message && (
                                            <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                                                {message}
                                            </p>
                                        )}
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button type="submit">Login</button>
                                    </form>
                                </div>
                            </div>
                        </>
                    }
                />
                <Route path="/Student" element={<Student />} />
                <Route path="/accepted-tasks" element={<AcceptedStudent />} />
                <Route path="/Compl-tasks" element={<CompletedStudent />} />
                <Route path="/Profile" element={<StudProfile />} />
                <Route path="/ClientPage" element={<ClientPage />} />
                <Route path="/PostProfile" element={<PostProfile />} />
                <Route path="/PendingApproval" element={<PendingApproval />} />
                <Route path="/post-request" element={<PostRequestPage />} />
                <Route path="/edit-listing/:id" element={<EditListing />} />
                <Route path="/delete-listing" element={<DeleteListing />} />
                <Route path="/display-listing" element={<DisplayListings />} />
            </Routes>
        </>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;

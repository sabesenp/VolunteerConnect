import React from 'react';
import supabase from './Client';

// Function to handle user signup
export const handleSignup = async (email, password, role, setMessage) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { display_name: role }, // Store role as display_name
            },
        });

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            setMessage('Signup successful! Please check your email to confirm your account.');
        }
    } catch (err) {
        setMessage(`An unexpected error occurred: ${err.message}`);
    }
};

// Function to handle user login
export const handleLogin = async (email, password, setMessage, navigate) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            const user = data.user;
            if (user) {
                const role = user.user_metadata?.display_name;

                setMessage('Logged in successfully!');
                if (role === 'Student') {
                    navigate('/Student');
                } else if (role === 'Poster') {
                    navigate('/ClientPage');
                } else {
                    setMessage('Role not recognized. Please contact support.');
                }
            } else {
                setMessage('User information is unavailable. Please try again.');
            }
        }
    } catch (err) {
        setMessage(`An unexpected error occurred: ${err.message}`);
    }
};

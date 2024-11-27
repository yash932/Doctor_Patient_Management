import React, { useState } from 'react';
import axios from 'axios';
import '../css/register.css'

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [contact, setContact] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const data = {
                email,
                username,
                password,
                role,
                ...(role === 'doctor' && { specialization, contact }),
            };
            await axios.post('http://localhost:4000/api/auth/register', data);
            alert('Registration successful! Please log in.');
        } catch (error) {
            console.error('Registration failed', error);
            if (error.response) {
                setError(`Registration failed: ${error.response.data.error}`);
            } else {
                setError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />
                <label>Role:</label>
                <select
                    value={role}
                    onChange={(e) => {
                        setRole(e.target.value);
                        if (e.target.value !== 'doctor') {
                            setSpecialization('');
                            setContact('');
                        }
                    }}
                    required
                >
                    <option value="" disabled>Select your role</option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select>
                {role === 'doctor' && (
                    <>
                        <label>Specialization:</label>
                        <input
                            type="text"
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                            placeholder="Enter your specialization"
                            required
                        />
                        <label>Contact:</label>
                        <input
                            type="number"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="Enter your contact number"
                            required
                        />
                    </>
                )}
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
};

export default Register;

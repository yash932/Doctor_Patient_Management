import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

const Login = ({ setToken, setPatientId, setUsername, setRole, setDoctorId }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
            const { token, userId, username, role, doctorId: receivedDoctorId } = response.data;

            setToken(token);
            setPatientId(userId);
            setUsername(username);
            setRole(role);
            localStorage.setItem('token', token);
            localStorage.setItem('patientId', userId);
            localStorage.setItem('role', role);

            if (role === 'doctor') {
                setDoctorId(receivedDoctorId);
                localStorage.setItem('doctorId', receivedDoctorId);
                navigate('/doctor-dashboard'); 
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed', error.response ? error.response.data : error);
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p>
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/status.css';

const Status = ({ patientId, userRole }) => {
    const [consultations, setConsultations] = useState([]);

    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/consultations/status/${patientId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setConsultations(response.data);
            } catch (error) {
                console.error('Error fetching consultation status:', error);
                alert('Failed to load consultation status. Please try again later.');
            }
        };
    
        if (userRole === 'patient') {
            fetchConsultations();
        }
    }, [patientId, userRole]);

    return (
        <div className="status-container">
            <h2>Consultation Status</h2>
            {consultations.length === 0 ? (
                <p>No consultations found.</p>
            ) : (
                <ul className="status-list">
                    {consultations.map(consultation => (
                        <li key={consultation.id} className="status-card">
                            <h3>{new Date(consultation.dateTime).toLocaleString()}</h3>
                            <p>Status: {consultation.status}</p>
                            <p>Doctor: {consultation.doctorName}</p>
                            <p>Specialty: {consultation.specialty}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Status;

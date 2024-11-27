import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/counsltant.css'

const DoctorConsultationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [newDateTime, setNewDateTime] = useState(null); 
    const [updatingId, setUpdatingId] = useState(null); 

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/doctors/requests', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching consultation requests:', error);
            }
        };

        fetchRequests();
    }, []);

    const updateStatus = async (requestId, newStatus, newDateTime) => {
        console.log('Updating status for ID:', requestId, 'New Status:', newStatus, 'New DateTime:', newDateTime);

        try {
            await axios.put(`http://localhost:4000/api/doctors/requests/${requestId}/status`, { status: newStatus, newDateTime }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            setRequests((prevRequests) =>
                prevRequests.map((req) => 
                    req.id === requestId ? { ...req, status: newStatus, dateTime: newDateTime || req.dateTime } : req
                )
            );
            alert('Status updated successfully!');
            setUpdatingId(null); 
            setNewDateTime(null); 
        } catch (error) {
            console.error('Error updating status:', error);
            alert(`Failed to update status: ${error.response ? error.response.data.error : error.message}`);
        }
    };

    const handleChangeTime = (requestId) => {
        setUpdatingId(requestId); 
    };

    const handleDateChange = (event) => {
        setNewDateTime(event.target.value); 
    };

    return (
        <div className="requests-container">
            <h2 className="title">Consultation Requests</h2>
            {requests.length === 0 ? (
                <p>No consultation requests available.</p>
            ) : (
                <div className="cards-container">
                    {requests.map(request => (
                        <div key={request.id} className="request-card">
                            {request.imageUrl && (
                                <img 
                                    src={request.imageUrl} 
                                    alt="Consultation"
                                    className="request-image"
                                />
                            )}
                            <div className="request-info">
                                <h3 className="patient-name">{request.patientUsername}</h3>
                                <p className="requested-time">Requested Time: {request.dateTime ? new Date(request.dateTime).toLocaleString() : 'N/A'}</p>
                                <p className="status">Status: {request.status}</p>
                                
                                {request.status === 'Accepted' && updatingId === request.id && (
                                    <div className="time-change">
                                        <input 
                                            type="datetime-local" 
                                            value={newDateTime || ''}
                                            onChange={handleDateChange}
                                            className="datetime-input"
                                        />
                                        <button 
                                            onClick={() => updateStatus(request.id, 'Accepted', newDateTime)}
                                            className="save-time-btn"
                                        >
                                            Save Time
                                        </button>
                                    </div>
                                )}
                                
                                <div className="action-buttons">
                                    {request.status === 'pending' && (
                                        <>
                                            <button 
                                                onClick={() => updateStatus(request.id, 'Accepted')}
                                                className="accept-btn"
                                            >
                                                Accept
                                            </button>
                                            <button 
                                                onClick={() => updateStatus(request.id, 'Rejected')}
                                                className="reject-btn"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    {request.status === 'Accepted' && (
                                        <>
                                            <button 
                                                onClick={() => handleChangeTime(request.id)}
                                                className="change-time-btn"
                                            >
                                                Change Time
                                            </button>
                                            <button 
                                                onClick={() => updateStatus(request.id, 'Confirmed')}
                                                className="confirm-btn"
                                            >
                                                Confirm
                                            </button>
                                        </>
                                    )}
                                    {request.status === 'Confirmed' && (
                                        <button 
                                            onClick={() => updateStatus(request.id, 'Completed')}
                                            className="complete-btn"
                                        >
                                            Complete
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DoctorConsultationRequests;

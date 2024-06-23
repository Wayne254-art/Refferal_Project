// src/components/WithdrawalRequests.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './withdrawal.css';
import { fetchWithdrawalRequests, updateWithdrawalStatus } from '../../Redux/actions/withdrawals.actions';

const WithdrawalRequests = () => {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((state) => state.withdrawals);

  useEffect(() => {
    dispatch(fetchWithdrawalRequests());
  }, [dispatch]);

  const handleComplete = (requestId) => {
    dispatch(updateWithdrawalStatus(requestId));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="withdrawal-requests">
      <h1>Withdrawal Requests</h1>
      {requests.length === 0 ? (
        <p>No withdrawal requests found</p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li key={request.activityId} style={{ marginBottom: '10px' }}>
              <p>Activity ID: {request.activityId}</p>
              <p>User ID: {request.userId}</p>
              <p>Amount: {request.activityAmount}</p>
              <p>Status: {request.activityStatus}</p>
              <button
                onClick={() => handleComplete(request.activityId)}
                disabled={request.activityStatus === 'completed'}
                style={{
                  backgroundColor: request.activityStatus === 'completed' ? 'green' : 'red',
                  color: 'white',
                  cursor: request.activityStatus === 'completed' ? 'not-allowed' : 'pointer',
                }}
              >
                {request.activityStatus === 'completed' ? 'Completed' : 'Mark as Complete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WithdrawalRequests;

import React from 'react';
import '../Styles/earn.css';
import AsideNavbar from '../Components/AsideNavbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Earn = () => {
  const { user } = useSelector((state) => state.user);
  const { deposit } = useSelector((state) => state.deposit);

  const bonus = (500.00*.2).toFixed(2)


  return (
    <>
      <AsideNavbar />
      <div className="earn-page" style={{ color: '#ff2020', backgroundColor: '#f5f5f5' }}>
        <h1>Hi {user.username}!</h1>
        <p style={{ marginBottom: '20px', marginTop: '20px' }}>
          Here is a summary of your earnings. Keep up the great work!
        </p>
        <div className="earn-container">
          <div className="earn-item">
            <h2>Kes.{user?.totalBalance.toLocaleString()}</h2>
            <span>Ultimate Balance</span>
          </div>
          <div className="earn-item">
            <h2>Kes.15000</h2>
            <span>Total Payout</span>
          </div>
          <div className="earn-item">
            <h2>Kes.{deposit !== null ? deposit.toLocaleString() : '0.00'}</h2>
            <span>Total Deposit</span>
          </div>
          <div className="earn-item">
            <h2>Kes.3000</h2>
            <span>Pending withdrawal</span>
          </div>
          <div className="earn-item">
            <h2>Kes.{bonus}</h2>
            <span>20% Bonus</span>
          </div>
          <div className="earn-item">
            <h2>Kes.7000</h2>
            <span>Referral Bonus</span>
          </div>
          <div className="earn-item">
            <h2>Kes.7000</h2>
            <span>Referral Earnings</span>
          </div>
          <div className="earn-item">
            <h2>Kes.30000</h2>
            <span>Total Withdrawn</span>
          </div>
          <div className="earn-item">
            <h2>Kes.6000</h2>
            <span>Today's Earning</span>
          </div>
          <div className="earn-item">
            <h2>30</h2>
            <span>Active Referrals</span>
          </div>
          <div className="earn-item">
            <h2>78</h2>
            <span>Your Referrals</span>
          </div>
          <div className="earn-item">
            <h2>Kes.76000</h2>
            <span>Total Ref. Earnings</span>
          </div>
        </div>
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '30px',
            color:'black',
          }}
        >
          Developed by{' '}
          <Link
            to="https://www.instagram.com/wayne_marwa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            style={{ color: '#FF4433', textDecoration: 'none' }}
          >
            @Wayne_Marwa.ke
          </Link>
        </p>
      </div>
    </>
  );
};

export default Earn;
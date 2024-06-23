
import React, { useEffect } from 'react'
import '../Styles/dashboard.css'
import AsideNavbar from '../Components/AsideNavbar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeposit } from '../Redux/actions/deposits.actions';

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user);
    const { deposit, loading, error } = useSelector((state) => state.deposit);
  
    useEffect(() => {
      if (user?.userId) {
        dispatch(fetchDeposit(user.userId));
      }
    }, [dispatch, user.userId]);
  
    useEffect(() => {
      if (!loading && deposit !== null && deposit <= 499) {
        navigate(`/payment/${user.userId}`);
      }
    }, [loading, deposit, user.userId, navigate]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <AsideNavbar />
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <h1>Welcome To our Community!</h1>
                    <p style={{ fontWeight: 'bold',marginBottom:'20px' }}>Hi 👋 {user?.username}, You are one step away from winning!</p>
                    <div className="referral-info">
                        <h2>Start earning now.</h2>
                        <h2>Refer a friend or family member.</h2>
                        <h2>Earn rewards on every approved referral.</h2>
                        <h4>MORE FRIENDS CAN LEAD TO MORE REWARDS FOR YOU.</h4>
                        <p>For approved referrals, you will earn:</p>
                        <div className="reward-tier">
                            <p>REFER</p>
                            <h2>1</h2>
                            <p>FRIEND</p>
                            <p>EARN</p>
                            <h2>50</h2>
                            <p>REWARD</p>
                        </div>
                        <div className="reward-tier">
                            <p>REFER</p>
                            <h2>3</h2>
                            <p>FRIENDS</p>
                            <p>EARN</p>
                            <h2>170</h2>
                            <p>REWARD</p>
                        </div>
                        <div className="reward-tier">
                            <p>REFER</p>
                            <h2>5</h2>
                            <p>FRIENDS</p>
                            <p>EARN</p>
                            <h2>300</h2>
                            <p>REWARD</p>
                        </div>
                        <div className="reward-tier">
                            <p>REFER</p>
                            <h2>10</h2>
                            <p>FRIENDS</p>
                            <p>EARN</p>
                            <h2>700</h2>
                            <p>REWARD</p>
                        </div>
                        <h2>NB: Your first deposit gives you 20% back</h2>
                        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:'30px' }}>Developed by <Link to='https://www.instagram.com/wayne_marwa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' style={{color: '#FF4433', textDecoration: 'none'}}>@Wayne_Marwa.ke</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard
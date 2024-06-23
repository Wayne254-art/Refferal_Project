
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminAsideNavbar = () => {
    
    const { user} = useSelector(
        (state) => state.user
      );


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

//   console.log(user)

  return (
    <>
      <button className="menu-button" onClick={toggleSidebar}>
        ☰
      </button>
      <aside className={`aside-navbar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="profile">
                    <img
                        src={user?.imageUrl}
                        alt="Profile"
                        className="profile-image"
                        style={{ cursor: 'pointer' }}
                    />
                    <input
                        type="file"
                        id="profileImageInput"
                        style={{ display: 'none' }}
                    />
                    <div className="profile-details">
                        <h3>{`${user.firstName} ${user.lastName}`}</h3>
                        <p>{user.email}</p>
                    </div>
                </div>
        <button className="logout-button">Logout</button>
        <nav>
          <ul>
            <br />
            <li><Link to="">Dashboard</Link></li>
            <li><Link to="/mail">Mails</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/referrals">Referrals</Link></li>
            <li><Link to="/withdrawal-requests">Withdrawal</Link></li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AdminAsideNavbar;



import React from 'react'
import './dashboard.css'
import AdminAsideNavbar from '../components/AdminAsideNavbar';

const dashboard = () => {
    return (
        <>
        <AdminAsideNavbar/>
            <div className="admin-dashboard">
                <div className="dashboard-content">
                    <h1>Admin Dashboard</h1>
                    <div className="stats">
                        <div className="stat-item">
                            <h3>Total Deposits</h3>
                            <p>Kes. totalDeposits</p>
                        </div>
                        <div className="stat-item">
                            <h3>Total Withdrawals</h3>
                            <p>Kes. totalWithdrawals</p>
                        </div>
                    </div>
                    <div className="table-container">
                        <h2>Users</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Is Admin</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>id</td>
                                    <td>username</td>
                                    <td>email</td>
                                    <td>contact</td>
                                    <td>
                                        <button>View More</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="table-container">
                        <h2>Referrals</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Referrer ID</th>
                                    <th>Referral Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>id</td>
                                    <td>userid</td>
                                    <td>Date</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default dashboard
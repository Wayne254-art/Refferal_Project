import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/asidenavbar.css";
import { useSelector } from "react-redux";
import { server } from "../config/serverapi";
import axios from "axios";
import { toast } from "react-toastify";

const AsideNavbar = () => {
  const { user } = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [deposit, setDeposit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeposit = async () => {
      try {
        const { data } = await axios.get(
          `${server}/activity/get-totalDeposits/${user.userId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setDeposit(data.totalDeposits);
        console.log(data);
      } catch (error) {
        console.log(error);
        toast.error(
          error?.response?.data?.message ||
            "Error fetching total account balance"
        );
      }
    };

    fetchDeposit();
  }, [user.token, user.userId]);

  if (!deposit) {
    navigate(`/payment/${user.userId}`);
  }

  // console.log(user)
  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/auth/logout-user`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success(response.data.message);
      window.location.reload(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };
  return (
    <div style={{ marginLeft: "10px" }}>
      <button className="menu-button" onClick={toggleSidebar}>
        ☰
      </button>
      <aside className={`aside-navbar ${isSidebarOpen ? "open" : ""}`}>
        <div className="profile">
          <img
            src={user?.avatar}
            alt="Profile"
            className="profile-image"
            style={{ cursor: "pointer" }}
          />
          <input
            type="file"
            id="profileImageInput"
            style={{ display: "none" }}
          />
          <div className="profile-details">
            <h3>{`${user?.firstName} ${user?.lastName}`}</h3>
            <p>{user.email}</p>
          </div>
        </div>
        <button className="logout-button" onClick={handleLogOut}>
          Logout
        </button>
        <nav>
          <ul>
            <br />
            <li>
              <Link to={`/dashboard/${user.userId}`}>Dashboard</Link>
            </li>
            <li>
              <Link to={`/share/${user.userId}`}>Share</Link>
            </li>
            <li>
              <Link to={`/earn/${user.userId}`}>Earn</Link>
            </li>
            <li>
              <Link to={`/getpaid/${user.userId}`}>Get Paid</Link>
            </li>
            <li>
              <Link to={`/settings/${user.userId}`}>Account Setting</Link>
            </li>
            <li>
              <Link to={`/contact/${user.userId}`}>Contact-us</Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default AsideNavbar;

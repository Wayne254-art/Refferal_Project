import React, { useEffect, useState } from "react";
import "../Styles/payment.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../config/serverapi";
import { toast } from "react-toastify";
import { fetchDeposit } from "../Redux/actions/deposits.actions";

const Payment = () => {
  const { user } = useSelector((state) => state.user);
  const { deposit, loading, error } = useSelector((state) => state.deposit);

  const UniqueCharOTP = (length) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const transactionId = () => {
    const charPart = UniqueCharOTP(8);
    return charPart;
  };
  const getFormattedTimestamp = () => {
    const date = new Date(Date.now()); // Add 1 hour (3600000 milliseconds)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const [formData, setFormData] = useState({
    userId: user.userId,
    activityAmount: 500,
    transactionId: transactionId(),
    paymentDate: getFormattedTimestamp(),
    phoneNumber: user.phoneNumber,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.userId) {
      dispatch(fetchDeposit(user.userId));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!loading && deposit !== null && deposit > 499) {
      navigate(`/verification/${user.userId}`);
    }
  }, [loading, deposit, user.userId, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      const  response = await axios.post(
        `${server}/activity/add-deposit`,
        formData,
        { withCredentials: true }
      );

      toast.success(response.data.message);
      // console.log(response.data.message)
      navigate(`/verification/${user.userId}`)
    } catch (error) {
        toast.error(error.response.data.message || `Something went wrong`);
    }
  };

  return (
    <div
      className="cover g-bg-img-hero cover g-flex-centered g-pos-rel g-py-100"
      id="cover-picture-GRC004-0"
      style={{ height: "100vh" }}
    >
      <div className="payment-container">
        <h4 style={{ marginBottom: "20px" }}>Make a Payment</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="phoneNumber" />
          <input
            type="text"
            id="phoneNumber"
            placeholder="contact"
            value={user.phoneNumber}
            readOnly
          />
          <label htmlFor="amount" />
          <input
            type="number"
            id="amount"
            placeholder="amount"
            value={500}
            readOnly
          />
          <button type="submit" disabled={loading}>
            {loading ? `Processing` : `Pay Now`}
          </button>
        </form>
        {/* {paymentStatus && <p className="payment-status">{paymentStatus}</p>} */}
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          Made Payment?{" "}
          <Link to={`/verification/${user.userId}`} className="signup-link">
            Continue
          </Link>
        </p>
      </div>
      <div className="button-container">
        <button className="button">Logout</button>
      </div>
    </div>
  );
};

export default Payment;

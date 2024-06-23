import React, { useEffect, useState } from "react";
import "../Styles/get-paid.css";
import AsideNavbar from "../Components/AsideNavbar";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../config/serverapi";

const GetPaid = () => {
  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(null);
  const [amount, setAmount] = useState(0);

  // console.log(user)

  const [deposit, setDeposit] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDeposit = async () => {
      try {
        const { data } = await axios.get(`${server}/activity/get-totalDeposits/${user.userId}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setDeposit(data.totalDeposits)
        // console.log(data);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || 'Error fetching total account balance');
      }
    };

    fetchDeposit();
  }, [user.token, user.userId]);

  if (deposit === 0 || deposit=== null) {
    navigate(`/payment/${user.userId}`)
  }

  const balance = user.totalBalance.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

//   console.log(balance);

const handleSubmit = async (e) => {
  e.preventDefault();
  // setLoading(true);
  try {
    const  response = await axios.post(
      `${server}/activity/add-withdrawal-request/${user.userId}`,
      {activityAmount:amount, phoneNumber: user.phoneNumber},
      { withCredentials: true }
    );

    toast.success(response.data.message);
    // console.log(response.data.message)
    navigate(`/dashboard/${user.userId}`)
  } catch (error) {
      toast.error(error?.response?.data?.message || `Something went wrong`);
  }
};

  return (
    <>
      <AsideNavbar />
      <div className="signup-container">
        <form className="transaction-form" onSubmit={handleSubmit}>
          <h1>Withdraw Funds</h1>

          <h2>
            Account Balance: <span>Kes.{balance}</span>
          </h2>

          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount (Minimum is 200)"
            required
          />
          <button
            type="submit"
            disabled={loading || balance <= 199}
            title={balance <= 199 ? "Insufficient balance to withdraw" : ""}
          >
            {loading ? "Processing..." : "Withdraw"}
          </button>
        </form>
      </div>
    </>
  );
};

export default GetPaid;

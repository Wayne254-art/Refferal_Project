import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Pages/dashboard";
import Admindashboard from "./Admin/Dashboard/admindashboard";
import Share from "./Pages/Share";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Getpaid from "./Pages/Getpaid";
import Earn from "./Pages/Earn";
import Payment from "./Pages/Payment";
import Verification from "./Pages/Verification";
import Activation from "./Pages/Activation.js";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { useSelector } from "react-redux";
import Store from "./Redux/store.js";
import { loadUser } from "./Redux/actions/user.actions.js";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import ContactUs from "./Pages/ContactUs.js";
import Settings from "./Pages/Settings.js";
import WithdrawalRequests from "./Admin/withdrawals/withdrawal.js";

function App() {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path="/withdrawal-request" element={<WithdrawalRequests />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/activate/:token" element={<Activation />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
        <Route
          path="/dashboard/:userId"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/share/:userId"
          element={
            <ProtectedRoutes>
              <Share />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/getpaid/:userId"
          element={
            <ProtectedRoutes>
              <Getpaid />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/earn/:userId"
          element={
            <ProtectedRoutes>
              <Earn />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/payment/:userId"
          element={
            <ProtectedRoutes>
              <Payment />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/verification/:userId"
          element={
            <ProtectedRoutes>
              <Verification />
            </ProtectedRoutes>
          }
        />
        <Route path="/contact/:userId" element={
            <ProtectedRoutes>
              <ContactUs />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/settings/:userId"
          element={
            <ProtectedRoutes>
              <Settings />
            </ProtectedRoutes>
          }
        />
      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;

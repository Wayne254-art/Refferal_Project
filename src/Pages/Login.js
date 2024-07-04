import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../config/serverapi";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../Redux/actions/user.actions";
import { toast } from "react-toastify";

const Login = () => {
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${server}/auth/login-user`, formData, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      window.location.reload(true)

      if(user.role ==="Admin"){
        navigate(`/admidashboard`);
      }
      navigate(`/dashboard/${user.userId}`);
      dispatch(loadUser());
    } catch (error) {
      toast.error(error.response?.data?.message ||`something went wrong please try again latter`);
    }
  };
  

  useEffect(() => {
    if (isAuthenticated === true ) {
      navigate(`/payment/${user.userId}`);
    }
  }, [isAuthenticated,loading, error, navigate]);

  return (
    <div
      className="cover g-bg-img-hero cover g-flex-centered g-pos-rel g-py-100"
      id="cover-picture-GRC004-0"
    >
      <div className="signup-container">
        <form
          className="signup-form"
          style={{ color: "#00d134" }}
          onSubmit={handleSubmit}
        >
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            Welcome Back!
          </h1>
          <h4 style={{ display: "flex", justifyContent: "center",marginBottom:'20px'}}>
            Login with your details to continue
          </h4>
          {error && <p style={{ color: "red", padding: "10px" }}>{error}</p>}
          <input
            type="text"
            placeholder="Email, Username or Phone"
            name="identifier"
            id="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            Don't have an account?{" "}
            <a href="/signup" className="signup-link">
              Signup
            </a>
          </p>
         <Link to={`/forgot-password`} style={{marginTop:'20px'}}>Forgot password</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;

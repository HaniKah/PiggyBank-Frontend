import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import "./styles/login.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import loadingSpinner from "./svgCategories/loadingSpinner.gif";
import { ReactComponent as Cornerleft } from "./svgCategories/cornerleft.svg";
import { ReactComponent as Cornerright } from "./svgCategories/cornerright.svg";

import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    console.log(`Email:${email},Password:${password}`);

    // const url = `${process.env.REACT_APP_BACKEND_URL}/users/login`

    // console.log("login URL:", url)

    const response = await fetch(
      `http://${process.env.REACT_APP_URL}/users/login`,
      // url,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      // setTimeout(() => {
      localStorage.setItem("token", data.token);
      setIsLoading(false);
      login(data.token);
      // }, 5000);
    }

    if (data.token !== null && data.token !== undefined) {
      navigate("/dashboard");
    }
  };

  const CustomButton = styled(Button)({
    "&:hover": {
      backgroundColor: "#ffa726",
      transform: "scale(1.05)",
    },
  });

  return (
    <Container maxWidth="sm">
      {isLoading ? (
        <div className="spinner-div">
          <img className="spinner" src={loadingSpinner} alt="spinner" />
          <h5 className="loading-txt">Loading ...</h5>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            minHeight: "100vh",
            paddingTop: "50px",
          }}
        >
          <div className="logo-container">
            <h1 className="logo-title-login">
              Piggy<span className="bank">Bank</span>
            </h1>
          </div>
          <FormControl fullWidth className="login-container">
            <TextField
              id="login-emailinput"
              type="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Please enter your Email"
              sx={{
                borderRadius: "31px",
                "& fieldset": {
                  borderRadius: "30px",
                },
                "& input": {
                  fontSize: "16px", // Customize the font size here
                },
              }}
            >
              {" "}
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="login-passwordinput"
              type="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Please enter your Password"
              sx={{
                borderRadius: "31px",
                "& fieldset": {
                  borderRadius: "30px",
                },
                "& input": {
                  fontSize: "16px", // Customize the font size here
                },
              }}
            ></TextField>
            <Box
              sx={{
                padding: "20px",
              }}
            >
              <button onClick={handleSubmit} className="login">
                Sign in
              </button>
              <p>Don't have an account?</p>
              <NavLink to="/signup" className="backtosignup">
                Signup here
              </NavLink>
              {error && <div className="error">⚠ {error}</div>}
            </Box>
          </FormControl>
        </Box>
      )}
    </Container>
  );
}

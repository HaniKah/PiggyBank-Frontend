import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import countryList from "./Countrylist";
import React from "react";
import "./styles/signup.css";
import Container from "@mui/material/Container";
import { ReactComponent as Cornerleft } from "./svgCategories/cornerleft.svg";
import { ReactComponent as Cornerright } from "./svgCategories/cornerright.svg";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { InputLabel, TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [country_code, setCountry_code] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const response = await fetch(
      "https://piggybank-api.onrender.com/users/signup",
      // `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          country_code,
          first_name,
          last_name,
        }),
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
      <Cornerright className="cornerright" />
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <CircularProgress sx={{ color: "#b9b9b9" }} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            minHeight: "100vh",
            padding: "10px",
            paddingTop: "40px",
          }}
        >
          <FormControl fullWidth className="signup-container">
            <TextField
              id="firstnameinput"
              label="First name"
              type="text"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
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
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="lastnameinput"
              label="Last name"
              type="text"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
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
          </FormControl>
          <FormControl fullWidth>
            <InputLabel className="country">Country</InputLabel>
            <Select
              id="countryselectinput"
              value={country_code}
              onChange={(e) => setCountry_code(e.target.value)}
              sx={{
                borderRadius: "31px",
                "& fieldset": {
                  borderRadius: "30px",
                },
                fontSize: "16px",
              }}
            >
              <MenuItem value="US" sx={{ fontSize: "16px" }}>
                US
              </MenuItem>
              <MenuItem value="DE" sx={{ fontSize: "16px" }}>
                DE
              </MenuItem>
              {countryList
                .filter(
                  (countryCode) => countryCode !== "US" && countryCode !== "DE"
                )
                .map((countryCode) => (
                  <MenuItem
                    key={countryCode}
                    value={countryCode}
                    sx={{ fontSize: "16px" }}
                  >
                    {countryCode}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="emailinput"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                borderRadius: "31px",
                "& fieldset": {
                  borderRadius: "30px",
                },
                "& input": {
                  fontSize: "16px", // Customize the font size here
                },
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="passwordinput"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                borderRadius: "31px",
                "& fieldset": {
                  borderRadius: "30px",
                },
                "& input": {
                  fontSize: "16px", // Customize the font size here
                },
              }}
            />
            <Box
              sx={{
                padding: "30px",
              }}
            >
              <CustomButton
                sx={{
                  ":hover": { bgcolor: "#C42B0A" },
                  borderRadius: "31px",
                  background: "#c80048",
                  width: "150px",
                  height: "50px",
                  // margin: "20px",
                  color: "white",
                  fontSize: "16px",
                  padding: "5px 80px",
                }}
                onClick={handleSubmit}
                className="signup"
              >
                Register
              </CustomButton>
              <p> Already have an account?</p>
              <NavLink to="/login" className="backtologin">
                Login here
              </NavLink>
              {error && <div className="error">{error}</div>}
            </Box>
          </FormControl>
        </Box>
      )}
      <Cornerleft className="cornerleft" />
    </Container>
  );
}

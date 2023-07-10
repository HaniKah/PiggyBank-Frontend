import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import "../components/styles/LandingPage2.css";
import { ReactComponent as Cornerleft } from "./svgCategories/cornerleft.svg";
import { ReactComponent as Cornerright } from "./svgCategories/cornerright.svg";
import { ReactComponent as Logo } from "./svgCategories/piggyBank-logo.svg";
// import { ReactComponent as Welcoming } from "./svgCategories/welcoming.svg";
import welcoming from "./images/welcoming.jpg";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

export default function LandingPage2() {
  const navigate = useNavigate();

  const handelRegister = () => {
    navigate("/signup");
  };

  const handelLogin = () => {
    navigate("/login");
  };

  const CustomButton = styled(Button)({
    "&:hover": {
      transform: "scale(1.05)",
    },
  });

  return (
    <Container
      className="landingPage"
      sx={{
        maxWidth: "sm",
        minHeight: "100vh",
      }}
    >
      <Cornerright className="cornerright" />
      {/* <Welcoming /> */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap="20px"
      >
        <Box
          sx={{
            marginBottom: "1.5em",
          }}
        >
          <Logo />
          <h1 className="logo-title">
            <span>Piggy</span>Bank
          </h1>
        </Box>

        <button className="btn-landingPage" onClick={handelRegister}>
          REGISTER
        </button>

        <button className="btn-landingPage" onClick={handelLogin}>
          LOGIN
        </button>
      </Box>

      <Cornerleft className="cornerleft" />
    </Container>
  );
}

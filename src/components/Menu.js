import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import Home from './svg/IconHome';
// import Planner from './svg/IconPlanner';
// import Transactions from './svg/IconTransactions';
// import Graph from './svg/IconGraph';
// import Games from './svg/IconGame'
import Paper from "@mui/material/Paper";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import DonutSmallOutlinedIcon from "@mui/icons-material/DonutSmallOutlined";
import { Container } from "@mui/system";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Menu() {
  const [value, setValue] = useState("home");
  const navigate = useNavigate();

  const { styling } = useContext(ThemeContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("value", newValue);

    if (newValue === "home") {
      navigate("/dashboard");
    }

    if (newValue === "planner") {
      navigate("/budget");
    }

    if (newValue === "transactions") {
      navigate("/transactions");
    }

    if (newValue === "reports") {
      navigate("/reports");
    }
  };

  return (
    <Container sx={{ maxWidth: "600px" }}>
      <Paper
        style={{
          maxWidth: "600px",
          position: "fixed",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "5",
          width: "100%",
          padding: "5px",
          paddingBottom: "20px",
        }}
        sx={{ bottom: 0, left: 5, right: 5 }}
        elevation={5}

        // style={{
        //   position: "fixed",
        //   zIndex: 5,
        //   // left: "50%",
        //   bottom: "0",
        //   // transform: "translateX(-50%)",
        //   // minWidth: "400px",
        //   Width: "100wv",
        //   maxWidth: "600px",
        //   padding: "5px",
        //   margin: "auto 0",
        // }}
        // sx={{ bottom: 0, left: 5, right: 5 }}
        // elevation={5}
      >
        <BottomNavigation
          value={value}
          onChange={handleChange}
          showLabels
          sx={{
            "& .MuiBottomNavigationAction-root": {
              minWidth: 0, // Remove the minimum width
              padding: "2px", // Increase the padding
            },
            "& .MuiSvgIcon-root": {
              fontSize: "900px", // Increase the icon size
            },
          }}
        >
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={
              <HomeOutlinedIcon style={{ color: "#453F78", fontSize: 40 }} />
            }
          />
          <BottomNavigationAction
            label="Planner"
            value="planner"
            icon={
              <ListAltOutlinedIcon style={{ color: "#453F78", fontSize: 40 }} />
            }
          />
          <BottomNavigationAction
            label="Transactions"
            value="transactions"
            icon={
              <SyncAltOutlinedIcon style={{ color: "#453F78", fontSize: 40 }} />
            }
          />

          <BottomNavigationAction
            label="Reports"
            value="reports"
            icon={
              <DonutSmallOutlinedIcon
                style={{ color: "#453F78", fontSize: 40 }}
              />
            }
          />
          {/* 
        <BottomNavigationAction 
        // label="Games" 
        value="games" 
        icon={<Games />} /> */}
        </BottomNavigation>
      </Paper>
    </Container>
  );
}

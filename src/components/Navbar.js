import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Fragment } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DarkModeIcon from "@mui/icons-material/DarkMode";
// import Login from "@mui/icons-material/Login";
// import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import { DataContext } from "../context/DataContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const { toggleTheme, theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const { setTranData, setBudgetData, setCategories } = useContext(DataContext);

  console.log("Current route:", location.pathname);

  const handleClick = () => {
    localStorage.removeItem("token");
    setTranData([]);
    setBudgetData([]);
    setCategories([]);
    logout();
    navigate("/");
  };

  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleLogin = () => {
  //   navigate("/login");
  // };

  // const handleSignup = () => {
  //   navigate("/signup");
  // };

  const page = () => {
    if (location.pathname == "/login") {
      return "Login";
    }

    if (location.pathname == "/signup") {
      return "Signup";
    }

    if (location.pathname == "/addexpense") {
      return "Add Expense";
    }

    if (location.pathname == "/addincome") {
      return "Add Income";
    }

    if (location.pathname == "/budget") {
      return "Planner";
    }

    if (location.pathname == "/reports") {
      return "Reports";
    }

    if (location.pathname == "/transactions") {
      return "Transactions";
    }

    if (token && location.pathname == "/") {
      return "Dashboard";
    }

    if (token && location.pathname == "/link") {
      return "Link Account";
    }

    if (token && location.pathname == "/addbudget") {
      return "Add Budget";
    }

    if (token && location.pathname == "/scan") {
      return "Scan Receipt";
    }

    return "";
  };

  const handleClick2 = () => {
    navigate("/scan");
  };
  const currentPage = page();
  console.log("Current page:", currentPage);

  const paperStyles = {
    // Customize the background color here
    background: "linear-gradient(#c80048, #961c48)",
  };

  return (
    <Container
      style={{ maxWidth: "600px" }}
      sx={{
        background: "linear-gradient(#c80048, #961c48)",
        // height: "100%",
        padding: "20px",
        paddingTop: "30px",
        // display: "flex",
        // justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
        position: "fixed",
        zIndex: 5,
        borderRadius: "0 0 1.5em 1.5em",
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25);",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        component="a"
        style={{ justifySelf: "center", width: "100%" }}
        sx={{
          ml: 7,
          fontFamily: "Inter",
          fontWeight: 700,
          color: "#FFFF",
          fontSize: "20px",

          // textDecoration: "none",
          // justifySelf: "center",
          // flex: "2",
          // margin: "auto 0",
        }}
      >
        {currentPage}
      </Typography>

      <Fragment>
        <Box
          style={{ float: "right" }}
          // sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClickAvatar}
              size="small"
              sx={{ ml: 5 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MenuIcon sx={{ width: 25, height: 25, color: "white" }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            style: paperStyles,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {/* <MenuItem onClick={handleClose}>
            <Box onClick={handleLogin} sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
              <ListItemIcon sx={{ color: '#FFFF'}}>
                <Login />
              </ListItemIcon>
              <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 700,
                color: '#FFFF',
                textDecoration: 'none'
                }}>
                  Login
              </Typography>
            </Box>
          </MenuItem> */}

          {/* <MenuItem onClick={handleClose}>
            <Box onClick={handleSignup} sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
              <ListItemIcon  sx={{ color: '#FFFF'}}>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 700,
                color: '#FFFF',
                textDecoration: 'none'
                }}>
                  Signup
              </Typography>
            </Box>
          </MenuItem> */}
          <MenuItem onClick={handleClose}>
            <Box
              onClick={handleClick}
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <ListItemIcon sx={{ color: "#FFFF" }}>
                <Logout sx={{ fontSize: "25px" }} />
              </ListItemIcon>

              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  color: "#FFFF",
                  textDecoration: "none",
                  fontSize: "16px",
                }}
              >
                Logout
              </Typography>
            </Box>
          </MenuItem>

          <Divider />

          {token !== null && (
            <MenuItem onClick={handleClose}>
              <Box
                onClick={handleClick2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <ListItemIcon sx={{ color: "#FFFF" }}>
                  <Settings sx={{ fontSize: "25px" }} />
                </ListItemIcon>

                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    color: "#FFFF",
                    textDecoration: "none",
                    fontSize: "16px",
                  }}
                >
                  Scan Receipt
                </Typography>
              </Box>
            </MenuItem>
          )}
          <Divider />
          <MenuItem>
            <Box
              onClick={toggleTheme}
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <ListItemIcon sx={{ color: "#FFFF" }}>
                <DarkModeIcon sx={{ fontSize: "25px" }} />
              </ListItemIcon>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  color: "#FFFF",
                  textDecoration: "none",
                  fontSize: "16px",
                }}
              >
                {theme === "dark" ? "Light mode" : "Dark Mode"}
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Fragment>
      <Box style={{ width: "50px", justifySelf: "left" }}></Box>

      {/* <div className="title">
        <Link to="/">PiggyBank</Link>
      </div> */}
      {/* <nav>
        {token !== null && (
          <div>
            <span style={{ padding: "10px" }}>Hello, {decodedToken?.name}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {token === null && (
          <div>
            <Link to="login">Login</Link>
            <Link to="signup">Signup</Link>
          </div>
        )}
      </nav> */}
    </Container>
  );
}

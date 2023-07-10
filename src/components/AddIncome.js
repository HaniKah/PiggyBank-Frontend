import {
  Box,
  TextField,
  MenuItem,
  InputLabel,
  Alert,
  OutlinedInput,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import "../components/styles/addIncome.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";
import { ThemeContext } from "../context/ThemeContext";
import Button from "@mui/material/Button";
import logo from "./images/piggylogo.gif";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/system";
import { useContext } from "react";

export default function AddIncome() {
  const [category_name, setCatgeroy] = useState("");
  const [tran_date, setDate] = useState(null);
  const [tran_description, setDescription] = useState("");
  const [tran_amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);
  const [user, setUser] = useState("");
  const { token } = React.useContext(AuthContext);
  const { refresh, setRefresh } = React.useContext(DataContext);
  const { styling } = useContext(ThemeContext);
  const handleAddIncomesChange = async (e) => {
    e.preventDefault();

    if (
      category_name === "" ||
      tran_date === null ||
      tran_description === "" ||
      tran_amount === ""
    ) {
      setAlert(<Alert severity="warning">Please fill all the fields !</Alert>);
    } else {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://piggybank-api.onrender.com/Transaction",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
              category_name, // HOUSE, TRANSPORTATION
              tran_description,
              tran_amount,
              tran_sign: "CR", //DR (income) or CR(expense)
              tran_currency: "US",
              tran_date,
              user,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to add income");
        }
        setIsLoading(false);
        setCatgeroy("");
        setDate(null);
        setDescription("");
        setAmount("");
        setAlert(<Alert severity="success">Your income has been saved</Alert>);
        setRefresh(!refresh);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handlecategoryChange = (event) => {
    setCatgeroy(event.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const CustomButton = styled(Button)({
    "&:hover": {
      backgroundColor: "#ffa726",
      transform: "scale(1.05)",
    },
  });

  return (
    <Container
      sx={{
        paddingTop: "100px",
        paddingBottom: "100px",
        maxWidth: "sm",
        minHeight: "100vh",
      }}
      style={{
        background: styling.backgroundColor,
        paddingBottom: styling.paddingBottom,
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ borderRadius: "20px" }} className="income_container">
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>

            <Select
              required
              className="addincome-textfield background_grey"
              label="Category"
              value={category_name}
              onChange={handlecategoryChange}
              sx={{
                textAlign: "left",
                borderRadius: "31px",
                fontSize: "16px",
              }}
            >
              <MenuItem value="Salary" sx={{ fontSize: "16px" }}>
                salary{" "}
              </MenuItem>
              <MenuItem value="Deposits" sx={{ fontSize: "16px" }}>
                {" "}
                Deposits
              </MenuItem>
              <MenuItem value="Savings" sx={{ fontSize: "16px" }}>
                {" "}
                Savings
              </MenuItem>
              <MenuItem value="Others" sx={{ fontSize: "16px" }}>
                {" "}
                Others
              </MenuItem>
            </Select>
          </FormControl>
          {/* <InputLabel className="text-field-label">Date</InputLabel> */}
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DatePicker
                  disableFuture
                  label="Date"
                  value={tran_date}
                  className="background_grey"
                  onChange={handleDateChange}
                  sx={{
                    borderRadius: "31px",
                    "& fieldset": {
                      borderRadius: "30px",
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "16px", // Set the desired font size
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>

          {/* <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Amount </InputLabel>
            <OutlinedInput
              className="addincome-textfield background_grey"
              label=" add your amount"
              type="number"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              value={tran_amount}
              onChange={handleAmountChange}
              sx={{ borderRadius: "31px", fontSize: "16px" }}
            ></OutlinedInput>
          </FormControl> */}
          {/* <InputLabel className="text-field-label">Description </InputLabel> */}
          <FormControl fullWidth>
            <TextField
              className="addincome-textfield"
              label="Description"
              value={tran_description}
              onChange={handleDescriptionChange}
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
            {/* <InputLabel className="text-field-label">Amount </InputLabel> */}
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Amount </InputLabel>
            <OutlinedInput
              className="addincome-textfield background_grey"
              label=" add your amount"
              type="number"
              startAdornment={
                <InputAdornment position="start">€</InputAdornment>
              }
              value={tran_amount}
              onChange={handleAmountChange}
              sx={{ borderRadius: "31px", fontSize: "16px" }}
            ></OutlinedInput>
          </FormControl>
          {/* <CustomButton
            sx={{
              ":hover": { bgcolor: "#C42B0A" },
              borderRadius: "31px",
              background: "#c80048",
              width: "150px",
              height: "50px",
              margin: "20px",
              color: "white",
              fontSize: "16px",
              padding: "5px 80px",
            }}
            onClick={handleAddIncomesChange}
          >
            ADD
          </CustomButton> */}
          <Button
            variant="outlined"
            onClick={handleAddIncomesChange}
            sx={{
              ":hover": { bgcolor: "#453f78", color: "white" },
              borderRadius: "31px",
              width: "250px",
              height: "50px",
              margin: "10px",
              fontSize: "16px",
              padding: "5px 8px",
              textDecoration: "none",
            }}
          >
            ADD
          </Button>
          <Box sx={{ mt: 1 }}>{alert}</Box>
        </Box>
      )}
    </Container>
  );
}

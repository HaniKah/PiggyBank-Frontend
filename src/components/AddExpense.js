import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./styles/addexpense.css";

import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";
import { styled } from "@mui/system";
import { ThemeContext } from "../context/ThemeContext";

export default function AddExpense() {
  const [category, setCategory] = React.useState("");
  const [recurrence, setRecurrence] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(null);

  const { token } = React.useContext(AuthContext);
  const { refresh, setRefresh } = React.useContext(DataContext);
  const { styling } = React.useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      category === "" ||
      // recurrence === "" ||
      date === null ||
      description === "" ||
      amount === ""
    ) {
      setAlert(<Alert severity="warning">Please fill in all the fields</Alert>);
    } else {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://piggybank-api.onrender.com/transaction/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              category_name: category,
              tran_description: description,
              tran_amount: amount,
              tran_sign: "DR", //DR (expense) or CR(income)
              tran_currency: "US",
              tran_date: date,
            }),
          }
        );
        setIsLoading(false);
        setCategory("");
        setRecurrence("");
        setDate(null);
        setDescription("");
        setAmount("");
        setAlert(
          <Alert severity="success" sx={{ fontSize: "16px" }}>
            Your expense has been saved
          </Alert>
        );
        setRefresh(!refresh);
      } catch (error) {
        setIsLoading(false);
        setAlert(
          <Alert severity="error">
            Couldn't post the transaction, take a look at the console for more
            information about the error!
          </Alert>
        );
        console.log("Here is the Error with more Info:", error);
      }
    }
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
          <CircularProgress sx={{ mt: 2 }} />
        </Box>
      ) : (
        <Box sx={{ minWidth: 120, p: 2 }} className="addexp_box">
          <form>
            {/*Category */}
            <FormControl fullWidth sx={{ marginBottom: "1.5em" }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                required
                labelId="category-label"
                id="category"
                value={category}
                label="Category"
                className="background_grey"
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                  textAlign: "left",
                  borderRadius: "31px",
                  fontSize: "16px",
                }}
              >
                <MenuItem value={"education"} sx={{ fontSize: "16px" }}>
                  Education
                </MenuItem>
                <MenuItem value={"communication"} sx={{ fontSize: "16px" }}>
                  Communication
                </MenuItem>
                <MenuItem value={"bills"} sx={{ fontSize: "16px" }}>
                  Bills
                </MenuItem>
                <MenuItem value={"rent"} sx={{ fontSize: "16px" }}>
                  Rent
                </MenuItem>
                <MenuItem value={"medicine"} sx={{ fontSize: "16px" }}>
                  Medicine
                </MenuItem>
                <MenuItem value={"groceries"} sx={{ fontSize: "16px" }}>
                  Groceries
                </MenuItem>
                <MenuItem value={"eatingOut"} sx={{ fontSize: "16px" }}>
                  Eating Out
                </MenuItem>
                <MenuItem value={"entertainment"} sx={{ fontSize: "16px" }}>
                  Entertainment
                </MenuItem>
                <MenuItem value={"pets"} sx={{ fontSize: "16px" }}>
                  Pets
                </MenuItem>
                <MenuItem value={"repairs"} sx={{ fontSize: "16px" }}>
                  Repairs
                </MenuItem>
                <MenuItem value={"work"} sx={{ fontSize: "16px" }}>
                  Work
                </MenuItem>
                <MenuItem value={"insurance"} sx={{ fontSize: "16px" }}>
                  Insurance
                </MenuItem>
                <MenuItem value={"others"} sx={{ fontSize: "16px" }}>
                  Others
                </MenuItem>
              </Select>
            </FormControl>
            {/*Recurrence */}
            {/* <FormControl fullWidth sx={{ marginBottom: "1.5em" }}>
                <InputLabel id="recurrence-label">Recurrence</InputLabel>
                <Select
                  required
                  labelId="recurrence-label"
                  id="recurrence"
                  value={recurrence}
                  label="Recurrence"
                  className="background_grey"
                  onChange={(e) => setRecurrence(e.target.value)}
                  sx={{ textAlign: "left", borderRadius: "31px", fontSize: '16px', }}
                >
                  <MenuItem value={"single"} sx={{ fontSize: '16px' }}>Single Expense</MenuItem>
                  <MenuItem value={"recurrent"} sx={{ fontSize: '16px' }}>Recurrent Expense</MenuItem>
                </Select>
              </FormControl> */}

            {/*Date*/}
            <FormControl fullWidth sx={{ marginBottom: "1.5em" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableFuture
                  label="Date"
                  className="background_grey"
                  value={date}
                  onChange={(selectedDate) => setDate(selectedDate)}
                  sx={{
                    borderRadius: "31px",
                    "& fieldset": {
                      borderRadius: "30px",
                      fontSize: "16px",
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "16px", // Set the desired font size
                    },
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            {/*Amount */}
            {/* <FormControl fullWidth sx={{ marginBottom: "1.5em" }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                type="number"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Amount"
                className="background_grey"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                sx={{ borderRadius: "31px", fontSize: "16px" }}
              />
            </FormControl> */}
            {/*Description */}
            <FormControl fullWidth sx={{ marginBottom: "1.5em" }}>
              <TextField
                id="outlined-basic"
                label="Description"
                className="background_grey"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

            {/*Amount */}
            <FormControl fullWidth sx={{ marginBottom: "1.5em" }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                type="text"
                inputmode="numeric"
                startAdornment={
                  <InputAdornment position="start">€</InputAdornment>
                }
                label="Amount"
                className="background_grey"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                sx={{ borderRadius: "31px", fontSize: "16px" }}
              />
            </FormControl>
            {/* Submit Button */}
            <Button
              variant="outlined"
              onClick={handleSubmit}
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
              onClick={handleSubmit}
            >
              ADD
            </CustomButton> */}
            {/* Alert Message */}
            <Box sx={{ mt: 1 }}>{alert}</Box>
          </form>
        </Box>
      )}
    </Container>
  );
}

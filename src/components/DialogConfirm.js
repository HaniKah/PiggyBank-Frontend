import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useJwt } from "react-jwt";
import { AuthContext } from "../context/AuthContext";

export default function DialogConfirm({
  setDialogOpen,
  budgetDeleteName,
  budgetDeleteId,
  refresh,
  setRefresh,
}) {
  const [open, setOpen] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(null);
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);

  console.log("budgetDeleteId:", budgetDeleteId);
  const deleteBudget = async () => {
    setIsLoading(true);
    try {
      //Get existing budgets

      const res = await fetch(
        `${process.env.REACT_APP_URL}/budget/${budgetDeleteId}`,
        {
          method: "DELETE", // Fetch the current data first
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data.msg);
      /*       const currentBudgets = data || []; // Get the current budgets array
      const budgets = currentBudgets.filter(
        (budget) => budget._id !== budgetDeleteId
      );
      console.log("updatedBudgets:", budgets);
      // Append the new object to the existing array
      const resPut = await fetch(
        `http://${process.env.REACT_APP_URL}/users/${decodedToken._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ budgets }),
        }
      ); */
      setRefresh(!refresh);
    } catch (error) {
      console.log("Here is the Error with more Info:", error);
    }
  };

  const handleClose = (word) => {
    if (word === "delete") {
      deleteBudget();
    }

    setIsLoading(false);
    setOpen(false);
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you really want to delete the Budget for{" "}
          {budgetDeleteName.replace(/^[\w]/, (c) => c.toUpperCase())}?
        </DialogTitle>
        <DialogContent>
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
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("delete")} autoFocus>
            Yes
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

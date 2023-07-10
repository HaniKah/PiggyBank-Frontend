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
  tranDeleteName,
  tranDeleteId,
  refresh,
  setRefresh,
}) {
  const [open, setOpen] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(null);
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };
  const deleteTran = async () => {
    setIsLoading(true);
    try {
      console.log(tranDeleteId);
      const response = await fetch(
        `https://piggybank-api.onrender.com/transaction/${tranDeleteId}`,

        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Transaction successfully deleted
        const deletedTransaction = await response.json();
        console.log(deletedTransaction);
        // Perform any necessary actions after deletion
      } else {
        // Transaction not found or other error occurred
        const errorData = await response.json();
        console.error(errorData.error);
      }
      setIsLoading(false);
      setRefresh(!refresh);
    } catch (error) {
      setIsLoading(false);
      setRefresh(!refresh);
      console.error("An error occurred while deleting the transaction:", error);
    }
  };

  const handleClose = (word) => {
    if (word === "delete") {
      deleteTran();
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
          Do you really want to delete the Transaction for{" "}
          {tranDeleteName.replace(/^[\w]/, (c) => c.toUpperCase())}?
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

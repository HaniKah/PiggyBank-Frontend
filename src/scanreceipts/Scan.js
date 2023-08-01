import { useState, useContext } from "react";
import "../components/styles/scan.css";
import {
  Grid,
  Button,
  Alert,
  Container,
  Typography,
  Box,
  Input,
} from "@mui/material";
import axios from "axios";
import mindee from "./Mindee";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { CameraAltRounded } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #453f78",
  boxShadow: 24,
  p: 4,
};

export default function Scan() {
  const [trans, setTrans] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { token } = useContext(AuthContext);
  const [flag, setFlag] = useState(false);
  const { refresh, setRefresh } = useContext(DataContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setImage(null);
    setSuccessMessage("");
    navigate("/transactions");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("picture", image, image.name);

      const res = await axios.post(
        "https://piggybank-api-utda.onrender.com/api/upload",
        formData
      );

      const mindeeResponse = await mindee.parseReceipt(res.data.url);
      const transaction =
        mindee.convertMindeeResponseToTransaction(mindeeResponse);
      mindee.saveTransaction(token, transaction);
      setTrans(transaction);
      setRefresh(!refresh);
      setError(false);
      setImage(null);
      setSuccessMessage("Scanning is complete.");
      setFlag(!flag);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
      setSuccessMessage("");
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="General">
      <form className="upload-container" onSubmit={onSubmit}>
        <label htmlFor="image">
          <Button
            component="span"
            variant="outlined"
            sx={{
              mt: 4,
              mb: 2,
              transition: "all 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <CameraAltRounded style={{ color: "#453F78", fontSize: 40 }} />
            <Typography variant="h5"> Choose Photo</Typography>
          </Button>
          <p>Accepted File Format (.jpg, .jpeg, .png)</p>
        </label>

        {isLoading ? <CircularProgress sx={{ color: "#b9b9b9" }} /> : <></>}

        <div>
          <Input
            type="file"
            onChange={handleFileInputChange}
            id="image"
            sx={{ display: "none" }}
            inputProps={{ "aria-label": "Upload Image" }}
          />

          {image && <h6>{image.name}</h6>}
        </div>

        <div className="upload-buttons-div">
          <Button
            type="submit"
            variant="outlined"
            sx={{
              color: "var(--red)",
              border: "1px solid var(--red)",
              fontWeight: "bold",
              ":hover": {
                bgcolor: "var(--red)",
                color: "white",
                border: "1px solid var(--red)",
              },
              borderRadius: "31px",
              width: "150px",
              height: "45px",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            Submit
          </Button>

          <Button
            onClick={handleClose}
            type="submit"
            variant="outlined"
            sx={{
              border: "none",
              color: "var(--red)",

              width: "250px",
              height: "50px",
              fontSize: "14px",

              textDecoration: "none",
              ":hover": {
                background: "none",
                color: "none",
                border: "none",
                scale: "1.05",
                transition: " all ease 0.3s",
              },
            }}
          >
            CLOSE
          </Button>
        </div>

        {error && (
          <Alert
            severity="error"
            sx={{ typography: "body1", fontSize: "1.5rem" }}
          >
            Something went wrong. Try again.
          </Alert>
        )}

        {successMessage && (
          <Alert sx={{ typography: "body1", fontSize: "1.5rem" }}>
            {successMessage}

            <Typography sx={{ textAlign: "left", fontSize: "12px", mt: 3 }}>
              {trans.tran_description}
            </Typography>
            <Typography sx={{ textAlign: "left", fontSize: "12px" }}>
              {trans.tran_amount}
            </Typography>
            <Typography sx={{ textAlign: "left", fontSize: "12px" }}>
              {trans.tran_date}
            </Typography>
          </Alert>
        )}
      </form>
    </div>
  );
}

import { useState, useContext } from "react";
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
        "https://piggybank-api.onrender.com/api/upload",
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
    <Container
      sx={{
        paddingTop: "100px",
        maxWidth: "sm",
        minHeight: "100vh",
      }}
    >
      <Grid>
        <Grid item xs={12}>
          <Box sx={style}>
            <Typography variant="h6" align="center" gutterBottom>
              {" "}
              Accepted File Format (.jpg, .jpeg, .png)
            </Typography>

            <form onSubmit={onSubmit}>
              <Box>
                <label htmlFor="image">
                  <Button
                    component="span"
                    variant="outlined"
                    sx={{
                      mt: 4,
                      mb: 2,
                      transition: "all 0.3s ease",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    <CameraAltRounded
                      style={{ color: "#453F78", fontSize: 40 }}
                    />
                    <Typography variant="h5"> Choose Photo</Typography>
                  </Button>
                </label>
              </Box>

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
                <></>
              )}

              <Box>
                <Input
                  type="file"
                  onChange={handleFileInputChange}
                  id="image"
                  sx={{ display: "none" }}
                  inputProps={{ "aria-label": "Upload Image" }}
                />

                {image && (
                  <Typography component="span" variant="h5" sx={{ mt: 4 }}>
                    {image.name}
                  </Typography>
                )}
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  paddingBottom: "0px",
                }}
              >
                <Button
                  type="submit"
                  variant="outlined"
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
                  Submit
                </Button>
                {/* <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 8,
                    transition: "all 0.3s ease",
                    ":hover": { backgroundColor: "var(--red)", color: "white" },
                    width: "150px",
                    height: "50px",
                    fontSize: "10px",
                    textDecoration: "none",
                    borderRadius: "31px",
                    width: "150px",
                    margin: "20px",
                    backgroundColor: "var(--red)",
                    color: "white",
                    fontSize: "16px",
                    textDecoration: "none",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                >
                  <Typography variant="h5"> Submit</Typography>
                </Button> */}

                <Button
                  onClick={handleClose}
                  type="submit"
                  variant="outlined"
                  sx={{
                    border: "1px solid var(--red)",
                    color: "var(--red)",
                    borderRadius: "31px",
                    width: "250px",
                    height: "50px",
                    margin: "10px",
                    fontSize: "16px",
                    padding: "5px 8px",
                    textDecoration: "none",
                    ":hover": {
                      bgcolor: "var(--red)",
                      color: "white",
                      border: "1px solid var(--red)",
                    },
                  }}
                >
                  CLOSE
                </Button>
                {/* <Button
                  variant="outlined"
                  onClick={handleClose}
                  sx={{
                    mt: 8,
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "scale(1.1)" },
                    ":hover": {
                      background: "white",
                      color: "var(--red)",
                      border: "1px solid var(--red)",
                    },
                    width: "150px",
                    fontSize: "10px",
                    textDecoration: "none",
                    borderRadius: "31px",
                    background: "white",
                    width: "150px",
                    margin: "20px",
                    border: "1px solid var(--red)",
                    color: "var(--red)",
                    fontSize: "16px",
                    textDecoration: "none",
                  }}
                >
                  <Typography variant="h5"> CLOSE</Typography>
                </Button> */}
              </Box>

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

                  <Typography
                    sx={{ textAlign: "left", fontSize: "12px", mt: 3 }}
                  >
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
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

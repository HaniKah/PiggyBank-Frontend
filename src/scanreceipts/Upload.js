import { useState, useContext } from "react";
import { Modal, Button, TextField, Container, Typography, Box, Input } from "@mui/material";
import axios from "axios";
import mindee from "./Mindee";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext"
import { useNavigate } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Upload() {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { token } = useContext(AuthContext);
  const [flag, setFlag] = useState(false);
  const { refresh, setRefresh } = useContext(DataContext);
  const navigate = useNavigate();

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setDescription("");
    setImage(null);
    setSuccessMessage("");
    navigate("/transactions");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", image, image.name);
      formData.append("desc", description);

      const res = await axios.post("https://piggybank-api.onrender.com/api/upload", formData);

      const mindeeResponse = await mindee.parseReceipt(res.data.url);
      const transaction = mindee.convertMindeeResponseToTransaction(mindeeResponse);
      mindee.saveTransaction(token, transaction);
      setRefresh(!refresh);
      setError(false);
      setDescription("");
      setImage(null);
      setSuccessMessage("Upload successful!");
      setFlag(!flag);
    } catch (error) {
      setError(true);
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
    <Container>
      <Button variant="contained" color="primary" onClick={handleShow}>
        Upload Receipts
      </Button>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Format (.jpg, .jpeg, .png)
          </Typography>

          <form onSubmit={onSubmit}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              sx={{ mb: 2 }}
            />
            <Input
              type="file"
              onChange={handleFileInputChange}
              id="image"
              sx={{ display: "none" }}
              inputProps={{ "aria-label": "Upload Image" }}
            />

            <label htmlFor="image">
              <Button component="span" variant="contained" sx={{ mt: 1 }}>
                Choose File
              </Button>
            </label>

            {image && (
              <Typography component="span" variant="subtitle2">
                {image.name}
              </Typography>
            )}

            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>

            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                An error occurred uploading the file.
              </Typography>
            )}

            {successMessage && (
              <Typography variant="body2" color="success" sx={{ mt: 1 }}>
                {successMessage}
              </Typography>
            )}
          </form>

          <Button variant="secondary" onClick={handleClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}
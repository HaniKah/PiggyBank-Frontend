import React, { useRef, useState, useEffect, useContext } from 'react';
import Webcam from 'react-webcam';
import { Button, Typography, Grid, Container, Box } from '@mui/material';
import { Camera, CameraAltRounded } from '@mui/icons-material';
import axios from 'axios';
import mindee from "./Mindee";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

export default function CaptureImage() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const { token } = useContext(AuthContext);
  const { refresh, setRefresh } = useContext(DataContext);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const capturePhoto = async () => {

    const imageSrc = webcamRef.current.getScreenshot();
    const image = new Image();
    const canvas = canvasRef.current;
  
    // Set up an onload event handler to ensure the image is loaded before drawing it
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    // Set the source of the image to the captured screenshot
    image.src = imageSrc;

    // Create a new FormData object
    const formData = new FormData();
    formData.append(
      'picture',
      dataURLtoFile(canvas.toDataURL('image/jpeg'), 'captured_image.jpg')
    );

    try {
      // Send the FormData to the API endpoint using axios
      console.log("posting the photo to DB", formData)
      // const res = await axios.post('http://localhost:8080/api/upload', formData);
      const res = await axios.post('https://piggybank-api.onrender.com/api/upload', formData);
      console.log('Image uploaded:', res.data);

      const mindeeResponse = await mindee.parseReceipt(res.data.url)
      const transaction = mindee.convertMindeeResponseToTransaction(mindeeResponse)
      mindee.saveTransaction(token, transaction)
      setRefresh(!refresh);
      setAlert( <Alert
        action={
          <Button color="inherit" size="small" onClick={handleGoBack}>
            Close Camera
          </Button>
        }
      >
        Scanning complete. Your expense has been saved.
      </Alert>);

    } catch (error) {
      setAlert(
        <Alert severity="error"
        action={
          <Button color="inherit" size="small" onClick={handleGoBack}>
            Close Camera
          </Button>
        }
        >
          Couldn't post the transaction, take a look at the console for more
          information about the error!
        </Alert>
      );
      console.error('Error uploading the image:', error);
    }

  };

  // Helper function to convert data URL to a File object
  const dataURLtoFile = (dataURL, filename) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleGoBack = () => {
    navigate("/transactions");
  };

  const handleClose = () => {
    navigate("/transactions");
  };

  return (
    <Container
    maxWidth="sm"
    sx={{
        paddingTop: "100px",
    }}
    >
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item xs={12}>
      {alert && (
          <Box mt={2}>
            {alert}
          </Box>
        )}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Webcam videoConstraints={{ facingMode: 'environment' }} ref={webcamRef}
          style={{ width: '400px' }}  />
          {/* <Webcam ref={webcamRef} facingMode="environment" style={{ width: '400px', height: '350px' }} /> */}
          <Button onClick={capturePhoto} color="primary" variant="outlined">
            <Camera fontSize="large" />
            <Typography>Capture Photo</Typography>
          </Button>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center">
          <Button onClick={handleClose} color="primary" variant="outlined">
            CLOSE
          </Button>
        </Box>

        {capturedImage && (
          <Box mt={2}>
            <Typography variant="h6">Captured Photo:</Typography>
            <img src={capturedImage} alt="Captured" />
          </Box>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </Grid>
    </Grid>
  </Container>
  );
}
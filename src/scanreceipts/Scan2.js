import { Container, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CameraAltRounded } from '@mui/icons-material';
import Upload from "./Upload";

export default function Scan() {
const navigate = useNavigate();

// const handleUploadClick = () => {
//     navigate("/upload");
// };

const handleCameraClick = () => {
    navigate("/camera");
};

return (
    <Container
    maxWidth="sm"
    sx={{
        paddingTop: "100px",
    }}
    >
    <h4>Scan Receipts</h4>
    <Upload />

    <Button onClick={handleCameraClick} color="primary" variant="outlined">
            <CameraAltRounded fontSize="large" />
            <Typography>Open Camera</Typography>
    </Button>
    </Container>
);
}

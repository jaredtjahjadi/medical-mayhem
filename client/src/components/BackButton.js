import { Button } from '@mui/material';
import { buttonStyle } from '../App';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
    const navigate = useNavigate();
    return (
        <Button variant="contained"
            sx={[buttonStyle, {
                left: '2%',
                bottom: '2%',
                position: 'absolute'
            }]}
            onClick={()=>{navigate("/")}}>
            Back
        </Button>
    )
}
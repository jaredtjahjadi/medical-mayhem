import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import BackButton from './BackButton';
// import { Engine } from "excalibur";
import { useContext, useEffect, useRef } from "react";
import { MedicalMayhem } from '../game/medicalMayhem'
// import socket from '../constants/socket';
// import SocketEvents from '../constants/socketEvents';
import AuthContext from '../auth';
import GlobalStoreContext from '../store';

export default function GameScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const gameCanvas = useRef(null);
	const gameRef = useRef();

    useEffect(() => {
		if (!gameRef.current && gameCanvas.current)
			MedicalMayhem(gameRef, gameCanvas, store.players, auth.username);
        //eslint-disable-next-line
	}, []);

    return (
        <div id="about-screen">
            <Box sx={{
                bgcolor: 'black',
                width: '100%',
                height: '100%',
                position: 'absolute'
            }}>
                <canvas ref={gameCanvas} id="gameCanvas"></canvas>
            </Box>
            <Sidebar/>
            <BackButton />
        </div>
    );
}
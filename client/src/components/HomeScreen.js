import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { buttonStyle } from '../App';
import InviteModal from './InviteModal';
import { useContext, useState, useEffect } from 'react';
import ReportModal from './ReportModal';
import MessagesDrawer from './MessagesDrawer';
import AuthContext, { UserRoleType } from '../auth';
import SocketEvents from '../constants/socketEvents'
import loading from '../assets/loading.gif'
import socket from '../constants/socket';
import { homeScreen } from '../Styles';
import GlobalStoreContext from '../store';

// Styling
const homeButtons = {
    color: 'black',
    bgcolor: 'white',
    ":hover": {bgcolor: '#e5e5e5'}
}

export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 3
};

export default function HomeScreen() {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [queueingUp, setQueueingUp] = useState(false);
    const [role, setRole] = useState(UserRoleType.GUEST);
    
    function handleInviteButtonClick() {
        setShowInviteModal(true);
    }

    function handlePlayButtonClick() {
        setQueueingUp(true)
        socket.emit(SocketEvents.QUEUE_UP, auth.username)
    }

    useEffect(() => {
        socket.emit(SocketEvents.SET_USERNAME, auth.username)

        socket.on(SocketEvents.MATCH_FOUND, (data) => {
            
            // Make sure to turn off event listeners before navigating to different
            // screens in order to avoid unexpected behaviors
            console.log(data)
            socket.off(SocketEvents.MATCH_FOUND)
            store.updatePlayers(data)
            console.log(store.players)
            navigate('/game')
        })

        // eslint-disable-next-line
    }, [])

    // TODO: For some reason when switching from guest user to admin user, the role is set to 'USER' and doesn't update until refresh.
    // Evident by the report button not appearing when logging out of guest user and logging into an admin user.
    useEffect(() => setRole(auth.role), [auth]);

    return (
        <div id="home-screen">
            <Grid container>
                <Grid item xs={1}/>
                <Grid item xs={6}>
                    <Grid container id="home-menu" sx={[homeScreen, {boxShadow: 4}]}>
                        <Grid item xs={12}>
                            <Typography variant="h2" color="red">Medical Mayhem</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <HomeButton
                                xs={12} id='play-button'
                                gridSx={{textAlign: 'center'}}
                                buttonSx={[homeButtons, {fontSize: '24pt'}]}
                                // onClick={() => navigate('/game')}
                                onClick={handlePlayButtonClick}
                                text='Play'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <HomeButton
                                gridSx={{textAlign: 'center'}}
                                id='map-search-button'
                                onClick={() => navigate('/mapsearch')}
                                text='Character Search'
                                buttonSx={homeButtons}
                                disable={auth.role === UserRoleType.GUEST}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <HomeButton
                                id='map-builder-button'
                                onClick={() => navigate('/mapbuilder')}
                                backgroundColor='transparent'
                                buttonSx={{color: auth.role === UserRoleType.GUEST ? 'grey.300' : 'black'}}
                                text='Character Builder'
                                disable={auth.role === UserRoleType.GUEST}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <HomeButton
                                gridSx={{textAlign: 'center'}}
                                id='social-button'
                                onClick={() => navigate('/social')}
                                buttonSx={{color: auth.role === UserRoleType.GUEST ? 'grey.300' : 'black'}}
                                text='Social'
                                disable={auth.role === UserRoleType.GUEST}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <HomeButton
                                id='forums-button'
                                onClick={() => navigate('/forum')}
                                text='Forums'
                                buttonSx={homeButtons}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <HomeButton
                                gridSx={{textAlign: 'center'}}
                                id='profile-button'
                                onClick={() => navigate('/profile')}
                                buttonSx={{color: auth.role === UserRoleType.GUEST ? 'grey.300' : 'black'}}
                                text='Profile'
                                disable={auth.role === UserRoleType.GUEST}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <HomeButton
                                id='settings-button'
                                onClick={() => navigate('/settings')}
                                text='Settings'
                                buttonSx={homeButtons}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <HomeButton
                                gridSx={{textAlign: 'center'}}
                                id='about-button'
                                onClick={() => navigate('/about')}
                                text='About'
                                buttonSx={homeButtons}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <HomeButton
                                id="leaderboard-button"
                                onClick={() => navigate("/leaderboard")}
                                text='Leaderboard'
                                buttonSx={homeButtons}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <HomeButton
                                id='map-search-button'
                                onClick={handleInviteButtonClick}
                                buttonSx={[buttonStyle, {color: 'white', width: '25%'}]}
                                text='Invite'
                            />
                        </Grid>
                        { role === UserRoleType.ADMIN &&
                            <Grid item xs={6}>
                                <HomeButton
                                    onClick={() => navigate("/reports")}
                                    buttonSx={[buttonStyle, {color: 'white'}]}
                                    text='Reports'
                                />
                            </Grid>
                        }
                        <Grid item xs={12}/>
                        <Grid item xs={12}/>
                    </Grid>                
                </Grid>
                <Sidebar />
            </Grid>
            <MessagesDrawer />
            {queueingUp && <QueueModal queuingUp={queueingUp} setQueueingUp={setQueueingUp}/>}
            <InviteModal open={showInviteModal} onClose={() => setShowInviteModal(false)} />
            <ReportModal reportedUser={''} open={showReportModal} onClose={() => setShowReportModal(false)} />
        </div>
    )
}

function HomeButton(props) {
    const {xs, gridSx, id, onClick, buttonSx, disable, text} = props;
    return (
        <Grid item xs={xs} sx={gridSx}>
            <Button id={id} onClick={onClick} sx={buttonSx} disabled={disable}>
                {text}
            </Button>
        </Grid>
    )
}

function QueueModal(props) {
    // const { auth } = useContext(AuthContext);

    const modalText = "Waiting for another player..."
    // const [modalText, setModalText] = useState("Waiting for another player...")
    // const [matchFound, setMatchFound] = useState(false)

    function handleXButtonClick() {
        props.setQueueingUp(false)
        socket.emit(SocketEvents.LEAVE_QUEUE)
    }

    return (
        <Modal
            open={props.queuingUp}
            aria-labelledby="modal-find-game"
            id="queue-modal"
        >
            <Box sx={modalStyle}>
                <Button sx={{color: 'black', ":hover":{bgcolor: '#f1f9f4'}}} onClick={handleXButtonClick}>
                    X
                </Button>
                <br />
                <Typography id="modal-find-game" variant="h6" component="h2">
                    {modalText}
                </Typography>
                {/* {matchFound ? (
                    countdownModal
                ) : ( */}
                    <img src={loading} alt='loading-gif' className="image"></img>
                {/* )} */}
            </Box>
        </Modal>
    )
}
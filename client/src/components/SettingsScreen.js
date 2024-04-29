import { Box, Button, Divider, Grid, Typography, ToggleButton, Slider, Modal } from '@mui/material';
import Checkbox from '@mui/material/Checkbox'
import Sidebar from './Sidebar';
import BackButton from './BackButton';
import { buttonStyle } from '../App';
import { useContext, useEffect, useState } from 'react';
import GlobalStoreContext from '../store';
import AuthContext, { UserRoleType } from '../auth';
import { useNavigate } from 'react-router-dom';

export default function SettingsScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [masterValue, setMasterValue] = useState(100);
    const [musicValue, setMusicValue] = useState(100);
    const [sfxValue, setSfxValue] = useState(100);
    const [modal, setModal] = useState(false);
    const [currInput, setCurrInput] = useState('');
    const [keybinds, setKeybinds] = useState({
        UP: 'W',
        LEFT: 'A',
        DOWN: 'S',
        RIGHT: 'D',
        INTERACT: 'E'
    });
    const [toggles, setToggles] = useState({
        privateProfile: false,
        messages: true,
        party: true,
    });

    const resetButton = {
        mt: 1,
        mb: 2,
        bgcolor: 'red',
        color: 'white',
        ":hover": {bgcolor: '#c20900'},
    }

    const confirmButton = {
        mt: 1,
        mb: 2,
        bgcolor: 'green',
        color: 'white',
        ":hover": {bgcolor: '#2d7044'},
    }

    function handleLogout() {
        navigate('/');
        store.reset();
        auth.logoutUser(auth.username);
    }

    function handleDeleteAcc() {
        store.reset()
        auth.deleteUser()
        auth.logoutUser();
    }

    function handleResetAudio() {
        if(auth.role === UserRoleType.GUEST) return;
        setMasterValue(100);
        setMusicValue(100);
        setSfxValue(100);
        store.updateAudioSettings(100, 100, 100);
    }
    function handleConfirmAudio() {
        if(auth.role === UserRoleType.GUEST) return;
        store.updateAudioSettings(masterValue, musicValue, sfxValue);
    }

    function handleResetControls() {
        if(auth.role === UserRoleType.GUEST) return;
        setKeybinds({UP: 'W', LEFT: 'A', DOWN: 'S', RIGHT: 'D', INTERACT: 'E'});
        store.updateKeybinds({UP: 'W', LEFT: 'A', DOWN: 'S', RIGHT: 'D', INTERACT: 'E'});
    }
    function handleConfirmControls() {
        console.log('keybinds:', keybinds);
        store.updateKeybinds(keybinds);
    }

    const handleMasterSliderChange = (event, newValue) => {
        setMasterValue(newValue);
    }
    const handleMusicSliderChange = (event, newValue) => {
        setMusicValue(newValue);
    }
    const handleSfxSliderChange = (event, newValue) => {
        setSfxValue(newValue);
    }

    // State change causes modal to open or close
    const toggleModal = () => setModal(!modal);

    // Set user's volume settings upon change
    useEffect(() => {
        if(store.settings) {
            setMasterValue(auth.role === UserRoleType.GUEST ? 100 : store.settings.masterVolume);
            setMusicValue(auth.role === UserRoleType.GUEST ? 100 : store.settings.musicVolume);
            setSfxValue(auth.role === UserRoleType.GUEST ? 100 : store.settings.sfxVolume);
            setKeybinds(auth.role === UserRoleType.GUEST ? {UP: 'W', LEFT: 'A', DOWN: 'S', RIGHT: 'D', INTERACT: 'E'} : store.settings.keybinds);
            setToggles(auth.role === UserRoleType.GUEST ? {privateProfile: false, messages: true, party: true} : store.settings.toggles);
        }
        //eslint-disable-next-line
    }, [store.settings]);

    // Get user's settings
    useEffect(() => {
        if(auth.role !== UserRoleType.GUEST) store.getSettings();
        //eslint-disable-next-line
    }, [])

    return (
        <div id="settings-screen">
            <Box sx={{
                height: '90%',
                width: '45%',
                flexDirection: 'column',
                backgroundColor: '#fffbc3',
                position: 'absolute',
                left: '27.5%',
                top: '3%',
                textAlign: 'center',
                p: 2,
                boxShadow: 10
            }}/>
            <Box
                sx={{
                    height: '85%',
                    width: '40%',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    position: 'absolute',
                    left: '30%',
                    top: '5%',
                    textAlign: 'center',
                    p: 2,
                    boxShadow: 10
                }}>
                <Typography variant="h4" gutterBottom><strong>Settings</strong></Typography>
                <Divider />
                <h4>Audio</h4>
                <Grid container spacing={1} sx={{
                    width: '80%',
                    ml: '10%',
                    alignItems: 'center'
                }}>
                    <Grid item xs={3}>
                        Master
                    </Grid>
                    <Grid item xs={7}>
                        <Slider
                            value={typeof masterValue === 'number' ? masterValue : 0}
                            onChange={handleMasterSliderChange}
                            aria-labelledby="master-slider"
                            disabled={auth.role === UserRoleType.GUEST}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        {masterValue}
                    </Grid>

                    <Grid item xs={3}>
                        Music
                    </Grid>
                    <Grid item xs={7}>
                        <Slider
                            value={typeof musicValue === 'number' ? musicValue : 0}
                            onChange={handleMusicSliderChange}
                            aria-labelledby="music-slider"
                            disabled={auth.role === UserRoleType.GUEST}
                        />
                    </Grid>
                    <Grid item xs={2}>{musicValue}</Grid>

                    <Grid item xs={3}>SFX</Grid>
                    <Grid item xs={7}>
                        <Slider
                            value={typeof sfxValue === 'number' ? sfxValue : 0}
                            onChange={handleSfxSliderChange}
                            aria-labelledby="sfx-slider"
                            disabled={auth.role === UserRoleType.GUEST}
                        />
                    </Grid>
                    <Grid item xs={2}>{sfxValue}</Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleResetAudio} sx={resetButton}>
                            Reset to Default
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleConfirmAudio} sx={confirmButton}>
                            Confirm
                        </Button>
                    </Grid>
                </Grid>
                <Divider />
                
                <h4>Controls</h4>
                    <Grid container spacing={1} sx={{
                        width: '80%',
                        ml: '10%',
                        alignItems: 'center'
                    }}>
                    <Grid item xs={6}>Up</Grid>
                    <Button xs={6} onClick={() => {
                        if(auth.role === UserRoleType.GUEST) return;
                        setCurrInput('Up');
                        toggleModal();
                    }}>
                        {auth.role === UserRoleType.GUEST ? "W" : keybinds && keybinds.UP}
                    </Button>
                    <Grid item xs={6}>Left</Grid>
                    <Button xs={6} onClick={() => {
                        if(auth.role === UserRoleType.GUEST) return;
                        setCurrInput('Left');
                        toggleModal();
                    }}>
                        {auth.role === UserRoleType.GUEST ? "A" : keybinds && keybinds.LEFT}
                    </Button>
                    <Grid item xs={6}>Down</Grid>
                    <Button xs={6} onClick={() => {
                        if(auth.role === UserRoleType.GUEST) return;
                        setCurrInput('Down');
                        toggleModal();
                    }}>
                        {auth.role === UserRoleType.GUEST ? "S" : keybinds && keybinds.DOWN}
                    </Button>
                    <Grid item xs={6}>Right</Grid>
                    <Button xs={6} onClick={() => {
                        if(auth.role === UserRoleType.GUEST) return;
                        setCurrInput('Right');
                        toggleModal();
                    }}>
                        {auth.role === UserRoleType.GUEST ? "D" : keybinds && keybinds.RIGHT}
                    </Button>
                    <Grid item xs={6}>Interact</Grid>
                    <Button xs={6} onClick={() => {
                        if(auth.role === UserRoleType.GUEST) return;
                        setCurrInput('Interact');
                        toggleModal();
                    }}>
                        {auth.role === UserRoleType.GUEST ? "E" : keybinds && keybinds.INTERACT}
                    </Button>
                    <Grid item xs={6}>
                        <Button onClick={handleResetControls} sx={resetButton}>
                            Reset to Default
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleConfirmControls} sx={confirmButton}>
                            Confirm
                        </Button>
                    </Grid>
                </Grid>
                <Divider />

                { auth.role !== UserRoleType.GUEST && 
                <>
                    <Box display="flex" justifyContent={'space-evenly'} spacing={1} paddingTop={2}>
                        <ToggleButton onClick={() => {
                            setToggles({
                                privateProfile: !toggles.privateProfile,
                                messages: toggles.messages,
                                party: toggles.party
                            })
                            store.updateToggles(!toggles.privateProfile, toggles.messages, toggles.party);
                        }} size='small' value={false}>
                            Private Profile
                            <Checkbox checked={toggles.privateProfile} />
                        </ToggleButton>

                        <ToggleButton onClick={() => {
                            setToggles({
                                ...toggles,
                                messages: !toggles.messages,
                            })
                            store.updateToggles(toggles.privateProfile, !toggles.messages, toggles.party);
                        }} size='small' value={false}>
                            Messages
                            <Checkbox checked={toggles.messages} />
                        </ToggleButton>

                        <ToggleButton onClick={() => {
                            setToggles({
                                privateProfile: toggles.privateProfile,
                                messages: toggles.messages,
                                party: !toggles.party
                            })
                            store.updateToggles(toggles.privateProfile, toggles.messages, !toggles.party);
                        }} size='small' value={false}>
                            Party
                            <Checkbox checked={toggles.party} />
                        </ToggleButton>
                    </Box>
                </>}
               
                <Box display="flex" justifyContent={'center'} gap={5}>
                    { auth.role !== UserRoleType.GUEST ?
                        <>
                            <Button id='log-out' onClick={() => {handleLogout()}} sx={[confirmButton, {color: 'white', mt: 2}]}>
                                Log Out
                            </Button>
                            <Button id='delete-account' onClick={() => {handleDeleteAcc()}} sx={[resetButton, {color: 'white', mt: 2}]}>
                                Delete Account
                            </Button>
                        </> :
                        <Grid>
                            <Typography variant="h5" gutterBottom><strong>Login to change default settings</strong></Typography>
                            <Button id='login' onClick={() => navigate('/login')} sx={[buttonStyle, {color: 'white', mt: 2}]}>
                                Log In
                            </Button>
                            <Button id='register' onClick={() => navigate('/register')} sx={[buttonStyle, {color: 'white', mt: 2, ml: 2}]}>
                                Register
                            </Button> 
                        </Grid>}
                    
                </Box>
            </Box>
            <Sidebar />
            <BackButton />
            <InputModal
                keybinds={keybinds}
                setKeybinds={setKeybinds}
                open={modal}
                toggleModal={toggleModal}
                inputKey={currInput}
            />
        </div>
    );
}

function InputModal(props) {
    const {keybinds, setKeybinds} = props;

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

    // chatgpt a real one for this
    useEffect(() => {
        const handleKeyPress = (event) => {
            const currKey = (event.key === ' ') ? 'SPACE' : event.key.toUpperCase();
            if(props.inputKey === 'Up') {
                setKeybinds({
                    UP: currKey,
                    LEFT: keybinds.LEFT,
                    DOWN: keybinds.DOWN,
                    RIGHT: keybinds.RIGHT,
                    INTERACT: keybinds.INTERACT
                })
            }
            if(props.inputKey === 'Left') {
                setKeybinds({
                    UP: keybinds.UP,
                    LEFT: currKey,
                    DOWN: keybinds.DOWN,
                    RIGHT: keybinds.RIGHT,
                    INTERACT: keybinds.INTERACT
                })
            }
            if(props.inputKey === 'Down') {
                setKeybinds({
                    UP: keybinds.UP,
                    LEFT: keybinds.LEFT,
                    DOWN: currKey,
                    RIGHT: keybinds.RIGHT,
                    INTERACT: keybinds.INTERACT
                })
            }
            if(props.inputKey === 'Right') {
                setKeybinds({
                    UP: keybinds.UP,
                    LEFT: keybinds.LEFT,
                    DOWN: keybinds.DOWN,
                    RIGHT: currKey,
                    INTERACT: keybinds.INTERACT
                })
            }
            if(props.inputKey === 'Interact') {
                setKeybinds({
                    UP: keybinds.UP,
                    LEFT: keybinds.LEFT,
                    DOWN: keybinds.DOWN,
                    RIGHT: keybinds.RIGHT,
                    INTERACT: currKey
                })
            }
            props.toggleModal();
        };

        // Attach event listener when modal is open, remove it when it is closed
        if(props.open) document.addEventListener('keydown', handleKeyPress);
        else document.removeEventListener('keydown', handleKeyPress);

        // Clean up the event listener when component unmounts
        return () => document.removeEventListener('keydown', handleKeyPress);
        //eslint-disable-next-line
    }, [props.open]);

    return (
        <Modal open={props.open} onClose={props.toggleModal}>
            <Box sx={style}>
                <h1>Enter Input for {props.inputKey}</h1>
            </Box>
        </Modal>
    )
}
import { Box, Card, CardActionArea, CardActions, CardMedia, Divider, Grid, IconButton, LinearProgress, TextField } from '@mui/material';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import GlobalStoreContext from '../store';
import EditIcon from '@mui/icons-material/Edit';
import BackButton from './BackButton';
import avatar from '../assets/default-avatar.jpg'
import AuthContext from '../auth';

export default function ProfileScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const [showProfileScreen, setShowProfileScreen] = useState(true);
    const [editEnabled, setEditEnabled] = useState(false);
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [postImage, setPostImage] = useState("")

    // Handles switching between Profile screen and Achievements screen
    const handleToggleScreen = () => {
        setShowProfileScreen(!showProfileScreen);
    };

    // Handles submitting the profile info once editing is turned off
    function handleEditProfile(event) {

        if(username.length === 0) {
            setUsername(auth.username)
            console.log(auth.username)
            console.log(username)
            store.updateProfile(auth.username, bio, postImage)
        }

        else if(editEnabled) {
            auth.updateUsername(username)
            store.updateProfile(username, bio, postImage)
        }

        setEditEnabled(!editEnabled);
    }

    // Handles changing the bio state value
    function handleBioChange(event) {
        setBio(event.target.value)
    }

    // Handles changing the username state value
    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    // When a pfp is uploaded, it's converted to base 64 and sent to the server
    async function handleFileUpload(event) {
        const file = event.target.files[0]
        
        // If the user actually uploaded a file instead of cancelling
        if (file) {
            const base64 = await convertToBase64(file)
            setPostImage(base64)
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
    }

    // Helper function to convert a file into base 64
    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file) // read contents of file
            fileReader.onload = () => { // when read is successful, return contents of the file
                resolve(fileReader.result)
            }
        })
    }

    useEffect(() => {
        store.getProfile()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setUsername(auth.username)
        if(store.profileInfo) {
            setBio(store.profileInfo.bio)
            setPostImage(store.profileInfo.pfp)
        }

        // eslint-disable-next-line
    }, [auth, store.profileInfo])

    const profileScreen = (
            <Card sx={{
                bgcolor: '#4D9147',
                top: '20%',
                left: '25%',
                position: 'absolute',
                boxShadow: 10,
                textAlign: 'center',
                borderRadius: '16px',
                color: 'white', 
            }}>
                <CardActionArea>
                    <Divider />
                    <Box sx={{
                        bgcolor: '#e3e3e3',
                        width: '100%',
                        height: '70%',
                        color: 'black',
                    }}>
                        <Grid container spacing={4} sx={{textAlign: 'left'}}>
                            <Grid item xs={12} onClick={handleToggleScreen} sx={{
                                bgcolor: '#4D9147',
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                <h1>Mayhem Hospital</h1>
                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs={4}>
                                <Box sx={{
                                    width: '140px',
                                    height: '140px',
                                    border: 2,
                                    borderColor: 'black',
                                    ml: 2
                                }}>
                                    <form
                                        onSubmit={handleSubmit}>
                                        <label htmlFor="file-upload">
                                            <img 
                                                src={postImage || avatar}
                                                width={140}
                                                height={140}
                                                alt=''/>
                                        </label>
                                        <input
                                            type="file"
                                            label="Image"
                                            name="myFile"
                                            id='file-upload'
                                            accept='.jpeg, .png, .jpg'
                                            style={{display: "none"}}
                                            disabled={!editEnabled}
                                            onChange={(event) => handleFileUpload(event)}>
                                        </input>
                                    </form>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sx={{fontSize: '12pt'}}>
                                {editEnabled ?
                                    <>
                                        <TextField
                                            id='username-input'
                                            size='small'
                                            value={username}
                                            fullWidth
                                            variant="outlined"
                                            onChange={handleUsernameChange}
                                        />
                                        <p>
                                            Last Seen: Now<br/>
                                            Registered Since: Jan 22, 2024
                                        </p>
                                    </>
                                    :
                                    <>
                                        <p id='username-text'>
                                            {username}
                                        </p>
                                        <p>
                                            Last Seen: Now<br/>
                                            Registered Since: Jan 22, 2024
                                        </p>
                                    </>
                                }
                            </Grid>
                            <Grid item xs={1} />
                            <Grid item xs={12} />
                        </Grid>   
                    </Box>
                </CardActionArea>
                <CardActions>
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        bgcolor: 'white'
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField 
                                    id="bio"
                                    label="Bio"
                                    multiline
                                    fullWidth
                                    rows={4}
                                    defaultValue={bio}
                                    onChange={handleBioChange}
                                    variant="filled"
                                    disabled={!editEnabled}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{
                                bgcolor: '#4D9147',
                            }}>
                                <IconButton id='edit-button' onClick={(event) => {handleEditProfile(event)}} 
                                    sx={{
                                        color: editEnabled ? 'red' : 'white'
                                }}>
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </CardActions>            
            </Card>
    );

    const achievementsScreen = (
        <Card sx={{
            bgcolor: '#4D9147',
            top: '20%',
            left: '25%',
            position: 'absolute',
            boxShadow: 10,
            textAlign: 'center',
            borderRadius: '16px',
            color: 'white', 
            width: '53%'
        }}>
            <CardActionArea 
                onClick={handleToggleScreen}>
                <Divider />
                <Box sx={{
                    bgcolor: '#e3e3e3',
                    width: '100%',
                    height: '70%',
                    color: 'black',
                }}>
                    <Grid container spacing={4} sx={{
                        textAlign: 'center'
                    }}>
                        <Grid item xs={12} sx={{
                            bgcolor: '#4D9147',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <h1>Mayhem Hospital</h1>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{
                                width: '140px',
                                height: '140px',
                                ml: 2
                            }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image="https://upload.wikimedia.org/wikipedia/commons/d/d6/Gold_coin_icon.png"
                                    title="medal1"
                                />
                            </Box>
                            
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{
                                width: '140px',
                                height: '140px',
                                ml: 2
                            }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image="https://upload.wikimedia.org/wikipedia/commons/d/d6/Gold_coin_icon.png"
                                    title="medal2"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{
                                width: '140px',
                                height: '140px',
                                ml: 2
                            }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image="https://upload.wikimedia.org/wikipedia/commons/d/d6/Gold_coin_icon.png"
                                    title="medal3"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{
                                width: '140px',
                                height: '140px',
                                ml: 2
                            }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image="https://upload.wikimedia.org/wikipedia/commons/d/d6/Gold_coin_icon.png"
                                    title="medal4"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={3} sx={{
                        }}>
                            <Box sx={{ width: '80%', ml: '10%'}}>
                                <LinearProgress variant="determinate" value={32} />
                            </Box>
                            <p>
                                Win/Loss Ratio<br/>
                                20-9<br/>
                                Patients Saved<br/>
                                182
                            </p>
                        </Grid>
                        <Grid item xs={3} sx={{
                        }}>
                            <Box sx={{ width: '80%', ml: '10%'}}>
                                <LinearProgress variant="determinate" value={50} />
                            </Box>
                            <p>
                                Minigames Completed per Game<br/>
                                109<br/>
                                Patient Deaths<br/>
                                36
                            </p>
                        </Grid>
                        <Grid item xs={3} sx={{
                        }}>
                            <Box sx={{ width: '80%', ml: '10%'}}>
                                <LinearProgress variant="determinate" value={20} />
                            </Box>
                            <p>
                                Time Played<br/>
                                9h 50m 2s<br/>
                                Favorite Fellow Doctor<br/>
                                JareBear
                            </p>
                        </Grid>
                        <Grid item xs={3} sx={{
                        }}>
                            <Box sx={{ width: '80%', ml: '10%'}}>
                                <LinearProgress variant="determinate" value={100} />
                            </Box>
                            <p>
                                Longest Win Streak<br/>
                                3<br/>
                                Most Played Map<br/>
                                Healing Havoc
                            </p>
                        </Grid>
                    </Grid>   
                </Box>
            </CardActionArea>   
        </Card>
    );

    return (
        <div id="profile-screen">
            {showProfileScreen ? profileScreen : achievementsScreen}
            <Sidebar />
            <BackButton />
        </div>
    );
}
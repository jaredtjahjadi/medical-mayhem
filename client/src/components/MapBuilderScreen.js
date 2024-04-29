import { Button, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Slider, Switch, TextField } from '@mui/material';
import {FormControl} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import GlobalStoreContext from '../store';
import Sidebar from './Sidebar';
import BackButton from './BackButton';
import { buttonStyle } from '../App';
import player1 from '../assets/Player-1.png.png';
import player2 from '../assets/Player-2.png.png';
import player3 from '../assets/Player-3.png.png';
import player4 from '../assets/Player-4.png.png';
import player5 from '../assets/Player-5.png.png';
import player6 from '../assets/Player-6.png.png';
import addPlayer from '../assets/Add-Player.png.png';

export default function MapBuilderScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [selectedCharacter, setCharacter] = useState(0);
    const [selectedSprite, setSelectedSprite] = useState("");
    const [postSprite, setSprite] = useState("");
    const [speed, setSpeed] = useState(0);
    const [strength, setStrength] = useState(0);
    const [defense, setDefense] = useState(0);
    const [favoredMinigame, setMinigame] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [avatarName, setAvatarName] = useState("");

    const players = [
        player1,
        player2,
        player3,
        player4,
        player5,
        player6,
    ];

    function valuetext(value) {
        return `${value}°C`;
    }
    function handleSubmit(event) {
        event.preventDefault();
    }

    async function handleFileUpload(event) {
        // event.preventDefault();
        const file = event.target.files[0]
        
        // If the user actually uploaded a file instead of cancelling
        if (file) {
            const base64 = await convertToBase64(file);
            setSprite(base64);
            setCharacter(6);
            setSelectedSprite(base64);
        }
    }
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
        store.getAvatar();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {     
        setSelectedSprite(store.avatar.pic);
        setAvatarName(store.avatar.name);
        setSprite(store.avatar.pic);
        setSpeed(store.avatar.speed);
        setStrength(store.avatar.strength);
        setDefense(store.avatar.defense);
        setMinigame(store.avatar.favoredMinigame);
        setIsPublic(store.avatar.isPublic);
    }, [store.avatar])

    function handleCharacterClick(index) {
        switch(index) {
            case 0:
                setSelectedSprite(player1);
                break;
            case 1:
                setSelectedSprite(player2);
                break;
            case 2:
                setSelectedSprite(player3);
                break;
            case 3:
                setSelectedSprite(player4);
                break;
            case 4:
                setSelectedSprite(player5);
                break;
            case 5:
                setSelectedSprite(player6);
                break;
            case 6:
                setSelectedSprite(postSprite);
                break;
            default:
                break;
        }
        setCharacter(index);
    }

    function handleUpdateCharacter() {
        store.updateAvatar(selectedSprite, avatarName, speed, strength, defense, favoredMinigame, isPublic);
        store.updateAvatarList(selectedSprite, avatarName, speed, strength, defense, favoredMinigame, isPublic);
    }

    function handleUpdateName(event) {
        setAvatarName(event.target.value);
    }

    return (
        <div id="map-builder-screen">
            <Grid container spacing={2}>
                <Grid item xs={11} sx={{
                    bgcolor: '#3A9158',
                    color: 'white',
                }}>
                    <h1>Build your character!</h1>
                </Grid>
                <Grid item xs={1}>
                    <Sidebar />
                </Grid>
                <Grid item xs={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sx={{
                            textAlign: 'center',
                            ml: 3
                        }}>
                            <strong>Select a premade character or upload your own sprite!</strong>
                        </Grid>
                        {players.map((image, index) => (
                            <Grid key={index} item xs={4}>
                                <Paper elevation={3}
                                    id={'character-'+ (index)}
                                    sx={{ 
                                        height: '100%',
                                        width: '100%',
                                        mb: 2,
                                        ml: 3,
                                        backgroundColor: selectedCharacter === index ? 'lightblue' : 'white',
                                        border: selectedCharacter === index ? 1 : 0,
                                    }}
                                    onClick={() => handleCharacterClick(index)}
                                >
                                    <img
                                    src={image}
                                    alt={`${index+1}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                    />
                                </Paper>
                            </Grid>
                        ))}
                        <Grid item xs={4}>
                            <Paper elevation={3} 
                                id='character-6'
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    maxHeight: '50vh',
                                    mb: 2,
                                    ml: 3,
                                    alignContent: 'center', 
                                    backgroundColor: selectedCharacter === 6 ? 'lightblue' : '#ffffff',
                                    border: selectedCharacter === 6 ? 1 : 0,
                                }}
                                onClick={() => {handleCharacterClick(6)}}
                            >
                                <form
                                    onSubmit={handleSubmit}>
                                    <label htmlFor="file-upload">
                                        <img 
                                            src={addPlayer}
                                            alt=''
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}/>
                                    </label>
                                    <input
                                        type="file"
                                        label="Image"
                                        name="myFile"
                                        id='file-upload'
                                        accept='.jpeg, .png, .jpg'
                                        style={{display: "none"}}
                                        onChange={(event) => handleFileUpload(event)}>
                                    </input>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1}/>
                
                <Grid item xs={6}>
                    <Grid container spacing={2} sx={{
                        alignItems: 'center',
                        backgroundColor: 'white',
                        p: 2,
                        mt: 1,
                        boxShadow: 4
                    }}>
                        <Grid item xs={12}>
                            <img
                                src={selectedSprite}
                                alt=''
                                style={{
                                    maxWidth: '40vw',
                                    maxHeight: '30vh',
                                    objectFit: 'cover',
                            }}/>
                        </Grid>
                        <Grid item xs={12}>
                            <h3>Character Stats</h3>
                        </Grid>

                        <Grid item xs={2}>
                            Speed
                        </Grid>
                        <Grid item xs={1}>
                            0
                        </Grid>
                        <Grid item xs={6}>
                            <Slider
                                id='slider-speed'
                                value={speed}
                                getAriaValueText={valuetext}
                                valueLabelDisplay='auto'
                                shiftStep={3}
                                step={1}
                                marks
                                min={0}
                                max={3}
                                onChange={(event) => {setSpeed(event.target.value)}}
                                sx={{
                                    width: '80%',
                                    '& .MuiSlider-thumb': {
                                        backgroundColor: '#3A915'
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            3
                        </Grid>
                        <Grid item xs={1}/>


                        <Grid item xs={2}>
                            Strength
                        </Grid>
                        <Grid item xs={1}>
                            0
                        </Grid>
                        <Grid item xs={6}>
                            <Slider
                                id='slider-strength'
                                value={strength}
                                getAriaValueText={valuetext}
                                valueLabelDisplay='auto'
                                shiftStep={3}
                                step={1}
                                marks
                                min={0}
                                max={3}
                                onChange={(event) => {setStrength(event.target.value)}}
                                sx={{
                                    width: '80%'
                                }}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            3
                        </Grid>
                        <Grid item xs={1}/>


                        <Grid item xs={2}>
                            Defense
                        </Grid>
                        <Grid item xs={1}>
                            0
                        </Grid>
                        <Grid item xs={6}>
                            <Slider
                                id='slider-defense'
                                value={defense}
                                getAriaValueText={valuetext}
                                valueLabelDisplay='auto'
                                shiftStep={3}
                                step={1}
                                marks
                                min={0}
                                max={3}
                                onChange={(event) => {setDefense(event.target.value)}}
                                sx={{
                                    width: '80%'
                                }}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            3
                        </Grid>
                        <Grid item xs={1}/>
                        <Grid item xs={8}>
                            <FormControl fullWidth>
                                <InputLabel id="favorite-minigame">Favorite Minigame</InputLabel>
                                <Select
                                size='small'
                                value={favoredMinigame}
                                label="Favorite Minigame"
                                onChange={(event) => {setMinigame(event.target.value)}}
                                >
                                <MenuItem id='select-medication-matching' value={"Medication Matching"}>Medication Matching</MenuItem>
                                <MenuItem id='select-heartbeat-rhythm' value={"Heartbeat Rhythm"}>Heartbeat Rhythm</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControlLabel control={
                                <Switch 
                                    checked={isPublic}
                                    onChange={() => {setIsPublic(!isPublic)}}
                                />
                                } 
                                label="Public" 
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField fullWidth size='small' label='Name' value={avatarName}
                                onChange={(event) => {handleUpdateName(event)}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button id='confirm-changes' sx={[buttonStyle, {color: 'white'}]}
                            onClick={() => {handleUpdateCharacter()}}>
                                Confirm Changes
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
                
            </Grid>
            <BackButton/>
        </div>
    );
}
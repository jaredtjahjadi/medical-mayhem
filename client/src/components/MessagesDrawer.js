import * as React from 'react';
import { Box, Button, Divider, Drawer, Grid, List, ListItem, Tab, TextField } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';
import { buttonStyle } from '../App';
import SendIcon from '@mui/icons-material/Send';
import AuthContext, { UserRoleType } from '../auth';

export default function MessagesDrawer() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [value, setValue] = useState('1');
    const [state, setState] = useState('bottom');

    const tabButton = {
        color: 'white',
        '&.Mui-selected': {
            color: 'white'
        },
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function handleSendMessage(event) {
        switch(value) {
            case 1:
                store.sendPublicMessage(event);
                break;
            case 2:
                store.sendPartyMessage(event);
                break;
            case 3:
                store.sendPrivateMessage(event);
                break;
            default:
                break;
        }
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setState({ ...state, 'bottom' : open });
    };

    return (
        <div>
            <Box id="messages-box">
                <Button sx={[buttonStyle, {
                    color: 'white', 
                    borderRadius: '0px', 
                    bottom: '0%', 
                    position: 'absolute',
                    boxShadow: 4,
                    width: '40%'
                }]} 
                    onClick={toggleDrawer(true)}>Messages</Button>
            </Box>
            <Drawer
                anchor={'bottom'}
                open={state['bottom']}
                onClose={toggleDrawer(false)} 
                sx={{
                    width: '40%',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: '40%'
                    }
                }}>
                <Box sx={{ 
                    bgcolor: '#34732F' 
                }}>
                    <Box sx={{ 
                        typography: 'body1',
                    }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Public" value="1" sx={tabButton}/>
                                    {auth.role !== UserRoleType.GUEST && <Tab label="Party" value="2" sx={tabButton}/>}
                                    {auth.role !== UserRoleType.GUEST && <Tab label="Private" value="3" sx={tabButton}/>}
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Box sx={{
                                    bgcolor: '#E7E7E7',
                                }}>
                                    <List sx={{
                                        overflow: 'scroll',
                                        overflowX: 'hidden',
                                        height: '300px'
                                    }}>
                                        <ListItem>
                                            <strong>McKillaGorilla</strong>: Hello World
                                        </ListItem>
                                        <ListItem>
                                            <strong>ExamplePlayer</strong>: Hello!
                                        </ListItem>
                                        <ListItem>
                                            <strong>MedicalGamer</strong>: Hi Guys!
                                        </ListItem>
                                        <ListItem>
                                            <strong>User1</strong>: Yoooooooooo
                                        </ListItem>
                                        <ListItem>
                                            <strong>User2</strong>: World
                                        </ListItem>
                                        <ListItem>
                                            <strong>User3</strong>: Hi
                                        </ListItem>
                                        <ListItem>
                                            <strong>User1</strong>: omg
                                        </ListItem>
                                        <ListItem>
                                            <strong>ExamplePlayer</strong>: Wdym omg????
                                        </ListItem>
                                    </List>
                                </Box>
                            </TabPanel>
                            <TabPanel value="2">
                            <Box sx={{
                                    bgcolor: '#E7E7E7',
                                }}>
                                    <List sx={{
                                        overflow: 'scroll',
                                        overflowX: 'hidden',
                                        height: '300px'
                                    }}>
                                        <ListItem>
                                            <strong>McKillaGorilla</strong>: Hello World
                                        </ListItem>
                                        <ListItem>
                                            <strong>ExamplePlayer</strong>: Hello!
                                        </ListItem>
                                        <ListItem>
                                            <strong>MedicalGamer</strong>: Hi!
                                        </ListItem>
                                        <ListItem>
                                            <strong>User1</strong>: lololol
                                        </ListItem>
                                        <ListItem>
                                            <strong>User1</strong>: omg
                                        </ListItem>
                                    </List>
                                </Box>
                            </TabPanel>
                            <TabPanel value="3">
                            <Box sx={{
                                    bgcolor: '#E7E7E7',
                                }}>
                                    <List sx={{
                                        overflow: 'scroll',
                                        overflowX: 'hidden',
                                        height: '300px'
                                    }}>
                                        <ListItem>
                                            <strong>McKillaGorilla</strong>: Hello World
                                        </ListItem>
                                        <ListItem>
                                            <strong>ExamplePlayer (You)</strong>: Hello!
                                        </ListItem>
                                        <ListItem>
                                            <strong>McKillaGorilla</strong>: Hi Guys!
                                        </ListItem>
                                        <ListItem>
                                            <strong>ExamplePlayer (You)</strong>: Yoooooooooo
                                        </ListItem>
                                        <ListItem>
                                            <strong>McKillaGorilla</strong>: World
                                        </ListItem>
                                        <ListItem>
                                            <strong>ExamplePlayer (You)</strong>: Hi
                                        </ListItem>
                                        <ListItem>
                                            <strong>McKillaGorilla</strong>: omg
                                        </ListItem>
                                        <ListItem>
                                            <strong>ExamplePlayer (You)</strong>: testingggg
                                        </ListItem>
                                    </List>
                                </Box>
                            </TabPanel>
                            <Grid container spacing={1} sx={{
                                bgcolor: '#E7E7E7',
                                pl: 2,
                                pr: 2,
                                pb: 2
                            }}>
                                <Grid item xs={10}>
                                    <TextField fullWidth variant="standard" label="Send Message"/>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button onClick={(event) => {handleSendMessage(event)}}
                                        sx={{
                                            color: '#2d7044',
                                            top: '20%'
                                        }}>
                                        <SendIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </TabContext>
                    </Box>
                    <Divider />
                </Box>
            </Drawer>
        </div>
    );
}
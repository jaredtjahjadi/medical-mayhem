import { Avatar, Box, IconButton, Menu, MenuItem} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthContext, { UserRoleType } from '../auth';
import { useContext, useEffect, useState } from 'react';
import GlobalStoreContext from '../store';
import ReportModal from './ReportModal';

export default function Sidebar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [showReportModal, setShowReportModal] = useState(false);
    const [clickedUser, setClickedUser] = useState('');
    if(clickedUser); // Will implement later
    const [party, setParty] = useState(store.partyInfo);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleLogout() {
        if(auth.role === UserRoleType.GUEST) auth.logoutGuest();
        else {
            store.reset()
            auth.logoutUser();
        }
    }

    function handlePrivateMessaging(event) {
        // store.openPrivateMessaging(event);
        handleMenuClose();
    }

    function handleAddFriend(event) {
        // store.sendFriend(event);
        handleMenuClose();
    }

    function handlePromoteToLeader(event) {
        store.promoteToLeader(event);
        handleMenuClose();
    }

    function handleRemoveFromParty(event) {
        store.removeFromParty(event);
        handleMenuClose();
    }

    function handleReportPlayer(event) {
        setShowReportModal(true);
        handleMenuClose();
    }

    useEffect(() => {
        // if(auth.role !== UserRoleType.GUEST) store.getParty();
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        setParty(store.partyInfo);
    }, [store.partyInfo])

    const partyMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={(event) => {handlePrivateMessaging(event)}}>
                Private Message
            </MenuItem>
            <MenuItem onClick={(event) => {handleAddFriend(event)}}>
                Add Friend
            </MenuItem>
            <MenuItem onClick={(event) => {handlePromoteToLeader(event)}}>
                Promote to Leader
            </MenuItem>
            <MenuItem onClick={(event) => {handleRemoveFromParty(event)}}>
                Remove From Party
            </MenuItem>
            <MenuItem onClick={(event) => {handleReportPlayer(event)}}>
                Report Player
            </MenuItem>
        </Menu>
    );

    const renderPartyMembers = () => {
        const partyMembers = [];
        if(party && party.users.length > 0) {
            party.users.forEach((user, index) => {
                partyMembers.push(
                    <PartyMember user={user} key={index} onClick={(event) => {
                        setClickedUser(user);
                        handleProfileMenuOpen(event);
                    }} marginTop={(index * 50) + 10 + 'px'} />
                )
            })
        }
        return partyMembers;
    }

    return (
        auth.role !== UserRoleType.GUEST && 
            <Box sx={{ 
                backgroundColor: '#104c00',
                position: 'fixed',
                flexGrow: 1,
                height: '100%',
                width: '70px',
                display: 'flex',
                flexDirection: 'column',
                right: '0%'
            }}>
                {renderPartyMembers()}
                
                <IconButton onClick={()=>{handleLogout()}} sx={{
                    position: 'fixed',
                    alignContent: 'center',
                    bottom: '2%',
                    right: '15px',
                    color: 'white'
                }}>
                    <LogoutIcon />
                </IconButton>
                {partyMenu}
                <ReportModal open={showReportModal} onClose={() => setShowReportModal(false)} />
            </Box>
    );
}

function PartyMember(props) {
    const {user} = props;
    if(user) {
        return (
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={props.onClick}
                sx={{
                    position: 'absolute',
                    right: '22.5px',
                    marginTop: props.marginTop,
                    color: 'white'
                }}
            >
                <Avatar src={user.profilePicture} />
            </IconButton>
        );
    }
}
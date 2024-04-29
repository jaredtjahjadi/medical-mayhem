import { Menu, MenuItem } from "@mui/material";
import GlobalStoreContext from "../store";
import { useContext, useEffect, useState } from "react";

export default function UserOptionMenu(props) {
    const {targetUser, anchorEl, setAnchorEl, isMenuOpen, setShowReportModal, handleFriendModalClose, setConfirmModal} = props;
    const { store } = useContext(GlobalStoreContext);
    const [relationToUser, setRelationToUser] = useState(null);

    useEffect(() => {
        if(targetUser) store.getRelationToUser(targetUser); //eslint-disable-next-line
    }, [targetUser])

    useEffect(() => {setRelationToUser(store.relation)}, //eslint-disable-next-line
        [store.relation])

    const handleMenuClose = () => { setAnchorEl(null); };

    function handlePrivateMessaging(event) {
        store.openPrivateMessaging(event);
        handleMenuClose();
    }

    function handleInviteToParty() { handleMenuClose(); }

    // TODO: Display modal to confirm user wants to remove friend
    // TODO: Handle friend list updating once user removes friend (i dread dealing with useEffect tho...)
    function handleRemoveFriend() {
        store.removeFriend(targetUser);
        handleMenuClose();
    }

    function handleCancelRequest() {
        store.cancelFriendRequest(targetUser);
        handleMenuClose();
    }

    function handleIgnoreRequest() {
        store.ignoreFriendRequest(targetUser);
        handleMenuClose();
    }

    function handleAcceptRequest() {
        store.acceptFriendRequest(targetUser);
        handleMenuClose();
    }

    function handleReportPlayer() {
        setShowReportModal(true);
        handleMenuClose();
    }

    function handleBlockPlayer() {
        store.blockPlayer(targetUser);
        handleMenuClose();
    }

    let optionStr = () => {
        if(relationToUser === 'FRIENDS') return 'Remove Friend';
        else if(relationToUser === 'SENT') return 'Cancel Friend Request';
        else if(relationToUser === 'BLOCKED') return 'Unblock User';
        else if(relationToUser === 'RECEIVED') return 'Ignore Friend Request';
        else return 'Add Friend';
    }
    
    const acceptRequestItem = (
        <MenuItem onClick={() => handleAcceptRequest(targetUser)}>
            Accept Friend Request
        </MenuItem>
    )
    
    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            keepMounted
            transformOrigin={{vertical: 'top',horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={(event) => {handlePrivateMessaging(event)}}>
                Private Message
            </MenuItem>
            <MenuItem onClick={(event) => {handleInviteToParty(event)}}>
                Invite to Party
            </MenuItem>
            {relationToUser === 'RECEIVED' && acceptRequestItem}
            <MenuItem onClick={() => {
                if(relationToUser === 'FRIENDS') handleRemoveFriend();
                else if(relationToUser === 'SENT') handleCancelRequest();
                else if(relationToUser === 'RECEIVED') handleIgnoreRequest(targetUser);
                else if(relationToUser === 'BLOCKED') console.log('blocked');
                else {
                    store.sendFriend(targetUser, handleFriendModalClose, setConfirmModal);
                    handleMenuClose();
                }
            }}>
                {optionStr()}
            </MenuItem>
            <MenuItem onClick={handleReportPlayer}>Report Player</MenuItem>
            {relationToUser !== 'BLOCKED' && <MenuItem onClick={handleBlockPlayer}>Block Player</MenuItem>}
        </Menu>
    );
}
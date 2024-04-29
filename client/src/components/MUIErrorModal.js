import * as React from 'react';
import { Alert, AlertTitle, Button, Modal, Stack } from '@mui/material';

export default function MUIErrorModal(props) {
    const auth = props.auth;
    const store = props.store;
    let message = auth ? auth.errorMessage : store.errorMessage;
    function handleCloseModal() { auth ? auth.hideModal() : store.hideModal(); }

    return (
        <Modal id='error' open={auth ? (auth.errorMessage !== "") : (store.errorMessage !== "")}>
            <Stack sx={{ width: '40%', marginLeft: '30%', marginTop: '20%' }} spacing={2}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {message}
                    <Button color="primary" size="small" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Alert>
            </Stack>
        </Modal>
    );
}
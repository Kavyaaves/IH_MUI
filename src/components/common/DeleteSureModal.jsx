import React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Dialog } from '@mui/material';

const DeleteSureModal = ({ title, msg, isVisible, onClose, onConfirmation }) => {
    return (
        <Dialog open={isVisible} onClose={onClose}
            onBackdropClick={onClose} maxWidth="md"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{msg}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={onConfirmation}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteSureModal;

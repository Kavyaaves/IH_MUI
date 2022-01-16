import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { db } from '../../database';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';

export default function FormDialog({ isVisible, handleClose, postId, id, file }) {
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState(false);

    const handleChange = (event) => {
        setName(event.target.value);
        setError(false)
    };
    const createNewTab = async (e) => {
        if (name && name?.trim().length > 0) {
            const refFire = doc(db, "posts", postId, "files", id)
            const docRef = doc(db, "posts", postId)
            setDoc(docRef, { labels: arrayUnion(name) }, { merge: true })
            setDoc(refFire, {
                [name]: []
            }, { merge: true }).then(() => onClose())
        } else {
            setError(true)
        }
    }
    const onClose = () => {
        setError(false)
        setName("")
        handleClose()
    }


    return (
        <Dialog open={isVisible} onClose={onClose} onBackdropClick={onClose}>
            <DialogTitle>New Tab</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Create a new tab to move the paper 1 step further
                </DialogContentText>
                <TextField
                    autoFocus
                    value={name}
                    onChange={handleChange}
                    error={error}
                    margin="dense"
                    id="tab"
                    label="Tab"
                    type="text"
                    fullWidth
                    required
                    helperText={!error ? "" : "Tab Name is required"}
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={createNewTab} variant="contained" type="submit">Create New Tab</Button>
            </DialogActions>
        </Dialog>
    );
}
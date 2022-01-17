import React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { db } from '../../../database';
import { arrayRemove, arrayUnion, doc, onSnapshot, setDoc } from 'firebase/firestore';

const MoveTabsModal = ({ title, msg, isVisible, onClose, postId, files, id, selected, currTab }) => {
    const [tab, setTab] = React.useState('');
    const [dropdown, setDropdown] = React.useState([])
    const [error, setError] = React.useState(false);
    React.useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "posts", postId), (querySnapshot) => {
            setDropdown(querySnapshot.data().labels)
        });
        return () => unsubscribe()
    }, [])
    const handleChange = (event) => {
        setTab(event.target.value)
        setError(false)
    }
    console.log(tab, currTab, selected)
    const onConfirmation = async () => {
        if (tab && tab != "") {
            selected?.forEach((item) => {
                setDoc(doc(db, "posts", postId, "files", id), {
                    [tab]: arrayUnion(item)
                }, { merge: true }).then(() => {
                    setDoc(doc(db, "posts", postId, "files", id), {
                        [currTab]: files.filter((f) => f.id != item.id)
                    }, { merge: true }).then(() => {
                        onClose()
                    })
                })
            })
        } else {
            setError(true)
        }
    }
    return (
        <Dialog open={isVisible} onClose={onClose}
            onBackdropClick={onClose} maxWidth="md"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{msg}</DialogContentText>
                <br />
                <FormControl fullWidth error={error}>
                    <InputLabel id="demo-simple-select-label">Tab</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={tab}
                        label="Tab"

                        onChange={handleChange}                    >
                        {dropdown?.filter(d => d != currTab)?.map((d) => (<MenuItem value={d}>{d}</MenuItem>))}
                    </Select>
                    {error && <FormHelperText>Please select a tab</FormHelperText>}
                </FormControl>
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
        </Dialog >
    );
};

export default MoveTabsModal;

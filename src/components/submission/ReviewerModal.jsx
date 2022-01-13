import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Person from '@mui/icons-material/Person';
import { Link, Redirect } from 'react-router-dom';
import { db } from '../../database';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { CheckBox } from '@mui/icons-material';

const ReviewerModal = ({ isVisible, onClose }) => {
    const [reviewers, setReviewers] = useState([])
    const classes = useStyles()
    const [isItemSelected, setIsItemSelected] = useState(undefined)
    useEffect(async () => {

        const q = query(collection(db, "users"), where("role", "==", "Reviewer"))
        const unsubscribe = await onSnapshot(q, (querySnapshot) => {
            const cities = [];
            querySnapshot.forEach((doc) => {
                cities.push(doc.data());
            });
            setReviewers(cities)
            return cities
        });
        return () => unsubscribe()
    }, [])
    const handleClick = (row) => {
        setIsItemSelected(row?.id)
    }
    return (
        <Dialog open={isVisible} onClose={onClose}
            onBackdropClick={onClose} fullWidth="md" maxWidth="md"
        >
            <Paper className={classes.paper}>
                <DialogTitle
                    variant='h6'
                    style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Choose a Reviewer
                </DialogTitle>
                <br />
                {/* Total: {reviewers?.length} */}
                {/* {open && (
                <Dialog
                    open={open}
                    onClose={() => {
                        setRedirect(true);
                    }}>
                    <Dialogue
                        open={open}
                        handleOpen={setOpen}
                        title='Sent to Reviewer'
                        msg='The paper is successfully alotted to the reviewer'
                    />
                </Dialog>
            )} */}
                <DialogContent dividers={true} style={{ minHeight: '55vh' }}>
                    <List className={classes.list} dense>
                        {reviewers?.length !== 0 &&
                            reviewers?.map((item, i) => {
                                return (
                                    <ListItem
                                        // button
                                        key={i}
                                        style={
                                            // item === rev
                                            // ? { backgroundColor: '#ededed' }
                                            // :
                                            { backgroundColor: '#fff' }
                                        }
                                    >
                                        <CheckBox
                                            onChange={(e) => setIsItemSelected(e.target.checked)}
                                            color="primary"
                                            style={{ marginRight: 15 }}
                                            checked={isItemSelected}
                                            inputProps={{
                                                // 'aria-labelledby': labelId,
                                            }}
                                        />
                                        <ListItemAvatar>
                                            <Avatar src={item?.imageUrl}>
                                                <Person />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={item?.displayName} />
                                        <ListItemSecondaryAction>
                                            {/* <Link to={'/user/' + item.id} key={i}> */}
                                            <IconButton>
                                                <ArrowForward />
                                            </IconButton>
                                            {/* </Link> */}
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })}
                    </List>
                </DialogContent>
                <br />
                <DialogActions className={classes.buttonDiv}>
                    {/* {rev && ( */}
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            // handleSubmit(rev);
                        }}
                        variant='contained'
                        style={{ margin: 'auto' }}
                        color='primary'
                        disabed={true}>
                        Send to Reviewer
                    </Button>
                    {/* )} */}
                </DialogActions>
            </Paper>
        </Dialog >
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        height: "80vh"
    },
    buttonDiv: { width: '100%', alignItems: 'end', textAlign: 'center', justifyContent: "center" },
}))
export default ReviewerModal

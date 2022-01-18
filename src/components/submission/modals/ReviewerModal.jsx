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
import { db } from '../../../database';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { arrayUnion, collection, doc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { Checkbox, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ReviewerModal = ({ isVisible, onClose, rev }) => {
    const [reviewers, setReviewers] = useState([])
    const classes = useStyles()
    const [selected, setSelected] = useState([])
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
    const handleClick = (e, item) => {
        if (e.target.checked)
            setSelected([item])
        else
            setSelected([])
    }
    const assignToReviewer = async () => {
        debugger
        if (selected[0]?.id && rev) {
            setDoc(doc(db, "posts", rev[0]?.id), {
                reviewerId: selected[0]?.id,
                status: "Under Review"
            }, { merge: true }).then(() => {
                alert("success")
            })
        }
    }
    return (
        <Dialog open={isVisible} onClose={onClose}
            onBackdropClick={onClose} fullWidth="md" maxWidth="md"
        >
            <DialogTitle
                variant='h6'
                style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Choose a Reviewer
            </DialogTitle>
            <br />
            <DialogContent dividers={true} style={{ minHeight: '55vh' }}>
                <List className={classes.list} dense>
                    {reviewers?.length !== 0 &&
                        reviewers?.map((item, i) => {
                            return (
                                <ListItem key={i}>
                                    <Checkbox
                                        onChange={(e) => handleClick(e, item)}
                                        color="primary"
                                        style={{ marginRight: 15 }}
                                        checked={selected[0]?.id == item?.id}
                                        inputProps={{
                                            'aria-labelledby': "controlled",
                                        }}
                                    />
                                    <ListItemAvatar>
                                        <Avatar src={item?.imageUrl} alt={item?.displayName}>
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
                        assignToReviewer();
                    }}
                    variant='contained'
                    style={{ margin: 'auto' }}
                    color='primary'
                    disabed={true}>
                    Send to Reviewer
                </Button>
                {/* )} */}
            </DialogActions>
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

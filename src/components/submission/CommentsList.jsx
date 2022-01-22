import { Delete, Lock, LockOpen } from '@mui/icons-material'
import { Avatar, Card, CardContent, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { arrayRemove, collection, deleteDoc, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../../database'
import CommentsTab from './CommentsTab'

const CommentsList = ({ postId, }) => {
    const classes = useStyles()
    const [user, setUser] = React.useState({})
    const [authy, setAuthy] = React.useState({})
    const deleteComment = async (item) => {
        await deleteDoc(doc(db, "posts", postId, "comments", item.id))
    }
    React.useEffect(async () => {
        await onSnapshot(doc(db, "users", auth.currentUser?.uid), (querySnapshot) => {
            console.log(querySnapshot.data());
            setAuthy(querySnapshot.data())
        })
    }, [])
    const [comments, setComments] = React.useState([])
    React.useEffect(async () => {
        const unsubscribe = await onSnapshot(collection(db, "posts", postId, "comments"), (querySnapshot) => {
            let commentsData = []
            querySnapshot.forEach(async (comment) => {
                // let sender = await getDoc(doc(db, "users", comment.data().senderId))
                commentsData.push({ ...comment.data(), id: comment.id })
            })
            setComments(commentsData)
        });
        return () => unsubscribe()
    }, [])

    const updateComments = async (id, val) => {
        await setDoc(doc(db, "posts", postId, "comments", id), {
            userView: val
        }, { merge: true }).then(() => {
            alert("success")
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <Paper elevation={4} style={{ padding: 20, marginTop: 20 }}>
            <Stack direction="column" style={{ maxHeight: "100vh", overflowY: "scroll" }}>
                <CommentsTab postId={postId} />
                {comments?.map((item) => {
                    return (
                        <CardContent className={classes.cardContent}>
                            <Typography variant='body2' className={item?.senderId == auth.currentUser?.uid ? classes.commentRight : classes.commentLeft}>
                                <div className={classes.tot}>
                                    <div className={classes.userDiv}>
                                        <div
                                            style={{
                                                display: 'flex',
                                            }}>
                                            <Avatar
                                                size="small"
                                                className={classes.smallAvatar}
                                                alt={item?.sender?.displayName}
                                                src={item.imageUrl}
                                            />
                                            &nbsp;&nbsp;&nbsp;
                                            <Link
                                                to={'/user/' + item.userId}
                                                className={classes.name}>
                                                <Typography>{item.sender?.displayName}</Typography>
                                            </Link>
                                        </div>
                                    </div>
                                    {/* )} */}
                                    <Typography
                                        variant='body2'
                                        style={{ maxWidth: 500, textSpacing: 10 }}>
                                        {item.text}
                                    </Typography>
                                </div>
                                {/* {view === false && ( */}
                                <div className={classes.commentDiv1}>
                                    <span className={classes.commentDate}>
                                        {item.timestamp?.toDate().toDateString() +
                                            '  ' +
                                            item.timestamp?.toDate().toLocaleTimeString(undefined, {
                                                timezone: 'Asia/kolkata',
                                            })}
                                    </span>
                                    <div>
                                        {authy.role === 'Admin' && item.userView === true && (
                                            <Tooltip title='Unlocked'>
                                                <IconButton
                                                    style={{ color: '#fff' }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        updateComments(item.id, false);
                                                    }}>
                                                    <LockOpen />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        {authy.role === 'Admin' && item.userView === false && (
                                            <Tooltip title='Locked'>
                                                <IconButton
                                                    style={{ color: '#fff' }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        updateComments(item.id, true);
                                                    }}>
                                                    <Lock />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        {/* { */}
                                        <IconButton
                                            className={classes.commentDelete}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                deleteComment(item);
                                            }}>
                                            <Delete color="secondary" />
                                        </IconButton>
                                    </div>
                                </div>
                                {/* )} */}
                            </Typography>
                        </CardContent>
                    );
                })}
            </Stack>
        </Paper>
    )
}

export default CommentsList


const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'Open Sans, Roboto, Helvetica',
        fontSize: 6,
    },
    cardHeader: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        lineHeight: '5px',
        variant: 'dense',
    },
    smallAvatar: {
        width: 25,
        height: 25,
    },
    commentText: {
        justifyContent: 'space-between',
        display: 'flex',
        width: '100%'
    },
    commentField: {
        width: '100%',
        display: 'inline-flex',
    },
    name: {
        color: 'white',
        textAlign: 'center',
        padding: 2,
        textDecoration: 'none'
    },
    headerSpan: {
        display: 'flex',
        alignItems: 'center',
        paddingRight: '0px',
    },
    userDiv: {
        display: 'flex',
        marginBottom: 5,
        textTransform: 'none',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    tot: {
        textAlign: 'left',
        color: 'white',
        justifyContent: 'space-between',
    },
    send: {
        display: 'inline-flex',
        float: 'center',
        cursor: 'pointer',
    },
    commentDiv1: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 0,
    },
    cardContent: {
        width: '100%'
    },
    commentLeft: {
        padding: 0,
        justifyContent: "space-between",
        marginBottom: 10,
        backgroundColor: '#424242',
        color: 'white',
        borderRadius: '5px',
        fontSize: '10px',
        padding: 10,
        marginTop: 0,
        width: "75%",
        display: 'flex',
        float: 'left'
    },
    commentRight: {
        justifyContent: "space-between",
        marginBottom: 10,
        backgroundColor: '#424242',
        color: 'white',
        borderRadius: '5px',
        fontSize: '10px',
        padding: 10,
        marginTop: 0,
        width: "75%",
        display: 'flex',
        float: 'right'
    },
    cardContent2: {
        margin: 0,
        padding: 0,
        justifyContent: "start",
        background: 'none',
    },
    head: {
        paddingRight: 4,
        paddingLeft: 4,
    },
    commentDate: {
        display: 'block',
        fontSize: '0.8em',
        height: 20,
        display: 'inline-flex',
        float: 'right',
        color: 'white',
    },
    commentDelete: {
        color: '#fff',
        float: 'center',
        fontSize: '1.6em',
        verticalAlign: 'middle',
        cursor: 'pointer',
    },
}));


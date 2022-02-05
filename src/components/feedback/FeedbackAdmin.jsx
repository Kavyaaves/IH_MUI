import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import makeStyles from '@mui/styles/makeStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { db } from '../../database';
import { UserContext } from '../../providers/UserProvider';
import Dialog from '@mui/material/Dialog';
import { collection, onSnapshot } from 'firebase/firestore';

const FeedbackAdmin = ({ }) => {
    const classes = useStyles();
    const [del, setDel] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        const unsubscribe = await onSnapshot(collection(db, "feedback"), (snapshot) => {
            const postData = [];
            snapshot.forEach((doc) => {
                postData.push({ ...doc.data(), id: doc.id });
            });
            setPosts(postData);
        })

        return () => unsubscribe()
    }, []);

    // const removePost = async (post) => {
    //     const index = posts.indexOf(post);
    //     console.log(index);
    //     posts.splice(index, 1);
    //     const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));
    //     await waitFor(100);
    // };
    const deletePost = (post) => {
        db.doc(`feedback/${post.id}`)
            .delete()
            .then((doc) => {
                // removePost(post);
                setDel(true);
            })
            .catch((err) => {
                console.log(err);
                setError('Some error occurred. Please try again later');
            });
    };
    return (
        <CardContent className={classes.cardContent}>
            <p>Total: {posts.length}</p>
            <Typography variant='body2'>
                {posts &&
                    posts.map((post, i) => {
                        return (
                            <div style={{ marginTop: 30 }}>
                                <Card
                                    className={classes.card}
                                    key={i}
                                    style={{ backgroundColor: '#fff5ee' }}>
                                    <CardHeader
                                        action={
                                            <IconButton
                                                style={{
                                                    color: 'black',
                                                    fontSize: 'smaller',
                                                }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    deletePost(post);
                                                }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                        avatar={
                                            <Avatar
                                                className={classes.smallAvatar}
                                                src={post?.imageUrl || ''}
                                            />
                                        }
                                        title={
                                            <Link
                                                to={'/user/' + post.userId}
                                                style={{ color: 'black' }}>
                                                {post.userName}
                                            </Link>
                                        }
                                        subheader={
                                            <Typography variant='body2' color='primary'>
                                                {post.postedAt || ''}
                                            </Typography>
                                        }
                                        className={classes.cardHeader}
                                    />
                                    <CardContent
                                        style={{
                                            padding: 10,
                                            paddingLeft: 20,
                                            paddingRight: 20,
                                        }}>
                                        {post.text}
                                    </CardContent>
                                </Card>
                                <br />
                            </div>
                        );
                    })}
            </Typography>
            {/* {del && (
                <Dialog
                    open={del}
                    onClose={() => {
                        setDel(false);
                    }}>
                    <Dialogue
                        title='Success'
                        msg='Feedback deleted succcesfully'
                        handleOpen={setDel}
                    />
                </Dialog>
            )} */}
        </CardContent>
    );
};

export default FeedbackAdmin;

const useStyles = makeStyles((theme) => ({
    cardContent: {
        padding: 0,
        minHeight: 350,
        paddingBottom: 0,
        margin: 'auto',
        width: '100%',
    },
    cardHeader: {
        color: '#fff',
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 'small',
    },
}));

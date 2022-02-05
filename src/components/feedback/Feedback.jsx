import React, { useState, useEffect, useContext } from 'react';
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
import { Link, Redirect } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { auth, db } from '../../database';
import { UserContext } from '../../providers/UserProvider';
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import FeedbackAdmin from './FeedbackAdmin';
// import FeedbackAdmin from './FeedbackAdmin';

export default function NewPost(props) {
    const classes = useStyles();
    const { user, isAuthenticated } = useContext(UserContext);
    const [del, setDel] = useState(false);
    const [error, setError] = useState(null);
    const [value, setValue] = useState('');
    const [alert, setAlert] = useState(null);
    const [userFire, setUserFire] = useState({})

    useEffect(async () => {
        const unsubscribe = await onSnapshot(doc(db, "users", user?.uid), (snapshot) => {
            setUserFire(snapshot.data());
        })
        return () => unsubscribe()
    }, [user?.uid]);
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const timestamp =
            new Date().toDateString() +
            ' ' +
            new Date().toLocaleTimeString('en-us', { timeZone: 'Asia/Kolkata' });
        addDoc(collection(db, 'feedback'), {
            text: value,
            userId: user?.userId || '',
            userName: user ? user.displayName : 'Anonymous',
            imageUrl: user?.imageUrl || '',
            postedAt: timestamp,
        })
            .then((doc) => {
                setValue('');
                setAlert('Feedback recorded successfully');
            })
            .catch((err) => {
                setValue('');
                setError('Error getting your feedback. Please try again later');
            });
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Typography variant='h6' color="primary" style={{ textAlign: 'center' }}>
                    <strong>Feedback</strong>
                </Typography>
                {alert && (
                    <Alert
                        severity='success'
                        onClose={() => {
                            setAlert(false);
                        }}>
                        <AlertTitle>Success</AlertTitle>
                        Feedback recorded successfully.
                    </Alert>
                )}
                <CardHeader
                    avatar={<Avatar src={user?.imageUrl} />}
                    className={classes.cardHeader}
                    title={user ? user?.displayName : 'Anonymous'}
                />
                <CardContent className={classes.cardContent}>
                    <TextField
                        variant='outlined'
                        multiline
                        rows='4'
                        fullWidth
                        value={value}
                        required
                        onChange={handleChange}
                        className={classes.textField}
                        margin='normal'
                    />
                </CardContent>

                {error && (
                    <Alert
                        severity='error'
                        onClose={() => {
                            setError(false);
                        }}>
                        <AlertTitle>Error</AlertTitle>
                        Something went wrong. Please try again later
                    </Alert>
                )}

                <CardActions className={classes.cardActions}>
                    <Button
                        color='primary'
                        variant='contained'
                        disabled={value === '' || undefined}
                        onClick={handleSubmit}
                        className={classes.submit}>
                        POST
                    </Button>
                </CardActions>
            </Card>
            <br />
            {user && userFire.role === 'Admin' && (
                <Card
                    style={{
                        minHeight: 200,
                        margin: 'auto',
                    }}
                    className={classes.card}>
                    <FeedbackAdmin />
                </Card>
            )}

            <br></br>

            {error && (
                <Alert
                    severity='error'
                    onClose={() => {
                        setError(null);
                    }}>
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            )}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 365,
    },
    card: {
        padding: 15,
        margin: 'auto',
        boxShadow: 4,
    },
    cardContent: {
        padding: 0,
        paddingBottom: 0,
        margin: 'auto',
        width: '75%',
    },
    cardHeader: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 'small',
        width: '75%',
        margin: 'auto',
    },
    cardActions: {
        width: '75%',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoButton: {
        height: 30,
        marginBottom: 5,
    },
    input: {
        display: 'none',
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: '96%',
    },
    submit: {
        float: 'center',
        alignSelf: 'center',
        margin: 'auto',
    },

}));

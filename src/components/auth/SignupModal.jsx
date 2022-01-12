import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import CircularProgress from '@mui/material/CircularProgress';
import { validateSignUpData } from '../../validators/validators';
import { db, auth } from '../../database';
import { Box, Dialog, DialogActions, DialogContent, Divider, Paper } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Signup = ({ isVisible, handleClose }) => {
    const [state, setState] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        password: '',
        errors: {},
        loading: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const onClose = () => {
        setState({
            name: '',
            phoneNumber: '',
            email: '',
            password: '',
            errors: {},
            loading: false,
        })
        handleClose()
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setState({ ...state, loading: true });

        const newUserData = {
            displayName: state.name,
            phoneNumber: state.phoneNumber,
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword,
        };

        const { valid, errors } = validateSignUpData(newUserData);

        console.log(errors);
        setState({ ...state, errors: { errors, ...errors } });
        await createUserWithEmailAndPassword(auth, newUserData.email, newUserData.password)
            .then(function (result) {
                updateProfile(auth.currentUser, {
                    displayName: newUserData.displayName,
                    metaData: {
                        role: 'User',
                        phoneNumber: newUserData.phoneNumber,
                    },
                }).then((res) => {
                    const refFire = doc(db, "users", result.user.uid)
                    setDoc(refFire, {
                        email: result.user.email,
                        displayName: newUserData.displayName,
                        phoneNumber: newUserData.phoneNumber,
                        role: 'User',
                        userId: result.user.uid,
                        createdAt: serverTimestamp(),
                    });
                    handleClose()
                })
            })
            .catch((error) => {
                if (error.code === 'auth/weak-password')
                    setState({ errors: { password: error.message } });
                else if (error.code === 'auth/email-already-in-use')
                    setState({ errors: { email: error.message } });
                setState({ error: 'Error Signing up with email and password' });

            });
    }
    const classes = useStyles();
    const { errors, loading } = state;
    console.log(state)
    return (
        <Dialog open={isVisible} onClose={onClose} maxWidth="xs"
            onBackdropClick={onClose}
        >
            <DialogTitle>
                <Typography align="center" component='h1' variant='h5'>
                    Get Started
                </Typography>
            </DialogTitle>
            <Divider />
            {state.errors?.general ? (
                <Typography
                    variant='body2'
                    className={classes.customError}
                    color='error'>
                    {state.errors?.general}. Check your password length.
                </Typography>
            ) : ""}
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, justifyContent: "center", float: 'right' },
                }}
                noValidate
                autoComplete="off"
            >
                <DialogContent>
                    <TextField
                        size='small'
                        variant='outlined'
                        fullWidth
                        className={classes.input}
                        id='name'
                        label='Name'
                        name='name'
                        autoComplete='name'
                        helperText={state.errors?.name}
                        required
                        error={state.errors?.name ? true : false}
                        onChange={handleChange}
                    />

                    <TextField
                        size='small'
                        variant='outlined'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        helperText={state.errors?.email}
                        className={classes.input}
                        error={state.errors?.email ? true : false}
                        onChange={handleChange}
                    />
                    <TextField
                        size='small'
                        variant='outlined'
                        required
                        fullWidth
                        id='phoneNumber'
                        className={classes.input}
                        label='Phone Number'
                        name='phoneNumber'
                        autoComplete='phoneNumber'
                        pattern='[7-9]{1}[0-9]{9}'
                        helperText={state.errors?.phoneNumber}
                        error={state.errors?.phoneNumber ? true : false}
                        onChange={handleChange}
                    />

                    <TextField
                        size='small'
                        variant='outlined'
                        required
                        fullWidth
                        autoFocus
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        className={classes.input}
                        helperText={state.errors?.password}
                        error={state.errors?.password ? true : false}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                </DialogContent>
                <DialogActions style={{ alignItems: "center", justifyContent: "center" }}>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        onClick={handleSubmit}
                        disabled={
                            // state.loading ||
                            !state.email ||
                            !state.password ||
                            !state.name ||
                            !state.phoneNumber
                        }>
                        Sign Up
                        {state.loading && (
                            <CircularProgress size={30} className={classes.progess} />
                        )}
                    </Button>
                    <br />
                    <Button>Login</Button>
                </DialogActions>
                <br />
                <br />
            </Box>
        </Dialog >
    );
};

export default Signup;


const useStyles = makeStyles((theme) => ({
    root: {
        background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
        marginTop: 30,
        minHeight: 500,
        marginBottom: 20,
    },
    paper: {
        margin: 'auto',
        borderRadius: 5,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    input: {
        marginBottom: 50,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    progess: {
        position: 'absolute',
    },
}));

export const generateUserDocument = async (authId, info) => {
    // authId.reload().then(async () => {
    //     const user = auth.currentUser;
    //     // do your stuff here
    //     console.log(info, user);
    //     if (!user) return;
    //     const userRef = db.doc(`users/${user.uid}`);
    //     const snapshot = await userRef.get();
    //     console.log(user.phoneNumber);
    //     if (!snapshot.exists) {
    //         try {
    //             await userRef.set({
    //                 email: user.email,
    //                 displayName: user.displayName,
    //                 phoneNumber: info.phoneNumber,
    //                 role: 'User',
    //                 userId: user.uid,
    //                 createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //             });
    //         } catch (error) {
    //             console.error('Error creating user document', error);
    //         }
    //     }
    //     return getUserDocument(authId.uid);
    // });
};

export const getUserDocument = (uid) => {
    // if (!uid) return null;
    // try {
    //     const doc = db
    //         .doc(`users/${uid}`)
    //         .get()
    //         .then((doc) => {
    //             console.log(doc.data());
    //             console.log(doc.data());
    //             return doc.data();
    //         })
    //         .catch((err) => {
    //             console.error('Error fetching user', err);
    //         });
    //     return doc;
    // } catch (error) {
    //     console.error('Error fetching user', error);
    // }
};


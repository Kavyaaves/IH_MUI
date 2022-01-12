import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import makeStyles from '@mui/styles/makeStyles';
import Dialog from '@mui/material/Dialog';
import { auth } from '../../database';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import { Box, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import { validateLoginData } from '../../validators/validators';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ isVisible, handleClose }) => {
    const classes = styles();
    const [state, setState] = useState({
        email: '',
        password: '',
        errors: '',
        loading: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const onClose = () => {
        setState({
            email: '',
            password: '',
            errors: '',
            loading: false,
        })
        handleClose();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUserData = {
            email: state.email,
            password: state.password,
        };
        const { valid, errors } = validateLoginData(newUserData);
        setState({ ...state, errors });
        if (valid) {
            try {
                const data = {
                    email: state.email,
                    password: state.password,
                };
                await signInWithEmailAndPassword(auth, data.email, data.password)
                    .then((userCredential) => {
                        console.log(userCredential)
                        handleClose()
                    })
                    .catch((error) => {
                        setState({ ...state, errors: { general: error?.message || error } });
                        console.log(error)
                    });
            } catch (e) {
                console.log(e);
            }
        }

    };

    return (
        <Dialog open={isVisible} onClose={onClose} maxWidth="xs"
            onBackdropClick={onClose}
        >
            <DialogTitle>
                <Typography align="center" component='h1' variant='h5'>
                    Login
                </Typography>
            </DialogTitle>
            <Divider />

            {state.errors?.general && (
                <Alert
                    severity='error'
                    onClose={() => {
                        setState({ email: '', password: '', errors: '' });
                    }}>
                    <AlertTitle>Error</AlertTitle>
                    {state.errors?.general}
                </Alert>
            )}
            <br />
            <Box
                component="form"
                sx={{
                    // '& .MuiTextField-root': {  1, justifyContent: "center" },
                }}
                noValidate
                autoComplete="off"
            >
                <DialogContent>

                    <TextField
                        size='small'
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        className={classes.input}
                        helperText={state.errors?.email}
                        error={state.errors?.email ? true : false}
                        onChange={handleChange}
                    />
                    <TextField
                        size='small'
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        className={classes.input}
                        autoComplete='current-password'
                        helperText={state.errors?.password}
                        error={state.errors?.password ? true : false}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions style={{ alignItems: "center", justifyContent: "center" }}>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        onClick={handleSubmit}
                        disabled={state.loading || !state.email || !state.password}>
                        Log In
                        {/* {state.loading && (
                        <Dialog
                            style={{ padding: 10 }}
                            maxWidth='md'
                            onClose={() => {
                                setState({ ...state, loading: false });
                            }}>
                            <div style={{ padding: 10, display: 'flex' }}>
                                &nbsp;&nbsp;&nbsp;
                                <CircularProgress size={30} className={classes.progess} />
                            </div>
                        </Dialog>
                    )} */}
                    </Button>
                </DialogActions>
                <br />
                <div
                    style={{
                        textTransform: 'none',
                        textAlign: 'center',
                        background: 'none',
                        textDecoration: 'none',
                    }}>
                    <br />
                    <Link to='signup'>Don't have an account? SIGN UP</Link>
                    <br />
                    <Button
                        style={{
                            textTransform: 'none',
                            textAlign: 'center',
                            background: 'none',
                            textDecoration: 'none',

                        }}>
                        <Link to='reset'>Forgot Password?</Link>
                    </Button>
                </div>
                <br />
            </Box>
        </Dialog >
    );
};

export default Login;
const styles = makeStyles((theme) => ({
    paper: {
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        marginBottom: 10,
        margin: 'auto',
        backgroundColor: 'white',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    input: {
        marginBottom: 0.1,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10,
        textAlign: 'center',
    },
    progess: {
        position: 'absolute',
    },
}));

import React, { useState, useEffect, useContext } from 'react';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import CardContent from '@mui/material/CardContent';
import { Link, Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createStyles, makeStyles } from '@mui/styles';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage, auth } from '../../database';
import { UserContext } from '../../providers/UserProvider';
import { v4 as uuidv4 } from 'uuid';
import { Alert, AlertTitle, TextField } from '@mui/material';
const SubmitPaper = () => {
    const classes = useStyles()
    const { user, isAuthenticated } = useContext(UserContext)
    const [fileNames, setFileNames] = useState([]);
    const [files, setFiles] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("")
    const [formValidated, setFormValidated] = useState(false)
    const handleDrop = async (acceptedFiles) => {
        const accFiles = [];
        acceptedFiles.forEach((file) => {
            if (file.type === 'application/pdf') {
                setShow(true)
            } else {
                accFiles.push(file);
            }
        });
        if (accFiles.length === acceptedFiles.length) {
            setFiles(accFiles);
            setFileNames(accFiles.map((file) => file.name));
        } else {
            setFiles(null);
        }
    };
    console.log(user)
    const uploadFile = async (data) => {
        const postid = uuidv4();
        setFormValidated(true)
        if (title && files.length > 0) {
            const posts = [];
            try {
                let t = serverTimestamp()
                console.log(t)
                files?.map((file) => {
                    const uu = uuidv4()
                    const storageRef = ref(storage, `files/${file.name}${uu}`)
                    uploadBytes(storageRef, file).then(async (snapshot) => {
                        const refFire = doc(db, "posts", postid)
                        getDownloadURL(storageRef)
                            .then((url) => {
                                console.log("get download", url)
                                posts.push({ filename: file.name, url: url, id: uuidv4() });
                                setDoc(refFire, {
                                    title: title,
                                    status: "Submitted",
                                    id: postid,
                                    files: {
                                        Submitted: [...posts],
                                    },
                                    userId: auth.currentUser?.uid,
                                    labels: ['Submitted'],
                                    username: auth.currentUser?.displayName,
                                    timestamp: serverTimestamp(),
                                },
                                    { merge: true }
                                );
                                setFiles([])
                                setFileNames([])
                                setTitle("")
                            })
                            .catch((err) => {
                                console.log(err)
                            });
                    });
                });
            } catch (err) {
                console.log(err)
            }
        }
    };

    console.log(files, fileNames, title)
    return (
        <Card >
            <Typography variant='h6' className={classes.typoHeader}>
                Submit Papers
            </Typography>

            <CardContent className={classes.cardContent}>
                <TextField
                    error={title == "" && formValidated}
                    label="Title"
                    required
                    fullWidth
                    value={title}
                    variant="filled"
                    helperText={title == "" && formValidated ? "Please provide a title to your paper" : ""}
                    onChange={(e) => {
                        setFormValidated(false)
                        setTitle(e.target.value)
                    }}
                />
                <br />
                <br />
                {show && (
                    <Alert
                        severity='error'
                        onClose={() => {
                            setShow(false);
                            setFiles([])
                            setFileNames([])
                        }}>
                        <AlertTitle>Cannot upload pdf files</AlertTitle>
                        Pdf files cannot be uploaded. Try uploading files other than pdf.
                    </Alert>
                )}
                <br />

                <Dropzone
                    onDrop={handleDrop}
                    className={classes.dropzone}>
                    {({ getRootProps, getInputProps }) => {
                        return (
                            <div {...getRootProps({})} className={classes.dropDiv}>
                                <input {...getInputProps()} />
                                <span>
                                    <CloudUploadIcon color="primary" />
                                </span>
                                <p>Drag and drop files or click to select files</p>
                            </div>
                        );
                    }}
                </Dropzone>
                <br />

                {files?.length > 0 ? (
                    <div className={classes.selectedDiv}>
                        <strong>Selected Files:</strong>
                        <ul>
                            {fileNames?.map((fileName) => (
                                <Typography variant="body1" key={fileName}>{fileName}</Typography>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <Typography className={classes.selectedDiv}>
                        <strong>No files selected</strong>
                    </Typography>
                )}
            </CardContent>
            <CardActions className={classes.CardActions}>
                <Button
                    color='primary'
                    variant='contained'
                    disabled={!user || files?.length === 0}
                    onClick={uploadFile}
                    type="submit"
                    className={classes.submitButton}>
                    Submit
                </Button>
            </CardActions>
            <br />
            {/* <Dialog
                open={progress}
                className={classes.logProg}
                maxWidth='md'
                onClose={() => {
                    setProgress(false);
                }}>
                <div className={classes.progressDiv}>
                    <CircularProgress size={15} className={classes.progess} />
                    &nbsp;&nbsp;&nbsp;
                    <Typography variant='body1'> Wait till uploading...</Typography>
                </div>
            </Dialog>
            <br />
            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false);
                    setRedirect(true);
                    return <Redirect to='/' />;
                }}>
                <Dialogue
                    title='Paper Recieved'
                    handleOpen={setOpen}
                    msg='Your paper is submitted successfully'
                />
            </Dialog> */}
        </Card>
    )
}

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 700,
        margin: 'auto',
        textAlign: 'center',
        padding: 0,
        marginTop: 0,
    },
    selectedDiv: {
        margin: 'auto',
        textAlign: 'center',
        alignItems: "start"
    },

    CardActions: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    dropDiv: {
        border: '2px dotted grey',
        minHeight: 150,
        textAlign: 'center',
        paddingTop: 30,
    },
    submitButton: {
        margin: 'auto',
        float: "center"
    },
    accept: {
        border: '#107c10',
    },
    logProg: {
        padding: 10,
    },

    reject: {
        border: '#d83b01',
    },
    progressDiv: {
        padding: 10,
        display: 'flex',
    },
    error: {
        verticalAlign: 'middle',
    },
    title: {
        paddingTop: 10,
    },
    card: {
        margin: 'auto',
        fontSize: 14,
        maxWidth: 700,
    },
    cardContent: {
        backgroundColor: 'white',
        paddingTop: 0,
        paddingBottom: 0,
        minHeight: 250,
        width: "75%",
        margin: 'auto',
    },
    textField: {

        width: 300,
    },
    header: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    typoHeader: {
        margin: 'auto',
        textAlign: 'center',
        paddingTop: "1em"
    },
    submit: {
        margin: 'auto',
    },
    dropzone: {
        minHeight: 200,
        border: '2px dotted grey',
    },
    topDiv: {
        minHeight: 300,

        margin: 'auto',
    },
    progress: {
        position: 'absolute',
        margin: 'auto',
    },
}));

export default SubmitPaper

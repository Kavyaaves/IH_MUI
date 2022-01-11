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
import { createStyles, makeStyles } from '@mui/styles';
const SubmitPaper = () => {
    const classes = useStyles()
    return (
        <Card >
            <Typography variant='h6' className={classes.typoHeader}>
                Submit Papers
            </Typography>

            <CardContent className={classes.cardContent}>
                <br />
                {/* {error && (
                    <Alert
                        severity='error'
                        onClose={() => {
                            setError(false);
                        }}>
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                )} */}
                {/* {show && (
                    <Alert
                        severity='error'
                        onClose={() => {
                            setShow(false);
                        }}>
                        <AlertTitle>Cannot upload pdf files</AlertTitle>
                        Pdf files cannot be uploaded. Try uploading files other than pdf.
                    </Alert>
                )} */}
                <br />

                <Dropzone
                    // onDrop={handleDrop}
                    className={classes.dropzone}>
                    {({ getRootProps, getInputProps }) => {
                        return (
                            <div {...getRootProps({})} className={classes.dropDiv}>
                                <input {...getInputProps()} />
                                <span>
                                    {/* <CloudUploadIcon /> */}
                                </span>
                                <p>Drag and drop files or click to select files</p>
                            </div>
                        );
                    }}
                </Dropzone>
                <br />

                {/* {files ? ( */}
                <div>
                    <strong>Selected Files:</strong>
                    {/* <ul>
                            {fileNames?.map((fileName) => (
                                <li key={fileName}>{fileName}</li>
                            ))}
                        </ul> */}
                </div>
                {/* ) : (
                    <Typography>
                        <strong>No files selected</strong>
                    </Typography>
                )} */}
                <br />
                <br />
            </CardContent>
            <CardActions>
                <Button
                    color='inherit'
                    variant='contained'
                    // disabled={!user || files?.length === 0 || progress || show}
                    // onClick={uploadFile}
                    className={classes.submitButton}>
                    Submit
                </Button>
            </CardActions>
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

    dropDiv: {
        border: '2px dotted grey',
        minHeight: 150,
        textAlign: 'center',
        paddingTop: 30,
    },
    submitButton: {
        margin: 'auto',
        textAlign: 'center',
        alignItems: 'center',
        marginBottom: "1em",
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

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { collection, onSnapshot } from 'firebase/firestore'
import React from 'react'
import { db } from '../../database'
import CommentsList from '../submission/CommentsList';

const FilesListUserView = ({ postId }) => {
    const [files, setFiles] = React.useState([])
    React.useEffect(async () => {
        const unsubscribe = await onSnapshot(collection(db, "posts", postId, "files"), (querySnapshot) => {
            let f = []
            querySnapshot.forEach(file => {
                f.push(file.data())
            })
            setFiles(f[0])
        })
        return () => unsubscribe()
    }, [])
    const steps = [
        "Submitted", "Under Review", "Completed"
    ]
    console.log("f", files);
    return (
        <div>
            <Typography variant='subtitle1'>
                <br />
                {files?.Submitted?.map((file, i) => (
                    <a
                        className="link_dark"
                        href={file.url}
                        target='_blank'
                        download={file.name}
                        rel='noreferrer'
                        key={i}>
                        <Typography key={i} variant="body2">{file.name}</Typography>
                    </a>))}
                {/* // )) : <Typography align="center" variant='body1'>No files submitted</Typography>} */}
            </Typography>
            <br />
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={0} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </div>
    )
}

export default FilesListUserView

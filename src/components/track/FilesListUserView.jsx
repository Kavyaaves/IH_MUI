import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { collection, onSnapshot } from 'firebase/firestore'
import React from 'react'
import { db } from '../../database'
import CommentsList from '../submission/CommentsList';

const FilesListUserView = ({ postId, files }) => {

    const steps = [
        "Submitted", "Under Review", "Completed"
    ]
    return (
        <div>
            <Typography variant='body2'>
                {files?.Submitted.length > 0 ?
                    files?.Submitted?.map((file, i) => (
                        <a
                            href={file.url}
                            target='_blank'
                            download={file.filename}
                            rel='noreferrer'
                            key={i}>
                            <Typography key={i}>{file.filename}</Typography>
                        </a>
                    )) : <Typography align="center" variant='body1'>No files submitted</Typography>}
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

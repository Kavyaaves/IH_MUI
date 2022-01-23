import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import { collection, onSnapshot } from 'firebase/firestore'
import { db, storage } from '../../database'
import CommentsList from '../submission/CommentsList';
import { Button, List } from '@mui/material';
import { v4 as uuidv4 } from 'uuid'
import { doc, setDoc, arrayUnion } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
const FilesListUserView = ({ postId, requestForResubmission, status, labels }) => {
    const [files, setFiles] = React.useState([])
    const [activeStep, setActiveStep] = React.useState(0)
    const [step, setStep] = React.useState([])
    React.useEffect(async () => {
        const unsubscribe = await onSnapshot(collection(db, "posts", postId, "files"), (querySnapshot) => {
            let f = []
            querySnapshot.forEach(file => {
                f.push(file.data())
            })
            setFiles(f[0])
        })
        let steps = []
        if (requestForResubmission == true) {
            steps = [
                "Submitted", "Under Review", "Resubmission", "Completed"
            ]
            setActiveStep(2)
        }
        else if (requestForResubmission == false && files?.Resubmitted?.length > 0) {
            steps = [
                "Submitted", "Under Review", "Resubmission", "Under Review", "Completed"
            ]
            setActiveStep(3)
        } else if (status == "Completed") {

            if (files.Resubmission?.length > 0) {
                steps = [
                    "Submitted", "Under Review", "Resubmission", "Under Review", "Completed"
                ]
                setActiveStep(5)
            }
            else {
                steps = [
                    "Submitted", "Under Review", "Completed"
                ]
                setActiveStep(2)
            }
        } else if (status == "Under Review") {
            if (files.Resubmission?.length > 0) {
                steps = [
                    "Submitted", "Under Review", "Resubmission", "Under Review", "Completed"
                ]
                setActiveStep(3)
            }
            else {
                steps = [
                    "Submitted", "Under Review", "Completed"
                ]
                setActiveStep(1)
            }
        } else if (status == "Submitted") {
            steps = [
                "Submitted", "Under Review", "Completed"
            ]
            setActiveStep(0)
        } else {
            steps = [
                "Submitted", "Under Review", "Completed"
            ]
            setActiveStep(0)
        }
        setStep(steps)
        return () => unsubscribe()
    }, [postId, requestForResubmission, files?.length])



    const handleFileChange = async (e) => {
        const files = [];
        for (let i = 0; i < e.target.files?.length; i++) {
            files.push(e.target.files[i])
        }
        if (files?.length > 0)
            try {
                files?.map((file) => {
                    const uu = uuidv4()
                    const storageRef = ref(storage, `files/${postId}/${file.name}_${uu}`)
                    uploadBytes(storageRef, file).then(async (snapshot) => {
                        const refFire = collection(db, "posts", postId, "files")
                        onSnapshot(refFire, (querySnapshot) => {
                            querySnapshot.forEach((d) => {
                                getDownloadURL(storageRef)
                                    .then((url) => {
                                        console.log(url, d.id);
                                        setDoc(doc(db, "posts", postId, "files", d.id), {
                                            Resubmitted: arrayUnion({
                                                name: file.name,
                                                url, id: uu, size: file.size,
                                                lastModifiedDate: file.lastModifiedDate,
                                                type: file.type
                                            })
                                        }, { merge: true }).catch((err) => console.log(err))
                                    })
                            })
                            setDoc(doc(db, "posts", postId), {
                                labels: arrayUnion("Resubmitted")
                            }, { merge: true })
                        }).catch((err) => console.log(err))
                    });
                })
            } catch (err) {
                console.log(err)
            }
    }
    return (
        <div>
            <Typography variant='subtitle1'>
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <List>
                        {files?.Submitted?.map((file, i) => (
                            <Typography key={i} variant="body2">
                                <a
                                    className="link_dark"
                                    href={file.url}
                                    target='_blank'
                                    download={file.name}
                                    rel='noreferrer'
                                    key={i}>
                                    {file.name}
                                </a></Typography>))}
                    </List>
                    {requestForResubmission && <label htmlFor="contained-button-file">
                        <Input id="contained-button-file" multiple type="file" onChange={handleFileChange} style={{ display: "none" }} />
                        <Button variant="contained" component="span">
                            Upload
                        </Button>
                    </label>}
                </div>
                {files?.Resubmitted?.length > 0 && <List>
                    <Typography variant="body2">
                        Resubmitted Files:
                    </Typography>
                    {files?.Resubmitted?.map((file, i) => (
                        <Typography key={i} variant="body2">
                            <a
                                className="link_dark"
                                href={file.url}
                                target='_blank'
                                download={file.name}
                                rel='noreferrer'
                                key={i}>
                                {file.name}
                            </a></Typography>))}
                </List>}
                {/* // )) : <Typography align="center" variant='body1'>No files submitted</Typography>} */}
            </Typography>
            <br />
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {step.map((label) => (
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

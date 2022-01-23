import { Card, CardContent, CardHeader, Chip, Stack, Typography, Input, Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import { makeStyles } from '@mui/styles'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import React from 'react'
import { useParams } from 'react-router-dom'
import { auth, db, storage } from '../../database'
import CommentsUserView from './CommentsUserView'
import FilesListUserView from './FilesListUserView'
import { v4 as uuidv4 } from 'uuid'
import { doc, setDoc, arrayUnion } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
const TrackSubmissions = () => {
    const [posts, setPosts] = React.useState([])
    const classes = useStyles()

    React.useEffect(async () => {
        await onSnapshot(query(collection(db, "posts"), where("userId", "==", auth.currentUser?.uid)), (querySnapshot) => {
            let postData = []
            querySnapshot.forEach(doc => {
                postData.push({ ...doc.data() })
            })
            setPosts(postData)
        })
    }, [auth.currentUser?.uid])

    return (
        <>
            <h3>My Submissions</h3>
            {posts?.map((post, i) => (
                <>
                    <Card variant="outlined" key={i} >
                        <CardContent>
                            <Stack justifyContent="space-between" direction="row" >
                                <div>
                                    <Typography variant='h6'>{post?.title}</Typography>
                                    <Typography variant='caption'>Submitted on: {post.timestamp.toDate().toDateString() +
                                        ' ' +
                                        post.timestamp.toDate().toLocaleTimeString(undefined, {
                                            timezone: 'Asia/kolkata',
                                        })}</Typography>
                                </div>
                                {post?.requestForResubmission && <Chip label="Requested For Resubmission" color="error" variant="filled" />}
                            </Stack>
                            <FilesListUserView postId={post?.id} requestForResubmission={post?.requestForResubmission} status={post?.status} labels={post?.labels} />
                            <CommentsUserView postId={post?.id} />
                        </CardContent>
                    </Card>
                    <br />
                </>
            ))}
        </>
    )
}
const useStyles = makeStyles(({
    paper: {
        padding: 5
    },
    input: {
        display: "none"
    }
}))
export default TrackSubmissions
// const q = query(collection(db, "posts"), where("userId", "==", auth.currentUser?.uid))
// let arr = []
// const querySnapshot = await getDocs(q)
// querySnapshot.forEach(async snap => {
//     const f = []
//     const com = await getDocs(collection(db, "posts", snap.data()?.id, "files"))
//     com.forEach(snap => {
//         console.log("files", snap.data())
//         f.push(snap.data())
//     })
//     const comments = []
//     const comm = await getDocs(collection(db, "posts", snap.data()?.id, "comments"))
//     comm.forEach(snap => {
//         comments.push(snap.data())
//     })
//     arr.push({ ...snap.data(), files: f[0], comments })
//     setPosts(arr)
// })
import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import { makeStyles } from '@mui/styles'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import React from 'react'
import { useParams } from 'react-router-dom'
import { auth, db } from '../../database'
import CommentsUserView from './CommentsUserView'
import FilesListUserView from './FilesListUserView'

const TrackSubmissions = () => {
    const [posts, setPosts] = React.useState([])
    const classes = useStyles()
    // React.useEffect(async () => {
    //     const q = collection(db, "posts", postId, "files")
    //     const unsubscribe = await onSnapshot(q, (querySnapshot) => {
    //         const arr = []
    //         querySnapshot.forEach(snap => {
    //             arr.push({ ...snap.data(), id: snap.id })
    //         })
    //         setFiles(arr)
    //     })
    // }, [])
    React.useEffect(async () => {
        const q = query(collection(db, "posts"), where("userId", "==", auth.currentUser.uid))
        let arr = []
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(async snap => {
            const f = []
            const com = await getDocs(collection(db, "posts", snap.data()?.id, "files"))
            com.forEach(snap => {
                console.log("files", snap.data())
                f.push(snap.data())
            })
            const comments = []
            const comm = await getDocs(collection(db, "posts", snap.data()?.id, "comments"))
            comm.forEach(snap => {
                comments.push(snap.data())
            })
            arr.push({ ...snap.data(), files: f[0], comments })
            setPosts(arr)
        })
    }, [auth.currentUser.uid])

    console.log(posts)
    return (
        <>
            <h3>My Submissions</h3>
            {posts?.map((post) => (
                <Card variant="outlined" >
                    <CardContent>
                        <Typography variant='body1'>{post?.title}</Typography>
                        <Typography variant='caption'>Submitted on: {post.timestamp.toDate().toDateString() +
                            ' ' +
                            post.timestamp.toDate().toLocaleTimeString(undefined, {
                                timezone: 'Asia/kolkata',
                            })}</Typography>

                        <FilesListUserView postId={post?.id} files={post?.files[0]?.Submitted} />
                        <CommentsUserView comments={post?.comments} post={post} />
                    </CardContent>
                </Card>
            ))}
        </>
    )
}
const useStyles = makeStyles(({
    paper: {
        padding: 5
    }
}))
export default TrackSubmissions

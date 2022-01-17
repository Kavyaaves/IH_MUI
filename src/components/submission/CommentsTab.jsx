import { IconButton, Paper, TextField } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import CommentsList from './CommentsList';
import { auth, db } from '../../database';
import { addDoc, arrayUnion, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'
const CommentsTab = ({ postId }) => {
    const [comment, setComment] = React.useState("")

    const handleCommentSend = async (e) => {
        e.preventDefault()

        addDoc(collection(db, "posts", postId, "comments"), {
            userView: false,
            senderId: auth.currentUser?.uid,
            text: comment,
            timestamp: serverTimestamp(),
        }).then(() =>
            setComment('')
        )
    }
    return (
        <Stack direction="row" width="100%" alignItems="center" justifyContent="center">
            <TextField
                fullWidth
                id="filled-multiline-static"
                multiline
                placeholder="Post your comments here .."
                rows={2}
                onChange={(e) => setComment(e.target.value)}
                variant="filled"
                value={comment}
            />
            <div style={{ padding: 10 }}></div>
            <IconButton size="large" onClick={handleCommentSend}>
                <SendIcon />
            </IconButton>
        </Stack>
    )
}

export default CommentsTab

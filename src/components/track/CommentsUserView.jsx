import React from 'react'
import Typography from '@mui/material/Typography'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../database'
const CommentsUserView = ({ postId }) => {
    const [comments, setComments] = React.useState([])
    React.useEffect(async () => {
        const unsubscribe = await onSnapshot(collection(db, "posts", postId, "comments"), (querySnapshot) => {
            let f = []
            querySnapshot.forEach(file => {
                f.push(file.data())
            })
            setComments(f)
        })
        return () => unsubscribe()
    }, [])
    return (
        <div>
            {comments.filter((comment) => comment.userView === true)?.length > 0 ? comments.filter((comment) => comment.userView === true)?.map((comment, i) => (
                <>
                    <br />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }} gutterBottom>Comments</Typography>
                    <Typography key={i} variant="subtitle2" >{comment.text}</Typography>
                </>
            )) : <></>}
        </div>
    )
}

export default CommentsUserView

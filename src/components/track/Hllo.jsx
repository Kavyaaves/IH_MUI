import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import CommentsUserView from './CommentsUserView';
import FilesListUserView from './FilesListUserView';

const Hllo = ({ posts }) => {
    return <div>
        {posts?.map((post, i) => (
            <Card variant="outlined" key={i} >
                <CardContent>
                    <Typography variant='body1'>{post?.title}</Typography>
                    <Typography variant='caption'>Submitted on: {post.timestamp.toDate().toDateString() +
                        ' ' +
                        post.timestamp.toDate().toLocaleTimeString(undefined, {
                            timezone: 'Asia/kolkata',
                        })}</Typography>
                    <FilesListUserView postId={post?.id} files={post?.files?.Submitted} />
                    {/* <CommentsUserView comments={post?.comments} post={post} /> */}
                </CardContent>
            </Card>
        ))}
    </div>;
};

export default Hllo;

import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import makeStyles from '@mui/styles/makeStyles'
import Typography from '@mui/material/Typography'
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db, storage } from '../../database'
import { Link } from 'react-router-dom'
import TableCustom from "../common/TableCustom"
import { Button, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import ReviewerModal from './modals/ReviewerModal'
import { deleteObject, ref } from 'firebase/storage'

const AllSubmissions = () => {
    const classes = useStyles()
    const [submissions, setSubmissions] = useState([])
    const [reviewerModal, setReviewerModal] = useState(false)
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        const q = collection(db, "posts");
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const cities = [];
            querySnapshot.forEach(async (doc) => {
                cities.push({ ...doc.data(), postId: doc.id });
            });
            setSubmissions(cities)
        });
        return () => unsubscribe()
    }, [])

    const deletePaper = async (post) => {
        // getDocs(collection(db, "posts", post?.id, "files")).then(snap => {
        //     snap.forEach((doc) => {
        //         post?.labels?.map((label) => {
        //             doc.data().map((file) => {
        //                 deleteObject(storage, "files/" + file.filename + "_" + post.id).then(() => {
        //                     alert("Download successful")
        //                 })
        //             })
        //         })
        //     })
        // })
        // await deleteDoc(doc(db, "posts", post.id))
    }

    const columns = [
        {
            id: 'id',
            // numeric: true,
            disablePadding: false,
            label: 'Title',
            render: (row) => <Link to={"/submissions/" + row?.id}>{row?.title}</Link>
        },
        {
            id: 'id',
            // numeric: true,
            disablePadding: false,
            label: 'Submitted By',
            render: (row) => <span>{row?.username}</span>

        },
        {
            id: 'id',
            // numeric: true,
            disablePadding: false,
            label: 'Submitted On',
            render: (row) => <span>
                {row?.timestamp?.toDate().toDateString() + " " + row?.timestamp?.toDate().toLocaleTimeString(undefined, {
                    timezone: 'Asia/kolkata',
                })}
            </span>
        },
        {
            id: 'id',
            // numeric: true,
            disablePadding: false,
            label: 'Status',
            render: (row) => <span>{row?.status}</span>
        },
        {
            id: 'id',
            // numeric: true,
            disablePadding: false,
            label: 'Reviewer',
            render: (row) => {
                return (
                    <span> {
                        row?.reviewerId ? row?.reviewerId :
                            <Button variant="outlined" onClick={
                                () => {
                                    setSelected([row])
                                    setReviewerModal(true)
                                }
                            }>
                                Assign
                            </Button >
                    }</span>)
            }
        },
        {
            id: 'id',
            // numeric: true,
            disablePadding: false,
            label: 'Actions',
            render: (row) =>
                <>
                    <IconButton
                        style={{
                            color: 'black',
                            fontSize: 'smaller',
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            setSelected([row])
                            // deletePaper(row);
                        }}>
                        <Delete />
                    </IconButton>
                </>
        },
    ];

    return (
        <Paper elevation={4} className={classes.paper}>
            <Typography variant='h6' className={classes.title}>
                Submissions
            </Typography>
            <br />
            <div style={{ minHeight: 400, width: '100%' }}>
                <TableCustom rows={submissions} headCells={columns} selected={selected} setSelected={setSelected} />
            </div>
            {reviewerModal && <ReviewerModal isVisible={reviewerModal} rev={selected} onClose={() => setReviewerModal(false)} />}
        </Paper>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "2em",
    }
}))
export default AllSubmissions

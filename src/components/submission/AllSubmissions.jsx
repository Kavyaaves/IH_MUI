import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import makeStyles from '@mui/styles/makeStyles'
import Typography from '@mui/material/Typography'
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../database'
import { Link } from 'react-router-dom'
import TableCustom from "../common/TableCustom"
import { Button, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import ReviewerModal from './ReviewerModal'

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
    const getReviewer = async (r) => {
        return await getDoc(doc(db, "users", r.reviewerId))
            .then((doc) => doc.data())
            .catch((err) => console.log(err))
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
            render: (row) => <span>{row?.reviewerId ? getReviewer(row) :

                <Button variant="outlined" onClick={() => setReviewerModal(true)}>
                    Assign
                </Button>
            }</span>
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
                            // deletePost(post);
                        }}>
                        <Delete />
                    </IconButton>
                </>
        },
    ];

    const selectors = [
        ,
        (row) => <span>{row?.username}</span>,
        // (row) => <span>{row.title}</span>,
        // (row) => <span>{row.title}</span>,

    ]

    console.log(submissions, columns)
    return (
        <Paper elevation={4} className={classes.paper}>
            <Typography variant='h6' className={classes.title}>
                Submissions
            </Typography>
            <br />
            <div style={{ minHeight: 400, width: '100%' }}>
                <TableCustom rows={submissions} headCells={columns} selected={selected} setSelected={setSelected} />
            </div>
            {reviewerModal && <ReviewerModal isVisible={reviewerModal} onClose={() => setReviewerModal(false)} />}
        </Paper>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "2em",
    }
}))
export default AllSubmissions

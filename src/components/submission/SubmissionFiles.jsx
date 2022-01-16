import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import { useParams } from "react-router-dom"
import { collection, doc, getDoc, onSnapshot, setDocument } from 'firebase/firestore'
import { db } from '../../database'
import { AppBar, Box, Tab, Tabs, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import FilesList from './FilesList'
import CommentsTab from './CommentsTab'
const SubmissionFiles = () => {
    const { postId } = useParams()
    const [document, setDocument] = useState([])
    const [key, setKey] = useState("Submitted")
    const [id, setId] = useState("")
    const [labels, setLabels] = useState([])
    const classes = useStyles()
    useEffect(async () => {
        const unsubscribe = await onSnapshot(collection(db, "posts", postId, "files"), (querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
                setDocument(doc.data())
                setId(doc.id)
            });
        });
        return () => unsubscribe()
    }, [])
    useEffect(async () => {
        const unsubscribe = await onSnapshot(doc(db, "posts", postId), (doc) => {
            setLabels(doc.data()?.labels)
        });
        return () => unsubscribe()
    }, [])
    return (
        <>
            <AppBar position='static' className={classes.appBar}>
                <Tabs
                    value={key}
                    onChange={(e, val) => setKey(val)}
                    indicatorColor='secondary'
                    textColor='inherit'
                    variant='scrollable'
                    centered
                    className={classes.tabs}
                    scrollButtons='auto'
                    aria-label='scrollable auto tabs example'>
                    {labels?.map((tab, i) =>
                        <Tab label={tab} {...a11yProps(i)} value={tab} key={i} />
                    )}
                    <Tab label="Comments" {...a11yProps(1000)} value="Comments" />
                </Tabs>

            </AppBar>
            {key == "Comments" ?
                <TabPanel value="Comments" index="Comments">
                    <CommentsTab />
                </TabPanel>
                :
                <TabPanel value={key} index={key}>
                    <FilesList tab={key} postId={postId} id={id} file={document[key]} />
                </TabPanel>}
        </>
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}>
            {value === index && (
                <Box p={1}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    div: {
        maxWidth: 700,
        margin: 'auto',
    },
    card: {
        minHeight: 350,
        margin: 'auto',
        flexGrow: 1,
        width: '100%',
        boxShadow: 4,
    },
    title: {
        margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
    },
    tab: {
        width: 'auto',
        overflow: 'hidden',
    },
    appBar: {
        // maxWidth: 700,
        // width: '100%',
    },
    tabs: {
        padding: 0,
        margin: 'auto',
        // [theme.breakpoints.up('sm')]: {
        //     maxWidth: 340,
        // },
        // [theme.breakpoints.up('md')]: {
        //     maxWidth: 550,
        // },
        // [theme.breakpoints.up('lg')]: {
        //     maxWidth: 620,
        // },
    },
}));

export default SubmissionFiles

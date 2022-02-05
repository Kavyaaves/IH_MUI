import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
// import img from './static/photo.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        overflow: 'hidden',
        margin: 'auto',
        background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
        fontFamily: 'Open Sans, Helvetica, sans-serif',
    },
    root1: {
        margin: 'auto',
        padding: '1rem',
        minHeight: 600,
    },
    left: {
        '@media (max-width: 600px)': {
            display: 'none',
        },
        '@media (min-width: 768px)': {
            display: 'block',
        },
        float: 'left',
        width: '20em',
    },
    typo1: {
        borderRadius: '5px',
        fontWeight: 'bold',
    },
    typo2: {
        fontFamily: 'Open Sans, Helvetica, sans-serif',

        display: 'flex',
        width: '100%',
        padding: '5px',
    },
    cover: {
        width: 400
    },

    rootRight: {
        margin: 'auto',
        flexGrow: 1,
        overflow: 'hidden',
        marginLeft: 0,
        minHeight: 170,
    },
    a: {
        '&:hover': {
            transform: 'scaleX(2)',
        },
    },
    card: {
        margin: 'auto',
        float: 'center',
        marginTop: theme.spacing(6),
    },
}));

export default function Home(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={4}>
                <div className={classes.root1}>
                    <Typography
                        style={{
                            fontWeight: 'bold',
                            align: 'center',
                        }}
                        variant='h5' color='primary'>
                        Founder
                    </Typography>
                    <CardMedia
                        sx={{ maxWidth: 400, margin: 'auto' }}
                        component="img"
                        image="/images/vk 002.jpg"
                        title='Professor V. Krishnamurthy'
                    />
                    <Box className={classes.typo2}>
                        <Typography
                            align='left'
                            variant='body2'
                            style={{
                                fontFamily: 'Open Sans, Helvetica, sans-serif',
                                width: '100%',
                                paddingTop: '30px',
                                marginRight: '10px',
                            }}>
                            <span style={{ fontWeight: 'bold' }}>
                                Indian Hydrobiology (ISSN 0971-6548),{' '}
                            </span>
                            was started by{' '}
                            <a href='http://algologists.yolasite.com/tamil-nadu.php'>
                                Professor V.Krishnamurthy
                            </a>{' '}
                            in the year 1995 with Volume No. 1 It publishes original research
                            findings and review papers on all aspects of aquatic organisms in
                            relation to environment and exploitation of these for the benefit
                            of human beings. The journal, published one volume with two
                            numbers a year, ips supplied free to the registered members of{' '}
                            <a href='https://krishalgology.yolasite.com/'>
                                Krishnamurthy Institute of Algology
                            </a>{' '}
                            , Chennai, India.
                        </Typography>
                        <div
                            style={{
                                lineHeight: '1.5em',
                                display: 'inline-flex',
                                padding: '5px',
                            }}></div>
                    </Box>
                    <Divider></Divider>
                </div>
            </Paper >
            <br />
        </div >
    );
}

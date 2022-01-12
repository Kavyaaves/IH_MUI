import React from 'react';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MailIcon from '@mui/icons-material/Mail';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        padding: theme.spacing(3),
        textAlign: 'center',
    },
}));

const EditorialBoard = () => {
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.root} elevation={4}>
                <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                    Editorial Board
                </Typography>
                <br />
                <div className={classes.chief}>
                    <Typography
                        variant='body2'
                        style={{ fontWeight: 'bold', fontSize: 14 }}>
                        Chief Editor
                    </Typography>
                    <br></br>
                    <Typography variant='body1'>
                        Dr.M.Baluswami <br />
                        President, Krishnamurthy Institute of Algology <br />
                        Former Director, Shift II, Self Financed Stream (June 2016-May 2019)
                        <br />
                        Madras Christian College, Chennai-600 059 <br />
                        Former Associate Professor and Head (June 2013-May 2016)
                        <br /> Department of Botany Madras Christian College, Chennai-600
                        059 <br />
                        <span
                            style={{
                                display: 'flex',
                                textAlign: 'center',
                                justifyContent: 'center',
                            }}>
                            <MailIcon />
                            &nbsp; balumcc@gmail.com
                        </span>
                        <br />
                    </Typography>
                </div>
                <Divider />
                <div>
                    <br />
                    <Typography variant='body1'>
                        <span>Prof.S.P.Adhikary </span>
                        <br></br>
                        (Ex. Vice-Chancellor, FM University, Odisha)
                        <br />
                        Department of Biotechnology Visva-Bharati (a Central University){' '}
                        <br></br>
                        Santiniketan-731 235 <br></br>
                        <span
                            style={{
                                display: 'flex',
                                textAlign: 'center',
                                justifyContent: 'center',
                            }}>
                            <MailIcon />
                            &nbsp; adhikarysp@gmail.com
                        </span>
                        <br></br>
                    </Typography>
                </div>
                <Divider />
                <br />
                <Typography variant='body1'>
                    Prof.R. Rengasamy <br />
                    Fmr. Director, CAS in Botany
                    <br />
                    Guindy Campus, University of Madras, Chennai-600 025
                    <br />
                    <span
                        style={{
                            display: 'flex',
                            textAlign: 'center',
                            justifyContent: 'center',
                        }}>
                        <MailIcon />
                        &nbsp; profrrengasamy@gmail.com
                    </span>
                    <br />
                </Typography>
                <Divider />
                <br />
                <Typography variant='body1'>
                    Dr.Hanumantha Rao <br />
                    Polur Department of Microbiology <br />
                    Madras Christian College Chennai-600 059
                    <br />
                    <Typography
                        style={{
                            display: 'flex',
                            textAlign: 'center',
                            justifyContent: 'center',
                        }}>
                        <MailIcon /> &nbsp;dr.phrao@gmail.com
                    </Typography>
                    <br />
                </Typography>
                <Divider />
                <br />
                <Typography variant='body1'>
                    Dr.Bakthavatchalam Babu <br /> Department of Botany
                    <br /> Madras Christian College Chennai-600 059
                    <br />{' '}
                    <span
                        style={{
                            display: 'flex',
                            textAlign: 'center',
                            justifyContent: 'center',
                        }}>
                        <MailIcon />
                        &nbsp; bbabu2k5@gmail.com
                    </span>
                    <br />
                </Typography>
                <Divider />
                <br />
                <Typography variant='body1'>
                    Prof.B.B.Chaugule <br />
                    Retd. Head, Dept. of Botany, University of Pune <br />
                    Res.Building No.2, Block No.3 Chaitanya Housing Society <br />
                    Senapati Bapat Road, Pune-411 016
                    <br />{' '}
                    <span
                        style={{
                            display: 'flex',
                            textAlign: 'center',
                            justifyContent: 'center',
                        }}>
                        <MailIcon />
                        &nbsp; profbbc@gmail.com
                    </span>
                    <br />
                </Typography>{' '}
                <Divider />
                <br />
                <Typography variant='body1'>
                    Dr. S. Bharathan <br />
                    Fmr. Professor of Botany, Pachaiyappa’s College,
                    <br />
                    Chennai-600 034 <br />
                    <span
                        style={{
                            display: 'flex',
                            textAlign: 'center',
                            justifyContent: 'center',
                        }}>
                        <MailIcon />
                        &nbsp; anitabharathan@yahoo.com
                    </span>
                    <br />
                </Typography>
                <Divider />
                <br />
                <Typography variant='body1'>
                    Dr. M.V.N. Panikkar <br />
                    Emeritus Professor(UGC), S.N College
                    <br />
                    Kollam, Kerala - 691001
                    <br />
                    <div
                        style={{
                            display: 'flex',
                            textAlign: 'center',
                            justifyContent: 'center',
                        }}>
                        <MailIcon />
                        &nbsp; mvnpannikar@gmail.com
                    </div>
                    <br />
                </Typography>
                <Divider />
                <br />
                <Typography variant='body1'>
                    Dr.J.Logamanya Tilak <br />
                    Department of Zoology, Madras Christian College
                    <br /> Chennai-600 059
                    <br />
                    <div
                        style={{
                            display: 'flex',
                            textAlign: 'center',
                            justifyContent: 'center',
                        }}>
                        <MailIcon />
                        &nbsp; mcctilak@gmail.com
                    </div>
                    <br />
                </Typography>
                <Divider />
            </Paper>
        </div>
    );
};

export default EditorialBoard;

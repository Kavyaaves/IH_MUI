import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const Archives = () => {
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.root} elevation={4}>
                <Typography variant='h6' className={classes.title}>
                    Welcome to Archives Hub
                </Typography>
                <br />
                <div className={classes.div}>
                    {/* <Typography variant='body'>Volume 1</Typography>
								<ListItem>
									{' '}
									<Link to='/archives/1.1'>Issue 1</Link>&nbsp;
								</ListItem>
								<Divider orientation='vertical' />
								<ListItem>
									{' '}
									<Link to='/archives/1.2'>Issue 2</Link>&nbsp;
								</ListItem>
								<Divider></Divider> */}

                    {/* Vol 2<Link to='/archives/1.1'>Issue 1</Link>
						<Link to='/archives/1.1'>Issue 1</Link>
						Vol 3<Link to='/archives/1.1'>Issue 1</Link>
						<Link to='/archives/1.1'>Issue 1</Link> */}

                    <Table className={classes.table} aria-label='simple table'>
                        <TableBody style={{ paddingRight: 10 }}>
                            <TableRow className={classes.row}>
                                <TableCell
                                    className={classes.cell}
                                    style={{ margin: 5 }}
                                    align='center'>
                                    Volume 5
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='5.1'>Issue 1</Link>
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='/archives/5.2'>Issue 2</Link>
                                </TableCell>
                            </TableRow>

                            <TableRow className={classes.row}>
                                <TableCell className={classes.cell} align='center'>
                                    Volume 4
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='4.1'>Issue 1</Link>
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='/archives/4.2'>Issue 2</Link>
                                </TableCell>
                            </TableRow>

                            <TableRow className={classes.row}>
                                <TableCell className={classes.cell} align='center'>
                                    Volume 3
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='3.1'>Issue 1</Link>
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='/archives/3.2'>Issue 2</Link>
                                </TableCell>
                            </TableRow>

                            <TableRow className={classes.row}>
                                <TableCell className={classes.cell} align='center'>
                                    Volume 2
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='/archives/2.1'>Issue 1</Link>
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='/archives/2.1'>Issue 2</Link>
                                </TableCell>
                            </TableRow>

                            <TableRow className={classes.row}>
                                <TableCell className={classes.cell} align='center'>
                                    Volume 1
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='/archives/1.1'>Issue 1</Link>
                                    &nbsp; (September 1995)
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='/archives/1.2'>Issue 2</Link>
                                    &nbsp; (June 1996)
                                </TableCell>
                            </TableRow>

                            <TableRow className={classes.row}>
                                <TableCell className={classes.cell} align='center'>
                                    Volume 1
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='1.1'>Issue 1</Link>
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='/archives/archives/1.2'>Issue 2</Link>
                                </TableCell>
                            </TableRow>

                            <TableRow className={classes.row}>
                                <TableCell className={classes.cell} align='center'>
                                    Volume 1
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='1.1'>Issue 1</Link>
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='/archives/archives/1.2'>Issue 2</Link>
                                </TableCell>
                            </TableRow>

                            <TableRow className={classes.row}>
                                <TableCell className={classes.cell} align='center'>
                                    Volume 1
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='/archives/archives/1.1'>Issue 1</Link>
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='/archives/archives/1.2'>Issue 2</Link>
                                </TableCell>
                            </TableRow>

                            <TableRow className={classes.row}>
                                <TableCell className={classes.cell} align='center'>
                                    Volume 1
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='1.1'>Issue 1</Link>
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='/archives/archives/1.2'>Issue 2</Link>
                                </TableCell>
                            </TableRow>

                            <TableRow className={classes.row}>
                                <TableCell className={classes.cell} align='center'>
                                    Volume 1
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='1.1'>Issue 1</Link>
                                </TableCell>
                                <TableCell className={classes.cell} align='center'>
                                    <Link to='/archives/archives/1.2'>Issue 2</Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <br />
            </Paper>
            <br />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        padding: theme.spacing(3),
        minHeight: 350,
        textAlign: 'center',
    },
    paper: {
        margin: 'auto',
        padding: '1rem',
    },
    row: {
        margin: 0,
    },
    cell: {
        minWidth: 50,
        padding: 10,
    },
    table: {
    },

    div: {
        overflow: 'hidden',
        margin: 'auto',
        border: '2px solid black',
    },
}));

export default Archives;

import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import MailIcon from '@mui/icons-material/Mail';
// import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Fade, Paper, Popper, Tooltip } from '@mui/material';
import MainRouter from '../../MainRouter';
import { Link } from 'react-router-dom';
import ListLeft from "./ListLeft"
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AvatarPopup from './AvatarPopup';
import MenuEnd from './MenuEnd';

const Header = (props) => {

    const drawerWidth = 240;

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <ListLeft />
            <Divider />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    return (
        <Box sx={{ display: 'flex', backgroundColor: "rgba(0,0,0,0.06)", minHeight: "100vh" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                style={{ backgroundColor: "#36454F", display: "flex", justifyContent: "beetwen" }}
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Avatar IconComponent src="/android-chrome-192x192.png" alt="indian-hdrobiology" />
                    <h2 className="menu-header-title">
                        INDIAN HYDROBIOLOGY
                    </h2>
                    <MenuEnd handleClick={handleClick} />
                </Toolbar>

                <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper style={{ marginTop: 20, marginX: 30 }}>
                                <AvatarPopup setOpen={setOpen} />
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "#36454F" },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "#36454F" },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <MainRouter />
            </Box>
        </Box >
    );
}


const useStyles = makeStyles({
    MuiDrawerPaper: {
        backgroundColor: "#36454F"
    }
})

export default Header

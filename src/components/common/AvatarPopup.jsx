import { Divider, Link, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from "react-router-dom"
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { auth } from '../../database';
import { signOut } from 'firebase/auth';

const AvatarPopup = ({ setOpen }) => {
    const navigate = useNavigate()
    const handleLogout = (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/", { replace: true });
            setOpen(false)
        }).catch((error) => {
            // An error happened.
        });
    }
    const handleProfileLink = (e) => {
        e.preventDefault();
        setOpen(false)
        navigate("/my-profile")
    }
    return (
        <List>
            <ListItem button onClick={handleProfileLink}>
                <AccountCircleIcon />
                <ListItemText primary='My Profile' />
            </ListItem>
            <Divider />
            <ListItem button onClick={handleLogout}>
                <LogoutIcon />
                <ListItemText primary='Logout' />
            </ListItem>
        </List >
    )
}

export default AvatarPopup

import { Divider, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const ListLeft = () => {
    return (
        <List>
            <Link className="link" to='/'>
                <ListItem button>
                    <ListItemText primary='About Us' />
                </ListItem>
            </Link>
            <Divider />
            <Link className="link" to='/archives'>
                <ListItem button>
                    <ListItemText primary='Archives' />
                </ListItem>
            </Link>
            <Divider />
            <Link className="link" to='/submit-paper'>
                <ListItem button>
                    <ListItemText primary='Submit Papers' />
                </ListItem>
            </Link>
            <Divider />
            <Link className="link" to='/instructions'>
                <ListItem button>
                    <ListItemText primary='Instructions for authors' />
                </ListItem>
            </Link>
            <Divider />
            <Link className="link" to='/editorial'>
                <ListItem button>
                    <ListItemText primary='Editorial Board' />
                </ListItem>
            </Link>
            <Divider />
            <Link className="link" to='/feedback'>
                <ListItem button>
                    <ListItemText primary='Feedback' />
                </ListItem>
            </Link>
            <Divider />
            <Link className="link" to='/membership'>
                <ListItem button>
                    <ListItemText primary='Membership' />
                </ListItem>
            </Link>
        </List>
    )
}

export default ListLeft

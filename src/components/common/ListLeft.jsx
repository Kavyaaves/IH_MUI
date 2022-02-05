import { Divider, List, ListItem, ListItemText } from '@mui/material'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../database'
import { UserContext } from '../../providers/UserProvider'

const ListLeft = () => {
    const { user } = useContext(UserContext)
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
            {user != null &&
                <>
                    <Link className="link" to='/submissions'>
                        <ListItem button>
                            <ListItemText primary='Submissions' />
                        </ListItem>
                    </Link>
                    <Divider />
                    <Link className="link" to="/track-submissions">
                        <ListItem button>
                            <ListItemText primary='Track Submissions' />
                        </ListItem>
                    </Link>
                    <Divider />
                </>}
            <Link className="link" to='/membership'>
                <ListItem button>
                    <ListItemText primary='Membership' />
                </ListItem>
            </Link>
        </List>
    )
}

export default ListLeft

import { Avatar, Button, ButtonGroup, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../providers/UserProvider'
import LoginModal from '../auth/LoginModal'
import SignupModal from '../auth/SignupModal'
const MenuEnd = ({ handleClick }) => {
    const { isAuthenticated, user } = useContext(UserContext)
    const classes = useStyles()
    const [signupModal, setSignupModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)

    return (
        <div>
            {user ?
                <IconButton sx={{ p: 0 }} onClick={handleClick('bottom-end')}>
                    <Avatar alt={user?.displayName} src="/" />
                </IconButton>
                :
                <ButtonGroup variant="outlined" color="secondary" aria-label="outlined button group">
                    <Button onClick={() => setLoginModal(true)}>
                        Login
                    </Button>
                    <Button onClick={() => setSignupModal(true)}>
                        Signup
                    </Button>
                </ButtonGroup>
            }
            <LoginModal isVisible={loginModal} handleClose={() => setLoginModal(false)} />
            <SignupModal isVisible={signupModal} handleClose={() => setSignupModal(false)} />
        </div >
    )
}

const useStyles = makeStyles({
    button: {
    }
})


export default MenuEnd

import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();

    const logout = async () => {
        await signOut(auth);
        navigate('/');
    }
    return (
        <div>
            <AppBar sx={{ backgroundColor: 'ORANGE' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
                        FIREBASE
                    </Typography>
                    <Button onClick={logout} color="inherit"><h8>Çıkış</h8></Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar

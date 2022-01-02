import * as React from "react";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const Menu = () => {
    return(
        <nav>
            <AppBar sx={{backgroundColor: "#72afed"}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Messenger
                    </Typography>
                    <Button variant="contained">Login</Button>
                </Toolbar>
            </AppBar>

        </nav>
    )
}

export default Menu;
import React, { useState, useEffect } from "react";
import { Box, Drawer, IconButton, Stack, Typography,Grid, ListItemButton, ListItemIcon, List, ListItem,ListItemText  } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink, } from "react-router-dom"
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';


function ResponsiveSideBar() {

    const [isOpen, setIsOpen] = useState(false)
    const sideBar = [
        {title:'Home',icon:HomeIcon,navTo:'/'},
        {title:'Cars',icon:DirectionsCarRoundedIcon,navTo:'/movies'},
        {title:'Passengers',icon:PeopleAltRoundedIcon,navTo:'/BookingDetails'}
    ]
    const hanldeClick = () => {
        setIsOpen(true)
    }

    return (
        <>
            <Box>
            <Grid container justify="flex-end" alignItems="flex-end">
                <IconButton style={{ bottom: 3, right: 3, color: '#cdd422' }}
                 size="large" variant="contained" onClick={hanldeClick}>
                    <MenuIcon />
                </IconButton>
                </Grid>
                <Drawer
                    aria-label="muiDrawer" anchor="top"
                    open={isOpen} onClose={() => setIsOpen(false)}
                    >

                    <Stack width={200} spacing={2} sx={{backgroundColor: '#f9d4a7'}} >
                      
                        <div style={{textShadow: '1px 1px 2px #f6ba72'}}>

                        <ListItemButton to='/'>
                          <HomeIcon/>  Home
                        </ListItemButton>
                        <ListItemButton to='/allCases'><PeopleAltRoundedIcon/> Total Cases</ListItemButton>
                        <ListItemButton to='/todayCases'><ContactMailIcon/>Today Cases</ListItemButton>
                        </div>
                    {/* <List>
                            {['Home', 'cars', 'Booking'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <DirectionsCarRoundedIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItemButton>
                        </ListItem>
                            ))}
                    </List> */}
                        
                        
                        {/* <Link to='/'>Home</Link>
                        <Link to='/cars'>Cars</Link>
                        <Link to='/booking'>Booking</Link> */}
                    </Stack>
                </Drawer>
            </Box>

        </>
    )

}

export default ResponsiveSideBar;

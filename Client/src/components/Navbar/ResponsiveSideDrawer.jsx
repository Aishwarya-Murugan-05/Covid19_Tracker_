import React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const ResponsiveSideDrawer =()=>{

const useStyles = styled((theme) => ({
    list: {
      width: 250,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    fullList: {
      width: 'auto',
    },
    drawer: {
      width: '100%',
      flexShrink: 0,
    },
    drawerPaper: {
      width: '250px',
    },
    closeButton: {
      marginRight: theme.spacing(2),
    },
  }));
  const [state, setState] = useState({
    isDrawerOpen: false,
  });
  
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleDrawerOpen = () => {
    setState({ isDrawerOpen: true });
  };
  
  const handleDrawerClose = () => {
    setState({ isDrawerOpen: false });
  };
  
  const menuItems = ['Item 1', 'Item 2', 'Item 3'];
  {isMobile ? (
    <IconButton
      onClick={handleDrawerOpen}
      className={classes.menuButton}
      color="inherit"
      aria-label="menu"
    >
      <MenuIcon />
    </IconButton>
  ) : (
    <div></div>
  )}
  
  <Drawer
    className={classes.drawer}
    variant={isMobile ? 'temporary' : 'persistent'}
    anchor="left"
    open={state.isDrawerOpen}
    onClose={handleDrawerClose}
    classes={{
      paper: classes.drawerPaper,
    }}
    ModalProps={{
      keepMounted: true, // Better open performance on mobile.
    }}
  >
    <div className={classes.toolbar}>
      <IconButton
        onClick={handleDrawerClose}
        className={classes.closeButton}
        color="inherit"
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>
    </div>
    <List className={classes.list}>
      {menuItems.map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </Drawer>
}
export default ResponsiveSideDrawer
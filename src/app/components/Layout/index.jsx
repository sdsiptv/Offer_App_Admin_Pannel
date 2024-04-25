import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight, Menu } from '@material-ui/icons';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import clsx from 'clsx';
import React, { useState } from 'react';
import Logowith from '../../assets/OfferLogo.png';
import Notifications from '../Navbar/Notifications';
import Sidebar from '../Sidebar';
import { useStyles } from './styles';
import Menus from "../../assets/menu.png";
import Cross from "../../assets/cross.png";
// import Logo from "../../assets/Doctorlogo.png";
function Layout({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div>
        <div className={classes.root}>
          <CssBaseline />

          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <Toolbar style={{ height: "74px" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <img src={Menus} alt="Logo" height="30px" width="30px"></img>
                {/* <AddAPhotoIcon /> */}
                <div style={{ display: "flex" }}
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <img src={Logowith} alt="Logo" height="50px" style={{ marginLeft: "10px" }} />
                </div>
              </IconButton>
              {/* <div>
                <text className={classes.Blood}>Offer</text>
                <text style={{ marginLeft: "4px" }} className={classes.Donor}> App</text>
              </div> */}
              <Notifications />
            </Toolbar>
          </AppBar>

          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}

          >
            <div className={classes.drawerHeader} />

            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >

              <div className={classes.drawerHeader} style={{ display: "flex", marginRight: "80px", justifyContent: "space-between" }}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? (
                    <img src={Cross} alt="Logo" height="30px" width="30px"></img>
                  ) : (
                    <ChevronRight style={{ color: 'white' }} />
                  )}
                  <img src={Logowith} alt="Logo" height="40px" style={{ marginLeft: "20px" }} />

                </IconButton>

                <div style={{ display: "flex" }}>

                  {/* <Typography variant="h6" noWrap component="div" style={{ color: 'black' }}>
                    SDS DOC
                  </Typography> */}
                </div>
              </div>


              <Divider style={{ marginTop: "10px" }} />
              <List>{<Sidebar />}</List>
            </Drawer>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;

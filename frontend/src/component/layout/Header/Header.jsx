import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Box, Button } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon, Search as SearchIcon, ShoppingCart as ShoppingCartIcon,Person2Rounded as PersonIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
const Header = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useSelector(state => state.user);
  const toggleDrawer = (state) => () => {
    setOpen(state);
  };
  const options = {
    sx: {
      color: "black",
      "&:hover": { color: "tomato" },
      border: "none",
      outline: "none",
      boxShadow: "none",
     
    }
  }
  const buttonOptions = {
    sx: {
      
      color: "tomato", backgroundColor: "white",
      padding: "0.5vmax 1.3vmax",
      border:"1px solid tomato",
      "&:hover": { color: "white",
        backgroundColor: "tomato", },
      transition: "all 0.5s",
      Height:"2vh",
      // textAlign:"center",

      // display: isAuthenticated ? "none" : "flex",
      
    }
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#ffff", padding: "0 1vmax" }}>
        <Toolbar>
          {/* Menu Button (Left Side) */}
          <IconButton  edge="start" color="black" onClick={toggleDrawer(true)}>
            <MenuIcon sx={{fontSize:"2rem"}}/>
          </IconButton>

          {/* ECHO */}
          <Box sx={{ flexGrow: 1, padding: "0 1vmax" }}>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <h2 style={{fontFamily:"Roboto"}}>ECHO</h2>
            </Link>
          </Box>

          {/* Search & Cart Icons (Right Side with 2vmax margin) */}
          <Box sx={{ marginRight:"2.5vmax" ,display: "flex", gap: "0.8vmax",justifyContent:"center",alignItems:"center" }}>
            <IconButton color="black" component={Link} to="/search">
              <SearchIcon sx={{fontSize:"2rem"}}/>
            </IconButton>
            <IconButton color="black" component={Link} to="/cart">
              <ShoppingCartIcon sx={{fontSize:"2rem"}} />
            </IconButton>
            
            <Link to={"/login"} className="loginLink"><button style={{display:isAuthenticated?"none":"flex"}} className="loginButton"><PersonIcon /></button></Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div style={{ width: 250 }}>
          <IconButton onClick={toggleDrawer(false)} sx={{ margin: 1 }}>
            <CloseIcon />
          </IconButton>
          <List>
            <ListItem {...options} button component={Link} to="/" onClick={toggleDrawer(false)}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem {...options} button component={Link} to="/products" onClick={toggleDrawer(false)}>
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem {...options} button component={Link} to="/about" onClick={toggleDrawer(false)}>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem {...options} button component={Link} to="/contact" onClick={toggleDrawer(false)}>
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Header;

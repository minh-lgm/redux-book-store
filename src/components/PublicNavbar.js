import React, { useState, useEffect } from "react";
import logo from "../images/logo.svg";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getReadingList } from "../redux/actions/bookActions";
import { AppBar, Box, IconButton, Typography, Menu, MenuItem, Button, Container, Toolbar, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BookmarkIcon from '@mui/icons-material/Bookmark';


const PublicNavbar = () => {
  const dispatch = useDispatch();
  const { readingList } = useSelector(state => state.book);
  const [anchorElNav, setAnchorElNav] = useState(null);
  
  useEffect(() => {
    dispatch(getReadingList());
  }, [dispatch]);
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: "background.paper", color: "primary.darker" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <img src={logo} alt="CoderSchool" width="200px" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

              <MenuItem
                key="home"
                onClick={handleCloseNavMenu}
                component={NavLink} to="/"
              >
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem
                key="reading"
                onClick={handleCloseNavMenu}
                component={NavLink} to="/reading"
              >
                <Typography textAlign="center">
                  Reading List
                  {readingList.length > 0 && (
                    <Badge badgeContent={readingList.length} color="primary" sx={{ ml: 1 }} />
                  )}
                </Typography>
              </MenuItem>

            </Menu>
          </Box>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img src={logo} alt="CoderSchool" width="200px" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: "center" }}>

            <Button
              key="home"
              onClick={handleCloseNavMenu}
              component={NavLink} to="/"
              variant="main"
              sx={{ fontWeight: "600", marginTop: "auto", marginBottom: "auto", marginLeft: "1rem" }}
            >
              Home
            </Button>
            <Button
              key="reading"
              onClick={handleCloseNavMenu}
              component={NavLink} to="/reading"
              variant="main"
              sx={{ fontWeight: "600", marginTop: "auto", marginBottom: "auto", marginLeft: "1rem" }}
              startIcon={
                <Badge badgeContent={readingList.length} color="primary">
                  <BookmarkIcon />
                </Badge>
              }
            >
              Reading List
            </Button>

          </Box>
        </Toolbar>
      </Container >
    </AppBar >
  );
};

export default PublicNavbar;

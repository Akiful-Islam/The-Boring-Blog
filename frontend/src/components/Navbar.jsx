import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthService from "../service/AuthService";
import { AuthContext } from "../context/AuthContext";

const pages = [
  {
    name: "Feed",
    link: "/",
  },
  {
    name: "Users",
    link: "/users",
  },
  {
    name: "Profile",
    link: "/profile",
  },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuLinkClick = (linkName) => {
    if (linkName === "/profile") {
      linkName = "/profile/" + authContext.authInfo.userId;
    }
    navigate(linkName);
    handleCloseNavMenu();
  };

  const handleLogoutClick = () => {
    AuthService.signout();
    navigate("/auth");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link underline="none" component={RouterLink} to="/">
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", md: "flex" },
                color: "#ffffff",
              }}
            >
              The Boring Blog
            </Typography>
          </Link>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => handleMenuLinkClick(page.link)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Link sx={{ flex: 1 }} underline="none" component={RouterLink} to="/">
            <Typography
              variant="h6"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                color: "#ffffff",
              }}
            >
              The Boring Blog
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1.25, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleMenuLinkClick(page.link)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Button sx={{ color: "#ffffff" }} onClick={handleLogoutClick}>
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

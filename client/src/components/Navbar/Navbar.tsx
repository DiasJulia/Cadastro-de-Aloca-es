import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import Link from "next/link";
import Typography from "@mui/material/Typography";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <RequestQuoteIcon
              sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                fontFamily: "monospace",
                fontWeight: 700,
              }}
            >
              GesFin
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
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
                  display: { xs: "block", sm: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href="/">Resumo</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href="/operations">Operações</Link>
                </MenuItem>
              </Menu>
            </Box>
            <RequestQuoteIcon
              sx={{ display: { xs: "flex", sm: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: "flex", sm: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
              }}
            >
              GesFin
            </Typography>
            <Box sx={{ flexGrow: 0, display: { xs: "none", sm: "flex" } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link href="/">Resumo</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link href="/operations">Operações</Link>
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;

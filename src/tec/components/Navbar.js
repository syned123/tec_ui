import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme/theme";
import { FaBars } from "react-icons/fa";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import userIcon from "./img/user.jpg";
import { useAuthStore } from "../../hooks/useAuthStore";
export const Navbar = ({ c }) => {
  const { startLogout } = useAuthStore();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleToggleSidebar = (value) => {
    c(value);
  };
  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
            <FaBars />
          </div>
        </Box>
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton>
          <Button>
            <Avatar
              alt="user"
              src={userIcon}
              sx={{ width: 24, height: 24 }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem onClick={startLogout}>Cerrar Sesion</MenuItem>
            </Menu>
          </Button>
        </Box>
      </Box>
    </>
  );
};

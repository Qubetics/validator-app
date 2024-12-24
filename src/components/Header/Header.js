import React, { useEffect, useState } from "react";
import logo from "../../assets/Images/logo.svg";
import { Link } from "react-router-dom";
import { Descktop, Drawersidebar, Mobilereasponsive } from "./styles";
import { Menu, MenuItem, Button, Drawer } from "@mui/material";
import HeaderItems from "./HeaderItems";
import { DownIcon } from "../../assets/Icons/SvgIcon";
import "./Header.css";
import MenuIcon from "../../assets/Icons/MenuIcon";
function Header() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setIsDrawerOpen(true);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Track window width changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="drawerCustom"
      >
        <Drawersidebar>
          <HeaderItems />
        </Drawersidebar>
      </Drawer>
      <Descktop Descktop>
        <HeaderItems />
      </Descktop>
      <Mobilereasponsive>
        <div className="mobileresponsive headerWrapper">
          <img src={logo} alt="logo" className="logo" />
          <MenuIcon className="open-icon" onClick={toggleDrawer(true)} />
        </div>
      </Mobilereasponsive>
    </>
  );
}

export default Header;

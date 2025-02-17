import React, { useEffect, useState } from "react";
import logo from "../../assets/Images/logo.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, MenuItem, Button, Drawer } from "@mui/material";
import CopyIcon from "../../assets/Icons/CopyIcon";
import "./Header.css";
import { getWalletBalance, isTxOccur, logout } from "../../redux/reducer/auth";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useGetNodeUrl } from "../../context/NodeUrl";
import { getUserBalance } from "../../services/getUserBalance";
import { splitAddress } from "../../constant";
import { toast } from "../Common/Toast/Toast";

function HeaderItems() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const { setNodeUrl, setIsNodeAdded } = useGetNodeUrl();
  const { userAddress, isTx, userBalance, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (userAddress?.length > 0 || isTx) {
      setTimeout(() => {
        fetchBalance();
        dispatch(isTxOccur(false));
      }, 1500);
    }
  }, [userAddress, isTx]);

  const fetchBalance = async () => {
    try {
      let response = await getUserBalance(userAddress);
      dispatch(getWalletBalance(response));
    } catch (err) {
      return err;
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Do you want to logout?",
      padding: "40px",
      background: "#121212",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "unset",
      cancelButtonColor: "#000",
      confirmButtonText: "YES",
      cancelButtonText: "NO",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {};
        if (window?.qubetics) {
          window.qubetics.sendRequest("disconnect", data, (err, res) => {
            if (res) {
              dispatch(logout());
              localStorage.clear();
              sessionStorage.clear();
              setIsNodeAdded(false);
              setNodeUrl("");
              navigate("/login");
            }
          });
        } else {
          dispatch(logout());
          localStorage.clear();
          sessionStorage.clear();
          setIsNodeAdded(false);
          setNodeUrl("");
          navigate("/login");
        }
      }
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const copiedAddress = (data) => {
    navigator.clipboard.writeText(data);
    toast.success("Copied");
  };
  return (
    <>
      <div className="headerWrapper">
        <div className="header">
          <img src={logo} alt="logo" className="logo" />
          <div className="headerLinks">
            <ul className="">
              <li className="li">
                <Link
                  to="/dashboard"
                  className={`link ${
                    pathname === "/dashboard" ? "active" : ""
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/blocks"
                  className={`link ${pathname === "/blocks" ? "active" : ""}`}
                >
                  Blocks
                </Link>
                <Link
                  to="/validators"
                  className={`link ${
                    pathname === "/validators" ? "active" : ""
                  }`}
                >
                  Validators
                </Link>
                <Link
                  to="/account"
                  className={`link ${pathname === "/account" ? "active" : ""}`}
                >
                  Manage Account
                </Link>
              </li>
            </ul>
          </div>
          {isLoggedIn && (
            <div className="headerButtons">
              <button className="headermetaBtn">
                Address: {splitAddress(userAddress, 8, 8)}
                <span
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    copiedAddress(userAddress);
                  }}
                  style={{ cursor: "pointer", zIndex: "99999" }}
                >
                  <CopyIcon sx={{ fontSize: "17px" }} />
                </span>
              </button>
              <button className="headermetaBtn">
                Balance: {userBalance ? Number(userBalance).toFixed(2) : 0} TICS
                <text onClick={() => copiedAddress(userBalance)}>
                  {/* <CopyIcon sx={{ fontSize: "17px" }} /> */}
                </text>
              </button>
              <button className="headermetaBtn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      {/* // Show Full-Width Content for Larger Screens */}
    </>
  );
}

export default HeaderItems;

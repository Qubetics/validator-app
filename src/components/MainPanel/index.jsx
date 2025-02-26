import { useMediaQuery, TextField, InputAdornment } from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar";
import Statistics from "../Statistics";
import theme from "../../theme";
import { toggleSidebar } from "../../redux/reducer/drawer";
import { Container, Wrapper, Searchbar } from "./styles";

import MenuIcon from "../../assets/Icons/MenuIcon";
import bgMain from "../../assets/Images/bgmain.png";
import Footer from "../Footer/Footer";
import { Magnifier } from "../../assets/Icons/SvgIcon";

const MainPanel = ({ children }) => {
  const dispatch = useDispatch();

  const styles = {
    paperContainer: {
      // backgroundImage: `url(${bgMain})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top center ",
      backgroundSize: "cover",
    },
  };

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const location = useLocation();

  const { pathname } = location;

  const showStats =
    !pathname?.includes("/account") &&
    !pathname?.includes("/funds/bond") &&
    !pathname?.includes("/funds/unbond") &&
    !pathname?.includes("/funds/redelegate") &&
    !pathname?.includes("/login");
  const showSearchbar =
    pathname.includes("/blocks") ||
    pathname.includes("/validators") ||
    pathname.includes("/dashboard");
  useEffect(() => {
    dispatch(toggleSidebar(!isMobile));
  }, [dispatch, isMobile]);

  const openSidebar = useCallback(() => {
    setIsMobileSidebarOpen(true);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      {/*
      {isLoggedIn && (
        <div className="bugSubButton">
          <button
            className="headermetaBtn"
            // onClick={() => router.push("/bug-submission")}
            onClick={() =>
              window.open(
                "https://alphatestnet-explorer.qubetics.work/bug-submission",
                "_blank"
              )
            }
          >
            Reward Program
          </button>
        </div>
      )}
      */}
      <Header />
      <Wrapper>
        {/* <Sidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        />{" "} */}
        <Container style={styles.paperContainer} ismobile={`${isMobile}`}>
          {/* {isMobile && (
            <MenuIcon
              className="open-icon"
              sx={{
                color: theme.palette.text.primary,
                fill: theme.palette.text.primary,
              }}
              onClick={openSidebar}
            />
          )} */}
          {/*
          {showSearchbar && (
            <Searchbar>
              <TextField
                variant="outlined"
                placeholder="Search by TX Hash/ Address/ Block/ Block Hash"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Magnifier />
                    </InputAdornment>
                  ),
                }}
              />
            </Searchbar>
          )}
          */}
          {showStats && <Statistics />}
          {children}
        </Container>
        <Footer />
      </Wrapper>
    </>
  );
};

export default MainPanel;

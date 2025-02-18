// /* eslint-disable */

// import { Button, Box, Tooltip, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import CommonBtn from "../../components/Common/Commonbtn/Commonbtn.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import TextField from "../../components/Common/TextField";
// import InfoIcon from "../../assets/Icons/InfoIcon.jsx";
// import LoginIcon from "../../assets/Icons/LoginIcon";
// import {
//   getValoperAddressFromBlockChain,
//   logInSuccess,
// } from "../../redux/reducer/auth";
// import { useGetNodeUrl } from "../../context/NodeUrl";
// import { toast } from "../../components/Common/Toast/Toast";
// import { getAddress } from "../../services/getAddress";
// import { NodeBox } from "./styles";
// import fetchValoperAddress from "../../services/fetchValoperAddress";
// import getLatestBlocks from "../../services/getLatestBlocks";
// import theme from "../../theme";

// import getBlockFromChain from "../../services/apis/getLatestBlockFromChain";
// import BackButton from "../../components/BackButton/BackButton.js";
// import { BackIcon } from "../../assets/Icons/SvgIcon.jsx";
// import { checkNodeStatus } from "../../services/checkValidUrl.js";
// import Loader from "../../components/Loader/Loader.js";

// const Login = () => {
//   const dispatch = useDispatch();
//   const [mnemonics, SetMnemonics] = useState("");
//   const { isLoggedIn, userAddress, isTx } = useSelector((state) => state.auth);
//   const changeHandler = (e) => SetMnemonics(e.target.value?.trim());
//   const { nodeUrl, setNodeUrl, isNodeAdded, setIsNodeAdded } = useGetNodeUrl();
//   const [isLoading, setIsLoading] = useState(false);

//   const submitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       // if (!mnemonics) {
//       //   toast.error("Mnemonics is required!");
//       //   return;
//       // }

//       // if (mnemonics?.length > 0) {
//       const data = {};
//       setIsLoading(true);

//       await window?.qubetics.sendRequest(
//         "nativeConnect",
//         data,
//         async (error, response) => {
//           if (response?.type == "error") {
//             setIsLoading(false);
//             toast.error(response?.data?.message || "Something went wrong");
//             return;
//           }
//           if (response) {
//             console.log(response, "RESPONSE");
//             return;
//             try {
//               let res = await getAddress(mnemonics);
//               console.log(res, "res");
//               if (res?.message) {
//                 setIsLoading(false);
//                 return toast.error(`Invalid node, ${res?.message}`);
//               }

//               let block = await getLatestBlocks();
//               let block1 = await getBlockFromChain();

//               if (
//                 block?.result?.block?.header?.height &&
//                 block1?.data?.blocknumber
//               ) {
//                 if (
//                   block?.result?.block?.header?.height ==
//                   block1?.data?.blocknumber
//                 ) {
//                   let valoperResponse = await fetchValoperAddress(mnemonics);
//                   dispatch(getValoperAddressFromBlockChain(valoperResponse));
//                   dispatch(logInSuccess(res));
//                   setIsLoading(false);
//                   return toast.success("Logged In Successfully");
//                 } else {
//                   setIsLoading(false);
//                   return toast.error(
//                     `Either check your node connection or node is not synced, current syncing status: ${block?.result?.block?.header?.height} out of ${block1?.data?.blocknumber}`
//                   );
//                 }
//               }
//             } catch (err) {
//               console.error(err);
//               setIsLoading(false);
//               toast.error("An error occurred while processing the request.");
//             }
//           }
//         }
//       );
//       // }
//     } catch (err) {
//       console.error(err);
//       setIsLoading(false);
//       toast.error(err?.message || "Check your node");
//     }
//   };

//   const handleNode = async () => {
//     if (
//       nodeUrl.includes("ws://") ||
//       nodeUrl.includes("https://") ||
//       nodeUrl.includes("http://") ||
//       nodeUrl.includes("wss://")
//     ) {
//       const checkNodeUrl = await checkNodeStatus(nodeUrl);
//       if (checkNodeUrl) {
//         localStorage.setItem("node", nodeUrl);
//         setIsNodeAdded(true);
//       } else {
//         toast.error("Invalid Url");
//       }
//     } else {
//       toast.error("Invalid URL");
//     }
//   };
//   const handleNodeChange = (e) => {
//     setNodeUrl(e.target.value);
//     setIsNodeAdded(false);
//   };

//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (event.key === "Enter" && nodeUrl) {
//         handleNode();
//       }
//     };

//     window.addEventListener("keydown", handleKeyPress);

//     return () => {
//       window.removeEventListener("keydown", handleKeyPress);
//     };
//   }, [nodeUrl]);

//   return (
//     <>
//       <div className="auth-wrapper">
//         {!isNodeAdded && (
//           <NodeBox>
//             <Box>
//               <div className="refresh-wrap">
//                 <Typography className="node-text">
//                   Node Information
//                   {/* <Tooltip
//                   className="vaildator-card__tooltip"
//                   placement="top"
//                   arrow
//                   title={
//                     <Typography variant="h6" padding={1}>
//                       Enter Your Validator Node IP <br />
//                     </Typography>
//                   }
//                 >
//                   <span className="tooltipStyleInfo" style={{ display: "flex", alignItems: "center" }}>
//                     <InfoIcon />
//                   </span>
//                 </Tooltip> */}
//                 </Typography>
//               </div>
//               {/* {!isLoggedIn ? ( */}
//               <>
//                 <label>Node Information</label>
//                 <input
//                   value={nodeUrl}
//                   onChange={(e) => handleNodeChange(e)}
//                   disabled={isLoggedIn}
//                   placeholder="Enter Node URL"
//                 />

//                 <div style={{ marginTop: "50px" }}>
//                   <CommonBtn
//                     children=" Submit"
//                     onClick={handleNode}
//                     disabled={!nodeUrl}
//                   />
//                 </div>
//               </>

//               {/* <Typography className="ver-text" color={theme.palette.gray.main}> */}
//               {/* </Typography> */}
//             </Box>
//           </NodeBox>
//         )}
//         {isNodeAdded && (
//           <NodeBox>
//             <Typography className="node-text ">
//               {" "}
//               <BackButton
//                 className="back-btns"
//                 onClick={() => {
//                   setNodeUrl("");
//                   setIsNodeAdded(false);
//                   localStorage.setItem("node", "");
//                 }}
//                 title={<BackIcon />}
//               />{" "}
//               Log In
//             </Typography>
//             <form onSubmit={submitHandler}>
//               <TextField
//                 label="Mnemonics"
//                 value={mnemonics}
//                 placeholder="Paste or enter your mnemonics"
//                 onChange={changeHandler}
//                 autoComplete="off"
//                 disabled={!isNodeAdded || isLoading}
//                 type="password"
//                 className="input-style"
//               />
//               {!isNodeAdded ? (
//                 <span
//                   style={{
//                     color: "#FF4E4E",
//                     fontSize: "14px",
//                     marginTop: "5px",
//                     display: "block",
//                   }}
//                 >
//                   NOTE : Connect With Node For Login
//                 </span>
//               ) : (
//                 ""
//               )}

//               <div className="auth-wrapper__btns">
//                 <Button
//                   variant="contained"
//                   type="submit"
//                   disabled={!isNodeAdded}
//                 >
//                   <span className="btn-icon">{/* <LoginIcon /> */}</span>
//                   Log In
//                 </Button>
//                 {/* <CommonBtn variant="contained" children="Log In" type="submit" disabled={!isNodeAdded} /> */}
//               </div>
//             </form>
//           </NodeBox>
//         )}
//         {isLoading && <Loader />}
//       </div>
//     </>
//   );
// };

// export default Login;

/* eslint-disable */

import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getValoperAddressFromBlockChain,
  logInSuccess,
} from "../../redux/reducer/auth";
import { useGetNodeUrl } from "../../context/NodeUrl";
import { toast } from "../../components/Common/Toast/Toast";
import { NodeBox } from "./styles";
import getLatestBlocks from "../../services/getLatestBlocks";

import getBlockFromChain from "../../services/apis/getLatestBlockFromChain";
import { checkNodeStatus } from "../../services/checkValidUrl.js";
import Loader from "../../components/Loader/Loader.js";
import CommonBtn from "../../components/Common/Commonbtn/Commonbtn";
import { RedCrosss } from "../../assets/Icons/SvgIcon";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { nodeUrl, setNodeUrl, isNodeAdded, setIsNodeAdded } = useGetNodeUrl();
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const data = {
        nodeUrl,
      };
      setIsLoading(true);

      await window?.qubetics.sendRequest(
        "nativeConnect",
        data,
        async (error, response) => {
          if (response?.type == "error") {
            setIsLoading(false);
            toast.error(response?.data?.message || "Something went wrong");
            return;
          }
          if (response?.data) {
            console.log(response, "response++VALOPERW");
            try {
              let block = await getLatestBlocks();
              let block1 = await getBlockFromChain();

              if (
                block?.result?.block?.header?.height &&
                block1?.data?.blocknumber
              ) {
                if (
                  block?.result?.block?.header?.height ==
                  block1?.data?.blocknumber
                ) {
                  dispatch(
                    getValoperAddressFromBlockChain(
                      response?.data?.valoperAddress
                    )
                  );
                  dispatch(logInSuccess(response?.data?.address));
                  setIsLoading(false);
                  return toast.success("Logged In Successfully");
                } else {
                  setIsLoading(false);
                  return toast.error(
                    `Either check your node connection or node is not synced, current syncing status: ${block?.result?.block?.header?.height} out of ${block1?.data?.blocknumber}`
                  );
                }
              }
            } catch (err) {
              console.error(err);
              setIsLoading(false);
              toast.error("An error occurred while processing the request.");
            }
          }
        }
      );
      // }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      toast.error(err?.message || "Check your node");
    }
  };

  const handleNode = async () => {
    if (
      nodeUrl.includes("ws://") ||
      nodeUrl.includes("https://") ||
      nodeUrl.includes("http://") ||
      nodeUrl.includes("wss://")
    ) {
      const checkNodeUrl = await checkNodeStatus(nodeUrl);
      if (checkNodeUrl) {
        localStorage.setItem("node", nodeUrl);
        setIsNodeAdded(true);
      } else {
        toast.error("Invalid Url");
      }
    } else {
      toast.error("Invalid URL");
    }
  };

  const handleNodeChange = (e) => {
    setNodeUrl(e.target.value);
    setIsNodeAdded(false);
  };

  const handleClearNode = () => {
    setNodeUrl("");
    setIsNodeAdded(false);
    localStorage.removeItem("node");
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && nodeUrl) {
        handleNode();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [nodeUrl]);

  return (
    <>
      <div className="auth-wrapper">
        <NodeBox>
          <Box>
            <div className="refresh-wrap">
              <Typography className="node-text">
                {" "}
                {isNodeAdded ? "Connect with Wallet" : "Node Information"}
              </Typography>
            </div>
            <>
              <label>Node Information</label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  value={nodeUrl}
                  onChange={(e) => handleNodeChange(e)}
                  disabled={isNodeAdded}
                  placeholder="Enter Node URL"
                />
                {isNodeAdded && (
                  <Button
                    className="headermetabtn"
                    style={{
                      position: "absolute",
                      right: "10px",
                      padding: "4px 5px 0px 5px",
                      minWidth: "31px",
                      top: "11px",
                    }}
                    onClick={handleClearNode}
                  >
                    <RedCrosss />
                  </Button>
                )}
              </div>

              <div style={{ marginTop: "50px" }}>
                <CommonBtn
                  children={isNodeAdded ? "Connect Wallet" : "Submit"}
                  onClick={isNodeAdded ? submitHandler : handleNode}
                  disabled={!nodeUrl}
                />
              </div>
            </>
          </Box>
        </NodeBox>

        {isLoading && <Loader />}
      </div>
    </>
  );
};

export default Login;

// eslint-disable

import { Paper, Typography, useMediaQuery, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { LOADING_STATES, editValidatorInput } from "../../../constant";
import "./styles";
import Modal from "@mui/material/Modal";
import FirstStep from "../../../components/SetupValidator/FirstStep";
import AuthorizeValidatorTransaction from "../../../components/SetupValidator/AuthorizeStep";
import BondTable from "../../../components/Funds/ManageAccount/BondTable";
import { ProfileDetails } from "../../Validators/EachValidator/styles";
import "./style.css";
import { useEffect, useState } from "react";
import Address from "../../Validators/EachValidator/copiedAddress";
import EditIcon from "../../../assets/Icons/EditIcon";
import ProfileTable from "../../../components/Profile/ProfileTable";
import getValidatorByAddress from "../../../services/apis/getValidatorByAddress";
import Loader from "../../../components/Loader/Loader";
import { checkIfValidatorExist, getBondedBalance, getValoperAddress } from "../../../redux/reducer/auth";
import { isOptionDisable } from "../../../utils/commissionEditTimer";
import { noExponential } from "../../../utils/commonFunctions";
import { toFixed } from "../../../utils/toFixed";
import { WalletAddress, HeadingItems, ProfileWrap, Profiledata } from "./styles";
import { BackIcon } from "../../../assets/Icons/SvgIcon";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const Profile = () => {
  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [profileStatus, setProfileStatus] = useState(LOADING_STATES.INIT);
  const [isLoading, setIsLoading] = useState(false);
  const { userAddress, isValidated } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [primaryValues, setPrimaryValues] = useState({
    name: "",
    details: "",
    website: "",
    identity: "",
    SecurityContact: "",
    CommissionRate: "",
  });
  const [hideCommissionField, setHideCommissionField] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const marginleft12 = {
    marginLeft: "20px",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userAddress || editSuccess == true) {
          setProfileStatus(LOADING_STATES.FETCHING);
          const response = await getValidatorByAddress(userAddress);
          if (response?.error === false) {
            setProfileData(response?.data?.validators[0]);
            const bondingData = {
              bondedAmount: response?.data?.validators[0]?.selfStake,
              unbondedAmount: response?.data?.validators[0]?.unbondingAmount,
            };
            dispatch(getValoperAddress(response?.data?.validators[0]?.operatorAddress));
            dispatch(checkIfValidatorExist(true));
            dispatch(getBondedBalance(bondingData));
            setProfileStatus(LOADING_STATES.SUCCESS);
          } else {
            dispatch(checkIfValidatorExist(false));
            setProfileStatus(LOADING_STATES.ERROR);
          }
        }
      } catch (err) {
        setProfileStatus(LOADING_STATES.ERROR);
        dispatch(checkIfValidatorExist(false));
        return err;
      }
    };
    fetchData();
  }, [userAddress, editSuccess]);

  useEffect(() => {
    setPrimaryValues({
      name: profileData?.name,
      details: profileData?.details,
      website: profileData?.website,
      identity: profileData?.identity,
      SecurityContact: profileData?.SecurityContact,
      CommissionRate: profileData?.commissionRate ? profileData?.commissionRate : "",
    });
  }, [profileData]);

  const handleBecomeValidator = () => {
    navigate("/account/become-a-validator");
  };

  useEffect(() => {
    if (profileData?.commissionUpdateTime) {
      let date = profileData?.commissionUpdateTime;
      if (isOptionDisable(date, 1)) {
        setHideCommissionField(true);
      } else {
        setHideCommissionField(false);
      }
    }
  }, [profileData]);

  return isLoading ? (
    <Loader />
  ) : profileStatus === LOADING_STATES.INIT || profileStatus === LOADING_STATES.FETCHING ? (
    <Loader />
  ) : (
    <>
      <HeadingItems>
        <Typography variant="h3" mb="20px" display={"flex"} justifyContent={"space-between"}>
          {profileStatus === LOADING_STATES.SUCCESS && isValidated ? <>Profile Details</> : <p className="manageHead">Manage Account</p>}

          {profileStatus === LOADING_STATES.SUCCESS && isValidated && profileData?.status !== "deactivating" && profileData?.status !== "inactive" && (
            <span>
              {/* <button
              onClick={handleOpen}
              className="editbutton"
              style={{
                color: "#fff",
                padding: "14px 30px",
                background: " linear-gradient(to right, #0068FF 50%, #00A7FF 100% )",
                borderRadius: "15px",
                display: "flex",
                gap: "20px",
                border: 0,
              }}
            >
              {" "}
              Edit Validator
              <EditIcon style={marginleft12} />
            </button> */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                style={{
                  backdropFilter: "blur(5px)",
                  // backgroundColor: "rgba(255, 255, 255, 0.5)",
                }}
              >
                <Box
                  sx={{
                    ...style,
                    width: 500,
                    // background: "#121212",
                    // borderRadius: "10px",
                    border: 0,
                    padding: 0,
                  }}
                >
                  <h2 id="parent-modal-title" style={{ color: "#fff" }}>
                    {/* Edit Validator Details */}
                  </h2>
                  {(() => {
                    switch (activeStep) {
                      case 0:
                        return <FirstStep primaryValues={primaryValues} setPrimaryValues={setPrimaryValues} setActiveStep={setActiveStep} activeStep={activeStep} methodType="editValidator" profileData={profileData} hideCommissionField={hideCommissionField} />;
                      case 1:
                        return <AuthorizeValidatorTransaction setActiveStep={setActiveStep} primaryValues={primaryValues} methodType="editValidator" setOpen={setOpen} setIsLoading={setIsLoading} hideCommissionField={hideCommissionField} setEditSuccess={setEditSuccess} />;
                      default:
                        return <></>;
                    }
                  })()}
                </Box>
              </Modal>
            </span>
          )}
        </Typography>
      </HeadingItems>
      {profileStatus === LOADING_STATES.SUCCESS && isValidated ? (
        <>
          <div className="bond-wrapper">
            <Typography className="bond-wrapper__title bond-wrapper__title--flex validator-address">
              <WalletAddress>
                <div className="walletInnerData">
                  <Typography>Wallet Address:</Typography>
                  <Address address={userAddress} />
                </div>
                <button onClick={handleOpen} className="editbutton">
                  {" "}
                  Edit Validating
                  {/* <EditIcon style={marginleft12} /> */}
                </button>
              </WalletAddress>
            </Typography>
          </div>
          <Paper className="manageAccountDetails">
            {editValidatorInput?.map((item) => (
              <ProfileDetails key={item?.id}>
                <Typography color="text.secondary" variant="body2">
                  {item?.label}
                </Typography>
                <Typography>{profileData ? profileData[item?.name] : "-"}</Typography>
              </ProfileDetails>
            ))}
            <ProfileDetails>
              <Typography color="text.secondary" variant="body2">
                Commission Rate
              </Typography>
              <Typography>{profileData?.commissionRate ? noExponential(toFixed(profileData?.commissionRate, 4)) : 0}%</Typography>
            </ProfileDetails>
            <ProfileDetails>
              <Typography color="text.secondary" variant="body2">
                Commission Max Rate
              </Typography>
              <Typography>{profileData?.commissionMaxRate ? noExponential(toFixed(profileData?.commissionMaxRate, 4)) : 0}%</Typography>
            </ProfileDetails>
            <ProfileDetails>
              <Typography color="text.secondary" variant="body2">
                Commission Max Change Rate
              </Typography>
              <Typography>{profileData?.commissionMaxChangeRate ? noExponential(toFixed(profileData?.commissionMaxChangeRate, 4)) : 0}%</Typography>
            </ProfileDetails>
          </Paper>
          <ProfileTable profileData={profileData} />
          <Box className="account-card">
            <BondTable bondedData={profileData} />
          </Box>
        </>
      ) : (
        <ProfileWrap className="profile-wrap">
          <div className="backProfilebtn">
            <h3>Profile Details</h3>
          </div>
          <Box className="profile-wrap__item profiledata">
            <Typography> Wallet Address:</Typography>
            <br />
            <Address address={userAddress} />
          </Box>

          <Profiledata className="profile-wrap__item profile-wrap__item--status">
            <Typography>Validator Status:</Typography>
            <Button
              className="transparentbtn"
              variant="contained"
              fullWidth
              onClick={handleBecomeValidator}
              sx={{
                maxWidth: "240px",
              }}
            >
              Setup as a validator
            </Button>
          </Profiledata>
        </ProfileWrap>
      )}
    </>
  );
};

export default Profile;

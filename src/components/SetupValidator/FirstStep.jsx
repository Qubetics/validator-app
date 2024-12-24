/* eslint-disable */
import { Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../Common/FormWrapper";
import { useEffect } from "react";
import BackButton from "../BackButton/BackButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import fetchPubKey from "../../services/fetchPubKey";
import { useGetNodeUrl } from "../../context/NodeUrl";
import { createValidatorInput, editValidatorInput } from "../../constant";
import { handleNext } from "../../utils/validatorValidations";
import CommonBtn from "../Common/Commonbtn/Commonbtn.jsx";
import { BackIcon } from "../../assets/Icons/SvgIcon";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const FirstStep = ({ primaryValues, setPrimaryValues, setActiveStep, activeStep, methodType, hideCommissionField }) => {
  const navigate = useNavigate();
  const { nodeUrl } = useGetNodeUrl();
  let regex = /^[a-zA-Z\s]*$/;

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchPubKey(nodeUrl);
        const pub_key = res?.result?.validator_info?.pub_key?.value;
        localStorage.setItem("publicKey", pub_key);
      } catch (err) {
        return err;
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "CommissionRate" && name !== "website") {
      if (regex.test(value)) {
        const sanitizedValue = value.replace(/\s+/g, " ");
        setPrimaryValues((prevValue) => ({
          ...prevValue,
          [name]: sanitizedValue,
        }));
      }
    } else {
      const sanitizedValue = value.replace(/\s+/g, " ");
      setPrimaryValues((prevValue) => ({
        ...prevValue,
        [name]: sanitizedValue,
      }));
    }
  };

  return (
    <FormWrapper>
      <div className="common-wrapper" style={{ marginTop: "20px" }}>
        {methodType && methodType !== "editValidator" && <BackButton onClick={goBack} />}
        <Typography whiteSpace="nowrap" className="common-wrapper__title common-wrapper__title--flex">
          <BackButton onClick={() => navigate(-1)} title={<BackIcon />} />
          Setup as a validator
        </Typography>
        {/* ========================================input=============================== */}
        <ThemeProvider theme={darkTheme}>
          {methodType == "createValidator"
            ? createValidatorInput?.map((item) => (
                <div className="inputFields">
                  <label>{item?.label}</label>
                  <TextField
                    key={item?.id}
                    placeholder="Please Enter"
                    fullWidth
                    value={primaryValues[item?.name]}
                    style={{ marginBottom: "20px" }}
                    id="outlined-basic"
                    // label={item?.label}
                    name={item?.name}
                    autoComplete="off"
                    variant="outlined"
                    onChange={(e) => handleChange(e)}
                    InputProps={{
                      style: {
                        borderRadius: "15px",
                        background: "#37373c",
                      },
                    }}
                  />
                </div>
              ))
            : editValidatorInput?.map((item) => (
                <div className="inputFields">
                  <label>{item?.label}</label>
                  <TextField
                    key={item?.id}
                    fullWidth
                    value={primaryValues[item?.name]}
                    style={{ marginBottom: "10px" }}
                    id="outlined-basic"
                    name={item?.name}
                    autoComplete="off"
                    variant="outlined"
                    onChange={(e) => handleChange(e)}
                    InputProps={{
                      style: {
                        borderRadius: "15px",
                        backgroundColor: "#080808",
                      },
                    }}
                  />
                </div>
              ))}
          {hideCommissionField === false && (
            <div className="inputFields">
              <label>Commission Rate</label>
              <TextField
                fullWidth
                value={primaryValues?.CommissionRate}
                style={{ marginBottom: "10px" }}
                id="outlined-basic"
                // label="Commission Rate"
                name="CommissionRate"
                autoComplete="off"
                variant="outlined"
                onChange={(e) => handleChange(e)}
                InputProps={{
                  style: {
                    borderRadius: "15px",
                    backgroundColor: "#080808", // Replace with your desired background color
                  },
                }}
              />
            </div>
          )}
        </ThemeProvider>
        {/* <Button variant="contained" className="primary-btn" fullWidth onClick={() => handleNext(primaryValues, activeStep, setActiveStep)} style={{ marginTop: "34px" }}>
          nextdd
        </Button> */}
        <CommonBtn children="Next" onClick={() => handleNext(primaryValues, activeStep, setActiveStep)} />
      </div>
    </FormWrapper>
  );
};

export default FirstStep;

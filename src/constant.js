/*eslint-disable*/

export const DEFAULT_FLAGS_ELECTED = {
  withController: true,
  withExposure: true,
  withPrefs: true,
};

export const DEFAULT_FLAGS_WAITING = {
  withController: true,
  withPrefs: true,
};

export const LOADING_STATES = {
  INIT: "Init",
  FETCHING: "Fetching",
  SUCCESS: "Success",
  ERROR: "Error",
};

/*PAGE LIMIT*/
export const PAGE_LIMIT = 10;
export const DEAFAULT_PAGE = 1;
export const DEFAULT_TABLE_LIMIT = 10;

/*BASE URL*/
export const BASE_URL = {
  EXPLORER_API_URL: process.env.REACT_APP_EXPLORER_API_URL,
  EXPLORER_NAVIGATION_URL: process.env.REACT_APP_EXPLORER_NAVIGATION_URL,
  VALIDATOR_API: process.env.REACT_APP_VALIDATOR_API,
};

export const CURRENCY = process.env.REACT_APP_CURRENCY;
export const APP_NAME = process.env.REACT_APP_NAME;
export const DENOM = process.env.REACT_APP_DENOM;
export const DECIMAL = process.env.REACT_APP_DECIMAL;
export const MIN_BOND_AMOUNT = process.env.REACT_APP_MIN_STAKE_AMOUNT || 100;
export const FEE = process.env.REACT_APP_FEE_DEDUCTION;
export const JAIL_TIME = process.env.REACT_APP_JAIL_TIME;
export const PREFIX = "qubetics";
// export const NODE_NAME =

/*WALLET URL FOR CREATING NEW ACCOUNT*/

/*API URL*/
export const API_URL = {
  ALL_VALIDATOR_LIST: "validator/info",
  GET_LOGIN_DATA: "validator/{{userAddress}}",
  GET_ALL_BLOCKS: "get-all-blocks?pageNo={{pageNo}}&limit={{limit}}",
  ADD_NAME: "validator/add-name",
  TOTAL_REWARD: "get-recent-total-reward-by-address/{{userAddress}}",
  REWARD: "get-reward-by-address/{{userAddress}}",
  RECENT_ACTION: "get-transaction-by-address?address={{userAddress}}",
};

export const bondedTableHeader = [
  {
    heading: "Bonded",
    content:
      "Bonded funds give the right to rewards and are exposed to slashing",
  },
  {
    heading: "Unbonded",
    content: `Funds unbonded will be available for withdrawal after the completion of the Unbonding Period which is ${JAIL_TIME} minutes`,
  },
  {
    heading: "Actions",
    content: "",
  },
];

export const stopMenuOptions = [
  {
    label: "Bond more funds",
    path: "/account/funds/bond",
    style: "btn-blue",
  },
  {
    label: "Unbond funds",
    path: "/account/funds/unbond",
    style: "btn-yellow",
  },
  {
    label: "Stop validating",
    path: "/account/funds/stopvalidator",
    style: "btn-red",
  },
];
export const reValidateMenuOptions = [
  {
    label: "Bond more funds",
    path: "/account/funds/bond",
    style: "btn-blue",
  },
  {
    label: "Re-Validate",
    path: "/account/funds/revalidation",
    style: "btn-red",
  },
];

export const errors = {
  LOW_BALANCE: "Insufficient funds",
};
export const logoURL =
  "https://pmc-media.s3.us-west-2.amazonaws.com/vine-assets";

export const ErrorMsgs = {
  zero: "Unbond amount must be greater than zero",
  insufficient: "Insufficient Bonded Amount for Unbond",
  msg: `Funds unbonded will be available for withdrawal after the completion of the Unbonding Period which is ${JAIL_TIME} minutes`,
};

export const createValidatorInput = [
  {
    id: 1,
    label: "Name",
    name: "name",
  },
  {
    id: 2,
    label: "Description",
    name: "details",
  },
  {
    id: 3,
    label: "Website",
    name: "website",
  },
  {
    id: 4,
    label: "Identity",
    name: "identity",
  },
  {
    id: 5,
    label: "Security Contact",
    name: "SecurityContact",
  },
];

export const editValidatorInput = [
  {
    id: 1,
    label: "Name",
    name: "name",
  },
  {
    id: 2,
    label: "Description",
    name: "details",
  },
  {
    id: 3,
    label: "Website",
    name: "website",
  },
  {
    id: 4,
    label: "Identity",
    name: "identity",
  },
  {
    id: 5,
    label: "Security Contact",
    name: "SecurityContact",
  },
];

export const commissionInputValues = [
  {
    id: 1,
    label: "Max Rate",
    name: "Max_Rate",
    helperText: "Max rate should be either >= 0.05 or <= 1",
  },
  {
    id: 2,
    label: "Initial Rate",
    name: "Commission_Rate",
    helperText: "Initial rate should be either >= 0.05 or <= Max Rate",
  },
  {
    id: 3,
    label: "Max Change Rate",
    name: "Max_Change_Rate",
    helperText: "Max change rate should be either >= 0.05 or <= Max Rate",
  },
];

export const splitAddress = (data = "", startLen, endLen) => {
  return `${data.substring(0, startLen)}.....${data.substring(
    data?.length - endLen,
    data?.length
  )}`;
};

export const msg = {
  tooltip: {
    marketCap: " Total value of all the coins issued",
    totalSupply: "Total coins issued by the system",
  },
};

/*eslint-disable*/

import { useCallback, useEffect, useState } from "react";
import {
  CURRENCY,
  DEFAULT_TABLE_LIMIT,
  LOADING_STATES,
  PAGE_LIMIT,
} from "../../../constant";
import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import Loader from "../../Loader/Loader";
import Copyicon from "../../../assets/Icons/CopyIcon.jsx";
import { Pagination, NoData } from "./styles";
import FlexBox from "../../Common/FlexBox";
import { usePagination } from "../../../hooks/UsePagination";
import { useNavigate } from "react-router-dom";
import getAllValidators from "../../../services/apis/getAllValidators";
import {
  formatMillionNumber,
  noExponential,
} from "../../../utils/commonFunctions";
import getValidatorByAddress from "../../../services/apis/getValidatorByAddress";
import { toFixed } from "../../../utils/toFixed";
import getData from "../../../utils/getData";
import { toast } from "../../Common/Toast/Toast.js";
import { useDispatch } from "react-redux";
import { getValidatorCount } from "../../../redux/reducer/auth";
import { NotFoundIcon } from "../../../assets/Icons/SvgIcon";
import { showEVMAddress } from "../../../services/showEVMAddress";

const tableHeader = [
  "#No",
  "Name",
  "Validator Address",
  "Total Stake",
  "Commission",
  "Self Stake",
  "Delegators",
];

const statusHeader = [
  "#No",
  "Name",
  "Validator Address",
  "Status",
  "Total Stake",
  "Commission",
  "Self Stake",
  "Delegators",
];

const ValidatorsTable = ({
  tabId,
  setTabId,
  searchData,
  isSearch,
  setIsSearch,
}) => {
  const navigate = useNavigate();
  const {
    pageParams,
    handlePageChange,
    totalPages,
    setTotalCount,
    setCurrentPage,
  } = usePagination();
  let number = 0;
  const [validatorListData, setValidatorListData] = useState([]);
  const [validatorStatus, setValidatorStatus] = useState(LOADING_STATES.INIT);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  const [evmAddresses, setEvmAddresses] = useState({}); // Store EVM addresses

  useEffect(() => {
    const fetchEvmAddresses = async () => {
      const updatedAddresses = {};
      for (const validator of validatorListData) {
        if (validator?.validatorAddress) {
          updatedAddresses[validator.validatorAddress] = await showEVMAddress(
            validator.validatorAddress
          );
        }
      }
      setEvmAddresses(updatedAddresses);
    };

    if (validatorListData.length > 0) {
      fetchEvmAddresses();
    }
  }, [validatorListData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [tabId]);

  const fetchSearchData = async () => {
    try {
      if (searchData?.trim()?.length > 0) {
        let trimmedData = searchData?.trim();
        const response = await getValidatorByAddress(
          trimmedData,
          pageParams?.page,
          DEFAULT_TABLE_LIMIT
        );
        let count = response?.data?.count || 1;
        setTotalCount(count);
        setValidatorListData(response?.data?.validators || []);
        setStatus();
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    if (isSearch === true) {
      fetchSearchData();
    }
    if (searchData?.length > 0) {
      setTabId(0);
    }
  }, [isSearch]);

  const fetchData = useCallback(async () => {
    try {
      setValidatorStatus(LOADING_STATES.FETCHING);
      switch (tabId) {
        case 0: {
          const response = await getAllValidators(
            pageParams?.page,
            DEFAULT_TABLE_LIMIT,
            tabId
          );
          return (
            response?.data?.count > 0
              ? (setValidatorListData(response?.data?.validators),
                setTotalCount(response?.data?.count))
              : (setValidatorListData([]), setTotalCount(0)),
            setValidatorStatus(LOADING_STATES.SUCCESS),
            dispatch(getValidatorCount(response?.data))
          );
        }
        case 1: {
          const response = await getAllValidators(
            pageParams?.page,
            DEFAULT_TABLE_LIMIT,
            tabId,
            "active"
          );
          return (
            response?.data?.activeCount > 0
              ? (setValidatorListData(response?.data?.validators),
                setTotalCount(response?.data?.activeCount))
              : (setValidatorListData([]), setTotalCount(0)),
            setValidatorStatus(LOADING_STATES.SUCCESS)
          );
        }
        case 2: {
          const response = await getAllValidators(
            pageParams?.page,
            DEFAULT_TABLE_LIMIT,
            tabId,
            "inactive"
          );
          return (
            response?.data?.inactiveCount > 0
              ? (setValidatorListData(response?.data?.validators),
                setTotalCount(response?.data?.inactiveCount))
              : (setValidatorListData([]), setTotalCount(0)),
            setValidatorStatus(LOADING_STATES.SUCCESS)
          );
        }
        case 3: {
          const response = await getAllValidators(
            pageParams?.page,
            DEFAULT_TABLE_LIMIT,
            tabId,
            "deactivating"
          );
          return (
            response?.data?.deactivatingCount > 0
              ? (setValidatorListData(response?.data?.validators),
                setTotalCount(response?.data?.deactivatingCount))
              : (setValidatorListData([]), setTotalCount(0)),
            setValidatorStatus(LOADING_STATES.SUCCESS)
          );
        }
      }
    } catch (err) {
      setValidatorListData([]);
      setTotalCount(0);
      setValidatorStatus(LOADING_STATES.ERROR);
      return err;
    }
  }, [pageParams?.page, tabId]);

  useEffect(() => {
    if (!searchData?.length > 0) {
      fetchData();
    }
  }, [tabId, pageParams?.page, searchData]);

  const getdata = (address) => {
    navigate(`/validators/${address}`);
  };

  const copiedAddress = (address) => {
    navigator.clipboard.writeText(address);
    toast.success("Address Copied");
  };
  return (
    <>
      <div className="table-wrap">
        <TableContainer
          component={Paper}
          sx={{ borderRadius: "20px", overflowY: "auto" }}
        >
          <Table
            sx={{ minWidth: 850 }}
            aria-label="validators table"
            className="validator-table"
          >
            {validatorListData?.length > 0 && (
              <TableHead>
                <TableRow>
                  {tabId == 0
                    ? statusHeader?.map((item, index) => (
                        <TableCell key={index + 1}>
                          <Typography
                            variant="label"
                            color="text.secondary"
                            fontWeight="700"
                          >
                            {item}
                          </Typography>
                        </TableCell>
                      ))
                    : tableHeader.map((item, index) => (
                        <TableCell key={index + 1}>
                          <Typography variant="label" color="text.secondary">
                            {item}
                          </Typography>
                        </TableCell>
                      ))}
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {validatorStatus === LOADING_STATES.INIT ||
              validatorStatus === LOADING_STATES.FETCHING
                ? Array.from({ length: DEFAULT_TABLE_LIMIT }).map(
                    (_, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {Array.from({
                          length: (tabId === 0 ? statusHeader : tableHeader)
                            .length,
                        }).map((_, colIndex) => (
                          <TableCell key={colIndex}>
                            <Skeleton
                              variant="text"
                              width="100%"
                              height="24px"
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  )
                : validatorListData?.map((data, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-of-type td, &:last-of-type th": { border: 0 },
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>
                        {pageParams?.page > 1 ? (
                          ((number =
                            index +
                            (pageParams?.page - 1) * DEFAULT_TABLE_LIMIT),
                          (
                            <div className="id-wrap__icon id-wrap__icon--mr-0">
                              <span>{number + 1}</span>
                            </div>
                          ))
                        ) : (
                          <div className="id-wrap__icon id-wrap__icon--mr-0">
                            {" "}
                            <span>{index + 1}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {data?.name
                            ? data?.name == "unknown"
                              ? "-"
                              : capitalizeFirstLetter(data?.name)
                            : "-"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {data?.validatorAddress ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <span
                              onClick={() =>
                                getdata(evmAddresses[data?.validatorAddress])
                              }
                              className="valAddress"
                              style={{ cursor: "pointer" }}
                            >
                              {getData(evmAddresses[data?.validatorAddress])}
                            </span>
                            <span
                              onClick={() =>
                                copiedAddress(
                                  evmAddresses[data?.validatorAddress]
                                )
                              }
                              className="copy-btn"
                              style={{
                                marginLeft: "10px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Copyicon sx={{ fontSize: 17 }} />
                            </span>
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>

                      {tabId === 0 && (
                        <TableCell>
                          <Typography
                            variant="body2"
                            style={{
                              color:
                                data?.status === "active"
                                  ? "#1FDD00"
                                  : data?.status === "inactive"
                                  ? "#FF9900"
                                  : data?.status === "deactivating"
                                  ? "#FF4E4E"
                                  : "inherit",
                            }}
                          >
                            {data?.status
                              ? capitalizeFirstLetter(data?.status)
                              : "-"}
                          </Typography>
                        </TableCell>
                      )}
                      <TableCell>
                        <Typography variant="body2">
                          <Tooltip
                            title={
                              data?.selfStake
                                ? noExponential(
                                    Number(data?.totalStake) / 10 ** 18
                                  )
                                : "0"
                            }
                            arrow
                          >
                            {data?.totalStake
                              ? formatMillionNumber(
                                  noExponential(
                                    Number(data?.totalStake) / 10 ** 18
                                  )
                                )
                              : "0"}{" "}
                            {CURRENCY}
                          </Tooltip>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {data?.commissionRate
                            ? noExponential(toFixed(data?.commissionRate, 4))
                            : "0"}
                          %
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip
                          title={
                            data?.selfStake
                              ? noExponential(
                                  Number(data?.selfStake) / 10 ** 18
                                )
                              : "0"
                          }
                          arrow
                        >
                          <Typography variant="body2">
                            {data?.selfStake
                              ? formatMillionNumber(
                                  noExponential(
                                    Number(data?.selfStake) / 10 ** 18
                                  )
                                )
                              : "0"}{" "}
                            {CURRENCY}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {data.delegatorCount ? data?.delegatorCount : 0}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
            {(!validatorListData || validatorListData.length === 0) && (
              <div
                sx={{
                  border: "0 !important",
                }}
              >
                <Typography variant="body2">
                  {" "}
                  <NoData className="Nodata">
                    <NotFoundIcon />
                    No Data
                  </NoData>
                </Typography>
              </div>
            )}
          </Table>
        </TableContainer>
      </div>
      {validatorListData?.length > 0 && totalPages > 1 && (
        <FlexBox
          sx={{
            justifyContent: "center",
            paddingTop: "20px",
            minHeight: "60px",
          }}
        >
          <Pagination
            style={{ marginLeft: "auto" }}
            count={totalPages}
            variant="outlined"
            shape="rounded"
            page={pageParams.page}
            onChange={handlePageChange}
          />
        </FlexBox>
      )}
      {/* {isLoading ? <Loader /> : null} */}
    </>
  );
};

export default ValidatorsTable;

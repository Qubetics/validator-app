/*eslint-disable*/
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { BASE_URL, CURRENCY, DEFAULT_TABLE_LIMIT } from "../../../constant";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ActionStatus } from "./styles";
import { Pagination } from "./pageStyle";
import FlexBox from "../../Common/FlexBox";
import { usePagination } from "../../../hooks/UsePagination";
import Loader from "../../Loader/Loader";
import getTxByAddress from "../../../services/apis/getTxByAddress";
import SkeletonRow from "../../SkeletonRow/SkeletonRow";
import { PrevIcon, NextIcon } from "../../../assets/Icons/SvgIcon.jsx";
import CopyIcon from "../../../assets/Icons/CopyIcon";
import { toast } from "../../Common/Toast/Toast";
import { NotFoundIcon } from "../../../assets/Icons/SvgIcon";
import { useLocation } from "react-router-dom";
import { formatMillionNumber } from "../../../utils/commonFunctions";

const tableHeader = ["Transaction Hash", "Type", "Amount", "Status"];

const transactionHash = (id) => {
  window.open(` ${BASE_URL.EXPLORER_NAVIGATION_URL}/tx/${id}`, "_blank");
};

const copiedAddress = (data) => {
  navigator.clipboard.writeText(data);
  toast.success("Tx Hash Copied");
};

const ActionTable = ({ setWalletActivitesLength, showAll }) => {
  const { userAddress } = useSelector((state) => state.auth);
  const { pageParams, handlePageChange, totalPages, setTotalCount } =
    usePagination();
  const [txData, setTxData] = useState([]);
  const [txStatus, setTxStatus] = useState("Init");
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userAddress) {
          setTxStatus("Fetching");
          const response = await getTxByAddress(
            userAddress,
            pageParams?.page,
            DEFAULT_TABLE_LIMIT
          );
          setTxData(response?.data?.transactions);
          setTotalCount(response?.data?.count);
          setWalletActivitesLength(response?.data?.count);
          setTxStatus("Success");
        }
      } catch (err) {
        setTxStatus("Error");
        return err;
      }
    };
    fetchData();
  }, [userAddress, pageParams?.page, pathname]);

  const showRecentActivitesData = showAll ? txData : txData?.slice(0, 5);
  const renderTableRows = () => {
    {
      showRecentActivitesData?.length > 0 &&
        (txStatus === "Fetching"
          ? Array.from({ length: 5 }).map((_, index) => (
              <SkeletonRow key={index} columns={tableHeader.length} />
            ))
          : null);
    }
    if (showRecentActivitesData?.length === 0 || !showRecentActivitesData) {
      return (
        <TableRow>
          <TableCell
            colSpan={4}
            sx={{
              border: "0 !important",
            }}
          >
            <Typography variant="body2" align="center">
              No Recent Action Available
            </Typography>
          </TableCell>
        </TableRow>
      );
    }
    return showRecentActivitesData?.map((data, index) => (
      <TableRow
        key={index}
        sx={{
          "&:last-of-type td, &:last-of-type th": { border: 0 },
        }}
      >
        <TableCell>
          <Typography variant="body2">
            <span
            // onClick={() => transactionHash(data?.txhash)}
            // className="text-hover"
            >
              <span className="recentHash"> {data?.txhash || "-"}</span>
              {/*
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  copiedAddress(data?.txhash);
                }}
              >
                <CopyIcon sx={{ fontSize: "17px" }} />
              </span>
            */}
            </span>
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="body2">{data?.type || "-"}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">
            {data?.value ? formatMillionNumber(data?.value) : 0} {CURRENCY}
          </Typography>
        </TableCell>
        <TableCell sx={{ pr: 10 }}>
          <ActionStatus
            variant="body2"
            status={data?.status}
            style={{
              color:
                data?.status === "SUCCESS" || data?.status === "success"
                  ? "#1FDD00"
                  : data?.status === "PROCESSING" ||
                    data?.status === "PENDING" ||
                    data?.status === "pending" ||
                    data?.status === "processing"
                  ? "#FF9900"
                  : data?.status === "FAILED" || data?.status === "failed"
                  ? "#FF4E4E"
                  : "inherit", // Default color
            }}
          >
            {data?.status || "-"}
          </ActionStatus>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <TableContainer>
        {txStatus === "Error" && !showAll ? (
          <div className="Nodata">
            <NotFoundIcon />
            No Data
          </div>
        ) : (
          <Table sx={{ minWidth: 800 }} aria-label="action table">
            <TableHead>
              <TableRow>
                {tableHeader.map((item, index) => (
                  <TableCell key={index}>
                    <Typography variant="label">{item}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{renderTableRows()}</TableBody>
          </Table>
        )}
      </TableContainer>
      {txData?.length > 0 && totalPages > 1 && showAll && (
        <FlexBox
          sx={{
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          <Pagination
            prefix={<PrevIcon />}
            count={totalPages}
            variant="outlined"
            shape="rounded"
            page={pageParams?.page}
            onChange={handlePageChange}
            style={{ marginLeft: "auto" }}
          />
        </FlexBox>
      )}
    </>
  );
};

export default ActionTable;

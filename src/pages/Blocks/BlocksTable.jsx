/* eslint-disable */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Skeleton } from "@mui/material";
import getAllBlocks from "../../services/apis/getAllBlocks";
import { useEffect, useState } from "react";
import { BASE_URL, DEAFAULT_PAGE, PAGE_LIMIT } from "../../constant";
import reduceData, {
  isTimeAgoByCreatedDate,
} from "../../utils/commonFunctions";
import CopyIcon from "../../assets/Icons/CopyIcon";
import { toast } from "../../components/Common/Toast/Toast";
import { useNavigate } from "react-router-dom";

const tableHeader = ["Blocks", "Block Hash", "Validator", "Time"];

const BlocksTable = () => {
  const [blocks, setBlocks] = useState([]);
  const [blockStatus, setBlockStatus] = useState("Init");
  const navigate = useNavigate();

  const transactionHash = (id) => {
    window.open(`${BASE_URL.EXPLORER_NAVIGATION_URL}/blocks/${id}`, "_blank");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setBlockStatus("Fetching");
        const response = await getAllBlocks(DEAFAULT_PAGE, PAGE_LIMIT);
        setBlocks(response?.data?.blocks);
        setBlockStatus("Success");
      } catch (err) {
        setBlockStatus("Error");
        return err;
      }
    };
    fetchData();
  }, []);

  const renderSkeletonRow = () => (
    <TableRow>
      {tableHeader.map((_, index) => (
        <TableCell key={index}>
          <Skeleton variant="text" width="80%" />
        </TableCell>
      ))}
    </TableRow>
  );

  const copiedAddress = (data) => {
    navigator.clipboard.writeText(data);
    toast.success("Copied");
  };
  const getdata = (address) => {
    navigate(`/validators/${address}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        className="block-table"
      >
        <TableHead>
          <TableRow>
            {tableHeader?.map((item, index) => (
              <TableCell key={index}>
                <Typography
                  color="text.secondary"
                  fontSize="16px"
                  lineHeight="20px"
                  fontWeight="400"
                >
                  {item}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {blockStatus === "Fetching"
            ? Array.from({ length: 10 }).map((_, index) => renderSkeletonRow()) // Render 5 skeleton rows
            : blocks?.map((data) => (
                <TableRow
                  key={data?.id}
                  sx={{
                    "&:last-of-type td, &:last-of-type th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <div className="id-wrap">
                      <Typography variant="body2">
                        {data?.blockhash ? (
                          <span
                            className="text-hover"
                            onClick={() => transactionHash(data?.blocknumber)}
                            style={{ cursor: "pointer" }}
                          >
                            {data?.blocknumber}
                          </span>
                        ) : (
                          ""
                        )}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      <text className="text-hover1" sx={{ display: "flex" }}>
                        {data?.blockhash ? (
                          <>
                            <span
                              // onClick={() => transactionHash(data?.blockhash)}
                              // style={{ cursor: "pointer" }}
                              className="blockdd"
                            >
                              {reduceData(data?.blockhash)}
                            </span>
                            <span
                              onClick={() => copiedAddress(data?.blockhash)}
                            >
                              <CopyIcon sx={{ fontSize: "17px" }} />
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </text>
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      <text className="valadd" sx={{ display: "flex" }}>
                        {data?.miner ? (
                          <>
                            <span
                              className="blockdds"
                              onClick={() => getdata(data?.miner)}
                              style={{ cursor: "pointer" }}
                            >
                              {reduceData(data?.miner)}
                            </span>
                            <span onClick={() => copiedAddress(data?.miner)}>
                              <CopyIcon sx={{ fontSize: "17px" }} />
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </text>
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {data?.createdAt
                        ? isTimeAgoByCreatedDate(data?.createdAt)
                        : ""}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BlocksTable;

/*eslint-disable*/
import {
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { CURRENCY } from "../../constant";
import Paper from "@mui/material/Paper";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { noExponential } from "../../utils/commonFunctions";
import { toFixed } from "../../utils/toFixed";

const ProfileTable = ({ profileData }) => {
  const tableHeader = ["TOTAL STAKE", "COMMISSION", "STATUS"];
  return (
    <>
      {
        <div className="common-table mt-5">
          <TableContainer
            component={Paper}
            sx={{
              borderTopLeftRadius: "30px !important",
              borderTopRightRadius: "30px !important",
              border: 0,
            }}
          >
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              className="block-table"
            >
              <TableHead>
                <TableRow
                  sx={{
                    "th:first-of-type": { paddingLeft: "80px" },
                  }}
                >
                  {tableHeader.map((item, index) => (
                    <TableCell key={index}>
                      <Typography
                        color="text.secondary"
                        fontSize="14px"
                        lineHeight="24px"
                      >
                        {item}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body2">
                      {profileData?.totalStake
                        ? noExponential(
                            toFixed(
                              Number(profileData?.totalStake) / 10 ** 18,
                              4
                            )
                          )
                        : "0"}{" "}
                      {CURRENCY}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {profileData?.commissionRate
                        ? noExponential(toFixed(profileData?.commissionRate, 4))
                        : "0"}
                      %
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      paddingLeft: "80px",
                    }}
                  >
                    <Typography variant="body2">
                      {profileData?.status
                        ? capitalizeFirstLetter(profileData?.status)
                        : "-"}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      }
    </>
  );
};

export default ProfileTable;

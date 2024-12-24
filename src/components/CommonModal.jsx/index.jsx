import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "./style.css";
import { JAIL_TIME } from "../../constant";

const CommonModal = ({ open, setOpen, message }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Dialog className="messageModal" fullScreen={fullScreen} open={open} onClose={() => setOpen(false)} aria-labelledby="responsive-dialog-title">
        <DialogTitle
          sx={{
            color: "#fff",
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            padding: "1rem",
          }}
        >
          Message{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              color: "#0086ff",
              textAlign: "center",
              fontSize: "1.rem",
              fontWeight: "bold",
              padding: "1rem",
            }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              width: "100%",
              margin: "1rem",
              background: "#0086ff",
              color: "#fff",
              padding: "7px 20px",
              borderRadius: "8px",
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CommonModal;

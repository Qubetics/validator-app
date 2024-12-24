/*eslint-disable*/
import { Button } from "@mui/material";

const BackButton = ({ onClick, title }) => {
  return (
    <Button variant="contained" onClick={onClick} className="back-btns primary-btn">
      {title}
    </Button>
  );
};

export default BackButton;

/*eslint-disable*/
import { Button } from "@mui/material";

const BackButton = ({ onClick, title }) => {
  return (
    <button variant="contained" onClick={onClick} className="back-btns primary-btn">
      {title}
    </button>
  );
};

export default BackButton;

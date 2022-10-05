import { IconButton, Zoom } from "@mui/material";
import React from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CloseIcon from "@mui/icons-material/Close";

const Square = (props) => {
  // return (
  //   <IconButton className={`square ${props.winner}`} onClick={props.onClick}>
  //     <Zoom in={props.checked}>
  //       <DeleteIcon />
  //     </Zoom>
  //   </IconButton>
  // );

  return (
    // <button className={classNames} onClick={props.onClick}>
    //   {props.value}
    // </button>
    <IconButton
      sx={{ pd: 1, borderRadius: 0 }}
      className={`square ${props.winner} ${props.last}`}
      onClick={props.onClick}
      disableFocusRipple
    >
      {props.value === "O" && (
        <Zoom in>
          <RadioButtonUncheckedIcon sx={{ color: "#1976d2" }} />
        </Zoom>
      )}
      {props.value === "X" && (
        <Zoom in>
          <CloseIcon sx={{ color: "#f94449" }} />
        </Zoom>
      )}
    </IconButton>
  );
};

export default Square;

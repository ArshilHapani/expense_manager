import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import useStyles from "./styles";
const SnackBar = ({open,setOpen,severity,message}) => {
  const classes = useStyles();
  const handleClose = (event,reason)=>{
    if(reason === 'clickaway') return;
    setOpen(false);
  }
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <MuiAlert onClose={handleClose} severity={severity} elevation={6} variant='filled'>
            {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default SnackBar;

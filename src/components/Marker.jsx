import React, { useState } from "react";
import { MarkerStyle } from "./MarkerStyle.js";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { FaInstagram } from "react-icons/fa";
import DeleteData from "./DeleteData.jsx";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    flexGrow: 1,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const Marker = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div style={MarkerStyle} onClick={handleClickOpen}></div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          ショップ情報
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>店名：{props.name}</Typography>
          <Typography gutterBottom>テイスト：{props.taste}</Typography>
          <Typography gutterBottom>登録者：{props.user}</Typography>
          <Typography gutterBottom>
            <a href={props.insta}>
              <FaInstagram size={35} />
            </a>
          </Typography>
          <DeleteData targetShop={props.name} targetUser={props.user} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marker;

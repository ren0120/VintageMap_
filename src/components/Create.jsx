import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useAuthContext } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Create = (props) => {
  const classes = useStyles();
  const firestoreDB = getFirestore();

  // フォームの入力欄をセット
  const [name, setName] = useState("");
  const [taste, setTaste] = useState("");
  const [insta, setInsta] = useState(null);

  const [open, setOpen] = useState(false);

  const { user } = useAuthContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickAdd = async () => {
    if (name == null || name == "") {
      alert("店名は必須です。");
    } else if (props.selectLat == null || props.selectLat == "") {
      alert("地図をクリックして座標を選択してください。");
    } else if (props.selectLng == null || props.selectLng == "") {
      alert("地図をクリックして座標を選択してください。");
    } else {
      try {
        const userDocumentRef = doc(firestoreDB, "vintage-map", name);
        const documentRef = await setDoc(userDocumentRef, {
          lat: props.selectLat,
          lng: props.selectLng,
          name: name,
          taste: taste,
          insta: insta,
          user: user.email,
        });
        alert("登録しました。");
        setOpen(false);
        setName("");
        setTaste("");
        setInsta("");
        setInsta(null);
      } catch (e) {
        alert("登録に失敗しました。");
      }
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Input placeholder="lat" value={props.selectLat || ""} disabled />
      <Input placeholder="lng" value={props.selectLng || ""} disabled />
      <Input
        placeholder="店名"
        onChange={(event) => setName(event.target.value)}
        value={name || ""}
      />
      <Input
        placeholder="テイスト"
        onChange={(event) => setTaste(event.target.value)}
        value={taste || ""}
      />
      <Input
        placeholder="Instagram URL"
        onChange={(event) => setInsta(event.target.value)}
        value={insta || ""}
      />
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        ショップ登録
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"ショップ登録"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            選択した座標にショップを登録しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={onClickAdd} color="primary" autoFocus>
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default Create;

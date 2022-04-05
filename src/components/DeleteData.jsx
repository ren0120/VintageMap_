import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";

const DeleteData = (props) => {
  const [open, setOpen] = useState(false);
  const firestoreDB = getFirestore();

  const { user } = useAuthContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteShop = async (id, deleteUser) => {
    if (deleteUser == user.email) {
      try {
        const userDocumentRef = doc(firestoreDB, "vintage-map", id);
        console.log(userDocumentRef);

        await deleteDoc(userDocumentRef);
        alert("削除しました");
        setOpen(false);
      } catch (e) {
        alert("登録に失敗しました。");
      }
    } else {
      alert("登録者のみ削除できます。");
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        削除
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"ショップ削除"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.targetShop}
            を削除しますがよろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button
            onClick={() => deleteShop(props.targetShop, props.targetUser)}
            color="primary"
            autoFocus
          >
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteData;

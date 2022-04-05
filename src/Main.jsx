import React from "react";
import { db, auth } from "./firebase/index";
import Maps from "./components/SimpleMap";
import "./style/index.css";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0),
  },
}));

function Main() {
  const classes = useStyles();

  const navigate = useNavigate();
  const { user } = useAuthContext();
  const userEmail = user.email;
  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <AuthProvider>
        <div className="c-section">
          <div className="c-box">
            <h1>Vintage Map</h1>
            <h2 style={{ fontSize: 16 }}>ログイン中：{userEmail}</h2>
            <Button
              onClick={handleLogout}
              color="primary"
              variant="outlined"
              className={classes.button}
            >
              ログアウト
            </Button>
            <Maps />
          </div>
        </div>
      </AuthProvider>
    );
  }
}
export default Main;

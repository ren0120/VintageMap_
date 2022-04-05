import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import "../style/index.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 350,
    },
  },
}));

const Login = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await auth.signInWithEmailAndPassword(email.value, password.value);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="c-box">
      <h1>Vintage Map ログイン</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField label="メールアドレス" name="email" type="email" />
        </div>
        <div>
          <TextField label="パスワード" name="password" type="password" />
        </div>
        <Button variant="contained" color="primary" type="submit">
          ログイン
        </Button>
        <div>
          ユーザ登録は
          <Link to={"/signup"}>
            <Button color="primary">こちら</Button>
          </Link>
          から
        </div>
      </form>
    </div>
  );
};

export default Login;

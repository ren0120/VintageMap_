import { useState } from "react";
import { auth } from "../firebase/index";
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
const SignUp = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await auth.createUserWithEmailAndPassword(email.value, password.value);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="c-box">
      <h1>Vintage Map ユーザ登録</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            label="メールアドレス"
            name="email"
            type="email"
            placeholder="メールアドレスの形式"
          />
        </div>
        <div>
          <TextField
            label="パスワード"
            name="password"
            type="password"
            placeholder="6文字以上"
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          登録
        </Button>
        <div>
          ユーザ登録済の場合は
          <Link to={"/login"}>
            <Button color="primary">こちら</Button>
          </Link>
          から
        </div>
      </form>
    </div>
  );
};

export default SignUp;

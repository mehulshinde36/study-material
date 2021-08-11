import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Login.css";

function Login() {
  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const history = useHistory();

  //useEffect
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        history.push("/dashboard");
      } else {
        history.push("/");
      }
    });
  }, []);

  //functions
  const loginUser = () => {
    setLoader(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setLoader(false);
        history.push("/dashboard");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login_form-container">
        <div className="login_heading-text">
          <label>Login</label>
        </div>
        {/* Email input field  */}
        <div className="login_email-field">
          <TextField
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
          />
        </div>

        {/* Password input field  */}
        <div className="login_password-field">
          <TextField
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
          />
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            history.push("/register");
          }}
          className="login_register-text"
        >
          Don't have a account ? Register
        </div>
        {/* Login Button */}
        <div className="login_login-btn">
          <Button onClick={loginUser} variant="contained" color="primary">
            Login
            {loader ? (
              <>
                <div
                  style={{
                    marginLeft: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress color="inherit" size={15} />
                </div>
              </>
            ) : (
              <></>
            )}
          </Button>
          <Button
            onClick={(e) => {
              history.push("/login");
            }}
            variant="contained"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;

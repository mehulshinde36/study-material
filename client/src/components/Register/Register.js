import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUser } from "../../actions/user";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Register.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

function Register() {
  //state
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phno: "",
    firebaseObj: null,
  });
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  //useEffect

  //functions
  const registerUser = (e) => {
    e.preventDefault();
    if (validateUser()) {
      //firebase authentication, creating user
      setLoader(true);
      auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Logged in
          var loggedInUser = userCredential.user;
          user.firebaseObj = loggedInUser;
          auth.signOut();
          dispatch(createUser(user)).then(() => {
            setLoader(false);
            alert("Account Created Successfully!!");
            history.push("/login");
          });
        })
        .catch((error) => {});
    } else {
      alert("Fields are empty !!");
    }
  };

  const validateUser = () => {
    if (
      user.name !== "" &&
      user.email !== "" &&
      user.password !== "" &&
      user.phno !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="register">
      <div className="register_form-container">
        <div className="register_heading-text">
          <label>Register</label>
        </div>
        {/* Name input field  */}
        <div className="register_name-field">
          <TextField
            onChange={(e) =>
              setUser({
                ...user,
                name: e.target.value,
              })
            }
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            value={user.name}
          />
        </div>
        {/* Email input field  */}
        <div className="register_email-field">
          <TextField
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={user.email}
          />
        </div>
        {/* Phone Number input field  */}
        <div className="register_phno-field">
          <TextField
            onChange={(e) =>
              setUser({
                ...user,
                phno: e.target.value,
              })
            }
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            fullWidth
            type="number"
            value={user.phno}
          />
        </div>
        {/* Password input field  */}
        <div className="register_password-field">
          <TextField
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={user.password}
          />
        </div>
        {/* Register Button */}
        <div className="register_register-btn">
          <Button onClick={registerUser} variant="contained" color="primary">
            Register
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
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Register;

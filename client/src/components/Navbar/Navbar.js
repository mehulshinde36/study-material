import React from "react";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./Navbar.css";

function Navbar({ pageName = "dashboard" }) {
  //states
  const history = useHistory();

  //functions
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const backToHome = () => {
    history.push("/dashboard");
  };

  return (
    <div className="navbar_container">
      <div>
        {pageName === "studyMaterial" ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              backToHome();
            }}
            variant="contained"
          >
            Home
          </Button>
        ) : (
          <label>Study Materials</label>
        )}
      </div>
      <div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
          variant="contained"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Navbar;

import "./Navbar.scss";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logOut, user } = useAuth();
  const handleLogout = () => {
    logOut().then(() => navigate("/login"));
  };
  useEffect(() => {
    !user && logOut();
  }, [handleLogout]);

  const navigate = useNavigate();

  return (
    <div
      className=" navbar"
      style={{
        display: "flex",
        width: "100%",
        position: "sticky",
        top: "0",
        backgroundColor: "white",
        zIndex: 20,
      }}
    >
      <div className="container" style={{ width: "35%" }}>
        <FacebookOutlinedIcon style={{ fontSize: 50, color: "#0866ff" }} />
      </div>

      <div
        className="container"
        style={{ width: "35%", display: "flex", justifyContent: "flex-end" }}
      >
        <div className="dropdown">
          <a
            className="btn btn-secondary dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <AccountCircleOutlinedIcon />
          </a>

          <ul className="dropdown-menu">
            <li onClick={handleLogout}>Log out</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

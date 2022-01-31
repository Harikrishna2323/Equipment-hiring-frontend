import React from "react";
import { isAuth, logout } from "../helpers/helpers";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "antd";
import Fade from "react-reveal/Fade";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useSelector } from "react-redux";

const DefaultLayout = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const navigate = useNavigate();
  return (
    <div>
      <div className="header">
        <div className="d-flex justify-content-between bs1 background-azure">
          <div className="left">
            <Fade left>
              <Link to="/">
                <h1 className="flex-1">HKB Rentals</h1>
              </Link>
            </Fade>
          </div>
          <div className="right">
            <Fade right>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                      <h1>{isAuth().username}</h1>
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      {user.role === "admin" && (
                        <Link to="/admin" style={{ color: "black" }}>
                          <MenuItem onClick={popupState.close}>Admin</MenuItem>
                        </Link>
                      )}

                      <Link to="/user-bookings" style={{ color: "black" }}>
                        <MenuItem onClick={popupState.close}>
                          My Bookings
                        </MenuItem>
                      </Link>
                      <MenuItem
                        onClick={() => {
                          logout(() => {
                            navigate("/login");
                          });
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
              {isAuth() ? (
                <></>
              ) : (
                <div className="d-flex">
                  <Link to="/register">
                    <h1 className="flex-0.5">Register</h1>
                  </Link>

                  <Link to="/login">
                    <h1>Login</h1>
                  </Link>
                </div>
              )}
            </Fade>
          </div>
        </div>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;

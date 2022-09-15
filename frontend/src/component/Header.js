import React from "react";
import "./css/Header.css";
import logo from "../image/logo.png";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";

const Header = () => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  const logOut = async () => {
    await logout();
    console.log("You are log out");
  };

  const logIn = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then((user) => {
          console.log("logged in user:", user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const buttonController = () => {
    if (isAuthenticated) {
      return (
        <div className="right-header">
          <p className="address">
            {user.get("ethAddress").slice(0, 8) + "..."}
          </p>
          <button className="connectButton" onClick={logOut}>
            <p>Log Out</p>
          </button>
        </div>
      );
    } else {
      return (
        <div className="right-header">
          <button className="connectButton" onClick={logIn}>
            <p>Connect Wallet</p>
          </button>
        </div>
      );
    }
  };

  return (
    <header>
      <div className="left-header">
        <Link className="link" to="/">
          <img src={logo} className="logo"></img>
        </Link>
        <Link className="link" to="/mint">
          Mint
        </Link>
        <Link className="link" to="/market">
          <p>Market</p>
        </Link>
        <Link className="link" to="/collection">
          <p>Collection</p>
        </Link>
        <Link className="link" to="/market">
          <p>Learn</p>
        </Link>
        <Link className="link" to="/about">
          <p>About</p>
        </Link>
      </div>
      {buttonController()}
    </header>
  );
};
export default Header;

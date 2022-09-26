import React from "react";
import "./css/Header.css";
import logo from "../image/logo.png";
import coin from "../image/coin.png";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'

const Header = () => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const [coinAmount,setCoin] = useState();

  const GetUserCoin = async()=>{
    await axios({
      method: 'GET',
      url: `http://localhost:8001/database/GetCoinAmount/${user.get("ethAddress")}`,
    }).then((response) => {
      if(response.data !== "error") setCoin(response.data);
    }).catch((error) => alert(error));
  }
  
  useEffect(() => {
    if(isAuthenticated)
    {
      GetUserCoin();
    }
  }, [isAuthenticated]);

  const InsertNewData = async (_objectid)=>{
    await axios({
      method: 'POST',
      url: 'http://localhost:8001/database/insertNewUser',
      data:
      {
        id:_objectid
      }
    }).then((response) => {
      console.log(response.data)
    }).catch((error) => console.log(error));
  }


  const logOut = async () => {
    await logout();
    console.log("You are log out");
  };

  const logIn = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then((user) => {
          console.log("logged in user:", user);
          InsertNewData(user.id);
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
          <div className="coinRemain">
            <img src={coin} className="logo"></img>
            <div className="textArea">
              <p>{coinAmount}</p>
            </div>
          </div>
          <div>
            <p className="address">
              {user.get("ethAddress").slice(0, 5) + "..." + user.get("ethAddress").slice(38)}
            </p>
          </div>
          <div>
            <button className="connectButton" onClick={logOut}>
              <p>Log Out</p>
            </button>
          </div>
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
        <Link className="link" to="/setting">
          <p>Setting</p>
        </Link>
      </div>
      {buttonController()}
    </header>
  );
};
export default Header;

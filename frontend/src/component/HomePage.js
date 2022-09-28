import React, { useState, useEffect } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import Popup from "./Popup.js"
import Moralis from "moralis";
import "./css/HomePage.css";
import { Button } from 'semantic-ui-react';

const Homepage = () => {
  const { isAuthenticated, user } = useMoralis();

  const Web3Api = useMoralisWeb3Api();

  const [balance, setBalance] = useState("");
  const [name, setName] = useState("");
  const [dailyCoinOpen, setDailyCoinOpen] = useState(true);  // daily coin useState
  const [contact, setContact] = useState(false);

  const enableWeb3 = async () => {
    await Moralis.enableWeb3();
  };

  const updateName = async () => {
    const _User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(_User);
    query.equalTo("objectId", user.id);
    const results = await query.find({ useMasterKey: true });

    results[0].set("name", name);
    results[0]
      .save()
      .then(() => {
        alert("Update success, please refresh the website to look");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // check if need to open daily coin
  const openDailyCoin = async () => {
    // ...
    setDailyCoinOpen(true);
  }

  const getBalance = () => {
    const options = {
      chain: "mumbai",
    };
    Web3Api.account.getNativeBalance(options).then((matic) => {
      matic = Moralis.Units.FromWei(matic.balance, 18);

      setBalance(matic.slice(0, 5));
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      getBalance();

      enableWeb3();
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return (
      <div className="homePage">
        { console.log(dailyCoinOpen) }
        <Button onClick={ () => {openDailyCoin();}}>open daily coin page</Button>
        {dailyCoinOpen && <Popup mode="dailyCoin" setPopupOpen={setDailyCoinOpen} />}
        <Button color="red" onClick={() => {setContact(true)}}>Report</Button>
        {contact && <Popup mode="contact" setPopupOpen={setContact} />}
      </div>
    );
  }
  return (
    <div className="unconnectedPage">
      <h1>Please connect your wallet</h1>
    </div>
  );
};

export default Homepage;



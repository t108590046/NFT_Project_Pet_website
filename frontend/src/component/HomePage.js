import React, { useState, useEffect } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import Popup from "./Popup.js"
import Moralis from "moralis";
import "./css/HomePage.css";
import { Button, Icon } from 'semantic-ui-react';

const Homepage = () => {
  const { isAuthenticated, user } = useMoralis();

  const Web3Api = useMoralisWeb3Api();

  const [balance, setBalance] = useState("");
  const [name, setName] = useState("");
  const [dailyCoinOpen, setDailyCoinOpen] = useState(false);  // daily coin useState
  const [contact, setContact] = useState(false); //contact page controll

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
        {dailyCoinOpen && <Popup mode="dailyCoin" setPopupOpen={setDailyCoinOpen} />}
        <div className="homepageBtn">
          <Button primary size="huge" animated='fade' onClick={ () => {openDailyCoin();}}>
            <Button.Content visible>Daily Check In</Button.Content>
            <Button.Content hidden><Icon size="large" name="checked calendar"/></Button.Content>
          </Button>
          <Button secondary size="huge" animated='fade' color="red" onClick={() => {setContact(true)}}>
            <Button.Content visible>Contact US</Button.Content>
            <Button.Content hidden><Icon size="large" name="send"/></Button.Content>
          </Button>
        </div>
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



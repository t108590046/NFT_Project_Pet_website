import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import "./css/Main.css";
import "./css/Mint.css";

import unknownPet from "./../image/pet.png";
import unknownComponent from "./../image/hat_large.png";
import Modal from "./Modal.js";
import Popup from "./Popup.js"

const Mint = () => {
  const { Moralis } = useMoralis();

  const [openModal, setOpenModal] = useState(false);
  const [text, setText] = useState("");
  const [PetNameTitle,setPetNameTitle] = useState("");
  const [popupOpen, setPopupOpen] = useState(false); //判斷Popup是否開啟
  const [mintType, setMintType] = useState("角色");

  const enableWeb3 = async () => {
    await Moralis.enableWeb3();
  };

  useEffect(() => {
    enableWeb3();
  }, []);

  return (
    <div className="box">
      <section className="mintArea">
        <div className="token">
          <img src={unknownPet} alt="Loading" />
          <h1>Mint Your Pet</h1>
          <button
            className="mintButton"
            onClick={() => {
              setText("Input token ID");
              setPetNameTitle("Pet Name");
              setOpenModal(true);
              //setPopupOpen(true);
              //setMintType("角色");
            }}
          >
            Mint
          </button>
        </div>
          
        {popupOpen && < Popup mode="mint" mintType={mintType} setPopupOpen={setPopupOpen} />}

        <div className="component">
          <img src={unknownComponent} alt="Loading" />
          <h1>Mint Your Component</h1>
          <button
            className="mintButton"
            onClick={() => {
              setText("Input component ID");
              setOpenModal(true);
              //setPopupOpen(true);
              //setMintType("裝備");
            }}
          >
            Mint
          </button>
        </div>
      </section>
      {openModal && <Modal trigger={setOpenModal} content={text} PNtitle={PetNameTitle} />}
    </div>
  );
};

export default Mint;

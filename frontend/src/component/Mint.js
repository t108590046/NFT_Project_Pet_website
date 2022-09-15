import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import background from "./../image/background.png";
import "./css/Mint.css";

import unknownPet from "./../image/pet.png";
import unknownComponent from "./../image/hat_large.png";
import Modal from "./Modal.js";

const Mint = () => {
  const { Moralis } = useMoralis();

  const [openModal, setOpenModal] = useState(false);
  const [text, setText] = useState("");
  const [PetNameTitle,setPetNameTitle] = useState("");

  const enableWeb3 = async () => {
    await Moralis.enableWeb3();
  };

  useEffect(() => {
    enableWeb3();
  }, []);

  return (
    <div className="box">
      <img
        className="background"
        src={background}
        alt="This is background image"
      />
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
            }}
          >
            <p>Mint</p>
          </button>
        </div>

        <div className="component">
          <img src={unknownComponent} alt="Loading" />
          <h1>Mint Your Component</h1>
          <button
            className="mintButton"
            onClick={() => {
              setText("Input component ID");
              setOpenModal(true);
            }}
          >
            <p>Mint</p>
          </button>
        </div>
      </section>
      {openModal && <Modal trigger={setOpenModal} content={text} PNtitle={PetNameTitle} />}
    </div>
  );
};

export default Mint;

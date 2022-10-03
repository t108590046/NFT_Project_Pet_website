import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Component_mint_ABI, contractAddress_Cloth, contractAddress_Pant, contractAddress_Glasses, contractAddress_Pet, contractAddress_Hat, contractAddress_Hand, mint_ABI_Pet } from "../abi/pet"
import "./css/Main.css";
import "./css/Mint.css";
import { useWeb3ExecuteFunction } from "react-moralis";
import unknownPet from "./../image/pet.png";
import unknownComponent from "./../image/hat_large.png";
import Modal from "./Modal.js";
import Popup from "./Popup.js"

const Mint = () => {
  const { Moralis } = useMoralis();
  const contract_List = [contractAddress_Hat, contractAddress_Hand, contractAddress_Glasses, contractAddress_Pant, contractAddress_Cloth];
  const contract_Name = ["Hat","Hand" , "Glasses","Pant" ,"Cloth" ];
  const [openModal, setOpenModal] = useState(false);
  const contractProcessor = useWeb3ExecuteFunction();
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

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const mint = async (_type) => {

    if (_type === "角色") {
      let options = {
        contractAddress: contractAddress_Pet,
        functionName: "mint",
        abi: [mint_ABI_Pet],
        params: {
        },
        msgValue: Moralis.Units.ETH(0.005),
      };

      await contractProcessor.fetch({
        params: options,
        onSuccess: () => {
          alert("Succesful Mint");
        },
        onError: (error) => {
          console.log(error)
          alert("Error:" + error.message);
        },
      });
    }
    else{
      var random = getRandomInt(5);
      let options = {
        contractAddress: contract_List[random],
        functionName: "mint",
        abi: [Component_mint_ABI],
        params: {
        },
      };

      await contractProcessor.fetch({
        params: options,
        onSuccess: () => {
          alert(`Succesful Mint : ${contract_Name[random]}`,);
        },
        onError: (error) => {
          console.log(error)
          alert("Error:" + error.message);
        },
      });
    }

  };

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
              //setOpenModal(true);
              setPopupOpen(true);
              setMintType("角色");
            }}
          >
            Mint
          </button>
        </div>
          
        {popupOpen && < Popup mode="mint" mintType={mintType} setPopupOpen={setPopupOpen} mint_function={mint}/>}

        <div className="component">
          <img src={unknownComponent} alt="Loading" />
          <h1>Mint Your Component</h1>
          <button
            className="mintButton"
            onClick={() => {
              setText("Get a Random Component");
              //setOpenModal(true);
              setPopupOpen(true);
              setMintType("裝備");
            }}
          >
            Mint
          </button>
        </div>
      </section>
      {/*openModal && <Modal trigger={setOpenModal} content={text} PNtitle={PetNameTitle} mintType={mintType}/>*/}
    </div>
  );
};

export default Mint;

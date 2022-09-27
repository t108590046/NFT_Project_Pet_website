import React, { useState, useEffect } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useMoralis } from "react-moralis";
import { Component_mint_ABI, contractAddress_Cloth, contractAddress_Pant, contractAddress_Glasses, contractAddress_Pet, contractAddress_Hat, contractAddress_Hand, mint_ABI_Pet } from "../abi/pet"
import "./css/Modal.css";
import axios from 'axios';
import Popup from "./Popup.js"

function Modal({ trigger, content, PNtitle, mintType }) {
  const { Moralis } = useMoralis();
  const { user } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const [tokenId, setTokenId] = useState();
  const [PetName, setPetName] = useState();
  const contract_List = [contractAddress_Hat, contractAddress_Hand, contractAddress_Glasses, contractAddress_Pant, contractAddress_Cloth];
  const contract_Name = ["Hat","Hand" , "Glasses","Pant" ,"Cloth" ];
  const [popupOpen, setPopupOpen] = useState(false); //判斷Popup是否開啟

  const InsertNewPetToDatabase = async (_tokenId) => {
    await axios({
      method: 'POST',
      url: 'http://localhost:8001/database/insertNewPet',
      data:
      {
        Name: PetName,
        TokenID: _tokenId,
      }
    }).then((response) => {
      console.log(response.data);
    })
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const mint = async (_tokenId, _type) => {

    if (_type === "角色") {
      let options = {
        contractAddress: contractAddress_Pet,
        functionName: "mint",
        abi: [mint_ABI_Pet],
        params: {
          tokenId: _tokenId,
        },
        msgValue: Moralis.Units.ETH(0.005),
      };

      await contractProcessor.fetch({
        params: options,
        onSuccess: () => {
          InsertNewPetToDatabase(_tokenId);
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

  const ShowMint = (_type) => {
    if (_type === "角色") {
      return (
        <div className="modalInput">
          <h1>{content}</h1>
          <input onChange={(e) => setTokenId(e.target.value)}></input>
          <h1>{PNtitle}</h1>
          <input onChange={(e) => setPetName(e.target.value)}></input>
        </div>
      )
    }
    else if (_type === "裝備") {
      return (
        <div className="modalInput">
          <h1>{content}</h1>
        </div>
      )
    }
  }

  return (
    <div className="backdrop">
      <article className="modalAlign">
        <section className="modalContent">
          <div className="titleClose">
            <button onClick={() => trigger(false)}>X</button>
          </div>
          {ShowMint(mintType)}
          <div className="modalFooter">
            <button onClick={() => { setPopupOpen(true) }}>
              <p>Confirm</p>
            </button>
          </div>
        </section>
      </article>
      {popupOpen && < Popup mode="mint" mintType={mintType} setPopupOpen={setPopupOpen} mint_function={mint} mint_tokenID={tokenId} />}
    </div>
  );
}

export default Modal;

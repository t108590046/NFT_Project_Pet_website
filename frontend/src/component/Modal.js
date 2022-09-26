import React, { useState,useEffect } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useMoralis } from "react-moralis";
import {contractAddress_Pet, mint_ABI_Pet, tokenURI_ABI_Pet} from "../abi/pet"
import "./css/Modal.css";
import axios from 'axios';
import Popup from "./Popup.js"

function Modal({ trigger, content,PNtitle }) {
  const { Moralis } = useMoralis();
  const { user} = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const [tokenId, setTokenId] = useState();
  const [PetName, setPetName] = useState();

  const [popupOpen, setPopupOpen] = useState(false); //判斷Popup是否開啟
  const [mintType, setMintType] = useState("角色");

  const InsertNewPetToDatabase = async(_tokenId)=>
  {
    await axios({
      method: 'POST',
      url: 'http://localhost:8001/database/insertNewPet',
      data:
      {
        Name:PetName,
        Owner:user.get("ethAddress"),
        TokenID:_tokenId,
      }
    }).then((response) => {
      console.log(response.data);
    })
  }

  const mint = async (_tokenId) => {

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

  };

  return (
    <div className="backdrop">
      <article className="modalAlign">
        <section className="modalContent">
          <div className="titleClose">
            <button onClick={() => trigger(false)}>X</button>
          </div>
          <div className="modalInput">
            <h1>{content}</h1>
            <input onChange={(e) => setTokenId(e.target.value)}></input>
            <h1>{PNtitle}</h1>
            <input onChange={(e) => setPetName(e.target.value)}></input>
          </div>
          <div className="modalFooter">
            <button onClick={() => {setPopupOpen(true)}}>
              <p>Confirm</p>
            </button>
          </div>
        </section>
      </article>
      {popupOpen && < Popup mode="mint" mintType={mintType} setPopupOpen={setPopupOpen} mint_function={mint} mint_tokenID={tokenId}/>}
    </div>
  );
}

export default Modal;

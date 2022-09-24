import React, { useState,useEffect } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useMoralis } from "react-moralis";
import {contractAddress_Pet, mint_ABI_Pet, tokenURI_ABI_Pet} from "../abi/pet"
import "./css/Modal.css";
import axios from 'axios';

function Modal({ trigger, content,PNtitle }) {
  const { Moralis } = useMoralis();
  const { user} = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const [tokenId, setTokenId] = useState();
  const [PetName, setPetName] = useState();

  const InsertNewPetToDatabase = async(_tokenId, _URI)=>
  {
    axios({
      method: 'POST',
      url: 'http://localhost:8001/database/insertNewPet',
      data:
      {
        Name:PetName,
        Owner:user.get("ethAddress"),
        TokenID:_tokenId,
        MetadataURI:_URI
      }
    }).then((response) => {
      console.log(response.data);
    })
  }

  const GetMetadata = async (_id) => {
    let options = {
      contractAddress: contractAddress_Pet,
      functionName: "tokenURI",
      abi: [tokenURI_ABI_Pet],
      params: {
        tokenId: _id
      },
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: (response) => {
        InsertNewPetToDatabase(_id, response);
      },
      onError: (error) => {
        console.log(error);
      },
    });
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
        GetMetadata(_tokenId);
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
            <button onClick={() => mint(tokenId)}>
              <p>Confirm</p>
            </button>
          </div>
        </section>
      </article>
    </div>
  );
}

export default Modal;

import React, { useState } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useMoralis } from "react-moralis";
import { mint_ABI, contractAddress } from "../abi/abi";
import { mint_ABI_test, contractAddress_test,act_ABI } from "../abi/testabi";
import "./css/Modal.css";
import axios from 'axios';

function Modal({ trigger, content,PNtitle }) {
  const { Moralis } = useMoralis();
  const { user} = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const [tokenId, setTokenId] = useState();
  const [PetName, setPetName] = useState();

  const InsertNewPetToDatabase = async(_tokenId)=>
  {
    axios({
      method: 'POST',
      url: 'http://localhost:8001/database/insertNewPet',
      data:
      {
        Name:PetName,
        Owner:user.get("ethAddress"),
        TokenID:_tokenId
      }
    }).then((response) => {
      console.log(response.data);
    })
  }

  const open = async () => {

    let options = {
      contractAddress: contractAddress_test,
      functionName: "setIsActive",
      abi: [act_ABI],
      params: {
        status: true,
        newURI:''
      },
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        alert("Succesful");
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  };

  const mint = async (_tokenId) => {
    /*
    let options = {
      contractAddress: contractAddress,
      functionName: "mint",
      abi: [mint_ABI],
      params: {
        tokenId: _tokenId,
      },
      msgValue: Moralis.Units.ETH(0.005),
    };
    */

    let options = {
      contractAddress: contractAddress_test,
      functionName: "mint",
      abi: [mint_ABI_test],
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
            <button onClick={() => mint(tokenId)}>
              <p>Confirm</p>
            </button>
            <button onClick={() => open()}>open</button>
          </div>
        </section>
      </article>
    </div>
  );
}

export default Modal;

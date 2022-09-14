import React, { useState } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useMoralis } from "react-moralis";
import { mint_ABI, contractAddress } from "../abi/abi";
import "./css/Modal.css";

function Modal({ trigger, content }) {
  const { Moralis } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const [tokenId, setTokenId] = useState();

  const mint = async (_tokenId) => {
    let options = {
      contractAddress: contractAddress,
      functionName: "mint",
      abi: [mint_ABI],
      params: {
        tokenId: _tokenId,
      },
      msgValue: Moralis.Units.ETH(0.005),
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        alert("Succesful Mint");
      },
      onError: (error) => {
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

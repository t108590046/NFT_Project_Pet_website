import React, { useState, useEffect } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useMoralis } from "react-moralis";
import "./css/Modal.css";
import axios from 'axios';
import Popup from "./Popup.js"

function Modal({ trigger, content, PNtitle, mintType }) {
  const { Moralis } = useMoralis();
  const { user } = useMoralis();
  const [tokenId, setTokenId] = useState();
  const [PetName, setPetName] = useState();
  const [popupOpen, setPopupOpen] = useState(false); //判斷Popup是否開啟

  

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
    </div>
  );
}

export default Modal;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MockToken from "../image/MockToken.png";
import background from "../image/background.png";
import Meat from "../image/meat.png";
import "./css/Operate.css";

const Operate = ({trigger}) => {
  let { id } = useParams();
  return (
        
        <div className="infoText">
          <button onClick={() => trigger(false)}>&lt;一</button>
          <div className="tabs">
            <input type="radio" id="item" name="tabs" checked="checked" />
            <label for="item">ITEM</label>
            <div className="tabsContent">
              <section className="itemList">
                <div className="itemInfo">
                  <img src={Meat}></img>
                  <p>X</p>
                  <p>4</p>
                </div>
                <div className="itemInfo">
                  <img src={Meat}></img>
                  <p>X</p>
                  <p>4</p>
                </div>
              </section>
            </div>
            <input type="radio" name="tabs" id="component" />
            <label for="component">COMPONENT</label>
            <div className="tabsContent">
              <section className="itemList"></section>
            </div>
          </div>
        </div>
  );
};

export default Operate;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MockToken from "../image/MockToken.png";
import background from "../image/background.png";
import Meat from "../image/meat.png";
import "./css/Operate.css";

const Operate = () => {
  let { id } = useParams();
  return (
    <div className="box">
      <img
        className="background"
        src={background}
        alt="This is background image"
      />
      <section className="infoContainer">
        <div className="infoImage">
          <img src={MockToken} />
        </div>
        <div className="infoText">
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
      </section>
    </div>
  );
};

export default Operate;

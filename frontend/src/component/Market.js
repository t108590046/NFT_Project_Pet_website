import React from "react";
import { useState } from "react";
import "./css/Main.css";
import "./css/Market.css";
import Meat from "../image/meat.png";
import Popup from "./Popup.js"


const Market = () => {

	const [popupOpen, setPopupOpen] = useState(false); //判斷Popup是否開啟
	const [itemName, setItemName] = useState("default"); //物品名稱(傳給Popup用)
	const [itemDescription, setItemDescription] = useState("default"); //物品功效(傳給Popup用)

  	return(
		<div className="box">
			<div className="marketArea">
				<div className="title">
					<h1 className="heading"> Shop </h1>
				</div>
				{popupOpen && < Popup itemDescription = {itemDescription} itemName = {itemName}  setPopupOpen = {setPopupOpen} />} 
				<div className="market-box-container">
					<div className="market-box">
						<img src={Meat} alt="meat in market"></img>
						<h3>好吃的肉</h3>
						<p>親密度+1 飽足度+5</p>
						<button className="market-btn" onClick={() => {setItemDescription("親密度+1 飽足度+5"); setItemName("好吃的肉"); setPopupOpen(true);}}>
							Buy
						</button>
					</div>

					<div className="market-box">
						<img src={Meat} alt="meat in market"></img>
						<h3>普通的肉</h3>
						<p> 飽足度+3</p>
						<button className="market-btn" onClick={() => {setItemDescription("飽足度+3"); setItemName("普通的肉"); setPopupOpen(true);}}>
							Buy
						</button>
					</div>

					<div className="market-box">
						<img src={Meat} alt="meat in market"></img>
						<h3>難吃的肉</h3>
						<p>親密度-1 飽足度+2</p>
						<button className="market-btn" onClick={() => {setItemDescription("親密度-1 飽足度+2"); setItemName("難吃的肉"); setPopupOpen(true);}}>
							Buy
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Market;

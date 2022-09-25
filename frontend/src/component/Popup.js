import React from "react";
import "./css/Popup.css";
import { useState } from "react";
import axios from 'axios'
import { useMoralis } from "react-moralis";

function Popup({mode, mintType, itemDescription, itemName, setPopupOpen,foodtype}) {
    const {user,isAuthenticated,authenticate} = useMoralis();
    const [currentNum, setcurrentNum] = useState(1); //購買數量

    const BuyFood = async () => {
        if(isAuthenticated)
        {
            await axios({
                method: 'POST',
                url: 'http://localhost:8001/database/BuyFood',
                data:
                {
                  Owner:user.get("ethAddress"),
                  FoodType: foodtype,
                  Amount: currentNum
                }
              }).then((response) => {
                alert(response.data)
                window.location.reload();
              }).catch((error) => console.log(error));
        }
		else
        {
            authenticate();
        }
	}
    
    if(mode === "market"){
        return (
            <div className="popupContainer">
                
                <div className="popupTitle">
                    <h1>確認購買</h1>
                </div>
                
                <div className="body">
                    <h2>產品名稱:{itemName}</h2>
                    <h3 className="description">產品功能:{itemDescription}</h3>
                </div>

                <div className="numSelctContainer">
                    <div className="numSelect">
                        <span class="minus" onClick={() => {if(currentNum>1){setcurrentNum(currentNum-1);}}}>-</span>
                        <span class="num">{currentNum}</span>
                        <span class="plus" onClick={() => {setcurrentNum(currentNum+1);}}>+</span>
                    </div>
                </div>

                <div className="footer">
                    <button
                    onClick={() => {
                        setPopupOpen(false);
                    }}
                    id="cancelBtn"
                    >
                    Cancel
                    </button>
                    <button onClick={()=>{BuyFood()}}>Confirm</button>
                </div>
            </div>
        );
    }

    if(mode === "mint"){
        return (
            <div className="popupContainer">
                
                <div className="popupTitle">
                    <h1>Mint confirm</h1>
                </div>
                
                <div className="body">
                    <h2>確定要mint{mintType}嗎?</h2>
                </div>

                <div className="footer">
                    <button
                    onClick={() => {
                        setPopupOpen(false);
                    }}
                    id="cancelBtn"
                    >
                    Cancel
                    </button>
                    <button onClick={()=>{ }}>Confirm</button>
                </div>
            </div>
        );
    }
}

export default Popup;
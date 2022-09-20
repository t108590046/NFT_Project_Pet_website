import React from "react";
import "./css/Popup.css";
import { useState } from "react";

function Popup({itemDescription, itemName, setPopupOpen}) {

    const [currentNum, setcurrentNum] = useState(1); //購買數量
    
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
                <button>Confirm</button>
            </div>
        </div>
    );
}

export default Popup;
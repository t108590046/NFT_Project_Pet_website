import React from "react";
import "./css/Popup.css";
import { useState } from "react";
import axios from 'axios'
import { useMoralis } from "react-moralis";
import { Button, Header, Image, Modal, Checkbox, Form } from 'semantic-ui-react'
import Coin from "../image/coin.png"


function Popup({mode, mintType, itemDescription, itemName, setPopupOpen, foodtype, mint_function, mint_tokenID, continueDay}) {
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
                    <button onClick={()=>{mint_function(mint_tokenID,mintType)}}>Confirm</button>
                </div>
            </div>
        );
    }

    if (mode === "dailyCoin") {
        return (
            <Modal
                onClose={() => setPopupOpen(false)}
                onOpen={() => setPopupOpen(true)}
                open={true}
                className="dailyCoinPage"
            >
                { console.log('here')}
                <Modal.Header>每日登入領金幣</Modal.Header>
                <Modal.Content image>
                    <Image src={Coin} wrapped fluid size="small"/>
                    <Modal.Description>
                        <Header>您已連續領取第{continueDay}天</Header>
                        <p>恭喜你獲得{0}元！</p>
                        <p>記得每天持續領取金幣，<br/>存夠錢幫猴子買食物吃！</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="領取"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => setPopupOpen(false)}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        );
    }

    if(mode == "contact"){
        return(
            <Modal
                onClose={() => setPopupOpen(false)}
                onOpen={() => setPopupOpen(true)}
                open={true}
                className="dailyCoinPage"
            >
                <Modal.Header>Contact US</Modal.Header>
                <Modal.Content image>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>First Name</label>
                                <input placeholder='First Name' />
                            </Form.Field>
                            <Form.Field>
                                <label>Last Name</label>
                                <input placeholder='Last Name' />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                                <label>email</label>
                                <input placeholder='sample@example.com' />
                            </Form.Field>
                        <Form.TextArea label='Feed back' placeholder='' />
                        <Form.Field>
                            <Checkbox label='Send Confirm' />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        color='prey'
                        content="Cancel"
                        labelPosition='right'
                        icon='cancel'
                        onClick={() => setPopupOpen(false)}
                    />
                    <Button
                        content="send"
                        labelPosition='right'
                        icon='send'
                        onClick={() => setPopupOpen(false)}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default Popup;
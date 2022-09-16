import React from 'react';
import "./css/About.css";

const About = () => {
    return (
        <div className = "aboutPage"> 
            <div class="headline">
                <h2>Project Introduction</h2>
            </div>
            <div>
                <p class="title">此專案參考了過去爆紅的番薯寶寶、寶可夢等電子寵物遊戲作為發想，嘗試使用NFT技
                    術製作一款電子寵物遊戲，並增加可以拆併多個NFT的功能，希望加強NFT除了金融操
                    作以外的靈活性跟實用性，使其成為未來元宇宙中虛擬資產的基礎。另外建造一種全
                    新的機制，將想開發NFT生態的人聚集成一個DAO，使得當中有貢獻的人可以獲得一
                    定獎勵，貢獻可以包含開發應用程式，並應用其NFT，讓NFT的使用場景不再單一，能
                    夠運用在不同的應用程式中，如此一來NFT可以更加活用，且「資產的擁有權」才會更
                    有價值。
                </p>
            </div>
            <div class="headline">
                <h2>Our Team</h2>
            </div>
            <div class="row">
                <div class="column">
                    <div class="card">
                        <div class="container">
                            <h2>洪子翔</h2>
                            <p class="title">分工</p>
                            <p>電資學士班(主修資工)</p>
                            <p>eagle2107821078@gmail.com</p>
                            <p><button class="button">Contact</button></p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="container">
                            <h2>洪德易</h2>
                            <p class="title">分工</p>
                            <p>電資學士班(主修資工)</p>
                            <p>xxxx@gmail.com</p>
                            <p><button class="button">Contact</button></p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="container">
                            <h2>李永祺</h2>
                            <p class="title">分工</p>
                            <p>資工系</p>
                            <p>xxxx@gmail.com</p>
                            <p><button class="button">Contact</button></p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="container">
                            <h2>蔡禎誠</h2>
                            <p class="title">分工</p>
                            <p>資工系</p>
                            <p>xxxx@gmail.com</p>
                            <p><button class="button">Contact</button></p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="container">
                            <h2>劉彥麟</h2>
                            <p class="title">分工</p>
                            <p>資工系</p>
                            <p>xxxx@gmail.com</p>
                            <p><button class="button">Contact</button></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default About;

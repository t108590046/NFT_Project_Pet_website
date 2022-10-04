import React from 'react';
import "./css/About.css";
import "./Card.js";
import Pet from "../image/pet.png";
//import mockToken from "../image/mockToken.png";
import tokenSample_0 from "../image/tokenSample_0.png";
import tokenSample_2 from "../image/tokenSample_2.png";
import tokenSample_4 from "../image/tokenSample_4.png";
import tokenSample_9 from "../image/tokenSample_9.png";
import pet_noBackground from "../image/pet_noBackground.png";
import mockToken_noBackground from "../image/mockToken_noBackground.png";
import tokenSample_0_noBackground from "../image/tokenSample_0_noBackground.png";
import tokenSample_4_noBackground from "../image/tokenSample_4_noBackground.png";
import tokenSample_8_noBackground from "../image/tokenSample_8_noBackground.png";
import {Header, Card, Icon, Image, Reveal } from 'semantic-ui-react'



const About = () => {

    function AboutCard({color,name, classes, image, description, work, email}) {
        return(
            <Card color={color}>
                <Reveal animated='move up'>
                    <Reveal.Content visible>
                        {/* <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png'/> */}
                        <Image src={Pet}/>
                    </Reveal.Content>
                    <Reveal.Content hidden>
                        <Image src={image} alt="Image in about"/>
                    </Reveal.Content>
                </Reveal>
                <Card.Content>
                <Card.Header><p className="aboutCardName">{name}</p></Card.Header>
                <Card.Meta>
                    <p className="aboutCardContent"><Icon name='handshake' />{work}</p>
                </Card.Meta>

                </Card.Content>
                <Card.Content extra>
                    <Card.Description>
                        <p className="aboutCardContent">{classes}</p>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <p className="aboutCardContent">
                    
                    <Icon name='mail' />{email}
                </p>
                </Card.Content>
            </Card>
        );
    }

    return (
        <div className = "aboutPage"> 
            <Header as='h2' icon textAlign='center'>
                <div className='titleContainer'>
                    <img src={ tokenSample_0_noBackground }></img>
                    <Icon name='flag' circular />
                    <img src={tokenSample_8_noBackground }></img>
                </div>
                <Header.Content><h1>Project Description</h1></Header.Content>
            </Header>
            <div>
                <p className="introduction">此專案參考了過去爆紅的番薯寶寶、寶可夢等電子寵物遊戲作為發想，
                    嘗試使用NFT技術製作一款電子寵物遊戲，並增加可以拆併多個NFT的功能，希望加強NFT除了金融操作以外的靈活性跟實用性，
                    使其成為未來元宇宙中虛擬資產的基礎。另外建造一種全新的機制，
                    將想開發NFT生態的人聚集成一個DAO，使得當中有貢獻的人可以獲得一定獎勵，
                    貢獻可以包含開發應用程式，並應用其NFT，讓NFT的使用場景不再單一，能夠運用在不同的應用程式中，
                    如此一來NFT可以更加活用，且「資產的擁有權」才會更有價值。
                </p>
            </div>
            <Header as='h2' icon textAlign='center'>
                <Icon name='users' circular />
                <Header.Content><h1>Our Team</h1></Header.Content>
            </Header>
            <div className="row">
                <div className="column">
                    <div className="card">
                        <div className="container">
                            <AboutCard color="red" name="洪子翔" classes="電資學士班(主修資工)" image={tokenSample_4} work="前端" email="test@example.com"/>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <div className="container">
                            <AboutCard color="orange" name="洪德易" classes="電資學士班(主修資工)" image={tokenSample_9} work="前端" email="test@example.com"/>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <div className="container">
                            <AboutCard color="yellow" name="李永祺" classes="資訊工程系" image={tokenSample_0} work="合約撰寫" email="test@example.com"/>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <div className="container">
                            <AboutCard color="violet" name="蔡禎宸" classes="資訊工程系" image={ tokenSample_2 } work="資料庫" email="test@example.com"/>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <div className="container">
                        <AboutCard color="violet" name="劉彥麟" classes="資訊工程系" image={ tokenSample_2 } work="資料庫" email="test@example.com"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bottomPic'>
                <img src={ mockToken_noBackground }></img>
                <img src={tokenSample_4_noBackground }></img>
            </div>
        </div>
    );
};
export default About;
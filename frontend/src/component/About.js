import React from 'react';
import "./css/About.css";
import "./Card.js";
import Meat from "../image/meat.png";
import PetNoBackground from "../image/petNoBackground.png";
import MockTokenNoBackground from "../image/MockTokenNoBackground.png";
import Banana from "../image/banana.png";
import {Header, Card, Icon, Image, Reveal } from 'semantic-ui-react'



const About = () => {

    function AboutCard({color,name, classes, image, description, work, email}) {
        return(
            <Card color={color}>
                <Reveal animated='move up'>
                    <Reveal.Content visible>
                        {/* <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png'/> */}
                        <Image src={PetNoBackground}/>
                    </Reveal.Content>
                    <Reveal.Content hidden>
                        <Image  src={MockTokenNoBackground} alt="Image in about" wrapped ui={false} />
                    </Reveal.Content>
                </Reveal>
                <Card.Content>
                <Card.Header><p className="aboutCardName">{name}</p></Card.Header>
                <Card.Meta>
                    <p className="aboutCardContent"><Icon name='handshake' />{work}</p>
                </Card.Meta>
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
                <Icon name='flag' circular />
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
                            <AboutCard color="red" name="洪子翔" classes="電資學士班(主修資工)" image={Banana} work="前端" email="test@example.com"/>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <div className="container">
                            <AboutCard color="orange" name="洪德易" classes="電資學士班(主修資工)" image={Meat} work="前端" email="test@example.com"/>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <div className="container">
                            <AboutCard color="yellow" name="李永祺" classes="資訊工程系" image={Meat} work="合約撰寫" email="test@example.com"/>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <div className="container">
                            <AboutCard color="violet" name="蔡禎宸" classes="資訊工程系" image={Meat} work="資料庫系統" email="test@example.com"/>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <div className="container">
                            <AboutCard color="purple" name="劉彥麟" classes="資訊工程系" image={Meat} work="資料庫系統" email="test@example.com"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default About;
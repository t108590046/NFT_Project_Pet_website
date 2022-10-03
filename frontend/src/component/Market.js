import React, { useState, useEffect } from "react";
import "./css/Main.css";
import "./css/Market.css";
import Meat from "../image/meat.png";
import Banana from "../image/banana.png";
import Chocolate from "../image/chocolate.png"
import Popup from "./Popup.js"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "./css/ItemSwiper.css";
import { useMoralis } from "react-moralis";
import { Button, Icon, Header} from "semantic-ui-react";
import "./css/Collection.css";
// import {Advertisement, Container, Divider, Header, Message } from "semantic-ui-react";
// import AdSense from "react-adsense";
// import { render } from "react-dom";
// import { Component } from "react";


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const maketItemList = [
	{
		id: 1, itemName: "Meat", itemDescription: "Friendship+1 Satiety+10", itemCost: 1, itemImg: Meat, foodtype:"meat"
	}, {
		id: 2, itemName: "Banana", itemDescription: "Friendship+2 Satiety+20", itemCost: 2, itemImg: Banana, foodtype:"banana"
	}, {
		id: 3, itemName: "Chocolate", itemDescription: "Friendship+3 Satiety+30", itemCost: 3, itemImg: Chocolate, foodtype:"chocolate"
	}, {
		id: 4, itemName: "Meat04", itemDescription: "Friendship+1 Satiety+10", itemCost: 40, itemImg: Meat, foodtype:"meat"
	}, {
		id: 5, itemName: "Meat05", itemDescription: "Friendship+1 Satiety+10", itemCost: 50, itemImg: Meat, foodtype:"meat"
	}, {
		id: 6, itemName: "Meat06", itemDescription: "Friendship+1 Satiety+10", itemCost: 60, itemImg: Meat, foodtype:"meat"
	}
]

const Market = () => {

	const [popupOpen, setPopupOpen] = useState(false); //判斷Popup是否開啟
	const [itemName, setItemName] = useState("default"); //物品名稱(傳給Popup用)
	const [itemDescription, setItemDescription] = useState("default"); //物品功效(傳給Popup用)
	const { authenticate, isAuthenticated} = useMoralis();
	const [foodType,SetFoodType] = useState("meat");

	function CollectionSwiper({ maketItemList }) {
		return (
			<Swiper
				spaceBetween={30}
				slidesPerView={3}
				navigation
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}	
			>
				{
					maketItemList.map(item => (
						<SwiperSlide key={item.id} className="slide">
							<div className="slideContent">
								<div className="collectionImage">
									<img src={item.itemImg} alt="Item In Shop"></img>
								</div>
								<h1 className="itemName">{item.itemName}</h1>
								<h2>Cost:{item.itemCost}</h2>
								<h3 className="description">{item.itemDescription}</h3>
								<Button animated='fade' size='massive' inverted color='orange' onClick={() => { SetFoodType(item.foodtype); setPopupOpen(true); setItemDescription(item.itemDescription); setItemName(item.itemName); }}>
									<Button.Content visible>BUY</Button.Content>
									<Button.Content hidden><Icon name='shop' /></Button.Content>
								</Button>
							</div>
						</SwiperSlide>
					))
				}

			</Swiper>
		);
	};

	return (
		<div className="box">
			<div className="collectionPage">
				<div>
					<div className="CollectionLabel">
						<Header as='h2'>
							<Icon name='shopping cart' size='tiny'/>
							<Header.Content>
							Market
							<Header.Subheader>
								Buy food to feed your pet!
							</Header.Subheader>
							</Header.Content>
						</Header>
					</div>
				</div>
				
				<div className="showImg">
					<CollectionSwiper maketItemList={maketItemList} />
				</div>
				{popupOpen && < Popup mode="market" itemDescription={itemDescription} itemName={itemName} setPopupOpen={setPopupOpen} foodtype={foodType} />}
			</div>
		</div>
	);

};
export default Market;



//try to add Ads in web page
// class BasicAd extends Component {
	// 	componentDidMount() {
	// 	  (window.adsbygoogle = window.adsbygoogle || []).push({});
	// 	}
	  
	// 	render() {
	// 	  return (
	// 		<ins
	// 		  className="adsbygoogle"
	// 		  data-ad-client="ca-pub-4591861188995436"
	// 		  data-ad-slot="4640466102"
	// 		  data-adtest="on"
	// 		  style={{ display: "inline-block", height: 250, width: 300 }}
	// 		/>
	// 	  );
	// 	}
	//   }
	// const Ads = () => {
	// 	return(
	// 		<Container>
	// 			<Divider hidden />
	// 			<Message info>
	// 			<Message.Header><Icon name="video play" />AD</Message.Header>
	// 			<p>
	// 				Watch Ads to earn coin for item.
	// 			</p>
	// 			<Message.List>
	// 				<Message.Item>1 Video for 10 coins</Message.Item>
	// 				<Message.Item>You also need to disable your ad blocker</Message.Item>
	// 				<Message.Item>Supported by GoogleAds</Message.Item>
	// 			</Message.List>
	// 			</Message>

	// 			<Advertisement unit="medium rectangle">
	// 			<BasicAd />
	// 			</Advertisement>
	
	// 			<Advertisement unit='medium rectangle'>
	// 			<AdSense.Google
	// 				client="ca-pub-4591861188995436"
	// 				format=""
	// 				data-adtest="on"
	// 				slot="6710577704"
	// 				style={{ display: "inline-block", height: 90, width: 728 }}
	// 			/>
	// 			</Advertisement>
	// 		</Container>
	// 	)
	// }
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
import { Button, Icon } from "semantic-ui-react";


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const maketItemList = [
	{
		id: 1, itemName: "好吃的肉", itemDescription: "親密度+1 飽足度+10", itemCost: 1, itemImg: Meat, foodtype:"meat"
	}, {
		id: 2, itemName: "好吃香蕉", itemDescription: "親密度+2 飽足度+20", itemCost: 2, itemImg: Banana, foodtype:"banana"
	}, {
		id: 3, itemName: "好吃巧克力", itemDescription: "親密度+3 飽足度+30", itemCost: 3, itemImg: Chocolate, foodtype:"chocolate"
	}, {
		id: 4, itemName: "好吃的肉04", itemDescription: "親密度+1 飽足度+5", itemCost: 40, itemImg: Meat, foodtype:"meat"
	}, {
		id: 5, itemName: "好吃的肉05", itemDescription: "親密度+1 飽足度+5", itemCost: 50, itemImg: Meat, foodtype:"meat"
	}, {
		id: 6, itemName: "好吃的肉06", itemDescription: "親密度+1 飽足度+5", itemCost: 60, itemImg: Meat, foodtype:"meat"
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
				slidesPerView={4}
				navigation
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
			// onSlideChange={() => console.log('slide change')}
			// onSwiper={(swiper) => console.log(swiper)}
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
			<div className="marketArea">
				<div className="title">
					<h1 className="heading"> Welcome</h1>
				</div>
				<div className="sliderContainer">
					<CollectionSwiper maketItemList={maketItemList} />
				</div>
				{popupOpen && < Popup mode="market" itemDescription={itemDescription} itemName={itemName} setPopupOpen={setPopupOpen} foodtype={foodType} />}
			</div>
		</div>
	);
};
export default Market;

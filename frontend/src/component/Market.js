import React, { useState, useEffect } from "react";
import "./css/Main.css";
import "./css/Market.css";
import Meat from "../image/meat.png";
import Popup from "./Popup.js"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "./css/ItemSwiper.css";
import { Button, Icon } from "semantic-ui-react";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const maketItemList = [
	{
		id: 1, itemName:"好吃的肉01", itemDescription:"親密度+1 飽足度+5", itemCost:10,itemImg:Meat
	},{
		id: 2, itemName:"好吃的肉02", itemDescription:"親密度+1 飽足度+5", itemCost:20,itemImg:Meat
	},{
		id: 3, itemName:"好吃的肉03", itemDescription:"親密度+1 飽足度+5", itemCost:30,itemImg:Meat
	},{
		id: 4, itemName:"好吃的肉04", itemDescription:"親密度+1 飽足度+5", itemCost:40,itemImg:Meat
	},{
		id: 5, itemName:"好吃的肉05", itemDescription:"親密度+1 飽足度+5", itemCost:50,itemImg:Meat
	},{
		id: 6, itemName:"好吃的肉06", itemDescription:"親密度+1 飽足度+5", itemCost:60,itemImg:Meat
	}
]

const Market = () => {

	const [popupOpen, setPopupOpen] = useState(false); //判斷Popup是否開啟
	const [itemName, setItemName] = useState("default"); //物品名稱(傳給Popup用)
	const [itemDescription, setItemDescription] = useState("default"); //物品功效(傳給Popup用)

	function CollectionSwiper ({maketItemList}) {
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
			  maketItemList.map(item =>(
				  <SwiperSlide key={item.id} className="slide">
					  <div className="slideContent">
						<div className="collectionImage">
						  <img src={item.itemImg} alt="Item In Shop"></img>
						</div>
						<h1 className="itemName">{item.itemName}</h1>
						<h2>Cost:{item.itemCost}</h2>
						<h3 className="description">{item.itemDescription}</h3>
						<Button animated='fade' size='massive' inverted color='orange' onClick={() => { setPopupOpen(true); setItemDescription(item.itemDescription); setItemName(item.itemName);}}>
							<Button.Content visible>BUY</Button.Content>
							<Button.Content hidden><Icon name='shop' /></Button.Content>
						</Button>
					  </div>
				  </SwiperSlide>
			  ) )
		  }
	  
		  </Swiper>
		);
	  };

  	return(
		<div className="box">
			<div className="marketArea">
				<div className="title">
					<h1 className="heading"> Welcome</h1>
				</div>
				<div className="sliderContainer">
					<CollectionSwiper maketItemList={maketItemList}/>
				</div>
				{popupOpen && < Popup itemDescription = {itemDescription} itemName = {itemName}  setPopupOpen = {setPopupOpen} />} 
			</div>
		</div>

		//舊版本
		// <div className="box">
		// 	<div className="marketArea">
		// 		<div className="title">
		// 			<h1 className="heading"> Shop </h1>
		// 		</div>
		// 		{popupOpen && < Popup itemDescription = {itemDescription} itemName = {itemName}  setPopupOpen = {setPopupOpen} />} 
		// 		<div className="market-box-container">
		// 			<div className="market-box">
		// 				<img src={Meat} alt="meat in market"></img>
		// 				<h3>好吃的肉</h3>
		// 				<p>親密度+1 飽足度+5</p>
		// 				<button className="market-btn" onClick={() => {setItemDescription("親密度+1 飽足度+5"); setItemName("好吃的肉"); setPopupOpen(true);}}>
		// 					Buy
		// 				</button>
		// 			</div>

		// 			<div className="market-box">
		// 				<img src={Meat} alt="meat in market"></img>
		// 				<h3>普通的肉</h3>
		// 				<p> 飽足度+3</p>
		// 				<button className="market-btn" onClick={() => {setItemDescription("飽足度+3"); setItemName("普通的肉"); setPopupOpen(true);}}>
		// 					Buy
		// 				</button>
		// 			</div>

		// 			<div className="market-box">
		// 				<img src={Meat} alt="meat in market"></img>
		// 				<h3>難吃的肉</h3>
		// 				<p>親密度-1 飽足度+2</p>
		// 				<button className="market-btn" onClick={() => {setItemDescription("親密度-1 飽足度+2"); setItemName("難吃的肉"); setPopupOpen(true);}}>
		// 					Buy
		// 				</button>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
};
export default Market;

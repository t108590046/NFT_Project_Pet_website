require('dotenv').config()
const express = require('express')
const basePath = process.cwd();
<<<<<<< HEAD
const { InsertData, CheckUser, FindQueryPet, UpdateFoodAmount, CheckUserIn,UpdatePetName } = require(`${basePath}/models/morails`)
=======
const { InsertData, CheckUser, FindQueryPet,UpdateFoodAmount,UpdateCoinAmount, FeedPetUpdate, GetCurrentCoin} = require(`${basePath}/models/morails`)
>>>>>>> origin/main
const { GetRandomFromList } = require(`${basePath}/models/function`)
const router = express.Router()
const ipAddress = process.env.IP_ADDRESS
const port = process.env.PORT

//加入新寵物
router.post('/insertNewPet', async (req, res, next) => {
    let Characteristics = ["懶散", "活潑", "易怒", "平易近人", "膽小"]
    let temp = {
        "Name": req.body.Name,
        "Friendship": 0,
        "Satiety": 100,
        "Characteristics": GetRandomFromList(Characteristics),
        "Owner": await CheckUser(req.body.Owner),
        "TokenID": parseInt(req.body.TokenID),
        "Metadata": req.body.MetadataURI
    }
    await InsertData("Pet", temp);
    res.send("Inserted New Pet!!")
});

//查詢user寵物資訊
router.post('/QueryPet', async (req, res, next) => {
    const data = await FindQueryPet(parseInt(req.body.TokenID));
    res.json(data);
})

//更新寵物名字
router.post('/ChangeName', async (req, res, next) => {
    await UpdatePetName(parseInt(req.body.TokenID),req.body.NewName);
    res.send("done");
})

//更新pet圖片
router.post('/UpdatePetURI', async (req, res, next) => {

    res.json(data);
})

//更新食物數量
router.post('/BuyFood', async (req, res, next) => {

    let temp =
    {
        "Owner": await CheckUser(req.body.Owner),
        "FoodType": req.body.FoodType,
        "Amount": parseInt(req.body.Amount)
    }
    let foodPrice = []

    
    await UpdateFoodAmount(temp);
    //await 扣硬幣
    await UpdateCoinAmount(temp);
    res.send('update done');

})

//寵物吃食物更新飽食度與親密度
router.post('/FeedPet', async (req, res, next) => {
    let temp =
    {
        "TokenID" :parseInt(req.body.TokenID),
        "FoodType":req.body.FoodType,
    }
    await FeedPetUpdate(temp);
    
    res.send('Update Satiety and Friendship');
})

//查詢目前Coin數量
router.post('/GetCoinAmount', async (req, res, next) => {
    
    let temp =
    {
        "Owner" :await CheckUser(req.body.Owner),
        
    }
    let CurrentCoin = await GetCurrentCoin(temp.Owner);
    res.json(CurrentCoin);
})


module.exports = router
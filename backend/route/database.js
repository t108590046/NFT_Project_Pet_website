require('dotenv').config()
const express = require('express')
const basePath = process.cwd();
const { InsertData, CheckUser, FindQueryPet, UpdateFoodAmount, UpdateCoinAmount, FeedPetUpdate, GetCurrentCoin, UpdatePetName, CheckUserIn,GetFoodAmount,GetLastFeedTime} = require(`${basePath}/models/morails`)
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

//新用戶新增資料
router.post('/insertNewUser', async (req, res, next) => {

    let food = await CheckUserIn(req.body.id,"Food");
    let coin = await CheckUserIn(req.body.id,"Coin");
    
    let temp = {
        food:food,
        coin:coin
    }
    res.json(temp)
    
});

//查詢user寵物資訊
router.get('/QueryPet/:id', async (req, res, next) => {
    const data = await FindQueryPet(parseInt(req.params["id"]));
    res.json(data);
})

//更新寵物名字
router.post('/ChangeName', async (req, res, next) => {
    await UpdatePetName(parseInt(req.body.TokenID), req.body.NewName);
    res.send("done");
})

//更新食物數量
router.post('/BuyFood', async (req, res, next) => {

    let temp =
    {
        "Owner": await CheckUser(req.body.Owner),
        "FoodType": req.body.FoodType,
        "Amount": parseInt(req.body.Amount)
    }

    let checkmoney = await UpdateCoinAmount(temp); 
    if(checkmoney !== "you don't have enough money")
    {
        await UpdateFoodAmount(temp);
        res.send('購買成功');
    }
    else{
        res.send(checkmoney);
    }
})

//寵物吃食物更新飽食度與親密度
router.post('/FeedPet', async (req, res, next) => {
    let temp =
    {
        "Owner": await CheckUser(req.body.Owner),
        "TokenID": parseInt(req.body.TokenID),
        "FoodType": req.body.FoodType,
        "Amount" :-1
    }
    await FeedPetUpdate(temp);
    await UpdateFoodAmount(temp);

    res.send('Update Satiety and Friendship');
})

//查詢目前Coin數量
router.get('/GetCoinAmount/:owner', async (req, res, next) => {

    let temp =
    {
        "Owner": await CheckUser(req.params["owner"]),
    }

    await GetCurrentCoin(temp.Owner).then((CurrentCoin) => {
        res.send(CurrentCoin.toString());
    }).catch((error) => {
        res.send("error");
    })

})

//查詢目前Food數量
router.get('/GetFoodAmount/:owner', async (req, res, next) => {

    let temp =
    {
        "Owner": await CheckUser(req.params["owner"]),
    }
    
    let meatAmount = await GetFoodAmount(temp.Owner,"meat");
    let bananaAmount = await GetFoodAmount(temp.Owner,"banana");
    let chocolateAmount = await GetFoodAmount(temp.Owner,"chocolate");

    let output = {
        meat:meatAmount,
        banana:bananaAmount,
        chocolate:chocolateAmount
    }
    res.json(output);
})

//隨時間下降飢餓度
router.get('/checkSatiety/:id', async (req, res, next) => {
    var ONE_HOUR = 1000 * 60 * 60;
    var ONE_MIN = 1000 * 60;
    let temp =
    {
        "TokenID": parseInt(req.params["id"]),
        "FoodType": "hungry",
    }
    let time = await GetLastFeedTime(temp.TokenID);
    timeUTC = new Date(time.toUTCString());
    const nowtime = new Date(new Date().toUTCString());
    console.log(timeUTC,nowtime)
    var diff = nowtime - timeUTC;
    var leftMins = Math.floor(diff/ONE_HOUR); //距離上次餵食時間超過?小時
    console.log(leftMins);
    if(leftMins >= 1) {
        await FeedPetUpdate(temp);
        res.send("pet is hungry");
    }
    else
    {
        res.send("pet is good");
    }
   
})


module.exports = router
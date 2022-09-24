require('dotenv').config()
const express = require('express')
const basePath = process.cwd();
const { InsertData, CheckUser, FindQueryPet, UpdateFoodAmount, CheckUserIn,UpdatePetName } = require(`${basePath}/models/morails`)
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

    //await 扣硬幣
    await UpdateFoodAmount(temp);
    res.send('update done');

})

router.post('/CheckInsertDatabase', async (req, res, next) => {

    CheckUserIn("0xd6c6b68c2c892ae32f73bb9dbe7f6964cac740d4", "Food");
    res.send('done');
})


module.exports = router
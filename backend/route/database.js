require('dotenv').config()
const express = require('express')
const basePath = process.cwd();
const { InsertData, CheckUser, FindQueryPet } = require(`${basePath}/models/morails`)
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
    }
    await InsertData("Pet", temp);
    res.send("Inserted New Pet!!")
});

//查詢user寵物資訊
router.post('/QueryPet', async (req, res, next) => {
    const data = await FindQueryPet(parseInt(req.body.TokenID));
    res.json(data);
})

module.exports = router
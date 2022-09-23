require('dotenv').config()
const express = require('express')
const basePath = process.cwd();
const { UploadFileToIpfs,UploadImageMoralisIpfs,UploadFileMoralisIpfs } = require(`${basePath}/models/ipfs`)
const { Combine, GetBuildImagePath, GetNFTMetadata,GetRandomNFT } = require(`${basePath}/models/canvas`)
const { AddAttributeToList, GetAttributeList } = require(`${basePath}/models/function`)
const router = express.Router()
const ipAddress = process.env.IP_ADDRESS
const port = process.env.PORT

//基本組圖功能
router.post('/', async (req, res, next) => {
    var hand = req.body.hand
    var hat = req.body.hat
    var glasses = req.body.glasses
    var cloth = req.body.cloth
    var pant = req.body.pant
    var pet = req.body.pet
    var tokenId = req.body.tokenId
    var itemList = [pet, pant, cloth, glasses, hat, hand]
    await Combine(itemList, tokenId)
    let ipfsPath = await UploadImageMoralisIpfs(`${basePath}/public/build/${tokenId}.png`)
    let attributesList = GetAttributeList(itemList)
    let tempMetadata =  GetNFTMetadata('nft_pet', 'it is a cool pet', tokenId, ipfsPath, GetBuildImagePath(tokenId), attributesList)
    let URL = await UploadFileMoralisIpfs(tempMetadata);
    res.send(URL);
})

/*
router.post('/nft', async (req, res, next) => {
    await GetRandomNFT(0, 10);
    res.send(123);
})
*/





module.exports = router

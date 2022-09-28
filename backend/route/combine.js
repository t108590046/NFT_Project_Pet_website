require('dotenv').config()
const express = require('express')
const basePath = process.cwd();
const { UploadFileToIpfs,UploadImageMoralisIpfs,UploadFileMoralisIpfs } = require(`${basePath}/models/ipfs`)
const { Combine, GetBuildImagePath, GetNFTMetadata,GetRandomNFT } = require(`${basePath}/models/canvas`)
const { AddAttributeToList, GetAttributeList } = require(`${basePath}/models/function`)
const {GetBalance, GetUri,Separate_Contract,Combine_Contract} = require(`${basePath}/models/ethers`)
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
    var subId = req.body.subId
    var subAddress = req.body.subAddress
    var operateType = req.body.operateType
    var itemList = [pet, pant, cloth, glasses, hat, hand]
    console.log(tokenId,subId);
    await Combine(itemList, tokenId)
    let ipfsPath = await UploadImageMoralisIpfs(`${basePath}/public/build/${tokenId}.png`)
    let attributesList = GetAttributeList(itemList)
    let tempMetadata =  GetNFTMetadata('nft_pet', 'it is a cool pet', tokenId, ipfsPath, GetBuildImagePath(tokenId), attributesList)
    let URL = await UploadFileMoralisIpfs(tempMetadata);
    console.log(URL);
    try {
        var result;
        if(operateType == "combine") {
            result = await Combine_Contract(tokenId,subId,subAddress,URL);
        } 
        else if(operateType == "separate"){
            result = await Separate_Contract(tokenId,subId,subAddress,URL);
        }
        res.send(result);
    } catch (error) {
        res.send("error");
    }
})



module.exports = router

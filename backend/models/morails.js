require('dotenv').config()
const fs = require("fs");
const basePath = process.cwd()
const Moralis = require("moralis/node")
const serverUrl = process.env.DAPP_URL
const appId = process.env.APP_ID
const masterKey = process.env.MASTER_KEY

//檢查帳號
const CheckUser = async (_address) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const _User = Moralis.Object.extend("_User")
    const query = new Moralis.Query(_User)
    query.equalTo("ethAddress", _address)
    const result = await query.find({useMasterKey: true})
    return result[0];
}

//插入資料庫
const InsertData = async (_className, _newObjectJson) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const Class = Moralis.Object.extend(_className)
    const newClass = new Class()
    for (var attributename in _newObjectJson) {
        newClass.set(attributename, _newObjectJson[attributename])
    }
    await newClass.save()
}

//查詢資料庫
const FindQuery = async (_className) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const Class = Moralis.Object.extend(_className)
    const query = new Moralis.Query(Class)
    query.limit(25)
    const object = await query.find()
    console.log(object)
    //console.log(object.get('height'))
};
//查詢資料庫Pet
const FindQueryPet = async (_tokenID) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const Class = Moralis.Object.extend("Pet")
    const query = new Moralis.Query(Class)
    query.limit(25)
    query.equalTo("TokenID", _tokenID);
    const results = await query.find();
    const objectID = results[0].id
    let petInfo = {}
   await query.get(objectID).then(
        (Pet) => {
          // The object was retrieved successfully.
          petInfo = 
          {
            "Name":Pet.get("Name"),
            "Satiety":Pet.get("Satiety"),
            "Friendship":Pet.get("Friendship"),
            "Characteristics":Pet.get("Characteristics")
          }
        },
        (error) => {
          // The object was not retrieved successfully.
          // error is a Moralis.Error with an error code and message.
          return error
        }
      );
      return petInfo
};

//刪除資料庫
const DeleteQuery = async (_className) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const Class = Moralis.Object.extend(_className)
    const query = new Moralis.Query(Class)
    const object = await query.first()
    if (object) {
        object.destroy().then(() => {
            console.log('delete done');
        }, (error) => {
            console.log(error);
        });
    }
}

//更新資料庫
const UpdateData = async (_className) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const Class = Moralis.Object.extend(_className)
    const query = new Moralis.Query(Class)
    const object = await query.first()
    if (object) {
        object.set('height', 166)
        object.save().then(() => {
            console.log('update done');
        }, (error) => {
            console.log(error);
        });
    }
}

//取得morails的連線
const GetMorailsConnection = async () => {
    await Moralis.start({ serverUrl, appId, masterKey })
    return Moralis
}

//測試中
const UploadFileToMoralisIpfs = async () => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const object = {
        key: "value",
    };
    const json = { "a": 1, "b": 2 }
    const string = JSON.stringify(json) // convert Object to a String
    const encodedString = btoa(string)
    console.log(encodedString)
    const file = new Moralis.File("file.json", {
        base64: btoa(JSON.stringify(object)),
    });
    await file.saveIPFS();
}

module.exports = { InsertData, GetMorailsConnection,CheckUser ,FindQueryPet}

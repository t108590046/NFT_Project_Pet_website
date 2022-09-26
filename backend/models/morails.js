require('dotenv').config()
const fs = require("fs");
const basePath = process.cwd()
const Moralis = require("moralis/node")
const serverUrl = process.env.DAPP_URL
const appId = process.env.APP_ID
const masterKey = process.env.MASTER_KEY

const foodJson = (_owner) => {
    let temp = {
        meat: 0,
        banana: 0,
        chocolate: 0,
        Owner: _owner
    }
    return temp
}

const coinJson = (_owner) => {
    let temp = {
        Amount: 10000,
        Owner: _owner
    }
    return temp
}

//檢查帳號是否存在資料庫
const CheckUserIn = async (_objectID, _objectName) => {
    let isInUser = await CheckUserByObjectID(_objectID);

    if (!isInUser) {
        console.log(`this user not in database`);
        return ("not in database")
    }
    else {
        await Moralis.start({ serverUrl, appId, masterKey })
        const _object = Moralis.Object.extend(_objectName)
        const query = new Moralis.Query(_object)
        query.equalTo("Owner", isInUser)
        const result = await query.find({ useMasterKey: true })
        console.log(result)
        if (result.length == 0) {
            switch (_objectName) {
                case "Food":
                    await InsertData("Food", foodJson(isInUser));
                    break;
                case "Coin":
                    await InsertData("Coin", coinJson(isInUser));
                    break;
            }
            return ("insert done");
        }
        else {
            return (`already in ${_objectName}`)
        }

    }
}

//檢查帳號
const CheckUser = async (_address) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const _User = Moralis.Object.extend("_User")
    const query = new Moralis.Query(_User)
    query.equalTo("ethAddress", _address)
    const result = await query.find({ useMasterKey: true })
    return result[0];
}

const CheckUserByObjectID = async (_objectID) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const _User = Moralis.Object.extend("_User")
    const query = new Moralis.Query(_User)
    query.equalTo("objectId", _objectID)
    const result = await query.find({ useMasterKey: true })
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
                "Name": Pet.get("Name"),
                "Satiety": Pet.get("Satiety"),
                "Friendship": Pet.get("Friendship"),
                "Characteristics": Pet.get("Characteristics"),
                "Metadata": Pet.get("Metadata")
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

const UpdateFoodAmount = async (data) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const Class = Moralis.Object.extend("Food")
    const query = new Moralis.Query(Class)
    query.equalTo("Owner", data.Owner);
    let oldFoodAmount;
    oldFoodAmount = await GetFoodAmount(data.Owner, data.FoodType);
    console.log(oldFoodAmount)
    //更新食物數量
    const object = await query.first();
    if (object) {
        object.set(data.FoodType, oldFoodAmount + data.Amount)
        object.save().then(() => {
            console.log('update done');
        }, (error) => {
            console.log(error);
        });
    }

}

//更新寵物名字
const UpdatePetName = async (_id, _newName) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const Class = Moralis.Object.extend("Pet")
    const query = new Moralis.Query(Class)
    query.equalTo("TokenID", _id);
    console.log(_id, _newName)
    const object = await query.first();
    console.log(object)
    if (object) {
        object.set("Name", _newName);
        object.save().then(() => {
            console.log('update done');
        }, (error) => {
            console.log(error);
        });
    }
}

//查詢目前食物數量
const GetFoodAmount = async (owner, foodtype) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const Class = Moralis.Object.extend("Food")
    const query = new Moralis.Query(Class)
    query.equalTo("Owner", owner)
    let oldFoodAmount = 0;
    const results = await query.find();
    const objectID = results[0].id

    await query.get(objectID).then(
        (food) => {
            oldFoodAmount = food.get(foodtype);
            // The object was retrieved successfully.
        },
        (error) => {
            // The object was not retrieved successfully.
            // error is a Moralis.Error with an error code and message.
        }
    );
    return oldFoodAmount;
}
//查詢上次餵食時間
const GetLastFeedTime = async (id) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const Class = Moralis.Object.extend("Pet")
    const query = new Moralis.Query(Class)
    query.equalTo("TokenID", id)
    let time = 0;
    const results = await query.find();
    const objectID = results[0].id

    await query.get(objectID).then(
        (pet) => {
            time = pet.get("updatedAt");
            // The object was retrieved successfully.
        },
        (error) => {
            // The object was not retrieved successfully.
            // error is a Moralis.Error with an error code and message.
        }
    );
    return time;
}

//更新coin數量
const UpdateCoinAmount = async (data) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const Class = Moralis.Object.extend("Coin")
    const query = new Moralis.Query(Class)
    query.equalTo("Owner", data.Owner);
    let oldCoinAmount = await GetCurrentCoin(data.Owner);
    console.log("old", oldCoinAmount)

    var FoodPrice = { "meat": 1, "banana": 2, "chocolate": 3 };

    switch (data.FoodType) {
        case "meat":
            oldCoinAmount -= (FoodPrice["meat"]) * data.Amount;

            break;
        case "banana":
            oldCoinAmount -= (FoodPrice["banana"]) * data.Amount;
            break;
        case "chocolate":
            oldCoinAmount -= (FoodPrice["chocolate"]) * data.Amount;
            break;
    }
    console.log(oldCoinAmount)
    if (oldCoinAmount < 0) {
        return ("you don't have enough money");
    }
    else {
        const object = await query.first();
        if (object) {
            object.set("Amount", oldCoinAmount)
            object.save().then(() => {
                console.log('update coin done');
                return ("update coin done");
            }, (error) => {
                console.log(error);
                return (error);
            });
        }
    }
}
//查詢目前Coin數量
const GetCurrentCoin = async (owner) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const Class = Moralis.Object.extend("Coin")
    const query = new Moralis.Query(Class)
    query.equalTo("Owner", owner)
    let CurrentCoin = 0;
    const results = await query.find();
    console.log(owner);

    const objectID = results[0].id

    await query.get(objectID).then(
        (coin) => {
            CurrentCoin = coin.get("Amount");
            // The object was retrieved successfully.
        },
        (error) => {
            // The object was not retrieved successfully.
            // error is a Moralis.Error with an error code and message.
        }
    );

    return CurrentCoin;
}

//寵物吃食物後更新飽食度與親密度
const FeedPetUpdate = async (data) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const Class = Moralis.Object.extend("Pet")
    const query = new Moralis.Query(Class)
    query.equalTo("TokenID", data.TokenID);
    let oldPetSatiety = 0;
    let oldFriendship = 0;
    const results = await query.find();
    const objectID = results[0].id

    await query.get(objectID).then(
        (data) => {
            oldPetSatiety = data.get("Satiety");
            oldFriendship = data.get("Friendship");
            // The object was retrieved successfully.
        },
        (error) => {
            console.log(error)
            // The object was not retrieved successfully.
            // error is a Moralis.Error with an error code and message.
        }
    );
    console.log("now:", oldPetSatiety, oldFriendship);
    var GetSatiety = { "meat": 10, "banana": 20, "chocolate": 30};
    var GetFriendship = { "meat": 1, "banana": 2, "chocolate": 3};

    switch (data.FoodType) {
        case "meat":
            oldPetSatiety = await UpdateSatiety(oldPetSatiety, GetSatiety["meat"]);
            oldFriendship = await UpdateFriendship(oldFriendship, GetFriendship["meat"]);
            break;
        case "banana":
            oldPetSatiety = await UpdateSatiety(oldPetSatiety, GetSatiety["banana"]);
            oldFriendship = await UpdateFriendship(oldFriendship, GetFriendship["banana"]);
            break;
        case "chocolate":
            oldPetSatiety = await UpdateSatiety(oldPetSatiety, GetSatiety["chocolate"]);
            oldFriendship = await UpdateFriendship(oldFriendship, GetFriendship["chocolate"]);
            break;
        case "hungry":
            oldPetSatiety = await UpdateSatiety(oldPetSatiety, (data.hours * -1));
            oldFriendship = await UpdateFriendship(oldFriendship,(data.hours * -1));
            break;
    }
    console.log(oldPetSatiety, oldFriendship);
    //更新寵物飽食度
    const object = await query.first();
    if (object) {
        object.set("Satiety", oldPetSatiety);
        object.set("Friendship", oldFriendship);
        object.save().then(() => {
            console.log('update Satiety and Friendship done');
        }, (error) => {
            console.log(error);
        });
    }
}
//計算飽食度
const UpdateSatiety = async (oldPetSatiety, NumberOfChanges) => {
    oldPetSatiety += NumberOfChanges;
    if (oldPetSatiety > 100) {
        oldPetSatiety = 100;
    }
    else if (oldPetSatiety < 0) {
        oldPetSatiety = 0;
    }

    return oldPetSatiety;
}
//計算親密度
const UpdateFriendship = async (oldFriendship, NumberOfChanges) => {
    oldFriendship += NumberOfChanges;
    if (oldFriendship > 100) {
        oldFriendship = 100;
    }
    else if (oldFriendship < 0) {
        oldFriendship = 0;
    }

    return oldFriendship;
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

module.exports = { InsertData, GetMorailsConnection, CheckUser, FindQueryPet, UpdateFoodAmount, UpdateCoinAmount, FeedPetUpdate, GetCurrentCoin, UpdatePetName, CheckUserIn, GetFoodAmount, GetLastFeedTime }

import React, { useEffect, useState } from "react";
import axios from 'axios'
import Meat from "../image/meat.png";
import Banana from "../image/banana.png";
import Chocolate from "../image/chocolate.png"
import { contractAddress_Cloth, contractAddress_Pant, contractAddress_Glasses, contractAddress_Pet, contractAddress_Hat, contractAddress_Hand, balanceOf_ABI_Pet, separate_One_ABI_Pet, combine_ABI_Pet, tokenOfOwnerByIndex_ABI_Pet, tokenURI_ABI_Pet } from "../abi/pet"
import { useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction } from "react-moralis";
import "./css/Operate.css";
import { Button, Icon, Popup } from "semantic-ui-react";

const Operate = ({ trigger, equipments, TokenID ,pettype}) => {
  const { user, isAuthenticated, authenticate } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const Web3Api = useMoralisWeb3Api();
  const [components, setComponents] = useState([]);
  const [handType, setHandType] = useState('none');
  const [hatType, setHatType] = useState('none');
  const [glassesType, setGlassesType] = useState('none');
  const [clothType, setClothType] = useState('none');
  const [pantType, setPantTyp] = useState('none');
  const [selectedSubToken, setSelectedSubToken] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [operationType, setOperationType] = useState('');
  const [meatAmount, setMeatAmount] = useState(0);
  const [bananaAmount, setBananaAmount] = useState(0);
  const [chocolateAmount, setChocolateAmount] = useState(0);
  const contract_List = [contractAddress_Hat, contractAddress_Hand, contractAddress_Glasses, contractAddress_Pant, contractAddress_Cloth];
  const contract_dictionary = { 'hand': contractAddress_Hand, 'hat': contractAddress_Hat, 'glasses': contractAddress_Glasses, 'cloth': contractAddress_Cloth, 'pant': contractAddress_Pant }

  const [equipmentsLabel, setequipmentsLabel] = useState("defaultTab");
  const [itemLabel, setitemLabel] = useState("defaultTab");
  const [componentLabel, setcomponentLabel] = useState("defaultTab");

  const SetTypeNone = (name) => {
    switch (name) {
      case "hand":
        setHandType("none");
        break;
      case "hat":
        setHatType("none");
        break;
      case "glasses":
        setGlassesType("none");
        break;
      case "cloth":
        setClothType("none");
        break;
      case "pant":
        setPantTyp("none");
        break;
      default:
    }
  }

  //初始角色裝備類型狀態
  const InitEquipmentState = () => {
    let total = ["hand", "hat", "glasses", "cloth", "pant"]
    let equipmentList = []
    equipments.forEach((equipment) => {
      equipmentList.push(equipment.name)
      switch (equipment.name) {
        case "hand":
          setHandType(equipment.type);
          break;
        case "hat":
          setHatType(equipment.type);
          break;
        case "glasses":
          setGlassesType(equipment.type);
          break;
        case "cloth":
          setClothType(equipment.type);
          break;
        case "pant":
          setPantTyp(equipment.type);
          break;
        default:
      }
    })
    total.forEach((equipment) => {
      if (!equipmentList.includes(equipment)) {
        SetTypeNone(equipment);
      }
    })
  }
  //改變腳色配件資訊
  const ChangeState = (equipment) => {
    let alertText = "you selected " + equipment.name + " id: " + equipment.token_id;
    setSelectedSubToken(equipment.token_id);
    setSelectedType(equipment.name);
    if (operationType === "separate") {
      SetTypeNone(equipment.name);
    }
    else if (operationType === "combine") {
      switch (equipment.name) {
        case "hand":
          if (handType === "none") setHandType(equipment.type);
          else alertText = "you have been equipped " + handType;
          break;
        case "hat":
          if (hatType === "none") setHatType(equipment.type);
          else alertText = "you have been equipped " + hatType;
          break;
        case "glasses":
          if (glassesType === "none") setGlassesType(equipment.type);
          else alertText = "you have been equipped " + glassesType;
          break;
        case "cloth":
          if (clothType === "none") setClothType(equipment.type);
          else alertText = "you have been equipped " + clothType;
          break;
        case "pant":
          if (pantType === "none") setPantTyp(equipment.type);
          else alertText = "you have been equipped " + pantType;
          break;
        default:
      }
    }
    alert(alertText);
  }

  console.log({
    hand: handType,
    hat: hatType,
    glasses: glassesType,
    cloth: clothType,
    pant: pantType,
    pet: pettype,
    tokenId: TokenID
  })

  const Separate_Contract = async (uri) => {
    let options = {
      contractAddress: contractAddress_Pet,
      functionName: "separateOne",
      abi: [separate_One_ABI_Pet],
      params: {
        tokenId: parseInt(TokenID),
        subId: parseInt(selectedSubToken),
        subAddress: contract_dictionary[selectedType],
        _uri: uri
      },
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        alert("Succesful Separate");
        window.location.reload();
      },
      onError: (error) => {
        InitEquipmentState();
        alert(error);
      },
    });
  };

  const Combine_Contract = async (uri) => {
    let subArray = []
    let subArray_address = [contract_dictionary[selectedType]]

    subArray.push(selectedSubToken);
    console.log(subArray)
    console.log(subArray_address)
    let options = {
      contractAddress: contractAddress_Pet,
      functionName: "combine",
      abi: [combine_ABI_Pet],
      params: {
        tokenId: parseInt(TokenID),
        subIds: subArray,
        subAddress: subArray_address,
        _uri: uri
      },
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        alert("Succesful Combine");
        window.location.reload();
      },
      onError: (error) => {
        InitEquipmentState();
        alert(error.data.message);
        alert("請檢查setting是否開啟操作權限");
      },
    });
  };

  const postRequest_separate = () => {
    if (selectedSubToken === '') {
      alert("you have to select a equipment");

    }
    else if (operationType !== 'separate') {
      alert("you can't separate this component");
    }
    else {
      axios({
        method: 'POST',
        url: 'http://localhost:8001/combine/',
        data:
        {
          hand: handType,
          hat: hatType,
          glasses: glassesType,
          cloth: clothType,
          pant: pantType,
          pet: pettype,
          tokenId: TokenID
        }
      }).then((response) => {
        Separate_Contract(response.data);
        console.log(response.data)
      }).catch((error) => alert(error));
    }
  }

  const postRequest_combine = () => {
    if (selectedSubToken === '') {
      alert("you have to select a equipment");

    }
    else if (operationType !== 'combine') {
      alert("you can't combine this component");
    }
    else {
      axios({
        method: 'POST',
        url: 'http://localhost:8001/combine/',
        data:
        {
          hand: handType,
          hat: hatType,
          glasses: glassesType,
          cloth: clothType,
          pant: pantType,
          pet: pettype,
          tokenId: TokenID
        }
      }).then((response) => {
        Combine_Contract(response.data);
        console.log(response.data)
      }).catch((error) => alert(error));
    }
  }
  console.log(operationType)

  const FeedPet = async (_foodtype, _amount) => {
    if (_amount > 0) {
      switch (_foodtype) {
        case "meat":
          setMeatAmount(meatAmount - 1);
          break;
        case "banana":
          setBananaAmount(bananaAmount - 1);
          break;
        case "chocolate":
          setChocolateAmount(chocolateAmount - 1);
          break;
        default:
          break;
      }
      await axios({
        method: 'POST',
        url: 'http://localhost:8001/database/FeedPet',
        data:
        {
          Owner:user.get("ethAddress"),
          FoodType: _foodtype,
          TokenID: TokenID
        }
      }).then((response) => {
        alert(response.data);
      }).catch((error) => console.log(error));
    }
    else {
      alert("沒有食物了!")
    }
  }

  const items = [
    { name: "meat", itemImg: Meat, itemAmount: meatAmount, itemDescription: "好吃的肉" },
    { name: "banana", itemImg: Banana, itemAmount: bananaAmount, itemDescription: "好吃的香蕉" },
    { name: "chocolate", itemImg: Chocolate, itemAmount: chocolateAmount, itemDescription: "好吃的巧克力" },
  ]
  //顯示道具
  const showItems = items.map((item) => {
    return (
      <div className="itemInfo">
        <Popup
          content={item.itemDescription}
          key={item.name}
          header={item.name}
          trigger={<img className="itemImg" src={item.itemImg} alt=''></img>}
        />
        <h1>{item.name} x{item.itemAmount}</h1>
        {/* <h4 className="itemDescription">{item.itemDescription}</h4> */}
        <Button inverted color='orange' variant="contained" onClick={() => { FeedPet(item.name, item.itemAmount) }}>Use</Button>
      </div>
    )
  })

  //顯示身上裝備的配件
  const ShowEquipments = equipments.map((equipment) => {
    return (
      <div className="itemInfo">
        <h1>{equipment.name}</h1>
        <img src={equipment.imageURI} alt=''></img>
        <Button inverted color='red' variant="contained" onClick={() => { ChangeState(equipment) }}>Remove</Button>
      </div>
    )
  })

  console.log(components);
  //顯示帳號擁有可裝備的配件
  const ShowComponent = components.map((component) => {
    return (
      <div className="itemInfo">
        <h1>{component.name}</h1>
        <img src={component.image} alt=''></img>
        <Button inverted color='brown' onClick={() => { ChangeState(component) }}>select</Button>
      </div>
    )
  })

  //獲得配件 URI
  const GetMetadata = async (_id, _contract) => {
    let options = {
      contractAddress: _contract,
      functionName: "tokenURI",
      abi: [tokenURI_ABI_Pet],
      params: {
        tokenId: _id
      },
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: (response) => {
        TurnToJson(response);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  //根據index傳回address對應tokenID
  const fetchIndexTokenID = async (_index, _contract) => {
    let options = {
      contractAddress: _contract,
      functionName: "tokenOfOwnerByIndex",
      abi: [tokenOfOwnerByIndex_ABI_Pet],
      params: {
        owner: user.get("ethAddress"),
        index: _index
      },
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: (response) => {
        let id = parseInt(response._hex, 16);
        GetMetadata(id, _contract);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  //獲得component數量
  const GetBalanceOf = async (_contract) => {
    let options = {
      contractAddress: _contract,
      functionName: "balanceOf",
      abi: [balanceOf_ABI_Pet],
      params: {
        owner: user.get("ethAddress")
      },
    };
    let count;

    await contractProcessor.fetch({
      params: options,
      onSuccess: (amount) => {
        count = parseInt(amount._hex, 16);
      },
      onError: (error) => {
        console.log(error)
      },
    });
    return count;
  };

  //將MetadataURI轉成json格式
  const TurnToJson = async (_uri) => {
    await fetch(_uri)
      .then(response => response.json())
      .then(responseData => {
        setComponents(oldArray => [...oldArray, responseData])
      })
  }

  //查詢address所有的可裝備Components
  const fetchComponents = async () => {
    let j;
    for (j = 0; j < contract_List.length; j++) {
      let componentAmount = await GetBalanceOf(contract_List[j]); // 獲得各部位配件數量
      let i;
      for (i = 0; i < componentAmount; i++) {
        await fetchIndexTokenID(i, contract_List[j]); //尋找各配件部位tokenID
      }
    }
  };

  //顯示處於哪個tab
  const setLabelSelected = (selected) => {
    if (selected === 0) {
      setitemLabel("selectedTab");
      setequipmentsLabel("defaultTab");
      setcomponentLabel("defaultTab");
    }
    else if (selected === 1) {
      setitemLabel("defaultTab");
      setequipmentsLabel("selectedTab");
      setcomponentLabel("defaultTab");
    }
    else {
      setitemLabel("defaultTab");
      setequipmentsLabel("defaultTab");
      setcomponentLabel("selectedTab");
    }
  };

  const GetFoodAmount = async () => {
    await axios({
      method: 'GET',
      url: `http://localhost:8001/database/GetFoodAmount/${user.get("ethAddress")}`,
    }).then((response) => {
      setMeatAmount(response.data.meat);
      setBananaAmount(response.data.banana);
      setChocolateAmount(response.data.chocolate);
    }).catch((error) => console.log(error));
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchComponents();
      GetFoodAmount();
      InitEquipmentState();
    }
    else {
      authenticate();
    }
  }, []);

  //post 改變寵物圖片及合約寵物狀態
  useEffect(() => {
    if (isAuthenticated) {
      if (operationType === 'separate') {
        postRequest_separate();
      }
      else if (operationType === 'combine') {
        postRequest_combine();
      }
    }
    else {
      authenticate();
    }
  }, [handType, hatType, glassesType, pantType, clothType]);


  // 切換操作 reset狀態
  useEffect(() => {
    InitEquipmentState();
    setSelectedSubToken('');
    setSelectedType('');
  }, [operationType]);


  return (

    <div className="infoText">

      <div className="BtnGroup">
        <Button.Group>
          <Button animated="fade" basic inverted color='red' onClick={() => trigger(false)} size="large">
            <Button.Content visible>Back To Info</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow left' />
            </Button.Content>
          </Button>
          <Button animated="fade" basic inverted color='red' onClick={() => { window.location.reload(); }} size="large">
            <Button.Content visible>Reload</Button.Content>
            <Button.Content hidden>
              <Icon name='redo alternate' />
            </Button.Content>
          </Button>
        </Button.Group>
      </div>

      <div className="tabs">
        <input type="radio" name="tabs" id="items"/>
        <label for="items" className={itemLabel} onClick={() => { setLabelSelected(0); }}>ITEM</label>
        <div className="tabsContent">
          <section className="itemList">
            {showItems}
          </section>
        </div>

        <input type="radio" name="tabs" id="equipment" />
        <label for="equipment" className={equipmentsLabel} onClick={() => { setLabelSelected(1); setOperationType("separate"); }}>EQUIPMENT</label>
        <div className="tabsContent">
          <div className="itemList">
            {ShowEquipments}
          </div>
        </div>

        <input type="radio" name="tabs" id="component" />
        <label for="component" className={componentLabel} onClick={() => { setLabelSelected(2); setOperationType("combine"); }}>COMPONENT</label>
        <div className="tabsContent">
          <div className="itemList">
            {ShowComponent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operate;
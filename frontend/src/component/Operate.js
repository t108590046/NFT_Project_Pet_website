import React, { useEffect, useState } from "react";
import axios from 'axios'
import Meat from "../image/meat.png";
import Banana from "../image/banana.png";
import Chocolate from "../image/chocolate.png"
import Chicken from "../image/chicken.png"
import { setApprovalForAll_ABI, IsApprovedForAll_ABI, contractAddress_Cloth, contractAddress_Pant, contractAddress_Glasses, contractAddress_Pet, contractAddress_Hat, contractAddress_Hand, balanceOf_ABI_Pet, separate_One_ABI_Pet, combine_ABI_Pet, tokenOfOwnerByIndex_ABI_Pet, tokenURI_ABI_Pet } from "../abi/pet"
import { useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction } from "react-moralis";
import "./css/Operate.css";
import { Button, Icon, Popup} from "semantic-ui-react";

const Operate = ({ trigger, equipments, TokenID, pettype , setLoader}) => {
  const { user, isAuthenticated, authenticate } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const Web3Api = useMoralisWeb3Api();
  const [correctOperation, setCorrectOperation] = useState(false);
  const [components, setComponents] = useState([]);
  const [handType, setHandType] = useState('none');
  const [hatType, setHatType] = useState('none');
  const [glassesType, setGlassesType] = useState('none');
  const [clothType, setClothType] = useState('none');
  const [pantType, setPantType] = useState('none');
  const [selectedSubToken, setSelectedSubToken] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [operationType, setOperationType] = useState('');
  const [meatAmount, setMeatAmount] = useState(0);
  const [bananaAmount, setBananaAmount] = useState(0);
  const [chocolateAmount, setChocolateAmount] = useState(0);
  const [chickenAmount, setChickenAmount] = useState(0);
  const contract_List = [contractAddress_Hat, contractAddress_Hand, contractAddress_Glasses, contractAddress_Pant, contractAddress_Cloth];
  const contract_dictionary = { 'hand': contractAddress_Hand, 'hat': contractAddress_Hat, 'glasses': contractAddress_Glasses, 'cloth': contractAddress_Cloth, 'pant': contractAddress_Pant }
  const [isApprove, setIsApprove] = useState(false);

  const [disableBtn, setDisableBtn] = useState(false); 
  const [equipmentsLabel, setequipmentsLabel] = useState("defaultTab");
  const [itemLabel, setitemLabel] = useState("defaultTab");
  const [componentLabel, setcomponentLabel] = useState("defaultTab");


  const setApprove = async (_type) => {
    let options = {
      contractAddress: contract_dictionary[_type],
      functionName: "setApprovalForAll",
      abi: [setApprovalForAll_ABI],
      params: {
        approved: true,
        operator: contractAddress_Pet,
      },
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: (data) => {
        console.log(data);
        setIsApprove(true);
        InitEquipmentState();
        alert("已開啟操作權限,稍後再試一次")
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  const checkApprove = async (_type) => {
    let bool;
    let options = {
      contractAddress: contract_dictionary[_type],
      functionName: "isApprovedForAll",
      abi: [IsApprovedForAll_ABI],
      params: {
        owner: user.get("ethAddress"),
        operator: contractAddress_Pet,
      },
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: (data) => {
        bool = data;

      },
      onError: (error) => {
        alert(error);
      },
    });
    return bool;
  }

  const SetTypeNone = (type) => {
    switch (type) {
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
        setPantType("none");
        break;
      default:
    }
  }

  //初始角色裝備類型狀態
  const InitEquipmentState = () => {
    setCorrectOperation(false);
    let total = ["hand", "hat", "glasses", "cloth", "pant"]
    let equipmentList = []
    equipments.forEach((equipment) => {
      equipmentList.push(equipment.type)
      switch (equipment.type) {
        case "hand":
          setHandType(equipment.name);
          break;
        case "hat":
          setHatType(equipment.name);
          break;
        case "glasses":
          setGlassesType(equipment.name);
          break;
        case "cloth":
          setClothType(equipment.name);
          break;
        case "pant":
          setPantType(equipment.name);
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

  const checkApproveFunction = async (_type) => {
    var bool;
    await checkApprove(_type).then((data) => {
      if (!data) {
        setApprove(_type);
        bool = false;
      }
      else {
        setIsApprove(true);
        bool = true;
      }
    })
    console.log(bool)
    return bool;
  }

  console.log("correct", correctOperation);
  //改變腳色配件資訊
  const ChangeState = async (equipment) => {
    let alertText = "you selected " + equipment.name + " id: " + equipment.token_id;
    setSelectedSubToken(equipment.token_id);
    setSelectedType(equipment.type);
    if (operationType === "separate") {
      SetTypeNone(equipment.type);
      setIsApprove(true);
      setCorrectOperation(true);
    }
    else if (operationType === "combine") {
      switch (equipment.type) {
        case "hand":
          if (handType === "none") {
            checkApproveFunction(equipment.type).then((bool) => {
              if (bool) {
                setHandType(equipment.name); setCorrectOperation(true);
              }
            })
          }
          else { alertText = "error: you have been equipped " + handType; setCorrectOperation(false) };
          break;
        case "hat":
          if (hatType === "none") {
            checkApproveFunction(equipment.type).then((bool) => {
              if (bool) {
                setHatType(equipment.name); setCorrectOperation(true);
              }
            })
          }
          else { alertText = "error: you have been equipped " + hatType; setCorrectOperation(false); }
          break;
        case "glasses":
          if (glassesType === "none") {
            checkApproveFunction(equipment.type).then((bool) => {
              if (bool) {
                setGlassesType(equipment.name); setCorrectOperation(true);
              }
            })
          }
          else { alertText = "error: you have been equipped " + glassesType; setCorrectOperation(false); }
          break;
        case "cloth":
          if (clothType === "none") {
            checkApproveFunction(equipment.type).then((bool) => {
              if (bool) {
                setClothType(equipment.name); setCorrectOperation(true);
              }
            })
          }
          else { alertText = "error: you have been equipped " + clothType; setCorrectOperation(false); }
          break;
        case "pant":
          if (pantType === "none") {
            checkApproveFunction(equipment.type).then((bool) => {
              if (bool) {
                setPantType(equipment.name); setCorrectOperation(true);
              }
            })
          }
          else { alertText = "error: you have been equipped " + pantType; setCorrectOperation(false); }
          break;
        default:
          break;
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
    tokenId: TokenID,
    subId: selectedSubToken,
    selectedType: selectedType,
  })

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
          tokenId: TokenID,
          subId: selectedSubToken,
          subAddress: contract_dictionary[selectedType],
          operateType: "separate"
        }
      }).then((response) => {
        alert(response.data)
        window.location.reload();
      }).catch((error) => { alert(error); InitEquipmentState(); setDisableBtn(false);});
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
          tokenId: TokenID,
          subId: selectedSubToken,
          subAddress: contract_dictionary[selectedType],
          operateType: "combine"
        }
      }).then((response) => {
        alert(response.data);
        window.location.reload();
      }).catch((error) => { alert(error); InitEquipmentState(); setDisableBtn(false);});
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
        case "chicken":
          setChickenAmount(chickenAmount - 1);
          break;
        default:
          break;
      }
      await axios({
        method: 'POST',
        url: 'http://localhost:8001/database/FeedPet',
        data:
        {
          Owner: user.get("ethAddress"),
          FoodType: _foodtype,
          TokenID: TokenID
        }
      }).then((response) => {
        
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
    { name: "chicken", itemImg: Chicken, itemAmount: chickenAmount, itemDescription: "好吃的雞肉" },
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
        <h1 className="itemInfoName">&emsp;&emsp;&emsp;&emsp;{item.name}</h1>
        <h1 className="itemInfoAmount"> x {item.itemAmount}</h1>
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
        <Button inverted color='red' variant="contained" onClick={() => { ChangeState(equipment) }} disabled={disableBtn}>Remove</Button>
      </div>
    )
  })
  const emptyEquipment =()=> {
    if (equipments.length === 0){
      return(
        <div className="itemInfo">
        <h1 className="itemInfoEmpty">{"Empty , You can mint own component"}</h1>
      </div>
      )
    }
  }
  const emptyComponent =()=> {
    if (components.length === 0){
      return(
        <div className="itemInfo">
        <h1 className="itemInfoEmpty">{"Empty , You can mint own component"}</h1>
      </div>
      )
    }
  }

  console.log(components);
  //顯示帳號擁有可裝備的配件
  const ShowComponent = components.map((component) => {
    return (
      <div className="itemInfo">
        <h1>{component.name}</h1>
        <img src={component.image} alt=''></img>
        <Button inverted color='brown' onClick={() => { ChangeState(component) }} disabled={disableBtn}>Combine</Button>
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
      setChickenAmount(response.data.chicken);
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

  console.log(isApprove)

  //post 改變寵物圖片及合約寵物狀態
  useEffect(() => {
    if (isAuthenticated && isApprove && correctOperation) {
      alert("執行中!! 請耐心等待")
      setDisableBtn(true);
      setLoader(true);
      if (operationType === 'separate') {
        postRequest_separate();
      }
      else if (operationType === 'combine') {
        postRequest_combine();
      }
    }
    else if (!isAuthenticated) {
      authenticate();
    }
  }, [isApprove, correctOperation]);


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
          {
            /*
            <Button animated="fade" color='brown' onClick={() => trigger(false)} size="large">
            <Button.Content visible>Back To Info</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow left' />
            </Button.Content>
            </Button>
            */
          }

          <Button animated="fade" color='brown' onClick={() => { window.location.reload(); }} size="large">
            <Button.Content visible>Back To Info</Button.Content>
            <Button.Content hidden>
              <Icon name='redo alternate' />
            </Button.Content>
          </Button>
        </Button.Group>
      </div>

      <div className="tabs">
        <input type="radio" name="tabs" id="items" />
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
            {emptyEquipment()}
          </div>
        </div>

        <input type="radio" name="tabs" id="component" />
        <label for="component" className={componentLabel} onClick={() => { setLabelSelected(2); setOperationType("combine"); }}>COMPONENT</label>
        <div className="tabsContent">
          <div className="itemList">
            {ShowComponent}
            {emptyComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operate;
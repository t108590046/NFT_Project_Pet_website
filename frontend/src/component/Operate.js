import React, { useEffect, useState } from "react";
import { combine_ABI, separateOne_ABI, contractAddress } from "../abi/abi";
import axios from 'axios'
import Meat from "../image/meat.png";
import { useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction } from "react-moralis";
import "./css/Operate.css";

const Operate = ({ trigger, equipments, TokenID, _species }) => {
  const { user, isAuthenticated,authenticate } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const Web3Api = useMoralisWeb3Api();
  const [components, setComponents] = useState([]);
  const [handType, setHandType] = useState('none');
  const [hatType, setHatType] = useState('none');
  const [glassesType, setGlassesType] = useState('none');
  const [clothType, setClothType] = useState('none');
  const [pantType, setPantTyp] = useState('none');
  const [selectedSubToken, setSelectedSubToken] = useState('');
  const [operationType, setOperationType] = useState('');


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
    InitEquipmentState();
    setSelectedSubToken(equipment.token_id)
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
    pet: _species,
    tokenId: TokenID
  })

  const Separate_Contract = async (uri) => {
    let options = {
      contractAddress: contractAddress,
      functionName: "separateOne",
      abi: [separateOne_ABI],
      params: {
        tokenId: TokenID,
        subId: selectedSubToken,
        _uri: uri
      },
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        alert("Succesful Separate");
      },
      onError: (error) => {
        alert(error);
      },
    });
  };

  const Combine_Contract = async (uri) => {
    let subArray = []
    subArray.push(selectedSubToken);
    let options = {
      contractAddress: contractAddress,
      functionName: "combine",
      abi: [combine_ABI],
      params: {
        tokenId: TokenID,
        subIds: subArray,
        _uri: uri
      },
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        alert("Succesful Combine");
      },
      onError: (error) => {
        alert(error);
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
          pet: _species,
          tokenId: TokenID
        }
      }).then((response) => {
        Separate_Contract(response.data);
        console.log(response.data)
      }).catch((error) => console.log(error));
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
          pet: _species,
          tokenId: TokenID
        }
      }).then((response) => {
        Combine_Contract(response.data);
        console.log(response.data)
      }).catch((error) => console.log(error));
    }
  }
  console.log(operationType)
  //顯示身上裝備的配件
  const ShowEquipments = equipments.map((equipment) => {
    return (
      <div className="itemInfo">
        <p>{equipment.name}</p>
        <img src={equipment.imageURI} alt=''></img>
        <button onClick={() => { ChangeState(equipment) }}>select</button>
      </div>
    )
  })
  //顯示帳號擁有可裝備的配件
  const ShowComponent = components.map((data) => {
    let tempComponent = JSON.parse(data.metadata)
    let component =
    {
      type: tempComponent.local_image.slice(28, -4),
      name: tempComponent.name,
      token_id: tempComponent.token_id,
      image: tempComponent.image
    }
    return (
      <div className="itemInfo">
        <p>{component.name}</p>
        <img src={component.image} alt=''></img>
        <button onClick={() => { ChangeState(component) }}>select</button>
      </div>
    )
  })

  //查詢address所有的可裝備Components
  const fetchComponents = async () => {
    const options = {
      chain: "mumbai",
      address: user.get("ethAddress"),
      token_address: contractAddress,
    };
    const mumbaiNFTs = await Web3Api.account.getNFTsForContract(options);
    mumbaiNFTs.result.forEach((data) => {
      if (parseInt(data.token_id) > 8000) setComponents(oldArray => [...oldArray, data])
    })
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchComponents();
      InitEquipmentState();
    }
    else
    {
      authenticate();
    }
  }, []);

  return (

    <div className="infoText">
      <nobr>
        <button onClick={() => trigger(false)}>&lt;一</button>
        <button onClick={() => { window.location.reload(); }}>reload</button>
        <button onClick={() => { postRequest_separate() }}>separate</button>
        <button onClick={() => { postRequest_combine() }}>combine</button>
      </nobr>
      <div className="tabs">
        <input type="radio" id="item" name="tabs" />
        <label for="item">ITEM</label>
        <div className="tabsContent">
          <section className="itemList">
            <div className="itemInfo">
              <img src={Meat}></img>
              <p>X</p>
              <p>4</p>
            </div>
            <div className="itemInfo">
              <img src={Meat}></img>
              <p>X</p>
              <p>4</p>
            </div>
          </section>
        </div>
        <input type="radio" name="tabs" id="equipment" />
        <label for="equipment" onClick={() => { InitEquipmentState(); setSelectedSubToken(''); setOperationType("separate"); }}>EQUIPMENT</label>
        <div className="tabsContent">
          <div className="itemList">
            {ShowEquipments}
          </div>
        </div>
        <input type="radio" name="tabs" id="component" />
        <label for="component" onClick={() => { InitEquipmentState(); setSelectedSubToken(''); setOperationType("combine"); }}>COMPONENT</label>
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
/*
<div className="tabsContent">
          <div className="itemList">
            {ShowEquipments}
          </div>
        </div>


              <div className="itemInfo">
        <p>{equipment.name}</p>
        <img src={equipment.imageURI} alt=''></img>
      </div>
*/ 
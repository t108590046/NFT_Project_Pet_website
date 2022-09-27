import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Operate from "./Operate";
import { getSubTokens_ABI_Pet, contractAddress_Pet, tokenURI_ABI_Pet,TextOf_ABI } from "../abi/pet"
import axios from 'axios'
import {
  useMoralis,
  useWeb3ExecuteFunction,
  useMoralisWeb3Api,
} from "react-moralis";

import "./css/NFT.css";
import { Button, Icon, Modal, Header, Input} from "semantic-ui-react";

const NFT = () => {
  const { id } = useParams()
  const { enableWeb3, Moralis, isAuthenticated, isWeb3Enabled, authenticate } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const contractProcessor = useWeb3ExecuteFunction();
  const [ImageURI, setImageURI] = useState();
  const [species, setSpecies] = useState();
  const [petType, setPetType] = useState();
  const [NFT_info_database, setNFT_info_database] = useState({});
  const [isShowOperate, setIsShowOperate] = useState(false);
  const [equipments, setEquipments] = useState([]);
  const [characteristic, setCharacteristic] = useState("")
  const [open, setOpen] = React.useState(false);

  const [newName, setNewName] = React.useState("");

  //將MetadataURI轉成json格式
  const TurnToJson = async (_uri, _type) => {
    await fetch(_uri)
      .then(response => response.json())
      .then(responseData => {
        let temp =
        {
          name: responseData.name,
          token_id: responseData.token_id,
          imageURI: responseData.image,
          type: responseData.type
        }
        if (_type === "component") setEquipments(oldArray => [...oldArray, temp]);
        else if (_type === "pet") {setImageURI(responseData.image);setPetType(responseData.attributes[5].value);}
      })
  }

  console.log(equipments);
  //獲得 pet metadata
  const GetMetadata = async (_id, _type) => {
    let input_contract_address = contractAddress_Pet;
    if (_type !== contractAddress_Pet) {
      input_contract_address = _type;
    }

    let options = {
      contractAddress: input_contract_address,
      functionName: "tokenURI",
      abi: [tokenURI_ABI_Pet],
      params: {
        tokenId: _id
      },
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: (response) => {
        //配件
        if (_type !== contractAddress_Pet) {
          TurnToJson(response, "component");
        }
        //pet
        else {
          TurnToJson(response, "pet");
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  const Hex_to_ascii = (input_hex)=>{
    var hex = input_hex.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }

  const GetAttribute = async (_attID) => {
    let options = {
      contractAddress: contractAddress_Pet,
      functionName: "textOf",
      abi: [TextOf_ABI],
      params: {
        tokenId: id,
        attrId:_attID
      },
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: (response) => {
        var str = Hex_to_ascii(response.toString().slice(2));
        if(_attID === 4)setCharacteristic(str);
        else if(_attID === 3)setSpecies(str);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  const GetSubTokens = async (_id) => {
    let options = {
      contractAddress: contractAddress_Pet,
      functionName: "getSynthesizedTokens",
      abi: [getSubTokens_ABI_Pet],
      params: {
        tokenId: _id
      },
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: (response) => {
        console.log(response);
        response.forEach(element => {
          GetMetadata(parseInt(element.id._hex, 16), element.token);
        });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  const ChangeNewName = async (_newName) => {
    await axios({
      method: 'POST',
      url: 'http://localhost:8001/database/ChangeName',
      data:
      {
        TokenID: id,
        NewName: _newName
      }
    }).then((response) => {
      alert("更改成功");
      window.location.reload();
    }).catch((error)=>{
      alert(error);
    })
  }

  const ShowSubInfo = equipments.map((equipment) => {
    return (<div>
      <div>配件:<img src={equipment.imageURI} alt=''/></div>
      <div>tokenID:{equipment.token_id}</div>
    </div>)
  })


  const setingPopup = (oldName) => {
    return (
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='large'
        // dimmer='blurring'
        trigger={<Button circular icon='edit' />}
      >
        <Header icon>
          <Icon name='edit' />
          Edit Pet Name!
        </Header>
        <Modal.Content>
          <div className='inputArea'>
            <Input icon='pencil alternate' size='huge' iconPosition='left' placeholder={oldName} value={newName} onChange={(event) => setNewName(event.target.value)} />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={() => { setOpen(false); setNewName(""); }}>
            <Icon name='remove' /> Cancel
          </Button>
          <Button color='green' inverted onClick={() => { setOpen(false); ChangeNewName(newName) }}>
            <Icon name='checkmark' /> Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  const checkPetSatiety = async()=>{
    await axios({
      method: 'GET',
      url: `http://localhost:8001/database/checkSatiety/${id}`,
      data:
      {
        TokenID: id
      }
    }).then((response) => {
      if(response.data === "pet is hungry") 
      {
        alert(response.data);
        window.location.reload();
      }
    }).catch((error)=>{alert(error)})
  }

  const GetDatabaseInfo =()=>
  {
    checkPetSatiety();
    axios({
      method: 'GET',
      url: `http://localhost:8001/database/QueryPet/${id}`,
    }).then((response) => {
      console.log(response.data)
      setNFT_info_database(response.data)
      //TurnToJson(response.data.Metadata, "image");
    }).catch((error)=>{alert(error)})
  }

  useEffect(() => {
    if (isAuthenticated && isWeb3Enabled) {
      GetMetadata(id, contractAddress_Pet);
      GetSubTokens(id);
      GetAttribute(3);//個性
      GetAttribute(4);//種族
      GetDatabaseInfo();
    }
    else if (!isWeb3Enabled) {
      enableWeb3();
    }
    else if (!isAuthenticated) {
      authenticate();
    }
  }, [isWeb3Enabled, isAuthenticated]);

  const ShowNFTInfo = () => {
    return (
      <div className="infoText">
        <div className="inner">
          <h1>{NFT_info_database.Name}</h1>
          {setingPopup(NFT_info_database.Name)}
        </div>
        <div className="inner">
          <p>寵物編號:{id}</p>
          <p>種族：{species}</p>
          <p>個性：{characteristic}</p>
          <p>親密度：{NFT_info_database.Friendship}</p>
          <p>等級：三</p>
          <p>飽足度：{NFT_info_database.Satiety}</p>
        </div>
        <div className="inner">
          {/*
          <section className="componentList">
            {ShowSubInfo}
          </section>
          */
          }
          <button className="operateButton" onClick={() => setIsShowOperate(true)}>operate</button>
        </div>
      </div>)
  }

  return (
    <div className="box">
      <div className="NFTPage">
        <section className="infoContainer">
          <div className="infoImage">
            <h2>Your Pet</h2>
            <img src={ImageURI} alt='' />
          </div>
          {isShowOperate && <Operate trigger={setIsShowOperate} TokenID={id} equipments={equipments}  pettype={petType}/>}
          {!isShowOperate && ShowNFTInfo()}
        </section>
      </div>
    </div>
  );
};

export default NFT;

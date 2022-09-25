import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Operate from "./Operate";
import { getSubTokens_ABI_Pet, contractAddress_Pet, tokenURI_ABI_Pet } from "../abi/pet"
import axios from 'axios'
import {
  useMoralis,
  useWeb3ExecuteFunction,
  useMoralisWeb3Api,
} from "react-moralis";

import "./css/NFT.css";
import background from "../image/background.png";
import { Button, Icon, Modal, Header, Input } from "semantic-ui-react";

const NFT = () => {
  const { id } = useParams()
  const { enableWeb3, Moralis, isAuthenticated, isWeb3Enabled, authenticate } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const contractProcessor = useWeb3ExecuteFunction();
  const [ImageURI, setImageURI] = useState();
  const [species, setSpecies] = useState();
  const [NFT_info_database, setNFT_info_database] = useState({});
  const [isShowOperate, setIsShowOperate] = useState(false);
  const [equipments, setEquipments] = useState([]);
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
        else if (_type === "pet") {setImageURI(responseData.image);setSpecies(responseData.attributes[5].value);}
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
            {/* 可在此加入更改name之function(設為newName) */}
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
  
    })
  }

  useEffect(() => {
    if (isAuthenticated && isWeb3Enabled) {
      GetMetadata(id, contractAddress_Pet);
      GetSubTokens(id);
      checkPetSatiety();
      //getSubTokens()
      //getMetadata(id);
      setTimeout(50);
      axios({
        method: 'GET',
        url: `http://localhost:8001/database/QueryPet/${id}`,
      }).then((response) => {
        console.log(response.data)
        setNFT_info_database(response.data)
        //TurnToJson(response.data.Metadata, "image");
      })
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
          {/* placeholder預設為舊名字 */}
        </div>
        <div className="inner">
          <p>TokenID:{id}</p>
          <p>種族：{species}</p>
          <p>個性：{NFT_info_database.Characteristics}</p>
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
      <img
        className="background"
        src={background}
        alt=''
      />
      <section className="infoContainer">
        <div className="infoImage">
          <h2>Your Pet</h2>
          <img src={ImageURI} alt='' />
        </div>
        {isShowOperate && <Operate trigger={setIsShowOperate} TokenID={id} equipments={equipments} _species={species} />}
        {!isShowOperate && ShowNFTInfo()}
      </section>
    </div>
  );
};

export default NFT;

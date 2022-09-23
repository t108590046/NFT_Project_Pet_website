import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSynthesizedTokens_ABI, contractAddress } from "../abi/abi";
import Operate from "./Operate";
import axios from 'axios'
import {
  useMoralis,
  useWeb3ExecuteFunction,
  useMoralisWeb3Api,
} from "react-moralis";

import "./css/NFT.css";
import background from "../image/background.png";
import { Button, Icon, Modal, Header, Input} from "semantic-ui-react";

const NFT = () => {
  const { id } = useParams()
  const { Moralis, isAuthenticated,isWeb3Enabled } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const contractProcessor = useWeb3ExecuteFunction();
  const [imageURI, setImageURI] = useState();
  const [species, setSpecies] = useState();
  const [NFT_info_database, setNFT_info_database] = useState({});
  const [subTokens, setSubTokens] = useState([]);
  const [isShowOperate, setIsShowOperate] = useState(false);
  const [equipments, setEquipments] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [newName, setNewName] = React.useState("");

  const enableWeb3 = async () => {
    await Moralis.enableWeb3();
  };

  console.log(equipments);
  //獲得 metadata
  const getMetadata = async (_id) => {
    let apiOptions = {
      address: contractAddress,
      token_id: _id,
      chain: "mumbai",
    };
    let result = await Web3Api.token.getTokenIdMetadata(apiOptions);
    let Metadata = JSON.parse(result.metadata);
    if (parseInt(_id) >= 8000) {
      let typeStr = Metadata.local_image.slice(28, -4)
      //配件
      let temp =
      {
        name: Metadata.name,
        token_id: Metadata.token_id,
        imageURI: Metadata.image,
        type: typeStr
      }
      setEquipments(oldArray => [...oldArray, temp])
    }
    else { //nft主體'
      console.log(Metadata.image)
      setImageURI(Metadata.image);
      setSpecies(Metadata.attributes[5].value)
    }
  }
  //獲得nft配件ID
  const getSubTokens = async () => {
    await enableWeb3();
    let options = {
      contractAddress: contractAddress,
      functionName: "getSynthesizedTokens",
      abi: [getSynthesizedTokens_ABI],
      params: {
        tokenId: id,
      },
      msgValue: 0,
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: (response) => {
        response.forEach((subToken) => {
          const subId = parseInt(subToken[1]._hex, 16);
          getMetadata(subId);
          setSubTokens(oldArray => [...oldArray, subId])
        });
      },
      onError: (error) => {
        alert("Error:" + error.message);
        window.location.reload();
      },
    });
  };

  const ShowSubInfo = equipments.map((equipment) => {
    return (<div>
      <div>配件:{equipment.name}</div>
      <div>tokenID:{equipment.token_id}</div>
    </div>)
  })

  
  const setingPopup=(oldName)=> {
    return (
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='large'
        // dimmer='blurring'
        trigger={<Button circular icon='edit'/>}
      >
        <Header icon>
          <Icon name='edit' />
          Edit Pet Name!
        </Header>
        <Modal.Content>
          <div className='inputArea'>
            <Input icon='pencil alternate' size='huge' iconPosition='left' placeholder={oldName} value={newName} onChange={(event)=>setNewName(event.target.value)}/>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={() => {setOpen(false); setNewName("");}}>
            <Icon name='remove' /> Cancel
          </Button>
          <Button color='green' inverted onClick={() => setOpen(false)}>
            {/* 可在此加入更改name之function(設為newName) */}
            <Icon name='checkmark' /> Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  useEffect(() => {
    if (isAuthenticated) {
      getSubTokens()
      getMetadata(id);
      axios({
        method: 'POST',
        url: 'http://localhost:8001/database/QueryPet',
        data:
        {
          TokenID: id
        }
      }).then((response) => {
        console.log(response.data)
        setNFT_info_database(response.data)
      })
    }
  }, [isAuthenticated]);

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
          <section className="componentList">
            {ShowSubInfo}
          </section>
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
          <img src={imageURI} alt='' />
        </div>
        {isShowOperate && <Operate trigger={setIsShowOperate} TokenID={id} equipments={equipments} _species={species} />}
        {!isShowOperate && ShowNFTInfo()}
      </section>
    </div>
  );
};



/*
  const enableWeb3 = async () => {
    await Moralis.enableWeb3();
    getSubTokens();
  };

  const getSubTokens = async () => {
    let options = {
      contractAddress: contractAddress,
      functionName: "getSynthesizedTokens",
      abi: [getSynthesizedTokens_ABI],
      params: {
        tokenId: id,
      },
      msgValue: 0,
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: (response) => {
        response.map((subToken) => {
          const subId = parseInt(subToken[1]._hex, 16);
          getMetadata(subId);
        });
      },
      onError: (error) => {
        alert("Error:" + error.message);
      },
    });
  };

  const getMetadata = async (subId) => {
    let apiOptions = {
      address: contractAddress,
      token_id: subId,
      chain: "mumbai",
    };
    let result = await Web3Api.token.getTokenIdMetadata(apiOptions);
    let subTokenMetadata = JSON.parse(result.metadata);
    console.log(result);
    let token = {
      id: result.token_id,
      image: subTokenMetadata.image,
    };
    setSubTokens((prev) => [...prev, token]);
  };

  useEffect(() => {
    enableWeb3();
  }, []);
 */

export default NFT;

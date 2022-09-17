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

const NFT = () => {
  const { id } = useParams()
  const { Moralis } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const contractProcessor = useWeb3ExecuteFunction();
  const [imageURI, setImageURI] = useState();
  const [species, setSpecies] = useState();
  const [NFT_info_database, setNFT_info_database] = useState({});
  const [subTokens, setSubTokens] = useState([]);
  const [isShowOperate, setIsShowOperate] = useState(false);
  const [equipments, setEquipments] = useState([])


  const enableWeb3 = async () => {
    await Moralis.enableWeb3();
  };
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
      //配件
      let temp =
      {
        name: Metadata.name,
        subTokenID: Metadata.token_id,
        imageURI: Metadata.image
      }
      setEquipments(oldArray => [...oldArray, temp])
    }
    else { //nft主體
      setImageURI(Metadata.image);
      if (Metadata.attributes[5].value === "pet_0") setSpecies("猴子")
      else setSpecies("狗")
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
      },
    });
  };

  const ShowSubInfo = equipments.map((equipment) => { 
      return (<div>
        <div>配件:{equipment.name}</div>
        <div>tokenID:{equipment.subTokenID}</div>
        </div>)
    })

  useEffect(() => {

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
  }, []);

  const ShowNFTInfo = () => {
    return (
      <div className="infoText">
        <div className="inner">
          <h1>{NFT_info_database.Name}</h1>
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
          <img src={imageURI} alt='' />
        </div>
        {isShowOperate && <Operate trigger={setIsShowOperate} />}
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

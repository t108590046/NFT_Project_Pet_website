import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSynthesizedTokens_ABI, contractAddress } from "../abi/abi";
import { Link } from "react-router-dom";
import {
  useMoralis,
  useWeb3ExecuteFunction,
  useMoralisWeb3Api,
} from "react-moralis";

import "./css/NFT.css";
import background from "../image/background.png";

const NFT = () => {
  const {id} = useParams()
  const { Moralis } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const contractProcessor = useWeb3ExecuteFunction();
  const [imageURI,setImageURI] = useState();
  const [subTokens, setSubTokens] = useState([]);
 
  const getMetadata = async (_id) => {
    let apiOptions = {
      address: contractAddress,
      token_id: _id,
      chain: "mumbai",
    };
    let result = await Web3Api.token.getTokenIdMetadata(apiOptions);
    let Metadata = JSON.parse(result.metadata);
    setImageURI(Metadata.image);
  }

  useEffect(() => {
    getMetadata(id);
  }, []);



  return (
    <div className="box">
      <img
        className="background"
        src={background}
        alt="This is background image"
      />
      <section className="infoContainer">
        <div className="infoImage">
          <img src={imageURI} />
        </div>
        <div className="infoText">
          <div className="inner">
            <h1>Mockey</h1>
          </div>
          <div className="inner">
            <p>TokenID:{id}</p>
            <p>種族：猴子5</p>
            <p>個性：活潑</p>
            <p>親密度：一百</p>
            <p>等級：三</p>
            <p>飽足度：一百</p>
          </div>
          <div className="inner">
            <section className="componentList">
              <p>Mock </p>
              <p>Mock </p>
              <p>Mock </p>
              <p>Mock </p>
              <p>Mock </p>
            </section>
            <Link to={`/operate/1`}>
              <button className="operateButton">operate</button>
            </Link>
          </div>
        </div>
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

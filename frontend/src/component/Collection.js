import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { contractAddress_Pet, tokenOfOwnerByIndex_ABI_Pet, tokenURI_ABI_Pet } from "../abi/pet"
import { useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction } from "react-moralis";
import background from "../image/background.png";
import Moralis from "moralis";
import "./css/Collection.css";
import axios from 'axios';

const Collection = () => {
  const [Pets, setPets] = useState([]);
  const { enableWeb3, user, isAuthenticated, isWeb3Enabled, web3, authenticate } = useMoralis();
  const [amountOfNFT, setAmountOfNFT] = useState(0);
  const contractProcessor = useWeb3ExecuteFunction();
  const Web3Api = useMoralisWeb3Api();

  //將MetadataURI轉成json格式
  const TurnToJson = async (_uri) => {
    console.log(_uri);
    await fetch(_uri)
      .then(response => response.json())
      .then(responseData => {
        setPets(oldArray => [...oldArray, responseData]);
      })
  }


  //根據index傳回address對應tokenID
  const fetchIndexTokenID = async (_index) => {
    let options = {
      contractAddress: contractAddress_Pet,
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
        console.log(id);
        GetMetadata(id);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  const GetAllPetMetadata = async () => {
    var i = amountOfNFT;
    console.log(i);
    for (i = 0; i < amountOfNFT; i++) {
      await fetchIndexTokenID(i);
    }
  }
  //獲得tokenURI
  const GetMetadata = async (_id) => {
    let options = {
      contractAddress: contractAddress_Pet,
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


  //查詢address所有的NFT數量
  const fetchNFTsForContract = async () => {
    const options = {
      chain: "mumbai",
      address: user.get("ethAddress"),
      token_address: contractAddress_Pet,
    };
    const mumbaiNFTs = await Web3Api.account.getNFTsForContract(options);
    setAmountOfNFT(mumbaiNFTs.result.length);
  };
  console.log(Pets, amountOfNFT)

  //check web3 and meatamask
  useEffect(() => {
    if (isWeb3Enabled && isAuthenticated) {
      setPets([]);
      setAmountOfNFT(0);
      fetchNFTsForContract();
    }
    else if (!isWeb3Enabled) {
      enableWeb3();
    }
    else if (!isAuthenticated) {
      authenticate();
    }
  }, [isWeb3Enabled, isAuthenticated]);

  useEffect(() => {
    GetAllPetMetadata();
  }, [amountOfNFT]);

  const showNFTImage = Pets.map((data) => {
    return (
        <NavLink className="image" to={`/NFT/${data.token_id}`}>
          <img src={data.image} alt='' />
        </NavLink>
    );
  })

  return (
    <div className="box">
      <div className="collectionPage">
        <section className="showImg">
          {showNFTImage}
        </section>
      </div>
    </div>
  );
};
export default Collection;
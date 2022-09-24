import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ownerOf_ABI, contractAddress, tokenOfOwnerByIndex_ABI, tokenURI_ABI } from "../abi/abi";
import { useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction } from "react-moralis";
import background from "../image/background.png";
import Moralis from "moralis";
import "./css/Collection.css";
import axios from 'axios';

const Collection = () => {
  const [Pets, setPets] = useState([]);
  const { enableWeb3, user, isAuthenticated, isWeb3Enabled, web3,authenticate } = useMoralis();
  const [amountOfNFT, setAmountOfNFT] = useState(0);
  const contractProcessor = useWeb3ExecuteFunction();
  const Web3Api = useMoralisWeb3Api();

  //根據index傳回address對應tokenID
  const fetchIndexTokenID = async (_index) => {
    let options = {
      contractAddress: contractAddress,
      functionName: "tokenOfOwnerByIndex",
      abi: [tokenOfOwnerByIndex_ABI],
      params: {
        owner: user.get("ethAddress"),
        index: _index
      },
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: (response) => {
        let id = parseInt(response._hex, 16);
        if (id < 8000) {
          getMetadata(id);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  const getMetadata = async (_id) => {
    let apiOptions = {
      address: contractAddress,
      token_id: _id,
      chain: "mumbai",
    };
    let result = await Web3Api.token.getTokenIdMetadata(apiOptions);
    let Metadata = JSON.parse(result.metadata);
    setPets(oldArray => [...oldArray, Metadata]);
  }

  const GetAllPetMetadata = async () => {
    var i = amountOfNFT;
    console.log(i);
    for (i = 0; i < amountOfNFT; i++) {
      console.log(i);
      await fetchIndexTokenID(i);
    }
  }

  //查詢address所有的NFT
  const fetchNFTsForContract = async () => {
    const options = {
      chain: "mumbai",
      address: user.get("ethAddress"),
      token_address: contractAddress,
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

      //getMetadata(9);
    }
    else if(!isWeb3Enabled){
      enableWeb3();
    }
    else if(!isAuthenticated){
      authenticate();
    }
  }, [isWeb3Enabled,isAuthenticated]);
  
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
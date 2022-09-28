import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { contractAddress_Pet, tokenOfOwnerByIndex_ABI_Pet, tokenURI_ABI_Pet } from "../abi/pet"
import { useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction } from "react-moralis";
import Moralis from "moralis";
import "./css/Collection.css";
import axios from 'axios';
import { Button, Header, Icon, Loader, Label } from 'semantic-ui-react'

const Collection = () => {
  const [Pets, setPets] = useState([]);
  const { enableWeb3, user, isAuthenticated, isWeb3Enabled, web3, authenticate } = useMoralis();
  const [amountOfNFT, setAmountOfNFT] = useState(0);
  const contractProcessor = useWeb3ExecuteFunction();
  const Web3Api = useMoralisWeb3Api();
  const [collectionLoadComplete, setCollectionLoadComplete] = useState(true);


  const CheckPetIndatabase = async (_id) => {
    await axios({
      method: 'GET',
      url: `http://localhost:8001/database/CheckPet/${_id}`,
    }).then((response) => {
      console.log(response.data)
    }).catch((error) => console.log(error));
  }

  async function CheckPetHungry(_id) {
    let bool = 'true';
    await axios({
      method: 'GET',
      url: `http://localhost:8001/database/checkHungry/${_id}`,
    }).then((response) => {
      bool = response.data;
    }).catch((error) => console.log(error));
    return bool;
  }

  //將MetadataURI轉成json格式
  const TurnToJson = async (_uri, _id) => {
    console.log(_uri);
    await fetch(_uri)
      .then(response => response.json())
      .then(responseData => {
        CheckPetHungry(_id).then((data)=>{
          responseData = {
            ...responseData,
            "IsHungry": data
          }
          setPets(oldArray => [...oldArray, responseData]);
        })
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
        CheckPetIndatabase(id);
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
        TurnToJson(response, _id);
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

  useEffect(() => {
    if (amountOfNFT > Pets.length) {
      setCollectionLoadComplete(false);
    }
    else {
      setCollectionLoadComplete(true);
    }
  }, [Pets]);

  const showNFTImage = Pets.map((data) => {
    var hungry = true;
    if (data.IsHungry) hungry = false;
    //在此處新增飽足感判斷
    return (
      <NavLink className="image" to={`/NFT/${data.token_id}`}>
        <img src={data.image} alt='' />
        <Icon circular inverted color='yellow' size='large' name='food' corner='top right' disabled={hungry} />
      </NavLink>
    );
  })

  return (
    <div className="box">
      <div className="collectionPage">
        <div className="CollectionTitle">
          <div className="CollectionLabel">
            <Header as='h2'>
              <Icon name='paw' size='tiny' />
              <Header.Content>
                Your Collection
                <Header.Subheader>
                  click the image to feed and manage
                </Header.Subheader>
              </Header.Content>
            </Header>
          </div>
        </div>

        <section className="showImg">
          {!collectionLoadComplete && <Loader size="large" active inline='centered'><h3>Loading Pet</h3></Loader>}
          {collectionLoadComplete && showNFTImage}
        </section>
        <a href="https://testnet.rarible.com/" target="_blank" rel="noreferrer">
          <Button icon labelPosition='right' size='large' color='black'>
              Exchange
              <Icon name='exchange' />
          </Button>
        </a>
      </div>
    </div>
  );
};
export default Collection;
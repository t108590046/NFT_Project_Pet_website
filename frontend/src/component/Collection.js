import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ownerOf_ABI, contractAddress } from "../abi/abi";
import { useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction } from "react-moralis";
import background from "../image/background.png";
import Moralis from "moralis";
import MockToken from "../image/MockToken.png";
import "./css/Collection.css";

const Collection = () => {
  const [Pets, setPets] = useState([]);
  const [Components, setComponents] = useState([]);
  const { user, isAuthenticated } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const Web3Api = useMoralisWeb3Api();

  //查詢address所有的NFT
  const fetchNFTsForContract = async () => {
    const options = {
      chain: "mumbai",
      address: user.get("ethAddress"),
      token_address: contractAddress,
    };
    const mumbaiNFTs = await Web3Api.account.getNFTsForContract(options);
    mumbaiNFTs.result.forEach((data) => {
      if (data.token_id >= "8000") {
        setComponents(oldArray => [...oldArray, data])
      }
      else {
        setPets(oldArray => [...oldArray, data])
      }
    })
  };

  //f5時更新資料
  useEffect(() => {
    fetchNFTsForContract()
  }, []);

  const showNFTImage = Pets.map((data) => {
      var imageURL = JSON.parse(data.metadata).image;
      return (
        <NavLink className="image" to={`/NFT/${JSON.parse(data.metadata).token_id}`}>
          <img src={imageURL} alt='' />
        </NavLink>
      );
    })

  console.log(Pets);
  return (
    <div className="box">
      <img
        className="background"
        src={background}
        alt=''
      />
      <div className="collection">
        <section className="showImg">
          {showNFTImage}
        </section>
      </div>
    </div>
  );
};
export default Collection;
// {
//   tokens.map((token) => {
//     return (
//       <div key={token.id}>
//         <Link to={`/collection/${token.id}`}>
//           <img src={token.img} />
//         </Link>
//         <button>{token.id}</button>
//       </div>
//     );
//   });
// }


/*
            <Link className="image" to={`/collection/1`}>
            <img src={MockToken} />
          </Link>

  const getUserNFT = async () => {
    const options = {
      address: contractAddress,
      chain: "mumbai",
    };
    const nftOwners = await Web3Api.token.getNFTOwners(options);
    let userNFT = nftOwners.result.filter(
      (nft) => nft.token_id < 100 && nft.owner_of == user.get("ethAddress")
    );
 
    let _token = [];
    userNFT.forEach((item) => {
      let img = JSON.parse(item.metadata);
      let token = {
        id: item.token_id,
        img: img.image,
      };
      _token.push(token);
    });
    setTokens(_token);
  };
  getUserNFT();
  
  useEffect(() => {
    if (isAuthenticated) {
      getUserNFT();
    }
  }, [isAuthenticated]);
*/

export const contractAddress = "0xFfc65F2D46303289AAba09400145eF533b0d5d3f";

export const mint_ABI = {
  inputs: [
    {
      internalType: "uint256",
      name: "tokenId",
      type: "uint256",
    },
  ],
  name: "mint",
  outputs: [],
  stateMutability: "payable",
  type: "function",
};

export const tokenURI_ABI = {
  inputs: [
    {
      internalType: "uint256",
      name: "tokenId",
      type: "uint256",
    },
  ],
  name: "tokenURI",
  outputs: [
    {
      internalType: "string",
      name: "",
      type: "string",
    },
  ],
  stateMutability: "view",
  type: "function",
};

export const ownerOf_ABI = {
  inputs: [
    {
      internalType: "address",
      name: "owner",
      type: "address",
    },
  ],
  name: "balanceOf",
  outputs: [
    {
      internalType: "uint256",
      name: "",
      type: "uint256",
    },
  ],
  stateMutability: "view",
  type: "function",
};
export const getSynthesizedTokens_ABI = {
  inputs: [
    {
      internalType: "uint256",
      name: "tokenId",
      type: "uint256",
    },
  ],
  name: "getSynthesizedTokens",
  outputs: [
    {
      components: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      internalType: "struct ERC3664Synthetic.SynthesizedToken[]",
      name: "",
      type: "tuple[]",
    },
  ],
  stateMutability: "view",
  type: "function",
};

export const separateOne_ABI = {
  inputs: [
    {
      internalType: "uint256",
      name: "tokenId",
      type: "uint256"
    },
    {
      internalType: "uint256",
      name: "subId",
      type: "uint256"
    },
    {
      internalType: "string",
      name: "_uri",
      type: "string"
    }
  ],
  name: "separateOne",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
};

export const combine_ABI = {
  inputs: [
    {
      internalType: "uint256",
      name: "tokenId",
      type: "uint256"
    },
    {
      internalType: "uint256[]",
      name: "subIds",
      type: "uint256[]"
    },
    {
      internalType: "string",
      name: "_uri",
      type: "string"
    }
  ],
  name: "combine",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
};

export const tokenOfOwnerByIndex_ABI = {
  inputs: [
    {
      internalType: "address",
      name: "owner",
      type: "address"
    },
    {
      internalType: "uint256",
      name: "index",
      type: "uint256"
    }
  ],
  name: "tokenOfOwnerByIndex",
  outputs: [
    {
      internalType: "uint256",
      name: "",
      type: "uint256"
    }
  ],
  stateMutability: "view",
  type: "function"
}
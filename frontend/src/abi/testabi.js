export const contractAddress_test = "0x95c30152321e6A5Dfe0E094c170463Aa9EB98BC5";

export const act_ABI = {
  input: [
    {
      internalType: "bool",
      name: "status",
      type: "bool"
    },
    {
      internalType: "string",
      name: "newURI",
      type: "string"
    }
  ],
  name: "setIsActive",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function"
};

export const mint_ABI_test = {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  };
export const balanceOf_ABI_test = {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  };

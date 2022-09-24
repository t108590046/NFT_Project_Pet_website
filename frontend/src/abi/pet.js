export const contractAddress_Pet = "0x95c30152321e6A5Dfe0E094c170463Aa9EB98BC5";
export const contractAddress_Hat = "0xAea595f675477b79C38A9323C2E11545958e0AE4";
export const contractAddress_Hand = "0xC5149278aEa479635f0cC9F199aF5016c862D840";
export const contractAddress_Glasses = "0x1448c7338D99286a46099559bDEd5869d708823c";
export const contractAddress_Pant = "0xF63eD1CC8F9A63201E31c39a4693902c85EF1C0D";
export const contractAddress_Cloth = "0xE33ab82b23a484930D6e8932a5bC16b175552854";

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

export const mint_ABI_Pet = {
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
export const balanceOf_ABI_Pet = {
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

export const tokenOfOwnerByIndex_ABI_Pet = {
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
};

export const tokenURI_ABI_Pet = {
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

export const getSubTokens_ABI_Pet = {
    inputs: [
        {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
        }
    ],
    name: "getSynthesizedTokens",
    outputs: [
        {
            components: [
                {
                    internalType: "address",
                    name: "token",
                    type: "address"
                },
                {
                    internalType: "address",
                    name: "owner",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "id",
                    type: "uint256"
                }
            ],
            internalType: "struct SyntheticData.SynthesizedToken[]",
            name: "",
            type: "tuple[]"
        }
    ],
    stateMutability: "view",
    type: "function"
};

export const separate_One_ABI_Pet = {
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
            internalType: "address",
            name: "subAddress",
            type: "address"
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

export const combine_ABI_Pet = {
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
        internalType: "address[]",
        name: "subAddress",
        type: "address[]"
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
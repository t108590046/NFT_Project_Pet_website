export const contractAddress_Pet = "0x2590c52D60eD502a8e0eAF526Deb791d06Ca4011";
export const contractAddress_Hat = "0xf085c257f8fad3973632b4C3f616Ee02Bd894dc0";
export const contractAddress_Hand = "0x68abc467161496D19E2abbA808B958710ad85D70";
export const contractAddress_Glasses = "0x9850c29a7B4A2A24A236c9A89966C1e300080DBc";
export const contractAddress_Pant = "0x8460d69825D5FAEC328DFD2a1E481e5D1711490A";
export const contractAddress_Cloth = "0xeCA7B96A6036C96A345E327850292bA2CdaD2Cd8";

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
    inputs: [],
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

export const IsApprovedForAll_ABI = {
    inputs: [
        {
            internalType: "address",
            name: "owner",
            type: "address"
        },
        {
            internalType: "address",
            name: "operator",
            type: "address"
        }
    ],
    name: "isApprovedForAll",
    outputs: [
        {
            internalType: "bool",
            name: "",
            type: "bool"
        }
    ],
    stateMutability: "view",
    type: "function"
};

export const setApprovalForAll_ABI = {
    inputs: [
        {
            internalType: "address",
            name: "operator",
            type: "address"
        },
        {
            internalType: "bool",
            name: "approved",
            type: "bool"
        }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
};

export const TextOf_ABI = {
    inputs: [
        {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
        },
        {
            internalType: "uint256",
            name: "attrId",
            type: "uint256"
        }
    ],
    name: "textOf",
    outputs: [
        {
            internalType: "bytes",
            name: "",
            type: "bytes"
        }
    ],
    stateMutability: "view",
    type: "function"
};

export const Component_mint_ABI = {
    inputs: [],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
};

export const LevelOf_ABI = {
    inputs: [
        {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256"
        },
        {
            internalType: "uint256",
            name: "_attrId",
            type: "uint256"
        }
    ],
    name: "levelOf",
    outputs: [
        {
            internalType: "uint8",
            name: "",
            type: "uint8"
        }
    ],
    stateMutability: "view",
    type: "function"
};

export const Upgrade_ABI = {
    inputs: [
        {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256"
        },
        {
            internalType: "uint256",
            name: "_attrId",
            type: "uint256"
        },
        {
            internalType: "uint8",
            name: "_level",
            type: "uint8"
        }
    ],
    name: "upgrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
};
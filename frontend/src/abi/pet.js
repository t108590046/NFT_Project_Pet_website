export const contractAddress_Pet = "0xd5439412528EEC4803bfBf757Ad1Cbf921eE9DBe";
export const contractAddress_Hat = "0x7205EFA750b847F663465C1408998aba6Db60593";
export const contractAddress_Hand = "0xb8f7c87a4589Bc057CfDF6eeFd4D43D6abed5a1b";
export const contractAddress_Glasses = "0xaFdDb6FAc072858E26bddED15a08dD1981ACA815";
export const contractAddress_Pant = "0x522065c7Fb97C37C29a8F6aE630CC1A190c1b8cA";
export const contractAddress_Cloth = "0xeD5FBb309dDD0fD4eA961f96DF1b9e8d034c20c3";

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
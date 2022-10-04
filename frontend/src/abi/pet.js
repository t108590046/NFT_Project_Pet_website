export const contractAddress_Pet = "0x4E9833fc655AFc100096707214D25cB6197b25AA";
export const contractAddress_Hat = "0x1448ce136bC2828Db8EBF92BA2f8bEbB99D61Fb7";
export const contractAddress_Hand = "0x7B4eBd8Ff7c5AE10Db3045fAbcd99Cd03032D96a";
export const contractAddress_Glasses = "0x61ac0129eBf03F09BCd53bDE1ebC02f2FA92374A";
export const contractAddress_Pant = "0x4583df40432cca7019b598bA081F437A47426c08";
export const contractAddress_Cloth = "0x0266eD99215255Bbd6739312f8D9339CcD890E55";

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
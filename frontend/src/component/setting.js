import React, { useState, useEffect } from "react";
import { useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction } from "react-moralis";
import { contractAddress_Pet, IsApprovedForAll_ABI, contractAddress_Hat, contractAddress_Hand, contractAddress_Glasses, contractAddress_Pant, contractAddress_Cloth,setApprovalForAll_ABI } from "../abi/pet"
import Moralis from "moralis";

const Setting = () => {
    const contracts_List = [contractAddress_Hat, contractAddress_Hand, contractAddress_Glasses, contractAddress_Pant, contractAddress_Cloth];
    const contractsName_List = ["Hat", "Hand", "Glasses", "Pant", "Cloth"];
    const [hatIsApproved, setHatIsApproved] = useState(false);
    const [handIsApproved, setHandIsApproved] = useState(false);
    const [glassesIsApproved, setGlassesIsApproved] = useState(false);
    const [pantIsApproved, setPantIsApproved] = useState(false);
    const [clothIsApproved, setClothIsApproved] = useState(false);
    const { isAuthenticated, user, enableWeb3,authenticate,isWeb3Enabled } = useMoralis();
    const Web3Api = useMoralisWeb3Api();
    const contractProcessor = useWeb3ExecuteFunction();

    const SetComponentApproval = async (_address, _name,_bool)=>{
        let options = {
            contractAddress: _address,
            functionName: "setApprovalForAll",
            abi: [setApprovalForAll_ABI],
            params: {
                approved: _bool,
                operator: contractAddress_Pet,
            },
        };
        await contractProcessor.fetch({
            params: options,
            onSuccess: (data) => {
                switch (_name) {
                    case 'Hat': {
                        setHatIsApproved(_bool);
                        break;
                    }
                    case 'Hand': {
                        setHandIsApproved(_bool);
                        break;
                    }
                    case 'Glasses': {
                        setGlassesIsApproved(_bool);
                        break;
                    }
                    case 'Pant': {
                        setPantIsApproved(_bool);
                        break;
                    }
                    case 'Cloth': {
                        setClothIsApproved(_bool);
                        break;
                    }
                    default: {
                        break;
                    }
                }
                alert(`${_name} switch to ${_bool}`);
            },
            onError: (error) => {
                alert(error);
            },
        });
    }

    const GetComponentIsApporved = async (_address, _name) => {
        let options = {
            contractAddress: _address,
            functionName: "isApprovedForAll",
            abi: [IsApprovedForAll_ABI],
            params: {
                owner: user.get("ethAddress"),
                operator: contractAddress_Pet,
            },
        };
        await contractProcessor.fetch({
            params: options,
            onSuccess: (data) => {
                switch (_name) {
                    case 'Hat': {
                        setHatIsApproved(data);
                        break;
                    }
                    case 'Hand': {
                        setHandIsApproved(data);
                        break;
                    }
                    case 'Glasses': {
                        setGlassesIsApproved(data);
                        break;
                    }
                    case 'Pant': {
                        setPantIsApproved(data);
                        break;
                    }
                    case 'Cloth': {
                        setClothIsApproved(data);
                        break;
                    }
                    default: {
                        break;
                    }
                }
            },
            onError: (error) => {
                alert(error);
            },
        });
    };

    const GetAllComponentIsApporved = async () => {
        let i;
        for (i = 0; i < contracts_List.length; i++) {
            await GetComponentIsApporved(contracts_List[i], contractsName_List[i]);
        }
    }

    useEffect(() => {
        if (isWeb3Enabled && isAuthenticated) {
            GetAllComponentIsApporved();
        }
        else if (!isWeb3Enabled) {
          enableWeb3();
        }
        else if (!isAuthenticated) {
          authenticate();
        }
      }, [isWeb3Enabled, isAuthenticated]);

    const ShowComponentIsApproved = () => {
        return (
            <div>
                <div>Hat: {hatIsApproved.toString()}<button onClick={()=> {SetComponentApproval(contractAddress_Hat,"Hat",!hatIsApproved)}}>switch</button></div>
                <div>Hand: {handIsApproved.toString()}<button onClick={()=>{SetComponentApproval(contractAddress_Hand,"Hand",!handIsApproved)}}>switch</button></div>
                <div>Glasses: {glassesIsApproved.toString()}<button onClick={()=>{SetComponentApproval(contractAddress_Glasses,"Glasses",!glassesIsApproved)}}>switch</button></div>
                <div>Pant: {pantIsApproved.toString()}<button onClick={()=>{SetComponentApproval(contractAddress_Pant,"Pant",!pantIsApproved)}}>switch</button></div>
                <div>Cloth: {clothIsApproved.toString()}<button onClick={()=>{SetComponentApproval(contractAddress_Cloth,"Cloth",!clothIsApproved)}}>switch</button></div>
            </div>)
    }

    return (<div>
        <h1>配件操作權限</h1>
        <div>{ShowComponentIsApproved()}</div>
    </div>)
};

export default Setting;



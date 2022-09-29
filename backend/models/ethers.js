const { ethers ,utils } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/c6e52241ba734e3cbd1cd2685a966454");
const privateKey = process.env.PRIVATE_KEY
const address = process.env.USER_ADDRESS
const contract_address = process.env.CONTACT_ADDRESS
let walletWithProvider = new ethers.Wallet(privateKey, provider);
let abi = [
    "function tokenURI(uint256 tokenId) public view override returns (string memory)",
    "function combine(uint256 tokenId,uint256[] calldata subIds,address[] calldata subAddress,string memory _uri) public",
    "function separateOne(uint256 tokenId,uint256 subId,address subAddress,string memory _uri)",
]

const GetBalance = () => {
    provider.getBalance(address).then((balance) => {

        // 余额是 BigNumber (in wei); 格式化为 ether 字符串
        let etherString = ethers.utils.formatEther(balance);

        console.log("Balance: " + etherString);
    });
}

const GetUri = async (_id) => {

    let contract = new ethers.Contract(contract_address, abi, walletWithProvider);
    let uri = await contract.tokenURI(parseInt(_id));
    console.log(uri);
}

const Separate_Contract = async (_id,_subid,_subAddress,_uri) => {

    let contract = new ethers.Contract(contract_address, abi, walletWithProvider);
    
    try {
        let tx = await contract.separateOne(_id,_subid,_subAddress,_uri);
        await tx.wait();
        console.log("Separate sucess");
        return "Separate sucess"
    } catch (error) {
        console.log(error);
        return "Separate error"
    }
}

const Combine_Contract = async (_id,_subid,_subAddress,_uri) => {

    let contract = new ethers.Contract(contract_address, abi, walletWithProvider);
    
    try {
        let tx = await contract.combine(_id,[_subid],[_subAddress],_uri);
        await tx.wait();
        console.log("Combine sucess");
        return "Combine sucess"
    } catch (error) {
        console.log(error);
        return "Combine error"
    }
}
module.exports = { GetBalance,GetUri,Separate_Contract,Combine_Contract}
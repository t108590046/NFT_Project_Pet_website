const fs = require("fs");
const { create } = require("ipfs-http-client") ;
const INFURA_ID = process.env.INFURA_ID
const INFURA_SECRET_KEY = process.env.INFURA_SECRET_KEY
const Moralis = require("moralis/node")
const serverUrl = process.env.DAPP_URL
const appId = process.env.APP_ID
const masterKey = process.env.MASTER_KEY
const auth =
    'Basic ' + Buffer.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString('base64');

async function ipfsClient() {
    const ipfs = await create(
        {
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https",
            headers: {
                authorization: auth,
            },
        }
    );
    return ipfs;
}

const UploadMoralisIpfs = async(_filename) =>
    {
      await Moralis.start({ serverUrl, appId, masterKey })
      buffile = fs.readFileSync(_filename, {encoding: 'base64'});
      const image = "data:image/png;base64,"+ buffile; 
      const file = new Moralis.File("image.png", { base64: image });
      await file.saveIPFS({useMasterKey:true});
      return file.ipfs();
    }

//將檔案地址傳入並上傳至ipfs
const UploadFileToIpfs = async (_filename) => {
    var path = ""
    let ipfs = await ipfsClient();
    buffile = fs.readFileSync(_filename);
    await ipfs.add(buffile).then((fileinfo) => {
        console.log(fileinfo.path)
        path = "https://ipfs.io/ipfs/" + fileinfo.path;
    });
    return path;
}



module.exports = { UploadFileToIpfs ,UploadMoralisIpfs}

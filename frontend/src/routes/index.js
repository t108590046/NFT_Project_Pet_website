import React from "react";
import Homepage from "../component/HomePage";
import Market from "../component/Market";
import Mint from "../component/Mint";
import Collection from "../component/Collection";
import NFT from "../component/NFT";
import Operate from "../component/Operate";

const routes = [
    {
        path:"/",
        element:<Homepage/>
    },
    {
        path:"/market",
        element:<Market />
    },
    {
        path:"/collection",
        element:<Collection />,
    },
    {
        path:"/NFT/:id",
        element:<NFT />
    },
    {
        path:"/mint",
        element:<Mint />
    },

]
export default routes;
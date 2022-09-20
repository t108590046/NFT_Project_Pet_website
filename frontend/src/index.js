import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <MoralisProvider
      serverUrl="https://1mangfktwjyo.usemoralis.com:2053/server"
      appId="BfRq4IAT9rxq1loXwZhlZ8CWxRXXVFFOD3RXRCYT"
    >
      <BrowserRouter>
      <Header />
      <App />
      <Footer />
      </BrowserRouter>
    </MoralisProvider>
);
/*
ReactDOM.render(
  <BrowserRouter>
    <div>
      <style jsx="true" global="true">{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
    </div>
    <MoralisProvider
      serverUrl="https://1mangfktwjyo.usemoralis.com:2053/server"
      appId="BfRq4IAT9rxq1loXwZhlZ8CWxRXXVFFOD3RXRCYT"
    >
      <Header />
      <Routes>

        <Route path="/" element={<App />} />
        <Route path="/market" element={<Market />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/collection/:id" element={<NFT />} />
        <Route path="/operate/:id" element={<Operate />} />
      </Routes>
    </MoralisProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
*/



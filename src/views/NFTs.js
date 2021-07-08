import React, {useState, useEffect} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

function NFTs() {
  const [NFTs, setNFTs] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      const response = await fetch(`${process.env.REACT_APP_COVALENT_API_URL}/${process.env.REACT_APP_RSK_TESTNET_ID}/tokens/${process.env.REACT_APP_RSK_TESTNET_NFT_ACT}/nft_token_ids/?&key=${process.env.REACT_APP_COVALENT_API_KEY}`);
      const resJson = await response.json();
      setNFTs(resJson.data.items)
    }
    fetchNFTs();
  }, []);

  const createNFTElements = () => {
    return NFTs.map(nft => {
      return (
            <Card>
              <CardHeader>
                <CardTitle tag="h4">{`Token Id: ${nft.token_id}`}</CardTitle>
              </CardHeader>
              <CardBody>
                <p>{nft.contract_name ? `Contract Name: ${nft.contract_name}`: null}</p>
                <p>{nft.contract_ticker_symbol ? `Contract Ticker Symbol: ${nft.contract_ticker_symbol}`: null}</p>
                <p>{nft.supports_erc ? `Supports ERC: ${nft.supports_erc}`: null}</p>
              </CardBody>
              <img
                  style={{"margin": "50px"}}
                  src={nft.logo_url? nft.logo_url : require("assets/img/default_NFT_img.png").default}
                  alt="">
              </img>
            </Card>
      );
    })
  };

  const createNFTGrid = (nftElements) => {
    function chunkArray(arr,n){
      const r = Array(Math.ceil(arr.length/n)).fill();
      return r.map((e,i) => arr.slice(i*n, i*n+n));
    }
    const chunkedNFTArr = chunkArray(nftElements, 2);
    return chunkedNFTArr.map(nftArr => {
      return (
          <Row>
            {
              nftArr.map(nftEle => {
                return (
                  <Col md="6">
                    {nftEle}
                  </Col>
                )})
            }
          </Row>
      );
    })
  }

  return (
      <div className="content">
        {createNFTGrid(createNFTElements())}
      </div>
  );
}

export default NFTs;

import React, {useContext, useEffect, useState} from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import {AccountContext} from "../contexts/AccountContext";

function Transfers() {
  const [transfers, setTransfers] = useState([]);
  const rBTC_contract_decimals = 18;
  const accountContext = useContext(AccountContext);

  useEffect(() => {
    const fetchTransfers = async () => {
      const account = process.env.REACT_APP_RSK_TESTNET_TEST_ACT ? process.env.REACT_APP_RSK_TESTNET_TEST_ACT : accountContext.account;
      const response = await fetch(`${process.env.REACT_APP_COVALENT_API_URL}/${process.env.REACT_APP_RSK_TESTNET_ID}/address/${account}/transactions_v2/?&key=${process.env.REACT_APP_COVALENT_API_KEY}`);
      const resJson = await response.json();
      if(resJson.data) setTransfers(resJson.data.items)
    }
    fetchTransfers();
  }, [accountContext]);

  const createTransferElements = () => {
    return transfers.map((transfer, id) => {
      return(
          <tr key={id}>
            <td>{transfer.block_signed_at.replace("Z","")}</td>
            <td>{(transfer.value / 10 ** rBTC_contract_decimals) + " RBTC"}</td>
            <td>
              <a href={`${process.env.REACT_APP_RSK_TESTNET_URL}/tx/${transfer.tx_hash}`}>
              {transfer.tx_hash.substring(0,10) + "..."}
              </a>
            </td>
            <td>
              <a href={`${process.env.REACT_APP_RSK_TESTNET_URL}/address/${transfer.from_address}`}>
              {transfer.from_address.substring(0,10) + "..."}
              </a>
            </td>
            <td>
              <a href={`${process.env.REACT_APP_RSK_TESTNET_URL}/address/${transfer.to_address}`}>
                {transfer.to_address.substring(0,10) + "..."}
              </a>
            </td>
            <td >
              {transfer.successful ?
                  <i className="tim-icons icon-check-2" />
                  :
                  <i className="tim-icons icon-simple-remove" />
              }
            </td>
          </tr>
      );
    })
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Token Transfers</CardTitle>
                <p className="category">{process.env.REACT_APP_RSK_TESTNET_TEST_ACT}</p>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter"  striped responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Block Signed At</th>
                      <th>Value</th>
                      <th>Transaction Hash</th>
                      <th>From</th>
                      <th className="text-center">To</th>
                      <th>Success</th>
                    </tr>
                  </thead>
                  <tbody>
                  {createTransferElements()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Transfers;

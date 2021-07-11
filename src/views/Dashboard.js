import React, {useContext} from "react";
import {
  Row,
  Col,
} from "reactstrap";


import Accounts from "../components/Charts/Accounts";
import Balance from "../components/Charts/Balance";
import {AccountContext} from "../contexts/AccountContext";

function Dashboard() {
  const accountContext = useContext(AccountContext);
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Accounts accountContext={accountContext}/>
          </Col>
          <Col xs="12">
            <Balance accountContext={accountContext} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;

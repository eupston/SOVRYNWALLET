import React from "react";
import {
  Row,
  Col,
} from "reactstrap";


import Accounts from "../components/Charts/Accounts";
import Balance from "../components/Charts/Balance";

function Dashboard() {
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Accounts />
          </Col>
          <Col xs="12">
            <Balance />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;

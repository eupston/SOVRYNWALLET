/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";

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
        {/*<Row>*/}
        {/*  <Col lg="4">*/}
        {/*    <Card className="card-chart">*/}
        {/*      <CardHeader>*/}
        {/*        <h5 className="card-category">Total Shipments</h5>*/}
        {/*        <CardTitle tag="h3">*/}
        {/*          <i className="tim-icons icon-bell-55" style={{color:"#EDB305"}} /> 763,215*/}
        {/*        </CardTitle>*/}
        {/*      </CardHeader>*/}
        {/*      <CardBody>*/}
        {/*        <div className="chart-area">*/}
        {/*          <Line*/}
        {/*            data={chartExample2.data}*/}
        {/*            options={chartExample2.options}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      </CardBody>*/}
        {/*    </Card>*/}
        {/*  </Col>*/}
        {/*  <Col lg="4">*/}
        {/*    <Card className="card-chart">*/}
        {/*      <CardHeader>*/}
        {/*        <h5 className="card-category">Completed Tasks</h5>*/}
        {/*        <CardTitle tag="h3">*/}
        {/*          <i className="tim-icons icon-send text-success" /> 12,100K*/}
        {/*        </CardTitle>*/}
        {/*      </CardHeader>*/}
        {/*      <CardBody>*/}
        {/*        <div className="chart-area">*/}
        {/*          <Pie*/}
        {/*            data={chartExample4.data}*/}
        {/*            options={chartExample4.options}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      </CardBody>*/}
        {/*    </Card>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
      </div>
    </>
  );
}

export default Dashboard;

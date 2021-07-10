import {Line} from "react-chartjs-2";
import {Card, CardBody, CardHeader, CardTitle, Col, Row, ButtonGroup, Button} from "reactstrap";

import React, {Component} from 'react';
import {truncateFloat} from "../../utils/Numbers";

class Accounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: props.account,
            data: [],
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                tooltips: {
                    backgroundColor: "#f5f5f5",
                    titleFontColor: "#333",
                    bodyFontColor: "#666",
                    bodySpacing: 4,
                    xPadding: 12,
                    mode: "nearest",
                    intersect: 0,
                    position: "nearest",
                },
                responsive: true,
                scales: {
                    yAxes: [
                        {
                            barPercentage: 1.6,
                            gridLines: {
                                drawBorder: false,
                                color: "rgba(34,116,165,0.0)",
                                zeroLineColor: "transparent",
                            },
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 0,
                                padding: 20,
                                fontColor: "#9a9a9a",
                                callback: function(value) {
                                    return truncateFloat(value, 2);
                                }
                            },
                        },
                    ],
                    xAxes: [
                        {
                            barPercentage: 1.6,
                            gridLines: {
                                drawBorder: false,
                                color: "rgba(34,116,165,0.1)",
                                zeroLineColor: "transparent",
                            },
                            ticks: {
                                padding: 20,
                                fontColor: "#9a9a9a",
                            },
                        },
                    ],
                },
            },
            allTokens: [],
            currentToken: {},
        };
    }

    async componentDidMount() {
        const account = process.env.REACT_APP_RSK_TESTNET_TEST_ACT ? process.env.REACT_APP_RSK_TESTNET_TEST_ACT : this.state.account;
        const response = await fetch(`${process.env.REACT_APP_COVALENT_API_URL}/${process.env.REACT_APP_RSK_TESTNET_ID}/address/${account}/portfolio_v2/?&key=${process.env.REACT_APP_COVALENT_API_KEY}`)
        const resJson = await response.json();
        if(resJson.items){
            this.setState({
                allTokens: resJson.items,
                currentToken: resJson.items[0],
                currentTokenBalances: resJson.items[0].holdings.map(item => (++item.close.balance / 10** resJson.items[0].contract_decimals)).reverse(),
                currentTokenDates: resJson.items[0].holdings.map(item => item.timestamp.split("T")[0]).reverse()
            });
        }
    }

    render() {
        const chartData = (canvas) => {
            let ctx = canvas.getContext("2d");
            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

            gradientStroke.addColorStop(1, "rgba(34,116,165,0.2)");
            gradientStroke.addColorStop(0.4, "rgba(34,116,165,0.0)");
            gradientStroke.addColorStop(0, "rgba(34,116,165,0)");

            return {
                labels: this.state.currentTokenDates,
                datasets: [
                    {
                        fill: true,
                        backgroundColor: gradientStroke,
                        borderColor: "#2274A5",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "#2274A5",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#2274A5",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: this.state.currentTokenBalances,
                    },
                ],
            };
        }
        const tokenButtonGroup = () => {
            return this.state.allTokens && this.state.allTokens.map((token, id) => {
                return (
                    <ButtonGroup key={id} className="btn-group-toggle float-right" data-toggle="buttons">
                        <Button
                            key={id}
                            tag="label"
                            className={{ active: token.contract_ticker_symbol === this.state.currentToken.contract_ticker_symbol}}
                            style={{'margin-bottom': "20px"}}
                            color="info"
                            id="0"
                            size="sm"
                            onClick={() => {
                              this.setState({
                                  currentToken: token,
                                  currentTokenBalances: token.holdings.map(item => (++item.close.balance / 10** token.contract_decimals)).reverse(),
                                  currentTokenDates: token.holdings.map(item => item.timestamp.split("T")[0]).reverse()
                              })
                            }}
                        >
                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                              {token.contract_ticker_symbol}
                            </span>
                            <span className="d-block d-sm-none">
                            </span>
                        </Button>
                    </ButtonGroup>
                )
            });
        };
        return (
            <Card className="card-chart">
                <CardHeader>
                    <Row>
                        <Col className="text-left" sm="6">
                            <h5 className="card-category">Account Balance</h5>
                            <CardTitle tag="h2">{this.state.currentToken.contract_ticker_symbol ? this.state.currentToken.contract_ticker_symbol + " Historical" : null}</CardTitle>
                        </Col>
                        <Col sm="6">
                            {tokenButtonGroup()}
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                        <Line data={chartData} options={this.state.options} />
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default Accounts;
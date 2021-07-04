import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {Bar} from "react-chartjs-2";

import React, {Component} from 'react';

class Balance extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                            gridLines: {
                                drawBorder: false,
                                color: "rgba(225,78,202,0.1)",
                                zeroLineColor: "transparent",
                            },
                            ticks: {
                                suggestedMin: 60,
                                suggestedMax: 120,
                                padding: 20,
                                fontColor: "#9e9e9e",
                            },
                        },
                    ],
                    xAxes: [
                        {
                            gridLines: {
                                drawBorder: false,
                                color: "rgba(225,78,202,0.1)",
                                zeroLineColor: "transparent",
                            },
                            ticks: {
                                padding: 20,
                                fontColor: "#9e9e9e",
                            },
                        },
                    ],
                },
            }
        };
    }
    async componentDidMount() {
        const response = await fetch(`${process.env.REACT_APP_COVALENT_API_URL}/${process.env.REACT_APP_RSK_TESTNET_ID}/address/${process.env.REACT_APP_RSK_TESTNET_TEST_ACT}/balances_v2/?&key=${process.env.REACT_APP_COVALENT_API_KEY}`)
        const json = await response.json();
        console.info('balance ',json)
        this.setState({
            data: json.data.items.map(item => item.balance),
            labels: json.data.items.map(item => item.contract_ticker_symbol),
            currentBalance: json.data.items[0].balance,
            currentToken: json.data.items[0].contract_ticker_symbol,
        });
    }

    render() {
        const chartData = (canvas) => {
            let ctx = canvas.getContext("2d");

            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

            gradientStroke.addColorStop(1, "rgba(237,179,5,0.2)");
            gradientStroke.addColorStop(0.4, "rgba(237,179,5,0.0)");
            gradientStroke.addColorStop(0, "rgba(237,179,5,0)");

            return {
                labels: this.state.labels,
                datasets: [
                    {
                        label: "Token",
                        fill: true,
                        backgroundColor: gradientStroke,
                        hoverBackgroundColor: gradientStroke,
                        borderColor: "#EDB305",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        data: this.state.data,
                    },
                ],
            };
        }
        return (
            <Card className="card-chart">
                <CardHeader>
                    <Row>
                        <Col className="text-left" sm="6">
                            <h5 className="card-category">Account Balance</h5>
                            <CardTitle tag="h4">{this.state.currentBalance}</CardTitle>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                        <Bar data={chartData} options={this.state.options} />
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default Balance;
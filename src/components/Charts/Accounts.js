import {Line} from "react-chartjs-2";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";

import React, {Component} from 'react';

class Accounts extends Component {
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
                            barPercentage: 1.6,
                            gridLines: {
                                drawBorder: false,
                                color: "rgba(29,140,248,0.0)",
                                zeroLineColor: "transparent",
                            },
                            ticks: {
                                suggestedMin: 60,
                                suggestedMax: 125,
                                padding: 20,
                                fontColor: "#9a9a9a",
                            },
                        },
                    ],
                    xAxes: [
                        {
                            barPercentage: 1.6,
                            gridLines: {
                                drawBorder: false,
                                color: "rgba(29,140,248,0.1)",
                                zeroLineColor: "transparent",
                            },
                            ticks: {
                                padding: 20,
                                fontColor: "#9a9a9a",
                            },
                        },
                    ],
                },
            }
        };
    }
    async componentDidMount() {
        const response = await fetch(`${process.env.REACT_APP_COVALENT_API_URL}/${process.env.REACT_APP_RSK_TESTNET_ID}/address/${process.env.REACT_APP_RSK_TESTNET_TEST_ACT}/portfolio_v2/?&key=${process.env.REACT_APP_COVALENT_API_KEY}`)
        const json = await response.json();
        this.setState({
            data: json.items[0].holdings.map(item => item.close.balance),
            labels: json.items[0].holdings.map(item => item.timestamp)
        });
    }

    render() {
        const chartData = (canvas) => {
            let ctx = canvas.getContext("2d");
            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

            gradientStroke.addColorStop(1, "rgba(34,116,165,0.2)");
            gradientStroke.addColorStop(0.4, "rgba(34,116,165,0.0)");
            gradientStroke.addColorStop(0, "rgba(34,116,165,0)");

            return {
                labels: this.state.labels,
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
                            <CardTitle tag="h2">Historical</CardTitle>
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
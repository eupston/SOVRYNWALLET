import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Row,
    ButtonGroup,
    Button
} from "reactstrap";
import {Pie} from "react-chartjs-2";

import React, {Component} from 'react';
import {truncateFloat} from "../../utils/Numbers";
import {AccountContext} from "../../contexts/AccountContext";

class Balance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: props.accountContext.account,
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
            },
            responsive: true,
            allTokens: [],
            currentToken: {},
        };
    }

    fetchAccountBalance = async () => {
        const account = process.env.REACT_APP_RSK_TESTNET_TEST_ACT ? process.env.REACT_APP_RSK_TESTNET_TEST_ACT : this.props.accountContext.account;
        const response = await fetch(`${process.env.REACT_APP_COVALENT_API_URL}/${process.env.REACT_APP_RSK_TESTNET_ID}/address/${account}/balances_v2/?&key=${process.env.REACT_APP_COVALENT_API_KEY}`)
        return await response.json();
    };

    setAccountBalance = (responseJson) => {
        if(responseJson.data){
            this.setState({
                allTokens: responseJson.data.items,
                currentToken: responseJson.data.items[0],
            });
        }
    }

    async componentDidUpdate(prevProps){
        if(prevProps.accountContext !== this.props.accountContext){
            const resJson = await this.fetchAccountBalance();
            this.setAccountBalance(resJson);
            this.setState({
                account: this.props.accountContext.account
            });
        }
    }

    async componentDidMount() {
        const resJson = await this.fetchAccountBalance();
        this.setAccountBalance(resJson);
    }

    render() {
        const chartData = (canvas) => {
            let ctx = canvas.getContext("2d");
            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

            gradientStroke.addColorStop(1, "rgba(237,179,5,0.2)");
            gradientStroke.addColorStop(0.4, "rgba(237,179,5,0.0)");
            gradientStroke.addColorStop(0, "rgba(237,179,5,0)");

            return {
                labels: [this.state.currentToken.contract_ticker_symbol],
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
                        data: [(this.state.currentToken.balance / 10** this.state.currentToken.contract_decimals)],
                    },
                ],
            };
        }

        const tokenButtonGroup = () => {
            return this.state.allTokens && this.state.allTokens.map((token, id) => {
                return (
                    <ButtonGroup key={id} className="btn-group-toggle" data-toggle="buttons">
                        <Button
                            key={id}
                            tag="label"
                            className={{ active: token.contract_ticker_symbol === this.state.currentToken.contract_ticker_symbol}}
                            style={{'margin-bottom': "20px"}}
                            color="primary"
                            id="0"
                            size="sm"
                            onClick={() => this.setState({currentToken: token})}
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
                        <Col className="text-left" sm="10">
                            <h5 className="card-category">Account Balance</h5>
                        </Col>
                        <CardTitle style={{'margin-left': "15px" }} tag="h4">
                            {this.state.currentToken.balance ? truncateFloat((this.state.currentToken.balance / 10** this.state.currentToken.contract_decimals), 3) + " " + this.state.currentToken.contract_ticker_symbol : null}
                        </CardTitle>
                    </Row>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                        <Pie data={chartData} options={this.state.options} />
                    </div>
                </CardBody>
                <Col sm="6">
                    {tokenButtonGroup()}
                </Col>
            </Card>
        )
    }
}

export default Balance;
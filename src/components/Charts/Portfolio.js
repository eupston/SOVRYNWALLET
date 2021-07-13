import {Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {Doughnut} from "react-chartjs-2";

import React, {Component} from 'react';
import {getMarketTokenPrice} from '../../utils/priceConverter';
import {truncateFloat} from "../../utils/Numbers";

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: props.accountContext.account,
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
            currencies: ['usd', 'eur', 'nzd', 'aud', 'cny'],
            currentCurrency: "usd",
            allTokens: [],
            allTokenAllCurrency: [],
            currentTokensCurrency: []
        };
    }

    fetchAccountBalance = async () => {
        const account = process.env.REACT_APP_RSK_TESTNET_TEST_ACT ? process.env.REACT_APP_RSK_TESTNET_TEST_ACT : this.props.accountContext.account;
        const response = await fetch(`${process.env.REACT_APP_COVALENT_API_URL}/${process.env.REACT_APP_RSK_TESTNET_ID}/address/${account}/balances_v2/?&key=${process.env.REACT_APP_COVALENT_API_KEY}`)
        return await response.json();
    };

    setBalanceCurrencyValue = async (responseJson) => {
        if(responseJson.data){
            const allTokenAllCurrencyArrayProm = this.state.currencies.map(async currency => {
                const allTokensCurrentCurrencyPromise = responseJson.data.items.map(async token => {
                    const marketPrice = await getMarketTokenPrice(token.contract_ticker_symbol, currency);
                    return (token.balance / 10 ** token.contract_decimals) * marketPrice;
                })
                return {[currency] : await Promise.all(allTokensCurrentCurrencyPromise)};
            })
            const allTokenAllCurrencyArray = await Promise.all(allTokenAllCurrencyArrayProm);
            const allTokenAllCurrencyMap = Object.assign({}, ...allTokenAllCurrencyArray);
            this.setState({
                allTokens: responseJson.data.items,
                allTokenAllCurrency: allTokenAllCurrencyMap,
                allTokensCurrentCurrency: allTokenAllCurrencyMap[this.state.currentCurrency],
            });
        }
    }

    async componentDidUpdate(prevProps){
        if(prevProps.accountContext !== this.props.accountContext){
            const resJson = await this.fetchAccountBalance();
            await this.setBalanceCurrencyValue(resJson);
            this.setState({
                account: this.props.accountContext.account
            });
        }
    }

    async componentDidMount() {
        const resJson = await this.fetchAccountBalance();
        await this.setBalanceCurrencyValue(resJson);
    }

    render() {
        const chartData = (canvas) => {
            let ctx = canvas.getContext("2d");
            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

            gradientStroke.addColorStop(1, "rgba(34,116,165,0.2)");
            gradientStroke.addColorStop(0.4, "rgba(34,116,165,0.0)");
            gradientStroke.addColorStop(0, "rgba(34,116,165,0)");

            return {
                labels: this.state.allTokens.map(token => token.contract_ticker_symbol),
                datasets: [
                    {
                        fill: true,
                        backgroundColor: gradientStroke,
                        hoverBackgroundColor: gradientStroke,
                        borderColor: "#2274A5",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        data: this.state.allTokensCurrentCurrency
                    },
                ],
            };
        }

        const currencyButtonGroup = () => {
            return this.state.currencies && this.state.currencies.map((currency, id) => {
                return (
                    <ButtonGroup key={id} className="btn-group-toggle" data-toggle="buttons">
                        <Button
                            key={id}
                            tag="label"
                            className={{ active: currency === this.state.currentCurrency}}
                            style={{'margin-bottom': "20px"}}
                            color="info"
                            id="0"
                            size="sm"
                            onClick={() => this.setState({
                                currentCurrency: currency,
                                allTokensCurrentCurrency: this.state.allTokenAllCurrency[currency],
                            })}
                        >
                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                              {currency.toUpperCase()}
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
                            <h5 className="card-category">Portfolio Balance</h5>
                        </Col>
                        <CardTitle style={{'margin-left': "15px" }} tag="h4">
                            {this.state.allTokensCurrentCurrency ?
                               "$" + truncateFloat(this.state.allTokensCurrentCurrency.reduce((a, b) => {return a + b}, 0), 2) + " " + this.state.currentCurrency.toUpperCase()
                                : null
                            }
                        </CardTitle>
                    </Row>
                </CardHeader>
                <CardBody>
                    <div className="chart-area">
                        <Doughnut data={chartData} options={this.state.options} />
                    </div>
                </CardBody>
                <Col sm="6">
                    {currencyButtonGroup()}
                </Col>
            </Card>
        )
    }
}

export default Portfolio;
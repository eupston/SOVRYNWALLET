import React, {useState} from 'react';

import {Button} from "reactstrap/es";
import Web3 from "web3";
import Web3Modal from 'web3modal'
import WalletConnectProvider from 'walletconnect';
import {AccountContext} from "../../contexts/AccountContext";

const ConnectWalletButton = () => {
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    const connectToWalletHandler = async (changeAccount) => {
            const providerOptions = {
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        infuraId: "d4c7101b7a7e45fd8adaaf71881b6be4",
                    },
                },
            };
            const web3Modal = new Web3Modal({
                providerOptions
            });
            const provider = await web3Modal.connect();
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            if(accounts.length > 0){
                changeAccount(accounts[0])
                setIsWalletConnected(true);
            }
    }

    return (
        <AccountContext.Consumer>
            {({account, changeAccount}) => (
                <React.Fragment>
                <h4>{account ? `Welcome ${account.substring(0,10) + "..."}` : null} </h4>
                    {!isWalletConnected ?
                    <Button onClick={() => connectToWalletHandler(changeAccount)}>
                    Connect To Wallet
                    </Button>
                    :
                    null}
                </React.Fragment>
            )}
        </AccountContext.Consumer>
    );
};

export default ConnectWalletButton;
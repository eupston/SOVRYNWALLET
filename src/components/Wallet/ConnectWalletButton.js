import React, {useContext, useState} from 'react';

import {Button} from "reactstrap/es";
import Web3 from "web3";
import Web3Modal from 'web3modal'
import WalletConnectProvider from 'walletconnect';
import {AccountContext} from "../../contexts/AccountContext";
import './connect_wallet.css';

const ConnectWalletButton = () => {
    const accountContext = useContext(AccountContext);
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
                changeAccount(accounts[0]);
                setIsWalletConnected(true);
            }
    }

    return (
        <React.Fragment>
        <h4 className="wallet_account" >{accountContext.account ? `Welcome ${accountContext.account.substring(0,10) + "..."}` : null} </h4>
            {!isWalletConnected ?
            <Button className="connect_wallet" outline color="info" onClick={() => connectToWalletHandler(accountContext.changeAccount)}>
                Connect To Wallet
            </Button>
            :
            null}
        </React.Fragment>
    );
};

export default ConnectWalletButton;
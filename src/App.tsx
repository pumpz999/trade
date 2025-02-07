import { useState, useEffect } from 'react';
import { useAccount, useConnect, useNetwork } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import TradingInterface from './components/TradingInterface';
import AdminPanel from './components/AdminPanel';

function App() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <div className="app">
      <header>
        <h1>Meme Token Trading Platform</h1>
        {!isConnected && (
          <div className="wallet-connectors">
            <button onClick={() => connect({ connector: new MetaMaskConnector() })}>
              Connect MetaMask
            </button>
            <button onClick={() => connect({ connector: new WalletConnectConnector() })}>
              Connect WalletConnect
            </button>
            <button onClick={() => connect({ connector: new CoinbaseWalletConnector() })}>
              Connect Coinbase Wallet
            </button>
          </div>
        )}
        {isConnected && (
          <div className="wallet-info">
            <p>Connected: {address}</p>
            <p>Network: {chain?.name}</p>
          </div>
        )}
      </header>
      <main>
        {isConnected && (
          <>
            <TradingInterface />
            <AdminPanel />
          </>
        )}
      </main>
    </div>
  );
}

export default App;

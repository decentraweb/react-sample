# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

1. Clone this repository and navigate to directory.
2. Run `npm install` to install all dependencies.

## Starting the app

Run `npm start` to start the app. The app will be available at [http://localhost:3000](http://localhost:3000).

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Implementation details
### Handling queries to the API and blockchain
This app is using [TanStack Query (React Query)](https://tanstack.com/query/latest/docs/framework/react/overview)
to perform asyncronous operations. You can replace it with any other library or just use `useEffect` and `useState` hooks.

### Connecting wallet
To support connecting multiple wallets, we use [Web3Modal SDK](https://docs.walletconnect.com/web3modal/react/about?platform=ethers5) by WalletConnect.

**NOTE:** Wallet must have networks enabled:
1. For production:
    - Ethereum Mainnet
    - Polygon Mainnet
2. For development:
    - Goerli Testnet
    - Mumbai Testnet


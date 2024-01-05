import React from 'react';
import {useWeb3Modal} from "@web3modal/ethers5/react";
import {Button, Card, CardContent, Container, Typography} from "@mui/material";
import styles from "./styles.module.css";

function ConnectWallet() {
  const {open} = useWeb3Modal();
  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent className={styles.connectWallet}>
          <Typography variant="h5" gutterBottom align="center">
            Connect Wallet
          </Typography>
          <Typography align="center">In order to proceed please connect your wallet.</Typography>
          <Button variant="contained" onClick={() => open()}>Connect Wallet</Button>
        </CardContent>

      </Card>

    </Container>
  )
}

export default ConnectWallet;

import React, {useCallback} from "react";
import {AppBar, Button, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {useDisconnect, useWeb3Modal, useWeb3ModalAccount} from "@web3modal/ethers5/react";
import styles from "./styles.module.css";
import {CHAIN_NAMES} from "../../utils/setupWeb3Modal";
import PolygonLogo from "../../common/images/PolygonLogo";
import EthereumLogo from "../../common/images/EthereumLogo";

function ConnectedAccount({chainId}: { chainId: number }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {disconnect} = useDisconnect();
  const {open} = useWeb3Modal();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDisconnect = useCallback(() => {
    setAnchorEl(null);
    disconnect();
  }, [disconnect]);

  const handleSwitchNetwork = useCallback(() => {
    setAnchorEl(null);
    open({view: 'Networks'});
  }, [open]);

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button

        onClick={handleMenu}
        color="inherit"
      >
        {CHAIN_NAMES[chainId]} {chainId === 137 || chainId === 80001 ?
        <PolygonLogo className={styles.logo} color="white" size={16}/> :
        <EthereumLogo className={styles.logo} color="white" size={16}/>}
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=> window.location.href = '/my-domains'}>My Domains</MenuItem>
        <MenuItem onClick={handleSwitchNetwork}>Change Network</MenuItem>
        <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
      </Menu>
    </div>
  )
}

function AppHeader() {
  const {chainId, isConnected} = useWeb3ModalAccount();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          Decentraweb Demo
        </Typography>
        {isConnected && <ConnectedAccount chainId={chainId as number}/>}
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;

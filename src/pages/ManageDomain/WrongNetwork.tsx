import { Button } from '@mui/material';
import { Network } from '@decentraweb/core';
import { useWeb3Modal } from '@web3modal/ethers5/react';
import { useCallback } from 'react';
import AlertBlock from '../../common/AlertBlock';

interface Props {
  correctNetwork: Network;
}

function WrongNetwork({ correctNetwork }: Props) {
  const { open } = useWeb3Modal();
  const handleSwitchNetwork = useCallback(() => {
    open({ view: 'Networks' });
  }, [open]);
  const action = (
    <Button color="inherit" size="small" onClick={handleSwitchNetwork}>
      Switch
    </Button>
  );
  return (
    <AlertBlock severity="warning" action={action}>
      Domain is located on <strong>{correctNetwork}</strong> network, switch to it to edit records.
    </AlertBlock>
  );
}

export default WrongNetwork;

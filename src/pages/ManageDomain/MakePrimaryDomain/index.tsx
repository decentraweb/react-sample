import { DWEBName } from '@decentraweb/core';
import { useIsPrimaryDomain, useMakePrimaryDomain } from './hooks';
import { useAppContext } from '../../../App/context';
import { Button, CircularProgress } from '@mui/material';
import {useCallback, useEffect} from 'react';

interface Props {
  editable?: boolean;
  name: DWEBName;
}

function MakePrimaryDomain({ name, editable }: Props) {
  const { signerAddress } = useAppContext();
  const { isPending, data } = useIsPrimaryDomain(name);
  const { isPending: isSaving, mutate: setAsPrimary, reset } = useMakePrimaryDomain(name);
  useEffect(() => {
    reset();
  }, [data, reset]);
  const handleAssign = useCallback(() => {
    setAsPrimary();
  }, [setAsPrimary]);

  if (isPending || !data) {
    return null;
  }

  let primaryStatus;
  if (data.reverseMatch) {
    primaryStatus = (
      <p>
        "{name.name}" is primary domain for{' '}
        {signerAddress === data.address ? 'current wallet' : `"${data.address}"`}
      </p>
    );
  }

  let cta = null;
  if (editable && (data.address !== signerAddress || !data.reverseMatch)) {
    cta = (
      <>
        <Button variant="contained" color="primary" disabled={isSaving} onClick={handleAssign}>
          Make Primary for Current Wallet
        </Button>
      </>
    );
  }
  if(isSaving){
    cta = <CircularProgress />;
  }

  return (
    <div>
      {primaryStatus}
      {cta}
    </div>
  );
}

export default MakePrimaryDomain;

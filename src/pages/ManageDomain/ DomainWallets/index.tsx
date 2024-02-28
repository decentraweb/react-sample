import { DWEBName } from '@decentraweb/core';
import { useDomainWallets, useUpdateWallets } from './hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import WalletField from './WalletField';
import { Button } from '@mui/material';
import styles from './styles.module.css';
import FormActions from '../../../common/FormActions';
import AlertBlock from '../../../common/AlertBlock';
import {LoadingOverlay} from "../../../common/Loading";

interface Props {
  editable?: boolean;
  name: DWEBName;
}

function SavingError({ error }: { error: any }) {
  if (!error) return null;

  switch (error.code) {
    case 'ACTION_REJECTED':
      return <AlertBlock severity="error">Transaction was rejected.</AlertBlock>;

    case 'INSUFFICIENT_FUNDS':
      return <AlertBlock severity="error">Insufficient funds for transaction.</AlertBlock>;

    default:
      return (
        <AlertBlock severity="error">
          Error saving wallets. Please make sure addresses are correct.
        </AlertBlock>
      );
  }
}

function DomainWallets({ name, editable = false }: Props) {
  const { isPending, data } = useDomainWallets(name);
  const {
    isPending: isSaving,
    mutate: updateWallets,
    error: walletSavingError,
    reset: resetWalletSaving
  } = useUpdateWallets(name);
  const wallets = useMemo(() => {
    if (!data) return {};
    return data.reduce(
      (acc, wallet) => {
        acc[wallet.id] = wallet.address || '';
        return acc;
      },
      {} as Record<string, string>
    );
  }, [data]);
  const [state, setState] = useState<Record<string, string>>(wallets);
  const hasChanged = useMemo(
    () =>
      editable &&
      (Object.keys(wallets).length !== Object.keys(state).length ||
        Object.keys(wallets).some((key) => wallets[key] !== state[key])),
    [editable, wallets, state]
  );

  const handleSave = useCallback(() => {
    const delta = Object.keys(state).reduce(
      (acc, key) => {
        const updated = state[key].trim();
        if (updated !== wallets[key]) {
          acc[key] = updated;
        }
        return acc;
      },
      {} as Record<string, string>
    );
    if (!Object.keys(delta).length) return;
    updateWallets(delta);
  }, [wallets, state, updateWallets]);

  const handleReset = useCallback(() => {
    resetWalletSaving();
    setState(wallets);
  }, [resetWalletSaving, wallets]);

  useEffect(() => {
    setState(wallets);
  }, [wallets]);

  const handleChange = useCallback((id: string, address: string) => {
    resetWalletSaving();
    setState((state) => ({ ...state, [id]: address }));
  }, [resetWalletSaving]);

  let content;
  if (isPending) {
    content = <div>Loading wallets...</div>;
  } else if (!data) {
    content = <div>Error getting wallets</div>;
  } else {
    content = (
      <div>
        {Object.entries(state).map(([coinId, address]) => (
          <WalletField
            key={coinId}
            coindId={coinId}
            address={address}
            editable={editable}
            onChange={handleChange}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Wallets</h2>
      {content}
      <SavingError error={walletSavingError} />
      {editable ? (
        <FormActions>
          <Button
            disabled={!hasChanged || isSaving}
            variant="contained"
            onClick={handleSave}
          >
            Update wallets
          </Button>
          <Button disabled={isSaving || !hasChanged} variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </FormActions>
      ) : null}
      <LoadingOverlay visible={isPending || isSaving} />
    </div>
  );
}

export default DomainWallets;

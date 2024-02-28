import { errors, registrars } from '@decentraweb/core';
import React, { ReactNode, useEffect } from 'react';
import useFinishRegistration from './useFinishRegistration';
import useWaitTransaction from '../../../hooks/useWaitTransaction';
import { Alert, Button, CircularProgress, Grid, Paper } from '@mui/material';
import ErrorIcon from '@mui/icons-material/ErrorOutlineOutlined';
import styles from './styles.module.css';
import RequestAllowance from './RequestAllowance';
import LinkButton from '../../../common/LinkButton';

function Progress({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className={styles.progressContainer}>
      <CircularProgress />
      <p>{children}</p>
    </div>
  );
}

function Error({ children }: { children: ReactNode }): JSX.Element {
  return (
    <Paper className={styles.progressContainer}>
      <ErrorIcon fontSize="large" color="error" />
      {children}
    </Paper>
  );
}

interface Props {
  domain: registrars.StakedDomain;
  subdomain: string;
  approval: registrars.ApprovedRegistration;
}

function RegistrationComplete({ domain, subdomain, approval }: Props): JSX.Element | null {
  const {
    submit,
    isPending: submitPending,
    transaction,
    error: submitError
  } = useFinishRegistration(approval);
  const { isPending: isWaiting, receipt, error: waitError } = useWaitTransaction(transaction);
  const fullDomain = `${subdomain}.${domain.name}`;
  useEffect(() => {
    submit();
  }, [approval]);

  if (submitPending) {
    return <Progress>1/2 Submitting transaction</Progress>;
  }

  if (submitError instanceof errors.InsufficientAllowanceError) {
    return <RequestAllowance error={submitError} onApproved={() => submit()} />;
  }

  if (submitError instanceof errors.InsufficientBalanceError) {
    return (
      <Paper className={styles.paper}>
        <p>{submitError.message}</p>
        <Button onClick={() => submit()} disabled={submitPending}>
          Retry
        </Button>
      </Paper>
    );
  }

  if (submitError) {
    //@ts-ignore
    const message = submitError.reason || submitError.message;
    return (
      <Error>
        Failed to submit transaction
        <Alert severity="error">{message}</Alert>
        <Button onClick={() => submit()}>Retry</Button>
      </Error>
    );
  }

  if (isWaiting) {
    return <Progress>2/2 Waiting for transaction confirmation</Progress>;
  }

  if (waitError) {
    return (
      <Error>
        Failed to submit transaction
        <Alert severity="error">{waitError.message}</Alert>
      </Error>
    );
  }

  if (receipt) {
    return (
      <Paper className={styles.paper}>
        <h2>Domain Registered</h2>
        <p>
          Domain <strong>{fullDomain}</strong> is registered. You can manage it or register another
          domain
        </p>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <LinkButton color="success" variant="contained" to={`/manage/${fullDomain}`}>
              Manage domain records
            </LinkButton>
          </Grid>
          <Grid item xs={6}>
            <LinkButton color="primary" variant="contained" to="/">
              Register another domain
            </LinkButton>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  return null;
}

export default RegistrationComplete;

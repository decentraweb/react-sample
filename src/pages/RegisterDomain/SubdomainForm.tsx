import SubdomainInput from "./SubdomainInput";
import DurationSelect from "./DurationSelect";
import DomainSummary from "./DomainSummary";
import {Alert, Button, Container, Paper} from "@mui/material";
import React, {useCallback, useState} from "react";
import Loading from "../../common/Loading";
import styles from "./styles.module.css";
import useDomainStakingState from "../../hooks/useDomainStakingState";
import useDomainFees from "../../hooks/useDomainFees";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import useDomainAvailable from "../../hooks/useDomainAvailable";
import {registrars} from "@decentraweb/core";

function useValidateDomain(domain: string): { available: boolean, error: string | null } {
  const debouncedDomain = useDebouncedValue(domain, 500);
  const {data, isPending} = useDomainAvailable(debouncedDomain);
  if (debouncedDomain !== domain || isPending) {
    return {
      available: false,
      error: null,
    }
  }
  return {
    available: !!data?.available,
    error: data?.error ? data.error : null,
  };
}

interface State {
  duration: number;
  subdomain: string;
}

interface Props {
  domain: string;
  onChange: (name: string, value: string | number) => void;
  onSubmit: (subdomain: string, duration: number) => void;
}

function SubdomainForm({domain, onSubmit}: Props): JSX.Element {
  const [state, setState] = useState<State>({
    duration: registrars.DURATION.ONE_YEAR,
    subdomain: ''
  });
  const {data: stakingState, isPending} = useDomainStakingState(domain);
  const {data: serviceFees, isPending: isFeesPending} = useDomainFees();
  const fullDomain = state.subdomain.trim() ? `${state.subdomain.trim()}.${domain}` : ''
  const {available, error} = useValidateDomain(fullDomain);
  const handleChange = useCallback((name: string, value: any) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    });
  }, [setState]);

  const handleProceed = () => {
    if (!available || !stakingState?.staked) {
      return;
    }
    const d = stakingState.renewalType === 'renewed' ? state.duration : 0;
    onSubmit(state.subdomain, d);
  }

  if (isPending || !stakingState || isFeesPending || !serviceFees) {
    return (
      <Loading/>
    )
  }

  if (!stakingState.staked) {
    return (
      <Container maxWidth="xs">
        <Alert severity="error">Domain is not staked</Alert>
      </Container>
    )
  }

  return (
    <Paper className={styles.paper}>
      <SubdomainInput
        domain={domain}
        name="subdomain"
        value={state.subdomain}
        onChange={handleChange}
        error={fullDomain ? error : null}
      />
      {stakingState.renewalType === 'renewed' && (
        <DurationSelect name="duration" value={state.duration} onChange={handleChange}/>
      )}
      <DomainSummary
        name={domain}
        data={stakingState}
        registrationFee={serviceFees.registrationFee}
        renewalFee={serviceFees.renewalFee}
      />
      <Button
        disabled={!available}
        variant="contained"
        onClick={handleProceed}
      >
        Proceed Registration
      </Button>
    </Paper>
  )
}

export default SubdomainForm;

import { useParams } from 'react-router-dom';
import { Alert, Container, Typography } from '@mui/material';

import React, { useState } from 'react';
import { registrars } from '@decentraweb/core';
import SubdomainForm from './SubdomainForm';
import RegistrationApproval from './RegistrationApproval';
import useDomainStakingState from '../../hooks/useDomainStakingState';
import useDomainFees from '../../hooks/useDomainFees';
import Loading from '../../common/Loading';
import FinishRegistration from './FinishRegistration';

interface State {
  duration: number;
  subdomain: string;
  isFeeInDWEB: boolean;
  isAvailable: boolean;
  approval: registrars.ApprovedRegistration | null;
}

function RegisterDomain(): JSX.Element {
  const { domain } = useParams();
  if (!domain) {
    throw new Error('No domain provided, this should never happen');
  }
  const { data: stakingState, isPending } = useDomainStakingState(domain);
  const { data: serviceFees, isPending: isFeesPending } = useDomainFees();

  const [state, setState] = useState<State>({
    duration: registrars.DURATION.ONE_YEAR,
    subdomain: '',
    isFeeInDWEB: false,
    isAvailable: false,
    approval: null
  });

  if (isPending || !stakingState || isFeesPending || !serviceFees) {
    return <Loading />;
  }

  if (!stakingState.staked) {
    return (
      <Container maxWidth="xs">
        <Alert severity="error">Domain is not staked</Alert>
      </Container>
    );
  }

  let content;
  if (state.approval) {
    content = (
      <FinishRegistration
        domain={stakingState}
        subdomain={state.subdomain}
        approval={state.approval}
      />
    );
  } else if (state.subdomain) {
    content = (
      <RegistrationApproval
        domain={stakingState}
        subdomain={state.subdomain}
        duration={state.duration}
        isFeeInDWEB={state.isFeeInDWEB}
        onApproved={(approval) => setState({ ...state, approval })}
        onReturn={() => setState({ ...state, subdomain: '' })}
      />
    );
  } else {
    content = (
      <SubdomainForm
        domain={stakingState}
        serviceFees={serviceFees}
        onSubmit={(subdomain, duration, isFeeInDWEB) =>
          setState({ ...state, subdomain, duration, isFeeInDWEB })
        }
      />
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="h1" gutterBottom>
        Register subdomain
      </Typography>
      {content}
    </Container>
  );
}

export default RegisterDomain;

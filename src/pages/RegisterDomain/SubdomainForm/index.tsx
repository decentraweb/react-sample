import SubdomainInput from "./SubdomainInput";
import DurationSelect from "./DurationSelect";
import DomainSummary from "./DomainSummary";
import {Button, Paper} from "@mui/material";
import React, {useCallback, useState} from "react";
import styles from "../styles.module.css";
import {ServiceFees} from "../../../hooks/useDomainFees";
import useDebouncedValue from "../../../hooks/useDebouncedValue";
import useDomainAvailable from "../../../hooks/useDomainAvailable";
import {registrars} from "@decentraweb/core";
import DwebTokenCheckbox from "./DwebTokenCheckbox";
import {useAppContext} from "../../../App/context";
import CryptoAmount from "../../../common/CryptoAmount";
import {getSubdomainFees} from "../../../utils/domain";

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
  isFeeInDWEB: boolean;
}

interface Props {
  domain: registrars.StakedDomain;
  serviceFees: ServiceFees;
  onSubmit: (subdomain: string, duration: number, isFeeInDWEB: boolean) => void;
}

function SubdomainForm({domain, serviceFees, onSubmit}: Props): JSX.Element {
  const {isPolygon} = useAppContext();
  const [state, setState] = useState<State>({
    duration: registrars.DURATION.ONE_YEAR,
    subdomain: '',
    isFeeInDWEB: false,
  });

  const fullDomain = state.subdomain.trim() ? `${state.subdomain.trim()}.${domain.name}` : ''
  const {available, error} = useValidateDomain(fullDomain);

  const {total, serviceFee, ownerFee} = getSubdomainFees(
    domain,
    state.duration,
    serviceFees.registrationFee,
    serviceFees.renewalFee,
    state.isFeeInDWEB,
    isPolygon
  );
  const handleChange = useCallback((name: string, value: any) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    });
  }, [setState]);

  const handleProceed = () => {
    const d = domain.renewalType === 'renewed' ? state.duration : 0;
    onSubmit(state.subdomain, d, state.isFeeInDWEB);
  }

  return (
    <Paper className={styles.paper}>
      <SubdomainInput
        domain={domain.name}
        name="subdomain"
        value={state.subdomain}
        onChange={handleChange}
        error={fullDomain ? error : null}
      />
      {domain.renewalType === 'renewed' && (
        <DurationSelect name="duration" value={state.duration} onChange={handleChange}/>
      )}
      <DwebTokenCheckbox name="isFeeInDWEB" value={state.isFeeInDWEB} onChange={handleChange}/>
      <DomainSummary
        name={domain.name}
        data={domain}
        registrationFee={serviceFees.registrationFee}
        renewalFee={serviceFees.renewalFee}
      />
      <p>
        Total registration fee
        is <strong>${total}</strong>
      </p>
      {
        serviceFee.paidWith === ownerFee.paidWith ? (
          <p>You will be chaged <CryptoAmount amount={serviceFee.amount + ownerFee.amount}
                                               currency={serviceFee.paidWith}/></p>
        ) : (
          <>
            <p>You will be chaged:</p>
            <ol>
              <li><CryptoAmount amount={serviceFee.amount} currency={serviceFee.paidWith}/> service fee</li>
              <li><CryptoAmount amount={ownerFee.amount} currency={ownerFee.paidWith}/> owner fee</li>
            </ol>
          </>

        )
      }
      <p></p>
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

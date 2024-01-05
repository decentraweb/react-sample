import {useParams} from "react-router-dom";
import {Container, Typography} from "@mui/material";

import React, {useCallback, useState} from "react";
import {registrars} from "@decentraweb/core";
import SubdomainForm from "./SubdomainForm";
import RegistrationApproval from "./RegistrationApproval";


interface State {
  duration: number;
  subdomain: string;
  isAvailable: boolean;
  approval: registrars.ApprovedRegistration | null;
}


function RegisterDomain(): JSX.Element {
  const {domain} = useParams();
  if (!domain) {
    throw new Error("No domain provided, this should never happen");
  }


  const [state, setState] = useState<State>({
    duration: registrars.DURATION.ONE_YEAR,
    subdomain: '',
    isAvailable: false,
    approval: null,
  });


  const handleChange = useCallback((name: string, value: any) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    });
  }, [setState]);

  let content;
  if (state.subdomain) {
    content = (
      <RegistrationApproval
        domain={domain}
        subdomain={state.subdomain}
        onApproved={(approval) => setState({...state, approval})}
      />
    );
  } else {
    content = (
      <SubdomainForm
        domain={domain}
        onChange={handleChange}
        onSubmit={(subdomain, duration) => setState({...state, subdomain, duration})}
      />
    )
  }


  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="h1" gutterBottom>
        Register subdomain
      </Typography>
      {content}
    </Container>
  )
}

export default RegisterDomain;

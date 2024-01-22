import {registrars} from "@decentraweb/core";
import styles from "../styles.module.css";
import {Button, Paper} from "@mui/material";
import useReuqestApproval from "./useReuqestApproval";
import {useEffect} from "react";
import Loading from "../../../common/Loading";

interface Props {
  domain: registrars.StakedDomain;
  subdomain: string;
  duration: number;
  isFeeInDWEB: boolean;
  onApproved: (approval: registrars.ApprovedRegistration) => void;
  onReturn: () => void;
}

function RegistrationApproval({domain, subdomain, duration, isFeeInDWEB, onApproved, onReturn}: Props): JSX.Element {
  const {requestApproval, isPending, error, approval} = useReuqestApproval(domain.name, subdomain, duration, isFeeInDWEB);
  useEffect(() => {
    requestApproval()
  },[]);

  useEffect(() => {
    if(approval) {
      onApproved(approval);
    }
  }, [approval, onApproved]);

  if(isPending) {
    return (
      <Paper className={styles.paper}>
        <p>Requesting approval...</p>
        <Loading />
      </Paper>
    )
  }

  if(error) {
    return (
      <Paper className={styles.paper}>
        <p>{error.message}</p>
        <Button onClick={onReturn} disabled={isPending}>Return</Button>
      </Paper>
    )
  }

  return (
    <Paper className={styles.paper}>
      <p>Registration approved</p>
    </Paper>
  )

}

export default RegistrationApproval;

import {registrars} from "@decentraweb/core";
import styles from "./styles.module.css";
import {Paper} from "@mui/material";

interface Props {
  domain: string;
  subdomain: string;
  onApproved: (approval: registrars.ApprovedRegistration) => void;
}

function RegistrationApproval({domain, subdomain, onApproved}: Props): JSX.Element {
  return (
    <Paper className={styles.paper}>
      <p>Registration approval</p>
    </Paper>
  )

}

export default RegistrationApproval;

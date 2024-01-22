import {errors} from "@decentraweb/core";
import styles from "../styles.module.css";
import {Button, Paper} from "@mui/material";
import useSubdomainRegistrar from "../../../hooks/useSubdomainRegistrar";
import {useMutation} from "@tanstack/react-query";
import {useEffect} from "react";

interface Props {
  error: errors.InsufficientAllowanceError;
  onApproved: () => void;
}

type Token = 'WETH' | 'DWEB';

function useApproveAllowance(token: Token) {
  const registrar = useSubdomainRegistrar();
  return useMutation({
    mutationKey: ['approveAllowance', registrar?.network, token],
    mutationFn: async () => {
      return registrar.allowTokenUsage(token)
    }
  });
}

function RequestAllowance({error, onApproved}: Props): JSX.Element {
  const {mutate, isPending, data} = useApproveAllowance(error.token as Token);

  useEffect(() => {
    if(data) {
      onApproved();
    }
  }, [data, onApproved]);

  const handleApprove = () => {
    mutate();
  }

  return (
    <Paper className={styles.paper}>
      <p>{error.message}</p>
      <Button onClick={handleApprove} disabled={isPending}>Approve {error.token} usage</Button>
    </Paper>
  );
}

export default RequestAllowance;

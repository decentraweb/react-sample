import { Alert, AlertProps } from '@mui/material';
import styles from './styles.module.css';

interface Props {
  severity: AlertProps['severity'];
  action?: AlertProps['action'];
  children: React.ReactNode;
}

function AlertBlock({ severity, action, children }: Props) {
  return (
    <Alert severity={severity} action={action} className={styles.alert}>
      {children}
    </Alert>
  );
}

export default AlertBlock;

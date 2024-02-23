import { CircularProgress } from '@mui/material';
import styles from './styles.module.css';

function Loading() {
  return (
    <div className={styles.loaderContainer}>
      <CircularProgress />
    </div>
  );
}

export function LoadingOverlay({ visible = false }: { visible?: boolean }): JSX.Element {
  return (
    <div className={visible ? styles.loaderOverlayVisible : styles.loaderOverlay}>
      <CircularProgress />
    </div>
  );
}

export default Loading;

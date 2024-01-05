import {CircularProgress} from "@mui/material";
import styles from "./styles.module.css";

function Loading() {
  return (
    <div className={styles.loaderContainer}>
      <CircularProgress />
    </div>
  );
}

export default Loading;

import {useCallback} from "react";
import {Input} from "@mui/material";
import styles from "./styles.module.css";


interface Props {
  coindId: string;
  address: string;
  editable: boolean;
  onChange: (coindId: string, address: string) => void;
}

function WalletField({ coindId, address, editable, onChange }: Props) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(coindId, e.target.value);
  }, [coindId, onChange]);

  return (
    <div className={styles.field}>
      <div className={styles.coinId}>{coindId}</div>
      <Input
        fullWidth
        name={coindId}
        value={address}
        placeholder="Not set"
        readOnly={!editable}
        disabled={!editable && !address}
        onChange={handleChange}
      />
    </div>
  );
}


export default WalletField;

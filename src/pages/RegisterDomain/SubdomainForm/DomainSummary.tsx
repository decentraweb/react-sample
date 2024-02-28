import {registrars} from "@decentraweb/core";
import {Tooltip} from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import React, {ReactNode} from "react";
import styles from "../styles.module.css";


function Field({label, children}: { label: string, children: ReactNode }): JSX.Element {
  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}:</span>
      <span className={styles.value}>{children}</span>
    </div>
  )
}

interface Props {
  name: string;
  data: registrars.StakedDomain;
  registrationFee: number;
  renewalFee: number;
}

function DomainSummary({name, data, registrationFee, renewalFee}: Props): JSX.Element {
  return (
    <>
      <Field label="Registration type">{data.stakingType}</Field>
      <Field label="Registration fee">
        ${data.price + registrationFee}
        {!!registrationFee && (
          <Tooltip title={`Includes $${registrationFee} service fee`}>
            <InfoIcon fontSize="small" color="info"/>
          </Tooltip>
        )}
      </Field>
      <Field label="Renewal type">{data.renewalType === 'renewed' ? 'Renewable' : 'Permanent'}</Field>
      {data.renewalType === 'renewed' && (
        <Field label="Renewal fee">
          ${data.renewalFee + renewalFee}
          {!!renewalFee && (
            <Tooltip title={`Includes $${renewalFee} service fee`}>
              <InfoIcon fontSize="small" color="info"/>
            </Tooltip>
          )}
        </Field>
      )}
      <Field label="Subdomains per wallet">
        {data.sldPerWallet > 0 ? data.sldPerWallet : 'Unlimited'}
      </Field>
    </>
  );
}

export default DomainSummary;

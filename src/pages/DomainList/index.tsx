import React, {ReactNode} from "react";
import {Alert, Button, Card, CardActions, CardContent, Container, Grid, Tooltip, Typography} from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import useDomainStakingStateBatch from "../../hooks/useDomainStakingStateBatch";
import config from "../../config";
import {registrars} from "@decentraweb/core";
import useDomainFees from "../../hooks/useDomainFees";
import styles from "./styles.module.css";
import {Link} from "react-router-dom";
import Loading from "../../common/Loading";


interface DomainCardProps {
  registrationFee: number;
  renewalFee: number;
  data: registrars.StakedDomain
}


function Field({label, children}: { label: string, children: ReactNode }): JSX.Element {
  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}:</span>
      <span className={styles.value}>{children}</span>
    </div>
  )
}

function DomainCard({data, registrationFee, renewalFee}: DomainCardProps): JSX.Element {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {data.name}
          </Typography>
          <Field label="Registration type">{data.stakingType}</Field>
          <Field label="Registration fee">
            ${data.price + registrationFee}
            {registrationFee && (
              <Tooltip title={`Includes $${registrationFee} service fee`}>
                <InfoIcon fontSize="small" color="info"/>
              </Tooltip>
            )}
          </Field>
          <Field label="Renewal type">{data.renewalType === 'renewed' ? 'Renewable' : 'Permanent'}</Field>
          {data.renewalType === 'renewed' && (
            <Field label="Renewal fee">
              ${data.renewalFee + renewalFee}
              {renewalFee && (
                <Tooltip title={`Includes $${renewalFee} service fee`}>
                  <InfoIcon fontSize="small" color="info"/>
                </Tooltip>
              )}
            </Field>
          )}
          <Field label="Subdomains per wallet">
            {data.sldPerWallet > 0 ? data.sldPerWallet : 'Unlimited'}
          </Field>
        </CardContent>
        <CardActions className={styles.cardActions}>
          <Button size="small" variant="contained" component={Link} to={`/register/${data.name}`}>Register
            Subdomain</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

function DomainList(): JSX.Element {
  const {error, data} = useDomainStakingStateBatch(config.stakedDomains);
  const {data: fees} = useDomainFees();
  if (!data || !fees) {
    return (<Loading />);
  }

  return (
    <Container maxWidth="md">
      {error && <Alert severity="error">Something went wrong!</Alert>}
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Select a Domain:
      </Typography>
      <Grid container spacing={2} alignItems="stretch">
        {data.map((d) => d.staked && (
          <DomainCard
            key={d.name}
            data={d}
            renewalFee={fees.renewalFee}
            registrationFee={fees.registrationFee}
          />
        ))}
      </Grid>
    </Container>
  )
}

export default DomainList;

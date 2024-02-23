import {useParams} from "react-router-dom";
import useManageableDomain from "./useManageableDomain";
import {DWEBName} from "@decentraweb/core";
import {Card, CardContent, Container} from "@mui/material";
import DomainSummary from "./DomainSummary";
import WrongNetwork from "./WrongNetwork";
import DomainWallets from "./ DomainWallets";
import MakePrimaryDomain from "./MakePrimaryDomain";

function DomainRecords({name, writeable}: {name: DWEBName, writeable?: boolean}) {
  return (
    <Card>
      <CardContent>
        <DomainSummary name={name} />
        <MakePrimaryDomain name={name} editable={writeable} />
        <DomainWallets name={name} editable={writeable} />
      </CardContent>
    </Card>
  );
}

function ManageDomain() {
  const { domain } = useParams();
  if (!domain) {
    throw new Error('No domain provided, this should never happen');
  }
  const r= useManageableDomain(domain);
  let content;
  switch (r.status) {
    case 'loading':
      content = <div>Loading...</div>;
      break;
    case 'error':
      content = <div>Error loading domain</div>;
      break;
    case 'not_found':
      content = <div>Domain not found</div>;
      break;
    case 'ready':
      content = <DomainRecords name={r.name} writeable={r.isOwner} />;
      break;
    case 'wrong_network':
      content = (
        <>
          <WrongNetwork correctNetwork={r.correctNetwork} />
          <DomainRecords name={r.name} writeable={false} />;
        </>
      );
      break;

    default:
      throw new Error('Invalid status');
  }
  return (
    <Container maxWidth="md">
      <h1>Manage domain</h1>
      {content}
    </Container>
  );
}

export default ManageDomain;

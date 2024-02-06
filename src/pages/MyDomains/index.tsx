import { useAppContext } from '../../App/context';
import useOwnedDomains from './useOwnedDomains';
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import LinkButton from "../../common/LinkButton";

interface RowProps {
  name: string;
  createdAt: Date;
  expiresAt: Date | null;
}

function DomainRow({ name, createdAt, expiresAt }: RowProps): JSX.Element {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell align="center">{createdAt.toLocaleString()}</TableCell>
      <TableCell align="center">{expiresAt ? expiresAt.toLocaleString() : 'never'}</TableCell>
      <TableCell align="right">
        <LinkButton to={`/manage/${name}`}>Manage</LinkButton>
      </TableCell>
    </TableRow>
  );
}

function MyDomains() {
  const { signerAddress } = useAppContext();
  const { domains, hasNextPage, isPending, fetchNextPage } = useOwnedDomains(signerAddress);
  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Registered</TableCell>
              <TableCell align="center">Expires</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {domains.map((domain) => (
              <DomainRow
                key={domain.name}
                name={domain.name}
                createdAt={domain.createdAt}
                expiresAt={domain.expiresAt}
              />
            ))}
          </TableBody>
        </Table>
        {hasNextPage && <Button fullWidth onClick={() => fetchNextPage()}>More</Button>}
      </TableContainer>
    </Container>

  );
}

export default MyDomains;

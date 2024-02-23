import { DWEBName } from '@decentraweb/core';
import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

interface Props {
  name: DWEBName;
}

function useExpiration(name: DWEBName) {
  return useQuery({
    queryKey: ['domain-expiration', name.network, name.name],
    queryFn: async () => {
      return name.getExpirationDate();
    }
  });
}

function DomainSummary({ name }: Props) {
  const { data: expires } = useExpiration(name);

  return (
    <>
      <Typography variant="h5" component="div" marginBottom={1}>
        {name.name}
      </Typography>
      {expires !== undefined && (
        <Typography variant="body2">
          Expires: <strong>{expires ? expires.toLocaleString() : 'never'}</strong>
        </Typography>
      )}
    </>
  );
}

export default DomainSummary;

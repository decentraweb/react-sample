import {useParams} from "react-router-dom";

function ManageDomain() {
  const { domain } = useParams();
  if (!domain) {
    throw new Error('No domain provided, this should never happen');
  }
  return (
    <div>
      <h1>Manage "{domain}"</h1>
    </div>
  );
}

export default ManageDomain;

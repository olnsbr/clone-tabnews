import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const body = await response.json();
  return body;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatusInfo = "Carregando...";

  if (!isLoading && data) {
    databaseStatusInfo = (
      <>
        <div>Versão: {data.dependencies.database.version} </div>
        <div>
          Conexões Abertas: {data.dependencies.database.opened_connections}{" "}
        </div>
        <div>
          Conexões Disponíveis: {data.dependencies.database.max_connections}{" "}
        </div>
      </>
    );
  }

  return (
    <>
      <h2>Database</h2>
      <div>{databaseStatusInfo}</div>
    </>
  );
}

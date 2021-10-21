import React, { useEffect, useState } from "react";
import { loadCompany } from "./requests";

export function CompanyDetail({
  match: {
    params: { companyId },
  },
}) {
  const [company, setCompany] = useState();

  useEffect(() => {
    async function fetchData() {
      const company = await loadCompany(companyId);
      setCompany(company);
    }
    fetchData();
  }, [companyId]);

  if (!company) {
    return null;
  }
  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { JobList } from "./JobList";
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
      <h5 className="title is-5">Jobs at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>
  );
}

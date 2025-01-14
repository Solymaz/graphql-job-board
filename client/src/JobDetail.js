import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadJob } from "./requests";

export function JobDetail({
  match: {
    params: { jobId },
  },
}) {
  const [job, setJob] = useState();

  useEffect(() => {
    async function fetchData() {
      const job = await loadJob(jobId);
      setJob(job);
    }
    fetchData();
  }, [jobId]);

  if (!job) {
    return null;
  }
  return (
    <div>
      <h1 className="title">{job.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">{job.description}</div>
    </div>
  );
}

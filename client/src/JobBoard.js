import React, { useEffect, useState } from "react";
import { JobList } from "./JobList";
import { loadJobs } from "./requests";

//this function sends the graphql query as an http request
export function JobBoard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const jobs = await loadJobs();
      setJobs(jobs);
    }
    fetchData();
  }, [jobs]);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

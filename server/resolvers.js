const db = require("./db");

//the resolvers must mirrot the schema
const Query = {
  jobs: () => db.jobs.list(),
};
//here we are returning the company whose id is the same as companyId of this job
const Job = {
  company: (job) => db.companies.get(job.companyId),
};
module.exports = { Query, Job };

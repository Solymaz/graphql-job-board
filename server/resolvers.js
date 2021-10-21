const db = require("./db");

//the resolvers must mirrot the schema
//resolver is an object
//the first argument to a resolver function is the parent value
//for job/company since we are in the Query type that is the root obj and that is why we call the argument root
const Query = {
  company: (root, { id }) => db.companies.get(id),
  job: (root, args) => db.jobs.get(args.id),
  //job: (root, {id}) => db.jobs.get(id),
  jobs: () => db.jobs.list(),
  companies: () => db.companies.list(),
};
//here we are returning the company whose id is the same as companyId of this job
const Job = {
  company: (job) => db.companies.get(job.companyId),
};
module.exports = { Query, Job };

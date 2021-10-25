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

//context argument can be used to access things that are not part of gql but are provided by the application
//context can contain what we need to our gql resolvers
const Mutation = {
  createJob: (root, { input }, { user }) => {
    if (!user) {
      throw new Error("Unauthorized");
    }
    const id = db.jobs.create({ ...input, companyId: user.companyId });
    return db.jobs.get(id);
  },
};
//here we are returning the company whose id is the same as companyId of this job
const Job = {
  company: (job) => db.companies.get(job.companyId),
};

//one to many relationship between company and job
const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id),
};

module.exports = { Query, Mutation, Job, Company };

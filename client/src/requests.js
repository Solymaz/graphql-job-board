import { getAccessToken, isLoggedIn } from "./auth";

const endpointURL = "http://localhost:9000/graphql";

//a gql request always has a request but it doesn't always have variables
//therefore we can make it optional by giving it a default value. we can set it to an empty obj
async function graphqlRequest(query, variables = {}) {
  const request = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      //query: query,
      //variables: variables,
      query,
      variables,
    }),
  };
  if (isLoggedIn()) {
    request.headers["authorization"] = "Bearer " + getAccessToken();
  }
  const response = await fetch(endpointURL, request);
  const responseBody = await response.json();
  //in case of error, gql has an error property in the returned json obj
  //the error array's first property is an obj contaning error messages
  if (responseBody.errors) {
    const errorMessage = responseBody.errors
      .map((error) => error.message)
      .join("\n"); // --> map returns an array of error msgs.To have a string of masgs: we join them and separate them with a new line
    throw new Error(errorMessage);
  }
  return responseBody.data;
}

export async function createJob(input) {
  const mutation = `mutation CreateJob ($input: CreateJobInput){
    job: createJob (input: $input){
      id
      title
      company{
        id
        name
      }
    }
  }`;
  const { job } = await graphqlRequest(mutation, { input });
  return job;
}
export async function loadJob(id) {
  const query = ` query JobQuery ($id : ID!){
    job (id: $id){
        id
        title
        company {
          id
          name
        }
        description
      }
}`;
  //const data = graphqlRequest(query, { id });
  //return data.job;
  const { job } = await graphqlRequest(query, { id });
  return job;
}

export async function loadJobs() {
  const query = `
  {
      jobs {
          id
          title
          company {
            id
            name
          }
        }
  }`;
  const { jobs } = await graphqlRequest(query);
  return jobs;
}

export async function loadCompany(id) {
  const query = ` query CompanyQuery ($id : ID!){
    company (id: $id){
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }`;
  const { company } = await graphqlRequest(query, { id });
  return company;
}

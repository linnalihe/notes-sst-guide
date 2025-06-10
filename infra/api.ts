import { bucket } from "./storage";


// creating an api
export const api = new sst.aws.ApiGatewayV2("Api");

// creating an S3 bucket
export const bucket = new sst.aws.Bucket("Uploads");

api.route("GET /", {
  link: [bucket],
  handler: "packages/functions/src/api.handler",
})


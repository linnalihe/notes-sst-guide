import { bucket } from "./storage";


// creating an api
export const api = new sst.aws.ApiGatewayV2("Api");


api.route("GET /", {
  link: [bucket],
  handler: "packages/functions/src/api.handler",
})


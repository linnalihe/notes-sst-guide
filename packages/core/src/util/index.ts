import { Context, APIGatewayProxyEvent } from "aws-lambda";

export module Util {
    export function handler(
        lambda: (evt: APIGatewayProxyEvent, context: Context) => Promise<string>
    ){
        return async function(event: APIGatewayProxyEvent, context: Context) {
            let body: string, statusCode: number;

            try {
                // this part runs the lambda
                body = await lambda(event, context);
                statusCode = 200;
            } catch (error) {

                statusCode = 500;
                body = JSON.stringify({
                    error: error instanceof Error ? error.message : String(error),
                })
            }

            // Return the HTTP response
            return {
                body,
                statusCode,
            }
        }
    }
}

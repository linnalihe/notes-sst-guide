import { Resource } from "sst";
import { Util } from "@notes-sst-guide/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
    const params = {
        TableName: Resource.Notes.name,

        // KeyConditionExpression defines the condition of the query
        // will only return userId that matches
        KeyConditionExpression: "userId = :userId",

        // ExpressioinAttributeValues defines value in condition
        // userId defines userId to be the id of the author
        ExpressionAttributeValues: {
            ":userId": "123",
        }
    };

    const result = await dynamoDb.send(new QueryCommand(params));
    return JSON.stringify(result.Items);
})


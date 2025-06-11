import { Resource } from "sst";
import { Util } from "@notes-sst-guide/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async ( event ) => {
    const params = {
        TableName: Resource.Notes.name,

        // The 'Key" defines the partition key and sort key 
        // of item to be retrieved
        Key: {
            userId: "123",
            noteId: event?.pathParameters?.id,
        },
        
    };
    const result = await dynamoDb.send(new GetCommand(params));
    if(!result.Item) {
        throw new Error("Item not found");
    }

    return JSON.stringify(result.Item)
})
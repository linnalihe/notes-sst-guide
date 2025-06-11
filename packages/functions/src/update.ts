import { Resource } from "sst";
import { Util } from "@notes-sst-guide/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
    const data = JSON.parse(event.body || "{}");

    const params = {
        TableName: Resource.Notes.name,
        Key: {
            // Attribute of item to be created
            userId: "123",
            noteId: event?.pathParameters?.id, // id of note from path
        },

        // UpdateExpression is attribute to be updated
        UpdateExpression: "SET content = :content, attachment = :attachment",
        //ExpressionAttributeValues defines value in the update expression
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content || null
        },
    };

    await dynamoDb.send(new UpdateCommand(params));
    return JSON.stringify({status: true})
})


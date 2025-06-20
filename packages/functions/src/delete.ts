import { Resource } from "sst";
import { Util } from "@notes-sst-guide/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDB = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
    const params = {
        TableName: Resource.Notes.name,
        Key: {
            userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, // the id of the author
            noteId: event?.pathParameters?.id,
        }
    };

    await dynamoDB.send(new DeleteCommand(params))
    return JSON.stringify({ status: true })
})


export const bucket = new sst.aws.Bucket("Uploads", {
    // cors is enabled by default
    cors: {
        allowMethods: ["GET", "PUT"]
    }
});


// Create DynamoDB table

export const table = new sst.aws.Dynamo("Notes", {
    fields: {
        userId: "string",
        noteId: "string",
    },
    primaryIndex: { hashKey: "userId", rangeKey: "noteId"},
});


export const secret = new sst.Secret("StripeSecretKey");
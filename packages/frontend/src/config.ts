const config = {
    //frontend config
    MAX_ATTACHMENT_SIZE: 5000000,
    STRIPE_KEY: "pk_live_51P09pFH3zchXdg6DTU73jeSXp2GxqoA3JoTDJjes6wIikLj57lblTq3SwnA1k2Q29tECo53cCPq1dz5Fouu8ukNW00Pf0LDsrO",

    // Backend config
    s3: {
        REGION: import.meta.env.VITE_REGION,
        BUCKET: import.meta.env.VITE_BUCKET,
    },
    apiGateway: {
        REGION: import.meta.env.VITE_REGION,
        URL: import.meta.env.VITE_API_URL,
    },
    cognito: {
        REGION: import.meta.env.VITE_REGION,
        USER_POOL_ID: import.meta.env.VITE_USER_POOL_ID,
        APP_CLIENT_ID: import.meta.env.VITE_USER_POOL_CLIENT_ID,
        IDENTITY_POOL_ID: import.meta.env.VITE_IDENTITY_POOL_ID,
    }
}

export default config;
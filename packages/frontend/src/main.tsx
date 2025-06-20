import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import App from './App.tsx'
import { Amplify } from "aws-amplify";
import config from "./config.ts";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "notes-sst-guide",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      }
    ]
  }
})


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

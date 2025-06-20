// Checking to make sure that user is authenicated before rendering the component
// requested. Many routes contain user specific information that only the logged in
// user should be able to access

import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

interface AuthRequiredRouteProps {
    children: ReactElement
}

export default function AuthRequiredRoute({ children }: AuthRequiredRouteProps): ReactElement {
    const { pathname, search } = useLocation();
    const { isAuthenticated } = useAppContext();

    if(!isAuthenticated) {
        return <Navigate to={`/login?redirect=${pathname}${search}`} />;
    }

    return children
}
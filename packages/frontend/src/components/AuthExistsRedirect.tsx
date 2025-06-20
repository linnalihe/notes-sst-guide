// Checking to make sure to redirect the user to the homepage
// from the login or signup page if they are already logged in

import { cloneElement } from "react";
import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

interface AuthExistsRedirectProps {
    children: ReactElement
}

function queryString(name: string, url = window.location.href) {
    const parsedName = name.replace(/[[]]/g, "\\$&");
    const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, "i");
    const results = regex.exec(url)

    if(!results || !results[2]) {
        return false;
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function AuthExistsRedirect(  props : AuthExistsRedirectProps): ReactElement {
    const { isAuthenticated } = useAppContext()
    const { children } = props
    const redirectURL = queryString("redirect")

    if(isAuthenticated) {
        return <Navigate to={redirectURL || "/"} />;
    }

    return cloneElement(children, props );
}
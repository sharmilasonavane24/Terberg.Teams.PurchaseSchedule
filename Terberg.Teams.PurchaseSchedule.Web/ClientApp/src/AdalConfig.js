﻿import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';
import fetch from 'isomorphic-fetch';

export const config = {
    tenant: '0bb1bea3-0d21-4deb-b8af-35fccd2ba165',
    clientId: '91fb61c3-76a6-4e3f-a323-a67271b7ee94',
    redirectUri: window.location.origin + "/tab-auth/silent-end",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    endpoints: {
        api: 'https://graph.microsoft.com'
    }
};

export let authContext = new AuthenticationContext(config);

export const adalApiFetch = (fetch, url, options) =>
    adalFetch(authContext, config.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, config.endpoints.api);

export const getToken = () => {
    return authContext.getCachedToken(authContext.config.clientId);
};

// Loads data for the given user
export function loadUserData(loginHint, callback) {
    // Setup extra query parameters for ADAL
    // - openid and profile scope adds profile information to the id_token
    // - login_hint provides the expected user name
    if (loginHint) {
        config.extraQueryParameters = "scope=openid+profile&login_hint=" + encodeURIComponent(loginHint);
    } else {
        config.extraQueryParameters = "scope=openid+profile";
    }

    authContext = new AuthenticationContext(config);

    // See if there's a cached user and it matches the expected user
    let user = authContext.getCachedUser();
    if (user) {
        if (user.userName !== loginHint) {
            // User doesn't match, clear the cache
            authContext.clearCache();
        }
    }
    // Get the id token (which is the access token for resource = clientId)
    let token = getToken();
    if (token) {
        if (typeof callback === "function") {
            callback('', token);
        }
    } else {
        // No token, or token is expired
        authContext._renewIdToken(callback);
    }
}

export function showProfileInformation(idToken, profileCallBack) {
    var opts = {
        headers: {
            'Authorization': 'Bearer ' + idToken
        }
    };

    adalApiFetch(fetch, 'https://graph.microsoft.com/v1.0/me', opts)
    .then((response) => {
        response.json()
            .then((responseJson) => {
                if (typeof profileCallBack === "function") {
                    profileCallBack(responseJson);
                }
            })
        .catch ((error) => {
            throw new Error(error.message);
        });
    })
        .catch((error) => {
        throw new Error(error.message);
    });
}
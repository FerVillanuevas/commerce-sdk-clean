import ClientConfig, { ClientConfigInit } from './clientConfig.mjs';
import { BaseUriParameters, RequireParametersUnlessAllAreOptional, CompositeParameters } from './helpers/types.mjs';

type LoginRequest = {
    client_id?: string;
    response_type?: string;
    redirect_uri: string;
    state?: string;
    scope?: string;
    usid?: string;
    channel_id: string;
    code_challenge?: string;
} & {
    [key: string]: any;
};
type TrustedAgentTokenRequest = {
    agent_id?: string;
    client_id: string;
    channel_id: string;
    code_verifier: string;
    grant_type: string;
    login_id: string;
    idp_origin: string;
    usid?: string;
    dnt?: string;
} & {
    [key: string]: any;
};
type IntrospectResponse = {
    active: boolean;
    scope: string;
    client_id: string;
    sub: string;
    exp: number;
    username: string;
    token_type: string;
} & {
    [key: string]: any;
};
type PasswordlessLoginRequest = {
    user_id: string;
    mode: string;
    locale?: string;
    usid?: string;
    channel_id: string;
    callback_uri?: string;
} & {
    [key: string]: any;
};
type PasswordLessLoginTokenRequest = {
    grant_type: string;
    hint: string;
    pwdless_login_token: string;
    client_id?: string;
    code_verifier?: string;
} & {
    [key: string]: any;
};
type Oauth2ErrorResponse = {
    error: string;
    error_uri?: string;
    error_description?: string;
} & {
    [key: string]: any;
};
type PasswordActionVerifyRequest = {
    client_id: string;
    pwd_action_token: string;
    code_verifier: string;
    new_password: string;
    channel_id: string;
} & {
    [key: string]: any;
};
type TrustedSystemTokenRequest = {
    usid?: string;
    grant_type: string;
    hint: string;
    login_id: string;
    idp_origin: string;
    client_id: string;
    channel_id: string;
    email_id?: string;
    dnt?: string;
} & {
    [key: string]: any;
};
type PasswordActionRequest = {
    user_id: string;
    mode: string;
    channel_id: string;
    locale?: string;
    client_id?: string;
    code_challenge?: string;
    callback_uri?: string;
    idp_name?: string;
} & {
    [key: string]: any;
};
type TokenResponse = {
    access_token: string;
    id_token: string;
    refresh_token: string;
    expires_in: number;
    refresh_token_expires_in: any;
    token_type: string;
    usid: string;
    customer_id: string;
    enc_user_id: string;
    idp_access_token: string;
} & {
    [key: string]: any;
};
type TokenRequest = {
    refresh_token?: string;
    code?: string;
    usid?: string;
    grant_type: string;
    redirect_uri?: string;
    code_verifier?: string;
    client_id?: string;
    channel_id?: string;
    dnt?: string;
} & {
    [key: string]: any;
};
type TokenActionRequest = {
    token: string;
    token_type_hint?: string;
} & {
    [key: string]: any;
};
type SessionBridgeTokenRequest = {
    code: string;
    client_id: string;
    channel_id: string;
    code_verifier: string;
    dwsid: string;
    grant_type: string;
    login_id: string;
    dwsgst?: string;
    usid?: string;
    dnt?: string;
} & {
    [key: string]: any;
};
type ErrorResponse = {
    type: string;
    title?: string;
    detail?: string;
    instance?: string;
} & {
    [key: string]: any;
};
type ChangeControlled = {
    creationDate?: any;
    modificationDate?: any;
    createdBy?: string;
    lastModifiedBy?: string;
} & {
    [key: string]: any;
};
type RangeFilter = {
    [key: string]: any;
};
type ChangeControlledDataType = {
    creationDate?: any;
    modificationDate?: any;
    createdBy?: string;
    lastModifiedBy?: string;
} & {
    [key: string]: any;
};
type Error = {
    type: string;
    title?: string;
    detail?: string;
    instance?: string;
} & {
    [key: string]: any;
};
type Money = {
    currencyMnemonic?: string;
    value?: number;
} & {
    [key: string]: any;
};
type SimpleSearchResult = {
    limit: number;
    hits?: Array<object>;
    offset: any;
    total: any;
} & {
    [key: string]: any;
};
type SearchRequest = {
    limit?: number;
    query: Query;
    sorts?: Array<Sort>;
    offset?: any;
} & {
    [key: string]: any;
};
type PropertyDefinition = {
    defaultValue?: PropertyValueDefinition;
    id?: string;
    name: L10nString;
    description: L10nString;
    key?: boolean;
    localizable?: boolean;
    mandatory?: boolean;
    max?: number;
    minLength?: number;
    min?: number;
    multiValueType?: boolean;
    regularExpression?: string;
    scale?: number;
    searchable?: boolean;
    siteSpecific?: boolean;
    system?: boolean;
    unit?: L10nString;
    possibleValues?: Array<PropertyValueDefinition>;
    type: string;
    visible?: boolean;
} & {
    [key: string]: any;
};
type LocalizedString = {} & {
    [key: string]: any;
};
type PaginatedSearchResult = {
    query: Query;
    sorts?: Array<Sort>;
    limit: number;
    hits?: Array<object>;
    offset: any;
    total: any;
} & {
    [key: string]: any;
};
type ClosedObject = {} & {
    [key: string]: any;
};
type OpenObject = {} & {
    [key: string]: any;
};
type NoPropertiesAllowed = {};
type SpecifiedPropertiesAllowed = {} & {
    [key: string]: any;
};
type BoolFilter = {
    filters?: Array<Filter>;
    operator: string;
} & {
    [key: string]: any;
};
type PaginatedSearchResultBase = {
    query: Query;
    sorts?: Array<Sort>;
    limit: number;
    hits?: Array<object>;
    offset: any;
    total: any;
} & {
    [key: string]: any;
};
type MatchAllQuery = {} & {
    [key: string]: any;
};
type FilteredQuery = {
    filter: Filter;
    query: Query;
} & {
    [key: string]: any;
};
type QueryFilter = {
    query: Query;
} & {
    [key: string]: any;
};
type Query = {
    boolQuery?: BoolQuery;
    filteredQuery?: FilteredQuery;
    matchAllQuery?: MatchAllQuery;
    nestedQuery?: NestedQuery;
    termQuery?: TermQuery;
    textQuery?: TextQuery;
} & {
    [key: string]: any;
};
type TermQuery = {
    fields: Array<string>;
    operator: string;
    values?: Array<any>;
} & {
    [key: string]: any;
};
type TermFilter = {
    field: string;
    operator: string;
    values?: Array<any>;
} & {
    [key: string]: any;
};
type TextQuery = {
    fields: Array<string>;
    searchPhrase: string;
} & {
    [key: string]: any;
};
type Range2Filter = {
    filterMode?: string;
    fromField: string;
    fromInclusive?: boolean;
    fromValue?: any;
    toField: string;
    toInclusive?: boolean;
    toValue?: any;
} & {
    [key: string]: any;
};
type BoolQuery = {
    must?: Array<Query>;
    mustNot?: Array<Query>;
    should?: Array<Query>;
} & {
    [key: string]: any;
};
type SimpleSearchResultBase = {
    limit: number;
    hits?: Array<object>;
    offset: any;
    total: any;
} & {
    [key: string]: any;
};
type NestedQuery = {
    path: string;
    query: Query;
    scoreMode?: string;
} & {
    [key: string]: any;
};
type Filter = {
    boolFilter?: BoolFilter;
    queryFilter?: QueryFilter;
    range2Filter?: Range2Filter;
    rangeFilter?: RangeFilter;
    termFilter?: TermFilter;
} & {
    [key: string]: any;
};
type Sort = {
    field: string;
    sortOrder?: string;
} & {
    [key: string]: any;
};
type SearchRequestBase = {
    limit?: number;
    query: Query;
    sorts?: Array<Sort>;
    offset?: any;
} & {
    [key: string]: any;
};
type MoneyMnemonic = {
    currencyMnemonic?: string;
    value?: number;
} & {
    [key: string]: any;
};
type L10nString = {} & {
    [key: string]: any;
};
type AttributeDefinition = {
    defaultValue?: PropertyValueDefinition;
    id?: string;
    name: L10nString;
    description: L10nString;
    key?: boolean;
    localizable?: boolean;
    mandatory?: boolean;
    max?: number;
    minLength?: number;
    min?: number;
    multiValueType?: boolean;
    regularExpression?: string;
    scale?: number;
    searchable?: boolean;
    siteSpecific?: boolean;
    system?: boolean;
    unit?: L10nString;
    possibleValues?: Array<PropertyValueDefinition>;
    type: string;
    visible?: boolean;
};
type PropertyValueDefinition = {
    description: L10nString;
    displayValue: L10nString;
    id: string;
    position?: number;
    value: string;
};
/**
 * All path parameters that are used by at least one ShopperLogin method.
 */
type ShopperLoginPathParameters = {
    organizationId?: string;
};
/**
 * All query parameters that are used by at least one ShopperLogin method.
 */
type ShopperLoginQueryParameters = {
    client_id?: string;
    refresh_token?: string;
    channel_id?: string;
    hint?: string;
    redirect_uri?: string;
    response_type?: string;
    scope?: string;
    state?: string;
    usid?: string;
    code_challenge?: string;
    ui_locales?: string;
    login_id?: string;
    idp_origin?: string;
};
/**
 * All parameters that are used by ShopperLogin.
 */
type ShopperLoginParameters = ShopperLoginPathParameters & BaseUriParameters & ShopperLoginQueryParameters;
/**
* [Shopper Login and API Access Service](https://developer.salesforce.com/docs/commerce/commerce-api/references?meta=shopper-login:Summary)
* ==================================
*
* *Enable shoppers to log in more easily, stay logged in for longer, and get a more fluid and personalized shopping experience powered by Shopper APIs.*<br />
*
* Simple example:
*
* ```typescript
*   import { ShopperLogin } from "commerce-sdk-isomorphic";
*
*   const clientConfig = {
*     parameters: {
*       clientId: "XXXXXX",
*       organizationId: "XXXX",
*       shortCode: "XXX",
*       siteId: "XX"
*     }
*   };
*   const shopperLoginClient = new ShopperLogin(clientConfig);
* ```
*
* <span style="font-size:.7em; display:block; text-align: right">
* API Version: 1.39.22<br />
* Last Updated: <br />
* </span>
*
*
*/
declare class ShopperLogin<ConfigParameters extends ShopperLoginParameters & Record<string, unknown>> {
    clientConfig: ClientConfig<ConfigParameters> & {
        baseUri: string;
    };
    static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/shopper/auth/{version}";
    static readonly apiPaths: {
        authenticateCustomer: string;
        authorizePasswordlessCustomer: string;
        logoutCustomer: string;
        authorizeCustomer: string;
        getAccessToken: string;
        getSessionBridgeAccessToken: string;
        getTrustedSystemAccessToken: string;
        getTrustedAgentAuthorizationToken: string;
        getTrustedAgentAccessToken: string;
        getPasswordResetToken: string;
        resetPassword: string;
        getPasswordLessAccessToken: string;
        revokeToken: string;
        introspectToken: string;
        getUserInfo: string;
        getWellknownOpenidConfiguration: string;
        getJwksUri: string;
    };
    constructor(config: ClientConfigInit<ConfigParameters>);
    static readonly paramKeys: {
        readonly authenticateCustomer: readonly ["organizationId"];
        readonly authenticateCustomerRequired: readonly ["organizationId"];
        readonly authorizePasswordlessCustomer: readonly ["organizationId"];
        readonly authorizePasswordlessCustomerRequired: readonly ["organizationId"];
        readonly logoutCustomer: readonly ["organizationId", "client_id", "refresh_token", "channel_id", "hint"];
        readonly logoutCustomerRequired: readonly ["organizationId", "client_id", "refresh_token"];
        readonly authorizeCustomer: readonly ["organizationId", "redirect_uri", "response_type", "client_id", "scope", "state", "usid", "hint", "channel_id", "code_challenge", "ui_locales"];
        readonly authorizeCustomerRequired: readonly ["organizationId", "redirect_uri", "response_type", "client_id"];
        readonly getAccessToken: readonly ["organizationId"];
        readonly getAccessTokenRequired: readonly ["organizationId"];
        readonly getSessionBridgeAccessToken: readonly ["organizationId"];
        readonly getSessionBridgeAccessTokenRequired: readonly ["organizationId"];
        readonly getTrustedSystemAccessToken: readonly ["organizationId"];
        readonly getTrustedSystemAccessTokenRequired: readonly ["organizationId"];
        readonly getTrustedAgentAuthorizationToken: readonly ["organizationId", "client_id", "channel_id", "code_challenge", "login_id", "idp_origin", "redirect_uri", "response_type"];
        readonly getTrustedAgentAuthorizationTokenRequired: readonly ["organizationId", "client_id", "channel_id", "code_challenge", "login_id", "idp_origin", "redirect_uri", "response_type"];
        readonly getTrustedAgentAccessToken: readonly ["organizationId"];
        readonly getTrustedAgentAccessTokenRequired: readonly ["organizationId"];
        readonly getPasswordResetToken: readonly ["organizationId"];
        readonly getPasswordResetTokenRequired: readonly ["organizationId"];
        readonly resetPassword: readonly ["organizationId"];
        readonly resetPasswordRequired: readonly ["organizationId"];
        readonly getPasswordLessAccessToken: readonly ["organizationId"];
        readonly getPasswordLessAccessTokenRequired: readonly ["organizationId"];
        readonly revokeToken: readonly ["organizationId"];
        readonly revokeTokenRequired: readonly ["organizationId"];
        readonly introspectToken: readonly ["organizationId"];
        readonly introspectTokenRequired: readonly ["organizationId"];
        readonly getUserInfo: readonly ["organizationId", "channel_id"];
        readonly getUserInfoRequired: readonly ["organizationId"];
        readonly getWellknownOpenidConfiguration: readonly ["organizationId"];
        readonly getWellknownOpenidConfigurationRequired: readonly ["organizationId"];
        readonly getJwksUri: readonly ["organizationId"];
        readonly getJwksUriRequired: readonly ["organizationId"];
    };
    /**
    * Logs in a shopper with credentials that are managed by a B2C Commerce instance (ECOM). It follows the authorization code grant flow as defined by the OAuth 2.1 standard. It also uses a proof key for code exchange (PKCE).

For PKCE values:
- The `code_verifier` string is a random string used for the `/token` endpoint request.
- The `code_challenge` is an encoded version of the `code_verifier` string using an SHA-256 hash.

  The request must include a basic authorization header that contains a Base64 encoded version of the following string: `\<shopperUserID\>:\<shopperPassword\>`.

  Required parameters: `code_challenge`, `channel_id`, `client_id`, and `redirect_uri`.

  Optional parameters: `usid`.

  The SLAS `/login` endpoint redirects back to the redirect URI and returns an authorization code.

  Calls to `/login` made with the same loginId and tenantId within 1 second will result in a conflict.

    *
    * If you would like to get a raw Response object use the other authenticateCustomer function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type void.
    *
    */
    authenticateCustomer(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: LoginRequest;
    }>): Promise<void>;
    /**
    * Logs in a shopper with credentials that are managed by a B2C Commerce instance (ECOM). It follows the authorization code grant flow as defined by the OAuth 2.1 standard. It also uses a proof key for code exchange (PKCE).

For PKCE values:
- The `code_verifier` string is a random string used for the `/token` endpoint request.
- The `code_challenge` is an encoded version of the `code_verifier` string using an SHA-256 hash.

  The request must include a basic authorization header that contains a Base64 encoded version of the following string: `\<shopperUserID\>:\<shopperPassword\>`.

  Required parameters: `code_challenge`, `channel_id`, `client_id`, and `redirect_uri`.

  Optional parameters: `usid`.

  The SLAS `/login` endpoint redirects back to the redirect URI and returns an authorization code.

  Calls to `/login` made with the same loginId and tenantId within 1 second will result in a conflict.

    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
    *
    */
    authenticateCustomer<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: LoginRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : void>;
    /**
    * Allows the customer to authenticate when their identity provider is down.
    *
    * If you would like to get a raw Response object use the other authorizePasswordlessCustomer function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type Object.
    *
    */
    authorizePasswordlessCustomer(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: PasswordlessLoginRequest;
    }>): Promise<Object>;
    /**
    * Allows the customer to authenticate when their identity provider is down.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type Object otherwise.
    *
    */
    authorizePasswordlessCustomer<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: PasswordlessLoginRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : Object>;
    /**
    * Log out a shopper. The shopper's access token and refresh token are revoked. If the shopper authenticated with a B2C Commerce (ECOM) instance, the OCAPI JWT is also revoked. This should be called for Registered users that have logged in using SLAS. his should be called for registered users that have logged in using SLAS. This endpoint is not for use with guest users.

Required header: Authorization header bearer token of the Shopper access token to logout.

Required parameters: `refresh token`, `channel_id`, and `client`.
    *
    * If you would like to get a raw Response object use the other logoutCustomer function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param client_id - The SLAS client ID.
    * @param refresh_token - Refresh token that was given during the access token request.
    * @param channel_id - The `channel_id` parameter must be provided if the shopper authenticated using the `login` endpoint with ECOM.
    * @param hint - Optional parameter for logging out user sessions. Use `all-sessions` to log out all user sessions. If `hint` is not used, only the current user session will be logged out.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type TokenResponse.
    *
    */
    logoutCustomer(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            client_id: string;
            refresh_token: string;
            channel_id?: string;
            hint?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<TokenResponse>;
    /**
    * Log out a shopper. The shopper's access token and refresh token are revoked. If the shopper authenticated with a B2C Commerce (ECOM) instance, the OCAPI JWT is also revoked. This should be called for Registered users that have logged in using SLAS. his should be called for registered users that have logged in using SLAS. This endpoint is not for use with guest users.

Required header: Authorization header bearer token of the Shopper access token to logout.

Required parameters: `refresh token`, `channel_id`, and `client`.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param client_id - The SLAS client ID.
    * @param refresh_token - Refresh token that was given during the access token request.
    * @param channel_id - The `channel_id` parameter must be provided if the shopper authenticated using the `login` endpoint with ECOM.
    * @param hint - Optional parameter for logging out user sessions. Use `all-sessions` to log out all user sessions. If `hint` is not used, only the current user session will be logged out.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type TokenResponse otherwise.
    *
    */
    logoutCustomer<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            client_id: string;
            refresh_token: string;
            channel_id?: string;
            hint?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : TokenResponse>;
    /**
    * Get an authorization code after authenticating a user against an identity provider (IDP). This is the first step of the OAuth 2.1 authorization code flow, where a user can log in via federation to the IDP configured for the client. After successfully logging in, the user gets an authorization code via a redirect URI.

This endpoint can be called from the front channel (the browser).
    *
    * If you would like to get a raw Response object use the other authorizeCustomer function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param redirect_uri - The URL to which the server redirects the browser after the user grants the authorization. The URI must be pre-registered. A variety of URI formats and wildcard for host are supported, but app links like `airbnb://` or `fb://` are not. Examples of supported URIs:
  - `http://localhost:3000/callback`
  - `https://example.com/callback`
  - `com.example.app:redirect_uri_path`
  - ` *.subdomain.topleveldomain.com`

    * @param response_type - Must be `code`. Indicates that the client wants an authorization code (using the `authorization_code` grant type).
    * @param client_id - The client ID obtained during application registration.
    * @param scope -
    * @param state - Value to send the client to determine the state between the authorization request and the server response. Optional, but strongly recommended.
    * @param usid - A unique shopper identifier (USID). If not provided, a new USID is generated.
    * @param hint - Name of an identity provider (IDP) to optionally redirect to, thereby skipping the IDP selection step.

To use a public client, set `hint` to `guest` and use a public client ID to get an authorization code. If no `hint` is provided, the preferred IDP of the tenant is used by default.

For session bridge authorization the `hint` should be set to `sb-user` for a registered customer and to `sb-guest` for a guest.
    * @param channel_id - The channel that this request is for. For an ECOM request, this is angalous to the site ID.
    * @param code_challenge - PKCE code challenge. Created by the client calling the `login` endpoint.

The `code_challenge` is created by SHA256 hashing the `code_verifier` and Base64 encoding the resulting hash.

The `code_verifier` should be a high entropy cryptographically random string with a minimum of 43 characters and a maximum of 128 characters.
    * @param ui_locales - End-User's preferred languages and scripts for the user interface, represented as a space-separated list of BCP47 [RFC5646] language tag values, ordered by preference. For example, the value `fr-CA fr en` represents a preference for French as spoken in Canada, then French (without a region designation), followed by English (without a region designation).

In most cases the IDP supports one language tag and has a default language set on the server. SLAS will support the space-separated list and pass them to the IDP.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type void.
    *
    */
    authorizeCustomer(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            redirect_uri: string;
            response_type: string;
            client_id: string;
            scope?: string;
            state?: string;
            usid?: string;
            hint?: string;
            channel_id?: string;
            code_challenge?: string;
            ui_locales?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<void>;
    /**
    * Get an authorization code after authenticating a user against an identity provider (IDP). This is the first step of the OAuth 2.1 authorization code flow, where a user can log in via federation to the IDP configured for the client. After successfully logging in, the user gets an authorization code via a redirect URI.

This endpoint can be called from the front channel (the browser).
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param redirect_uri - The URL to which the server redirects the browser after the user grants the authorization. The URI must be pre-registered. A variety of URI formats and wildcard for host are supported, but app links like `airbnb://` or `fb://` are not. Examples of supported URIs:
  - `http://localhost:3000/callback`
  - `https://example.com/callback`
  - `com.example.app:redirect_uri_path`
  - ` *.subdomain.topleveldomain.com`

    * @param response_type - Must be `code`. Indicates that the client wants an authorization code (using the `authorization_code` grant type).
    * @param client_id - The client ID obtained during application registration.
    * @param scope -
    * @param state - Value to send the client to determine the state between the authorization request and the server response. Optional, but strongly recommended.
    * @param usid - A unique shopper identifier (USID). If not provided, a new USID is generated.
    * @param hint - Name of an identity provider (IDP) to optionally redirect to, thereby skipping the IDP selection step.

To use a public client, set `hint` to `guest` and use a public client ID to get an authorization code. If no `hint` is provided, the preferred IDP of the tenant is used by default.

For session bridge authorization the `hint` should be set to `sb-user` for a registered customer and to `sb-guest` for a guest.
    * @param channel_id - The channel that this request is for. For an ECOM request, this is angalous to the site ID.
    * @param code_challenge - PKCE code challenge. Created by the client calling the `login` endpoint.

The `code_challenge` is created by SHA256 hashing the `code_verifier` and Base64 encoding the resulting hash.

The `code_verifier` should be a high entropy cryptographically random string with a minimum of 43 characters and a maximum of 128 characters.
    * @param ui_locales - End-User's preferred languages and scripts for the user interface, represented as a space-separated list of BCP47 [RFC5646] language tag values, ordered by preference. For example, the value `fr-CA fr en` represents a preference for French as spoken in Canada, then French (without a region designation), followed by English (without a region designation).

In most cases the IDP supports one language tag and has a default language set on the server. SLAS will support the space-separated list and pass them to the IDP.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
    *
    */
    authorizeCustomer<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            redirect_uri: string;
            response_type: string;
            client_id: string;
            scope?: string;
            state?: string;
            usid?: string;
            hint?: string;
            channel_id?: string;
            code_challenge?: string;
            ui_locales?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : void>;
    /**
    * Get the shopper or guest JWT access token and a refresh token. This is the second step of the OAuth 2.1 authorization code flow.

For a private client, an application is able to get an access token for the shopper through the back channel (a trusted server) by passing in the client credentials and the authorization code retrieved from the `authorize` endpoint.

For a guest user, get the shopper JWT access token and a refresh token. This is where a client appplication is able to get an access token for the guest user through the back channel (a trusted server) by passing in the client credentials.

For a public client using PKCE, an application will pass a PKCE `code_verifier` that matches the `code_challenge` that was used to `authorize` the customer along with the authorization code.

When refreshing the access token with a private client ID and client secret, the refresh token is _not_ regenerated. However, when refreshing the access token with a public client ID, the refresh token is _always_ regenerated. The old refresh token is voided with every refresh call, so the refresh token on the client needs to be replaced to always store the new refresh token.

See the Body section for required parameters, including `grant_type` and others, depending on the value of `grant_type`.

**Important**: We strongly recommended using the `channel_id` query parameter because **it will be required in the future**.
    *
    * If you would like to get a raw Response object use the other getAccessToken function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type TokenResponse.
    *
    */
    getAccessToken(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: TokenRequest;
    }>): Promise<TokenResponse>;
    /**
    * Get the shopper or guest JWT access token and a refresh token. This is the second step of the OAuth 2.1 authorization code flow.

For a private client, an application is able to get an access token for the shopper through the back channel (a trusted server) by passing in the client credentials and the authorization code retrieved from the `authorize` endpoint.

For a guest user, get the shopper JWT access token and a refresh token. This is where a client appplication is able to get an access token for the guest user through the back channel (a trusted server) by passing in the client credentials.

For a public client using PKCE, an application will pass a PKCE `code_verifier` that matches the `code_challenge` that was used to `authorize` the customer along with the authorization code.

When refreshing the access token with a private client ID and client secret, the refresh token is _not_ regenerated. However, when refreshing the access token with a public client ID, the refresh token is _always_ regenerated. The old refresh token is voided with every refresh call, so the refresh token on the client needs to be replaced to always store the new refresh token.

See the Body section for required parameters, including `grant_type` and others, depending on the value of `grant_type`.

**Important**: We strongly recommended using the `channel_id` query parameter because **it will be required in the future**.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type TokenResponse otherwise.
    *
    */
    getAccessToken<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: TokenRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : TokenResponse>;
    /**
    * Get a shopper JWT access token for a registered customer using session bridge.

For public client id requests the grant_type must be set to `session_bridge`.

For  private client_id and secret the grant_type must be set to `client_credentials` along with a basic authorization header.

**DEPRECATED** - As of January 31, 2024, SLAS will no longer support the SESB `dwsid` parameter for `guest` users for `session-bridge/token` calls. It is recommended to transition over to using a SESB `dwsgst` token.

The `dwsid` will still be needed for `registered` user `session-bridge/token` calls.
    *
    * If you would like to get a raw Response object use the other getSessionBridgeAccessToken function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type TokenResponse.
    *
    */
    getSessionBridgeAccessToken(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: SessionBridgeTokenRequest;
    }>): Promise<TokenResponse>;
    /**
    * Get a shopper JWT access token for a registered customer using session bridge.

For public client id requests the grant_type must be set to `session_bridge`.

For  private client_id and secret the grant_type must be set to `client_credentials` along with a basic authorization header.

**DEPRECATED** - As of January 31, 2024, SLAS will no longer support the SESB `dwsid` parameter for `guest` users for `session-bridge/token` calls. It is recommended to transition over to using a SESB `dwsgst` token.

The `dwsid` will still be needed for `registered` user `session-bridge/token` calls.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type TokenResponse otherwise.
    *
    */
    getSessionBridgeAccessToken<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: SessionBridgeTokenRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : TokenResponse>;
    /**
    * Get a shopper JWT access token for a registered customer whose credentials are stored using a third party system.

For trusted-system requests, a basic authorization header that includes a SLAS client ID and SLAS client secret can be used in place of the bearer token.
    *
    * If you would like to get a raw Response object use the other getTrustedSystemAccessToken function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type TokenResponse.
    *
    */
    getTrustedSystemAccessToken(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: TrustedSystemTokenRequest;
    }>): Promise<TokenResponse>;
    /**
    * Get a shopper JWT access token for a registered customer whose credentials are stored using a third party system.

For trusted-system requests, a basic authorization header that includes a SLAS client ID and SLAS client secret can be used in place of the bearer token.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type TokenResponse otherwise.
    *
    */
    getTrustedSystemAccessToken<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: TrustedSystemTokenRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : TokenResponse>;
    /**
    * Obtains a new agent on behalf authorization token for a registered customer.
    *
    * If you would like to get a raw Response object use the other getTrustedAgentAuthorizationToken function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param client_id - The SLAS public client ID or SLAS private client ID for use with trusted-agent requests. When using a private client ID a PKCE code challenge is not required.
    * @param channel_id - The channel (ECOM site) that the user is associated with.
    * @param code_challenge - PKCE code challenge. Created by the caller.

The `code_challenge` is created by SHA256 hashing the `code_verifier` and Base64 encoding the resulting hash.

The `code_verifier` should be a high entropy cryptographically random string with a minimum of 43 characters and a maximum of 128 characters.

The `code_challenge` is not needed if a using SLAS private `client_id`.
    * @param login_id - The ID of the shopper for trusted agent access.
    * @param idp_origin - The IDP that the shopper is associated with.
    * @param redirect_uri - The redirect for Account Manager to redirect to. A variety of URI formats and wildcard for host are supported, but app links like `airbnb://` or `fb://` are not. Examples of supported URIs:
  - `http://localhost:3000/callback`
  - `https://example.com/callback`
  - `com.example.app:redirect_uri_path`
  - ` *.subdomain.topleveldomain.com`

    * @param response_type - Must be `code`. Indicates that the caller wants an authorization code.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type void.
    *
    */
    getTrustedAgentAuthorizationToken(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            client_id: string;
            channel_id: string;
            code_challenge: string;
            login_id: string;
            idp_origin: string;
            redirect_uri: string;
            response_type: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<void>;
    /**
    * Obtains a new agent on behalf authorization token for a registered customer.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param client_id - The SLAS public client ID or SLAS private client ID for use with trusted-agent requests. When using a private client ID a PKCE code challenge is not required.
    * @param channel_id - The channel (ECOM site) that the user is associated with.
    * @param code_challenge - PKCE code challenge. Created by the caller.

The `code_challenge` is created by SHA256 hashing the `code_verifier` and Base64 encoding the resulting hash.

The `code_verifier` should be a high entropy cryptographically random string with a minimum of 43 characters and a maximum of 128 characters.

The `code_challenge` is not needed if a using SLAS private `client_id`.
    * @param login_id - The ID of the shopper for trusted agent access.
    * @param idp_origin - The IDP that the shopper is associated with.
    * @param redirect_uri - The redirect for Account Manager to redirect to. A variety of URI formats and wildcard for host are supported, but app links like `airbnb://` or `fb://` are not. Examples of supported URIs:
  - `http://localhost:3000/callback`
  - `https://example.com/callback`
  - `com.example.app:redirect_uri_path`
  - ` *.subdomain.topleveldomain.com`

    * @param response_type - Must be `code`. Indicates that the caller wants an authorization code.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
    *
    */
    getTrustedAgentAuthorizationToken<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            client_id: string;
            channel_id: string;
            code_challenge: string;
            login_id: string;
            idp_origin: string;
            redirect_uri: string;
            response_type: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : void>;
    /**
    * Get a shopper JWT access token for a registered customer using a trusted agent (merchant).

If using a SLAS private client ID, you must also use an `_sfdc_client_auth` header.

The value of the `_sfdc_client_auth` header must be a Base64-encoded string. The string is composed of a SLAS private client ID and client secret, separated by a colon (`:`). For example, `privateClientId:privateClientsecret` becomes `cHJpdmF0ZUNsaWVudElkOnByaXZhdGVDbGllbnRzZWNyZXQ=` after Base64 encoding.
    *
    * If you would like to get a raw Response object use the other getTrustedAgentAccessToken function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type TokenResponse.
    *
    */
    getTrustedAgentAccessToken(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: TrustedAgentTokenRequest;
    }>): Promise<TokenResponse>;
    /**
    * Get a shopper JWT access token for a registered customer using a trusted agent (merchant).

If using a SLAS private client ID, you must also use an `_sfdc_client_auth` header.

The value of the `_sfdc_client_auth` header must be a Base64-encoded string. The string is composed of a SLAS private client ID and client secret, separated by a colon (`:`). For example, `privateClientId:privateClientsecret` becomes `cHJpdmF0ZUNsaWVudElkOnByaXZhdGVDbGllbnRzZWNyZXQ=` after Base64 encoding.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type TokenResponse otherwise.
    *
    */
    getTrustedAgentAccessToken<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: TrustedAgentTokenRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : TokenResponse>;
    /**
    * Request a reset password token
    *
    * If you would like to get a raw Response object use the other getPasswordResetToken function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type void.
    *
    */
    getPasswordResetToken(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: PasswordActionRequest;
    }>): Promise<void>;
    /**
    * Request a reset password token
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
    *
    */
    getPasswordResetToken<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: PasswordActionRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : void>;
    /**
    * Creates a new password
    *
    * If you would like to get a raw Response object use the other resetPassword function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type void.
    *
    */
    resetPassword(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: PasswordActionVerifyRequest;
    }>): Promise<void>;
    /**
    * Creates a new password
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
    *
    */
    resetPassword<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: PasswordActionVerifyRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : void>;
    /**
    * Issue a shopper token (JWT).
    *
    * If you would like to get a raw Response object use the other getPasswordLessAccessToken function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type TokenResponse.
    *
    */
    getPasswordLessAccessToken(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: PasswordLessLoginTokenRequest;
    }>): Promise<TokenResponse>;
    /**
    * Issue a shopper token (JWT).
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type TokenResponse otherwise.
    *
    */
    getPasswordLessAccessToken<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: PasswordLessLoginTokenRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : TokenResponse>;
    /**
    * Invalidate the refresh token. A basic auth header with Base64-encoded `clientId:secret` is required in the Authorization header, and the refresh token to be revoked is required in the body.
    *
    * If you would like to get a raw Response object use the other revokeToken function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type TokenResponse.
    *
    */
    revokeToken(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: TokenActionRequest;
    }>): Promise<TokenResponse>;
    /**
    * Invalidate the refresh token. A basic auth header with Base64-encoded `clientId:secret` is required in the Authorization header, and the refresh token to be revoked is required in the body.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type TokenResponse otherwise.
    *
    */
    revokeToken<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: TokenActionRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : TokenResponse>;
    /**
    * Returns the token properties. A basic auth header with Base64-encoded `clientId:secret` is required in the Authorization header, as well as an access token or refresh token. Use `token_type_hint` to help identify the token.
    *
    * If you would like to get a raw Response object use the other introspectToken function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type Object.
    *
    */
    introspectToken(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: TokenActionRequest;
    }>): Promise<Object>;
    /**
    * Returns the token properties. A basic auth header with Base64-encoded `clientId:secret` is required in the Authorization header, as well as an access token or refresh token. Use `token_type_hint` to help identify the token.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type Object otherwise.
    *
    */
    introspectToken<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: TokenActionRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : Object>;
    /**
    * Returns a JSON listing of claims about the currently authenticated user.
    *
    * If you would like to get a raw Response object use the other getUserInfo function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param channel_id - Used when getting user information for a SFCC login. For an ECOM customer, this is angalous to the site ID. Required when getting user information for an ECOM customer.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type Object.
    *
    */
    getUserInfo(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            channel_id?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Object>;
    /**
    * Returns a JSON listing of claims about the currently authenticated user.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param channel_id - Used when getting user information for a SFCC login. For an ECOM customer, this is angalous to the site ID. Required when getting user information for an ECOM customer.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type Object otherwise.
    *
    */
    getUserInfo<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            channel_id?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Object>;
    /**
    * Returns a JSON listing of the OpenID/OAuth endpoints, supported scopes and claims, public keys used to sign the tokens, and other details.

For performance purposes, the `/jwks` endpoint is rate limited to 25 call per minute.

    *
    * If you would like to get a raw Response object use the other getWellknownOpenidConfiguration function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type Object.
    *
    */
    getWellknownOpenidConfiguration(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Object>;
    /**
    * Returns a JSON listing of the OpenID/OAuth endpoints, supported scopes and claims, public keys used to sign the tokens, and other details.

For performance purposes, the `/jwks` endpoint is rate limited to 25 call per minute.

    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type Object otherwise.
    *
    */
    getWellknownOpenidConfiguration<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Object>;
    /**
    * Returns a JSON Web Key Set (JWKS) containing the current, past, and future public keys. The key set enables clients to validate the Shopper JSON Web Token (JWT) issued by SLAS.

For performance purposes, the `/jwks` endpoint is rate limited to 25 call per minute.

    *
    * If you would like to get a raw Response object use the other getJwksUri function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type Object.
    *
    */
    getJwksUri(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Object>;
    /**
    * Returns a JSON Web Key Set (JWKS) containing the current, past, and future public keys. The key set enables clients to validate the Shopper JSON Web Token (JWT) issued by SLAS.

For performance purposes, the `/jwks` endpoint is rate limited to 25 call per minute.

    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type Object otherwise.
    *
    */
    getJwksUri<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Object>;
}

type shopperLogin_AttributeDefinition = AttributeDefinition;
type shopperLogin_BoolFilter = BoolFilter;
type shopperLogin_BoolQuery = BoolQuery;
type shopperLogin_ChangeControlled = ChangeControlled;
type shopperLogin_ChangeControlledDataType = ChangeControlledDataType;
type shopperLogin_ClosedObject = ClosedObject;
type shopperLogin_Error = Error;
type shopperLogin_ErrorResponse = ErrorResponse;
type shopperLogin_Filter = Filter;
type shopperLogin_FilteredQuery = FilteredQuery;
type shopperLogin_IntrospectResponse = IntrospectResponse;
type shopperLogin_L10nString = L10nString;
type shopperLogin_LocalizedString = LocalizedString;
type shopperLogin_LoginRequest = LoginRequest;
type shopperLogin_MatchAllQuery = MatchAllQuery;
type shopperLogin_Money = Money;
type shopperLogin_MoneyMnemonic = MoneyMnemonic;
type shopperLogin_NestedQuery = NestedQuery;
type shopperLogin_NoPropertiesAllowed = NoPropertiesAllowed;
type shopperLogin_Oauth2ErrorResponse = Oauth2ErrorResponse;
type shopperLogin_OpenObject = OpenObject;
type shopperLogin_PaginatedSearchResult = PaginatedSearchResult;
type shopperLogin_PaginatedSearchResultBase = PaginatedSearchResultBase;
type shopperLogin_PasswordActionRequest = PasswordActionRequest;
type shopperLogin_PasswordActionVerifyRequest = PasswordActionVerifyRequest;
type shopperLogin_PasswordLessLoginTokenRequest = PasswordLessLoginTokenRequest;
type shopperLogin_PasswordlessLoginRequest = PasswordlessLoginRequest;
type shopperLogin_PropertyDefinition = PropertyDefinition;
type shopperLogin_PropertyValueDefinition = PropertyValueDefinition;
type shopperLogin_Query = Query;
type shopperLogin_QueryFilter = QueryFilter;
type shopperLogin_Range2Filter = Range2Filter;
type shopperLogin_SearchRequest = SearchRequest;
type shopperLogin_SearchRequestBase = SearchRequestBase;
type shopperLogin_SessionBridgeTokenRequest = SessionBridgeTokenRequest;
type shopperLogin_ShopperLogin<ConfigParameters extends ShopperLoginParameters & Record<string, unknown>> = ShopperLogin<ConfigParameters>;
declare const shopperLogin_ShopperLogin: typeof ShopperLogin;
type shopperLogin_ShopperLoginParameters = ShopperLoginParameters;
type shopperLogin_ShopperLoginPathParameters = ShopperLoginPathParameters;
type shopperLogin_ShopperLoginQueryParameters = ShopperLoginQueryParameters;
type shopperLogin_SimpleSearchResult = SimpleSearchResult;
type shopperLogin_SimpleSearchResultBase = SimpleSearchResultBase;
type shopperLogin_Sort = Sort;
type shopperLogin_SpecifiedPropertiesAllowed = SpecifiedPropertiesAllowed;
type shopperLogin_TermFilter = TermFilter;
type shopperLogin_TermQuery = TermQuery;
type shopperLogin_TextQuery = TextQuery;
type shopperLogin_TokenActionRequest = TokenActionRequest;
type shopperLogin_TokenRequest = TokenRequest;
type shopperLogin_TokenResponse = TokenResponse;
type shopperLogin_TrustedAgentTokenRequest = TrustedAgentTokenRequest;
type shopperLogin_TrustedSystemTokenRequest = TrustedSystemTokenRequest;
declare namespace shopperLogin {
  export { type shopperLogin_AttributeDefinition as AttributeDefinition, type shopperLogin_BoolFilter as BoolFilter, type shopperLogin_BoolQuery as BoolQuery, type shopperLogin_ChangeControlled as ChangeControlled, type shopperLogin_ChangeControlledDataType as ChangeControlledDataType, type shopperLogin_ClosedObject as ClosedObject, type shopperLogin_Error as Error, type shopperLogin_ErrorResponse as ErrorResponse, type shopperLogin_Filter as Filter, type shopperLogin_FilteredQuery as FilteredQuery, type shopperLogin_IntrospectResponse as IntrospectResponse, type shopperLogin_L10nString as L10nString, type shopperLogin_LocalizedString as LocalizedString, type shopperLogin_LoginRequest as LoginRequest, type shopperLogin_MatchAllQuery as MatchAllQuery, type shopperLogin_Money as Money, type shopperLogin_MoneyMnemonic as MoneyMnemonic, type shopperLogin_NestedQuery as NestedQuery, type shopperLogin_NoPropertiesAllowed as NoPropertiesAllowed, type shopperLogin_Oauth2ErrorResponse as Oauth2ErrorResponse, type shopperLogin_OpenObject as OpenObject, type shopperLogin_PaginatedSearchResult as PaginatedSearchResult, type shopperLogin_PaginatedSearchResultBase as PaginatedSearchResultBase, type shopperLogin_PasswordActionRequest as PasswordActionRequest, type shopperLogin_PasswordActionVerifyRequest as PasswordActionVerifyRequest, type shopperLogin_PasswordLessLoginTokenRequest as PasswordLessLoginTokenRequest, type shopperLogin_PasswordlessLoginRequest as PasswordlessLoginRequest, type shopperLogin_PropertyDefinition as PropertyDefinition, type shopperLogin_PropertyValueDefinition as PropertyValueDefinition, type shopperLogin_Query as Query, type shopperLogin_QueryFilter as QueryFilter, type shopperLogin_Range2Filter as Range2Filter, type shopperLogin_SearchRequest as SearchRequest, type shopperLogin_SearchRequestBase as SearchRequestBase, type shopperLogin_SessionBridgeTokenRequest as SessionBridgeTokenRequest, shopperLogin_ShopperLogin as ShopperLogin, type shopperLogin_ShopperLoginParameters as ShopperLoginParameters, type shopperLogin_ShopperLoginPathParameters as ShopperLoginPathParameters, type shopperLogin_ShopperLoginQueryParameters as ShopperLoginQueryParameters, type shopperLogin_SimpleSearchResult as SimpleSearchResult, type shopperLogin_SimpleSearchResultBase as SimpleSearchResultBase, type shopperLogin_Sort as Sort, type shopperLogin_SpecifiedPropertiesAllowed as SpecifiedPropertiesAllowed, type shopperLogin_TermFilter as TermFilter, type shopperLogin_TermQuery as TermQuery, type shopperLogin_TextQuery as TextQuery, type shopperLogin_TokenActionRequest as TokenActionRequest, type shopperLogin_TokenRequest as TokenRequest, type shopperLogin_TokenResponse as TokenResponse, type shopperLogin_TrustedAgentTokenRequest as TrustedAgentTokenRequest, type shopperLogin_TrustedSystemTokenRequest as TrustedSystemTokenRequest };
}

export { type SimpleSearchResultBase as A, type BoolFilter as B, type ChangeControlled as C, type NestedQuery as D, type ErrorResponse as E, type FilteredQuery as F, type Filter as G, type Sort as H, type IntrospectResponse as I, type SearchRequestBase as J, type MoneyMnemonic as K, type LoginRequest as L, type Money as M, type NoPropertiesAllowed as N, type Oauth2ErrorResponse as O, type PasswordlessLoginRequest as P, type QueryFilter as Q, type Range2Filter as R, ShopperLogin as S, type TrustedAgentTokenRequest as T, type L10nString as U, type AttributeDefinition as V, type PropertyValueDefinition as W, type ShopperLoginPathParameters as X, type ShopperLoginQueryParameters as Y, type ShopperLoginParameters as Z, type PasswordLessLoginTokenRequest as a, type PasswordActionVerifyRequest as b, type TrustedSystemTokenRequest as c, type PasswordActionRequest as d, type TokenResponse as e, type TokenRequest as f, type TokenActionRequest as g, type SessionBridgeTokenRequest as h, type ChangeControlledDataType as i, type Error as j, type SimpleSearchResult as k, type SearchRequest as l, type PropertyDefinition as m, type LocalizedString as n, type PaginatedSearchResult as o, type ClosedObject as p, type OpenObject as q, type SpecifiedPropertiesAllowed as r, shopperLogin as s, type PaginatedSearchResultBase as t, type MatchAllQuery as u, type Query as v, type TermQuery as w, type TermFilter as x, type TextQuery as y, type BoolQuery as z };

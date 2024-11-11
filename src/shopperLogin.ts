import ClientConfig, { ClientConfigInit } from "./clientConfig";
// Must not import from ./helpers/index to avoid circular dependency via ShopperLogin
import { isBrowser } from "./helpers/environment";
import { doFetch } from "./helpers/fetchHelper";
import type {
  BaseUriParameters,
  CompositeParameters,
  RequireParametersUnlessAllAreOptional
} from "./helpers/types";
import TemplateURL from "./templateUrl";
import { USER_AGENT_HEADER, USER_AGENT_VALUE } from "./version";

export type LoginRequest = {
  client_id?: string;
  response_type?: string;
  redirect_uri: string;
  state?: string;
  scope?: string;
  usid?: string;
  channel_id: string;
  code_challenge?: string;
} & { [key: string]: any }

  export type TrustedAgentTokenRequest = {
  agent_id?: string;
  client_id: string;
  channel_id: string;
  code_verifier: string;
  grant_type: string;
  login_id: string;
  idp_origin: string;
  usid?: string;
  dnt?: string;
} & { [key: string]: any }

  export type IntrospectResponse = {
  active: boolean;
  scope: string;
  client_id: string;
  sub: string;
  exp: number;
  username: string;
  token_type: string;
} & { [key: string]: any }

  export type PasswordlessLoginRequest = {
  user_id: string;
  mode: string;
  locale?: string;
  usid?: string;
  channel_id: string;
  callback_uri?: string;
} & { [key: string]: any }

  export type PasswordLessLoginTokenRequest = {
  grant_type: string;
  hint: string;
  pwdless_login_token: string;
  client_id?: string;
  code_verifier?: string;
} & { [key: string]: any }

  export type Oauth2ErrorResponse = {
  error: string;
  error_uri?: string;
  error_description?: string;
} & { [key: string]: any }

  export type PasswordActionVerifyRequest = {
  client_id: string;
  pwd_action_token: string;
  code_verifier: string;
  new_password: string;
  channel_id: string;
} & { [key: string]: any }

  export type TrustedSystemTokenRequest = {
  usid?: string;
  grant_type: string;
  hint: string;
  login_id: string;
  idp_origin: string;
  client_id: string;
  channel_id: string;
  email_id?: string;
  dnt?: string;
} & { [key: string]: any }

  export type PasswordActionRequest = {
  user_id: string;
  mode: string;
  channel_id: string;
  locale?: string;
  client_id?: string;
  code_challenge?: string;
  callback_uri?: string;
  idp_name?: string;
} & { [key: string]: any }

  export type TokenResponse = {
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
} & { [key: string]: any }

  export type TokenRequest = {
  refresh_token?: string;
  code?: string;
  usid?: string;
  grant_type: string;
  redirect_uri?: string;
  code_verifier?: string;
  client_id?: string;
  channel_id?: string;
  dnt?: string;
} & { [key: string]: any }

  export type TokenActionRequest = {
  token: string;
  token_type_hint?: string;
} & { [key: string]: any }

  export type SessionBridgeTokenRequest = {
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
} & { [key: string]: any }

  type SlasRateLimit = { [key: string]: any }
export type ErrorResponse = {
  type: string;
  title?: string;
  detail?: string;
  instance?: string;
} & { [key: string]: any }

  export type ChangeControlled = {
  creationDate?: any;
  modificationDate?: any;
  createdBy?: string;
  lastModifiedBy?: string;
} & { [key: string]: any }

  type DateRangeFilter = { [key: string]: any }
type EtagResponse = { [key: string]: any }
type IntegerRangeFilter = { [key: string]: any }
type RateLimited3 = { [key: string]: any }
type SyncCreated = { [key: string]: any }
type DateConditionalRequest = { [key: string]: any }
type RateLimited5 = { [key: string]: any }
type EtagConditionalRequest = { [key: string]: any }
type AsyncCreated = { [key: string]: any }
type RateLimited = { [key: string]: any }
type RateLimited2 = { [key: string]: any }
type OffsetPaginated = { [key: string]: any }
type RangeFilter = { [key: string]: any }
type RateLimited4 = { [key: string]: any }
type NumericRangeFilter = { [key: string]: any }
type DatetimeRangeFilter = { [key: string]: any }
export type ChangeControlledDataType = {
  creationDate?: any;
  modificationDate?: any;
  createdBy?: string;
  lastModifiedBy?: string;
} & { [key: string]: any }

  export type Error = {
  type: string;
  title?: string;
  detail?: string;
  instance?: string;
} & { [key: string]: any }

  export type Money = {
  currencyMnemonic?: string;
  value?: number;
} & { [key: string]: any }

  export type SimpleSearchResult = {
  limit: number;
  hits?: Array<object>;
  offset: any;
  total: any;
} & { [key: string]: any }

  export type SearchRequest = {
  limit?: number;
  query: Query;
  sorts?: Array<Sort>;
  offset?: any;
} & { [key: string]: any }

  export type PropertyDefinition = {
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
} & { [key: string]: any }

  export type LocalizedString = {
} & { [key: string]: any }

  export type PaginatedSearchResult = {
  query: Query;
  sorts?: Array<Sort>;
  limit: number;
  hits?: Array<object>;
  offset: any;
  total: any;
} & { [key: string]: any }

  export type ClosedObject = {
} & { [key: string]: any }

  export type OpenObject = {
} & { [key: string]: any }

  type QueryParamsLimit = { [key: string]: any }
type QueryParamsOffset = { [key: string]: any }
type SiteSpecific = { [key: string]: any }
export type NoPropertiesAllowed = {
}
  export type SpecifiedPropertiesAllowed = {
} & { [key: string]: any }

  export type BoolFilter = {
  filters?: Array<Filter>;
  operator: string;
} & { [key: string]: any }

  export type PaginatedSearchResultBase = {
  query: Query;
  sorts?: Array<Sort>;
  limit: number;
  hits?: Array<object>;
  offset: any;
  total: any;
} & { [key: string]: any }

  export type MatchAllQuery = {
} & { [key: string]: any }

  export type FilteredQuery = {
  filter: Filter;
  query: Query;
} & { [key: string]: any }

  export type QueryFilter = {
  query: Query;
} & { [key: string]: any }

  export type Query = {
  boolQuery?: BoolQuery;
  filteredQuery?: FilteredQuery;
  matchAllQuery?: MatchAllQuery;
  nestedQuery?: NestedQuery;
  termQuery?: TermQuery;
  textQuery?: TextQuery;
} & { [key: string]: any }

  export type TermQuery = {
  fields: Array<string>;
  operator: string;
  values?: Array<any>;
} & { [key: string]: any }

  export type TermFilter = {
  field: string;
  operator: string;
  values?: Array<any>;
} & { [key: string]: any }

  export type TextQuery = {
  fields: Array<string>;
  searchPhrase: string;
} & { [key: string]: any }

  export type Range2Filter = {
  filterMode?: string;
  fromField: string;
  fromInclusive?: boolean;
  fromValue?: any;
  toField: string;
  toInclusive?: boolean;
  toValue?: any;
} & { [key: string]: any }

  export type BoolQuery = {
  must?: Array<Query>;
  mustNot?: Array<Query>;
  should?: Array<Query>;
} & { [key: string]: any }

  export type SimpleSearchResultBase = {
  limit: number;
  hits?: Array<object>;
  offset: any;
  total: any;
} & { [key: string]: any }

  export type NestedQuery = {
  path: string;
  query: Query;
  scoreMode?: string;
} & { [key: string]: any }

  export type Filter = {
  boolFilter?: BoolFilter;
  queryFilter?: QueryFilter;
  range2Filter?: Range2Filter;
  rangeFilter?: RangeFilter;
  termFilter?: TermFilter;
} & { [key: string]: any }

  export type Sort = {
  field: string;
  sortOrder?: string;
} & { [key: string]: any }

  export type SearchRequestBase = {
  limit?: number;
  query: Query;
  sorts?: Array<Sort>;
  offset?: any;
} & { [key: string]: any }

  export type MoneyMnemonic = {
  currencyMnemonic?: string;
  value?: number;
} & { [key: string]: any }

  export type L10nString = {
} & { [key: string]: any }

  export type AttributeDefinition = {
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
}
  export type PropertyValueDefinition = {
  description: L10nString;
  displayValue: L10nString;
  id: string;
  position?: number;
  value: string;
}
  
/**
 * All path parameters that are used by at least one ShopperLogin method.
 */
export type ShopperLoginPathParameters = {
  organizationId?: string;
}
/**
 * All query parameters that are used by at least one ShopperLogin method.
 */
export type ShopperLoginQueryParameters = {
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
}

/**
 * All parameters that are used by ShopperLogin.
 */
export type ShopperLoginParameters = ShopperLoginPathParameters & BaseUriParameters & ShopperLoginQueryParameters;

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
export class ShopperLogin<ConfigParameters extends ShopperLoginParameters & Record<string, unknown>> {
  // baseUri is not required on ClientConfig, but we know that we provide one in the class constructor
  public clientConfig: ClientConfig<ConfigParameters> & { baseUri: string };

  static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/shopper/auth/{version}";

  static readonly apiPaths = {
    authenticateCustomer: "/organizations/{organizationId}/oauth2/login",
    authorizePasswordlessCustomer: "/organizations/{organizationId}/oauth2/passwordless/login",
    logoutCustomer: "/organizations/{organizationId}/oauth2/logout",
    authorizeCustomer: "/organizations/{organizationId}/oauth2/authorize",
    getAccessToken: "/organizations/{organizationId}/oauth2/token",
    getSessionBridgeAccessToken: "/organizations/{organizationId}/oauth2/session-bridge/token",
    getTrustedSystemAccessToken: "/organizations/{organizationId}/oauth2/trusted-system/token",
    getTrustedAgentAuthorizationToken: "/organizations/{organizationId}/oauth2/trusted-agent/authorize",
    getTrustedAgentAccessToken: "/organizations/{organizationId}/oauth2/trusted-agent/token",
    getPasswordResetToken: "/organizations/{organizationId}/oauth2/password/reset",
    resetPassword: "/organizations/{organizationId}/oauth2/password/action",
    getPasswordLessAccessToken: "/organizations/{organizationId}/oauth2/passwordless/token",
    revokeToken: "/organizations/{organizationId}/oauth2/revoke",
    introspectToken: "/organizations/{organizationId}/oauth2/introspect",
    getUserInfo: "/organizations/{organizationId}/oauth2/userinfo",
    getWellknownOpenidConfiguration: "/organizations/{organizationId}/oauth2/.well-known/openid-configuration",
    getJwksUri: "/organizations/{organizationId}/oauth2/jwks",
  };

  constructor(config: ClientConfigInit<ConfigParameters>) {
    const cfg = {...config}
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    // Type assertion is safe because ^^^
    this.clientConfig = new ClientConfig(cfg) as ClientConfig<ConfigParameters> & { baseUri: string };
  }

  static readonly paramKeys = {
    authenticateCustomer: [
      'organizationId',
    ],
    authenticateCustomerRequired: [
      'organizationId',
    ],
    authorizePasswordlessCustomer: [
      'organizationId',
    ],
    authorizePasswordlessCustomerRequired: [
      'organizationId',
    ],
    logoutCustomer: [
      'organizationId',
      'client_id',
      'refresh_token',
      'channel_id',
      'hint',
    ],
    logoutCustomerRequired: [
      'organizationId',
      'client_id',
      'refresh_token',
    ],
    authorizeCustomer: [
      'organizationId',
      'redirect_uri',
      'response_type',
      'client_id',
      'scope',
      'state',
      'usid',
      'hint',
      'channel_id',
      'code_challenge',
      'ui_locales',
    ],
    authorizeCustomerRequired: [
      'organizationId',
      'redirect_uri',
      'response_type',
      'client_id',
    ],
    getAccessToken: [
      'organizationId',
    ],
    getAccessTokenRequired: [
      'organizationId',
    ],
    getSessionBridgeAccessToken: [
      'organizationId',
    ],
    getSessionBridgeAccessTokenRequired: [
      'organizationId',
    ],
    getTrustedSystemAccessToken: [
      'organizationId',
    ],
    getTrustedSystemAccessTokenRequired: [
      'organizationId',
    ],
    getTrustedAgentAuthorizationToken: [
      'organizationId',
      'client_id',
      'channel_id',
      'code_challenge',
      'login_id',
      'idp_origin',
      'redirect_uri',
      'response_type',
    ],
    getTrustedAgentAuthorizationTokenRequired: [
      'organizationId',
      'client_id',
      'channel_id',
      'code_challenge',
      'login_id',
      'idp_origin',
      'redirect_uri',
      'response_type',
    ],
    getTrustedAgentAccessToken: [
      'organizationId',
    ],
    getTrustedAgentAccessTokenRequired: [
      'organizationId',
    ],
    getPasswordResetToken: [
      'organizationId',
    ],
    getPasswordResetTokenRequired: [
      'organizationId',
    ],
    resetPassword: [
      'organizationId',
    ],
    resetPasswordRequired: [
      'organizationId',
    ],
    getPasswordLessAccessToken: [
      'organizationId',
    ],
    getPasswordLessAccessTokenRequired: [
      'organizationId',
    ],
    revokeToken: [
      'organizationId',
    ],
    revokeTokenRequired: [
      'organizationId',
    ],
    introspectToken: [
      'organizationId',
    ],
    introspectTokenRequired: [
      'organizationId',
    ],
    getUserInfo: [
      'organizationId',
      'channel_id',
    ],
    getUserInfoRequired: [
      'organizationId',
    ],
    getWellknownOpenidConfiguration: [
      'organizationId',
    ],
    getWellknownOpenidConfigurationRequired: [
      'organizationId',
    ],
    getJwksUri: [
      'organizationId',
    ],
    getJwksUriRequired: [
      'organizationId',
    ],
  } as const;
  
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
      authenticateCustomer(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: LoginRequest
        }>
      ): Promise<void>;
  
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
      authenticateCustomer<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: LoginRequest
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : void>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
      * 
      */
      async authenticateCustomer(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: LoginRequest
        }>,
        rawResponse?: boolean
      ): Promise<Response | void> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperLoginPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
  
        const queryParams: ShopperLoginQueryParameters & { [key in `c_${string}`]: any } = {};
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for authenticateCustomer: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/oauth2/login",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/x-www-form-urlencoded",
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        if (rawResponse) {
          return response as Response;
        }
      }
  
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
      authorizePasswordlessCustomer(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: PasswordlessLoginRequest
        }>
      ): Promise<Object>;
  
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
      authorizePasswordlessCustomer<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: PasswordlessLoginRequest
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : Object>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Object otherwise.
      * 
      */
      async authorizePasswordlessCustomer(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: PasswordlessLoginRequest
        }>,
        rawResponse?: boolean
      ): Promise<Response | Object> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperLoginPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
  
        const queryParams: ShopperLoginQueryParameters & { [key in `c_${string}`]: any } = {};
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for authorizePasswordlessCustomer: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/oauth2/passwordless/login",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/x-www-form-urlencoded",
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | Object;
      }
  
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
      logoutCustomer(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            client_id: string
            refresh_token: string
            channel_id?: string
            hint?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<TokenResponse>;
  
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
      logoutCustomer<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            client_id: string
            refresh_token: string
            channel_id?: string
            hint?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : TokenResponse>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type TokenResponse otherwise.
      * 
      */
      async logoutCustomer(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            client_id: string
            refresh_token: string
            channel_id?: string
            hint?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | TokenResponse> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperLoginPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
  
        const queryParams: ShopperLoginQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["client_id"] !== undefined) {
          queryParams["client_id"] = optionParams["client_id"];
        } else if (configParams["client_id"] !== undefined) {
          queryParams["client_id"] = configParams["client_id"];
        }
        else {
          throw new Error('Missing required query parameter: client_id');
        }
        if (optionParams["refresh_token"] !== undefined) {
          queryParams["refresh_token"] = optionParams["refresh_token"];
        } else if (configParams["refresh_token"] !== undefined) {
          queryParams["refresh_token"] = configParams["refresh_token"];
        }
        else {
          throw new Error('Missing required query parameter: refresh_token');
        }
        if (optionParams["channel_id"] !== undefined) {
          queryParams["channel_id"] = optionParams["channel_id"];
        } else if (configParams["channel_id"] !== undefined) {
          queryParams["channel_id"] = configParams["channel_id"];
        }
        if (optionParams["hint"] !== undefined) {
          queryParams["hint"] = optionParams["hint"];
        } else if (configParams["hint"] !== undefined) {
          queryParams["hint"] = configParams["hint"];
        }
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for logoutCustomer: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/oauth2/logout",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "GET",
            headers,
            
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | TokenResponse;
      }
  
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
      authorizeCustomer(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            redirect_uri: string
            response_type: string
            client_id: string
            scope?: string
            state?: string
            usid?: string
            hint?: string
            channel_id?: string
            code_challenge?: string
            ui_locales?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<void>;
  
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
      authorizeCustomer<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            redirect_uri: string
            response_type: string
            client_id: string
            scope?: string
            state?: string
            usid?: string
            hint?: string
            channel_id?: string
            code_challenge?: string
            ui_locales?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : void>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
      * 
      */
      async authorizeCustomer(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            redirect_uri: string
            response_type: string
            client_id: string
            scope?: string
            state?: string
            usid?: string
            hint?: string
            channel_id?: string
            code_challenge?: string
            ui_locales?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | void> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperLoginPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
  
        const queryParams: ShopperLoginQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["redirect_uri"] !== undefined) {
          queryParams["redirect_uri"] = optionParams["redirect_uri"];
        } else if (configParams["redirect_uri"] !== undefined) {
          queryParams["redirect_uri"] = configParams["redirect_uri"];
        }
        else {
          throw new Error('Missing required query parameter: redirect_uri');
        }
        if (optionParams["response_type"] !== undefined) {
          queryParams["response_type"] = optionParams["response_type"];
        } else if (configParams["response_type"] !== undefined) {
          queryParams["response_type"] = configParams["response_type"];
        }
        else {
          throw new Error('Missing required query parameter: response_type');
        }
        if (optionParams["client_id"] !== undefined) {
          queryParams["client_id"] = optionParams["client_id"];
        } else if (configParams["client_id"] !== undefined) {
          queryParams["client_id"] = configParams["client_id"];
        }
        else {
          throw new Error('Missing required query parameter: client_id');
        }
        if (optionParams["scope"] !== undefined) {
          queryParams["scope"] = optionParams["scope"];
        } else if (configParams["scope"] !== undefined) {
          queryParams["scope"] = configParams["scope"];
        }
        if (optionParams["state"] !== undefined) {
          queryParams["state"] = optionParams["state"];
        } else if (configParams["state"] !== undefined) {
          queryParams["state"] = configParams["state"];
        }
        if (optionParams["usid"] !== undefined) {
          queryParams["usid"] = optionParams["usid"];
        } else if (configParams["usid"] !== undefined) {
          queryParams["usid"] = configParams["usid"];
        }
        if (optionParams["hint"] !== undefined) {
          queryParams["hint"] = optionParams["hint"];
        } else if (configParams["hint"] !== undefined) {
          queryParams["hint"] = configParams["hint"];
        }
        if (optionParams["channel_id"] !== undefined) {
          queryParams["channel_id"] = optionParams["channel_id"];
        } else if (configParams["channel_id"] !== undefined) {
          queryParams["channel_id"] = configParams["channel_id"];
        }
        if (optionParams["code_challenge"] !== undefined) {
          queryParams["code_challenge"] = optionParams["code_challenge"];
        } else if (configParams["code_challenge"] !== undefined) {
          queryParams["code_challenge"] = configParams["code_challenge"];
        }
        if (optionParams["ui_locales"] !== undefined) {
          queryParams["ui_locales"] = optionParams["ui_locales"];
        } else if (configParams["ui_locales"] !== undefined) {
          queryParams["ui_locales"] = configParams["ui_locales"];
        }
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for authorizeCustomer: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/oauth2/authorize",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "GET",
            headers,
            
          },
          this.clientConfig,
          rawResponse
        )
  
        if (rawResponse) {
          return response as Response;
        }
      }
  
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
      getAccessToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: TokenRequest
        }>
      ): Promise<TokenResponse>;
  
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
      getAccessToken<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: TokenRequest
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : TokenResponse>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type TokenResponse otherwise.
      * 
      */
      async getAccessToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: TokenRequest
        }>,
        rawResponse?: boolean
      ): Promise<Response | TokenResponse> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperLoginPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
  
        const queryParams: ShopperLoginQueryParameters & { [key in `c_${string}`]: any } = {};
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for getAccessToken: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/oauth2/token",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/x-www-form-urlencoded",
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | TokenResponse;
      }
  
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
      getSessionBridgeAccessToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: SessionBridgeTokenRequest
        }>
      ): Promise<TokenResponse>;
  
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
      getSessionBridgeAccessToken<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: SessionBridgeTokenRequest
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : TokenResponse>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type TokenResponse otherwise.
      * 
      */
      async getSessionBridgeAccessToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: SessionBridgeTokenRequest
        }>,
        rawResponse?: boolean
      ): Promise<Response | TokenResponse> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperLoginPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
  
        const queryParams: ShopperLoginQueryParameters & { [key in `c_${string}`]: any } = {};
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for getSessionBridgeAccessToken: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/oauth2/session-bridge/token",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/x-www-form-urlencoded",
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | TokenResponse;
      }
  
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
      getTrustedSystemAccessToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: TrustedSystemTokenRequest
        }>
      ): Promise<TokenResponse>;
  
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
      getTrustedSystemAccessToken<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: TrustedSystemTokenRequest
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : TokenResponse>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type TokenResponse otherwise.
      * 
      */
      async getTrustedSystemAccessToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: TrustedSystemTokenRequest
        }>,
        rawResponse?: boolean
      ): Promise<Response | TokenResponse> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperLoginPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
  
        const queryParams: ShopperLoginQueryParameters & { [key in `c_${string}`]: any } = {};
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for getTrustedSystemAccessToken: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/oauth2/trusted-system/token",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/x-www-form-urlencoded",
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | TokenResponse;
      }
  
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
      getTrustedAgentAuthorizationToken(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            client_id: string
            channel_id: string
            code_challenge: string
            login_id: string
            idp_origin: string
            redirect_uri: string
            response_type: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<void>;
  
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
      getTrustedAgentAuthorizationToken<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            client_id: string
            channel_id: string
            code_challenge: string
            login_id: string
            idp_origin: string
            redirect_uri: string
            response_type: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : void>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
      * 
      */
      async getTrustedAgentAuthorizationToken(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            client_id: string
            channel_id: string
            code_challenge: string
            login_id: string
            idp_origin: string
            redirect_uri: string
            response_type: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | void> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperLoginPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
  
        const queryParams: ShopperLoginQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["client_id"] !== undefined) {
          queryParams["client_id"] = optionParams["client_id"];
        } else if (configParams["client_id"] !== undefined) {
          queryParams["client_id"] = configParams["client_id"];
        }
        else {
          throw new Error('Missing required query parameter: client_id');
        }
        if (optionParams["channel_id"] !== undefined) {
          queryParams["channel_id"] = optionParams["channel_id"];
        } else if (configParams["channel_id"] !== undefined) {
          queryParams["channel_id"] = configParams["channel_id"];
        }
        else {
          throw new Error('Missing required query parameter: channel_id');
        }
        if (optionParams["code_challenge"] !== undefined) {
          queryParams["code_challenge"] = optionParams["code_challenge"];
        } else if (configParams["code_challenge"] !== undefined) {
          queryParams["code_challenge"] = configParams["code_challenge"];
        }
        else {
          throw new Error('Missing required query parameter: code_challenge');
        }
        if (optionParams["login_id"] !== undefined) {
          queryParams["login_id"] = optionParams["login_id"];
        } else if (configParams["login_id"] !== undefined) {
          queryParams["login_id"] = configParams["login_id"];
        }
        else {
          throw new Error('Missing required query parameter: login_id');
        }
        if (optionParams["idp_origin"] !== undefined) {
          queryParams["idp_origin"] = optionParams["idp_origin"];
        } else if (configParams["idp_origin"] !== undefined) {
          queryParams["idp_origin"] = configParams["idp_origin"];
        }
        else {
          throw new Error('Missing required query parameter: idp_origin');
        }
        if (optionParams["redirect_uri"] !== undefined) {
          queryParams["redirect_uri"] = optionParams["redirect_uri"];
        } else if (configParams["redirect_uri"] !== undefined) {
          queryParams["redirect_uri"] = configParams["redirect_uri"];
        }
        else {
          throw new Error('Missing required query parameter: redirect_uri');
        }
        if (optionParams["response_type"] !== undefined) {
          queryParams["response_type"] = optionParams["response_type"];
        } else if (configParams["response_type"] !== undefined) {
          queryParams["response_type"] = configParams["response_type"];
        }
        else {
          throw new Error('Missing required query parameter: response_type');
        }
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for getTrustedAgentAuthorizationToken: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/oauth2/trusted-agent/authorize",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "GET",
            headers,
            
          },
          this.clientConfig,
          rawResponse
        )
  
        if (rawResponse) {
          return response as Response;
        }
      }
  
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
      getTrustedAgentAccessToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: TrustedAgentTokenRequest
        }>
      ): Promise<TokenResponse>;
  
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
      getTrustedAgentAccessToken<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: TrustedAgentTokenRequest
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : TokenResponse>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type TokenResponse otherwise.
      * 
      */
      async getTrustedAgentAccessToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: TrustedAgentTokenRequest
        }>,
        rawResponse?: boolean
      ): Promise<Response | TokenResponse> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperLoginPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
  
        const queryParams: ShopperLoginQueryParameters & { [key in `c_${string}`]: any } = {};
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for getTrustedAgentAccessToken: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/oauth2/trusted-agent/token",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/x-www-form-urlencoded",
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | TokenResponse;
      }
  
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
      getPasswordResetToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: PasswordActionRequest
        }>
      ): Promise<void>;
  
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
      getPasswordResetToken<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: PasswordActionRequest
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : void>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
      * 
      */
      async getPasswordResetToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: PasswordActionRequest
        }>,
        rawResponse?: boolean
      ): Promise<Response | void> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperLoginPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
  
        const queryParams: ShopperLoginQueryParameters & { [key in `c_${string}`]: any } = {};
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for getPasswordResetToken: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/oauth2/password/reset",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/x-www-form-urlencoded",
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        if (rawResponse) {
          return response as Response;
        }
      }
  
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
      resetPassword(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: PasswordActionVerifyRequest
        }>
      ): Promise<void>;
  
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
      resetPassword<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: PasswordActionVerifyRequest
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : void>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
      * 
      */
      async resetPassword(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: PasswordActionVerifyRequest
        }>,
        rawResponse?: boolean
      ): Promise<Response | void> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperLoginPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
  
        const queryParams: ShopperLoginQueryParameters & { [key in `c_${string}`]: any } = {};
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for resetPassword: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/oauth2/password/action",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/x-www-form-urlencoded",
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        if (rawResponse) {
          return response as Response;
        }
      }
  
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
      getPasswordLessAccessToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: PasswordLessLoginTokenRequest
        }>
      ): Promise<TokenResponse>;
  
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
      getPasswordLessAccessToken<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: PasswordLessLoginTokenRequest
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : TokenResponse>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type TokenResponse otherwise.
      * 
      */
      async getPasswordLessAccessToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: PasswordLessLoginTokenRequest
        }>,
        rawResponse?: boolean
      ): Promise<Response | TokenResponse> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperLoginPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
  
        const queryParams: ShopperLoginQueryParameters & { [key in `c_${string}`]: any } = {};
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for getPasswordLessAccessToken: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/oauth2/passwordless/token",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/x-www-form-urlencoded",
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | TokenResponse;
      }
  
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
      revokeToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: TokenActionRequest
        }>
      ): Promise<TokenResponse>;
  
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
      revokeToken<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: TokenActionRequest
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : TokenResponse>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type TokenResponse otherwise.
      * 
      */
      async revokeToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: TokenActionRequest
        }>,
        rawResponse?: boolean
      ): Promise<Response | TokenResponse> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperLoginPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
  
        const queryParams: ShopperLoginQueryParameters & { [key in `c_${string}`]: any } = {};
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for revokeToken: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/oauth2/revoke",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/x-www-form-urlencoded",
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | TokenResponse;
      }
  
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
      introspectToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: TokenActionRequest
        }>
      ): Promise<Object>;
  
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
      introspectToken<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: TokenActionRequest
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : Object>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Object otherwise.
      * 
      */
      async introspectToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: TokenActionRequest
        }>,
        rawResponse?: boolean
      ): Promise<Response | Object> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperLoginPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
  
        const queryParams: ShopperLoginQueryParameters & { [key in `c_${string}`]: any } = {};
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for introspectToken: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/oauth2/introspect",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/x-www-form-urlencoded",
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | Object;
      }
  
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
      getUserInfo(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            channel_id?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<Object>;
  
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
      getUserInfo<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            channel_id?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : Object>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Object otherwise.
      * 
      */
      async getUserInfo(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            channel_id?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | Object> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperLoginPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
  
        const queryParams: ShopperLoginQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["channel_id"] !== undefined) {
          queryParams["channel_id"] = optionParams["channel_id"];
        } else if (configParams["channel_id"] !== undefined) {
          queryParams["channel_id"] = configParams["channel_id"];
        }
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for getUserInfo: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/oauth2/userinfo",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "GET",
            headers,
            
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | Object;
      }
  
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
      getWellknownOpenidConfiguration(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<Object>;
  
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
      getWellknownOpenidConfiguration<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : Object>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Object otherwise.
      * 
      */
      async getWellknownOpenidConfiguration(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | Object> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperLoginPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
  
        const queryParams: ShopperLoginQueryParameters & { [key in `c_${string}`]: any } = {};
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for getWellknownOpenidConfiguration: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/oauth2/.well-known/openid-configuration",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "GET",
            headers,
            
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | Object;
      }
  
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
      getJwksUri(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<Object>;
  
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
      getJwksUri<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : Object>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Object otherwise.
      * 
      */
      async getJwksUri(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | Object> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperLoginPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
  
        const queryParams: ShopperLoginQueryParameters & { [key in `c_${string}`]: any } = {};
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for getJwksUri: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/oauth2/jwks",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "GET",
            headers,
            
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | Object;
      }
}

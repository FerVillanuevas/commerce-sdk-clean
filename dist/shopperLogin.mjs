// src/clientConfig.ts
var _ClientConfig = class _ClientConfig {
  constructor(config) {
    this.headers = { ...config.headers };
    this.parameters = { ...config.parameters };
    if (!this.parameters.shortCode) {
      throw new Error("Missing required parameter: shortCode");
    }
    this.fetchOptions = {
      credentials: "omit",
      ...config.fetchOptions
    };
    this.transformRequest = config.transformRequest || _ClientConfig.defaults.transformRequest;
    if (config.baseUri) {
      this.baseUri = config.baseUri;
    }
    if (config.proxy) {
      this.proxy = config.proxy;
    }
    this.throwOnBadResponse = !!config.throwOnBadResponse;
  }
};
_ClientConfig.defaults = {
  /**
   * If the `Content-Type` header is `application/json`, the data is converted to a JSON string.
   * If the `Content-Type` header is `application/x-www-form-urlencoded`, the data is converted to
   * a `URLSearchParams` object.
   * In all other cases, the data is returned unmodified.
   * @param data - Data to transform
   * @returns A payload appropriate for the specified `Content-Type` header
   */
  transformRequest(data, headers) {
    switch (headers["Content-Type"]) {
      case "application/json": {
        return JSON.stringify(data);
      }
      case "application/x-www-form-urlencoded": {
        return new URLSearchParams(data);
      }
      default: {
        return data;
      }
    }
  }
};
var ClientConfig = _ClientConfig;

// src/helpers/environment.ts
var isBrowser = typeof window === "object" && typeof window.document === "object";
var globalObject = isBrowser ? window : globalThis;
var hasFetchAvailable = typeof globalObject.fetch === "function";
var fetch = (() => {
  return globalObject.fetch;
})();

// src/responseError.ts
var ResponseError = class extends Error {
  constructor(response) {
    super(`${response.status} ${response.statusText}`);
    this.response = response;
  }
};

// src/helpers/fetchHelper.ts
var doFetch = async (url, options, clientConfig, rawResponse) => {
  const headers = {
    ...clientConfig?.headers,
    ...options?.headers
  };
  const requestOptions = {
    ...clientConfig?.fetchOptions,
    headers,
    body: options?.body,
    method: options?.method ?? "GET"
  };
  const response = await fetch(url, requestOptions);
  if (rawResponse) {
    return response;
  }
  if (clientConfig?.throwOnBadResponse && !response.ok && response.status !== 304) {
    throw new ResponseError(response);
  } else {
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }
};

// src/templateUrl.ts
var TemplateURL = class _TemplateURL extends URL {
  /**
   * @param url -
   * @param base -
   */
  constructor(url, base, parameters) {
    super(
      _TemplateURL.renderTemplateUri(
        `${base}/${url}`.replace(/\/\/+/g, "/"),
        parameters?.pathParams
      )
    );
    this.addQueryParams(parameters?.queryParams);
    if (parameters?.origin) {
      this.replaceOrigin(parameters?.origin);
    }
  }
  /**
   * Replace the origin (protocol/host) portion of the URL with a new origin.
   * The path portion is retained and concatenated with any path included in the
   * new origin. Thee primary use of this function is to use a proxy.
   *
   * @param newOriginString - The new origin to substitute (ex: https://example.com)
   */
  replaceOrigin(newOriginString) {
    const newOriginUrl = new URL(newOriginString);
    this.protocol = newOriginUrl.protocol;
    this.host = newOriginUrl.host;
    this.pathname = `${newOriginUrl.pathname}/${this.pathname}`.replace(
      /\/\/+/g,
      "/"
    );
  }
  /**
   * Add append an object literal of query parameters to the URL object. SCAPI expects
   * Arrays to be comma separated where \{ a: ["1", "2"] \} becomes ?a=1,2.
   * The 'refine' query parameter is an exception, where SCAPI expects the the "repeat"
   * convention where \{ refine: ["1", "2"] \} becomes "?refine=1&refine=2"
   */
  addQueryParams(queryParams) {
    if (queryParams) {
      Object.keys(queryParams).forEach((key) => {
        const param = queryParams[key];
        if (Array.isArray(param)) {
          if (key === "refine") {
            for (let i = 0; i < param.length; i += 1) {
              this.searchParams.append(key, String(param[i]));
            }
          } else {
            this.searchParams.append(key, param.join());
          }
        } else {
          this.searchParams.append(key, String(param));
        }
      });
    }
  }
  /**
   * Replace bracketed URL template parameters with values from parameters object
   *
   * @param template - The URL template string to make substitutions in
   * @param parameters - The object literal that provides the values to substitute
   *
   * @returns String URL with substitutions made
   */
  static renderTemplateUri(template, parameters) {
    return parameters ? template.replace(
      /\{([^\}]+)\}/g,
      (match, param) => String(parameters[param])
    ) : template;
  }
};

// src/version.ts
var USER_AGENT_HEADER = "user-agent";
var USER_AGENT_VALUE = "commerce-sdk-isomorphic@3.1.1";

// src/shopperLogin.ts
var ShopperLogin = class {
  constructor(config) {
    const cfg = { ...config };
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    this.clientConfig = new ClientConfig(cfg);
  }
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
  async authenticateCustomer(options, rawResponse) {
    const optionParams = options?.parameters || {};
    const configParams = this.clientConfig.parameters;
    const pathParams = {
      shortCode: configParams.shortCode,
      version: configParams.version || "v1"
    };
    if (optionParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = optionParams["organizationId"];
    } else if (configParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = configParams["organizationId"];
    } else {
      throw new Error("Missing required path parameter: organizationId");
    }
    const queryParams = {};
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for authenticateCustomer: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/oauth2/login",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
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
    );
    if (rawResponse) {
      return response;
    }
  }
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
  async authorizePasswordlessCustomer(options, rawResponse) {
    const optionParams = options?.parameters || {};
    const configParams = this.clientConfig.parameters;
    const pathParams = {
      shortCode: configParams.shortCode,
      version: configParams.version || "v1"
    };
    if (optionParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = optionParams["organizationId"];
    } else if (configParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = configParams["organizationId"];
    } else {
      throw new Error("Missing required path parameter: organizationId");
    }
    const queryParams = {};
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for authorizePasswordlessCustomer: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/oauth2/passwordless/login",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
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
    );
    return response;
  }
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
  async logoutCustomer(options, rawResponse) {
    const optionParams = options?.parameters || {};
    const configParams = this.clientConfig.parameters;
    const pathParams = {
      shortCode: configParams.shortCode,
      version: configParams.version || "v1"
    };
    if (optionParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = optionParams["organizationId"];
    } else if (configParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = configParams["organizationId"];
    } else {
      throw new Error("Missing required path parameter: organizationId");
    }
    const queryParams = {};
    if (optionParams["client_id"] !== void 0) {
      queryParams["client_id"] = optionParams["client_id"];
    } else if (configParams["client_id"] !== void 0) {
      queryParams["client_id"] = configParams["client_id"];
    } else {
      throw new Error("Missing required query parameter: client_id");
    }
    if (optionParams["refresh_token"] !== void 0) {
      queryParams["refresh_token"] = optionParams["refresh_token"];
    } else if (configParams["refresh_token"] !== void 0) {
      queryParams["refresh_token"] = configParams["refresh_token"];
    } else {
      throw new Error("Missing required query parameter: refresh_token");
    }
    if (optionParams["channel_id"] !== void 0) {
      queryParams["channel_id"] = optionParams["channel_id"];
    } else if (configParams["channel_id"] !== void 0) {
      queryParams["channel_id"] = configParams["channel_id"];
    }
    if (optionParams["hint"] !== void 0) {
      queryParams["hint"] = optionParams["hint"];
    } else if (configParams["hint"] !== void 0) {
      queryParams["hint"] = configParams["hint"];
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for logoutCustomer: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/oauth2/logout",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
      headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
    }
    const response = await doFetch(
      url.toString(),
      {
        method: "GET",
        headers
      },
      this.clientConfig,
      rawResponse
    );
    return response;
  }
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
  async authorizeCustomer(options, rawResponse) {
    const optionParams = options?.parameters || {};
    const configParams = this.clientConfig.parameters;
    const pathParams = {
      shortCode: configParams.shortCode,
      version: configParams.version || "v1"
    };
    if (optionParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = optionParams["organizationId"];
    } else if (configParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = configParams["organizationId"];
    } else {
      throw new Error("Missing required path parameter: organizationId");
    }
    const queryParams = {};
    if (optionParams["redirect_uri"] !== void 0) {
      queryParams["redirect_uri"] = optionParams["redirect_uri"];
    } else if (configParams["redirect_uri"] !== void 0) {
      queryParams["redirect_uri"] = configParams["redirect_uri"];
    } else {
      throw new Error("Missing required query parameter: redirect_uri");
    }
    if (optionParams["response_type"] !== void 0) {
      queryParams["response_type"] = optionParams["response_type"];
    } else if (configParams["response_type"] !== void 0) {
      queryParams["response_type"] = configParams["response_type"];
    } else {
      throw new Error("Missing required query parameter: response_type");
    }
    if (optionParams["client_id"] !== void 0) {
      queryParams["client_id"] = optionParams["client_id"];
    } else if (configParams["client_id"] !== void 0) {
      queryParams["client_id"] = configParams["client_id"];
    } else {
      throw new Error("Missing required query parameter: client_id");
    }
    if (optionParams["scope"] !== void 0) {
      queryParams["scope"] = optionParams["scope"];
    } else if (configParams["scope"] !== void 0) {
      queryParams["scope"] = configParams["scope"];
    }
    if (optionParams["state"] !== void 0) {
      queryParams["state"] = optionParams["state"];
    } else if (configParams["state"] !== void 0) {
      queryParams["state"] = configParams["state"];
    }
    if (optionParams["usid"] !== void 0) {
      queryParams["usid"] = optionParams["usid"];
    } else if (configParams["usid"] !== void 0) {
      queryParams["usid"] = configParams["usid"];
    }
    if (optionParams["hint"] !== void 0) {
      queryParams["hint"] = optionParams["hint"];
    } else if (configParams["hint"] !== void 0) {
      queryParams["hint"] = configParams["hint"];
    }
    if (optionParams["channel_id"] !== void 0) {
      queryParams["channel_id"] = optionParams["channel_id"];
    } else if (configParams["channel_id"] !== void 0) {
      queryParams["channel_id"] = configParams["channel_id"];
    }
    if (optionParams["code_challenge"] !== void 0) {
      queryParams["code_challenge"] = optionParams["code_challenge"];
    } else if (configParams["code_challenge"] !== void 0) {
      queryParams["code_challenge"] = configParams["code_challenge"];
    }
    if (optionParams["ui_locales"] !== void 0) {
      queryParams["ui_locales"] = optionParams["ui_locales"];
    } else if (configParams["ui_locales"] !== void 0) {
      queryParams["ui_locales"] = configParams["ui_locales"];
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for authorizeCustomer: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/oauth2/authorize",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
      headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
    }
    const response = await doFetch(
      url.toString(),
      {
        method: "GET",
        headers
      },
      this.clientConfig,
      rawResponse
    );
    if (rawResponse) {
      return response;
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
  async getAccessToken(options, rawResponse) {
    const optionParams = options?.parameters || {};
    const configParams = this.clientConfig.parameters;
    const pathParams = {
      shortCode: configParams.shortCode,
      version: configParams.version || "v1"
    };
    if (optionParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = optionParams["organizationId"];
    } else if (configParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = configParams["organizationId"];
    } else {
      throw new Error("Missing required path parameter: organizationId");
    }
    const queryParams = {};
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getAccessToken: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/oauth2/token",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
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
    );
    return response;
  }
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
  async getSessionBridgeAccessToken(options, rawResponse) {
    const optionParams = options?.parameters || {};
    const configParams = this.clientConfig.parameters;
    const pathParams = {
      shortCode: configParams.shortCode,
      version: configParams.version || "v1"
    };
    if (optionParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = optionParams["organizationId"];
    } else if (configParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = configParams["organizationId"];
    } else {
      throw new Error("Missing required path parameter: organizationId");
    }
    const queryParams = {};
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getSessionBridgeAccessToken: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/oauth2/session-bridge/token",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
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
    );
    return response;
  }
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
  async getTrustedSystemAccessToken(options, rawResponse) {
    const optionParams = options?.parameters || {};
    const configParams = this.clientConfig.parameters;
    const pathParams = {
      shortCode: configParams.shortCode,
      version: configParams.version || "v1"
    };
    if (optionParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = optionParams["organizationId"];
    } else if (configParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = configParams["organizationId"];
    } else {
      throw new Error("Missing required path parameter: organizationId");
    }
    const queryParams = {};
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getTrustedSystemAccessToken: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/oauth2/trusted-system/token",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
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
    );
    return response;
  }
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
  async getTrustedAgentAuthorizationToken(options, rawResponse) {
    const optionParams = options?.parameters || {};
    const configParams = this.clientConfig.parameters;
    const pathParams = {
      shortCode: configParams.shortCode,
      version: configParams.version || "v1"
    };
    if (optionParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = optionParams["organizationId"];
    } else if (configParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = configParams["organizationId"];
    } else {
      throw new Error("Missing required path parameter: organizationId");
    }
    const queryParams = {};
    if (optionParams["client_id"] !== void 0) {
      queryParams["client_id"] = optionParams["client_id"];
    } else if (configParams["client_id"] !== void 0) {
      queryParams["client_id"] = configParams["client_id"];
    } else {
      throw new Error("Missing required query parameter: client_id");
    }
    if (optionParams["channel_id"] !== void 0) {
      queryParams["channel_id"] = optionParams["channel_id"];
    } else if (configParams["channel_id"] !== void 0) {
      queryParams["channel_id"] = configParams["channel_id"];
    } else {
      throw new Error("Missing required query parameter: channel_id");
    }
    if (optionParams["code_challenge"] !== void 0) {
      queryParams["code_challenge"] = optionParams["code_challenge"];
    } else if (configParams["code_challenge"] !== void 0) {
      queryParams["code_challenge"] = configParams["code_challenge"];
    } else {
      throw new Error("Missing required query parameter: code_challenge");
    }
    if (optionParams["login_id"] !== void 0) {
      queryParams["login_id"] = optionParams["login_id"];
    } else if (configParams["login_id"] !== void 0) {
      queryParams["login_id"] = configParams["login_id"];
    } else {
      throw new Error("Missing required query parameter: login_id");
    }
    if (optionParams["idp_origin"] !== void 0) {
      queryParams["idp_origin"] = optionParams["idp_origin"];
    } else if (configParams["idp_origin"] !== void 0) {
      queryParams["idp_origin"] = configParams["idp_origin"];
    } else {
      throw new Error("Missing required query parameter: idp_origin");
    }
    if (optionParams["redirect_uri"] !== void 0) {
      queryParams["redirect_uri"] = optionParams["redirect_uri"];
    } else if (configParams["redirect_uri"] !== void 0) {
      queryParams["redirect_uri"] = configParams["redirect_uri"];
    } else {
      throw new Error("Missing required query parameter: redirect_uri");
    }
    if (optionParams["response_type"] !== void 0) {
      queryParams["response_type"] = optionParams["response_type"];
    } else if (configParams["response_type"] !== void 0) {
      queryParams["response_type"] = configParams["response_type"];
    } else {
      throw new Error("Missing required query parameter: response_type");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getTrustedAgentAuthorizationToken: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/oauth2/trusted-agent/authorize",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
      headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
    }
    const response = await doFetch(
      url.toString(),
      {
        method: "GET",
        headers
      },
      this.clientConfig,
      rawResponse
    );
    if (rawResponse) {
      return response;
    }
  }
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
  async getTrustedAgentAccessToken(options, rawResponse) {
    const optionParams = options?.parameters || {};
    const configParams = this.clientConfig.parameters;
    const pathParams = {
      shortCode: configParams.shortCode,
      version: configParams.version || "v1"
    };
    if (optionParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = optionParams["organizationId"];
    } else if (configParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = configParams["organizationId"];
    } else {
      throw new Error("Missing required path parameter: organizationId");
    }
    const queryParams = {};
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getTrustedAgentAccessToken: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/oauth2/trusted-agent/token",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
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
    );
    return response;
  }
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
  async getPasswordResetToken(options, rawResponse) {
    const optionParams = options?.parameters || {};
    const configParams = this.clientConfig.parameters;
    const pathParams = {
      shortCode: configParams.shortCode,
      version: configParams.version || "v1"
    };
    if (optionParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = optionParams["organizationId"];
    } else if (configParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = configParams["organizationId"];
    } else {
      throw new Error("Missing required path parameter: organizationId");
    }
    const queryParams = {};
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getPasswordResetToken: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/oauth2/password/reset",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
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
    );
    if (rawResponse) {
      return response;
    }
  }
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
  async resetPassword(options, rawResponse) {
    const optionParams = options?.parameters || {};
    const configParams = this.clientConfig.parameters;
    const pathParams = {
      shortCode: configParams.shortCode,
      version: configParams.version || "v1"
    };
    if (optionParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = optionParams["organizationId"];
    } else if (configParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = configParams["organizationId"];
    } else {
      throw new Error("Missing required path parameter: organizationId");
    }
    const queryParams = {};
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for resetPassword: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/oauth2/password/action",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
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
    );
    if (rawResponse) {
      return response;
    }
  }
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
  async getPasswordLessAccessToken(options, rawResponse) {
    const optionParams = options?.parameters || {};
    const configParams = this.clientConfig.parameters;
    const pathParams = {
      shortCode: configParams.shortCode,
      version: configParams.version || "v1"
    };
    if (optionParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = optionParams["organizationId"];
    } else if (configParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = configParams["organizationId"];
    } else {
      throw new Error("Missing required path parameter: organizationId");
    }
    const queryParams = {};
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getPasswordLessAccessToken: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/oauth2/passwordless/token",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
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
    );
    return response;
  }
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
  async revokeToken(options, rawResponse) {
    const optionParams = options?.parameters || {};
    const configParams = this.clientConfig.parameters;
    const pathParams = {
      shortCode: configParams.shortCode,
      version: configParams.version || "v1"
    };
    if (optionParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = optionParams["organizationId"];
    } else if (configParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = configParams["organizationId"];
    } else {
      throw new Error("Missing required path parameter: organizationId");
    }
    const queryParams = {};
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for revokeToken: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/oauth2/revoke",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
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
    );
    return response;
  }
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
  async introspectToken(options, rawResponse) {
    const optionParams = options?.parameters || {};
    const configParams = this.clientConfig.parameters;
    const pathParams = {
      shortCode: configParams.shortCode,
      version: configParams.version || "v1"
    };
    if (optionParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = optionParams["organizationId"];
    } else if (configParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = configParams["organizationId"];
    } else {
      throw new Error("Missing required path parameter: organizationId");
    }
    const queryParams = {};
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for introspectToken: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/oauth2/introspect",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
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
    );
    return response;
  }
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
  async getUserInfo(options, rawResponse) {
    const optionParams = options?.parameters || {};
    const configParams = this.clientConfig.parameters;
    const pathParams = {
      shortCode: configParams.shortCode,
      version: configParams.version || "v1"
    };
    if (optionParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = optionParams["organizationId"];
    } else if (configParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = configParams["organizationId"];
    } else {
      throw new Error("Missing required path parameter: organizationId");
    }
    const queryParams = {};
    if (optionParams["channel_id"] !== void 0) {
      queryParams["channel_id"] = optionParams["channel_id"];
    } else if (configParams["channel_id"] !== void 0) {
      queryParams["channel_id"] = configParams["channel_id"];
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getUserInfo: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/oauth2/userinfo",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
      headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
    }
    const response = await doFetch(
      url.toString(),
      {
        method: "GET",
        headers
      },
      this.clientConfig,
      rawResponse
    );
    return response;
  }
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
  async getWellknownOpenidConfiguration(options, rawResponse) {
    const optionParams = options?.parameters || {};
    const configParams = this.clientConfig.parameters;
    const pathParams = {
      shortCode: configParams.shortCode,
      version: configParams.version || "v1"
    };
    if (optionParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = optionParams["organizationId"];
    } else if (configParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = configParams["organizationId"];
    } else {
      throw new Error("Missing required path parameter: organizationId");
    }
    const queryParams = {};
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getWellknownOpenidConfiguration: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/oauth2/.well-known/openid-configuration",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
      headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
    }
    const response = await doFetch(
      url.toString(),
      {
        method: "GET",
        headers
      },
      this.clientConfig,
      rawResponse
    );
    return response;
  }
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
  async getJwksUri(options, rawResponse) {
    const optionParams = options?.parameters || {};
    const configParams = this.clientConfig.parameters;
    const pathParams = {
      shortCode: configParams.shortCode,
      version: configParams.version || "v1"
    };
    if (optionParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = optionParams["organizationId"];
    } else if (configParams["organizationId"] !== void 0) {
      pathParams["organizationId"] = configParams["organizationId"];
    } else {
      throw new Error("Missing required path parameter: organizationId");
    }
    const queryParams = {};
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getJwksUri: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/oauth2/jwks",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
      headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
    }
    const response = await doFetch(
      url.toString(),
      {
        method: "GET",
        headers
      },
      this.clientConfig,
      rawResponse
    );
    return response;
  }
};
ShopperLogin.defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/shopper/auth/{version}";
ShopperLogin.apiPaths = {
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
  getJwksUri: "/organizations/{organizationId}/oauth2/jwks"
};
ShopperLogin.paramKeys = {
  authenticateCustomer: [
    "organizationId"
  ],
  authenticateCustomerRequired: [
    "organizationId"
  ],
  authorizePasswordlessCustomer: [
    "organizationId"
  ],
  authorizePasswordlessCustomerRequired: [
    "organizationId"
  ],
  logoutCustomer: [
    "organizationId",
    "client_id",
    "refresh_token",
    "channel_id",
    "hint"
  ],
  logoutCustomerRequired: [
    "organizationId",
    "client_id",
    "refresh_token"
  ],
  authorizeCustomer: [
    "organizationId",
    "redirect_uri",
    "response_type",
    "client_id",
    "scope",
    "state",
    "usid",
    "hint",
    "channel_id",
    "code_challenge",
    "ui_locales"
  ],
  authorizeCustomerRequired: [
    "organizationId",
    "redirect_uri",
    "response_type",
    "client_id"
  ],
  getAccessToken: [
    "organizationId"
  ],
  getAccessTokenRequired: [
    "organizationId"
  ],
  getSessionBridgeAccessToken: [
    "organizationId"
  ],
  getSessionBridgeAccessTokenRequired: [
    "organizationId"
  ],
  getTrustedSystemAccessToken: [
    "organizationId"
  ],
  getTrustedSystemAccessTokenRequired: [
    "organizationId"
  ],
  getTrustedAgentAuthorizationToken: [
    "organizationId",
    "client_id",
    "channel_id",
    "code_challenge",
    "login_id",
    "idp_origin",
    "redirect_uri",
    "response_type"
  ],
  getTrustedAgentAuthorizationTokenRequired: [
    "organizationId",
    "client_id",
    "channel_id",
    "code_challenge",
    "login_id",
    "idp_origin",
    "redirect_uri",
    "response_type"
  ],
  getTrustedAgentAccessToken: [
    "organizationId"
  ],
  getTrustedAgentAccessTokenRequired: [
    "organizationId"
  ],
  getPasswordResetToken: [
    "organizationId"
  ],
  getPasswordResetTokenRequired: [
    "organizationId"
  ],
  resetPassword: [
    "organizationId"
  ],
  resetPasswordRequired: [
    "organizationId"
  ],
  getPasswordLessAccessToken: [
    "organizationId"
  ],
  getPasswordLessAccessTokenRequired: [
    "organizationId"
  ],
  revokeToken: [
    "organizationId"
  ],
  revokeTokenRequired: [
    "organizationId"
  ],
  introspectToken: [
    "organizationId"
  ],
  introspectTokenRequired: [
    "organizationId"
  ],
  getUserInfo: [
    "organizationId",
    "channel_id"
  ],
  getUserInfoRequired: [
    "organizationId"
  ],
  getWellknownOpenidConfiguration: [
    "organizationId"
  ],
  getWellknownOpenidConfigurationRequired: [
    "organizationId"
  ],
  getJwksUri: [
    "organizationId"
  ],
  getJwksUriRequired: [
    "organizationId"
  ]
};
export {
  ShopperLogin
};
//# sourceMappingURL=shopperLogin.mjs.map
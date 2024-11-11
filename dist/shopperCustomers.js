"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/shopperCustomers.ts
var shopperCustomers_exports = {};
__export(shopperCustomers_exports, {
  ShopperCustomers: () => ShopperCustomers
});
module.exports = __toCommonJS(shopperCustomers_exports);

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

// src/shopperCustomers.ts
var ShopperCustomers = class {
  constructor(config) {
    const cfg = { ...config };
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    this.clientConfig = new ClientConfig(cfg);
  }
  /**
  * Registers a new customer. The mandatory data are the credentials, profile last name, and email. This requires a JSON Web Token (JWT) which needs to be obtained using the POST /customers/auth API with type \"guest\", or from the Shopper Login (SLAS) API. The return type object for this endpoint is a common customer object shared by multiple Shopper Customer endpoints. In this case, all customer object details are returned, but attributes that are not included in the response, although they might be part of the customer object, are ignored. For example, although address information is included in the customer object, it is not displayed in the response for this endpoint and is ignored.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param body - The data to send as the request body.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type Customer otherwise.
  * 
  */
  async registerCustomer(options, rawResponse) {
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
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for registerCustomer: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/json",
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
  * Reset customer password, after obtaining a reset token. This is the second step in the reset customer password flow, where a customer password is reset by providing the new credentials along with a reset token. This call should be preceded by a call to the /create-reset-token endpoint.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param siteId - 
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
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for resetPassword: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/password/actions/reset",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/json",
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
  * Get reset password token. This is the first step in the reset customer password flow, where a password reset token is requested for future use to reset a customer password. This call should be followed by a call to the /reset endpoint.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param body - The data to send as the request body.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type ResetPasswordToken otherwise.
  * 
  */
  async getResetPasswordToken(options, rawResponse) {
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
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getResetPasswordToken: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/password/actions/create-reset-token",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/json",
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
  * Registers a new external profile for a customer. This endpoint accepts a guest customer ShopperToken (JWT) only.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param body - The data to send as the request body.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type CustomerExternalProfile otherwise.
  * 
  */
  async registerExternalProfile(options, rawResponse) {
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
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for registerExternalProfile: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/external-profile",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/json",
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
  * Gets the new external profile for a customer. This endpoint accepts a registered customer ShopperToken (JWT) only.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param externalId - The External ID of the customer.
  * @param authenticationProviderId - The authentication Provider Id.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type CustomerExternalProfile otherwise.
  * 
  */
  async getExternalProfile(options, rawResponse) {
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
    if (optionParams["externalId"] !== void 0) {
      queryParams["externalId"] = optionParams["externalId"];
    } else if (configParams["externalId"] !== void 0) {
      queryParams["externalId"] = configParams["externalId"];
    } else {
      throw new Error("Missing required query parameter: externalId");
    }
    if (optionParams["authenticationProviderId"] !== void 0) {
      queryParams["authenticationProviderId"] = optionParams["authenticationProviderId"];
    } else if (configParams["authenticationProviderId"] !== void 0) {
      queryParams["authenticationProviderId"] = configParams["authenticationProviderId"];
    } else {
      throw new Error("Missing required query parameter: authenticationProviderId");
    }
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getExternalProfile: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/external-profile",
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
  * Gets a customer with all existing addresses and payment instruments associated with the requested customer. This endpoint accepts a registered customer ShopperToken (JWT) only.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type Customer otherwise.
  * 
  */
  async getCustomer(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getCustomer: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}",
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
  * Updates a customer. This endpoint accepts a registered customer ShopperToken (JWT) only.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param body - The data to send as the request body.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type Customer otherwise.
  * 
  */
  async updateCustomer(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updateCustomer: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/json",
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
      headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
    }
    const response = await doFetch(
      url.toString(),
      {
        method: "PATCH",
        headers,
        body: this.clientConfig.transformRequest(options.body, headers)
      },
      this.clientConfig,
      rawResponse
    );
    return response;
  }
  /**
  * Creates a new address with the given name for the given customer. This endpoint accepts a registered customer ShopperToken (JWT) only.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param body - The data to send as the request body.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type CustomerAddress otherwise.
  * 
  */
  async createCustomerAddress(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for createCustomerAddress: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/addresses",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/json",
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
  * Retrieves a customer's address by address name. This endpoint accepts a registered customer ShopperToken (JWT) only.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param addressName - The name of the address to update.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type CustomerAddress otherwise.
  * 
  */
  async getCustomerAddress(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    if (optionParams["addressName"] !== void 0) {
      pathParams["addressName"] = optionParams["addressName"];
    } else if (configParams["addressName"] !== void 0) {
      pathParams["addressName"] = configParams["addressName"];
    } else {
      throw new Error("Missing required path parameter: addressName");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getCustomerAddress: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}",
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
  * Deletes a customer's address by address name. This endpoint accepts a registered customer ShopperToken (JWT) only.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param addressName - The name of the address to update.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
  * 
  */
  async removeCustomerAddress(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    if (optionParams["addressName"] !== void 0) {
      pathParams["addressName"] = optionParams["addressName"];
    } else if (configParams["addressName"] !== void 0) {
      pathParams["addressName"] = configParams["addressName"];
    } else {
      throw new Error("Missing required path parameter: addressName");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for removeCustomerAddress: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}",
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
        method: "DELETE",
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
  * Updates a customer's address by address name. This endpoint accepts a registered customer ShopperToken (JWT) only.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param addressName - The name of the address to update.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param body - The data to send as the request body.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type CustomerAddress otherwise.
  * 
  */
  async updateCustomerAddress(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    if (optionParams["addressName"] !== void 0) {
      pathParams["addressName"] = optionParams["addressName"];
    } else if (configParams["addressName"] !== void 0) {
      pathParams["addressName"] = configParams["addressName"];
    } else {
      throw new Error("Missing required path parameter: addressName");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updateCustomerAddress: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/json",
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
      headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
    }
    const response = await doFetch(
      url.toString(),
      {
        method: "PATCH",
        headers,
        body: this.clientConfig.transformRequest(options.body, headers)
      },
      this.clientConfig,
      rawResponse
    );
    return response;
  }
  /**
  * Gets the baskets of a customer. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type BasketsResult otherwise.
  * 
  */
  async getCustomerBaskets(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getCustomerBaskets: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/baskets",
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
  * Returns a pageable list of all customer's orders. The default page size is 10. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param crossSites - The flag indicating whether all sites should be searched. This flag is ignored unless a valid User / Agent is present with a trusted agent on behalf (TAOB) token. Without a TAOB token, only the customer's orders placed on the site specified by siteId are returned.
  * @param from - 
  * @param until - 
  * @param status - 
  * @param siteId - 
  * @param offset - 
  * @param limit - Maximum records to retrieve per request, not to exceed 50. Defaults to 10.
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type CustomerOrderResult otherwise.
  * 
  */
  async getCustomerOrders(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    const queryParams = {};
    if (optionParams["crossSites"] !== void 0) {
      queryParams["crossSites"] = optionParams["crossSites"];
    } else if (configParams["crossSites"] !== void 0) {
      queryParams["crossSites"] = configParams["crossSites"];
    }
    if (optionParams["from"] !== void 0) {
      queryParams["from"] = optionParams["from"];
    } else if (configParams["from"] !== void 0) {
      queryParams["from"] = configParams["from"];
    }
    if (optionParams["until"] !== void 0) {
      queryParams["until"] = optionParams["until"];
    } else if (configParams["until"] !== void 0) {
      queryParams["until"] = configParams["until"];
    }
    if (optionParams["status"] !== void 0) {
      queryParams["status"] = optionParams["status"];
    } else if (configParams["status"] !== void 0) {
      queryParams["status"] = configParams["status"];
    }
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    if (optionParams["offset"] !== void 0) {
      queryParams["offset"] = optionParams["offset"];
    } else if (configParams["offset"] !== void 0) {
      queryParams["offset"] = configParams["offset"];
    }
    if (optionParams["limit"] !== void 0) {
      queryParams["limit"] = optionParams["limit"];
    } else if (configParams["limit"] !== void 0) {
      queryParams["limit"] = configParams["limit"];
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getCustomerOrders: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/orders",
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
  * Updates the customer's password. This endpoint accepts a registered customer ShopperToken (JWT) only.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param body - The data to send as the request body.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
  * 
  */
  async updateCustomerPassword(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updateCustomerPassword: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/password",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/json",
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
      headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
    }
    const response = await doFetch(
      url.toString(),
      {
        method: "PUT",
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
  * Adds a payment instrument to the customer information. This endpoint accepts a registered customer ShopperToken (JWT) only.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param body - The data to send as the request body.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type CustomerPaymentInstrument otherwise.
  * 
  */
  async createCustomerPaymentInstrument(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for createCustomerPaymentInstrument: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/payment-instruments",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/json",
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
  * Deletes a customer's payment instrument. This endpoint accepts a registered customer ShopperToken (JWT) only.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param paymentInstrumentId - The ID of the payment instrument to be retrievedCustomer.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
  * 
  */
  async deleteCustomerPaymentInstrument(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    if (optionParams["paymentInstrumentId"] !== void 0) {
      pathParams["paymentInstrumentId"] = optionParams["paymentInstrumentId"];
    } else if (configParams["paymentInstrumentId"] !== void 0) {
      pathParams["paymentInstrumentId"] = configParams["paymentInstrumentId"];
    } else {
      throw new Error("Missing required path parameter: paymentInstrumentId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for deleteCustomerPaymentInstrument: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/payment-instruments/{paymentInstrumentId}",
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
        method: "DELETE",
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
  * Retrieves a customer's payment instrument by its ID. This endpoint accepts a registered customer ShopperToken (JWT) only.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param paymentInstrumentId - The ID of the payment instrument to be retrievedCustomer.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type CustomerPaymentInstrument otherwise.
  * 
  */
  async getCustomerPaymentInstrument(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    if (optionParams["paymentInstrumentId"] !== void 0) {
      pathParams["paymentInstrumentId"] = optionParams["paymentInstrumentId"];
    } else if (configParams["paymentInstrumentId"] !== void 0) {
      pathParams["paymentInstrumentId"] = configParams["paymentInstrumentId"];
    } else {
      throw new Error("Missing required path parameter: paymentInstrumentId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getCustomerPaymentInstrument: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/payment-instruments/{paymentInstrumentId}",
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
  * Returns all customer product lists. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductListResult otherwise.
  * 
  */
  async getCustomerProductLists(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getCustomerProductLists: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/product-lists",
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
  * Creates a customer product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param body - The data to send as the request body.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductList otherwise.
  * 
  */
  async createCustomerProductList(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for createCustomerProductList: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/product-lists",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/json",
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
  * Deletes a customer product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer  ShopperToken.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param listId - The product list ID.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
  * 
  */
  async deleteCustomerProductList(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    if (optionParams["listId"] !== void 0) {
      pathParams["listId"] = optionParams["listId"];
    } else if (configParams["listId"] !== void 0) {
      pathParams["listId"] = configParams["listId"];
    } else {
      throw new Error("Missing required path parameter: listId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for deleteCustomerProductList: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}",
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
        method: "DELETE",
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
  * Returns a customer product list of the given customer and the items in the list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param listId - The product list ID.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductList otherwise.
  * 
  */
  async getCustomerProductList(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    if (optionParams["listId"] !== void 0) {
      pathParams["listId"] = optionParams["listId"];
    } else if (configParams["listId"] !== void 0) {
      pathParams["listId"] = configParams["listId"];
    } else {
      throw new Error("Missing required path parameter: listId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getCustomerProductList: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}",
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
  * Changes a product list. Changeable properties are the name, description, and if the list is public. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param listId - The product list ID.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param body - The data to send as the request body.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductList otherwise.
  * 
  */
  async updateCustomerProductList(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    if (optionParams["listId"] !== void 0) {
      pathParams["listId"] = optionParams["listId"];
    } else if (configParams["listId"] !== void 0) {
      pathParams["listId"] = configParams["listId"];
    } else {
      throw new Error("Missing required path parameter: listId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updateCustomerProductList: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/json",
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
      headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
    }
    const response = await doFetch(
      url.toString(),
      {
        method: "PATCH",
        headers,
        body: this.clientConfig.transformRequest(options.body, headers)
      },
      this.clientConfig,
      rawResponse
    );
    return response;
  }
  /**
      * Adds an item to the customer's product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
  
  Considered values from the request body are:
  
  - `type` → The type of the item to be added to the customer's product. Must be a valid type. Mandatory.
  list.
  - `priority` → The priority of the item to be added to the customer's product list.
  - `public` → The flag that determines whether the item to be added to the customer's product list is public.
  - `product_id` → The ID (SKU) of the product related to the item to be added to the customer's product list. A valid product ID, used for product item type only. Must be a valid product ID; otherwise, a `ProductListProductIdMissingException` or `ProductListProductNotFoundException` is thrown. Mandatory when item type is `product`.
  - `quantity` → Used for product item type only. This is the quantity of the item to be added to the customer's product list.
  
  You can also use a custom property of the form `c_\<CUSTOM_NAME\>`. The custom property must correspond to a custom attribute (`\<CUSTOM_NAME\>`) that is defined for `ProductListItem`. The value of this property must be valid for the type of custom attribute defined for `ProductListItem`.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param customerId - The customer ID.
      * @param listId - The product list ID.
      * @param siteId - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductListItem otherwise.
      * 
      */
  async createCustomerProductListItem(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    if (optionParams["listId"] !== void 0) {
      pathParams["listId"] = optionParams["listId"];
    } else if (configParams["listId"] !== void 0) {
      pathParams["listId"] = configParams["listId"];
    } else {
      throw new Error("Missing required path parameter: listId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for createCustomerProductListItem: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/json",
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
  * Removes an item from a customer product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param listId - The product list ID.
  * @param itemId - The ID of the product list item to update.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
  * 
  */
  async deleteCustomerProductListItem(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    if (optionParams["listId"] !== void 0) {
      pathParams["listId"] = optionParams["listId"];
    } else if (configParams["listId"] !== void 0) {
      pathParams["listId"] = configParams["listId"];
    } else {
      throw new Error("Missing required path parameter: listId");
    }
    if (optionParams["itemId"] !== void 0) {
      pathParams["itemId"] = optionParams["itemId"];
    } else if (configParams["itemId"] !== void 0) {
      pathParams["itemId"] = configParams["itemId"];
    } else {
      throw new Error("Missing required path parameter: itemId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for deleteCustomerProductListItem: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items/{itemId}",
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
        method: "DELETE",
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
  * Returns an item of a customer product list and the actual product details like image, availability and price. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param customerId - The customer ID.
  * @param listId - The product list ID.
  * @param itemId - The ID of the product list item to update.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductListItem otherwise.
  * 
  */
  async getCustomerProductListItem(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    if (optionParams["listId"] !== void 0) {
      pathParams["listId"] = optionParams["listId"];
    } else if (configParams["listId"] !== void 0) {
      pathParams["listId"] = configParams["listId"];
    } else {
      throw new Error("Missing required path parameter: listId");
    }
    if (optionParams["itemId"] !== void 0) {
      pathParams["itemId"] = optionParams["itemId"];
    } else if (configParams["itemId"] !== void 0) {
      pathParams["itemId"] = configParams["itemId"];
    } else {
      throw new Error("Missing required path parameter: itemId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getCustomerProductListItem: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items/{itemId}",
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
      * Updates an item of a customer's product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
  Considered values from the request body are:
  
  priority: This is the priority of the customer's product list item.
  public: This is the flag whether the customer's product list item is public.
  quantity: This is the quantity of
  the customer's product list item. Used for product item type only. 
  custom properties in the form c_\<CUSTOM_NAME\>: The custom property
  must correspond to a custom attribute (\<CUSTOM_NAME\>) defined for ProductListItem.
  The value of this property must be valid for the type of custom attribute defined for ProductListItem.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param customerId - The customer ID.
      * @param listId - The product list ID.
      * @param itemId - The ID of the product list item to update.
      * @param siteId - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductListItem otherwise.
      * 
      */
  async updateCustomerProductListItem(options, rawResponse) {
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
    if (optionParams["customerId"] !== void 0) {
      pathParams["customerId"] = optionParams["customerId"];
    } else if (configParams["customerId"] !== void 0) {
      pathParams["customerId"] = configParams["customerId"];
    } else {
      throw new Error("Missing required path parameter: customerId");
    }
    if (optionParams["listId"] !== void 0) {
      pathParams["listId"] = optionParams["listId"];
    } else if (configParams["listId"] !== void 0) {
      pathParams["listId"] = configParams["listId"];
    } else {
      throw new Error("Missing required path parameter: listId");
    }
    if (optionParams["itemId"] !== void 0) {
      pathParams["itemId"] = optionParams["itemId"];
    } else if (configParams["itemId"] !== void 0) {
      pathParams["itemId"] = configParams["itemId"];
    } else {
      throw new Error("Missing required path parameter: itemId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updateCustomerProductListItem: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items/{itemId}",
      this.clientConfig.baseUri,
      {
        pathParams,
        queryParams,
        origin: this.clientConfig.proxy
      }
    );
    const headers = {
      "Content-Type": "application/json",
      ...this.clientConfig.headers,
      ...options?.headers
    };
    if (!isBrowser) {
      headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
    }
    const response = await doFetch(
      url.toString(),
      {
        method: "PATCH",
        headers,
        body: this.clientConfig.transformRequest(options.body, headers)
      },
      this.clientConfig,
      rawResponse
    );
    return response;
  }
  /**
  * Retrieves all public product lists as defined by the given search term (for example, email OR first name and last name). This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param email - The email address of the customer the product lists belong to.
  * @param firstName - The first name of the customer the product lists belong to.
  * @param lastName - The last name of the customer the product lists belong to.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type PublicProductListResult otherwise.
  * 
  */
  async getPublicProductListsBySearchTerm(options, rawResponse) {
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
    if (optionParams["email"] !== void 0) {
      queryParams["email"] = optionParams["email"];
    } else if (configParams["email"] !== void 0) {
      queryParams["email"] = configParams["email"];
    }
    if (optionParams["firstName"] !== void 0) {
      queryParams["firstName"] = optionParams["firstName"];
    } else if (configParams["firstName"] !== void 0) {
      queryParams["firstName"] = configParams["firstName"];
    }
    if (optionParams["lastName"] !== void 0) {
      queryParams["lastName"] = optionParams["lastName"];
    } else if (configParams["lastName"] !== void 0) {
      queryParams["lastName"] = configParams["lastName"];
    }
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getPublicProductListsBySearchTerm: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/product-lists",
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
  * Retrieves a public product list by ID and the items under that product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param listId - The ID of the list.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type PublicProductList otherwise.
  * 
  */
  async getPublicProductList(options, rawResponse) {
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
    if (optionParams["listId"] !== void 0) {
      pathParams["listId"] = optionParams["listId"];
    } else if (configParams["listId"] !== void 0) {
      pathParams["listId"] = configParams["listId"];
    } else {
      throw new Error("Missing required path parameter: listId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getPublicProductList: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/product-lists/{listId}",
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
  * Retrieves an item from a public product list and the actual product details like product, image, availability and price. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param listId - The ID of the list.
  * @param itemId - The ID of the item.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type PublicProductListItem otherwise.
  * 
  */
  async getProductListItem(options, rawResponse) {
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
    if (optionParams["listId"] !== void 0) {
      pathParams["listId"] = optionParams["listId"];
    } else if (configParams["listId"] !== void 0) {
      pathParams["listId"] = configParams["listId"];
    } else {
      throw new Error("Missing required path parameter: listId");
    }
    if (optionParams["itemId"] !== void 0) {
      pathParams["itemId"] = optionParams["itemId"];
    } else if (configParams["itemId"] !== void 0) {
      pathParams["itemId"] = configParams["itemId"];
    } else {
      throw new Error("Missing required path parameter: itemId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getProductListItem: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/product-lists/{listId}/items/{itemId}",
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
ShopperCustomers.defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/{version}";
ShopperCustomers.apiPaths = {
  registerCustomer: "/organizations/{organizationId}/customers",
  resetPassword: "/organizations/{organizationId}/customers/password/actions/reset",
  getResetPasswordToken: "/organizations/{organizationId}/customers/password/actions/create-reset-token",
  registerExternalProfile: "/organizations/{organizationId}/customers/external-profile",
  getExternalProfile: "/organizations/{organizationId}/customers/external-profile",
  getCustomer: "/organizations/{organizationId}/customers/{customerId}",
  updateCustomer: "/organizations/{organizationId}/customers/{customerId}",
  createCustomerAddress: "/organizations/{organizationId}/customers/{customerId}/addresses",
  getCustomerAddress: "/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}",
  removeCustomerAddress: "/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}",
  updateCustomerAddress: "/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}",
  getCustomerBaskets: "/organizations/{organizationId}/customers/{customerId}/baskets",
  getCustomerOrders: "/organizations/{organizationId}/customers/{customerId}/orders",
  updateCustomerPassword: "/organizations/{organizationId}/customers/{customerId}/password",
  createCustomerPaymentInstrument: "/organizations/{organizationId}/customers/{customerId}/payment-instruments",
  deleteCustomerPaymentInstrument: "/organizations/{organizationId}/customers/{customerId}/payment-instruments/{paymentInstrumentId}",
  getCustomerPaymentInstrument: "/organizations/{organizationId}/customers/{customerId}/payment-instruments/{paymentInstrumentId}",
  getCustomerProductLists: "/organizations/{organizationId}/customers/{customerId}/product-lists",
  createCustomerProductList: "/organizations/{organizationId}/customers/{customerId}/product-lists",
  deleteCustomerProductList: "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}",
  getCustomerProductList: "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}",
  updateCustomerProductList: "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}",
  createCustomerProductListItem: "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items",
  deleteCustomerProductListItem: "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items/{itemId}",
  getCustomerProductListItem: "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items/{itemId}",
  updateCustomerProductListItem: "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items/{itemId}",
  getPublicProductListsBySearchTerm: "/organizations/{organizationId}/product-lists",
  getPublicProductList: "/organizations/{organizationId}/product-lists/{listId}",
  getProductListItem: "/organizations/{organizationId}/product-lists/{listId}/items/{itemId}"
};
ShopperCustomers.paramKeys = {
  registerCustomer: [
    "organizationId",
    "siteId"
  ],
  registerCustomerRequired: [
    "organizationId",
    "siteId"
  ],
  resetPassword: [
    "organizationId",
    "siteId"
  ],
  resetPasswordRequired: [
    "organizationId",
    "siteId"
  ],
  getResetPasswordToken: [
    "organizationId",
    "siteId"
  ],
  getResetPasswordTokenRequired: [
    "organizationId",
    "siteId"
  ],
  registerExternalProfile: [
    "organizationId",
    "siteId"
  ],
  registerExternalProfileRequired: [
    "organizationId",
    "siteId"
  ],
  getExternalProfile: [
    "organizationId",
    "externalId",
    "authenticationProviderId",
    "siteId"
  ],
  getExternalProfileRequired: [
    "organizationId",
    "externalId",
    "authenticationProviderId",
    "siteId"
  ],
  getCustomer: [
    "organizationId",
    "customerId",
    "siteId"
  ],
  getCustomerRequired: [
    "organizationId",
    "customerId",
    "siteId"
  ],
  updateCustomer: [
    "organizationId",
    "customerId",
    "siteId"
  ],
  updateCustomerRequired: [
    "organizationId",
    "customerId",
    "siteId"
  ],
  createCustomerAddress: [
    "organizationId",
    "customerId",
    "siteId"
  ],
  createCustomerAddressRequired: [
    "organizationId",
    "customerId",
    "siteId"
  ],
  getCustomerAddress: [
    "organizationId",
    "customerId",
    "addressName",
    "siteId"
  ],
  getCustomerAddressRequired: [
    "organizationId",
    "customerId",
    "addressName",
    "siteId"
  ],
  removeCustomerAddress: [
    "organizationId",
    "customerId",
    "addressName",
    "siteId"
  ],
  removeCustomerAddressRequired: [
    "organizationId",
    "customerId",
    "addressName",
    "siteId"
  ],
  updateCustomerAddress: [
    "organizationId",
    "customerId",
    "addressName",
    "siteId"
  ],
  updateCustomerAddressRequired: [
    "organizationId",
    "customerId",
    "addressName",
    "siteId"
  ],
  getCustomerBaskets: [
    "organizationId",
    "customerId",
    "siteId"
  ],
  getCustomerBasketsRequired: [
    "organizationId",
    "customerId",
    "siteId"
  ],
  getCustomerOrders: [
    "organizationId",
    "customerId",
    "crossSites",
    "from",
    "until",
    "status",
    "siteId",
    "offset",
    "limit"
  ],
  getCustomerOrdersRequired: [
    "organizationId",
    "customerId",
    "siteId"
  ],
  updateCustomerPassword: [
    "organizationId",
    "customerId",
    "siteId"
  ],
  updateCustomerPasswordRequired: [
    "organizationId",
    "customerId",
    "siteId"
  ],
  createCustomerPaymentInstrument: [
    "organizationId",
    "customerId",
    "siteId"
  ],
  createCustomerPaymentInstrumentRequired: [
    "organizationId",
    "customerId",
    "siteId"
  ],
  deleteCustomerPaymentInstrument: [
    "organizationId",
    "customerId",
    "paymentInstrumentId",
    "siteId"
  ],
  deleteCustomerPaymentInstrumentRequired: [
    "organizationId",
    "customerId",
    "paymentInstrumentId",
    "siteId"
  ],
  getCustomerPaymentInstrument: [
    "organizationId",
    "customerId",
    "paymentInstrumentId",
    "siteId"
  ],
  getCustomerPaymentInstrumentRequired: [
    "organizationId",
    "customerId",
    "paymentInstrumentId",
    "siteId"
  ],
  getCustomerProductLists: [
    "organizationId",
    "customerId",
    "siteId"
  ],
  getCustomerProductListsRequired: [
    "organizationId",
    "customerId",
    "siteId"
  ],
  createCustomerProductList: [
    "organizationId",
    "customerId",
    "siteId"
  ],
  createCustomerProductListRequired: [
    "organizationId",
    "customerId",
    "siteId"
  ],
  deleteCustomerProductList: [
    "organizationId",
    "customerId",
    "listId",
    "siteId"
  ],
  deleteCustomerProductListRequired: [
    "organizationId",
    "customerId",
    "listId",
    "siteId"
  ],
  getCustomerProductList: [
    "organizationId",
    "customerId",
    "listId",
    "siteId"
  ],
  getCustomerProductListRequired: [
    "organizationId",
    "customerId",
    "listId",
    "siteId"
  ],
  updateCustomerProductList: [
    "organizationId",
    "customerId",
    "listId",
    "siteId"
  ],
  updateCustomerProductListRequired: [
    "organizationId",
    "customerId",
    "listId",
    "siteId"
  ],
  createCustomerProductListItem: [
    "organizationId",
    "customerId",
    "listId",
    "siteId"
  ],
  createCustomerProductListItemRequired: [
    "organizationId",
    "customerId",
    "listId",
    "siteId"
  ],
  deleteCustomerProductListItem: [
    "organizationId",
    "customerId",
    "listId",
    "itemId",
    "siteId"
  ],
  deleteCustomerProductListItemRequired: [
    "organizationId",
    "customerId",
    "listId",
    "itemId",
    "siteId"
  ],
  getCustomerProductListItem: [
    "organizationId",
    "customerId",
    "listId",
    "itemId",
    "siteId"
  ],
  getCustomerProductListItemRequired: [
    "organizationId",
    "customerId",
    "listId",
    "itemId",
    "siteId"
  ],
  updateCustomerProductListItem: [
    "organizationId",
    "customerId",
    "listId",
    "itemId",
    "siteId"
  ],
  updateCustomerProductListItemRequired: [
    "organizationId",
    "customerId",
    "listId",
    "itemId",
    "siteId"
  ],
  getPublicProductListsBySearchTerm: [
    "organizationId",
    "email",
    "firstName",
    "lastName",
    "siteId"
  ],
  getPublicProductListsBySearchTermRequired: [
    "organizationId",
    "siteId"
  ],
  getPublicProductList: [
    "organizationId",
    "listId",
    "siteId"
  ],
  getPublicProductListRequired: [
    "organizationId",
    "listId",
    "siteId"
  ],
  getProductListItem: [
    "organizationId",
    "listId",
    "itemId",
    "siteId"
  ],
  getProductListItemRequired: [
    "organizationId",
    "listId",
    "itemId",
    "siteId"
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ShopperCustomers
});
//# sourceMappingURL=shopperCustomers.js.map
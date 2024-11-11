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

// src/shopperContexts.ts
var ShopperContexts = class {
  constructor(config) {
    const cfg = { ...config };
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    this.clientConfig = new ClientConfig(cfg);
  }
  /**
      * Gets the shopper's context based on the shopperJWT.
  
  With B2C Commerce release 24.5, all endpoints in the Shopper context API will require the `siteId` parameter for new customers. This field is marked as optional for backward compatibility and will be changed to mandatory tentatively by January 2025.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param usid - The Shopper's unique identifier. It is a required parameter and is part of the response from the Guest or Registered User Shopper Login (SLAS) API call.
      * @param siteId - The identifier of the site to which the request is being sent. With B2C Commerce release 24.5, all new implementations of Shopper Context require the `siteId` query parameter to be passed. Existing customers with Shopper Context implementations should start including `siteId` going forward. Starting January 2025, `siteId` will be required for all customers, and a bad request response code will be returned for requests without a `siteId`.
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type ShopperContext otherwise.
      * 
      */
  async getShopperContext(options, rawResponse) {
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
    if (optionParams["usid"] !== void 0) {
      pathParams["usid"] = optionParams["usid"];
    } else if (configParams["usid"] !== void 0) {
      pathParams["usid"] = configParams["usid"];
    } else {
      throw new Error("Missing required path parameter: usid");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getShopperContext: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/shopper-context/{usid}",
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
      * Creates the shopper's context based on shopperJWT.
  
  With B2C Commerce release 24.5, all endpoints in the Shopper context API will require the `siteId` parameter for new customers. This field is marked as optional for backward compatibility and will be changed to mandatory tentatively by January 2025.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param usid - The Shopper's unique identifier. It is a required parameter and is part of the response from the Guest or Registered User Shopper Login (SLAS) API call.
      * @param siteId - The identifier of the site to which the request is being sent. With B2C Commerce release 24.5, all new implementations of Shopper Context require the `siteId` query parameter to be passed. Existing customers with Shopper Context implementations should start including `siteId` going forward. Starting July 31 2024, `siteId` will be required for all customers, and a bad request response code will be returned for requests without a `siteId`.
      * @param evaluateContextWithClientIp - Determines whether to evaluate the context using the provided `clientIp`. This property is available with B2C Commerce version 24.7.
  - If `evaluateContextWithClientIp` is set to `true`:
    - The `clientIp` is saved and used in subsequent requests.
  
  - If `evaluateContextWithClientIp` is set to `false`:
    - The `clientIp` is not saved and will not be used in subsequent requests.
  
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type void | void otherwise.
      * 
      */
  async createShopperContext(options, rawResponse) {
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
    if (optionParams["usid"] !== void 0) {
      pathParams["usid"] = optionParams["usid"];
    } else if (configParams["usid"] !== void 0) {
      pathParams["usid"] = configParams["usid"];
    } else {
      throw new Error("Missing required path parameter: usid");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    }
    if (optionParams["evaluateContextWithClientIp"] !== void 0) {
      queryParams["evaluateContextWithClientIp"] = optionParams["evaluateContextWithClientIp"];
    } else if (configParams["evaluateContextWithClientIp"] !== void 0) {
      queryParams["evaluateContextWithClientIp"] = configParams["evaluateContextWithClientIp"];
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for createShopperContext: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/shopper-context/{usid}",
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
    return response;
  }
  /**
      * Gets the shopper's context based on the shopperJWT. 
  
  With B2C Commerce release 24.5, all endpoints in the Shopper context API will require the `siteId` parameter for new customers. This field is marked as optional for backward compatibility and will be changed to mandatory tentatively by January 2025.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param usid - The Shopper's unique identifier. It is a required parameter and is part of the response from the Guest or Registered User Shopper Login (SLAS) API call.
      * @param siteId - The identifier of the site to which the request is being sent. With B2C Commerce release 24.5, all new implementations of Shopper Context require the `siteId` query parameter to be passed. Existing customers with Shopper Context implementations should start including `siteId` going forward. Starting July 31 2024, `siteId` will be required for all customers, and a bad request response code will be returned for requests without a `siteId`.
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
      * 
      */
  async deleteShopperContext(options, rawResponse) {
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
    if (optionParams["usid"] !== void 0) {
      pathParams["usid"] = optionParams["usid"];
    } else if (configParams["usid"] !== void 0) {
      pathParams["usid"] = configParams["usid"];
    } else {
      throw new Error("Missing required path parameter: usid");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for deleteShopperContext: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/shopper-context/{usid}",
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
      * Updates the shopper's context based on the Shopper JWT. If the shopper context exists, it's updated with the patch body. If a `custom qualifier/assignment qualifer` or an `effectiveDateTime` or a `sourceCode` or a `customerGroupIds` is already present in the existing shopper context, its value is replaced by the corresponding value from the patch body. If a `custom qualifers'` or a `assignment qualifiers'` value is set to `null`, it's deleted from existing shopper context. If `effectiveDateTime` or `sourceCode` value is set to an empty string (\"\"), it's deleted from existing shopper context. If `effectiveDateTime` or `sourceCode` value is set to `null`, it's ignored. If an `effectiveDateTime` or `sourceCode` or `custom/assignment qualifiiers'` value is new, it's added to the existing Shopper context. If `customerGroupIds` is set to empty array `[]` the existing value in shopper context is deleted. 
  
  With B2C Commerce release 24.5, all endpoints in the Shopper context API will require the `siteId` parameter for new customers. This field is marked as optional for backward compatibility and will be changed to mandatory tentatively by January 2025.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param usid - The Shopper's unique identifier. It is a required parameter and is part of the response from the Guest or Registered User Shopper Login (SLAS) API call.
      * @param siteId - The identifier of the site to which the request is being sent. With B2C Commerce release 24.5, all new implementations of Shopper Context require the `siteId` query parameter to be passed. Existing customers with Shopper Context implementations should start including `siteId` going forward. Starting July 31 2024, `siteId` will be required for all customers, and a bad request response code will be returned for requests without a `siteId`.
      * @param evaluateContextWithClientIp - Determines whether to evaluate the context using the provided `clientIp`.  This property is available with B2C Commerce version 24.7.
  - If `evaluateContextWithClientIp` is set to `true`:
    - The `clientIP` is saved and used in subsequent requests.
  
  - If `evaluateContextWithClientIp` is set to `false`:
    - The `clientIP` is not saved and will not be used in subsequent requests.
  
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type ShopperContext otherwise.
      * 
      */
  async updateShopperContext(options, rawResponse) {
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
    if (optionParams["usid"] !== void 0) {
      pathParams["usid"] = optionParams["usid"];
    } else if (configParams["usid"] !== void 0) {
      pathParams["usid"] = configParams["usid"];
    } else {
      throw new Error("Missing required path parameter: usid");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    }
    if (optionParams["evaluateContextWithClientIp"] !== void 0) {
      queryParams["evaluateContextWithClientIp"] = optionParams["evaluateContextWithClientIp"];
    } else if (configParams["evaluateContextWithClientIp"] !== void 0) {
      queryParams["evaluateContextWithClientIp"] = configParams["evaluateContextWithClientIp"];
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updateShopperContext: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/shopper-context/{usid}",
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
};
ShopperContexts.defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/shopper/shopper-context/{version}";
ShopperContexts.apiPaths = {
  getShopperContext: "/organizations/{organizationId}/shopper-context/{usid}",
  createShopperContext: "/organizations/{organizationId}/shopper-context/{usid}",
  deleteShopperContext: "/organizations/{organizationId}/shopper-context/{usid}",
  updateShopperContext: "/organizations/{organizationId}/shopper-context/{usid}"
};
ShopperContexts.paramKeys = {
  getShopperContext: [
    "organizationId",
    "usid",
    "siteId"
  ],
  getShopperContextRequired: [
    "organizationId",
    "usid"
  ],
  createShopperContext: [
    "organizationId",
    "usid",
    "siteId",
    "evaluateContextWithClientIp"
  ],
  createShopperContextRequired: [
    "organizationId",
    "usid"
  ],
  deleteShopperContext: [
    "organizationId",
    "usid",
    "siteId"
  ],
  deleteShopperContextRequired: [
    "organizationId",
    "usid"
  ],
  updateShopperContext: [
    "organizationId",
    "usid",
    "siteId",
    "evaluateContextWithClientIp"
  ],
  updateShopperContextRequired: [
    "organizationId",
    "usid"
  ]
};
export {
  ShopperContexts
};
//# sourceMappingURL=shopperContexts.mjs.map
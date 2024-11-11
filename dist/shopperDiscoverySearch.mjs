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

// src/shopperDiscoverySearch.ts
var ShopperDiscoverySearch = class {
  constructor(config) {
    const cfg = { ...config };
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    this.clientConfig = new ClientConfig(cfg);
  }
  /**
  * This method retrieves search results for a Channel.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - An identifier for the organization the request is being made by.
  * @param channelId - The unique identifier of a Channel.
  * @param locale - 
  * @param offset - 
  * @param limit - Maximum records to retrieve per request, not to exceed 240. Defaults to 30.
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param body - The data to send as the request body.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type QueryOutput otherwise.
  * 
  * @beta
  * 
  */
  async retrieveResults(options, rawResponse) {
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
    if (optionParams["channelId"] !== void 0) {
      pathParams["channelId"] = optionParams["channelId"];
    } else if (configParams["channelId"] !== void 0) {
      pathParams["channelId"] = configParams["channelId"];
    } else {
      throw new Error("Missing required path parameter: channelId");
    }
    const queryParams = {};
    if (optionParams["locale"] !== void 0) {
      queryParams["locale"] = optionParams["locale"];
    } else if (configParams["locale"] !== void 0) {
      queryParams["locale"] = configParams["locale"];
    } else {
      throw new Error("Missing required query parameter: locale");
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
        console.warn(`Invalid Parameter for retrieveResults: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/channels/{channelId}/results",
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
  * This method gets suggestions for the user's search activity for a channel.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - An identifier for the organization the request is being made by.
  * @param channelId - The unique identifier of a Channel.
  * @param suggestionTypes - The types of suggestions to return.
  * @param searchText - The optional text to retrieve suggestions for.
  * @param locale - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type Suggestions otherwise.
  * 
  * @beta
  * 
  */
  async getSuggestions(options, rawResponse) {
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
    if (optionParams["channelId"] !== void 0) {
      pathParams["channelId"] = optionParams["channelId"];
    } else if (configParams["channelId"] !== void 0) {
      pathParams["channelId"] = configParams["channelId"];
    } else {
      throw new Error("Missing required path parameter: channelId");
    }
    const queryParams = {};
    if (optionParams["suggestionTypes"] !== void 0) {
      queryParams["suggestionTypes"] = optionParams["suggestionTypes"];
    } else if (configParams["suggestionTypes"] !== void 0) {
      queryParams["suggestionTypes"] = configParams["suggestionTypes"];
    } else {
      throw new Error("Missing required query parameter: suggestionTypes");
    }
    if (optionParams["searchText"] !== void 0) {
      queryParams["searchText"] = optionParams["searchText"];
    } else if (configParams["searchText"] !== void 0) {
      queryParams["searchText"] = configParams["searchText"];
    }
    if (optionParams["locale"] !== void 0) {
      queryParams["locale"] = optionParams["locale"];
    } else if (configParams["locale"] !== void 0) {
      queryParams["locale"] = configParams["locale"];
    } else {
      throw new Error("Missing required query parameter: locale");
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getSuggestions: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/channels/{channelId}/suggestions",
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
ShopperDiscoverySearch.defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/discovery/query/{version}";
ShopperDiscoverySearch.apiPaths = {
  retrieveResults: "/organizations/{organizationId}/channels/{channelId}/results",
  getSuggestions: "/organizations/{organizationId}/channels/{channelId}/suggestions"
};
ShopperDiscoverySearch.paramKeys = {
  retrieveResults: [
    "organizationId",
    "channelId",
    "locale",
    "offset",
    "limit"
  ],
  retrieveResultsRequired: [
    "organizationId",
    "channelId",
    "locale"
  ],
  getSuggestions: [
    "organizationId",
    "channelId",
    "suggestionTypes",
    "searchText",
    "locale"
  ],
  getSuggestionsRequired: [
    "organizationId",
    "channelId",
    "suggestionTypes",
    "locale"
  ]
};
export {
  ShopperDiscoverySearch
};
//# sourceMappingURL=shopperDiscoverySearch.mjs.map
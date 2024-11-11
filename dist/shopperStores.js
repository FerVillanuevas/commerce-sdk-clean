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

// src/shopperStores.ts
var shopperStores_exports = {};
__export(shopperStores_exports, {
  ShopperStores: () => ShopperStores
});
module.exports = __toCommonJS(shopperStores_exports);

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

// src/shopperStores.ts
var ShopperStores = class {
  constructor(config) {
    const cfg = { ...config };
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    this.clientConfig = new ClientConfig(cfg);
  }
  /**
      * This resource retrieves a list of stores for the given site that are within a configured distance of a geolocation:
  - The distance is interpreted either in miles or kilometers, depending on the `distanceUnit` input parameter. 
  - The location is specified by either directly providing a latitude and longitude coordinate pair, or by providing a country and a postal code. If a postal code is passed, the resource looks in the system's geolocation mappings in Business Manager to find the coordinates for this postal code. If no matching geolocation is found, the resource returns an empty list of stores. If coordinates are passed, the values for country and postal code are ignored. 
  
    To verify site latitude and longitude information in Business Manager:
    - Navigate to **Merchant Tools -\> Online Marketing -\> Stores**. 
    - Select the applicable site.
    - In the **Address** tab, verify that valid information is provided in the following fields: **Address**, **City**, **Postal Code**, **State**, and **Country**. For latitude and longitude values, you can manually enter values or provide all field values to auto-populate **Latitude** and **Longitude**. You must provide valid values for all of the previous fields for latitude and longitude to auto-populate **Latitude** and **Longitude** values.
  
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param countryCode - The two letter ISO country code, such as "US". This value is required when a postalCode is provided.
      * @param distanceUnit - The distance unit. Supported values are "mi" (miles) and "km" (kilometers). The default is "km".
      * @param latitude - The geographical latitude to search for stores (value range -90.00 .. 90.00). This value is required when a longitude is provided.
      * @param longitude - The geographical longitude to search for stores (value range -180.00 .. 180.00). You must provide a longitude when a latitude is provided.
      * @param maxDistance - The area (radius) in distanceUnit where stores will be searched.
      * @param postalCode - The postal code, such as "84121". You must provide a countryCode when a postalCode is provided.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param offset - 
      * @param limit - Maximum records to retrieve per request, not to exceed 200. Defaults to 25.
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type StoreResult otherwise.
      * 
      * @beta
      * 
      */
  async searchStores(options, rawResponse) {
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
    if (optionParams["countryCode"] !== void 0) {
      queryParams["countryCode"] = optionParams["countryCode"];
    } else if (configParams["countryCode"] !== void 0) {
      queryParams["countryCode"] = configParams["countryCode"];
    }
    if (optionParams["distanceUnit"] !== void 0) {
      queryParams["distanceUnit"] = optionParams["distanceUnit"];
    } else if (configParams["distanceUnit"] !== void 0) {
      queryParams["distanceUnit"] = configParams["distanceUnit"];
    }
    if (optionParams["latitude"] !== void 0) {
      queryParams["latitude"] = optionParams["latitude"];
    } else if (configParams["latitude"] !== void 0) {
      queryParams["latitude"] = configParams["latitude"];
    }
    if (optionParams["longitude"] !== void 0) {
      queryParams["longitude"] = optionParams["longitude"];
    } else if (configParams["longitude"] !== void 0) {
      queryParams["longitude"] = configParams["longitude"];
    }
    if (optionParams["maxDistance"] !== void 0) {
      queryParams["maxDistance"] = optionParams["maxDistance"];
    } else if (configParams["maxDistance"] !== void 0) {
      queryParams["maxDistance"] = configParams["maxDistance"];
    }
    if (optionParams["postalCode"] !== void 0) {
      queryParams["postalCode"] = optionParams["postalCode"];
    } else if (configParams["postalCode"] !== void 0) {
      queryParams["postalCode"] = configParams["postalCode"];
    }
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    if (optionParams["locale"] !== void 0) {
      queryParams["locale"] = optionParams["locale"];
    } else if (configParams["locale"] !== void 0) {
      queryParams["locale"] = configParams["locale"];
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
        console.warn(`Invalid Parameter for searchStores: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/store-search",
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
      * Returns stores identified by the IDs provided as input.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param siteId - 
      * @param ids - The IDs of a requested stores (comma separated, max 50 IDs).
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type StoreResult otherwise.
      * 
      * @beta
      * 
      */
  async getStores(options, rawResponse) {
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
    if (optionParams["ids"] !== void 0) {
      queryParams["ids"] = optionParams["ids"];
    } else if (configParams["ids"] !== void 0) {
      queryParams["ids"] = configParams["ids"];
    } else {
      throw new Error("Missing required query parameter: ids");
    }
    if (optionParams["locale"] !== void 0) {
      queryParams["locale"] = optionParams["locale"];
    } else if (configParams["locale"] !== void 0) {
      queryParams["locale"] = configParams["locale"];
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getStores: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/stores",
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
ShopperStores.defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/store/shopper-stores/{version}";
ShopperStores.apiPaths = {
  searchStores: "/organizations/{organizationId}/store-search",
  getStores: "/organizations/{organizationId}/stores"
};
ShopperStores.paramKeys = {
  searchStores: [
    "organizationId",
    "countryCode",
    "distanceUnit",
    "latitude",
    "longitude",
    "maxDistance",
    "postalCode",
    "siteId",
    "locale",
    "offset",
    "limit"
  ],
  searchStoresRequired: [
    "organizationId",
    "siteId"
  ],
  getStores: [
    "organizationId",
    "siteId",
    "ids",
    "locale"
  ],
  getStoresRequired: [
    "organizationId",
    "siteId",
    "ids"
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ShopperStores
});
//# sourceMappingURL=shopperStores.js.map
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

// src/shopperSearch.ts
var shopperSearch_exports = {};
__export(shopperSearch_exports, {
  ShopperSearch: () => ShopperSearch
});
module.exports = __toCommonJS(shopperSearch_exports);

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

// src/shopperSearch.ts
var ShopperSearch = class {
  constructor(config) {
    const cfg = { ...config };
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    this.clientConfig = new ClientConfig(cfg);
  }
  /**
      * Provides keyword and refinement search functionality for products. Only returns the product ID, link, and name in
  the product search hit. The search result contains only products that are online and assigned to site catalog.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param select - The property selector declaring which fields are included into the response payload. You can specify a single field name, a comma-separated list of names, or work with wildcards.You can also sepcify Array Operations and filter expressions.The actual selector value must be enclosed within parentheses.
      * @param siteId - 
      * @param q - The query phrase to search for. For example to search for a product "shirt", type q=shirt.
      * @param refine - Parameter that represents a refinement attribute or values pair. Refinement attribute ID and
              values are separated by '='. Multiple values are supported by a subset of refinement attributes and
              can be provided by separating them using a pipe (URL
              encoded = "|") i.e. refine=c_refinementColor=red|green|blue. Value ranges can be specified like this: refine=price=(100..500) . Multiple refine parameters can be provided by using the refine as the key i.e refine=price=(0..10)&refine=c_refinementColor=green. The refinements can be a collection of custom defined attributes IDs and the system defined attributes IDs but the search can only accept a total of 9 refinements at a time.
              The following system refinement attribute ids are supported:
                
              cgid: Allows refinement per single category ID. Multiple category ids are not supported.
              price: Allows refinement per single price range. Multiple price ranges are not supported.
              pmid: Allows refinement per promotion ID.
              htype: Allow refinement by including only the provided hit types. Accepted types are 'product', 'master', 'set', 'bundle', 'slicing_group' (deprecated), 'variation_group'.
              orderable_only: Unavailable products are excluded from the search results if true is set. Multiple refinement values are not supported.                               
      * @param sort - The ID of the sorting option to sort the search hits.
      * @param currency - The currency mnemonic specified for price. This parameter is effective only if the returned results contain prices.
      * @param locale - 
      * @param expand - The expand parameter. A comma-separated list with the allowed values (availability, images, prices, represented_products, variations, promotions, custom_properties). The expand parameter `availability, images, prices, represented_products, variations` is used as the default value when no expand parameter is provided. The value `none` can be used to turn off all expand options. The expand values `promotions` and `custom_properties` are optional and are available from version 24.3 and 24.4, respectively.
      * @param allImages - When this flag is passed along with the expand parameter `images` in the request, a property named `imageGroups`, which contains an image model, is returned in the response. If the flag is set to `true`, the whole image model is returned. If it is set to `false`, the returned image model contains only matching images. If no flag is passed in the request, the response does not include the `imageGroups property`. This parameter is available from version 24.3.
      * @param perPricebook - When this flag is passed as `true` in the request, along with the expand parameter `prices`, then per PriceBook prices and tiered prices (if available) are returned. This parameter is available from version 24.3.
      * @param allVariationProperties - The flag that indicates which variation properties are to be included in the result. When the flag is passed as `true` along with the expand parameter `variations` in the request, all variation properties (`variationAttributes`, `variationGroups`, and `variants`) are returned. When it is passed as `false` along with the expand parameter `variations` in the request, only the default property (`variationAttributes`) is returned. This parameter is available from version 24.3.
      * @param offset - 
      * @param limit - Maximum records to retrieve per request, not to exceed 200. Defaults to 25.
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type ProductSearchResult otherwise.
      * 
      */
  async productSearch(options, rawResponse) {
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
    if (optionParams["select"] !== void 0) {
      queryParams["select"] = optionParams["select"];
    } else if (configParams["select"] !== void 0) {
      queryParams["select"] = configParams["select"];
    }
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    if (optionParams["q"] !== void 0) {
      queryParams["q"] = optionParams["q"];
    } else if (configParams["q"] !== void 0) {
      queryParams["q"] = configParams["q"];
    }
    if (optionParams["refine"] !== void 0) {
      queryParams["refine"] = optionParams["refine"];
    } else if (configParams["refine"] !== void 0) {
      queryParams["refine"] = configParams["refine"];
    }
    if (optionParams["sort"] !== void 0) {
      queryParams["sort"] = optionParams["sort"];
    } else if (configParams["sort"] !== void 0) {
      queryParams["sort"] = configParams["sort"];
    }
    if (optionParams["currency"] !== void 0) {
      queryParams["currency"] = optionParams["currency"];
    } else if (configParams["currency"] !== void 0) {
      queryParams["currency"] = configParams["currency"];
    }
    if (optionParams["locale"] !== void 0) {
      queryParams["locale"] = optionParams["locale"];
    } else if (configParams["locale"] !== void 0) {
      queryParams["locale"] = configParams["locale"];
    }
    if (optionParams["expand"] !== void 0) {
      queryParams["expand"] = optionParams["expand"];
    } else if (configParams["expand"] !== void 0) {
      queryParams["expand"] = configParams["expand"];
    }
    if (optionParams["allImages"] !== void 0) {
      queryParams["allImages"] = optionParams["allImages"];
    } else if (configParams["allImages"] !== void 0) {
      queryParams["allImages"] = configParams["allImages"];
    }
    if (optionParams["perPricebook"] !== void 0) {
      queryParams["perPricebook"] = optionParams["perPricebook"];
    } else if (configParams["perPricebook"] !== void 0) {
      queryParams["perPricebook"] = configParams["perPricebook"];
    }
    if (optionParams["allVariationProperties"] !== void 0) {
      queryParams["allVariationProperties"] = optionParams["allVariationProperties"];
    } else if (configParams["allVariationProperties"] !== void 0) {
      queryParams["allVariationProperties"] = configParams["allVariationProperties"];
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
        console.warn(`Invalid Parameter for productSearch: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/product-search",
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
  * Provides keyword search functionality for products, categories, and brands suggestions. Returns suggested products, suggested categories, and suggested brands for the given search phrase.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - An identifier for the organization the request is being made by.
  * @param siteId - 
  * @param q - The search phrase (q) for which suggestions are evaluated. Search suggestions are determined when the search phrase input is at least three (default) characters long. The value is configurable in the Business Manager.
  * @param limit - The maximum number of suggestions made per request. If no value is defined, by default five suggestions per suggestion type are evaluated. This affects all types of suggestions (category, product, brand, and custom suggestions).
  * @param currency - The currency code specified for price. This parameter is effective only for product suggestions.
  * @param locale - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type SuggestionResult otherwise.
  * 
  */
  async getSearchSuggestions(options, rawResponse) {
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
    if (optionParams["q"] !== void 0) {
      queryParams["q"] = optionParams["q"];
    } else if (configParams["q"] !== void 0) {
      queryParams["q"] = configParams["q"];
    } else {
      throw new Error("Missing required query parameter: q");
    }
    if (optionParams["limit"] !== void 0) {
      queryParams["limit"] = optionParams["limit"];
    } else if (configParams["limit"] !== void 0) {
      queryParams["limit"] = configParams["limit"];
    }
    if (optionParams["currency"] !== void 0) {
      queryParams["currency"] = optionParams["currency"];
    } else if (configParams["currency"] !== void 0) {
      queryParams["currency"] = configParams["currency"];
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
        console.warn(`Invalid Parameter for getSearchSuggestions: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/search-suggestions",
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
ShopperSearch.defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/search/shopper-search/{version}/";
ShopperSearch.apiPaths = {
  productSearch: "/organizations/{organizationId}/product-search",
  getSearchSuggestions: "/organizations/{organizationId}/search-suggestions"
};
ShopperSearch.paramKeys = {
  productSearch: [
    "organizationId",
    "select",
    "siteId",
    "q",
    "refine",
    "sort",
    "currency",
    "locale",
    "expand",
    "allImages",
    "perPricebook",
    "allVariationProperties",
    "offset",
    "limit"
  ],
  productSearchRequired: [
    "organizationId",
    "siteId"
  ],
  getSearchSuggestions: [
    "organizationId",
    "siteId",
    "q",
    "limit",
    "currency",
    "locale"
  ],
  getSearchSuggestionsRequired: [
    "organizationId",
    "siteId",
    "q"
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ShopperSearch
});
//# sourceMappingURL=shopperSearch.js.map
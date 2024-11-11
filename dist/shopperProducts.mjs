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

// src/shopperProducts.ts
var ShopperProducts = class {
  constructor(config) {
    const cfg = { ...config };
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    this.clientConfig = new ClientConfig(cfg);
  }
  /**
  * Allows access to multiple products by a single request. Only products that are online and assigned to a site catalog are returned. The maximum number of productIDs that can be requested are 24. Along with product details, the availability, product options, images, price, promotions, and variations for the valid products will be included, as appropriate.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param select - The property selector declaring which fields are included into the response payload. You can specify a single field name, a comma-separated list of names, or work with wildcards.You can also sepcify Array Operations and filter expressions.The actual selector value must be enclosed within parentheses.
  * @param ids - The IDs of the requested products (comma-separated, max 24 IDs).
  * @param inventoryIds - The optional inventory list IDs, for which the availability should be shown (comma-separated, max 5 inventoryListIDs).
  * @param currency - The currency mnemonic specified for price.
  * @param expand - The expand parameter. A comma separated list with the allowed values (availability, links, promotions, options, images, prices, variations, recommendations). All expand parameters are used for the request when no expand parameter is provided. The value "none" may be used to turn off all expand options.
  * @param locale - The locale context.
  * @param allImages - The flag that indicates whether to retrieve the whole image model for the requested product.
  * @param perPricebook - The flag that indicates whether to retrieve the per PriceBook prices and tiered prices (if available) for requested Products. Available end of June, 2021.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type ProductResult otherwise.
  * 
  */
  async getProducts(options, rawResponse) {
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
    if (optionParams["ids"] !== void 0) {
      queryParams["ids"] = optionParams["ids"];
    } else if (configParams["ids"] !== void 0) {
      queryParams["ids"] = configParams["ids"];
    } else {
      throw new Error("Missing required query parameter: ids");
    }
    if (optionParams["inventoryIds"] !== void 0) {
      queryParams["inventoryIds"] = optionParams["inventoryIds"];
    } else if (configParams["inventoryIds"] !== void 0) {
      queryParams["inventoryIds"] = configParams["inventoryIds"];
    }
    if (optionParams["currency"] !== void 0) {
      queryParams["currency"] = optionParams["currency"];
    } else if (configParams["currency"] !== void 0) {
      queryParams["currency"] = configParams["currency"];
    }
    if (optionParams["expand"] !== void 0) {
      queryParams["expand"] = optionParams["expand"];
    } else if (configParams["expand"] !== void 0) {
      queryParams["expand"] = configParams["expand"];
    }
    if (optionParams["locale"] !== void 0) {
      queryParams["locale"] = optionParams["locale"];
    } else if (configParams["locale"] !== void 0) {
      queryParams["locale"] = configParams["locale"];
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
        console.warn(`Invalid Parameter for getProducts: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/products",
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
  * Allows access to product details for a single product ID. Only products that are online and assigned to a site catalog are returned. Along with product details, the availability, images, price, bundled_products, set_products, recommedations, product options, variations, and promotions for the products will be included, as appropriate.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param id - The ID of the requested product.
  * @param select - The property selector declaring which fields are included into the response payload. You can specify a single field name, a comma-separated list of names, or work with wildcards.You can also sepcify Array Operations and filter expressions.The actual selector value must be enclosed within parentheses.
  * @param inventoryIds - The optional inventory list IDs, for which the availability should be shown (comma-separated, max 5 inventoryListIDs).
  * @param currency - The currency mnemonic specified for price.
  * @param expand - The expand parameter. A comma separated list with the allowed values (availability, bundled_products, links, promotions, options, images, prices, variations, set_products, recommendations). All expand parameters are used for the request when no expand parameter is provided. The value "none" may be used to turn off all expand options.
  * @param locale - The locale context.
  * @param allImages - The flag that indicates whether to retrieve the whole image model for the requested product.
  * @param perPricebook - The flag that indicates whether to retrieve the per PriceBook prices and tiered prices (if available) for requested Products. Available end of June, 2021.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type Product otherwise.
  * 
  */
  async getProduct(options, rawResponse) {
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
    if (optionParams["id"] !== void 0) {
      pathParams["id"] = optionParams["id"];
    } else if (configParams["id"] !== void 0) {
      pathParams["id"] = configParams["id"];
    } else {
      throw new Error("Missing required path parameter: id");
    }
    const queryParams = {};
    if (optionParams["select"] !== void 0) {
      queryParams["select"] = optionParams["select"];
    } else if (configParams["select"] !== void 0) {
      queryParams["select"] = configParams["select"];
    }
    if (optionParams["inventoryIds"] !== void 0) {
      queryParams["inventoryIds"] = optionParams["inventoryIds"];
    } else if (configParams["inventoryIds"] !== void 0) {
      queryParams["inventoryIds"] = configParams["inventoryIds"];
    }
    if (optionParams["currency"] !== void 0) {
      queryParams["currency"] = optionParams["currency"];
    } else if (configParams["currency"] !== void 0) {
      queryParams["currency"] = configParams["currency"];
    }
    if (optionParams["expand"] !== void 0) {
      queryParams["expand"] = optionParams["expand"];
    } else if (configParams["expand"] !== void 0) {
      queryParams["expand"] = configParams["expand"];
    }
    if (optionParams["locale"] !== void 0) {
      queryParams["locale"] = optionParams["locale"];
    } else if (configParams["locale"] !== void 0) {
      queryParams["locale"] = configParams["locale"];
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
        console.warn(`Invalid Parameter for getProduct: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/products/{id}",
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
  * When you use the URL template, the server returns multiple categories (a result object of category documents). You can use this template as a convenient way of obtaining multiple categories in a single request, instead of issuing separate requests for each category. You can specify up to 50 multiple IDs. You must enclose the list of IDs in parentheses. If a category identifier contains parenthesis or the separator sign, you must URL encode the character. The server only returns online categories.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - 
  * @param ids - The comma separated list of category IDs (max 50).
  * @param levels - Specifies how many levels of nested subcategories you want the server to return. The default value is 1. Valid values are 0, 1, or 2.
  * @param locale - The locale context.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type CategoryResult otherwise.
  * 
  */
  async getCategories(options, rawResponse) {
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
    if (optionParams["ids"] !== void 0) {
      queryParams["ids"] = optionParams["ids"];
    } else if (configParams["ids"] !== void 0) {
      queryParams["ids"] = configParams["ids"];
    } else {
      throw new Error("Missing required query parameter: ids");
    }
    if (optionParams["levels"] !== void 0) {
      queryParams["levels"] = optionParams["levels"];
    } else if (configParams["levels"] !== void 0) {
      queryParams["levels"] = configParams["levels"];
    }
    if (optionParams["locale"] !== void 0) {
      queryParams["locale"] = optionParams["locale"];
    } else if (configParams["locale"] !== void 0) {
      queryParams["locale"] = configParams["locale"];
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
        console.warn(`Invalid Parameter for getCategories: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/categories",
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
      * When you use the URL template below, the server returns a category identified by its ID; by default, the server
  also returns the first level of subcategories, but you can specify another level by setting the levels
  parameter. The server only returns online categories.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param id - The ID of the requested category.
      * @param levels - 
      * @param locale - 
      * @param siteId - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Category otherwise.
      * 
      */
  async getCategory(options, rawResponse) {
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
    if (optionParams["id"] !== void 0) {
      pathParams["id"] = optionParams["id"];
    } else if (configParams["id"] !== void 0) {
      pathParams["id"] = configParams["id"];
    } else {
      throw new Error("Missing required path parameter: id");
    }
    const queryParams = {};
    if (optionParams["levels"] !== void 0) {
      queryParams["levels"] = optionParams["levels"];
    } else if (configParams["levels"] !== void 0) {
      queryParams["levels"] = configParams["levels"];
    }
    if (optionParams["locale"] !== void 0) {
      queryParams["locale"] = optionParams["locale"];
    } else if (configParams["locale"] !== void 0) {
      queryParams["locale"] = configParams["locale"];
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
        console.warn(`Invalid Parameter for getCategory: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/categories/{id}",
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
ShopperProducts.defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/product/shopper-products/{version}";
ShopperProducts.apiPaths = {
  getProducts: "/organizations/{organizationId}/products",
  getProduct: "/organizations/{organizationId}/products/{id}",
  getCategories: "/organizations/{organizationId}/categories",
  getCategory: "/organizations/{organizationId}/categories/{id}"
};
ShopperProducts.paramKeys = {
  getProducts: [
    "organizationId",
    "select",
    "ids",
    "inventoryIds",
    "currency",
    "expand",
    "locale",
    "allImages",
    "perPricebook",
    "siteId"
  ],
  getProductsRequired: [
    "organizationId",
    "ids",
    "siteId"
  ],
  getProduct: [
    "organizationId",
    "id",
    "select",
    "inventoryIds",
    "currency",
    "expand",
    "locale",
    "allImages",
    "perPricebook",
    "siteId"
  ],
  getProductRequired: [
    "organizationId",
    "id",
    "siteId"
  ],
  getCategories: [
    "organizationId",
    "ids",
    "levels",
    "locale",
    "siteId"
  ],
  getCategoriesRequired: [
    "organizationId",
    "ids",
    "siteId"
  ],
  getCategory: [
    "organizationId",
    "id",
    "levels",
    "locale",
    "siteId"
  ],
  getCategoryRequired: [
    "organizationId",
    "id",
    "siteId"
  ]
};
export {
  ShopperProducts
};
//# sourceMappingURL=shopperProducts.mjs.map
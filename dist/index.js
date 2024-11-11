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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ClientConfig: () => ClientConfig,
  ShopperBaskets: () => ShopperBaskets,
  ShopperContexts: () => ShopperContexts,
  ShopperCustomers: () => ShopperCustomers,
  ShopperDiscoverySearch: () => ShopperDiscoverySearch,
  ShopperExperience: () => ShopperExperience,
  ShopperGiftCertificates: () => ShopperGiftCertificates,
  ShopperLogin: () => ShopperLogin,
  ShopperOrders: () => ShopperOrders,
  ShopperProducts: () => ShopperProducts,
  ShopperPromotions: () => ShopperPromotions,
  ShopperSearch: () => ShopperSearch,
  ShopperSeo: () => ShopperSeo,
  ShopperStores: () => ShopperStores,
  TemplateURL: () => TemplateURL,
  helpers: () => helpers_exports
});
module.exports = __toCommonJS(src_exports);

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

// src/shopperBaskets.ts
var ShopperBaskets = class {
  constructor(config) {
    const cfg = { ...config };
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    this.clientConfig = new ClientConfig(cfg);
  }
  /**
      * Creates a new basket.
  
  The created basket is initialized with default values. Optional JSON data provided in the request body is populated into the created basket. It can be updated with other endpoints offered by the Shopper Baskets API.
  
  Each customer can have just one open basket. When a basket is created, it is said to be open. It remains open until either an order is created from it or it is deleted.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param taxMode - Determines how taxes are calculated. 
  
  The default value is `internal` where the tax calculation is done automatically based on internal tax tables. Setting `taxMode` to `external` allows manual modification of the tax rates and values. External tax data is mandatory for product line items, option line items, shipping line items, coupon line items, and bonus discount line item. Gift certificate line items are optional and use zero tax rate by default, which can be overwritten. Price adjustments cannot be set because they are either calculated or inherited. Depending on the type, the tax rate is either obtained from the related line item or computed as a prorate of the basket.
      * @param temporary - If set to true, the basket created is a temporary basket.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async createBasket(options, rawResponse) {
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
    if (optionParams["taxMode"] !== void 0) {
      queryParams["taxMode"] = optionParams["taxMode"];
    } else if (configParams["taxMode"] !== void 0) {
      queryParams["taxMode"] = configParams["taxMode"];
    }
    if (optionParams["temporary"] !== void 0) {
      queryParams["temporary"] = optionParams["temporary"];
    } else if (configParams["temporary"] !== void 0) {
      queryParams["temporary"] = configParams["temporary"];
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for createBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets",
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
      * Transfer the previous shopper's basket to the current shopper by updating the basket's owner. No other values change. You must obtain the shopper authorization token via SLAS and you must provide the ‘guest usid‘ in both the ‘/oauth2/login‘ and ‘/oauth2/token‘ calls while fetching the registered user JWT token.
  
  A success response contains the transferred basket.
  
  If the current shopper has an active basket, and the `overrideExisting` request parameter is `false`, then the transfer request returns a BasketTransferException (HTTP status 409). You can proceed with one of these options:
  - Keep the current shopper's active basket.
  - Merge the previous and current shoppers' baskets by calling the `baskets/merge` endpoint.
  - Force the transfer by calling the `baskets/transfer` endpoint again, with the parameter `overrideExisting=true`. Forcing the transfer deletes the current shopper's active basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param overrideExisting - If the current shopper has no active basket, this parameter is ignored. If the current shopper has an active basket, this parameter controls the behavior:
  - `false` (default): Return a BasketTransferException (HTTP status 409). The basket owner doesn't change.
  - `true`: Force the transfer by deleting the current shopper's active basket and making the current shopper the owner of the previous shopper's basket. Returns the transferred basket (HTTP status 200).
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async transferBasket(options, rawResponse) {
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
    if (optionParams["overrideExisting"] !== void 0) {
      queryParams["overrideExisting"] = optionParams["overrideExisting"];
    } else if (configParams["overrideExisting"] !== void 0) {
      queryParams["overrideExisting"] = configParams["overrideExisting"];
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for transferBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/actions/transfer",
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
        method: "POST",
        headers
      },
      this.clientConfig,
      rawResponse
    );
    return response;
  }
  /**
      * Merge data from the previous shopper's basket into the current shopper's active basket and delete the previous shopper's basket. This endpoint doesn't merge Personally Identifiable Information (PII). You must obtain the shopper authorization token via SLAS and you must provide the ‘guest usid‘ in both the ‘/oauth2/login‘ and ‘/oauth2/token‘ calls while fetching the registered user JWT token. After the merge, all basket amounts are recalculated and totaled, including lookups for prices, taxes, shipping, and promotions, unless hooks are enabled.
  
  The following information is merged:
  - custom attributes on the basket and on all copied records
  - product items
  - gift certificate items
  - coupon items
  - shipments
  - ad-hoc price adjustments
  
  To control the merging of products that exist in both baskets, use the `productItemMergeMode` parameter. By default, the higher of the two basket quantities is used for each product. Products in both baskets are considered to be the same when all of the following values match (if one product doesn't have a value, the other product is a match only if it also doesn't have that value):
  - shipment
  - productId
  - option values
  - wishlist reference
  - inventory list id
  - gift flag & message
  - ad-hoc price adjustments
  
  If any of the listed values don't match, then the item in the previous shopper's basket is copied to a new line item in the current shopper's basket. If the listed values all match, but the matching products have different values for any custom attribute, the merged line item keeps the custom attribute value from the current shopper's basket.
  
  A success response contains the current shopper's active basket. The previous guest shopper's active basket is deleted.
  
  If the current shopper doesn't have an active basket, and the createDestinationBasket request parameter is false, then the merge request returns a BasketMergeException (HTTP status 409). You can proceed with one of these options:
  - Transfer the previous shopper's active basket to the current logged-in shopper by calling the `baskets/transfer` endpoint.
  - Force the merge by calling the `baskets/merge` endpoint again, with the parameter `createDestinationBasket=true`. Forcing the merge creates a new basket for the current shopper and copies information from the previous shopper's basket into it. Because the merge doesn't copy all basket data, a forced merge is not the same as a transfer. For example, the new basket doesn't contain any Personally Identifiable Information (PII) from the previous basket.
  
  ### before merge
  | Previous Shopper's Basket, SKU: Quantity, Custom Attributes | Current Shopper's Basket, SKU: Quantity, Custom Attributes  |
  |-------------------------------------------------------------|-------------------------------------------------------------|
  | SKU_A: 5\<br\> SKU_B: 3\<br\> SKU_C: 4\<br\> c_customAttr_1: 'ABC' \<br\> c_customAttr_2: 'DEF'   | SKU_A: 2\<br\> SKU_D: 6\<br\> SKU_E: 7\<br\> c_customAttr_1: 'UVW' \<br\> c_customAttr_3: 'XYZ'   |
  
  ### after merge - (previous shopper's basket is deleted)
  | productItemMergeMode | Current Shopper's Basket - SKU: Quantity, Custom Attributes  |
  |----------------------|--------------------------------------------------------------|
  | sum_quantities         | SKU_A: 7\<br\> SKU_B: 3\<br\> SKU_C: 4\<br\> SKU_D: 6\<br\> SKU_E: 7\<br\> c_customAttr_1: 'UVW' \<br\> c_customAttr_2: 'DEF' \<br\> c_customAttr_3: 'XYZ'              |
  | higher_quantity      | SKU_A: 5\<br\> SKU_B: 3\<br\> SKU_C: 4\<br\> SKU_D: 6\<br\> SKU_E: 7\<br\> c_customAttr_1: 'UVW' \<br\> c_customAttr_2: 'DEF' \<br\> c_customAttr_3: 'XYZ'              |
  | saved_quantity       | SKU_A: 2\<br\> SKU_B: 3\<br\> SKU_C: 4\<br\> SKU_D: 6\<br\> SKU_E: 7\<br\> c_customAttr_1: 'UVW' \<br\> c_customAttr_2: 'DEF' \<br\> c_customAttr_3: 'XYZ'              |
  | separate_item        | SKU_A: 5\<br\> SKU_B: 3\<br\> SKU_C: 4\<br\> SKU_A: 2\<br\> SKU_D: 6\<br\> SKU_E: 7\<br\> c_customAttr_1: 'UVW' \<br\> c_customAttr_2: 'DEF' \<br\> c_customAttr_3: 'XYZ' |
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param createDestinationBasket - If the current shopper has an active basket, this parameter is ignored. If the current shopper has no active basket, this parameter controls the behavior:
  - `false` (default): Return a BasketMergeException (HTTP status 409).
  - `true`: Force the merge by creating a basket for the current shopper and copying information from the previous shopper's basket into it. Return success (HTTP status 200).
      * @param productItemMergeMode - This parameter controls the quantity calculation for products that exist in both baskets.
  - higher_quantity (default): Compare the product's quantities in each basket, and use the higher value.
  - sum_quantities: Use the sum of the product's quantities from both baskets.
  - saved_quantity: Use the product's quantity in the current shopper's active basket. Ignore the quantity from the previous shopper's basket.
  - separate_item: Add a separate product item to the current shopper's basket for the quantity in the previous shopper's basket.
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async mergeBasket(options, rawResponse) {
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
    if (optionParams["createDestinationBasket"] !== void 0) {
      queryParams["createDestinationBasket"] = optionParams["createDestinationBasket"];
    } else if (configParams["createDestinationBasket"] !== void 0) {
      queryParams["createDestinationBasket"] = configParams["createDestinationBasket"];
    }
    if (optionParams["productItemMergeMode"] !== void 0) {
      queryParams["productItemMergeMode"] = optionParams["productItemMergeMode"];
    } else if (configParams["productItemMergeMode"] !== void 0) {
      queryParams["productItemMergeMode"] = configParams["productItemMergeMode"];
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for mergeBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/actions/merge",
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
        method: "POST",
        headers
      },
      this.clientConfig,
      rawResponse
    );
    return response;
  }
  /**
  * Removes a basket.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - An identifier for the organization the request is being made by.
  * @param basketId - The ID of the basket to be modified.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
  * 
  */
  async deleteBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
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
        console.warn(`Invalid Parameter for deleteBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}",
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
      * Gets a basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async getBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}",
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
      * Updates a basket. Only the currency of the basket, source code, the custom
  properties of the basket, and the shipping items will be considered.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the `currency` triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async updateBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    const queryParams = {};
    if (optionParams["removeExternalTax"] !== void 0) {
      queryParams["removeExternalTax"] = optionParams["removeExternalTax"];
    } else if (configParams["removeExternalTax"] !== void 0) {
      queryParams["removeExternalTax"] = configParams["removeExternalTax"];
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updateBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}",
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
      * Marks a basket as an agent basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async updateAsAgentBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updateAsAgentBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/agent",
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
        method: "PUT",
        headers
      },
      this.clientConfig,
      rawResponse
    );
    return response;
  }
  /**
      * Sets the billing address of a basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param useAsShipping - 
      * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the billing/shipping address triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values.       
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async updateBillingAddressForBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    const queryParams = {};
    if (optionParams["useAsShipping"] !== void 0) {
      queryParams["useAsShipping"] = optionParams["useAsShipping"];
    } else if (configParams["useAsShipping"] !== void 0) {
      queryParams["useAsShipping"] = configParams["useAsShipping"];
    }
    if (optionParams["removeExternalTax"] !== void 0) {
      queryParams["removeExternalTax"] = optionParams["removeExternalTax"];
    } else if (configParams["removeExternalTax"] !== void 0) {
      queryParams["removeExternalTax"] = configParams["removeExternalTax"];
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updateBillingAddressForBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/billing-address",
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
      * Adds a coupon to an existing basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async addCouponToBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for addCouponToBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/coupons",
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
      * Removes a coupon from the basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param couponItemId - The ID of the coupon item to be removed.
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async removeCouponFromBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    if (optionParams["couponItemId"] !== void 0) {
      pathParams["couponItemId"] = optionParams["couponItemId"];
    } else if (configParams["couponItemId"] !== void 0) {
      pathParams["couponItemId"] = configParams["couponItemId"];
    } else {
      throw new Error("Missing required path parameter: couponItemId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for removeCouponFromBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/coupons/{couponItemId}",
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
    return response;
  }
  /**
      * Sets customer information for an existing basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async updateCustomerForBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updateCustomerForBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/customer",
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
      * Adds a gift certificate item to an existing basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async addGiftCertificateItemToBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for addGiftCertificateItemToBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/gift-certificate-items",
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
      * Deletes a gift certificate item from an existing basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param giftCertificateItemId - the ID of the gift certificate item to be updated.
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async removeGiftCertificateItemFromBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    if (optionParams["giftCertificateItemId"] !== void 0) {
      pathParams["giftCertificateItemId"] = optionParams["giftCertificateItemId"];
    } else if (configParams["giftCertificateItemId"] !== void 0) {
      pathParams["giftCertificateItemId"] = configParams["giftCertificateItemId"];
    } else {
      throw new Error("Missing required path parameter: giftCertificateItemId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for removeGiftCertificateItemFromBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/gift-certificate-items/{giftCertificateItemId}",
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
    return response;
  }
  /**
      * Updates a gift certificate item of an existing basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param giftCertificateItemId - the ID of the gift certificate item to be updated.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async updateGiftCertificateItemInBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    if (optionParams["giftCertificateItemId"] !== void 0) {
      pathParams["giftCertificateItemId"] = optionParams["giftCertificateItemId"];
    } else if (configParams["giftCertificateItemId"] !== void 0) {
      pathParams["giftCertificateItemId"] = configParams["giftCertificateItemId"];
    } else {
      throw new Error("Missing required path parameter: giftCertificateItemId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updateGiftCertificateItemInBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/gift-certificate-items/{giftCertificateItemId}",
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
      * Adds new items to a basket. The added items are associated with the
  specified shipment. If no shipment id is specified, the added items are associated with the default shipment.
  Considered values from the request body, for each item are:
  
  - productId: a valid product ID. This is the ID of the product to be added to the basket. If the
  product is already in the basket, the API either increments the quantity of the existing product line item or
  creates a new product line item, based on the site preference 'Add Product Behavior'. For option products and
  product bundles containing variation masters, the API creates a new product line item regardless of the site
  preference.
  - shipmentId: a valid shipment ID (optional). This is the ID of the shipment in which the product item
  is created.
  - quantity: a number between 0.01 and 999. This is the quantity of the product to order.
  - inventoryId: a valid inventory ID (optional). This is the ID of the inventory from which the item is
  allocated.
  - bonusDiscountLineItemId: a valid bonus discount line item ID (optional). This is the ID of the
  bonus discount line item for which the added product is a selected bonus product.
  - optionItems/optionValueId: a valid option value ID. This is an option value for an option item of
  an option product.  This is only possible if the product item is an option
  product. To set option values, you must specify a collection of option items in the optionItems
  property. These option items must contain optionId and optionValueId. Also,
  the values you specify must be valid for the option product that this product item represents. Otherwise, the
  server throws an InvalidProductOptionItemException or an
  InvalidProductOptionValueItemException.
  - custom properties in the form c_\<CUSTOM_NAME\>: the custom property must correspond to a custom
  attribute (\<CUSTOM_NAME\>) defined for ProductLineItem. The value of this property must be valid for the
  type of custom attribute defined for ProductLineItem.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async addItemToBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for addItemToBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/items",
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
      * Updates multiple items in a basket. This behaviour matches that of updating a 
  single item, but the body contains an array of ProductItems to be updated that are identified by `itemId`.
  The items to update can include bundled product items, although the 
  kind of update supported for bundled product items is limited to `productId`, `gift`, `giftMessage`
  and custom properties.
  The following values in the request body are considered by the server:
  
  - `itemId` (mandatory): identifies an item to be updated.
  - `productId`: a valid product ID. The purpose of this
  value is to change the variation of a variation product.
  - `shipmentId`: a valid shipment ID. The purpose of
  this value is to move a product item to another shipment.
  - `quantity`: a number between 0 and 999. The purpose of
  this value is to change the quantity of the product item. If the quantity is 0,
  the product item is removed.
  - `optionItems`/`optionValueId`: a valid option value
  ID. The purpose of this value is to exchange an option value for an
  option item of an option product.
  This is only possible if the product item is an option product. To change
  option values, a collection of the option items to be changed must be
  provided in the property `optionItems`. Those
  `optionItems` must contain `optionId`
  and `optionValueId`. The provided values must be valid
  for the option product that this product item represents. Otherwise,
  `InvalidProductOptionItemException` or
  `InvalidProductOptionValueItemException` is thrown.
  - custom properties `c_\<CUSTOM_NAME\>`: a
  value corresponding to the type defined for custom attribute
  `\<CUSTOM_NAME\>` of the ProductLineItem. The purpose of this value is to
  add or change the value of a custom attribute defined for the
  ProductLineItem.
  - `gift`: a boolean value that specifies whether the item is a gift.
  - `giftMessage`: a message to include with the gift.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the product line item quantity triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async updateItemsInBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    const queryParams = {};
    if (optionParams["removeExternalTax"] !== void 0) {
      queryParams["removeExternalTax"] = optionParams["removeExternalTax"];
    } else if (configParams["removeExternalTax"] !== void 0) {
      queryParams["removeExternalTax"] = configParams["removeExternalTax"];
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updateItemsInBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/items",
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
      * Removes a product item from the basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param itemId - The ID of the item to be updated.
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async removeItemFromBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
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
    if (optionParams["locale"] !== void 0) {
      queryParams["locale"] = optionParams["locale"];
    } else if (configParams["locale"] !== void 0) {
      queryParams["locale"] = configParams["locale"];
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for removeItemFromBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/items/{itemId}",
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
    return response;
  }
  /**
      * Updates an item in a basket. The item to be updated can be a bundled product item, although the 
  kind of update supported for bundled product items is limited to `productId` (to support 
  variation products), `gift`, `giftMessage` and custom properties. 
  The following values in the request body are considered by the server:
  
  - `productId`: a valid product ID. The purpose of this
  value is to exchange a variation of a variation product.
  - `shipmentId`: a valid shipment ID. The purpose of
  this value is to move a product item to another shipment.
  - `quantity`: a number between 0 and 999. The purpose of
  this value is to change quantity of the product item. If quantity is 0,
  the product item is removed.
  - `optionItems`/`optionValueId`: a valid option value
  ID. The purpose of this value is to exchange an option value for an
  option item of an option product.
  This is only possible if the product item is an option product. To change
  option values a collection of option items to be changed need to be
  provided in property optionItems. Those
  optionItems need to contain optionId
  and `optionValueId`. The provided values must be valid
  for the option product that this product item represents. Otherwise,
  `InvalidProductOptionItemException` or
  `InvalidProductOptionValueItemException` is thrown.
  - custom properties `c_\<CUSTOM_NAME\>`: a
  value corresponding to the type defined for custom attribute
  `\<CUSTOM_NAME\>` of ProductLineItem. The purpose of this value is to
  add or change the value of a custom attribute defined for
  ProductLineItem.
  - `gift`: a boolean value that specifies whether the item is a gift
  - `giftMessage`: a message for the gift
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param itemId - The ID of the item to be updated.
      * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the product line item quantity triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async updateItemInBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    if (optionParams["itemId"] !== void 0) {
      pathParams["itemId"] = optionParams["itemId"];
    } else if (configParams["itemId"] !== void 0) {
      pathParams["itemId"] = configParams["itemId"];
    } else {
      throw new Error("Missing required path parameter: itemId");
    }
    const queryParams = {};
    if (optionParams["removeExternalTax"] !== void 0) {
      queryParams["removeExternalTax"] = optionParams["removeExternalTax"];
    } else if (configParams["removeExternalTax"] !== void 0) {
      queryParams["removeExternalTax"] = configParams["removeExternalTax"];
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updateItemInBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/items/{itemId}",
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
  * This method allows you to apply external taxation data to an existing basket to be able to pass tax rates and optional values for a specific taxable line item. This endpoint can be called only if external taxation mode was used for basket creation. See POST /baskets for more information.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - An identifier for the organization the request is being made by.
  * @param basketId - The ID of the basket to be modified.
  * @param itemId - The ID of the item to be updated.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param body - The data to send as the request body.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
  * 
  */
  async addTaxesForBasketItem(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
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
        console.warn(`Invalid Parameter for addTaxesForBasketItem: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/items/{itemId}/taxes",
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
      * Adds a payment instrument to a basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async addPaymentInstrumentToBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for addPaymentInstrumentToBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/payment-instruments",
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
      * Removes a payment instrument of a basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param paymentInstrumentId - 
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async removePaymentInstrumentFromBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
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
    if (optionParams["locale"] !== void 0) {
      queryParams["locale"] = optionParams["locale"];
    } else if (configParams["locale"] !== void 0) {
      queryParams["locale"] = configParams["locale"];
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for removePaymentInstrumentFromBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/payment-instruments/{paymentInstrumentId}",
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
    return response;
  }
  /**
      * Updates payment instrument of an existing basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param paymentInstrumentId - 
      * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the payment instrument triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async updatePaymentInstrumentInBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    if (optionParams["paymentInstrumentId"] !== void 0) {
      pathParams["paymentInstrumentId"] = optionParams["paymentInstrumentId"];
    } else if (configParams["paymentInstrumentId"] !== void 0) {
      pathParams["paymentInstrumentId"] = configParams["paymentInstrumentId"];
    } else {
      throw new Error("Missing required path parameter: paymentInstrumentId");
    }
    const queryParams = {};
    if (optionParams["removeExternalTax"] !== void 0) {
      queryParams["removeExternalTax"] = optionParams["removeExternalTax"];
    } else if (configParams["removeExternalTax"] !== void 0) {
      queryParams["removeExternalTax"] = configParams["removeExternalTax"];
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updatePaymentInstrumentInBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/payment-instruments/{paymentInstrumentId}",
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
      * Gets applicable payment methods for an existing basket considering the open payment amount only.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type PaymentMethodResult otherwise.
      * 
      */
  async getPaymentMethodsForBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getPaymentMethodsForBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/payment-methods",
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
      * Adds a custom manual price adjustment to the basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async addPriceAdjustmentToBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for addPriceAdjustmentToBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/price-adjustments",
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
      * Removes a custom manual price adjustment from the basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param priceAdjustmentId - 
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async removePriceAdjustmentFromBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    if (optionParams["priceAdjustmentId"] !== void 0) {
      pathParams["priceAdjustmentId"] = optionParams["priceAdjustmentId"];
    } else if (configParams["priceAdjustmentId"] !== void 0) {
      pathParams["priceAdjustmentId"] = configParams["priceAdjustmentId"];
    } else {
      throw new Error("Missing required path parameter: priceAdjustmentId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for removePriceAdjustmentFromBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/price-adjustments/{priceAdjustmentId}",
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
    return response;
  }
  /**
      * Updates a custom manual price adjustment on the basket. Only the following path values are considered for the update; all other attributes are ignored.
  - `discount` 
  - `itemText`
  - `reasonCode`
  - `custom properties` 
  The discount `type` of a price adjustment cannot be updated and therefore, the value of the existing type must be passed. For an adjustment of type `percentage`, the `percentage` attribute is mandatory. For adjustments of type `amount` and `fixed_price`, the `amount` attribute is mandatory.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param priceAdjustmentId - 
      * @param siteId - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async updatePriceAdjustmentInBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    if (optionParams["priceAdjustmentId"] !== void 0) {
      pathParams["priceAdjustmentId"] = optionParams["priceAdjustmentId"];
    } else if (configParams["priceAdjustmentId"] !== void 0) {
      pathParams["priceAdjustmentId"] = configParams["priceAdjustmentId"];
    } else {
      throw new Error("Missing required path parameter: priceAdjustmentId");
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
        console.warn(`Invalid Parameter for updatePriceAdjustmentInBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/price-adjustments/{priceAdjustmentId}",
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
  * ( DEPRECATED ) Gets applicable price books for an existing basket. This endpoint is deprecated. Use [Shopper Context](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-context?meta=Summary), hooks or `dw.catalog.PriceBookMgr#getApplicablePriceBooks()` instead.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - An identifier for the organization the request is being made by.
  * @param basketId - The ID of the basket to be modified.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type PriceBookIds otherwise.
  * 
  */
  async getPriceBooksForBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
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
        console.warn(`Invalid Parameter for getPriceBooksForBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/price-books",
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
  * ( DEPRECATED ) This method allows you to put an array of priceBookIds to an existing basket, which will be used for basket calculation. This endpoint is deprecated.  Use [Shopper Context](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-context?meta=Summary), hooks or `dw.catalog.PriceBookMgr#setApplicablePriceBooks()` instead.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - An identifier for the organization the request is being made by.
  * @param basketId - The ID of the basket to be modified.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param body - The data to send as the request body.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
  * 
  */
  async addPriceBooksToBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
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
        console.warn(`Invalid Parameter for addPriceBooksToBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/price-books",
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
      * Creates a new shipment for a basket.
  
  The created shipment is initialized with values provided in the body
  document and can be updated with further data API calls. Considered from
  the body are the following properties if specified:
  
  - the ID
  - the shipping address
  - the shipping method
  - gift boolean flag
  - gift message
  - custom properties
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async createShipmentForBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for createShipmentForBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/shipments",
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
      * Removes a specified shipment and all associated product, gift certificate,
  shipping, and price adjustment line items from a basket.
  It is not allowed to remove the default shipment.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param shipmentId - The ID of the shipment to be modified.
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async removeShipmentFromBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    if (optionParams["shipmentId"] !== void 0) {
      pathParams["shipmentId"] = optionParams["shipmentId"];
    } else if (configParams["shipmentId"] !== void 0) {
      pathParams["shipmentId"] = configParams["shipmentId"];
    } else {
      throw new Error("Missing required path parameter: shipmentId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for removeShipmentFromBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/shipments/{shipmentId}",
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
    return response;
  }
  /**
      * Updates a shipment for a basket.
  
  The shipment is initialized with values provided in the body
  document and can be updated with further data API calls. Considered from
  the body are the following properties if specified:
  - the ID
  - the shipping address
  - the shipping method
  - gift boolean flag
  - gift message
  - custom properties
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param shipmentId - The ID of the shipment to be modified.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async updateShipmentForBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    if (optionParams["shipmentId"] !== void 0) {
      pathParams["shipmentId"] = optionParams["shipmentId"];
    } else if (configParams["shipmentId"] !== void 0) {
      pathParams["shipmentId"] = configParams["shipmentId"];
    } else {
      throw new Error("Missing required path parameter: shipmentId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updateShipmentForBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/shipments/{shipmentId}",
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
      * Sets a shipping address of a specific shipment of a basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param shipmentId - The ID of the shipment to be modified.
      * @param useAsBilling - 
      * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the shipping/billing address triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values. 
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async updateShippingAddressForShipment(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    if (optionParams["shipmentId"] !== void 0) {
      pathParams["shipmentId"] = optionParams["shipmentId"];
    } else if (configParams["shipmentId"] !== void 0) {
      pathParams["shipmentId"] = configParams["shipmentId"];
    } else {
      throw new Error("Missing required path parameter: shipmentId");
    }
    const queryParams = {};
    if (optionParams["useAsBilling"] !== void 0) {
      queryParams["useAsBilling"] = optionParams["useAsBilling"];
    } else if (configParams["useAsBilling"] !== void 0) {
      queryParams["useAsBilling"] = configParams["useAsBilling"];
    }
    if (optionParams["removeExternalTax"] !== void 0) {
      queryParams["removeExternalTax"] = optionParams["removeExternalTax"];
    } else if (configParams["removeExternalTax"] !== void 0) {
      queryParams["removeExternalTax"] = configParams["removeExternalTax"];
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updateShippingAddressForShipment: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/shipments/{shipmentId}/shipping-address",
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
      * Sets a shipping method to a specific shipment of a basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param shipmentId - The ID of the shipment to be modified.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async updateShippingMethodForShipment(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    if (optionParams["shipmentId"] !== void 0) {
      pathParams["shipmentId"] = optionParams["shipmentId"];
    } else if (configParams["shipmentId"] !== void 0) {
      pathParams["shipmentId"] = configParams["shipmentId"];
    } else {
      throw new Error("Missing required path parameter: shipmentId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updateShippingMethodForShipment: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/shipments/{shipmentId}/shipping-method",
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
      * Gets the applicable shipping methods for a certain shipment of a basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param shipmentId - The ID of the shipment to be modified.
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type ShippingMethodResult otherwise.
      * 
      */
  async getShippingMethodsForShipment(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    if (optionParams["shipmentId"] !== void 0) {
      pathParams["shipmentId"] = optionParams["shipmentId"];
    } else if (configParams["shipmentId"] !== void 0) {
      pathParams["shipmentId"] = configParams["shipmentId"];
    } else {
      throw new Error("Missing required path parameter: shipmentId");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getShippingMethodsForShipment: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/shipments/{shipmentId}/shipping-methods",
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
      * Marks a basket as a storefront basket.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param basketId - The ID of the basket to be modified.
      * @param exchange - If true, an existing storefront basket is exchanged and marked as an agent basket. If false, a `CustomerBasketsQuotaExceededException` is thrown.
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
      * 
      */
  async updateAsStorefrontBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
    }
    const queryParams = {};
    if (optionParams["exchange"] !== void 0) {
      queryParams["exchange"] = optionParams["exchange"];
    } else if (configParams["exchange"] !== void 0) {
      queryParams["exchange"] = configParams["exchange"];
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updateAsStorefrontBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/storefront",
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
        method: "PUT",
        headers
      },
      this.clientConfig,
      rawResponse
    );
    return response;
  }
  /**
  * This method gives you the external taxation data set by the PUT taxes API. This endpoint can be called only if external taxation mode was used for basket creation. See POST /baskets for more information.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - An identifier for the organization the request is being made by.
  * @param basketId - The ID of the basket to be modified.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type Taxes otherwise.
  * 
  */
  async getTaxesFromBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
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
        console.warn(`Invalid Parameter for getTaxesFromBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/taxes",
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
  * This method allows you to apply external taxation data to an existing basket to be able to pass tax rates and optional values for all taxable line items. This endpoint can be called only if external taxation mode was used for basket creation. See POST /baskets for more information.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - An identifier for the organization the request is being made by.
  * @param basketId - The ID of the basket to be modified.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param body - The data to send as the request body.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
  * 
  */
  async addTaxesForBasket(options, rawResponse) {
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
    if (optionParams["basketId"] !== void 0) {
      pathParams["basketId"] = optionParams["basketId"];
    } else if (configParams["basketId"] !== void 0) {
      pathParams["basketId"] = configParams["basketId"];
    } else {
      throw new Error("Missing required path parameter: basketId");
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
        console.warn(`Invalid Parameter for addTaxesForBasket: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/baskets/{basketId}/taxes",
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
};
ShopperBaskets.defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/{version}";
ShopperBaskets.apiPaths = {
  createBasket: "/organizations/{organizationId}/baskets",
  transferBasket: "/organizations/{organizationId}/baskets/actions/transfer",
  mergeBasket: "/organizations/{organizationId}/baskets/actions/merge",
  deleteBasket: "/organizations/{organizationId}/baskets/{basketId}",
  getBasket: "/organizations/{organizationId}/baskets/{basketId}",
  updateBasket: "/organizations/{organizationId}/baskets/{basketId}",
  updateAsAgentBasket: "/organizations/{organizationId}/baskets/{basketId}/agent",
  updateBillingAddressForBasket: "/organizations/{organizationId}/baskets/{basketId}/billing-address",
  addCouponToBasket: "/organizations/{organizationId}/baskets/{basketId}/coupons",
  removeCouponFromBasket: "/organizations/{organizationId}/baskets/{basketId}/coupons/{couponItemId}",
  updateCustomerForBasket: "/organizations/{organizationId}/baskets/{basketId}/customer",
  addGiftCertificateItemToBasket: "/organizations/{organizationId}/baskets/{basketId}/gift-certificate-items",
  removeGiftCertificateItemFromBasket: "/organizations/{organizationId}/baskets/{basketId}/gift-certificate-items/{giftCertificateItemId}",
  updateGiftCertificateItemInBasket: "/organizations/{organizationId}/baskets/{basketId}/gift-certificate-items/{giftCertificateItemId}",
  addItemToBasket: "/organizations/{organizationId}/baskets/{basketId}/items",
  updateItemsInBasket: "/organizations/{organizationId}/baskets/{basketId}/items",
  removeItemFromBasket: "/organizations/{organizationId}/baskets/{basketId}/items/{itemId}",
  updateItemInBasket: "/organizations/{organizationId}/baskets/{basketId}/items/{itemId}",
  addTaxesForBasketItem: "/organizations/{organizationId}/baskets/{basketId}/items/{itemId}/taxes",
  addPaymentInstrumentToBasket: "/organizations/{organizationId}/baskets/{basketId}/payment-instruments",
  removePaymentInstrumentFromBasket: "/organizations/{organizationId}/baskets/{basketId}/payment-instruments/{paymentInstrumentId}",
  updatePaymentInstrumentInBasket: "/organizations/{organizationId}/baskets/{basketId}/payment-instruments/{paymentInstrumentId}",
  getPaymentMethodsForBasket: "/organizations/{organizationId}/baskets/{basketId}/payment-methods",
  addPriceAdjustmentToBasket: "/organizations/{organizationId}/baskets/{basketId}/price-adjustments",
  removePriceAdjustmentFromBasket: "/organizations/{organizationId}/baskets/{basketId}/price-adjustments/{priceAdjustmentId}",
  updatePriceAdjustmentInBasket: "/organizations/{organizationId}/baskets/{basketId}/price-adjustments/{priceAdjustmentId}",
  getPriceBooksForBasket: "/organizations/{organizationId}/baskets/{basketId}/price-books",
  addPriceBooksToBasket: "/organizations/{organizationId}/baskets/{basketId}/price-books",
  createShipmentForBasket: "/organizations/{organizationId}/baskets/{basketId}/shipments",
  removeShipmentFromBasket: "/organizations/{organizationId}/baskets/{basketId}/shipments/{shipmentId}",
  updateShipmentForBasket: "/organizations/{organizationId}/baskets/{basketId}/shipments/{shipmentId}",
  updateShippingAddressForShipment: "/organizations/{organizationId}/baskets/{basketId}/shipments/{shipmentId}/shipping-address",
  updateShippingMethodForShipment: "/organizations/{organizationId}/baskets/{basketId}/shipments/{shipmentId}/shipping-method",
  getShippingMethodsForShipment: "/organizations/{organizationId}/baskets/{basketId}/shipments/{shipmentId}/shipping-methods",
  updateAsStorefrontBasket: "/organizations/{organizationId}/baskets/{basketId}/storefront",
  getTaxesFromBasket: "/organizations/{organizationId}/baskets/{basketId}/taxes",
  addTaxesForBasket: "/organizations/{organizationId}/baskets/{basketId}/taxes"
};
ShopperBaskets.paramKeys = {
  createBasket: [
    "organizationId",
    "taxMode",
    "temporary",
    "siteId",
    "locale"
  ],
  createBasketRequired: [
    "organizationId",
    "siteId"
  ],
  transferBasket: [
    "organizationId",
    "overrideExisting",
    "siteId",
    "locale"
  ],
  transferBasketRequired: [
    "organizationId",
    "siteId"
  ],
  mergeBasket: [
    "organizationId",
    "createDestinationBasket",
    "productItemMergeMode",
    "siteId",
    "locale"
  ],
  mergeBasketRequired: [
    "organizationId",
    "siteId"
  ],
  deleteBasket: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  deleteBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  getBasket: [
    "organizationId",
    "basketId",
    "siteId",
    "locale"
  ],
  getBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  updateBasket: [
    "organizationId",
    "basketId",
    "removeExternalTax",
    "siteId",
    "locale"
  ],
  updateBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  updateAsAgentBasket: [
    "organizationId",
    "basketId",
    "siteId",
    "locale"
  ],
  updateAsAgentBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  updateBillingAddressForBasket: [
    "organizationId",
    "basketId",
    "useAsShipping",
    "removeExternalTax",
    "siteId",
    "locale"
  ],
  updateBillingAddressForBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  addCouponToBasket: [
    "organizationId",
    "basketId",
    "siteId",
    "locale"
  ],
  addCouponToBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  removeCouponFromBasket: [
    "organizationId",
    "basketId",
    "couponItemId",
    "siteId",
    "locale"
  ],
  removeCouponFromBasketRequired: [
    "organizationId",
    "basketId",
    "couponItemId",
    "siteId"
  ],
  updateCustomerForBasket: [
    "organizationId",
    "basketId",
    "siteId",
    "locale"
  ],
  updateCustomerForBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  addGiftCertificateItemToBasket: [
    "organizationId",
    "basketId",
    "siteId",
    "locale"
  ],
  addGiftCertificateItemToBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  removeGiftCertificateItemFromBasket: [
    "organizationId",
    "basketId",
    "giftCertificateItemId",
    "siteId",
    "locale"
  ],
  removeGiftCertificateItemFromBasketRequired: [
    "organizationId",
    "basketId",
    "giftCertificateItemId",
    "siteId"
  ],
  updateGiftCertificateItemInBasket: [
    "organizationId",
    "basketId",
    "giftCertificateItemId",
    "siteId",
    "locale"
  ],
  updateGiftCertificateItemInBasketRequired: [
    "organizationId",
    "basketId",
    "giftCertificateItemId",
    "siteId"
  ],
  addItemToBasket: [
    "organizationId",
    "basketId",
    "siteId",
    "locale"
  ],
  addItemToBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  updateItemsInBasket: [
    "organizationId",
    "basketId",
    "removeExternalTax",
    "siteId",
    "locale"
  ],
  updateItemsInBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  removeItemFromBasket: [
    "organizationId",
    "basketId",
    "itemId",
    "siteId",
    "locale"
  ],
  removeItemFromBasketRequired: [
    "organizationId",
    "basketId",
    "itemId",
    "siteId"
  ],
  updateItemInBasket: [
    "organizationId",
    "basketId",
    "itemId",
    "removeExternalTax",
    "siteId",
    "locale"
  ],
  updateItemInBasketRequired: [
    "organizationId",
    "basketId",
    "itemId",
    "siteId"
  ],
  addTaxesForBasketItem: [
    "organizationId",
    "basketId",
    "itemId",
    "siteId"
  ],
  addTaxesForBasketItemRequired: [
    "organizationId",
    "basketId",
    "itemId",
    "siteId"
  ],
  addPaymentInstrumentToBasket: [
    "organizationId",
    "basketId",
    "siteId",
    "locale"
  ],
  addPaymentInstrumentToBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  removePaymentInstrumentFromBasket: [
    "organizationId",
    "basketId",
    "paymentInstrumentId",
    "siteId",
    "locale"
  ],
  removePaymentInstrumentFromBasketRequired: [
    "organizationId",
    "basketId",
    "paymentInstrumentId",
    "siteId"
  ],
  updatePaymentInstrumentInBasket: [
    "organizationId",
    "basketId",
    "paymentInstrumentId",
    "removeExternalTax",
    "siteId",
    "locale"
  ],
  updatePaymentInstrumentInBasketRequired: [
    "organizationId",
    "basketId",
    "paymentInstrumentId",
    "siteId"
  ],
  getPaymentMethodsForBasket: [
    "organizationId",
    "basketId",
    "siteId",
    "locale"
  ],
  getPaymentMethodsForBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  addPriceAdjustmentToBasket: [
    "organizationId",
    "basketId",
    "siteId",
    "locale"
  ],
  addPriceAdjustmentToBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  removePriceAdjustmentFromBasket: [
    "organizationId",
    "basketId",
    "priceAdjustmentId",
    "siteId",
    "locale"
  ],
  removePriceAdjustmentFromBasketRequired: [
    "organizationId",
    "basketId",
    "priceAdjustmentId",
    "siteId"
  ],
  updatePriceAdjustmentInBasket: [
    "organizationId",
    "basketId",
    "priceAdjustmentId",
    "siteId"
  ],
  updatePriceAdjustmentInBasketRequired: [
    "organizationId",
    "basketId",
    "priceAdjustmentId",
    "siteId"
  ],
  getPriceBooksForBasket: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  getPriceBooksForBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  addPriceBooksToBasket: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  addPriceBooksToBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  createShipmentForBasket: [
    "organizationId",
    "basketId",
    "siteId",
    "locale"
  ],
  createShipmentForBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  removeShipmentFromBasket: [
    "organizationId",
    "basketId",
    "shipmentId",
    "siteId",
    "locale"
  ],
  removeShipmentFromBasketRequired: [
    "organizationId",
    "basketId",
    "shipmentId",
    "siteId"
  ],
  updateShipmentForBasket: [
    "organizationId",
    "basketId",
    "shipmentId",
    "siteId",
    "locale"
  ],
  updateShipmentForBasketRequired: [
    "organizationId",
    "basketId",
    "shipmentId",
    "siteId"
  ],
  updateShippingAddressForShipment: [
    "organizationId",
    "basketId",
    "shipmentId",
    "useAsBilling",
    "removeExternalTax",
    "siteId",
    "locale"
  ],
  updateShippingAddressForShipmentRequired: [
    "organizationId",
    "basketId",
    "shipmentId",
    "siteId"
  ],
  updateShippingMethodForShipment: [
    "organizationId",
    "basketId",
    "shipmentId",
    "siteId",
    "locale"
  ],
  updateShippingMethodForShipmentRequired: [
    "organizationId",
    "basketId",
    "shipmentId",
    "siteId"
  ],
  getShippingMethodsForShipment: [
    "organizationId",
    "basketId",
    "shipmentId",
    "siteId",
    "locale"
  ],
  getShippingMethodsForShipmentRequired: [
    "organizationId",
    "basketId",
    "shipmentId",
    "siteId"
  ],
  updateAsStorefrontBasket: [
    "organizationId",
    "basketId",
    "exchange",
    "siteId",
    "locale"
  ],
  updateAsStorefrontBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  getTaxesFromBasket: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  getTaxesFromBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  addTaxesForBasket: [
    "organizationId",
    "basketId",
    "siteId"
  ],
  addTaxesForBasketRequired: [
    "organizationId",
    "basketId",
    "siteId"
  ]
};

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

// src/shopperExperience.ts
var ShopperExperience = class {
  constructor(config) {
    const cfg = { ...config };
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    this.clientConfig = new ClientConfig(cfg);
  }
  /**
      * Get Page Designer pages. The results will apply the visibility rules for each page's components, such as personalization or scheduled visibility.
  
  Either `categoryId` or `productId` must be given in addition to `aspectTypeId`. Because only a single page-to-product and page-to-category assignment per aspect type can be authored today, the returned result contains one element at most.
  
  **Important**: Currently, the Shopper Experience API can’t be used when the [storefront password protection](https://documentation.b2c.commercecloud.salesforce.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2Fcontent%2Fb2c_commerce%2Ftopics%2Fpermissions%2Fb2c_storefront_password_protection.html&resultof=%22%73%74%6f%72%65%66%72%6f%6e%74%22%20%22%70%72%6f%74%65%63%74%69%6f%6e%22%20%22%70%72%6f%74%65%63%74%22%20) feature is enabled.
  
  **Important**: Because this resource uses the GET method, you must not pass sensitive data (payment card information, for example) and must not perform any transactional processes within the server-side scripts that are run for the page and components.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param categoryId - Category identifier that is used for searching the page assignment. Must be provided if no `productId` is provided.
      * @param productId - Product identifier that is used for searching the page assignment. Must be provided if no `categoryId` is provided.
      * @param aspectTypeId - Aspect type identifier that is used for searching the page assignment in conjunction with either the `productId` or `categoryId`.
      * @param aspectAttributes - A JSON respresentation of aspect attributes. Each aspect attribute is a key/value pair. Aspect attributes serve as a runtime parameter contract between caller (for example, this API or the DWScript API) and callee (the page). This parameter must not contain more than 256 characters after URL decoding.
      * @param parameters - A free-form definition of parameters that influences the page rendering according to its implementation. This parameter must not contain more than 256 characters after URL decoding.
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type PageResult otherwise.
      * 
      */
  async getPages(options, rawResponse) {
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
    if (optionParams["categoryId"] !== void 0) {
      queryParams["categoryId"] = optionParams["categoryId"];
    } else if (configParams["categoryId"] !== void 0) {
      queryParams["categoryId"] = configParams["categoryId"];
    }
    if (optionParams["productId"] !== void 0) {
      queryParams["productId"] = optionParams["productId"];
    } else if (configParams["productId"] !== void 0) {
      queryParams["productId"] = configParams["productId"];
    }
    if (optionParams["aspectTypeId"] !== void 0) {
      queryParams["aspectTypeId"] = optionParams["aspectTypeId"];
    } else if (configParams["aspectTypeId"] !== void 0) {
      queryParams["aspectTypeId"] = configParams["aspectTypeId"];
    } else {
      throw new Error("Missing required query parameter: aspectTypeId");
    }
    if (optionParams["aspectAttributes"] !== void 0) {
      queryParams["aspectAttributes"] = optionParams["aspectAttributes"];
    } else if (configParams["aspectAttributes"] !== void 0) {
      queryParams["aspectAttributes"] = configParams["aspectAttributes"];
    }
    if (optionParams["parameters"] !== void 0) {
      queryParams["parameters"] = optionParams["parameters"];
    } else if (configParams["parameters"] !== void 0) {
      queryParams["parameters"] = configParams["parameters"];
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getPages: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/pages",
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
      * Get a Page Designer page based on a single page ID. The results will apply the visibility rules for the page's components, such as personalization or scheduled visibility.
  
  **Important**: Currently, the Shopper Experience API can’t be used when the [storefront password protection](https://documentation.b2c.commercecloud.salesforce.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2Fcontent%2Fb2c_commerce%2Ftopics%2Fpermissions%2Fb2c_storefront_password_protection.html&resultof=%22%73%74%6f%72%65%66%72%6f%6e%74%22%20%22%70%72%6f%74%65%63%74%69%6f%6e%22%20%22%70%72%6f%74%65%63%74%22%20) feature is enabled.
  
  **Important**: Because this resource uses the GET method, you must not pass sensitive data (payment card information, for example) and must not perform any transactional processes within the server-side scripts that are run for the page and components.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param pageId - Identifier for the requested page.
      * @param aspectAttributes - A JSON respresentation of aspect attributes. Each aspect attribute is a key/value pair. Aspect attributes serve as a runtime parameter contract between caller (for example, this API or the DWScript API) and callee (the page). This parameter must not contain more than 256 characters after URL decoding.
      * @param parameters - A free-form definition of parameters that influences the page rendering according to its implementation. This parameter must not contain more than 256 characters after URL decoding.
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type Page otherwise.
      * 
      */
  async getPage(options, rawResponse) {
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
    if (optionParams["pageId"] !== void 0) {
      pathParams["pageId"] = optionParams["pageId"];
    } else if (configParams["pageId"] !== void 0) {
      pathParams["pageId"] = configParams["pageId"];
    } else {
      throw new Error("Missing required path parameter: pageId");
    }
    const queryParams = {};
    if (optionParams["aspectAttributes"] !== void 0) {
      queryParams["aspectAttributes"] = optionParams["aspectAttributes"];
    } else if (configParams["aspectAttributes"] !== void 0) {
      queryParams["aspectAttributes"] = configParams["aspectAttributes"];
    }
    if (optionParams["parameters"] !== void 0) {
      queryParams["parameters"] = optionParams["parameters"];
    } else if (configParams["parameters"] !== void 0) {
      queryParams["parameters"] = configParams["parameters"];
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getPage: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/pages/{pageId}",
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
ShopperExperience.defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/experience/shopper-experience/{version}";
ShopperExperience.apiPaths = {
  getPages: "/organizations/{organizationId}/pages",
  getPage: "/organizations/{organizationId}/pages/{pageId}"
};
ShopperExperience.paramKeys = {
  getPages: [
    "organizationId",
    "categoryId",
    "productId",
    "aspectTypeId",
    "aspectAttributes",
    "parameters",
    "siteId",
    "locale"
  ],
  getPagesRequired: [
    "organizationId",
    "aspectTypeId",
    "siteId"
  ],
  getPage: [
    "organizationId",
    "pageId",
    "aspectAttributes",
    "parameters",
    "siteId",
    "locale"
  ],
  getPageRequired: [
    "organizationId",
    "pageId",
    "siteId"
  ]
};

// src/shopperGiftCertificates.ts
var ShopperGiftCertificates = class {
  constructor(config) {
    const cfg = { ...config };
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    this.clientConfig = new ClientConfig(cfg);
  }
  /**
  * Action to retrieve an existing gift certificate.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - An identifier for the organization the request is being made by.
  * @param siteId - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param body - The data to send as the request body.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type GiftCertificate otherwise.
  * 
  */
  async getGiftCertificate(options, rawResponse) {
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
        console.warn(`Invalid Parameter for getGiftCertificate: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/gift-certificate",
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
};
ShopperGiftCertificates.defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/pricing/shopper-gift-certificates/{version}";
ShopperGiftCertificates.apiPaths = {
  getGiftCertificate: "/organizations/{organizationId}/gift-certificate"
};
ShopperGiftCertificates.paramKeys = {
  getGiftCertificate: [
    "organizationId",
    "siteId"
  ],
  getGiftCertificateRequired: [
    "organizationId",
    "siteId"
  ]
};

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

// src/shopperOrders.ts
var ShopperOrders = class {
  constructor(config) {
    const cfg = { ...config };
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    this.clientConfig = new ClientConfig(cfg);
  }
  /**
      * Submits an order based on a prepared basket. The only considered value from the request body is basketId.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Order otherwise.
      * 
      */
  async createOrder(options, rawResponse) {
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
    if (optionParams["locale"] !== void 0) {
      queryParams["locale"] = optionParams["locale"];
    } else if (configParams["locale"] !== void 0) {
      queryParams["locale"] = configParams["locale"];
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for createOrder: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/orders",
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
      * Gets information for an order.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param orderNo - The order number of the order to be modified.
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type Order otherwise.
      * 
      */
  async getOrder(options, rawResponse) {
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
    if (optionParams["orderNo"] !== void 0) {
      pathParams["orderNo"] = optionParams["orderNo"];
    } else if (configParams["orderNo"] !== void 0) {
      pathParams["orderNo"] = configParams["orderNo"];
    } else {
      throw new Error("Missing required path parameter: orderNo");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getOrder: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/orders/{orderNo}",
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
      * Use this endpoint to lookup a guest order. 
  
  **Important**: This endpoint uses the [ShopperTokenTsob](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-login?meta=security%3AShopperTokenTsob) security scheme. Always check the Security section of the endpoint documentation, which is hidden by default.
   
  The API uses the `orderViewCode` generated during the order creation and the `email` of the order customer to lookup a guest order. If email is not provided on the order, the field can be left blank in the lookup request.
  **Note**: In the no email on order scenario, the custom implementation must include an additional verification of an order attribute. For example, a postal code or mobile number. 
  
  This API can also be used for looking up an order for a registered customer. In addition to the verification steps used for guest order lookup, the API also verifies that the customer ID of the order matches with the customer ID supplied in the `ShopperTokenTsob`. 
  
  
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param orderNo - The order number of the order to be modified.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Order otherwise.
      * 
      */
  async guestOrderLookup(options, rawResponse) {
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
    if (optionParams["orderNo"] !== void 0) {
      pathParams["orderNo"] = optionParams["orderNo"];
    } else if (configParams["orderNo"] !== void 0) {
      pathParams["orderNo"] = configParams["orderNo"];
    } else {
      throw new Error("Missing required path parameter: orderNo");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for guestOrderLookup: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/orders/{orderNo}/lookup",
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
      * Adds a payment instrument to an order. 
  
  Details:
  
  The payment instrument is added with the provided details. The payment method must be applicable for the order see GET
  /baskets/\{basketId\}/payment-methods, if the payment method is 'CREDIT_CARD' a paymentCard must be specified in the request.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param orderNo - The order number of the order to be modified.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Order otherwise.
      * 
      */
  async createPaymentInstrumentForOrder(options, rawResponse) {
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
    if (optionParams["orderNo"] !== void 0) {
      pathParams["orderNo"] = optionParams["orderNo"];
    } else if (configParams["orderNo"] !== void 0) {
      pathParams["orderNo"] = configParams["orderNo"];
    } else {
      throw new Error("Missing required path parameter: orderNo");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for createPaymentInstrumentForOrder: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/orders/{orderNo}/payment-instruments",
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
      * Removes a payment instrument of an order.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param orderNo - The order number of the order to be modified.
      * @param paymentInstrumentId - The ID of the payment instrument to be updated.
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type Order otherwise.
      * 
      */
  async removePaymentInstrumentFromOrder(options, rawResponse) {
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
    if (optionParams["orderNo"] !== void 0) {
      pathParams["orderNo"] = optionParams["orderNo"];
    } else if (configParams["orderNo"] !== void 0) {
      pathParams["orderNo"] = configParams["orderNo"];
    } else {
      throw new Error("Missing required path parameter: orderNo");
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
    if (optionParams["locale"] !== void 0) {
      queryParams["locale"] = optionParams["locale"];
    } else if (configParams["locale"] !== void 0) {
      queryParams["locale"] = configParams["locale"];
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for removePaymentInstrumentFromOrder: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/orders/{orderNo}/payment-instruments/{paymentInstrumentId}",
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
    return response;
  }
  /**
      * Updates a payment instrument of an order.
  
  Details:
  
  The payment instrument is updated with the provided details. The payment method must be applicable for the
  order see GET /baskets/\{basketId\}/payment-methods, if the payment method is 'CREDIT_CARD' a
  paymentCard must be specified in the request.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param orderNo - The order number of the order to be modified.
      * @param paymentInstrumentId - The ID of the payment instrument to be updated.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param body - The data to send as the request body.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Order otherwise.
      * 
      */
  async updatePaymentInstrumentForOrder(options, rawResponse) {
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
    if (optionParams["orderNo"] !== void 0) {
      pathParams["orderNo"] = optionParams["orderNo"];
    } else if (configParams["orderNo"] !== void 0) {
      pathParams["orderNo"] = configParams["orderNo"];
    } else {
      throw new Error("Missing required path parameter: orderNo");
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
    if (optionParams["locale"] !== void 0) {
      queryParams["locale"] = optionParams["locale"];
    } else if (configParams["locale"] !== void 0) {
      queryParams["locale"] = configParams["locale"];
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for updatePaymentInstrumentForOrder: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/orders/{orderNo}/payment-instruments/{paymentInstrumentId}",
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
      * Gets the applicable payment methods for an existing order considering the open payment amount only.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param orderNo - The order number of the order to be modified.
      * @param siteId - 
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
      * @returns A promise of type Response if rawResponse is true, a promise of type PaymentMethodResult otherwise.
      * 
      */
  async getPaymentMethodsForOrder(options, rawResponse) {
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
    if (optionParams["orderNo"] !== void 0) {
      pathParams["orderNo"] = optionParams["orderNo"];
    } else if (configParams["orderNo"] !== void 0) {
      pathParams["orderNo"] = configParams["orderNo"];
    } else {
      throw new Error("Missing required path parameter: orderNo");
    }
    const queryParams = {};
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getPaymentMethodsForOrder: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/orders/{orderNo}/payment-methods",
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
      * This method gives you the external taxation data of the order transferred from the basket during 
  order creation. This endpoint can be called only if external taxation was used. See POST /baskets 
  for more information.         
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param orderNo - The order number of the order to be modified.
      * @param siteId - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Taxes otherwise.
      * 
      */
  async getTaxesFromOrder(options, rawResponse) {
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
    if (optionParams["orderNo"] !== void 0) {
      pathParams["orderNo"] = optionParams["orderNo"];
    } else if (configParams["orderNo"] !== void 0) {
      pathParams["orderNo"] = configParams["orderNo"];
    } else {
      throw new Error("Missing required path parameter: orderNo");
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
        console.warn(`Invalid Parameter for getTaxesFromOrder: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/orders/{orderNo}/taxes",
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
ShopperOrders.defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/checkout/shopper-orders/{version}";
ShopperOrders.apiPaths = {
  createOrder: "/organizations/{organizationId}/orders",
  getOrder: "/organizations/{organizationId}/orders/{orderNo}",
  guestOrderLookup: "/organizations/{organizationId}/orders/{orderNo}/lookup",
  createPaymentInstrumentForOrder: "/organizations/{organizationId}/orders/{orderNo}/payment-instruments",
  removePaymentInstrumentFromOrder: "/organizations/{organizationId}/orders/{orderNo}/payment-instruments/{paymentInstrumentId}",
  updatePaymentInstrumentForOrder: "/organizations/{organizationId}/orders/{orderNo}/payment-instruments/{paymentInstrumentId}",
  getPaymentMethodsForOrder: "/organizations/{organizationId}/orders/{orderNo}/payment-methods",
  getTaxesFromOrder: "/organizations/{organizationId}/orders/{orderNo}/taxes"
};
ShopperOrders.paramKeys = {
  createOrder: [
    "organizationId",
    "siteId",
    "locale"
  ],
  createOrderRequired: [
    "organizationId",
    "siteId"
  ],
  getOrder: [
    "organizationId",
    "orderNo",
    "siteId",
    "locale"
  ],
  getOrderRequired: [
    "organizationId",
    "orderNo",
    "siteId"
  ],
  guestOrderLookup: [
    "organizationId",
    "orderNo",
    "siteId",
    "locale"
  ],
  guestOrderLookupRequired: [
    "organizationId",
    "orderNo",
    "siteId"
  ],
  createPaymentInstrumentForOrder: [
    "organizationId",
    "orderNo",
    "siteId",
    "locale"
  ],
  createPaymentInstrumentForOrderRequired: [
    "organizationId",
    "orderNo",
    "siteId"
  ],
  removePaymentInstrumentFromOrder: [
    "organizationId",
    "orderNo",
    "paymentInstrumentId",
    "siteId",
    "locale"
  ],
  removePaymentInstrumentFromOrderRequired: [
    "organizationId",
    "orderNo",
    "paymentInstrumentId",
    "siteId"
  ],
  updatePaymentInstrumentForOrder: [
    "organizationId",
    "orderNo",
    "paymentInstrumentId",
    "siteId",
    "locale"
  ],
  updatePaymentInstrumentForOrderRequired: [
    "organizationId",
    "orderNo",
    "paymentInstrumentId",
    "siteId"
  ],
  getPaymentMethodsForOrder: [
    "organizationId",
    "orderNo",
    "siteId",
    "locale"
  ],
  getPaymentMethodsForOrderRequired: [
    "organizationId",
    "orderNo",
    "siteId"
  ],
  getTaxesFromOrder: [
    "organizationId",
    "orderNo",
    "siteId"
  ],
  getTaxesFromOrderRequired: [
    "organizationId",
    "orderNo",
    "siteId"
  ]
};

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

// src/shopperPromotions.ts
var ShopperPromotions = class {
  constructor(config) {
    const cfg = { ...config };
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    this.clientConfig = new ClientConfig(cfg);
  }
  /**
  * Returns an array of enabled promotions for a list of specified IDs. In the request URL, you can specify up to 50 IDs. If you specify an ID that contains either parentheses or the separator characters, you must URL encode these characters. Each request returns only enabled promotions as the server does not consider promotion qualifiers or schedules.
  *
  * @param options - An object containing the options for this method.
  * @param parameters - An object containing the parameters for this method.
  * @param organizationId - An identifier for the organization the request is being made by.
  * @param siteId - 
  * @param ids - 
  * @param locale - 
  * @param headers - An object literal of key value pairs of the headers to be
  * sent with this request.
  * @param rawResponse - Set to true to return entire Response object instead of DTO.
  *
  * @returns A promise of type Response if rawResponse is true, a promise of type PromotionResult otherwise.
  * 
  */
  async getPromotions(options, rawResponse) {
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
        console.warn(`Invalid Parameter for getPromotions: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/promotions",
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
      * Handles get promotion by filter criteria. Returns an array of enabled promotions matching the specified filter
  criteria. In the request URL, you must provide a campaign_id parameter, and you can optionally specify a date
  range by providing start_date and end_date parameters. Both parameters are required to specify a date range, as 
  omitting one causes the server to return a MissingParameterException fault. Each request returns only enabled
  promotions, since the server does not consider promotion qualifiers or schedules.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param campaignId - Find the promotions assigned to this campaign (mandatory).
      * @param siteId - 
      * @param startDate - The start date of the promotion in ISO8601 date time format: yyyy-MM-dd'T'HH:mmZ
      * @param endDate - The end date of the promotion in ISO8601 date time format: yyyy-MM-dd'T'HH:mmZ
      * @param currency - The currency mnemonic specified for price. This parameter is effective only for product suggestions.
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type PromotionResult otherwise.
      * 
      */
  async getPromotionsForCampaign(options, rawResponse) {
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
    if (optionParams["campaignId"] !== void 0) {
      pathParams["campaignId"] = optionParams["campaignId"];
    } else if (configParams["campaignId"] !== void 0) {
      pathParams["campaignId"] = configParams["campaignId"];
    } else {
      throw new Error("Missing required path parameter: campaignId");
    }
    const queryParams = {};
    if (optionParams["siteId"] !== void 0) {
      queryParams["siteId"] = optionParams["siteId"];
    } else if (configParams["siteId"] !== void 0) {
      queryParams["siteId"] = configParams["siteId"];
    } else {
      throw new Error("Missing required query parameter: siteId");
    }
    if (optionParams["startDate"] !== void 0) {
      queryParams["startDate"] = optionParams["startDate"];
    } else if (configParams["startDate"] !== void 0) {
      queryParams["startDate"] = configParams["startDate"];
    }
    if (optionParams["endDate"] !== void 0) {
      queryParams["endDate"] = optionParams["endDate"];
    } else if (configParams["endDate"] !== void 0) {
      queryParams["endDate"] = configParams["endDate"];
    }
    if (optionParams["currency"] !== void 0) {
      queryParams["currency"] = optionParams["currency"];
    } else if (configParams["currency"] !== void 0) {
      queryParams["currency"] = configParams["currency"];
    }
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getPromotionsForCampaign: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/promotions/campaigns/{campaignId}",
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
ShopperPromotions.defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/pricing/shopper-promotions/{version}";
ShopperPromotions.apiPaths = {
  getPromotions: "/organizations/{organizationId}/promotions",
  getPromotionsForCampaign: "/organizations/{organizationId}/promotions/campaigns/{campaignId}"
};
ShopperPromotions.paramKeys = {
  getPromotions: [
    "organizationId",
    "siteId",
    "ids",
    "locale"
  ],
  getPromotionsRequired: [
    "organizationId",
    "siteId",
    "ids"
  ],
  getPromotionsForCampaign: [
    "organizationId",
    "campaignId",
    "siteId",
    "startDate",
    "endDate",
    "currency"
  ],
  getPromotionsForCampaignRequired: [
    "organizationId",
    "campaignId",
    "siteId"
  ]
};

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

// src/shopperSeo.ts
var ShopperSeo = class {
  constructor(config) {
    const cfg = { ...config };
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    this.clientConfig = new ClientConfig(cfg);
  }
  /**
      * Gets URL mapping information for a URL that a shopper clicked or typed in. The mapping information is based on URL rules and redirects set up in Business Manager. For more information about prerequisites and sample usage, see [URL Resolution](/docs/commerce/commerce-api/guide/url-resolution.html). You can customize the behavior of this endpoint by using hooks. See the hooks for getUrlMapping in the [Hook List](https://developer.salesforce.com/docs/commerce/commerce-api/guide/hook_list.html).
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param urlSegment - The part of the requested URL that comes after the domain name. For example, the urlSegment for "www.abc.com/blue/new-arrivals/tops" is "blue/new-arrivals/tops". There's no limit on the length of the urlSegment. However, for this endpoint, the maximum allowed length of the URL (after URL encoding) is 2047 characters. Make this field URL-encoded so that it properly handles special values such as whitespace. If a urlSegment includes a query string, a 404 error code is returned.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
  Please note that if no locale is specified, the default site locale will be used.
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type UrlMapping otherwise.
      * 
      */
  async getUrlMapping(options, rawResponse) {
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
    if (optionParams["urlSegment"] !== void 0) {
      queryParams["urlSegment"] = optionParams["urlSegment"];
    } else if (configParams["urlSegment"] !== void 0) {
      queryParams["urlSegment"] = configParams["urlSegment"];
    } else {
      throw new Error("Missing required query parameter: urlSegment");
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
    Object.keys(optionParams).forEach((key) => {
      if (key.startsWith("c_") && optionParams[key] !== void 0) {
        queryParams[key] = optionParams[key];
      } else if (!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
        console.warn(`Invalid Parameter for getUrlMapping: ${key}`);
      }
    });
    const url = new TemplateURL(
      "/organizations/{organizationId}/url-mapping",
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
ShopperSeo.defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/site/shopper-seo/{version}";
ShopperSeo.apiPaths = {
  getUrlMapping: "/organizations/{organizationId}/url-mapping"
};
ShopperSeo.paramKeys = {
  getUrlMapping: [
    "organizationId",
    "urlSegment",
    "siteId",
    "locale"
  ],
  getUrlMappingRequired: [
    "organizationId",
    "urlSegment",
    "siteId"
  ]
};

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

// src/helpers/index.ts
var helpers_exports = {};
__export(helpers_exports, {
  callCustomEndpoint: () => callCustomEndpoint,
  doFetch: () => doFetch,
  fetch: () => fetch,
  globalObject: () => globalObject,
  hasFetchAvailable: () => hasFetchAvailable,
  isBrowser: () => isBrowser
});

// src/config.ts
var CUSTOM_API_DEFAULT_BASE_URI = "https://{shortCode}.api.commercecloud.salesforce.com/custom/{apiName}/{apiVersion}";

// src/helpers/customApi.ts
var contentTypeHeaderExists = (headers) => {
  let foundHeader = false;
  if (headers) {
    foundHeader = Boolean(
      Object.keys(headers).find((key) => key.toLowerCase() === "content-type")
    );
  }
  return foundHeader;
};
var callCustomEndpoint = async (args) => {
  const { options, clientConfig, rawResponse } = args;
  const requiredArgs = [
    "apiName",
    "endpointPath",
    "organizationId",
    "shortCode"
  ];
  const pathParams = {
    ...clientConfig.parameters,
    ...options?.customApiPathParameters
  };
  requiredArgs.forEach((arg) => {
    if (!pathParams[arg]) {
      throw new Error(
        `Missing required property needed in options.customApiPathParameters or clientConfig.parameters: ${arg}`
      );
    }
  });
  if (!pathParams.apiVersion) {
    pathParams.apiVersion = "v1";
  }
  let clientConfigCopy = clientConfig;
  if (!clientConfig.baseUri) {
    clientConfigCopy = {
      ...clientConfig,
      baseUri: CUSTOM_API_DEFAULT_BASE_URI
    };
  }
  const useSiteId = Boolean(
    !options.parameters?.siteId && clientConfig?.parameters?.siteId
  );
  const contentTypeExists = contentTypeHeaderExists(options.headers) || contentTypeHeaderExists(clientConfigCopy.headers);
  let optionsCopy = options;
  if (!contentTypeExists || useSiteId) {
    optionsCopy = {
      ...options,
      headers: {
        ...options.headers,
        // If Content-Type header does not exist, we default to "Content-Type": "application/json"
        ...!contentTypeExists && { "Content-Type": "application/json" }
      },
      parameters: {
        ...options.parameters,
        ...useSiteId && { siteId: clientConfig.parameters.siteId }
      }
    };
  }
  const url = new TemplateURL(
    "/organizations/{organizationId}/{endpointPath}",
    clientConfigCopy.baseUri,
    {
      pathParams,
      queryParams: optionsCopy.parameters,
      origin: clientConfigCopy.proxy
    }
  );
  return doFetch(url.toString(), optionsCopy, clientConfigCopy, rawResponse);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClientConfig,
  ShopperBaskets,
  ShopperContexts,
  ShopperCustomers,
  ShopperDiscoverySearch,
  ShopperExperience,
  ShopperGiftCertificates,
  ShopperLogin,
  ShopperOrders,
  ShopperProducts,
  ShopperPromotions,
  ShopperSearch,
  ShopperSeo,
  ShopperStores,
  TemplateURL,
  helpers
});
//# sourceMappingURL=index.js.map
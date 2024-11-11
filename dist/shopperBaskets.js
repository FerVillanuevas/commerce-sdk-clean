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

// src/shopperBaskets.ts
var shopperBaskets_exports = {};
__export(shopperBaskets_exports, {
  ShopperBaskets: () => ShopperBaskets
});
module.exports = __toCommonJS(shopperBaskets_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ShopperBaskets
});
//# sourceMappingURL=shopperBaskets.js.map
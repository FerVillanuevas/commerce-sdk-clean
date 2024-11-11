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
module.exports = __toCommonJS(helpers_exports);

// src/config.ts
var CUSTOM_API_DEFAULT_BASE_URI = "https://{shortCode}.api.commercecloud.salesforce.com/custom/{apiName}/{apiVersion}";

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

// src/responseError.ts
var ResponseError = class extends Error {
  constructor(response) {
    super(`${response.status} ${response.statusText}`);
    this.response = response;
  }
};

// src/helpers/environment.ts
var isBrowser = typeof window === "object" && typeof window.document === "object";
var globalObject = isBrowser ? window : globalThis;
var hasFetchAvailable = typeof globalObject.fetch === "function";
var fetch = (() => {
  return globalObject.fetch;
})();

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
  callCustomEndpoint,
  doFetch,
  fetch,
  globalObject,
  hasFetchAvailable,
  isBrowser
});
//# sourceMappingURL=index.js.map
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

// src/clientConfig.ts
var clientConfig_exports = {};
__export(clientConfig_exports, {
  default: () => ClientConfig
});
module.exports = __toCommonJS(clientConfig_exports);
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
//# sourceMappingURL=clientConfig.js.map
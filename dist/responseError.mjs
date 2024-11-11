// src/responseError.ts
var ResponseError = class extends Error {
  constructor(response) {
    super(`${response.status} ${response.statusText}`);
    this.response = response;
  }
};
export {
  ResponseError as default
};
//# sourceMappingURL=responseError.mjs.map
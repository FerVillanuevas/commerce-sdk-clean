// src/helpers/environment.ts
var isBrowser = typeof window === "object" && typeof window.document === "object";
var globalObject = isBrowser ? window : globalThis;
var hasFetchAvailable = typeof globalObject.fetch === "function";
var fetch = (() => {
  return globalObject.fetch;
})();
export {
  fetch,
  globalObject,
  hasFetchAvailable,
  isBrowser
};
//# sourceMappingURL=environment.mjs.map
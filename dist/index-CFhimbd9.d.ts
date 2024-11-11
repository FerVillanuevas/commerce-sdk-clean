import { CustomParams, callCustomEndpoint } from './helpers/customApi.js';
import { fetch, globalObject, hasFetchAvailable, isBrowser } from './helpers/environment.js';
import { doFetch } from './helpers/fetchHelper.js';
import { BaseUriParameters, CompositeParameters, PathParameters, QueryParameters, RequireParametersUnlessAllAreOptional, UrlParameters } from './helpers/types.js';

declare const index_BaseUriParameters: typeof BaseUriParameters;
declare const index_CompositeParameters: typeof CompositeParameters;
declare const index_CustomParams: typeof CustomParams;
declare const index_PathParameters: typeof PathParameters;
declare const index_QueryParameters: typeof QueryParameters;
declare const index_RequireParametersUnlessAllAreOptional: typeof RequireParametersUnlessAllAreOptional;
declare const index_UrlParameters: typeof UrlParameters;
declare const index_callCustomEndpoint: typeof callCustomEndpoint;
declare const index_doFetch: typeof doFetch;
declare const index_fetch: typeof fetch;
declare const index_globalObject: typeof globalObject;
declare const index_hasFetchAvailable: typeof hasFetchAvailable;
declare const index_isBrowser: typeof isBrowser;
declare namespace index {
  export { index_BaseUriParameters as BaseUriParameters, index_CompositeParameters as CompositeParameters, index_CustomParams as CustomParams, index_PathParameters as PathParameters, index_QueryParameters as QueryParameters, index_RequireParametersUnlessAllAreOptional as RequireParametersUnlessAllAreOptional, index_UrlParameters as UrlParameters, index_callCustomEndpoint as callCustomEndpoint, index_doFetch as doFetch, index_fetch as fetch, index_globalObject as globalObject, index_hasFetchAvailable as hasFetchAvailable, index_isBrowser as isBrowser };
}

export { index as i };

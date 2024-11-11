import { FetchFunction } from '../clientConfig.mjs';
import './types.mjs';

declare const isBrowser: boolean;
declare const globalObject: typeof globalThis;
declare const hasFetchAvailable: boolean;
declare const fetch: FetchFunction;

export { fetch, globalObject, hasFetchAvailable, isBrowser };

import { FetchFunction } from '../clientConfig.js';
import './types.js';

declare const isBrowser: boolean;
declare const globalObject: typeof globalThis;
declare const hasFetchAvailable: boolean;
declare const fetch: FetchFunction;

export { fetch, globalObject, hasFetchAvailable, isBrowser };

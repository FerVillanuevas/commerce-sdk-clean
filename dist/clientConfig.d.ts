import { BaseUriParameters } from './helpers/types.js';

/**
 * Alias for `RequestInit` from TypeScript's DOM lib, to more clearly differentiate
 * it from the `RequestInit` provided by node-fetch.
 */
type BrowserRequestInit = RequestInit;
/**
 * Any properties supported in either the browser or node are accepted.
 * Using the right properties in the right context is left to the user.
 */
type FetchOptions = BrowserRequestInit;
/**
 * Base options that can be passed to the `ClientConfig` class.
 */
interface ClientConfigInit<Params extends BaseUriParameters> {
    baseUri?: string;
    proxy?: string;
    headers?: {
        [key: string]: string;
    };
    parameters: Params;
    fetchOptions?: FetchOptions;
    transformRequest?: (data: unknown, headers: {
        [key: string]: string;
    }) => Required<FetchOptions>['body'];
    throwOnBadResponse?: boolean;
}
type FetchFunction = (input: RequestInfo, init?: FetchOptions | undefined) => Promise<Response>;
/**
 * Configuration parameters common to Commerce SDK clients
 */
declare class ClientConfig<Params extends BaseUriParameters> implements ClientConfigInit<Params> {
    baseUri?: string;
    proxy?: string;
    headers: {
        [key: string]: string;
    };
    parameters: Params;
    fetchOptions: FetchOptions;
    transformRequest: NonNullable<ClientConfigInit<Params>['transformRequest']>;
    throwOnBadResponse: boolean;
    constructor(config: ClientConfigInit<Params>);
    static readonly defaults: Pick<Required<ClientConfigInit<never>>, 'transformRequest'>;
}

export { type ClientConfigInit, type FetchFunction, type FetchOptions, ClientConfig as default };

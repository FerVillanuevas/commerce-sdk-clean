import { ClientConfigInit } from '../clientConfig.js';
import { BaseUriParameters } from './types.js';

/**
 * A wrapper function around fetch designed for making requests using the SDK
 * @param url - The url of the resource that you wish to fetch
 * @param options? - An object containing any custom settings you want to apply to the request
 * @param options.method? - The request HTTP operation. 'GET' is the default if no method is provided.
 * @param options.headers? - Headers that are added to the request. Authorization header should be in this argument or in the clientConfig.headers
 * @param options.body? - Body that is used for the request
 * @param clientConfig? - Client Configuration object used by the SDK with properties that can affect the fetch call
 * @param clientConfig.headers? - Additional headers that are added to the request. Authorization header should be in this argument or in the options?.headers. options?.headers will override any duplicate properties.
 * @param clientConfig.fetchOptions? - fetchOptions that are passed onto the fetch request
 * @param clientConfig.throwOnBadResponse? - flag that when set true will throw a response error if the fetch request fails
 * @param rawResponse? - Flag to return the raw response from the fetch call. True for raw response object, false for the data from the response
 * @returns Raw response or data from response based on rawResponse argument from fetch call
 */
declare const doFetch: <Params extends BaseUriParameters>(url: string, options?: {
    method?: string;
    headers?: {
        authorization?: string;
    } & {
        [key: string]: string;
    };
    body?: BodyInit | globalThis.BodyInit | unknown;
}, clientConfig?: ClientConfigInit<Params>, rawResponse?: boolean) => Promise<Response | unknown>;

export { doFetch };

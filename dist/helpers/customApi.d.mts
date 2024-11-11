import { ClientConfigInit } from '../clientConfig.mjs';
import './types.mjs';

interface CustomParams {
    apiName?: string;
    apiVersion?: string;
    endpointPath?: string;
    organizationId?: string;
    shortCode: string;
    [key: string]: unknown;
}
/**
 * A helper function designed to make calls to a custom API endpoint
 * For more information about custom APIs, please refer to the [API documentation](https://developer.salesforce.com/docs/commerce/commerce-api/guide/custom-apis.html)
 * @param args - Argument object containing data used for custom API request
 * @param args.options - An object containing any custom settings you want to apply to the request
 * @param args.options.method? - The request HTTP operation. 'GET' is the default if no method is provided.
 * @param args.options.parameters? - Query parameters that are added to the request
 * @param args.options.customApiPathParameters? - Path parameters used for custom API. Required path parameters (apiName, endpointPath, organizationId, and shortCode) can be in this object, or args.clientConfig.parameters. apiVersion is defaulted to 'v1' if not provided.
 * @param args.options.headers? - Headers that are added to the request. Authorization header should be in this parameter or in the clientConfig.headers. If "Content-Type" is not provided in either header, it will be defaulted to "application/json".
 * @param args.options.body? - Body that is used for the request
 * @param args.clientConfig - Client Configuration object used by the SDK with properties that can affect the fetch call
 * @param args.clientConfig.parameters - Path parameters used for custom API endpoints. The required properties are: apiName, endpointPath, organizationId, and shortCode. An error will be thrown if these are not provided.
 * @param args.clientConfig.headers? - Additional headers that are added to the request. Authorization header should be in this argument or in the options?.headers. options?.headers will override any duplicate properties. If "Content-Type" is not provided in either header, it will be defaulted to "application/json".
 * @param args.clientConfig.baseUri? - baseUri used for the request, where the path parameters are wrapped in curly braces. Default value is 'https://{shortCode}.api.commercecloud.salesforce.com/custom/{apiName}/{apiVersion}'
 * @param args.clientConfig.fetchOptions? - fetchOptions that are passed onto the fetch request
 * @param args.clientConfig.throwOnBadResponse? - flag that when set true will throw a response error if the fetch request fails (returns with a status code outside the range of 200-299 or 304 redirect)
 * @param args.clientConfig.proxy? - Routes API calls through a proxy when set
 * @param args.rawResponse? - Flag to return the raw response from the fetch call. True for raw response object, false for the data from the response
 * @returns Raw response or data from response based on rawResponse argument from fetch call
 */
declare const callCustomEndpoint: (args: {
    options: {
        method?: string;
        parameters?: {
            [key: string]: string | number | boolean | string[] | number[];
        };
        customApiPathParameters?: {
            apiName?: string;
            apiVersion?: string;
            endpointPath?: string;
            organizationId?: string;
            shortCode?: string;
        };
        headers?: {
            authorization?: string;
        } & {
            [key: string]: string;
        };
        body?: BodyInit | globalThis.BodyInit | unknown;
    };
    clientConfig: ClientConfigInit<CustomParams>;
    rawResponse?: boolean;
}) => Promise<Response | unknown>;

export { type CustomParams, callCustomEndpoint };

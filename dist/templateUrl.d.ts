import { PathParameters, QueryParameters } from './helpers/types.js';

declare class TemplateURL extends URL {
    /**
     * @param url -
     * @param base -
     */
    constructor(url: string, base: string, parameters?: {
        pathParams?: PathParameters;
        queryParams?: QueryParameters;
        origin?: string;
    });
    /**
     * Replace the origin (protocol/host) portion of the URL with a new origin.
     * The path portion is retained and concatenated with any path included in the
     * new origin. Thee primary use of this function is to use a proxy.
     *
     * @param newOriginString - The new origin to substitute (ex: https://example.com)
     */
    replaceOrigin(newOriginString: string): void;
    /**
     * Add append an object literal of query parameters to the URL object. SCAPI expects
     * Arrays to be comma separated where \{ a: ["1", "2"] \} becomes ?a=1,2.
     * The 'refine' query parameter is an exception, where SCAPI expects the the "repeat"
     * convention where \{ refine: ["1", "2"] \} becomes "?refine=1&refine=2"
     */
    addQueryParams(queryParams?: QueryParameters): void;
    /**
     * Replace bracketed URL template parameters with values from parameters object
     *
     * @param template - The URL template string to make substitutions in
     * @param parameters - The object literal that provides the values to substitute
     *
     * @returns String URL with substitutions made
     */
    static renderTemplateUri(template: string, parameters?: PathParameters): string;
}

export { TemplateURL as default };

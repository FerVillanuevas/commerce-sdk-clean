/**
 * Extends the Error class with the the error being a combination of status code
 * and text retrieved from the response.
 *
 * @class ResponseError
 * @extends Error
 */
declare class ResponseError extends Error {
    response: Response;
    constructor(response: Response);
}

export { ResponseError as default };

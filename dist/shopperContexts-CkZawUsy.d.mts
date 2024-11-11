import ClientConfig, { ClientConfigInit } from './clientConfig.mjs';
import { BaseUriParameters, RequireParametersUnlessAllAreOptional, CompositeParameters } from './helpers/types.mjs';

type ShopperContext = {
    effectiveDateTime?: any;
    sourceCode?: any;
    customerGroupIds?: Array<string>;
    customQualifiers?: {} & {
        [key: string]: any;
    };
    assignmentQualifiers?: {} & {
        [key: string]: any;
    };
    clientIp?: string;
    geoLocation?: {
        city?: string;
        country?: string;
        countryCode?: string;
        latitude?: number;
        longitude?: number;
        metroCode?: string;
        postalCode?: string;
        region?: string;
        regionCode?: string;
    } & {
        [key: string]: any;
    };
} & {
    [key: string]: any;
};
type ErrorResponse = {
    type: string;
    title?: string;
    detail?: string;
    instance?: string;
} & {
    [key: string]: any;
};
type ChangeControlled = {
    creationDate?: any;
    modificationDate?: any;
    createdBy?: string;
    lastModifiedBy?: string;
} & {
    [key: string]: any;
};
type RangeFilter = {
    [key: string]: any;
};
type ChangeControlledDataType = {
    creationDate?: any;
    modificationDate?: any;
    createdBy?: string;
    lastModifiedBy?: string;
} & {
    [key: string]: any;
};
type Error = {
    type: string;
    title?: string;
    detail?: string;
    instance?: string;
} & {
    [key: string]: any;
};
type Money = {
    currencyMnemonic?: string;
    value?: number;
} & {
    [key: string]: any;
};
type SimpleSearchResult = {
    limit: number;
    hits?: Array<object>;
    offset: any;
    total: any;
} & {
    [key: string]: any;
};
type SearchRequest = {
    limit?: number;
    query: Query;
    sorts?: Array<Sort>;
    offset?: any;
} & {
    [key: string]: any;
};
type PropertyDefinition = {
    defaultValue?: PropertyValueDefinition;
    id?: string;
    name: L10nString;
    description: L10nString;
    key?: boolean;
    localizable?: boolean;
    mandatory?: boolean;
    max?: number;
    minLength?: number;
    min?: number;
    multiValueType?: boolean;
    regularExpression?: string;
    scale?: number;
    searchable?: boolean;
    siteSpecific?: boolean;
    system?: boolean;
    unit?: L10nString;
    possibleValues?: Array<PropertyValueDefinition>;
    type: string;
    visible?: boolean;
} & {
    [key: string]: any;
};
type LocalizedString = {} & {
    [key: string]: any;
};
type PaginatedSearchResult = {
    query: Query;
    sorts?: Array<Sort>;
    limit: number;
    hits?: Array<object>;
    offset: any;
    total: any;
} & {
    [key: string]: any;
};
type ClosedObject = {} & {
    [key: string]: any;
};
type OpenObject = {} & {
    [key: string]: any;
};
type NoPropertiesAllowed = {};
type SpecifiedPropertiesAllowed = {} & {
    [key: string]: any;
};
type BoolFilter = {
    filters?: Array<Filter>;
    operator: string;
} & {
    [key: string]: any;
};
type PaginatedSearchResultBase = {
    query: Query;
    sorts?: Array<Sort>;
    limit: number;
    hits?: Array<object>;
    offset: any;
    total: any;
} & {
    [key: string]: any;
};
type MatchAllQuery = {} & {
    [key: string]: any;
};
type FilteredQuery = {
    filter: Filter;
    query: Query;
} & {
    [key: string]: any;
};
type QueryFilter = {
    query: Query;
} & {
    [key: string]: any;
};
type Query = {
    boolQuery?: BoolQuery;
    filteredQuery?: FilteredQuery;
    matchAllQuery?: MatchAllQuery;
    nestedQuery?: NestedQuery;
    termQuery?: TermQuery;
    textQuery?: TextQuery;
} & {
    [key: string]: any;
};
type TermQuery = {
    fields: Array<string>;
    operator: string;
    values?: Array<any>;
} & {
    [key: string]: any;
};
type TermFilter = {
    field: string;
    operator: string;
    values?: Array<any>;
} & {
    [key: string]: any;
};
type TextQuery = {
    fields: Array<string>;
    searchPhrase: string;
} & {
    [key: string]: any;
};
type Range2Filter = {
    filterMode?: string;
    fromField: string;
    fromInclusive?: boolean;
    fromValue?: any;
    toField: string;
    toInclusive?: boolean;
    toValue?: any;
} & {
    [key: string]: any;
};
type BoolQuery = {
    must?: Array<Query>;
    mustNot?: Array<Query>;
    should?: Array<Query>;
} & {
    [key: string]: any;
};
type SimpleSearchResultBase = {
    limit: number;
    hits?: Array<object>;
    offset: any;
    total: any;
} & {
    [key: string]: any;
};
type NestedQuery = {
    path: string;
    query: Query;
    scoreMode?: string;
} & {
    [key: string]: any;
};
type Filter = {
    boolFilter?: BoolFilter;
    queryFilter?: QueryFilter;
    range2Filter?: Range2Filter;
    rangeFilter?: RangeFilter;
    termFilter?: TermFilter;
} & {
    [key: string]: any;
};
type Sort = {
    field: string;
    sortOrder?: string;
} & {
    [key: string]: any;
};
type SearchRequestBase = {
    limit?: number;
    query: Query;
    sorts?: Array<Sort>;
    offset?: any;
} & {
    [key: string]: any;
};
type MoneyMnemonic = {
    currencyMnemonic?: string;
    value?: number;
} & {
    [key: string]: any;
};
type L10nString = {} & {
    [key: string]: any;
};
type AttributeDefinition = {
    defaultValue?: PropertyValueDefinition;
    id?: string;
    name: L10nString;
    description: L10nString;
    key?: boolean;
    localizable?: boolean;
    mandatory?: boolean;
    max?: number;
    minLength?: number;
    min?: number;
    multiValueType?: boolean;
    regularExpression?: string;
    scale?: number;
    searchable?: boolean;
    siteSpecific?: boolean;
    system?: boolean;
    unit?: L10nString;
    possibleValues?: Array<PropertyValueDefinition>;
    type: string;
    visible?: boolean;
};
type PropertyValueDefinition = {
    description: L10nString;
    displayValue: L10nString;
    id: string;
    position?: number;
    value: string;
};
/**
 * All path parameters that are used by at least one ShopperContexts method.
 */
type ShopperContextsPathParameters = {
    organizationId?: string;
    usid?: string;
};
/**
 * All query parameters that are used by at least one ShopperContexts method.
 */
type ShopperContextsQueryParameters = {
    siteId?: string;
    evaluateContextWithClientIp?: boolean;
};
/**
 * All parameters that are used by ShopperContexts.
 */
type ShopperContextsParameters = ShopperContextsPathParameters & BaseUriParameters & ShopperContextsQueryParameters;
/**
* [Shopper Context](https://developer.salesforce.com/docs/commerce/commerce-api/references?meta=shopper-context:Summary)
* ==================================
*
* *The Shopper Context API enables developers to build highly contextualized shopping experiences for shoppers.*<br />
*
* Simple example:
*
* ```typescript
*   import { ShopperContexts } from "commerce-sdk-isomorphic";
*
*   const clientConfig = {
*     parameters: {
*       clientId: "XXXXXX",
*       organizationId: "XXXX",
*       shortCode: "XXX",
*       siteId: "XX"
*     }
*   };
*   const shopperContextsClient = new ShopperContexts(clientConfig);
* ```
*
* <span style="font-size:.7em; display:block; text-align: right">
* API Version: 0.0.29<br />
* Last Updated: <br />
* </span>
*
*
*/
declare class ShopperContexts<ConfigParameters extends ShopperContextsParameters & Record<string, unknown>> {
    clientConfig: ClientConfig<ConfigParameters> & {
        baseUri: string;
    };
    static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/shopper/shopper-context/{version}";
    static readonly apiPaths: {
        getShopperContext: string;
        createShopperContext: string;
        deleteShopperContext: string;
        updateShopperContext: string;
    };
    constructor(config: ClientConfigInit<ConfigParameters>);
    static readonly paramKeys: {
        readonly getShopperContext: readonly ["organizationId", "usid", "siteId"];
        readonly getShopperContextRequired: readonly ["organizationId", "usid"];
        readonly createShopperContext: readonly ["organizationId", "usid", "siteId", "evaluateContextWithClientIp"];
        readonly createShopperContextRequired: readonly ["organizationId", "usid"];
        readonly deleteShopperContext: readonly ["organizationId", "usid", "siteId"];
        readonly deleteShopperContextRequired: readonly ["organizationId", "usid"];
        readonly updateShopperContext: readonly ["organizationId", "usid", "siteId", "evaluateContextWithClientIp"];
        readonly updateShopperContextRequired: readonly ["organizationId", "usid"];
    };
    /**
    * Gets the shopper's context based on the shopperJWT.

With B2C Commerce release 24.5, all endpoints in the Shopper context API will require the `siteId` parameter for new customers. This field is marked as optional for backward compatibility and will be changed to mandatory tentatively by January 2025.
    *
    * If you would like to get a raw Response object use the other getShopperContext function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param usid - The Shopper's unique identifier. It is a required parameter and is part of the response from the Guest or Registered User Shopper Login (SLAS) API call.
    * @param siteId - The identifier of the site to which the request is being sent. With B2C Commerce release 24.5, all new implementations of Shopper Context require the `siteId` query parameter to be passed. Existing customers with Shopper Context implementations should start including `siteId` going forward. Starting January 2025, `siteId` will be required for all customers, and a bad request response code will be returned for requests without a `siteId`.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type ShopperContext.
    *
    */
    getShopperContext(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            usid: string;
            siteId?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<ShopperContext>;
    /**
    * Gets the shopper's context based on the shopperJWT.

With B2C Commerce release 24.5, all endpoints in the Shopper context API will require the `siteId` parameter for new customers. This field is marked as optional for backward compatibility and will be changed to mandatory tentatively by January 2025.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param usid - The Shopper's unique identifier. It is a required parameter and is part of the response from the Guest or Registered User Shopper Login (SLAS) API call.
    * @param siteId - The identifier of the site to which the request is being sent. With B2C Commerce release 24.5, all new implementations of Shopper Context require the `siteId` query parameter to be passed. Existing customers with Shopper Context implementations should start including `siteId` going forward. Starting January 2025, `siteId` will be required for all customers, and a bad request response code will be returned for requests without a `siteId`.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type ShopperContext otherwise.
    *
    */
    getShopperContext<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            usid: string;
            siteId?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : ShopperContext>;
    /**
    * Creates the shopper's context based on shopperJWT.

With B2C Commerce release 24.5, all endpoints in the Shopper context API will require the `siteId` parameter for new customers. This field is marked as optional for backward compatibility and will be changed to mandatory tentatively by January 2025.
    *
    * If you would like to get a raw Response object use the other createShopperContext function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param usid - The Shopper's unique identifier. It is a required parameter and is part of the response from the Guest or Registered User Shopper Login (SLAS) API call.
    * @param siteId - The identifier of the site to which the request is being sent. With B2C Commerce release 24.5, all new implementations of Shopper Context require the `siteId` query parameter to be passed. Existing customers with Shopper Context implementations should start including `siteId` going forward. Starting July 31 2024, `siteId` will be required for all customers, and a bad request response code will be returned for requests without a `siteId`.
    * @param evaluateContextWithClientIp - Determines whether to evaluate the context using the provided `clientIp`. This property is available with B2C Commerce version 24.7.
- If `evaluateContextWithClientIp` is set to `true`:
  - The `clientIp` is saved and used in subsequent requests.

- If `evaluateContextWithClientIp` is set to `false`:
  - The `clientIp` is not saved and will not be used in subsequent requests.

    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type void | void.
    *
    */
    createShopperContext(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            usid: string;
            siteId?: string;
            evaluateContextWithClientIp?: boolean;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: ShopperContext;
    }>): Promise<void | void>;
    /**
    * Creates the shopper's context based on shopperJWT.

With B2C Commerce release 24.5, all endpoints in the Shopper context API will require the `siteId` parameter for new customers. This field is marked as optional for backward compatibility and will be changed to mandatory tentatively by January 2025.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param usid - The Shopper's unique identifier. It is a required parameter and is part of the response from the Guest or Registered User Shopper Login (SLAS) API call.
    * @param siteId - The identifier of the site to which the request is being sent. With B2C Commerce release 24.5, all new implementations of Shopper Context require the `siteId` query parameter to be passed. Existing customers with Shopper Context implementations should start including `siteId` going forward. Starting July 31 2024, `siteId` will be required for all customers, and a bad request response code will be returned for requests without a `siteId`.
    * @param evaluateContextWithClientIp - Determines whether to evaluate the context using the provided `clientIp`. This property is available with B2C Commerce version 24.7.
- If `evaluateContextWithClientIp` is set to `true`:
  - The `clientIp` is saved and used in subsequent requests.

- If `evaluateContextWithClientIp` is set to `false`:
  - The `clientIp` is not saved and will not be used in subsequent requests.

    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type void | void otherwise.
    *
    */
    createShopperContext<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            usid: string;
            siteId?: string;
            evaluateContextWithClientIp?: boolean;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: ShopperContext;
    }>, rawResponse?: T): Promise<T extends true ? Response : void | void>;
    /**
    * Gets the shopper's context based on the shopperJWT.

With B2C Commerce release 24.5, all endpoints in the Shopper context API will require the `siteId` parameter for new customers. This field is marked as optional for backward compatibility and will be changed to mandatory tentatively by January 2025.
    *
    * If you would like to get a raw Response object use the other deleteShopperContext function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param usid - The Shopper's unique identifier. It is a required parameter and is part of the response from the Guest or Registered User Shopper Login (SLAS) API call.
    * @param siteId - The identifier of the site to which the request is being sent. With B2C Commerce release 24.5, all new implementations of Shopper Context require the `siteId` query parameter to be passed. Existing customers with Shopper Context implementations should start including `siteId` going forward. Starting July 31 2024, `siteId` will be required for all customers, and a bad request response code will be returned for requests without a `siteId`.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type void.
    *
    */
    deleteShopperContext(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            usid: string;
            siteId?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<void>;
    /**
    * Gets the shopper's context based on the shopperJWT.

With B2C Commerce release 24.5, all endpoints in the Shopper context API will require the `siteId` parameter for new customers. This field is marked as optional for backward compatibility and will be changed to mandatory tentatively by January 2025.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param usid - The Shopper's unique identifier. It is a required parameter and is part of the response from the Guest or Registered User Shopper Login (SLAS) API call.
    * @param siteId - The identifier of the site to which the request is being sent. With B2C Commerce release 24.5, all new implementations of Shopper Context require the `siteId` query parameter to be passed. Existing customers with Shopper Context implementations should start including `siteId` going forward. Starting July 31 2024, `siteId` will be required for all customers, and a bad request response code will be returned for requests without a `siteId`.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
    *
    */
    deleteShopperContext<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            usid: string;
            siteId?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : void>;
    /**
    * Updates the shopper's context based on the Shopper JWT. If the shopper context exists, it's updated with the patch body. If a `custom qualifier/assignment qualifer` or an `effectiveDateTime` or a `sourceCode` or a `customerGroupIds` is already present in the existing shopper context, its value is replaced by the corresponding value from the patch body. If a `custom qualifers'` or a `assignment qualifiers'` value is set to `null`, it's deleted from existing shopper context. If `effectiveDateTime` or `sourceCode` value is set to an empty string (\"\"), it's deleted from existing shopper context. If `effectiveDateTime` or `sourceCode` value is set to `null`, it's ignored. If an `effectiveDateTime` or `sourceCode` or `custom/assignment qualifiiers'` value is new, it's added to the existing Shopper context. If `customerGroupIds` is set to empty array `[]` the existing value in shopper context is deleted.

With B2C Commerce release 24.5, all endpoints in the Shopper context API will require the `siteId` parameter for new customers. This field is marked as optional for backward compatibility and will be changed to mandatory tentatively by January 2025.
    *
    * If you would like to get a raw Response object use the other updateShopperContext function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param usid - The Shopper's unique identifier. It is a required parameter and is part of the response from the Guest or Registered User Shopper Login (SLAS) API call.
    * @param siteId - The identifier of the site to which the request is being sent. With B2C Commerce release 24.5, all new implementations of Shopper Context require the `siteId` query parameter to be passed. Existing customers with Shopper Context implementations should start including `siteId` going forward. Starting July 31 2024, `siteId` will be required for all customers, and a bad request response code will be returned for requests without a `siteId`.
    * @param evaluateContextWithClientIp - Determines whether to evaluate the context using the provided `clientIp`.  This property is available with B2C Commerce version 24.7.
- If `evaluateContextWithClientIp` is set to `true`:
  - The `clientIP` is saved and used in subsequent requests.

- If `evaluateContextWithClientIp` is set to `false`:
  - The `clientIP` is not saved and will not be used in subsequent requests.

    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type ShopperContext.
    *
    */
    updateShopperContext(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            usid: string;
            siteId?: string;
            evaluateContextWithClientIp?: boolean;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: ShopperContext;
    }>): Promise<ShopperContext>;
    /**
    * Updates the shopper's context based on the Shopper JWT. If the shopper context exists, it's updated with the patch body. If a `custom qualifier/assignment qualifer` or an `effectiveDateTime` or a `sourceCode` or a `customerGroupIds` is already present in the existing shopper context, its value is replaced by the corresponding value from the patch body. If a `custom qualifers'` or a `assignment qualifiers'` value is set to `null`, it's deleted from existing shopper context. If `effectiveDateTime` or `sourceCode` value is set to an empty string (\"\"), it's deleted from existing shopper context. If `effectiveDateTime` or `sourceCode` value is set to `null`, it's ignored. If an `effectiveDateTime` or `sourceCode` or `custom/assignment qualifiiers'` value is new, it's added to the existing Shopper context. If `customerGroupIds` is set to empty array `[]` the existing value in shopper context is deleted.

With B2C Commerce release 24.5, all endpoints in the Shopper context API will require the `siteId` parameter for new customers. This field is marked as optional for backward compatibility and will be changed to mandatory tentatively by January 2025.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param usid - The Shopper's unique identifier. It is a required parameter and is part of the response from the Guest or Registered User Shopper Login (SLAS) API call.
    * @param siteId - The identifier of the site to which the request is being sent. With B2C Commerce release 24.5, all new implementations of Shopper Context require the `siteId` query parameter to be passed. Existing customers with Shopper Context implementations should start including `siteId` going forward. Starting July 31 2024, `siteId` will be required for all customers, and a bad request response code will be returned for requests without a `siteId`.
    * @param evaluateContextWithClientIp - Determines whether to evaluate the context using the provided `clientIp`.  This property is available with B2C Commerce version 24.7.
- If `evaluateContextWithClientIp` is set to `true`:
  - The `clientIP` is saved and used in subsequent requests.

- If `evaluateContextWithClientIp` is set to `false`:
  - The `clientIP` is not saved and will not be used in subsequent requests.

    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type ShopperContext otherwise.
    *
    */
    updateShopperContext<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            usid: string;
            siteId?: string;
            evaluateContextWithClientIp?: boolean;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: ShopperContext;
    }>, rawResponse?: T): Promise<T extends true ? Response : ShopperContext>;
}

type shopperContexts_AttributeDefinition = AttributeDefinition;
type shopperContexts_BoolFilter = BoolFilter;
type shopperContexts_BoolQuery = BoolQuery;
type shopperContexts_ChangeControlled = ChangeControlled;
type shopperContexts_ChangeControlledDataType = ChangeControlledDataType;
type shopperContexts_ClosedObject = ClosedObject;
type shopperContexts_Error = Error;
type shopperContexts_ErrorResponse = ErrorResponse;
type shopperContexts_Filter = Filter;
type shopperContexts_FilteredQuery = FilteredQuery;
type shopperContexts_L10nString = L10nString;
type shopperContexts_LocalizedString = LocalizedString;
type shopperContexts_MatchAllQuery = MatchAllQuery;
type shopperContexts_Money = Money;
type shopperContexts_MoneyMnemonic = MoneyMnemonic;
type shopperContexts_NestedQuery = NestedQuery;
type shopperContexts_NoPropertiesAllowed = NoPropertiesAllowed;
type shopperContexts_OpenObject = OpenObject;
type shopperContexts_PaginatedSearchResult = PaginatedSearchResult;
type shopperContexts_PaginatedSearchResultBase = PaginatedSearchResultBase;
type shopperContexts_PropertyDefinition = PropertyDefinition;
type shopperContexts_PropertyValueDefinition = PropertyValueDefinition;
type shopperContexts_Query = Query;
type shopperContexts_QueryFilter = QueryFilter;
type shopperContexts_Range2Filter = Range2Filter;
type shopperContexts_SearchRequest = SearchRequest;
type shopperContexts_SearchRequestBase = SearchRequestBase;
type shopperContexts_ShopperContext = ShopperContext;
type shopperContexts_ShopperContexts<ConfigParameters extends ShopperContextsParameters & Record<string, unknown>> = ShopperContexts<ConfigParameters>;
declare const shopperContexts_ShopperContexts: typeof ShopperContexts;
type shopperContexts_ShopperContextsParameters = ShopperContextsParameters;
type shopperContexts_ShopperContextsPathParameters = ShopperContextsPathParameters;
type shopperContexts_ShopperContextsQueryParameters = ShopperContextsQueryParameters;
type shopperContexts_SimpleSearchResult = SimpleSearchResult;
type shopperContexts_SimpleSearchResultBase = SimpleSearchResultBase;
type shopperContexts_Sort = Sort;
type shopperContexts_SpecifiedPropertiesAllowed = SpecifiedPropertiesAllowed;
type shopperContexts_TermFilter = TermFilter;
type shopperContexts_TermQuery = TermQuery;
type shopperContexts_TextQuery = TextQuery;
declare namespace shopperContexts {
  export { type shopperContexts_AttributeDefinition as AttributeDefinition, type shopperContexts_BoolFilter as BoolFilter, type shopperContexts_BoolQuery as BoolQuery, type shopperContexts_ChangeControlled as ChangeControlled, type shopperContexts_ChangeControlledDataType as ChangeControlledDataType, type shopperContexts_ClosedObject as ClosedObject, type shopperContexts_Error as Error, type shopperContexts_ErrorResponse as ErrorResponse, type shopperContexts_Filter as Filter, type shopperContexts_FilteredQuery as FilteredQuery, type shopperContexts_L10nString as L10nString, type shopperContexts_LocalizedString as LocalizedString, type shopperContexts_MatchAllQuery as MatchAllQuery, type shopperContexts_Money as Money, type shopperContexts_MoneyMnemonic as MoneyMnemonic, type shopperContexts_NestedQuery as NestedQuery, type shopperContexts_NoPropertiesAllowed as NoPropertiesAllowed, type shopperContexts_OpenObject as OpenObject, type shopperContexts_PaginatedSearchResult as PaginatedSearchResult, type shopperContexts_PaginatedSearchResultBase as PaginatedSearchResultBase, type shopperContexts_PropertyDefinition as PropertyDefinition, type shopperContexts_PropertyValueDefinition as PropertyValueDefinition, type shopperContexts_Query as Query, type shopperContexts_QueryFilter as QueryFilter, type shopperContexts_Range2Filter as Range2Filter, type shopperContexts_SearchRequest as SearchRequest, type shopperContexts_SearchRequestBase as SearchRequestBase, type shopperContexts_ShopperContext as ShopperContext, shopperContexts_ShopperContexts as ShopperContexts, type shopperContexts_ShopperContextsParameters as ShopperContextsParameters, type shopperContexts_ShopperContextsPathParameters as ShopperContextsPathParameters, type shopperContexts_ShopperContextsQueryParameters as ShopperContextsQueryParameters, type shopperContexts_SimpleSearchResult as SimpleSearchResult, type shopperContexts_SimpleSearchResultBase as SimpleSearchResultBase, type shopperContexts_Sort as Sort, type shopperContexts_SpecifiedPropertiesAllowed as SpecifiedPropertiesAllowed, type shopperContexts_TermFilter as TermFilter, type shopperContexts_TermQuery as TermQuery, type shopperContexts_TextQuery as TextQuery };
}

export { type AttributeDefinition as A, type BoolFilter as B, type ChangeControlled as C, type ErrorResponse as E, type FilteredQuery as F, type LocalizedString as L, type Money as M, type NoPropertiesAllowed as N, type OpenObject as O, type PropertyDefinition as P, type QueryFilter as Q, type Range2Filter as R, ShopperContexts as S, type TermQuery as T, type ShopperContext as a, type ChangeControlledDataType as b, type Error as c, type SimpleSearchResult as d, type SearchRequest as e, type PaginatedSearchResult as f, type ClosedObject as g, type SpecifiedPropertiesAllowed as h, type PaginatedSearchResultBase as i, type MatchAllQuery as j, type Query as k, type TermFilter as l, type TextQuery as m, type BoolQuery as n, type SimpleSearchResultBase as o, type NestedQuery as p, type Filter as q, type Sort as r, shopperContexts as s, type SearchRequestBase as t, type MoneyMnemonic as u, type L10nString as v, type PropertyValueDefinition as w, type ShopperContextsPathParameters as x, type ShopperContextsQueryParameters as y, type ShopperContextsParameters as z };

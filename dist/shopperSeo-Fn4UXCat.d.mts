import ClientConfig, { ClientConfigInit } from './clientConfig.mjs';
import { BaseUriParameters, RequireParametersUnlessAllAreOptional, CompositeParameters } from './helpers/types.mjs';

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
type RangeFilter = {
    field: string;
    from?: any;
    fromInclusive?: boolean;
    to?: any;
    toInclusive?: boolean;
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
type UrlMapping = {
    resourceType?: string;
    resourceSubType?: string;
    resourceId?: string;
    refinements?: {} & {
        [key: string]: any;
    };
    statusCode?: number;
    destinationUrl?: string;
    copySourceParams?: boolean;
    additionalUrlParams?: string;
    productCategoryId?: string;
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
/**
 * All path parameters that are used by at least one ShopperSeo method.
 */
type ShopperSeoPathParameters = {
    organizationId?: string;
};
/**
 * All query parameters that are used by at least one ShopperSeo method.
 */
type ShopperSeoQueryParameters = {
    urlSegment?: string;
    siteId?: string;
    locale?: string;
};
/**
 * All parameters that are used by ShopperSeo.
 */
type ShopperSeoParameters = ShopperSeoPathParameters & BaseUriParameters & ShopperSeoQueryParameters;
/**
* [Shopper Seo](https://developer.salesforce.com/docs/commerce/commerce-api/references?meta=shopper-seo:Summary)
* ==================================
*
* **<br />
*
* Simple example:
*
* ```typescript
*   import { ShopperSeo } from "commerce-sdk-isomorphic";
*
*   const clientConfig = {
*     parameters: {
*       clientId: "XXXXXX",
*       organizationId: "XXXX",
*       shortCode: "XXX",
*       siteId: "XX"
*     }
*   };
*   const shopperSeoClient = new ShopperSeo(clientConfig);
* ```
*
* <span style="font-size:.7em; display:block; text-align: right">
* API Version: 1.0.9<br />
* Last Updated: <br />
* </span>
*
*
*/
declare class ShopperSeo<ConfigParameters extends ShopperSeoParameters & Record<string, unknown>> {
    clientConfig: ClientConfig<ConfigParameters> & {
        baseUri: string;
    };
    static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/site/shopper-seo/{version}";
    static readonly apiPaths: {
        getUrlMapping: string;
    };
    constructor(config: ClientConfigInit<ConfigParameters>);
    static readonly paramKeys: {
        readonly getUrlMapping: readonly ["organizationId", "urlSegment", "siteId", "locale"];
        readonly getUrlMappingRequired: readonly ["organizationId", "urlSegment", "siteId"];
    };
    /**
    * Gets URL mapping information for a URL that a shopper clicked or typed in. The mapping information is based on URL rules and redirects set up in Business Manager. For more information about prerequisites and sample usage, see [URL Resolution](/docs/commerce/commerce-api/guide/url-resolution.html). You can customize the behavior of this endpoint by using hooks. See the hooks for getUrlMapping in the [Hook List](https://developer.salesforce.com/docs/commerce/commerce-api/guide/hook_list.html).
    *
    * If you would like to get a raw Response object use the other getUrlMapping function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param urlSegment - The part of the requested URL that comes after the domain name. For example, the urlSegment for "www.abc.com/blue/new-arrivals/tops" is "blue/new-arrivals/tops". There's no limit on the length of the urlSegment. However, for this endpoint, the maximum allowed length of the URL (after URL encoding) is 2047 characters. Make this field URL-encoded so that it properly handles special values such as whitespace. If a urlSegment includes a query string, a 404 error code is returned.
    * @param siteId -
    * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
Below are some valid examples:
- en-US
- de-AT
- de
- default
Please note that if no locale is specified, the default site locale will be used.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type UrlMapping.
    *
    */
    getUrlMapping(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            urlSegment: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<UrlMapping>;
    /**
    * Gets URL mapping information for a URL that a shopper clicked or typed in. The mapping information is based on URL rules and redirects set up in Business Manager. For more information about prerequisites and sample usage, see [URL Resolution](/docs/commerce/commerce-api/guide/url-resolution.html). You can customize the behavior of this endpoint by using hooks. See the hooks for getUrlMapping in the [Hook List](https://developer.salesforce.com/docs/commerce/commerce-api/guide/hook_list.html).
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param urlSegment - The part of the requested URL that comes after the domain name. For example, the urlSegment for "www.abc.com/blue/new-arrivals/tops" is "blue/new-arrivals/tops". There's no limit on the length of the urlSegment. However, for this endpoint, the maximum allowed length of the URL (after URL encoding) is 2047 characters. Make this field URL-encoded so that it properly handles special values such as whitespace. If a urlSegment includes a query string, a 404 error code is returned.
    * @param siteId -
    * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
Below are some valid examples:
- en-US
- de-AT
- de
- default
Please note that if no locale is specified, the default site locale will be used.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type UrlMapping otherwise.
    *
    */
    getUrlMapping<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            urlSegment: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : UrlMapping>;
}

type shopperSeo_AttributeDefinition = AttributeDefinition;
type shopperSeo_BoolFilter = BoolFilter;
type shopperSeo_BoolQuery = BoolQuery;
type shopperSeo_ChangeControlled = ChangeControlled;
type shopperSeo_ChangeControlledDataType = ChangeControlledDataType;
type shopperSeo_ClosedObject = ClosedObject;
type shopperSeo_Error = Error;
type shopperSeo_ErrorResponse = ErrorResponse;
type shopperSeo_Filter = Filter;
type shopperSeo_FilteredQuery = FilteredQuery;
type shopperSeo_L10nString = L10nString;
type shopperSeo_LocalizedString = LocalizedString;
type shopperSeo_MatchAllQuery = MatchAllQuery;
type shopperSeo_Money = Money;
type shopperSeo_MoneyMnemonic = MoneyMnemonic;
type shopperSeo_NestedQuery = NestedQuery;
type shopperSeo_NoPropertiesAllowed = NoPropertiesAllowed;
type shopperSeo_OpenObject = OpenObject;
type shopperSeo_PaginatedSearchResult = PaginatedSearchResult;
type shopperSeo_PaginatedSearchResultBase = PaginatedSearchResultBase;
type shopperSeo_PropertyDefinition = PropertyDefinition;
type shopperSeo_PropertyValueDefinition = PropertyValueDefinition;
type shopperSeo_Query = Query;
type shopperSeo_QueryFilter = QueryFilter;
type shopperSeo_Range2Filter = Range2Filter;
type shopperSeo_RangeFilter = RangeFilter;
type shopperSeo_SearchRequest = SearchRequest;
type shopperSeo_SearchRequestBase = SearchRequestBase;
type shopperSeo_ShopperSeo<ConfigParameters extends ShopperSeoParameters & Record<string, unknown>> = ShopperSeo<ConfigParameters>;
declare const shopperSeo_ShopperSeo: typeof ShopperSeo;
type shopperSeo_ShopperSeoParameters = ShopperSeoParameters;
type shopperSeo_ShopperSeoPathParameters = ShopperSeoPathParameters;
type shopperSeo_ShopperSeoQueryParameters = ShopperSeoQueryParameters;
type shopperSeo_SimpleSearchResult = SimpleSearchResult;
type shopperSeo_SimpleSearchResultBase = SimpleSearchResultBase;
type shopperSeo_Sort = Sort;
type shopperSeo_SpecifiedPropertiesAllowed = SpecifiedPropertiesAllowed;
type shopperSeo_TermFilter = TermFilter;
type shopperSeo_TermQuery = TermQuery;
type shopperSeo_TextQuery = TextQuery;
type shopperSeo_UrlMapping = UrlMapping;
declare namespace shopperSeo {
  export { type shopperSeo_AttributeDefinition as AttributeDefinition, type shopperSeo_BoolFilter as BoolFilter, type shopperSeo_BoolQuery as BoolQuery, type shopperSeo_ChangeControlled as ChangeControlled, type shopperSeo_ChangeControlledDataType as ChangeControlledDataType, type shopperSeo_ClosedObject as ClosedObject, type shopperSeo_Error as Error, type shopperSeo_ErrorResponse as ErrorResponse, type shopperSeo_Filter as Filter, type shopperSeo_FilteredQuery as FilteredQuery, type shopperSeo_L10nString as L10nString, type shopperSeo_LocalizedString as LocalizedString, type shopperSeo_MatchAllQuery as MatchAllQuery, type shopperSeo_Money as Money, type shopperSeo_MoneyMnemonic as MoneyMnemonic, type shopperSeo_NestedQuery as NestedQuery, type shopperSeo_NoPropertiesAllowed as NoPropertiesAllowed, type shopperSeo_OpenObject as OpenObject, type shopperSeo_PaginatedSearchResult as PaginatedSearchResult, type shopperSeo_PaginatedSearchResultBase as PaginatedSearchResultBase, type shopperSeo_PropertyDefinition as PropertyDefinition, type shopperSeo_PropertyValueDefinition as PropertyValueDefinition, type shopperSeo_Query as Query, type shopperSeo_QueryFilter as QueryFilter, type shopperSeo_Range2Filter as Range2Filter, type shopperSeo_RangeFilter as RangeFilter, type shopperSeo_SearchRequest as SearchRequest, type shopperSeo_SearchRequestBase as SearchRequestBase, shopperSeo_ShopperSeo as ShopperSeo, type shopperSeo_ShopperSeoParameters as ShopperSeoParameters, type shopperSeo_ShopperSeoPathParameters as ShopperSeoPathParameters, type shopperSeo_ShopperSeoQueryParameters as ShopperSeoQueryParameters, type shopperSeo_SimpleSearchResult as SimpleSearchResult, type shopperSeo_SimpleSearchResultBase as SimpleSearchResultBase, type shopperSeo_Sort as Sort, type shopperSeo_SpecifiedPropertiesAllowed as SpecifiedPropertiesAllowed, type shopperSeo_TermFilter as TermFilter, type shopperSeo_TermQuery as TermQuery, type shopperSeo_TextQuery as TextQuery, type shopperSeo_UrlMapping as UrlMapping };
}

export { type AttributeDefinition as A, type BoolFilter as B, type ClosedObject as C, type ErrorResponse as E, type FilteredQuery as F, type LocalizedString as L, type Money as M, type NoPropertiesAllowed as N, type OpenObject as O, type PropertyDefinition as P, type QueryFilter as Q, type Range2Filter as R, ShopperSeo as S, type TermQuery as T, type UrlMapping as U, type SimpleSearchResult as a, type SearchRequest as b, type PaginatedSearchResult as c, type SpecifiedPropertiesAllowed as d, type PaginatedSearchResultBase as e, type MatchAllQuery as f, type Query as g, type TermFilter as h, type TextQuery as i, type BoolQuery as j, type SimpleSearchResultBase as k, type NestedQuery as l, type Filter as m, type Sort as n, type RangeFilter as o, type SearchRequestBase as p, type MoneyMnemonic as q, type L10nString as r, shopperSeo as s, type PropertyValueDefinition as t, type ChangeControlled as u, type ChangeControlledDataType as v, type Error as w, type ShopperSeoPathParameters as x, type ShopperSeoQueryParameters as y, type ShopperSeoParameters as z };

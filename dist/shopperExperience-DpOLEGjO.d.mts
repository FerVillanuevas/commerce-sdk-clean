import ClientConfig, { ClientConfigInit } from './clientConfig.mjs';
import { BaseUriParameters, RequireParametersUnlessAllAreOptional, CompositeParameters } from './helpers/types.mjs';

type PageResult = {
    data: Array<Page>;
} & {
    [key: string]: any;
};
type Page = {
    id: string;
    typeId: string;
    aspectTypeId?: string;
    name?: string;
    description?: string;
    pageTitle?: string;
    pageDescription?: string;
    pageKeywords?: string;
    data?: {} & {
        [key: string]: any;
    };
    custom?: {} & {
        [key: string]: any;
    };
    regions?: Array<Region>;
} & {
    [key: string]: any;
};
type Region = {
    id: string;
    components?: Array<Component>;
} & {
    [key: string]: any;
};
type Component = {
    id: string;
    typeId: string;
    data?: {} & {
        [key: string]: any;
    };
    custom?: {} & {
        [key: string]: any;
    };
    regions?: Array<Region>;
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
 * All path parameters that are used by at least one ShopperExperience method.
 */
type ShopperExperiencePathParameters = {
    organizationId?: string;
    pageId?: string;
};
/**
 * All query parameters that are used by at least one ShopperExperience method.
 */
type ShopperExperienceQueryParameters = {
    categoryId?: string;
    productId?: string;
    aspectTypeId?: string;
    aspectAttributes?: string;
    parameters?: string;
    siteId?: string;
    locale?: string;
};
/**
 * All parameters that are used by ShopperExperience.
 */
type ShopperExperienceParameters = ShopperExperiencePathParameters & BaseUriParameters & ShopperExperienceQueryParameters;
/**
* [Shopper Experience](https://developer.salesforce.com/docs/commerce/commerce-api/references?meta=shopper-experience:Summary)
* ==================================
*
* **<br />
*
* Simple example:
*
* ```typescript
*   import { ShopperExperience } from "commerce-sdk-isomorphic";
*
*   const clientConfig = {
*     parameters: {
*       clientId: "XXXXXX",
*       organizationId: "XXXX",
*       shortCode: "XXX",
*       siteId: "XX"
*     }
*   };
*   const shopperExperienceClient = new ShopperExperience(clientConfig);
* ```
*
* <span style="font-size:.7em; display:block; text-align: right">
* API Version: 1.0.5<br />
* Last Updated: <br />
* </span>
*
*
*/
declare class ShopperExperience<ConfigParameters extends ShopperExperienceParameters & Record<string, unknown>> {
    clientConfig: ClientConfig<ConfigParameters> & {
        baseUri: string;
    };
    static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/experience/shopper-experience/{version}";
    static readonly apiPaths: {
        getPages: string;
        getPage: string;
    };
    constructor(config: ClientConfigInit<ConfigParameters>);
    static readonly paramKeys: {
        readonly getPages: readonly ["organizationId", "categoryId", "productId", "aspectTypeId", "aspectAttributes", "parameters", "siteId", "locale"];
        readonly getPagesRequired: readonly ["organizationId", "aspectTypeId", "siteId"];
        readonly getPage: readonly ["organizationId", "pageId", "aspectAttributes", "parameters", "siteId", "locale"];
        readonly getPageRequired: readonly ["organizationId", "pageId", "siteId"];
    };
    /**
    * Get Page Designer pages. The results will apply the visibility rules for each page's components, such as personalization or scheduled visibility.

Either `categoryId` or `productId` must be given in addition to `aspectTypeId`. Because only a single page-to-product and page-to-category assignment per aspect type can be authored today, the returned result contains one element at most.

**Important**: Currently, the Shopper Experience API can’t be used when the [storefront password protection](https://documentation.b2c.commercecloud.salesforce.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2Fcontent%2Fb2c_commerce%2Ftopics%2Fpermissions%2Fb2c_storefront_password_protection.html&resultof=%22%73%74%6f%72%65%66%72%6f%6e%74%22%20%22%70%72%6f%74%65%63%74%69%6f%6e%22%20%22%70%72%6f%74%65%63%74%22%20) feature is enabled.

**Important**: Because this resource uses the GET method, you must not pass sensitive data (payment card information, for example) and must not perform any transactional processes within the server-side scripts that are run for the page and components.
    *
    * If you would like to get a raw Response object use the other getPages function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param categoryId - Category identifier that is used for searching the page assignment. Must be provided if no `productId` is provided.
    * @param productId - Product identifier that is used for searching the page assignment. Must be provided if no `categoryId` is provided.
    * @param aspectTypeId - Aspect type identifier that is used for searching the page assignment in conjunction with either the `productId` or `categoryId`.
    * @param aspectAttributes - A JSON respresentation of aspect attributes. Each aspect attribute is a key/value pair. Aspect attributes serve as a runtime parameter contract between caller (for example, this API or the DWScript API) and callee (the page). This parameter must not contain more than 256 characters after URL decoding.
    * @param parameters - A free-form definition of parameters that influences the page rendering according to its implementation. This parameter must not contain more than 256 characters after URL decoding.
    * @param siteId -
    * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
Below are some valid examples:
- en-US
- de-AT
- de
- default
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type PageResult.
    *
    */
    getPages(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            categoryId?: string;
            productId?: string;
            aspectTypeId: string;
            aspectAttributes?: string;
            parameters?: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<PageResult>;
    /**
    * Get Page Designer pages. The results will apply the visibility rules for each page's components, such as personalization or scheduled visibility.

Either `categoryId` or `productId` must be given in addition to `aspectTypeId`. Because only a single page-to-product and page-to-category assignment per aspect type can be authored today, the returned result contains one element at most.

**Important**: Currently, the Shopper Experience API can’t be used when the [storefront password protection](https://documentation.b2c.commercecloud.salesforce.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2Fcontent%2Fb2c_commerce%2Ftopics%2Fpermissions%2Fb2c_storefront_password_protection.html&resultof=%22%73%74%6f%72%65%66%72%6f%6e%74%22%20%22%70%72%6f%74%65%63%74%69%6f%6e%22%20%22%70%72%6f%74%65%63%74%22%20) feature is enabled.

**Important**: Because this resource uses the GET method, you must not pass sensitive data (payment card information, for example) and must not perform any transactional processes within the server-side scripts that are run for the page and components.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param categoryId - Category identifier that is used for searching the page assignment. Must be provided if no `productId` is provided.
    * @param productId - Product identifier that is used for searching the page assignment. Must be provided if no `categoryId` is provided.
    * @param aspectTypeId - Aspect type identifier that is used for searching the page assignment in conjunction with either the `productId` or `categoryId`.
    * @param aspectAttributes - A JSON respresentation of aspect attributes. Each aspect attribute is a key/value pair. Aspect attributes serve as a runtime parameter contract between caller (for example, this API or the DWScript API) and callee (the page). This parameter must not contain more than 256 characters after URL decoding.
    * @param parameters - A free-form definition of parameters that influences the page rendering according to its implementation. This parameter must not contain more than 256 characters after URL decoding.
    * @param siteId -
    * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
Below are some valid examples:
- en-US
- de-AT
- de
- default
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type PageResult otherwise.
    *
    */
    getPages<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            categoryId?: string;
            productId?: string;
            aspectTypeId: string;
            aspectAttributes?: string;
            parameters?: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : PageResult>;
    /**
    * Get a Page Designer page based on a single page ID. The results will apply the visibility rules for the page's components, such as personalization or scheduled visibility.

**Important**: Currently, the Shopper Experience API can’t be used when the [storefront password protection](https://documentation.b2c.commercecloud.salesforce.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2Fcontent%2Fb2c_commerce%2Ftopics%2Fpermissions%2Fb2c_storefront_password_protection.html&resultof=%22%73%74%6f%72%65%66%72%6f%6e%74%22%20%22%70%72%6f%74%65%63%74%69%6f%6e%22%20%22%70%72%6f%74%65%63%74%22%20) feature is enabled.

**Important**: Because this resource uses the GET method, you must not pass sensitive data (payment card information, for example) and must not perform any transactional processes within the server-side scripts that are run for the page and components.
    *
    * If you would like to get a raw Response object use the other getPage function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param pageId - Identifier for the requested page.
    * @param aspectAttributes - A JSON respresentation of aspect attributes. Each aspect attribute is a key/value pair. Aspect attributes serve as a runtime parameter contract between caller (for example, this API or the DWScript API) and callee (the page). This parameter must not contain more than 256 characters after URL decoding.
    * @param parameters - A free-form definition of parameters that influences the page rendering according to its implementation. This parameter must not contain more than 256 characters after URL decoding.
    * @param siteId -
    * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
Below are some valid examples:
- en-US
- de-AT
- de
- default
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type Page.
    *
    */
    getPage(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            pageId: string;
            aspectAttributes?: string;
            parameters?: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Page>;
    /**
    * Get a Page Designer page based on a single page ID. The results will apply the visibility rules for the page's components, such as personalization or scheduled visibility.

**Important**: Currently, the Shopper Experience API can’t be used when the [storefront password protection](https://documentation.b2c.commercecloud.salesforce.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2Fcontent%2Fb2c_commerce%2Ftopics%2Fpermissions%2Fb2c_storefront_password_protection.html&resultof=%22%73%74%6f%72%65%66%72%6f%6e%74%22%20%22%70%72%6f%74%65%63%74%69%6f%6e%22%20%22%70%72%6f%74%65%63%74%22%20) feature is enabled.

**Important**: Because this resource uses the GET method, you must not pass sensitive data (payment card information, for example) and must not perform any transactional processes within the server-side scripts that are run for the page and components.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param pageId - Identifier for the requested page.
    * @param aspectAttributes - A JSON respresentation of aspect attributes. Each aspect attribute is a key/value pair. Aspect attributes serve as a runtime parameter contract between caller (for example, this API or the DWScript API) and callee (the page). This parameter must not contain more than 256 characters after URL decoding.
    * @param parameters - A free-form definition of parameters that influences the page rendering according to its implementation. This parameter must not contain more than 256 characters after URL decoding.
    * @param siteId -
    * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
Below are some valid examples:
- en-US
- de-AT
- de
- default
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type Page otherwise.
    *
    */
    getPage<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            pageId: string;
            aspectAttributes?: string;
            parameters?: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Page>;
}

type shopperExperience_AttributeDefinition = AttributeDefinition;
type shopperExperience_BoolFilter = BoolFilter;
type shopperExperience_BoolQuery = BoolQuery;
type shopperExperience_ChangeControlled = ChangeControlled;
type shopperExperience_ChangeControlledDataType = ChangeControlledDataType;
type shopperExperience_ClosedObject = ClosedObject;
type shopperExperience_Component = Component;
type shopperExperience_Error = Error;
type shopperExperience_ErrorResponse = ErrorResponse;
type shopperExperience_Filter = Filter;
type shopperExperience_FilteredQuery = FilteredQuery;
type shopperExperience_L10nString = L10nString;
type shopperExperience_LocalizedString = LocalizedString;
type shopperExperience_MatchAllQuery = MatchAllQuery;
type shopperExperience_Money = Money;
type shopperExperience_MoneyMnemonic = MoneyMnemonic;
type shopperExperience_NestedQuery = NestedQuery;
type shopperExperience_NoPropertiesAllowed = NoPropertiesAllowed;
type shopperExperience_OpenObject = OpenObject;
type shopperExperience_Page = Page;
type shopperExperience_PageResult = PageResult;
type shopperExperience_PaginatedSearchResult = PaginatedSearchResult;
type shopperExperience_PaginatedSearchResultBase = PaginatedSearchResultBase;
type shopperExperience_PropertyDefinition = PropertyDefinition;
type shopperExperience_PropertyValueDefinition = PropertyValueDefinition;
type shopperExperience_Query = Query;
type shopperExperience_QueryFilter = QueryFilter;
type shopperExperience_Range2Filter = Range2Filter;
type shopperExperience_Region = Region;
type shopperExperience_SearchRequest = SearchRequest;
type shopperExperience_SearchRequestBase = SearchRequestBase;
type shopperExperience_ShopperExperience<ConfigParameters extends ShopperExperienceParameters & Record<string, unknown>> = ShopperExperience<ConfigParameters>;
declare const shopperExperience_ShopperExperience: typeof ShopperExperience;
type shopperExperience_ShopperExperienceParameters = ShopperExperienceParameters;
type shopperExperience_ShopperExperiencePathParameters = ShopperExperiencePathParameters;
type shopperExperience_ShopperExperienceQueryParameters = ShopperExperienceQueryParameters;
type shopperExperience_SimpleSearchResult = SimpleSearchResult;
type shopperExperience_SimpleSearchResultBase = SimpleSearchResultBase;
type shopperExperience_Sort = Sort;
type shopperExperience_SpecifiedPropertiesAllowed = SpecifiedPropertiesAllowed;
type shopperExperience_TermFilter = TermFilter;
type shopperExperience_TermQuery = TermQuery;
type shopperExperience_TextQuery = TextQuery;
declare namespace shopperExperience {
  export { type shopperExperience_AttributeDefinition as AttributeDefinition, type shopperExperience_BoolFilter as BoolFilter, type shopperExperience_BoolQuery as BoolQuery, type shopperExperience_ChangeControlled as ChangeControlled, type shopperExperience_ChangeControlledDataType as ChangeControlledDataType, type shopperExperience_ClosedObject as ClosedObject, type shopperExperience_Component as Component, type shopperExperience_Error as Error, type shopperExperience_ErrorResponse as ErrorResponse, type shopperExperience_Filter as Filter, type shopperExperience_FilteredQuery as FilteredQuery, type shopperExperience_L10nString as L10nString, type shopperExperience_LocalizedString as LocalizedString, type shopperExperience_MatchAllQuery as MatchAllQuery, type shopperExperience_Money as Money, type shopperExperience_MoneyMnemonic as MoneyMnemonic, type shopperExperience_NestedQuery as NestedQuery, type shopperExperience_NoPropertiesAllowed as NoPropertiesAllowed, type shopperExperience_OpenObject as OpenObject, type shopperExperience_Page as Page, type shopperExperience_PageResult as PageResult, type shopperExperience_PaginatedSearchResult as PaginatedSearchResult, type shopperExperience_PaginatedSearchResultBase as PaginatedSearchResultBase, type shopperExperience_PropertyDefinition as PropertyDefinition, type shopperExperience_PropertyValueDefinition as PropertyValueDefinition, type shopperExperience_Query as Query, type shopperExperience_QueryFilter as QueryFilter, type shopperExperience_Range2Filter as Range2Filter, type shopperExperience_Region as Region, type shopperExperience_SearchRequest as SearchRequest, type shopperExperience_SearchRequestBase as SearchRequestBase, shopperExperience_ShopperExperience as ShopperExperience, type shopperExperience_ShopperExperienceParameters as ShopperExperienceParameters, type shopperExperience_ShopperExperiencePathParameters as ShopperExperiencePathParameters, type shopperExperience_ShopperExperienceQueryParameters as ShopperExperienceQueryParameters, type shopperExperience_SimpleSearchResult as SimpleSearchResult, type shopperExperience_SimpleSearchResultBase as SimpleSearchResultBase, type shopperExperience_Sort as Sort, type shopperExperience_SpecifiedPropertiesAllowed as SpecifiedPropertiesAllowed, type shopperExperience_TermFilter as TermFilter, type shopperExperience_TermQuery as TermQuery, type shopperExperience_TextQuery as TextQuery };
}

export { type AttributeDefinition as A, type BoolFilter as B, type Component as C, type ShopperExperiencePathParameters as D, type ErrorResponse as E, type FilteredQuery as F, type ShopperExperienceQueryParameters as G, type ShopperExperienceParameters as H, type LocalizedString as L, type Money as M, type NoPropertiesAllowed as N, type OpenObject as O, type PageResult as P, type QueryFilter as Q, type Region as R, ShopperExperience as S, type TermQuery as T, type Page as a, type ChangeControlled as b, type ChangeControlledDataType as c, type Error as d, type SimpleSearchResult as e, type SearchRequest as f, type PropertyDefinition as g, type PaginatedSearchResult as h, type ClosedObject as i, type SpecifiedPropertiesAllowed as j, type PaginatedSearchResultBase as k, type MatchAllQuery as l, type Query as m, type TermFilter as n, type TextQuery as o, type Range2Filter as p, type BoolQuery as q, type SimpleSearchResultBase as r, shopperExperience as s, type NestedQuery as t, type Filter as u, type Sort as v, type SearchRequestBase as w, type MoneyMnemonic as x, type L10nString as y, type PropertyValueDefinition as z };

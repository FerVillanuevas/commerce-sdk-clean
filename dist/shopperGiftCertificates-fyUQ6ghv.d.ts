import ClientConfig, { ClientConfigInit } from './clientConfig.js';
import { BaseUriParameters, RequireParametersUnlessAllAreOptional, CompositeParameters } from './helpers/types.js';

type GiftCertificate = {
    amount: number;
    balance: number;
    description?: string;
    enabled: boolean;
    maskedGiftCertificateCode: string;
    merchantId: string;
    message?: string;
    recipientEmail: string;
    recipientName: string;
    senderName: string;
    status: string;
} & {
    [key: string]: any;
};
type GiftCertificateRequest = {
    giftCertificateCode: string;
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
 * All path parameters that are used by at least one ShopperGiftCertificates method.
 */
type ShopperGiftCertificatesPathParameters = {
    organizationId?: string;
};
/**
 * All query parameters that are used by at least one ShopperGiftCertificates method.
 */
type ShopperGiftCertificatesQueryParameters = {
    siteId?: string;
};
/**
 * All parameters that are used by ShopperGiftCertificates.
 */
type ShopperGiftCertificatesParameters = ShopperGiftCertificatesPathParameters & BaseUriParameters & ShopperGiftCertificatesQueryParameters;
/**
* [Shopper Gift Certificates](https://developer.salesforce.com/docs/commerce/commerce-api/references?meta=shopper-gift-certificates:Summary)
* ==================================
*
* *Obtain details about a gift certificate.*<br />
*
* Simple example:
*
* ```typescript
*   import { ShopperGiftCertificates } from "commerce-sdk-isomorphic";
*
*   const clientConfig = {
*     parameters: {
*       clientId: "XXXXXX",
*       organizationId: "XXXX",
*       shortCode: "XXX",
*       siteId: "XX"
*     }
*   };
*   const shopperGiftCertificatesClient = new ShopperGiftCertificates(clientConfig);
* ```
*
* <span style="font-size:.7em; display:block; text-align: right">
* API Version: 1.0.17<br />
* Last Updated: <br />
* </span>
*
*
*/
declare class ShopperGiftCertificates<ConfigParameters extends ShopperGiftCertificatesParameters & Record<string, unknown>> {
    clientConfig: ClientConfig<ConfigParameters> & {
        baseUri: string;
    };
    static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/pricing/shopper-gift-certificates/{version}";
    static readonly apiPaths: {
        getGiftCertificate: string;
    };
    constructor(config: ClientConfigInit<ConfigParameters>);
    static readonly paramKeys: {
        readonly getGiftCertificate: readonly ["organizationId", "siteId"];
        readonly getGiftCertificateRequired: readonly ["organizationId", "siteId"];
    };
    /**
    * Action to retrieve an existing gift certificate.
    *
    * If you would like to get a raw Response object use the other getGiftCertificate function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type GiftCertificate.
    *
    */
    getGiftCertificate(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: GiftCertificateRequest;
    }>): Promise<GiftCertificate>;
    /**
    * Action to retrieve an existing gift certificate.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type GiftCertificate otherwise.
    *
    */
    getGiftCertificate<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: GiftCertificateRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : GiftCertificate>;
}

type shopperGiftCertificates_AttributeDefinition = AttributeDefinition;
type shopperGiftCertificates_BoolFilter = BoolFilter;
type shopperGiftCertificates_BoolQuery = BoolQuery;
type shopperGiftCertificates_ChangeControlled = ChangeControlled;
type shopperGiftCertificates_ChangeControlledDataType = ChangeControlledDataType;
type shopperGiftCertificates_ClosedObject = ClosedObject;
type shopperGiftCertificates_Error = Error;
type shopperGiftCertificates_ErrorResponse = ErrorResponse;
type shopperGiftCertificates_Filter = Filter;
type shopperGiftCertificates_FilteredQuery = FilteredQuery;
type shopperGiftCertificates_GiftCertificate = GiftCertificate;
type shopperGiftCertificates_GiftCertificateRequest = GiftCertificateRequest;
type shopperGiftCertificates_L10nString = L10nString;
type shopperGiftCertificates_LocalizedString = LocalizedString;
type shopperGiftCertificates_MatchAllQuery = MatchAllQuery;
type shopperGiftCertificates_Money = Money;
type shopperGiftCertificates_MoneyMnemonic = MoneyMnemonic;
type shopperGiftCertificates_NestedQuery = NestedQuery;
type shopperGiftCertificates_NoPropertiesAllowed = NoPropertiesAllowed;
type shopperGiftCertificates_OpenObject = OpenObject;
type shopperGiftCertificates_PaginatedSearchResult = PaginatedSearchResult;
type shopperGiftCertificates_PaginatedSearchResultBase = PaginatedSearchResultBase;
type shopperGiftCertificates_PropertyDefinition = PropertyDefinition;
type shopperGiftCertificates_PropertyValueDefinition = PropertyValueDefinition;
type shopperGiftCertificates_Query = Query;
type shopperGiftCertificates_QueryFilter = QueryFilter;
type shopperGiftCertificates_Range2Filter = Range2Filter;
type shopperGiftCertificates_SearchRequest = SearchRequest;
type shopperGiftCertificates_SearchRequestBase = SearchRequestBase;
type shopperGiftCertificates_ShopperGiftCertificates<ConfigParameters extends ShopperGiftCertificatesParameters & Record<string, unknown>> = ShopperGiftCertificates<ConfigParameters>;
declare const shopperGiftCertificates_ShopperGiftCertificates: typeof ShopperGiftCertificates;
type shopperGiftCertificates_ShopperGiftCertificatesParameters = ShopperGiftCertificatesParameters;
type shopperGiftCertificates_ShopperGiftCertificatesPathParameters = ShopperGiftCertificatesPathParameters;
type shopperGiftCertificates_ShopperGiftCertificatesQueryParameters = ShopperGiftCertificatesQueryParameters;
type shopperGiftCertificates_SimpleSearchResult = SimpleSearchResult;
type shopperGiftCertificates_SimpleSearchResultBase = SimpleSearchResultBase;
type shopperGiftCertificates_Sort = Sort;
type shopperGiftCertificates_SpecifiedPropertiesAllowed = SpecifiedPropertiesAllowed;
type shopperGiftCertificates_TermFilter = TermFilter;
type shopperGiftCertificates_TermQuery = TermQuery;
type shopperGiftCertificates_TextQuery = TextQuery;
declare namespace shopperGiftCertificates {
  export { type shopperGiftCertificates_AttributeDefinition as AttributeDefinition, type shopperGiftCertificates_BoolFilter as BoolFilter, type shopperGiftCertificates_BoolQuery as BoolQuery, type shopperGiftCertificates_ChangeControlled as ChangeControlled, type shopperGiftCertificates_ChangeControlledDataType as ChangeControlledDataType, type shopperGiftCertificates_ClosedObject as ClosedObject, type shopperGiftCertificates_Error as Error, type shopperGiftCertificates_ErrorResponse as ErrorResponse, type shopperGiftCertificates_Filter as Filter, type shopperGiftCertificates_FilteredQuery as FilteredQuery, type shopperGiftCertificates_GiftCertificate as GiftCertificate, type shopperGiftCertificates_GiftCertificateRequest as GiftCertificateRequest, type shopperGiftCertificates_L10nString as L10nString, type shopperGiftCertificates_LocalizedString as LocalizedString, type shopperGiftCertificates_MatchAllQuery as MatchAllQuery, type shopperGiftCertificates_Money as Money, type shopperGiftCertificates_MoneyMnemonic as MoneyMnemonic, type shopperGiftCertificates_NestedQuery as NestedQuery, type shopperGiftCertificates_NoPropertiesAllowed as NoPropertiesAllowed, type shopperGiftCertificates_OpenObject as OpenObject, type shopperGiftCertificates_PaginatedSearchResult as PaginatedSearchResult, type shopperGiftCertificates_PaginatedSearchResultBase as PaginatedSearchResultBase, type shopperGiftCertificates_PropertyDefinition as PropertyDefinition, type shopperGiftCertificates_PropertyValueDefinition as PropertyValueDefinition, type shopperGiftCertificates_Query as Query, type shopperGiftCertificates_QueryFilter as QueryFilter, type shopperGiftCertificates_Range2Filter as Range2Filter, type shopperGiftCertificates_SearchRequest as SearchRequest, type shopperGiftCertificates_SearchRequestBase as SearchRequestBase, shopperGiftCertificates_ShopperGiftCertificates as ShopperGiftCertificates, type shopperGiftCertificates_ShopperGiftCertificatesParameters as ShopperGiftCertificatesParameters, type shopperGiftCertificates_ShopperGiftCertificatesPathParameters as ShopperGiftCertificatesPathParameters, type shopperGiftCertificates_ShopperGiftCertificatesQueryParameters as ShopperGiftCertificatesQueryParameters, type shopperGiftCertificates_SimpleSearchResult as SimpleSearchResult, type shopperGiftCertificates_SimpleSearchResultBase as SimpleSearchResultBase, type shopperGiftCertificates_Sort as Sort, type shopperGiftCertificates_SpecifiedPropertiesAllowed as SpecifiedPropertiesAllowed, type shopperGiftCertificates_TermFilter as TermFilter, type shopperGiftCertificates_TermQuery as TermQuery, type shopperGiftCertificates_TextQuery as TextQuery };
}

export { type AttributeDefinition as A, type BoolFilter as B, type ChangeControlled as C, type ErrorResponse as E, type FilteredQuery as F, type GiftCertificate as G, type LocalizedString as L, type Money as M, type NoPropertiesAllowed as N, type OpenObject as O, type PropertyDefinition as P, type QueryFilter as Q, type Range2Filter as R, ShopperGiftCertificates as S, type TermQuery as T, type GiftCertificateRequest as a, type ChangeControlledDataType as b, type Error as c, type SimpleSearchResult as d, type SearchRequest as e, type PaginatedSearchResult as f, type ClosedObject as g, type SpecifiedPropertiesAllowed as h, type PaginatedSearchResultBase as i, type MatchAllQuery as j, type Query as k, type TermFilter as l, type TextQuery as m, type BoolQuery as n, type SimpleSearchResultBase as o, type NestedQuery as p, type Filter as q, type Sort as r, shopperGiftCertificates as s, type SearchRequestBase as t, type MoneyMnemonic as u, type L10nString as v, type PropertyValueDefinition as w, type ShopperGiftCertificatesPathParameters as x, type ShopperGiftCertificatesQueryParameters as y, type ShopperGiftCertificatesParameters as z };

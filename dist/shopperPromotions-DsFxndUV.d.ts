import ClientConfig, { ClientConfigInit } from './clientConfig.js';
import { BaseUriParameters, RequireParametersUnlessAllAreOptional, CompositeParameters } from './helpers/types.js';

type Promotion = {
    calloutMsg?: string;
    currency?: string;
    details?: string;
    endDate?: any;
    id: string;
    image?: string;
    name?: string;
    startDate?: any;
} & {
    [key: string]: any;
};
type PromotionResult = {
    limit: number;
    data: Array<Promotion>;
    total: number;
};
type Error = {
    type: string;
    title?: string;
    detail?: string;
    instance?: string;
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
 * All path parameters that are used by at least one ShopperPromotions method.
 */
type ShopperPromotionsPathParameters = {
    organizationId?: string;
    campaignId?: string;
};
/**
 * All query parameters that are used by at least one ShopperPromotions method.
 */
type ShopperPromotionsQueryParameters = {
    siteId?: string;
    ids?: string;
    locale?: string;
    startDate?: string;
    endDate?: string;
    currency?: string;
};
/**
 * All parameters that are used by ShopperPromotions.
 */
type ShopperPromotionsParameters = ShopperPromotionsPathParameters & BaseUriParameters & ShopperPromotionsQueryParameters;
/**
* [Shopper Promotions](https://developer.salesforce.com/docs/commerce/commerce-api/references?meta=shopper-promotions:Summary)
* ==================================
*
* *View details for active promotions.*<br />
*
* Simple example:
*
* ```typescript
*   import { ShopperPromotions } from "commerce-sdk-isomorphic";
*
*   const clientConfig = {
*     parameters: {
*       clientId: "XXXXXX",
*       organizationId: "XXXX",
*       shortCode: "XXX",
*       siteId: "XX"
*     }
*   };
*   const shopperPromotionsClient = new ShopperPromotions(clientConfig);
* ```
*
* <span style="font-size:.7em; display:block; text-align: right">
* API Version: 1.0.27<br />
* Last Updated: <br />
* </span>
*
*
*/
declare class ShopperPromotions<ConfigParameters extends ShopperPromotionsParameters & Record<string, unknown>> {
    clientConfig: ClientConfig<ConfigParameters> & {
        baseUri: string;
    };
    static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/pricing/shopper-promotions/{version}";
    static readonly apiPaths: {
        getPromotions: string;
        getPromotionsForCampaign: string;
    };
    constructor(config: ClientConfigInit<ConfigParameters>);
    static readonly paramKeys: {
        readonly getPromotions: readonly ["organizationId", "siteId", "ids", "locale"];
        readonly getPromotionsRequired: readonly ["organizationId", "siteId", "ids"];
        readonly getPromotionsForCampaign: readonly ["organizationId", "campaignId", "siteId", "startDate", "endDate", "currency"];
        readonly getPromotionsForCampaignRequired: readonly ["organizationId", "campaignId", "siteId"];
    };
    /**
    * Returns an array of enabled promotions for a list of specified IDs. In the request URL, you can specify up to 50 IDs. If you specify an ID that contains either parentheses or the separator characters, you must URL encode these characters. Each request returns only enabled promotions as the server does not consider promotion qualifiers or schedules.
    *
    * If you would like to get a raw Response object use the other getPromotions function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param siteId -
    * @param ids -
    * @param locale -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type PromotionResult.
    *
    */
    getPromotions(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            siteId: string;
            ids: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<PromotionResult>;
    /**
    * Returns an array of enabled promotions for a list of specified IDs. In the request URL, you can specify up to 50 IDs. If you specify an ID that contains either parentheses or the separator characters, you must URL encode these characters. Each request returns only enabled promotions as the server does not consider promotion qualifiers or schedules.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param siteId -
    * @param ids -
    * @param locale -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type PromotionResult otherwise.
    *
    */
    getPromotions<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            siteId: string;
            ids: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : PromotionResult>;
    /**
    * Handles get promotion by filter criteria. Returns an array of enabled promotions matching the specified filter
criteria. In the request URL, you must provide a campaign_id parameter, and you can optionally specify a date
range by providing start_date and end_date parameters. Both parameters are required to specify a date range, as
omitting one causes the server to return a MissingParameterException fault. Each request returns only enabled
promotions, since the server does not consider promotion qualifiers or schedules.
    *
    * If you would like to get a raw Response object use the other getPromotionsForCampaign function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param campaignId - Find the promotions assigned to this campaign (mandatory).
    * @param siteId -
    * @param startDate - The start date of the promotion in ISO8601 date time format: yyyy-MM-dd'T'HH:mmZ
    * @param endDate - The end date of the promotion in ISO8601 date time format: yyyy-MM-dd'T'HH:mmZ
    * @param currency - The currency mnemonic specified for price. This parameter is effective only for product suggestions.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type PromotionResult.
    *
    */
    getPromotionsForCampaign(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            campaignId: string;
            siteId: string;
            startDate?: string;
            endDate?: string;
            currency?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<PromotionResult>;
    /**
    * Handles get promotion by filter criteria. Returns an array of enabled promotions matching the specified filter
criteria. In the request URL, you must provide a campaign_id parameter, and you can optionally specify a date
range by providing start_date and end_date parameters. Both parameters are required to specify a date range, as
omitting one causes the server to return a MissingParameterException fault. Each request returns only enabled
promotions, since the server does not consider promotion qualifiers or schedules.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param campaignId - Find the promotions assigned to this campaign (mandatory).
    * @param siteId -
    * @param startDate - The start date of the promotion in ISO8601 date time format: yyyy-MM-dd'T'HH:mmZ
    * @param endDate - The end date of the promotion in ISO8601 date time format: yyyy-MM-dd'T'HH:mmZ
    * @param currency - The currency mnemonic specified for price. This parameter is effective only for product suggestions.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type PromotionResult otherwise.
    *
    */
    getPromotionsForCampaign<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            campaignId: string;
            siteId: string;
            startDate?: string;
            endDate?: string;
            currency?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : PromotionResult>;
}

type shopperPromotions_AttributeDefinition = AttributeDefinition;
type shopperPromotions_BoolFilter = BoolFilter;
type shopperPromotions_BoolQuery = BoolQuery;
type shopperPromotions_ChangeControlled = ChangeControlled;
type shopperPromotions_ChangeControlledDataType = ChangeControlledDataType;
type shopperPromotions_ClosedObject = ClosedObject;
type shopperPromotions_Error = Error;
type shopperPromotions_ErrorResponse = ErrorResponse;
type shopperPromotions_Filter = Filter;
type shopperPromotions_FilteredQuery = FilteredQuery;
type shopperPromotions_L10nString = L10nString;
type shopperPromotions_LocalizedString = LocalizedString;
type shopperPromotions_MatchAllQuery = MatchAllQuery;
type shopperPromotions_Money = Money;
type shopperPromotions_MoneyMnemonic = MoneyMnemonic;
type shopperPromotions_NestedQuery = NestedQuery;
type shopperPromotions_NoPropertiesAllowed = NoPropertiesAllowed;
type shopperPromotions_OpenObject = OpenObject;
type shopperPromotions_PaginatedSearchResult = PaginatedSearchResult;
type shopperPromotions_PaginatedSearchResultBase = PaginatedSearchResultBase;
type shopperPromotions_Promotion = Promotion;
type shopperPromotions_PromotionResult = PromotionResult;
type shopperPromotions_PropertyDefinition = PropertyDefinition;
type shopperPromotions_PropertyValueDefinition = PropertyValueDefinition;
type shopperPromotions_Query = Query;
type shopperPromotions_QueryFilter = QueryFilter;
type shopperPromotions_Range2Filter = Range2Filter;
type shopperPromotions_SearchRequest = SearchRequest;
type shopperPromotions_SearchRequestBase = SearchRequestBase;
type shopperPromotions_ShopperPromotions<ConfigParameters extends ShopperPromotionsParameters & Record<string, unknown>> = ShopperPromotions<ConfigParameters>;
declare const shopperPromotions_ShopperPromotions: typeof ShopperPromotions;
type shopperPromotions_ShopperPromotionsParameters = ShopperPromotionsParameters;
type shopperPromotions_ShopperPromotionsPathParameters = ShopperPromotionsPathParameters;
type shopperPromotions_ShopperPromotionsQueryParameters = ShopperPromotionsQueryParameters;
type shopperPromotions_SimpleSearchResult = SimpleSearchResult;
type shopperPromotions_SimpleSearchResultBase = SimpleSearchResultBase;
type shopperPromotions_Sort = Sort;
type shopperPromotions_SpecifiedPropertiesAllowed = SpecifiedPropertiesAllowed;
type shopperPromotions_TermFilter = TermFilter;
type shopperPromotions_TermQuery = TermQuery;
type shopperPromotions_TextQuery = TextQuery;
declare namespace shopperPromotions {
  export { type shopperPromotions_AttributeDefinition as AttributeDefinition, type shopperPromotions_BoolFilter as BoolFilter, type shopperPromotions_BoolQuery as BoolQuery, type shopperPromotions_ChangeControlled as ChangeControlled, type shopperPromotions_ChangeControlledDataType as ChangeControlledDataType, type shopperPromotions_ClosedObject as ClosedObject, type shopperPromotions_Error as Error, type shopperPromotions_ErrorResponse as ErrorResponse, type shopperPromotions_Filter as Filter, type shopperPromotions_FilteredQuery as FilteredQuery, type shopperPromotions_L10nString as L10nString, type shopperPromotions_LocalizedString as LocalizedString, type shopperPromotions_MatchAllQuery as MatchAllQuery, type shopperPromotions_Money as Money, type shopperPromotions_MoneyMnemonic as MoneyMnemonic, type shopperPromotions_NestedQuery as NestedQuery, type shopperPromotions_NoPropertiesAllowed as NoPropertiesAllowed, type shopperPromotions_OpenObject as OpenObject, type shopperPromotions_PaginatedSearchResult as PaginatedSearchResult, type shopperPromotions_PaginatedSearchResultBase as PaginatedSearchResultBase, type shopperPromotions_Promotion as Promotion, type shopperPromotions_PromotionResult as PromotionResult, type shopperPromotions_PropertyDefinition as PropertyDefinition, type shopperPromotions_PropertyValueDefinition as PropertyValueDefinition, type shopperPromotions_Query as Query, type shopperPromotions_QueryFilter as QueryFilter, type shopperPromotions_Range2Filter as Range2Filter, type shopperPromotions_SearchRequest as SearchRequest, type shopperPromotions_SearchRequestBase as SearchRequestBase, shopperPromotions_ShopperPromotions as ShopperPromotions, type shopperPromotions_ShopperPromotionsParameters as ShopperPromotionsParameters, type shopperPromotions_ShopperPromotionsPathParameters as ShopperPromotionsPathParameters, type shopperPromotions_ShopperPromotionsQueryParameters as ShopperPromotionsQueryParameters, type shopperPromotions_SimpleSearchResult as SimpleSearchResult, type shopperPromotions_SimpleSearchResultBase as SimpleSearchResultBase, type shopperPromotions_Sort as Sort, type shopperPromotions_SpecifiedPropertiesAllowed as SpecifiedPropertiesAllowed, type shopperPromotions_TermFilter as TermFilter, type shopperPromotions_TermQuery as TermQuery, type shopperPromotions_TextQuery as TextQuery };
}

export { type AttributeDefinition as A, type BoolFilter as B, type ChangeControlled as C, type ShopperPromotionsParameters as D, type Error as E, type FilteredQuery as F, type LocalizedString as L, type Money as M, type NoPropertiesAllowed as N, type OpenObject as O, type Promotion as P, type QueryFilter as Q, type Range2Filter as R, ShopperPromotions as S, type TermQuery as T, type PromotionResult as a, type ErrorResponse as b, type ChangeControlledDataType as c, type SimpleSearchResult as d, type SearchRequest as e, type PropertyDefinition as f, type PaginatedSearchResult as g, type ClosedObject as h, type SpecifiedPropertiesAllowed as i, type PaginatedSearchResultBase as j, type MatchAllQuery as k, type Query as l, type TermFilter as m, type TextQuery as n, type BoolQuery as o, type SimpleSearchResultBase as p, type NestedQuery as q, type Filter as r, shopperPromotions as s, type Sort as t, type SearchRequestBase as u, type MoneyMnemonic as v, type L10nString as w, type PropertyValueDefinition as x, type ShopperPromotionsPathParameters as y, type ShopperPromotionsQueryParameters as z };

import ClientConfig, { ClientConfigInit } from './clientConfig.js';
import { BaseUriParameters, RequireParametersUnlessAllAreOptional, CompositeParameters } from './helpers/types.js';

type ErrorResponse = {
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
    query: any;
    sorts?: Array<Sort>;
    offset?: any;
} & {
    [key: string]: any;
};
type PaginatedSearchResult = {
    query: any;
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
    filters?: Array<any>;
    operator: string;
} & {
    [key: string]: any;
};
type PaginatedSearchResultBase = {
    query: any;
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
    filter: any;
    query: any;
} & {
    [key: string]: any;
};
type QueryFilter = {
    query: any;
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
    must?: Array<any>;
    mustNot?: Array<any>;
    should?: Array<any>;
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
    query: any;
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
    query: any;
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
type ExpansionAttribute = {
    attributeId: string;
    path: string;
    value: any;
} & {
    [key: string]: any;
};
type PaginationLinks = {
    prev?: Self;
    self: Self;
    next?: Self;
} & {
    [key: string]: any;
};
type ResourceLink = {
    self: Self;
} & {
    [key: string]: any;
};
type Self = {
    href: string;
};
type SelfResourceLink = {
    self: Self;
};
type Pagination = {
    prev?: Self;
    self: Self;
    next?: Self;
};
type ResourceBadRequest = {
    [key: string]: any;
};
type ResourceNonReadableHttpMessage = {};
type ResourceInvalidRequest = {};
type AuthenticationFailure = {};
type BaseError = {
    type: string;
    title?: string;
    detail?: string;
    instance?: string;
};
type NotFound = {};
type InvalidRequest = {};
type AuthorizationFailure = {};
type BadRequest = {};
type ServiceUnavailable = {};
type InternalServerError = {};
type RateLimitExceeded = {
    requestLimit: any;
    type: string;
    title?: string;
    detail?: string;
    instance?: string;
};
type NonReadableHttpMessage = {};
type AttributesQuery = {
    value: {
        attributes: Array<string>;
        phrase: string;
    } & {
        [key: string]: any;
    };
    queryType: string;
    correctableAttributes?: CorrectableAttributes;
    highlighting?: Highlighting;
};
type Highlighting = {
    attributes: Array<string>;
} & {
    [key: string]: any;
};
type PhraseQuery = {
    value: string;
    queryType: string;
    correctableAttributes?: CorrectableAttributes;
    highlighting?: Highlighting;
};
type QueryOutput = {
    hits: Array<Result>;
    facets?: Array<FacetOutput>;
    links: PaginationLinks;
    limit: number;
    offset: any;
    total: any;
};
type QueryInput = {
    query?: Query;
    refinements?: Array<Refinement>;
    returnedAttributes?: Array<string>;
    grouping?: Grouping;
    facets?: Array<FacetInput>;
    facetRequest?: FacetRequest;
    sorting: Sorting;
};
type CorrectableAttributes = {
    attributes: Array<string>;
} & {
    [key: string]: any;
};
type Refinement = {
    attributeId: string;
    refinementType: string;
} & {
    [key: string]: any;
};
type ValueRefinement = {
    values: Array<any>;
    attributeId: string;
    refinementType: string;
};
type RangeRefinement = {
    min: any;
    max: any;
    attributeId: string;
    refinementType: string;
};
type ValueFacetOutput = {
    values?: Array<ValueFacetOutputEntity>;
    attributeId: string;
    facetType: string;
};
type FacetInput = {
    attributeId: string;
    facetType: string;
} & {
    [key: string]: any;
};
type RangeFacetInput = {};
type RangeFacetOutput = {
    min: any;
    max: any;
    attributeId: string;
    facetType: string;
};
type ValueFacetInput = {
    mask?: Array<string>;
    attributeId: string;
    facetType: string;
};
type FacetRequest = {
    facetLimit?: any;
    facets?: Array<FacetInput>;
} & {
    [key: string]: any;
};
type ValueFacetOutputEntity = {
    value: string;
    count: any;
} & {
    [key: string]: any;
};
type FacetOutput = {
    attributeId: string;
    facetType: string;
} & {
    [key: string]: any;
};
type Sorting = {
    sortType: string;
} & {
    [key: string]: any;
};
type AttributeSorting = {
    attributeId: string;
    direction: string;
    sortType: string;
};
type RelevanceSorting = {};
type Grouping = {
    groupType: string;
} & {
    [key: string]: any;
};
type AttributeGrouping = {
    attributeId: string;
    returnedAttributes?: Array<string>;
    groupType: string;
};
type ItemReference = {
    itemId: string;
    attributes?: Array<ExpansionAttribute>;
} & {
    [key: string]: any;
};
type Highlight = {
    attributeId: string;
    value: string;
} & {
    [key: string]: any;
};
type Result = {
    matchedItem: ItemReference;
    highlights?: Array<Highlight>;
    groupId?: string;
    totalGroupedItems?: any;
    groupedItems?: Array<ItemReference>;
};
type Suggestion = {
    phrase: string;
};
type Suggestions = {
    recentSearchPhrases?: Array<Suggestion>;
    suggestedSearchPhrases?: Array<Suggestion>;
    popularSearchPhrases?: Array<Suggestion>;
};
/**
 * All path parameters that are used by at least one ShopperDiscoverySearch method.
 */
type ShopperDiscoverySearchPathParameters = {
    organizationId?: string;
    channelId?: string;
};
/**
 * All query parameters that are used by at least one ShopperDiscoverySearch method.
 */
type ShopperDiscoverySearchQueryParameters = {
    locale?: string;
    offset?: any;
    limit?: number;
    suggestionTypes?: Array<string>;
    searchText?: string;
};
/**
 * All parameters that are used by ShopperDiscoverySearch.
 */
type ShopperDiscoverySearchParameters = ShopperDiscoverySearchPathParameters & BaseUriParameters & ShopperDiscoverySearchQueryParameters;
/**
* [Shopper Discovery Search](https://developer.salesforce.com/docs/commerce/commerce-api/references?meta=shopper-discovery-search:Summary)
* ==================================
*
* *Einstein-powered product search and search suggestions.*<br />
*
* Simple example:
*
* ```typescript
*   import { ShopperDiscoverySearch } from "commerce-sdk-isomorphic";
*
*   const clientConfig = {
*     parameters: {
*       clientId: "XXXXXX",
*       organizationId: "XXXX",
*       shortCode: "XXX",
*       siteId: "XX"
*     }
*   };
*   const shopperDiscoverySearchClient = new ShopperDiscoverySearch(clientConfig);
* ```
*
* <span style="font-size:.7em; display:block; text-align: right">
* API Version: 1.1.6<br />
* Last Updated: <br />
* </span>
*
* @beta
*
*
*/
declare class ShopperDiscoverySearch<ConfigParameters extends ShopperDiscoverySearchParameters & Record<string, unknown>> {
    clientConfig: ClientConfig<ConfigParameters> & {
        baseUri: string;
    };
    static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/discovery/query/{version}";
    static readonly apiPaths: {
        retrieveResults: string;
        getSuggestions: string;
    };
    constructor(config: ClientConfigInit<ConfigParameters>);
    static readonly paramKeys: {
        readonly retrieveResults: readonly ["organizationId", "channelId", "locale", "offset", "limit"];
        readonly retrieveResultsRequired: readonly ["organizationId", "channelId", "locale"];
        readonly getSuggestions: readonly ["organizationId", "channelId", "suggestionTypes", "searchText", "locale"];
        readonly getSuggestionsRequired: readonly ["organizationId", "channelId", "suggestionTypes", "locale"];
    };
    /**
    * This method retrieves search results for a Channel.
    *
    * If you would like to get a raw Response object use the other retrieveResults function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param channelId - The unique identifier of a Channel.
    * @param locale -
    * @param offset -
    * @param limit - Maximum records to retrieve per request, not to exceed 240. Defaults to 30.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type QueryOutput.
    *
    * @beta
    *
    */
    retrieveResults(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            channelId: string;
            locale: string;
            offset?: any;
            limit?: number;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: QueryInput;
    }>): Promise<QueryOutput>;
    /**
    * This method retrieves search results for a Channel.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param channelId - The unique identifier of a Channel.
    * @param locale -
    * @param offset -
    * @param limit - Maximum records to retrieve per request, not to exceed 240. Defaults to 30.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type QueryOutput otherwise.
    *
    * @beta
    *
    */
    retrieveResults<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            channelId: string;
            locale: string;
            offset?: any;
            limit?: number;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: QueryInput;
    }>, rawResponse?: T): Promise<T extends true ? Response : QueryOutput>;
    /**
    * This method gets suggestions for the user's search activity for a channel.
    *
    * If you would like to get a raw Response object use the other getSuggestions function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param channelId - The unique identifier of a Channel.
    * @param suggestionTypes - The types of suggestions to return.
    * @param searchText - The optional text to retrieve suggestions for.
    * @param locale -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type Suggestions.
    *
    * @beta
    *
    */
    getSuggestions(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            channelId: string;
            suggestionTypes: Array<string>;
            searchText?: string;
            locale: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Suggestions>;
    /**
    * This method gets suggestions for the user's search activity for a channel.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param channelId - The unique identifier of a Channel.
    * @param suggestionTypes - The types of suggestions to return.
    * @param searchText - The optional text to retrieve suggestions for.
    * @param locale -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type Suggestions otherwise.
    *
    * @beta
    *
    */
    getSuggestions<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            channelId: string;
            suggestionTypes: Array<string>;
            searchText?: string;
            locale: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Suggestions>;
}

type shopperDiscoverySearch_AttributeGrouping = AttributeGrouping;
type shopperDiscoverySearch_AttributeSorting = AttributeSorting;
type shopperDiscoverySearch_AttributesQuery = AttributesQuery;
type shopperDiscoverySearch_AuthenticationFailure = AuthenticationFailure;
type shopperDiscoverySearch_AuthorizationFailure = AuthorizationFailure;
type shopperDiscoverySearch_BadRequest = BadRequest;
type shopperDiscoverySearch_BaseError = BaseError;
type shopperDiscoverySearch_BoolFilter = BoolFilter;
type shopperDiscoverySearch_BoolQuery = BoolQuery;
type shopperDiscoverySearch_ClosedObject = ClosedObject;
type shopperDiscoverySearch_CorrectableAttributes = CorrectableAttributes;
type shopperDiscoverySearch_ErrorResponse = ErrorResponse;
type shopperDiscoverySearch_ExpansionAttribute = ExpansionAttribute;
type shopperDiscoverySearch_FacetInput = FacetInput;
type shopperDiscoverySearch_FacetOutput = FacetOutput;
type shopperDiscoverySearch_FacetRequest = FacetRequest;
type shopperDiscoverySearch_Filter = Filter;
type shopperDiscoverySearch_FilteredQuery = FilteredQuery;
type shopperDiscoverySearch_Grouping = Grouping;
type shopperDiscoverySearch_Highlight = Highlight;
type shopperDiscoverySearch_Highlighting = Highlighting;
type shopperDiscoverySearch_InternalServerError = InternalServerError;
type shopperDiscoverySearch_InvalidRequest = InvalidRequest;
type shopperDiscoverySearch_ItemReference = ItemReference;
type shopperDiscoverySearch_MatchAllQuery = MatchAllQuery;
type shopperDiscoverySearch_Money = Money;
type shopperDiscoverySearch_MoneyMnemonic = MoneyMnemonic;
type shopperDiscoverySearch_NestedQuery = NestedQuery;
type shopperDiscoverySearch_NoPropertiesAllowed = NoPropertiesAllowed;
type shopperDiscoverySearch_NonReadableHttpMessage = NonReadableHttpMessage;
type shopperDiscoverySearch_NotFound = NotFound;
type shopperDiscoverySearch_OpenObject = OpenObject;
type shopperDiscoverySearch_PaginatedSearchResult = PaginatedSearchResult;
type shopperDiscoverySearch_PaginatedSearchResultBase = PaginatedSearchResultBase;
type shopperDiscoverySearch_Pagination = Pagination;
type shopperDiscoverySearch_PaginationLinks = PaginationLinks;
type shopperDiscoverySearch_PhraseQuery = PhraseQuery;
type shopperDiscoverySearch_Query = Query;
type shopperDiscoverySearch_QueryFilter = QueryFilter;
type shopperDiscoverySearch_QueryInput = QueryInput;
type shopperDiscoverySearch_QueryOutput = QueryOutput;
type shopperDiscoverySearch_Range2Filter = Range2Filter;
type shopperDiscoverySearch_RangeFacetInput = RangeFacetInput;
type shopperDiscoverySearch_RangeFacetOutput = RangeFacetOutput;
type shopperDiscoverySearch_RangeFilter = RangeFilter;
type shopperDiscoverySearch_RangeRefinement = RangeRefinement;
type shopperDiscoverySearch_RateLimitExceeded = RateLimitExceeded;
type shopperDiscoverySearch_Refinement = Refinement;
type shopperDiscoverySearch_RelevanceSorting = RelevanceSorting;
type shopperDiscoverySearch_ResourceBadRequest = ResourceBadRequest;
type shopperDiscoverySearch_ResourceInvalidRequest = ResourceInvalidRequest;
type shopperDiscoverySearch_ResourceLink = ResourceLink;
type shopperDiscoverySearch_ResourceNonReadableHttpMessage = ResourceNonReadableHttpMessage;
type shopperDiscoverySearch_Result = Result;
type shopperDiscoverySearch_SearchRequest = SearchRequest;
type shopperDiscoverySearch_SearchRequestBase = SearchRequestBase;
type shopperDiscoverySearch_Self = Self;
type shopperDiscoverySearch_SelfResourceLink = SelfResourceLink;
type shopperDiscoverySearch_ServiceUnavailable = ServiceUnavailable;
type shopperDiscoverySearch_ShopperDiscoverySearch<ConfigParameters extends ShopperDiscoverySearchParameters & Record<string, unknown>> = ShopperDiscoverySearch<ConfigParameters>;
declare const shopperDiscoverySearch_ShopperDiscoverySearch: typeof ShopperDiscoverySearch;
type shopperDiscoverySearch_ShopperDiscoverySearchParameters = ShopperDiscoverySearchParameters;
type shopperDiscoverySearch_ShopperDiscoverySearchPathParameters = ShopperDiscoverySearchPathParameters;
type shopperDiscoverySearch_ShopperDiscoverySearchQueryParameters = ShopperDiscoverySearchQueryParameters;
type shopperDiscoverySearch_SimpleSearchResult = SimpleSearchResult;
type shopperDiscoverySearch_SimpleSearchResultBase = SimpleSearchResultBase;
type shopperDiscoverySearch_Sort = Sort;
type shopperDiscoverySearch_Sorting = Sorting;
type shopperDiscoverySearch_SpecifiedPropertiesAllowed = SpecifiedPropertiesAllowed;
type shopperDiscoverySearch_Suggestion = Suggestion;
type shopperDiscoverySearch_Suggestions = Suggestions;
type shopperDiscoverySearch_TermFilter = TermFilter;
type shopperDiscoverySearch_TermQuery = TermQuery;
type shopperDiscoverySearch_TextQuery = TextQuery;
type shopperDiscoverySearch_ValueFacetInput = ValueFacetInput;
type shopperDiscoverySearch_ValueFacetOutput = ValueFacetOutput;
type shopperDiscoverySearch_ValueFacetOutputEntity = ValueFacetOutputEntity;
type shopperDiscoverySearch_ValueRefinement = ValueRefinement;
declare namespace shopperDiscoverySearch {
  export { type shopperDiscoverySearch_AttributeGrouping as AttributeGrouping, type shopperDiscoverySearch_AttributeSorting as AttributeSorting, type shopperDiscoverySearch_AttributesQuery as AttributesQuery, type shopperDiscoverySearch_AuthenticationFailure as AuthenticationFailure, type shopperDiscoverySearch_AuthorizationFailure as AuthorizationFailure, type shopperDiscoverySearch_BadRequest as BadRequest, type shopperDiscoverySearch_BaseError as BaseError, type shopperDiscoverySearch_BoolFilter as BoolFilter, type shopperDiscoverySearch_BoolQuery as BoolQuery, type shopperDiscoverySearch_ClosedObject as ClosedObject, type shopperDiscoverySearch_CorrectableAttributes as CorrectableAttributes, type shopperDiscoverySearch_ErrorResponse as ErrorResponse, type shopperDiscoverySearch_ExpansionAttribute as ExpansionAttribute, type shopperDiscoverySearch_FacetInput as FacetInput, type shopperDiscoverySearch_FacetOutput as FacetOutput, type shopperDiscoverySearch_FacetRequest as FacetRequest, type shopperDiscoverySearch_Filter as Filter, type shopperDiscoverySearch_FilteredQuery as FilteredQuery, type shopperDiscoverySearch_Grouping as Grouping, type shopperDiscoverySearch_Highlight as Highlight, type shopperDiscoverySearch_Highlighting as Highlighting, type shopperDiscoverySearch_InternalServerError as InternalServerError, type shopperDiscoverySearch_InvalidRequest as InvalidRequest, type shopperDiscoverySearch_ItemReference as ItemReference, type shopperDiscoverySearch_MatchAllQuery as MatchAllQuery, type shopperDiscoverySearch_Money as Money, type shopperDiscoverySearch_MoneyMnemonic as MoneyMnemonic, type shopperDiscoverySearch_NestedQuery as NestedQuery, type shopperDiscoverySearch_NoPropertiesAllowed as NoPropertiesAllowed, type shopperDiscoverySearch_NonReadableHttpMessage as NonReadableHttpMessage, type shopperDiscoverySearch_NotFound as NotFound, type shopperDiscoverySearch_OpenObject as OpenObject, type shopperDiscoverySearch_PaginatedSearchResult as PaginatedSearchResult, type shopperDiscoverySearch_PaginatedSearchResultBase as PaginatedSearchResultBase, type shopperDiscoverySearch_Pagination as Pagination, type shopperDiscoverySearch_PaginationLinks as PaginationLinks, type shopperDiscoverySearch_PhraseQuery as PhraseQuery, type shopperDiscoverySearch_Query as Query, type shopperDiscoverySearch_QueryFilter as QueryFilter, type shopperDiscoverySearch_QueryInput as QueryInput, type shopperDiscoverySearch_QueryOutput as QueryOutput, type shopperDiscoverySearch_Range2Filter as Range2Filter, type shopperDiscoverySearch_RangeFacetInput as RangeFacetInput, type shopperDiscoverySearch_RangeFacetOutput as RangeFacetOutput, type shopperDiscoverySearch_RangeFilter as RangeFilter, type shopperDiscoverySearch_RangeRefinement as RangeRefinement, type shopperDiscoverySearch_RateLimitExceeded as RateLimitExceeded, type shopperDiscoverySearch_Refinement as Refinement, type shopperDiscoverySearch_RelevanceSorting as RelevanceSorting, type shopperDiscoverySearch_ResourceBadRequest as ResourceBadRequest, type shopperDiscoverySearch_ResourceInvalidRequest as ResourceInvalidRequest, type shopperDiscoverySearch_ResourceLink as ResourceLink, type shopperDiscoverySearch_ResourceNonReadableHttpMessage as ResourceNonReadableHttpMessage, type shopperDiscoverySearch_Result as Result, type shopperDiscoverySearch_SearchRequest as SearchRequest, type shopperDiscoverySearch_SearchRequestBase as SearchRequestBase, type shopperDiscoverySearch_Self as Self, type shopperDiscoverySearch_SelfResourceLink as SelfResourceLink, type shopperDiscoverySearch_ServiceUnavailable as ServiceUnavailable, shopperDiscoverySearch_ShopperDiscoverySearch as ShopperDiscoverySearch, type shopperDiscoverySearch_ShopperDiscoverySearchParameters as ShopperDiscoverySearchParameters, type shopperDiscoverySearch_ShopperDiscoverySearchPathParameters as ShopperDiscoverySearchPathParameters, type shopperDiscoverySearch_ShopperDiscoverySearchQueryParameters as ShopperDiscoverySearchQueryParameters, type shopperDiscoverySearch_SimpleSearchResult as SimpleSearchResult, type shopperDiscoverySearch_SimpleSearchResultBase as SimpleSearchResultBase, type shopperDiscoverySearch_Sort as Sort, type shopperDiscoverySearch_Sorting as Sorting, type shopperDiscoverySearch_SpecifiedPropertiesAllowed as SpecifiedPropertiesAllowed, type shopperDiscoverySearch_Suggestion as Suggestion, type shopperDiscoverySearch_Suggestions as Suggestions, type shopperDiscoverySearch_TermFilter as TermFilter, type shopperDiscoverySearch_TermQuery as TermQuery, type shopperDiscoverySearch_TextQuery as TextQuery, type shopperDiscoverySearch_ValueFacetInput as ValueFacetInput, type shopperDiscoverySearch_ValueFacetOutput as ValueFacetOutput, type shopperDiscoverySearch_ValueFacetOutputEntity as ValueFacetOutputEntity, type shopperDiscoverySearch_ValueRefinement as ValueRefinement };
}

export { type CorrectableAttributes as $, type AuthenticationFailure as A, type BoolFilter as B, type ClosedObject as C, type BaseError as D, type ErrorResponse as E, type FilteredQuery as F, type NotFound as G, type AuthorizationFailure as H, type InvalidRequest as I, type BadRequest as J, type ServiceUnavailable as K, type InternalServerError as L, type Money as M, type NoPropertiesAllowed as N, type OpenObject as O, type PaginatedSearchResult as P, type QueryFilter as Q, type Range2Filter as R, ShopperDiscoverySearch as S, type TermQuery as T, type RateLimitExceeded as U, type NonReadableHttpMessage as V, type AttributesQuery as W, type Highlighting as X, type PhraseQuery as Y, type QueryOutput as Z, type QueryInput as _, type SimpleSearchResult as a, type Refinement as a0, type ValueRefinement as a1, type RangeRefinement as a2, type ValueFacetOutput as a3, type FacetInput as a4, type RangeFacetInput as a5, type RangeFacetOutput as a6, type ValueFacetInput as a7, type FacetRequest as a8, type ValueFacetOutputEntity as a9, type FacetOutput as aa, type Sorting as ab, type AttributeSorting as ac, type RelevanceSorting as ad, type Grouping as ae, type AttributeGrouping as af, type ItemReference as ag, type Highlight as ah, type Result as ai, type Suggestion as aj, type Suggestions as ak, type ShopperDiscoverySearchPathParameters as al, type ShopperDiscoverySearchQueryParameters as am, type ShopperDiscoverySearchParameters as an, type SearchRequest as b, type SpecifiedPropertiesAllowed as c, type PaginatedSearchResultBase as d, type MatchAllQuery as e, type Query as f, type TermFilter as g, type TextQuery as h, type BoolQuery as i, type SimpleSearchResultBase as j, type NestedQuery as k, type Filter as l, type Sort as m, type RangeFilter as n, type SearchRequestBase as o, type MoneyMnemonic as p, type ExpansionAttribute as q, type PaginationLinks as r, shopperDiscoverySearch as s, type ResourceLink as t, type Self as u, type SelfResourceLink as v, type Pagination as w, type ResourceBadRequest as x, type ResourceNonReadableHttpMessage as y, type ResourceInvalidRequest as z };

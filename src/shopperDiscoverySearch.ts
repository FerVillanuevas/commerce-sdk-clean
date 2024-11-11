import ClientConfig, { ClientConfigInit } from "./clientConfig";
// Must not import from ./helpers/index to avoid circular dependency via ShopperLogin
import { isBrowser } from "./helpers/environment";
import { doFetch } from "./helpers/fetchHelper";
import type {
  BaseUriParameters,
  CompositeParameters,
  RequireParametersUnlessAllAreOptional
} from "./helpers/types";
import TemplateURL from "./templateUrl";
import { USER_AGENT_HEADER, USER_AGENT_VALUE } from "./version";

export type ErrorResponse = {
  type: string;
  title?: string;
  detail?: string;
  instance?: string;
} & { [key: string]: any }

  type EtagResponse = { [key: string]: any }
type RateLimited3 = { [key: string]: any }
type SyncCreated = { [key: string]: any }
type DateConditionalRequest = { [key: string]: any }
type RateLimited5 = { [key: string]: any }
type EtagConditionalRequest = { [key: string]: any }
type AsyncCreated = { [key: string]: any }
type RateLimited = { [key: string]: any }
type RateLimited2 = { [key: string]: any }
type OffsetPaginated = { [key: string]: any }
type RateLimited4 = { [key: string]: any }
export type Money = {
  currencyMnemonic?: string;
  value?: number;
} & { [key: string]: any }

  export type SimpleSearchResult = {
  limit: number;
  hits?: Array<object>;
  offset: any;
  total: any;
} & { [key: string]: any }

  export type SearchRequest = {
  limit?: number;
  query: any;
  sorts?: Array<Sort>;
  offset?: any;
} & { [key: string]: any }

  export type PaginatedSearchResult = {
  query: any;
  sorts?: Array<Sort>;
  limit: number;
  hits?: Array<object>;
  offset: any;
  total: any;
} & { [key: string]: any }

  export type ClosedObject = {
} & { [key: string]: any }

  export type OpenObject = {
} & { [key: string]: any }

  type QueryParamsLimit = { [key: string]: any }
type QueryParamsOffset = { [key: string]: any }
type SiteSpecific = { [key: string]: any }
export type NoPropertiesAllowed = {
}
  export type SpecifiedPropertiesAllowed = {
} & { [key: string]: any }

  export type BoolFilter = {
  filters?: Array<any>;
  operator: string;
} & { [key: string]: any }

  export type PaginatedSearchResultBase = {
  query: any;
  sorts?: Array<Sort>;
  limit: number;
  hits?: Array<object>;
  offset: any;
  total: any;
} & { [key: string]: any }

  export type MatchAllQuery = {
} & { [key: string]: any }

  export type FilteredQuery = {
  filter: any;
  query: any;
} & { [key: string]: any }

  export type QueryFilter = {
  query: any;
} & { [key: string]: any }

  export type Query = {
  boolQuery?: BoolQuery;
  filteredQuery?: FilteredQuery;
  matchAllQuery?: MatchAllQuery;
  nestedQuery?: NestedQuery;
  termQuery?: TermQuery;
  textQuery?: TextQuery;
} & { [key: string]: any }

  export type TermQuery = {
  fields: Array<string>;
  operator: string;
  values?: Array<any>;
} & { [key: string]: any }

  export type TermFilter = {
  field: string;
  operator: string;
  values?: Array<any>;
} & { [key: string]: any }

  export type TextQuery = {
  fields: Array<string>;
  searchPhrase: string;
} & { [key: string]: any }

  export type Range2Filter = {
  filterMode?: string;
  fromField: string;
  fromInclusive?: boolean;
  fromValue?: any;
  toField: string;
  toInclusive?: boolean;
  toValue?: any;
} & { [key: string]: any }

  export type BoolQuery = {
  must?: Array<any>;
  mustNot?: Array<any>;
  should?: Array<any>;
} & { [key: string]: any }

  export type SimpleSearchResultBase = {
  limit: number;
  hits?: Array<object>;
  offset: any;
  total: any;
} & { [key: string]: any }

  export type NestedQuery = {
  path: string;
  query: any;
  scoreMode?: string;
} & { [key: string]: any }

  export type Filter = {
  boolFilter?: BoolFilter;
  queryFilter?: QueryFilter;
  range2Filter?: Range2Filter;
  rangeFilter?: RangeFilter;
  termFilter?: TermFilter;
} & { [key: string]: any }

  export type Sort = {
  field: string;
  sortOrder?: string;
} & { [key: string]: any }

  export type RangeFilter = {
  field: string;
  from?: any;
  fromInclusive?: boolean;
  to?: any;
  toInclusive?: boolean;
} & { [key: string]: any }

  export type SearchRequestBase = {
  limit?: number;
  query: any;
  sorts?: Array<Sort>;
  offset?: any;
} & { [key: string]: any }

  export type MoneyMnemonic = {
  currencyMnemonic?: string;
  value?: number;
} & { [key: string]: any }

  export type ExpansionAttribute = {
  attributeId: string;
  path: string;
  value: any;
} & { [key: string]: any }

  export type PaginationLinks = {
  prev?: Self;
  self: Self;
  next?: Self;
} & { [key: string]: any }

  export type ResourceLink = {
  self: Self;
} & { [key: string]: any }

  type Traceable = { [key: string]: any }
type Filterable = { [key: string]: any }
type CommonErrors = { [key: string]: any }
type ResourceCommonErrors = { [key: string]: any }
export type Self = {
  href: string;
}
  export type SelfResourceLink = {
  self: Self;
}
  export type Pagination = {
  prev?: Self;
  self: Self;
  next?: Self;
}
  // This is a known deviation from the RAML definition, required due to limitations in
// the SDK generation. The full definition will be included in the next major release.
export type ResourceBadRequest = { [key: string]: any };
export type ResourceNonReadableHttpMessage = {
}
  export type ResourceInvalidRequest = {
}
  export type AuthenticationFailure = {
}
  export type BaseError = {
  type: string;
  title?: string;
  detail?: string;
  instance?: string;
}
  export type NotFound = {
}
  export type InvalidRequest = {
}
  export type AuthorizationFailure = {
}
  export type BadRequest = {
}
  export type ServiceUnavailable = {
}
  export type InternalServerError = {
}
  export type RateLimitExceeded = {
  requestLimit: any;
  type: string;
  title?: string;
  detail?: string;
  instance?: string;
}
  export type NonReadableHttpMessage = {
}
  export type AttributesQuery = {
  value: {
  attributes: Array<string>;
  phrase: string;
} & { [key: string]: any }
;
  queryType: string;
  correctableAttributes?: CorrectableAttributes;
  highlighting?: Highlighting;
}
  export type Highlighting = {
  attributes: Array<string>;
} & { [key: string]: any }

  export type PhraseQuery = {
  value: string;
  queryType: string;
  correctableAttributes?: CorrectableAttributes;
  highlighting?: Highlighting;
}
  export type QueryOutput = {
  hits: Array<Result>;
  facets?: Array<FacetOutput>;
  links: PaginationLinks;
  limit: number;
  offset: any;
  total: any;
}
  export type QueryInput = {
  query?: Query;
  refinements?: Array<Refinement>;
  returnedAttributes?: Array<string>;
  grouping?: Grouping;
  facets?: Array<FacetInput>;
  facetRequest?: FacetRequest;
  sorting: Sorting;
}
  export type CorrectableAttributes = {
  attributes: Array<string>;
} & { [key: string]: any }

  export type Refinement = {
  attributeId: string;
  refinementType: string;
} & { [key: string]: any }

  export type ValueRefinement = {
  values: Array<any>;
  attributeId: string;
  refinementType: string;
}
  export type RangeRefinement = {
  min: any;
  max: any;
  attributeId: string;
  refinementType: string;
}
  export type ValueFacetOutput = {
  values?: Array<ValueFacetOutputEntity>;
  attributeId: string;
  facetType: string;
}
  export type FacetInput = {
  attributeId: string;
  facetType: string;
} & { [key: string]: any }

  export type RangeFacetInput = {
}
  export type RangeFacetOutput = {
  min: any;
  max: any;
  attributeId: string;
  facetType: string;
}
  export type ValueFacetInput = {
  mask?: Array<string>;
  attributeId: string;
  facetType: string;
}
  export type FacetRequest = {
  facetLimit?: any;
  facets?: Array<FacetInput>;
} & { [key: string]: any }

  export type ValueFacetOutputEntity = {
  value: string;
  count: any;
} & { [key: string]: any }

  export type FacetOutput = {
  attributeId: string;
  facetType: string;
} & { [key: string]: any }

  export type Sorting = {
  sortType: string;
} & { [key: string]: any }

  export type AttributeSorting = {
  attributeId: string;
  direction: string;
  sortType: string;
}
  export type RelevanceSorting = {
}
  export type Grouping = {
  groupType: string;
} & { [key: string]: any }

  export type AttributeGrouping = {
  attributeId: string;
  returnedAttributes?: Array<string>;
  groupType: string;
}
  export type ItemReference = {
  itemId: string;
  attributes?: Array<ExpansionAttribute>;
} & { [key: string]: any }

  export type Highlight = {
  attributeId: string;
  value: string;
} & { [key: string]: any }

  export type Result = {
  matchedItem: ItemReference;
  highlights?: Array<Highlight>;
  groupId?: string;
  totalGroupedItems?: any;
  groupedItems?: Array<ItemReference>;
}
  export type Suggestion = {
  phrase: string;
}
  export type Suggestions = {
  recentSearchPhrases?: Array<Suggestion>;
  suggestedSearchPhrases?: Array<Suggestion>;
  popularSearchPhrases?: Array<Suggestion>;
}
  
/**
 * All path parameters that are used by at least one ShopperDiscoverySearch method.
 */
export type ShopperDiscoverySearchPathParameters = {
  organizationId?: string;
  channelId?: string;
}
/**
 * All query parameters that are used by at least one ShopperDiscoverySearch method.
 */
export type ShopperDiscoverySearchQueryParameters = {
  locale?: string;
  offset?: any;
  limit?: number;
  suggestionTypes?: Array<string>;
  searchText?: string;
}

/**
 * All parameters that are used by ShopperDiscoverySearch.
 */
export type ShopperDiscoverySearchParameters = ShopperDiscoverySearchPathParameters & BaseUriParameters & ShopperDiscoverySearchQueryParameters;

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
export class ShopperDiscoverySearch<ConfigParameters extends ShopperDiscoverySearchParameters & Record<string, unknown>> {
  // baseUri is not required on ClientConfig, but we know that we provide one in the class constructor
  public clientConfig: ClientConfig<ConfigParameters> & { baseUri: string };

  static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/discovery/query/{version}";

  static readonly apiPaths = {
    retrieveResults: "/organizations/{organizationId}/channels/{channelId}/results",
    getSuggestions: "/organizations/{organizationId}/channels/{channelId}/suggestions",
  };

  constructor(config: ClientConfigInit<ConfigParameters>) {
    const cfg = {...config}
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    // Type assertion is safe because ^^^
    this.clientConfig = new ClientConfig(cfg) as ClientConfig<ConfigParameters> & { baseUri: string };
  }

  static readonly paramKeys = {
    retrieveResults: [
      'organizationId',
      'channelId',
      'locale',
      'offset',
      'limit',
    ],
    retrieveResultsRequired: [
      'organizationId',
      'channelId',
      'locale',
    ],
    getSuggestions: [
      'organizationId',
      'channelId',
      'suggestionTypes',
      'searchText',
      'locale',
    ],
    getSuggestionsRequired: [
      'organizationId',
      'channelId',
      'suggestionTypes',
      'locale',
    ],
  } as const;
  
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
      retrieveResults(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            channelId: string
            locale: string
            offset?: any
            limit?: number
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: QueryInput
        }>
      ): Promise<QueryOutput>;
  
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
      retrieveResults<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            channelId: string
            locale: string
            offset?: any
            limit?: number
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: QueryInput
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : QueryOutput>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type QueryOutput otherwise.
      * 
      * @beta
      * 
      */
      async retrieveResults(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            channelId: string
            locale: string
            offset?: any
            limit?: number
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: QueryInput
        }>,
        rawResponse?: boolean
      ): Promise<Response | QueryOutput> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperDiscoverySearchPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
        if (optionParams["channelId"] !== undefined) {
          pathParams["channelId"] = optionParams["channelId"];
        } else if (configParams["channelId"] !== undefined) {
          pathParams["channelId"] = configParams["channelId"];
        }
        else {
          throw new Error('Missing required path parameter: channelId');
        }
  
        const queryParams: ShopperDiscoverySearchQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["locale"] !== undefined) {
          queryParams["locale"] = optionParams["locale"];
        } else if (configParams["locale"] !== undefined) {
          queryParams["locale"] = configParams["locale"];
        }
        else {
          throw new Error('Missing required query parameter: locale');
        }
        if (optionParams["offset"] !== undefined) {
          queryParams["offset"] = optionParams["offset"];
        } else if (configParams["offset"] !== undefined) {
          queryParams["offset"] = configParams["offset"];
        }
        if (optionParams["limit"] !== undefined) {
          queryParams["limit"] = optionParams["limit"];
        } else if (configParams["limit"] !== undefined) {
          queryParams["limit"] = configParams["limit"];
        }
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for retrieveResults: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/channels/{channelId}/results",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | QueryOutput;
      }
  
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
      getSuggestions(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            channelId: string
            suggestionTypes: Array<string>
            searchText?: string
            locale: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<Suggestions>;
  
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
      getSuggestions<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            channelId: string
            suggestionTypes: Array<string>
            searchText?: string
            locale: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : Suggestions>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Suggestions otherwise.
      * 
      * @beta
      * 
      */
      async getSuggestions(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            channelId: string
            suggestionTypes: Array<string>
            searchText?: string
            locale: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | Suggestions> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperDiscoverySearchPathParameters & Required<BaseUriParameters> = {
          shortCode: configParams.shortCode,
          version: configParams.version || "v1"
        };
        if (optionParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = optionParams["organizationId"];
        } else if (configParams["organizationId"] !== undefined) {
          pathParams["organizationId"] = configParams["organizationId"];
        }
        else {
          throw new Error('Missing required path parameter: organizationId');
        }
        if (optionParams["channelId"] !== undefined) {
          pathParams["channelId"] = optionParams["channelId"];
        } else if (configParams["channelId"] !== undefined) {
          pathParams["channelId"] = configParams["channelId"];
        }
        else {
          throw new Error('Missing required path parameter: channelId');
        }
  
        const queryParams: ShopperDiscoverySearchQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["suggestionTypes"] !== undefined) {
          queryParams["suggestionTypes"] = optionParams["suggestionTypes"];
        } else if (configParams["suggestionTypes"] !== undefined) {
          queryParams["suggestionTypes"] = configParams["suggestionTypes"];
        }
        else {
          throw new Error('Missing required query parameter: suggestionTypes');
        }
        if (optionParams["searchText"] !== undefined) {
          queryParams["searchText"] = optionParams["searchText"];
        } else if (configParams["searchText"] !== undefined) {
          queryParams["searchText"] = configParams["searchText"];
        }
        if (optionParams["locale"] !== undefined) {
          queryParams["locale"] = optionParams["locale"];
        } else if (configParams["locale"] !== undefined) {
          queryParams["locale"] = configParams["locale"];
        }
        else {
          throw new Error('Missing required query parameter: locale');
        }
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for getSuggestions: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/channels/{channelId}/suggestions",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          ...this.clientConfig.headers,
          ...options?.headers
        };
  
        if (!isBrowser) {
          // Browsers forbid setting a custom user-agent header
          headers[USER_AGENT_HEADER] = [headers[USER_AGENT_HEADER], USER_AGENT_VALUE].join(" ");
        }
  
        const response = await doFetch(
          url.toString(),
          {
            method: "GET",
            headers,
            
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | Suggestions;
      }
}

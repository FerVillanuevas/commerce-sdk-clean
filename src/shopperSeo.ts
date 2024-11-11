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

type LocaleSpecific = { [key: string]: any }
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
  query: Query;
  sorts?: Array<Sort>;
  offset?: any;
} & { [key: string]: any }

  export type PropertyDefinition = {
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
} & { [key: string]: any }

  export type LocalizedString = {
} & { [key: string]: any }

  export type PaginatedSearchResult = {
  query: Query;
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
type Selectable = { [key: string]: any }
export type NoPropertiesAllowed = {
}
  export type SpecifiedPropertiesAllowed = {
} & { [key: string]: any }

  export type BoolFilter = {
  filters?: Array<Filter>;
  operator: string;
} & { [key: string]: any }

  export type PaginatedSearchResultBase = {
  query: Query;
  sorts?: Array<Sort>;
  limit: number;
  hits?: Array<object>;
  offset: any;
  total: any;
} & { [key: string]: any }

  export type MatchAllQuery = {
} & { [key: string]: any }

  export type FilteredQuery = {
  filter: Filter;
  query: Query;
} & { [key: string]: any }

  export type QueryFilter = {
  query: Query;
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
  must?: Array<Query>;
  mustNot?: Array<Query>;
  should?: Array<Query>;
} & { [key: string]: any }

  export type SimpleSearchResultBase = {
  limit: number;
  hits?: Array<object>;
  offset: any;
  total: any;
} & { [key: string]: any }

  export type NestedQuery = {
  path: string;
  query: Query;
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
  query: Query;
  sorts?: Array<Sort>;
  offset?: any;
} & { [key: string]: any }

  export type MoneyMnemonic = {
  currencyMnemonic?: string;
  value?: number;
} & { [key: string]: any }

  export type L10nString = {
} & { [key: string]: any }

  export type AttributeDefinition = {
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
}
  export type PropertyValueDefinition = {
  description: L10nString;
  displayValue: L10nString;
  id: string;
  position?: number;
  value: string;
}
  export type UrlMapping = {
  resourceType?: string;
  resourceSubType?: string;
  resourceId?: string;
  refinements?: {
} & { [key: string]: any }
;
  statusCode?: number;
  destinationUrl?: string;
  copySourceParams?: boolean;
  additionalUrlParams?: string;
  productCategoryId?: string;
} & { [key: string]: any }

  type BadRequest = { [key: string]: any }
type Unauthorized = { [key: string]: any }
type NotFound = { [key: string]: any }
export type ErrorResponse = {
  type: string;
  title?: string;
  detail?: string;
  instance?: string;
} & { [key: string]: any }

  export type ChangeControlled = {
  creationDate?: any;
  modificationDate?: any;
  createdBy?: string;
  lastModifiedBy?: string;
} & { [key: string]: any }

  type DateRangeFilter = { [key: string]: any }
type EtagResponse = { [key: string]: any }
type IntegerRangeFilter = { [key: string]: any }
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
type NumericRangeFilter = { [key: string]: any }
type DatetimeRangeFilter = { [key: string]: any }
export type ChangeControlledDataType = {
  creationDate?: any;
  modificationDate?: any;
  createdBy?: string;
  lastModifiedBy?: string;
} & { [key: string]: any }

  export type Error = {
  type: string;
  title?: string;
  detail?: string;
  instance?: string;
} & { [key: string]: any }

  
/**
 * All path parameters that are used by at least one ShopperSeo method.
 */
export type ShopperSeoPathParameters = {
  organizationId?: string;
}
/**
 * All query parameters that are used by at least one ShopperSeo method.
 */
export type ShopperSeoQueryParameters = {
  urlSegment?: string;
  siteId?: string;
  locale?: string;
}

/**
 * All parameters that are used by ShopperSeo.
 */
export type ShopperSeoParameters = ShopperSeoPathParameters & BaseUriParameters & ShopperSeoQueryParameters;

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
export class ShopperSeo<ConfigParameters extends ShopperSeoParameters & Record<string, unknown>> {
  // baseUri is not required on ClientConfig, but we know that we provide one in the class constructor
  public clientConfig: ClientConfig<ConfigParameters> & { baseUri: string };

  static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/site/shopper-seo/{version}";

  static readonly apiPaths = {
    getUrlMapping: "/organizations/{organizationId}/url-mapping",
  };

  constructor(config: ClientConfigInit<ConfigParameters>) {
    const cfg = {...config}
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    // Type assertion is safe because ^^^
    this.clientConfig = new ClientConfig(cfg) as ClientConfig<ConfigParameters> & { baseUri: string };
  }

  static readonly paramKeys = {
    getUrlMapping: [
      'organizationId',
      'urlSegment',
      'siteId',
      'locale',
    ],
    getUrlMappingRequired: [
      'organizationId',
      'urlSegment',
      'siteId',
    ],
  } as const;
  
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
      getUrlMapping(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            urlSegment: string
            siteId: string
            locale?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<UrlMapping>;
  
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
      getUrlMapping<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            urlSegment: string
            siteId: string
            locale?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : UrlMapping>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type UrlMapping otherwise.
      * 
      */
      async getUrlMapping(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            urlSegment: string
            siteId: string
            locale?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | UrlMapping> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperSeoPathParameters & Required<BaseUriParameters> = {
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
  
        const queryParams: ShopperSeoQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["urlSegment"] !== undefined) {
          queryParams["urlSegment"] = optionParams["urlSegment"];
        } else if (configParams["urlSegment"] !== undefined) {
          queryParams["urlSegment"] = configParams["urlSegment"];
        }
        else {
          throw new Error('Missing required query parameter: urlSegment');
        }
        if (optionParams["siteId"] !== undefined) {
          queryParams["siteId"] = optionParams["siteId"];
        } else if (configParams["siteId"] !== undefined) {
          queryParams["siteId"] = configParams["siteId"];
        }
        else {
          throw new Error('Missing required query parameter: siteId');
        }
        if (optionParams["locale"] !== undefined) {
          queryParams["locale"] = optionParams["locale"];
        } else if (configParams["locale"] !== undefined) {
          queryParams["locale"] = configParams["locale"];
        }
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for getUrlMapping: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/url-mapping",
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
  
        return response as Response | UrlMapping;
      }
}

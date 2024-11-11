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

export type ShopperContext = {
  effectiveDateTime?: any;
  sourceCode?: any;
  customerGroupIds?: Array<string>;
  customQualifiers?: {
} & { [key: string]: any }
;
  assignmentQualifiers?: {
} & { [key: string]: any }
;
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
} & { [key: string]: any }
;
} & { [key: string]: any }

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
type RangeFilter = { [key: string]: any }
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
  
/**
 * All path parameters that are used by at least one ShopperContexts method.
 */
export type ShopperContextsPathParameters = {
  organizationId?: string;
  usid?: string;
}
/**
 * All query parameters that are used by at least one ShopperContexts method.
 */
export type ShopperContextsQueryParameters = {
  siteId?: string;
  evaluateContextWithClientIp?: boolean;
}

/**
 * All parameters that are used by ShopperContexts.
 */
export type ShopperContextsParameters = ShopperContextsPathParameters & BaseUriParameters & ShopperContextsQueryParameters;

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
export class ShopperContexts<ConfigParameters extends ShopperContextsParameters & Record<string, unknown>> {
  // baseUri is not required on ClientConfig, but we know that we provide one in the class constructor
  public clientConfig: ClientConfig<ConfigParameters> & { baseUri: string };

  static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/shopper/shopper-context/{version}";

  static readonly apiPaths = {
    getShopperContext: "/organizations/{organizationId}/shopper-context/{usid}",
    createShopperContext: "/organizations/{organizationId}/shopper-context/{usid}",
    deleteShopperContext: "/organizations/{organizationId}/shopper-context/{usid}",
    updateShopperContext: "/organizations/{organizationId}/shopper-context/{usid}",
  };

  constructor(config: ClientConfigInit<ConfigParameters>) {
    const cfg = {...config}
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    // Type assertion is safe because ^^^
    this.clientConfig = new ClientConfig(cfg) as ClientConfig<ConfigParameters> & { baseUri: string };
  }

  static readonly paramKeys = {
    getShopperContext: [
      'organizationId',
      'usid',
      'siteId',
    ],
    getShopperContextRequired: [
      'organizationId',
      'usid',
    ],
    createShopperContext: [
      'organizationId',
      'usid',
      'siteId',
      'evaluateContextWithClientIp',
    ],
    createShopperContextRequired: [
      'organizationId',
      'usid',
    ],
    deleteShopperContext: [
      'organizationId',
      'usid',
      'siteId',
    ],
    deleteShopperContextRequired: [
      'organizationId',
      'usid',
    ],
    updateShopperContext: [
      'organizationId',
      'usid',
      'siteId',
      'evaluateContextWithClientIp',
    ],
    updateShopperContextRequired: [
      'organizationId',
      'usid',
    ],
  } as const;
  
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
      getShopperContext(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            usid: string
            siteId?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<ShopperContext>;
  
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
      getShopperContext<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            usid: string
            siteId?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : ShopperContext>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type ShopperContext otherwise.
      * 
      */
      async getShopperContext(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            usid: string
            siteId?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | ShopperContext> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperContextsPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["usid"] !== undefined) {
          pathParams["usid"] = optionParams["usid"];
        } else if (configParams["usid"] !== undefined) {
          pathParams["usid"] = configParams["usid"];
        }
        else {
          throw new Error('Missing required path parameter: usid');
        }
  
        const queryParams: ShopperContextsQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["siteId"] !== undefined) {
          queryParams["siteId"] = optionParams["siteId"];
        } else if (configParams["siteId"] !== undefined) {
          queryParams["siteId"] = configParams["siteId"];
        }
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for getShopperContext: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/shopper-context/{usid}",
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
  
        return response as Response | ShopperContext;
      }
  
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
      createShopperContext(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            usid: string
            siteId?: string
            evaluateContextWithClientIp?: boolean
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: ShopperContext
        }>
      ): Promise<void | void>;
  
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
      createShopperContext<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            usid: string
            siteId?: string
            evaluateContextWithClientIp?: boolean
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: ShopperContext
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : void | void>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type void | void otherwise.
      * 
      */
      async createShopperContext(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            usid: string
            siteId?: string
            evaluateContextWithClientIp?: boolean
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: ShopperContext
        }>,
        rawResponse?: boolean
      ): Promise<Response | void | void> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperContextsPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["usid"] !== undefined) {
          pathParams["usid"] = optionParams["usid"];
        } else if (configParams["usid"] !== undefined) {
          pathParams["usid"] = configParams["usid"];
        }
        else {
          throw new Error('Missing required path parameter: usid');
        }
  
        const queryParams: ShopperContextsQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["siteId"] !== undefined) {
          queryParams["siteId"] = optionParams["siteId"];
        } else if (configParams["siteId"] !== undefined) {
          queryParams["siteId"] = configParams["siteId"];
        }
        if (optionParams["evaluateContextWithClientIp"] !== undefined) {
          queryParams["evaluateContextWithClientIp"] = optionParams["evaluateContextWithClientIp"];
        } else if (configParams["evaluateContextWithClientIp"] !== undefined) {
          queryParams["evaluateContextWithClientIp"] = configParams["evaluateContextWithClientIp"];
        }
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for createShopperContext: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/shopper-context/{usid}",
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
            method: "PUT",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | void | void;
      }
  
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
      deleteShopperContext(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            usid: string
            siteId?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<void>;
  
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
      deleteShopperContext<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            usid: string
            siteId?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : void>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
      * 
      */
      async deleteShopperContext(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            usid: string
            siteId?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | void> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperContextsPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["usid"] !== undefined) {
          pathParams["usid"] = optionParams["usid"];
        } else if (configParams["usid"] !== undefined) {
          pathParams["usid"] = configParams["usid"];
        }
        else {
          throw new Error('Missing required path parameter: usid');
        }
  
        const queryParams: ShopperContextsQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["siteId"] !== undefined) {
          queryParams["siteId"] = optionParams["siteId"];
        } else if (configParams["siteId"] !== undefined) {
          queryParams["siteId"] = configParams["siteId"];
        }
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for deleteShopperContext: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/shopper-context/{usid}",
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
            method: "DELETE",
            headers,
            
          },
          this.clientConfig,
          rawResponse
        )
  
        if (rawResponse) {
          return response as Response;
        }
      }
  
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
      updateShopperContext(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            usid: string
            siteId?: string
            evaluateContextWithClientIp?: boolean
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: ShopperContext
        }>
      ): Promise<ShopperContext>;
  
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
      updateShopperContext<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            usid: string
            siteId?: string
            evaluateContextWithClientIp?: boolean
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: ShopperContext
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : ShopperContext>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type ShopperContext otherwise.
      * 
      */
      async updateShopperContext(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            usid: string
            siteId?: string
            evaluateContextWithClientIp?: boolean
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: ShopperContext
        }>,
        rawResponse?: boolean
      ): Promise<Response | ShopperContext> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperContextsPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["usid"] !== undefined) {
          pathParams["usid"] = optionParams["usid"];
        } else if (configParams["usid"] !== undefined) {
          pathParams["usid"] = configParams["usid"];
        }
        else {
          throw new Error('Missing required path parameter: usid');
        }
  
        const queryParams: ShopperContextsQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["siteId"] !== undefined) {
          queryParams["siteId"] = optionParams["siteId"];
        } else if (configParams["siteId"] !== undefined) {
          queryParams["siteId"] = configParams["siteId"];
        }
        if (optionParams["evaluateContextWithClientIp"] !== undefined) {
          queryParams["evaluateContextWithClientIp"] = optionParams["evaluateContextWithClientIp"];
        } else if (configParams["evaluateContextWithClientIp"] !== undefined) {
          queryParams["evaluateContextWithClientIp"] = configParams["evaluateContextWithClientIp"];
        }
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for updateShopperContext: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/shopper-context/{usid}",
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
            method: "PATCH",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | ShopperContext;
      }
}

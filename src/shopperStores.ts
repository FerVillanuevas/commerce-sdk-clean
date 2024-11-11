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

  export type StoreResult = {
  limit: number;
  data: Array<Store>;
  offset?: any;
  total: any;
} & { [key: string]: any }

  export type Store = {
  address1?: string;
  address2?: string;
  city?: string;
  countryCode?: string;
  distance?: number;
  distanceUnit?: string;
  email?: string;
  fax?: string;
  id: string;
  image?: string;
  inventoryId?: string;
  latitude?: number;
  longitude?: number;
  name?: string;
  phone?: string;
  posEnabled?: boolean;
  postalCode?: string;
  stateCode?: string;
  storeEvents?: string;
  storeHours?: string;
  storeLocatorEnabled?: boolean;
} & { [key: string]: any }

  type BadRequest = { [key: string]: any }
type Unauthorized = { [key: string]: any }

/**
 * All path parameters that are used by at least one ShopperStores method.
 */
export type ShopperStoresPathParameters = {
  organizationId?: string;
}
/**
 * All query parameters that are used by at least one ShopperStores method.
 */
export type ShopperStoresQueryParameters = {
  countryCode?: string;
  distanceUnit?: string;
  latitude?: number;
  longitude?: number;
  maxDistance?: number;
  postalCode?: string;
  siteId?: string;
  locale?: string;
  offset?: any;
  limit?: number;
  ids?: string;
}

/**
 * All parameters that are used by ShopperStores.
 */
export type ShopperStoresParameters = ShopperStoresPathParameters & BaseUriParameters & ShopperStoresQueryParameters;

/**
* [Shopper Stores](https://developer.salesforce.com/docs/commerce/commerce-api/references?meta=shopper-stores:Summary)
* ==================================
*
* *Search for a specific store or stores in an area.*<br />
*
* Simple example:
*
* ```typescript
*   import { ShopperStores } from "commerce-sdk-isomorphic";
*
*   const clientConfig = {
*     parameters: {
*       clientId: "XXXXXX",
*       organizationId: "XXXX",
*       shortCode: "XXX",
*       siteId: "XX"
*     }
*   };
*   const shopperStoresClient = new ShopperStores(clientConfig);
* ```
*
* <span style="font-size:.7em; display:block; text-align: right">
* API Version: 1.0.15<br />
* Last Updated: <br />
* </span>
* 
* @beta
* 
*
*/
export class ShopperStores<ConfigParameters extends ShopperStoresParameters & Record<string, unknown>> {
  // baseUri is not required on ClientConfig, but we know that we provide one in the class constructor
  public clientConfig: ClientConfig<ConfigParameters> & { baseUri: string };

  static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/store/shopper-stores/{version}";

  static readonly apiPaths = {
    searchStores: "/organizations/{organizationId}/store-search",
    getStores: "/organizations/{organizationId}/stores",
  };

  constructor(config: ClientConfigInit<ConfigParameters>) {
    const cfg = {...config}
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    // Type assertion is safe because ^^^
    this.clientConfig = new ClientConfig(cfg) as ClientConfig<ConfigParameters> & { baseUri: string };
  }

  static readonly paramKeys = {
    searchStores: [
      'organizationId',
      'countryCode',
      'distanceUnit',
      'latitude',
      'longitude',
      'maxDistance',
      'postalCode',
      'siteId',
      'locale',
      'offset',
      'limit',
    ],
    searchStoresRequired: [
      'organizationId',
      'siteId',
    ],
    getStores: [
      'organizationId',
      'siteId',
      'ids',
      'locale',
    ],
    getStoresRequired: [
      'organizationId',
      'siteId',
      'ids',
    ],
  } as const;
  
      /**
      * This resource retrieves a list of stores for the given site that are within a configured distance of a geolocation:
  - The distance is interpreted either in miles or kilometers, depending on the `distanceUnit` input parameter. 
  - The location is specified by either directly providing a latitude and longitude coordinate pair, or by providing a country and a postal code. If a postal code is passed, the resource looks in the system's geolocation mappings in Business Manager to find the coordinates for this postal code. If no matching geolocation is found, the resource returns an empty list of stores. If coordinates are passed, the values for country and postal code are ignored. 
  
    To verify site latitude and longitude information in Business Manager:
    - Navigate to **Merchant Tools -\> Online Marketing -\> Stores**. 
    - Select the applicable site.
    - In the **Address** tab, verify that valid information is provided in the following fields: **Address**, **City**, **Postal Code**, **State**, and **Country**. For latitude and longitude values, you can manually enter values or provide all field values to auto-populate **Latitude** and **Longitude**. You must provide valid values for all of the previous fields for latitude and longitude to auto-populate **Latitude** and **Longitude** values.
  
      *
      * If you would like to get a raw Response object use the other searchStores function.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param countryCode - The two letter ISO country code, such as "US". This value is required when a postalCode is provided.
      * @param distanceUnit - The distance unit. Supported values are "mi" (miles) and "km" (kilometers). The default is "km".
      * @param latitude - The geographical latitude to search for stores (value range -90.00 .. 90.00). This value is required when a longitude is provided.
      * @param longitude - The geographical longitude to search for stores (value range -180.00 .. 180.00). You must provide a longitude when a latitude is provided.
      * @param maxDistance - The area (radius) in distanceUnit where stores will be searched.
      * @param postalCode - The postal code, such as "84121". You must provide a countryCode when a postalCode is provided.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param offset - 
      * @param limit - Maximum records to retrieve per request, not to exceed 200. Defaults to 25.
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      *
      * @returns A promise of type StoreResult.
      * 
      * @beta
      * 
      */
      searchStores(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            countryCode?: string
            distanceUnit?: string
            latitude?: number
            longitude?: number
            maxDistance?: number
            postalCode?: string
            siteId: string
            locale?: string
            offset?: any
            limit?: number
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<StoreResult>;
  
      /**
      * This resource retrieves a list of stores for the given site that are within a configured distance of a geolocation:
  - The distance is interpreted either in miles or kilometers, depending on the `distanceUnit` input parameter. 
  - The location is specified by either directly providing a latitude and longitude coordinate pair, or by providing a country and a postal code. If a postal code is passed, the resource looks in the system's geolocation mappings in Business Manager to find the coordinates for this postal code. If no matching geolocation is found, the resource returns an empty list of stores. If coordinates are passed, the values for country and postal code are ignored. 
  
    To verify site latitude and longitude information in Business Manager:
    - Navigate to **Merchant Tools -\> Online Marketing -\> Stores**. 
    - Select the applicable site.
    - In the **Address** tab, verify that valid information is provided in the following fields: **Address**, **City**, **Postal Code**, **State**, and **Country**. For latitude and longitude values, you can manually enter values or provide all field values to auto-populate **Latitude** and **Longitude**. You must provide valid values for all of the previous fields for latitude and longitude to auto-populate **Latitude** and **Longitude** values.
  
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param countryCode - The two letter ISO country code, such as "US". This value is required when a postalCode is provided.
      * @param distanceUnit - The distance unit. Supported values are "mi" (miles) and "km" (kilometers). The default is "km".
      * @param latitude - The geographical latitude to search for stores (value range -90.00 .. 90.00). This value is required when a longitude is provided.
      * @param longitude - The geographical longitude to search for stores (value range -180.00 .. 180.00). You must provide a longitude when a latitude is provided.
      * @param maxDistance - The area (radius) in distanceUnit where stores will be searched.
      * @param postalCode - The postal code, such as "84121". You must provide a countryCode when a postalCode is provided.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param offset - 
      * @param limit - Maximum records to retrieve per request, not to exceed 200. Defaults to 25.
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      * @returns A promise of type Response if rawResponse is true, a promise of type StoreResult otherwise.
      * 
      * @beta
      * 
      */
      searchStores<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            countryCode?: string
            distanceUnit?: string
            latitude?: number
            longitude?: number
            maxDistance?: number
            postalCode?: string
            siteId: string
            locale?: string
            offset?: any
            limit?: number
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : StoreResult>;
  
      /**
      * This resource retrieves a list of stores for the given site that are within a configured distance of a geolocation:
  - The distance is interpreted either in miles or kilometers, depending on the `distanceUnit` input parameter. 
  - The location is specified by either directly providing a latitude and longitude coordinate pair, or by providing a country and a postal code. If a postal code is passed, the resource looks in the system's geolocation mappings in Business Manager to find the coordinates for this postal code. If no matching geolocation is found, the resource returns an empty list of stores. If coordinates are passed, the values for country and postal code are ignored. 
  
    To verify site latitude and longitude information in Business Manager:
    - Navigate to **Merchant Tools -\> Online Marketing -\> Stores**. 
    - Select the applicable site.
    - In the **Address** tab, verify that valid information is provided in the following fields: **Address**, **City**, **Postal Code**, **State**, and **Country**. For latitude and longitude values, you can manually enter values or provide all field values to auto-populate **Latitude** and **Longitude**. You must provide valid values for all of the previous fields for latitude and longitude to auto-populate **Latitude** and **Longitude** values.
  
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param countryCode - The two letter ISO country code, such as "US". This value is required when a postalCode is provided.
      * @param distanceUnit - The distance unit. Supported values are "mi" (miles) and "km" (kilometers). The default is "km".
      * @param latitude - The geographical latitude to search for stores (value range -90.00 .. 90.00). This value is required when a longitude is provided.
      * @param longitude - The geographical longitude to search for stores (value range -180.00 .. 180.00). You must provide a longitude when a latitude is provided.
      * @param maxDistance - The area (radius) in distanceUnit where stores will be searched.
      * @param postalCode - The postal code, such as "84121". You must provide a countryCode when a postalCode is provided.
      * @param siteId - 
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param offset - 
      * @param limit - Maximum records to retrieve per request, not to exceed 200. Defaults to 25.
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type StoreResult otherwise.
      * 
      * @beta
      * 
      */
      async searchStores(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            countryCode?: string
            distanceUnit?: string
            latitude?: number
            longitude?: number
            maxDistance?: number
            postalCode?: string
            siteId: string
            locale?: string
            offset?: any
            limit?: number
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | StoreResult> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperStoresPathParameters & Required<BaseUriParameters> = {
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
  
        const queryParams: ShopperStoresQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["countryCode"] !== undefined) {
          queryParams["countryCode"] = optionParams["countryCode"];
        } else if (configParams["countryCode"] !== undefined) {
          queryParams["countryCode"] = configParams["countryCode"];
        }
        if (optionParams["distanceUnit"] !== undefined) {
          queryParams["distanceUnit"] = optionParams["distanceUnit"];
        } else if (configParams["distanceUnit"] !== undefined) {
          queryParams["distanceUnit"] = configParams["distanceUnit"];
        }
        if (optionParams["latitude"] !== undefined) {
          queryParams["latitude"] = optionParams["latitude"];
        } else if (configParams["latitude"] !== undefined) {
          queryParams["latitude"] = configParams["latitude"];
        }
        if (optionParams["longitude"] !== undefined) {
          queryParams["longitude"] = optionParams["longitude"];
        } else if (configParams["longitude"] !== undefined) {
          queryParams["longitude"] = configParams["longitude"];
        }
        if (optionParams["maxDistance"] !== undefined) {
          queryParams["maxDistance"] = optionParams["maxDistance"];
        } else if (configParams["maxDistance"] !== undefined) {
          queryParams["maxDistance"] = configParams["maxDistance"];
        }
        if (optionParams["postalCode"] !== undefined) {
          queryParams["postalCode"] = optionParams["postalCode"];
        } else if (configParams["postalCode"] !== undefined) {
          queryParams["postalCode"] = configParams["postalCode"];
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
            console.warn(`Invalid Parameter for searchStores: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/store-search",
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
  
        return response as Response | StoreResult;
      }
  
      /**
      * Returns stores identified by the IDs provided as input.
      *
      * If you would like to get a raw Response object use the other getStores function.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param siteId - 
      * @param ids - The IDs of a requested stores (comma separated, max 50 IDs).
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      *
      * @returns A promise of type StoreResult.
      * 
      * @beta
      * 
      */
      getStores(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
            ids: string
            locale?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<StoreResult>;
  
      /**
      * Returns stores identified by the IDs provided as input.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param siteId - 
      * @param ids - The IDs of a requested stores (comma separated, max 50 IDs).
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      * @returns A promise of type Response if rawResponse is true, a promise of type StoreResult otherwise.
      * 
      * @beta
      * 
      */
      getStores<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
            ids: string
            locale?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : StoreResult>;
  
      /**
      * Returns stores identified by the IDs provided as input.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param siteId - 
      * @param ids - The IDs of a requested stores (comma separated, max 50 IDs).
      * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
  Below are some valid examples:
  - en-US
  - de-AT
  - de
  - default
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type StoreResult otherwise.
      * 
      * @beta
      * 
      */
      async getStores(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
            ids: string
            locale?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | StoreResult> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperStoresPathParameters & Required<BaseUriParameters> = {
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
  
        const queryParams: ShopperStoresQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["siteId"] !== undefined) {
          queryParams["siteId"] = optionParams["siteId"];
        } else if (configParams["siteId"] !== undefined) {
          queryParams["siteId"] = configParams["siteId"];
        }
        else {
          throw new Error('Missing required query parameter: siteId');
        }
        if (optionParams["ids"] !== undefined) {
          queryParams["ids"] = optionParams["ids"];
        } else if (configParams["ids"] !== undefined) {
          queryParams["ids"] = configParams["ids"];
        }
        else {
          throw new Error('Missing required query parameter: ids');
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
            console.warn(`Invalid Parameter for getStores: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/stores",
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
  
        return response as Response | StoreResult;
      }
}

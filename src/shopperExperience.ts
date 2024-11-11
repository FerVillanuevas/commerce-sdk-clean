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

export type PageResult = {
  data: Array<Page>;
} & { [key: string]: any }

  export type Page = {
  id: string;
  typeId: string;
  aspectTypeId?: string;
  name?: string;
  description?: string;
  pageTitle?: string;
  pageDescription?: string;
  pageKeywords?: string;
  data?: {
} & { [key: string]: any }
;
  custom?: {
} & { [key: string]: any }
;
  regions?: Array<Region>;
} & { [key: string]: any }

  export type Region = {
  id: string;
  components?: Array<Component>;
} & { [key: string]: any }

  export type Component = {
  id: string;
  typeId: string;
  data?: {
} & { [key: string]: any }
;
  custom?: {
} & { [key: string]: any }
;
  regions?: Array<Region>;
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
  type BusinessObjectIdInvalid = { [key: string]: any }
type AspectTypeNotFound = { [key: string]: any }
type PageNotFound = { [key: string]: any }
type AspectAttributeInvalid = { [key: string]: any }
type LocaleSpecific = { [key: string]: any }

/**
 * All path parameters that are used by at least one ShopperExperience method.
 */
export type ShopperExperiencePathParameters = {
  organizationId?: string;
  pageId?: string;
}
/**
 * All query parameters that are used by at least one ShopperExperience method.
 */
export type ShopperExperienceQueryParameters = {
  categoryId?: string;
  productId?: string;
  aspectTypeId?: string;
  aspectAttributes?: string;
  parameters?: string;
  siteId?: string;
  locale?: string;
}

/**
 * All parameters that are used by ShopperExperience.
 */
export type ShopperExperienceParameters = ShopperExperiencePathParameters & BaseUriParameters & ShopperExperienceQueryParameters;

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
export class ShopperExperience<ConfigParameters extends ShopperExperienceParameters & Record<string, unknown>> {
  // baseUri is not required on ClientConfig, but we know that we provide one in the class constructor
  public clientConfig: ClientConfig<ConfigParameters> & { baseUri: string };

  static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/experience/shopper-experience/{version}";

  static readonly apiPaths = {
    getPages: "/organizations/{organizationId}/pages",
    getPage: "/organizations/{organizationId}/pages/{pageId}",
  };

  constructor(config: ClientConfigInit<ConfigParameters>) {
    const cfg = {...config}
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    // Type assertion is safe because ^^^
    this.clientConfig = new ClientConfig(cfg) as ClientConfig<ConfigParameters> & { baseUri: string };
  }

  static readonly paramKeys = {
    getPages: [
      'organizationId',
      'categoryId',
      'productId',
      'aspectTypeId',
      'aspectAttributes',
      'parameters',
      'siteId',
      'locale',
    ],
    getPagesRequired: [
      'organizationId',
      'aspectTypeId',
      'siteId',
    ],
    getPage: [
      'organizationId',
      'pageId',
      'aspectAttributes',
      'parameters',
      'siteId',
      'locale',
    ],
    getPageRequired: [
      'organizationId',
      'pageId',
      'siteId',
    ],
  } as const;
  
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
      getPages(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            categoryId?: string
            productId?: string
            aspectTypeId: string
            aspectAttributes?: string
            parameters?: string
            siteId: string
            locale?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<PageResult>;
  
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
      getPages<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            categoryId?: string
            productId?: string
            aspectTypeId: string
            aspectAttributes?: string
            parameters?: string
            siteId: string
            locale?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : PageResult>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type PageResult otherwise.
      * 
      */
      async getPages(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            categoryId?: string
            productId?: string
            aspectTypeId: string
            aspectAttributes?: string
            parameters?: string
            siteId: string
            locale?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | PageResult> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperExperiencePathParameters & Required<BaseUriParameters> = {
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
  
        const queryParams: ShopperExperienceQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["categoryId"] !== undefined) {
          queryParams["categoryId"] = optionParams["categoryId"];
        } else if (configParams["categoryId"] !== undefined) {
          queryParams["categoryId"] = configParams["categoryId"];
        }
        if (optionParams["productId"] !== undefined) {
          queryParams["productId"] = optionParams["productId"];
        } else if (configParams["productId"] !== undefined) {
          queryParams["productId"] = configParams["productId"];
        }
        if (optionParams["aspectTypeId"] !== undefined) {
          queryParams["aspectTypeId"] = optionParams["aspectTypeId"];
        } else if (configParams["aspectTypeId"] !== undefined) {
          queryParams["aspectTypeId"] = configParams["aspectTypeId"];
        }
        else {
          throw new Error('Missing required query parameter: aspectTypeId');
        }
        if (optionParams["aspectAttributes"] !== undefined) {
          queryParams["aspectAttributes"] = optionParams["aspectAttributes"];
        } else if (configParams["aspectAttributes"] !== undefined) {
          queryParams["aspectAttributes"] = configParams["aspectAttributes"];
        }
        if (optionParams["parameters"] !== undefined) {
          queryParams["parameters"] = optionParams["parameters"];
        } else if (configParams["parameters"] !== undefined) {
          queryParams["parameters"] = configParams["parameters"];
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
            console.warn(`Invalid Parameter for getPages: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/pages",
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
  
        return response as Response | PageResult;
      }
  
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
      getPage(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            pageId: string
            aspectAttributes?: string
            parameters?: string
            siteId: string
            locale?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<Page>;
  
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
      getPage<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            pageId: string
            aspectAttributes?: string
            parameters?: string
            siteId: string
            locale?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : Page>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Page otherwise.
      * 
      */
      async getPage(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            pageId: string
            aspectAttributes?: string
            parameters?: string
            siteId: string
            locale?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | Page> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperExperiencePathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["pageId"] !== undefined) {
          pathParams["pageId"] = optionParams["pageId"];
        } else if (configParams["pageId"] !== undefined) {
          pathParams["pageId"] = configParams["pageId"];
        }
        else {
          throw new Error('Missing required path parameter: pageId');
        }
  
        const queryParams: ShopperExperienceQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["aspectAttributes"] !== undefined) {
          queryParams["aspectAttributes"] = optionParams["aspectAttributes"];
        } else if (configParams["aspectAttributes"] !== undefined) {
          queryParams["aspectAttributes"] = configParams["aspectAttributes"];
        }
        if (optionParams["parameters"] !== undefined) {
          queryParams["parameters"] = optionParams["parameters"];
        } else if (configParams["parameters"] !== undefined) {
          queryParams["parameters"] = configParams["parameters"];
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
            console.warn(`Invalid Parameter for getPage: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/pages/{pageId}",
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
  
        return response as Response | Page;
      }
}

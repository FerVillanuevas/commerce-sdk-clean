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
type StoreResult = {
    limit: number;
    data: Array<Store>;
    offset?: any;
    total: any;
} & {
    [key: string]: any;
};
type Store = {
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
} & {
    [key: string]: any;
};
/**
 * All path parameters that are used by at least one ShopperStores method.
 */
type ShopperStoresPathParameters = {
    organizationId?: string;
};
/**
 * All query parameters that are used by at least one ShopperStores method.
 */
type ShopperStoresQueryParameters = {
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
};
/**
 * All parameters that are used by ShopperStores.
 */
type ShopperStoresParameters = ShopperStoresPathParameters & BaseUriParameters & ShopperStoresQueryParameters;
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
declare class ShopperStores<ConfigParameters extends ShopperStoresParameters & Record<string, unknown>> {
    clientConfig: ClientConfig<ConfigParameters> & {
        baseUri: string;
    };
    static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/store/shopper-stores/{version}";
    static readonly apiPaths: {
        searchStores: string;
        getStores: string;
    };
    constructor(config: ClientConfigInit<ConfigParameters>);
    static readonly paramKeys: {
        readonly searchStores: readonly ["organizationId", "countryCode", "distanceUnit", "latitude", "longitude", "maxDistance", "postalCode", "siteId", "locale", "offset", "limit"];
        readonly searchStoresRequired: readonly ["organizationId", "siteId"];
        readonly getStores: readonly ["organizationId", "siteId", "ids", "locale"];
        readonly getStoresRequired: readonly ["organizationId", "siteId", "ids"];
    };
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
    searchStores(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            countryCode?: string;
            distanceUnit?: string;
            latitude?: number;
            longitude?: number;
            maxDistance?: number;
            postalCode?: string;
            siteId: string;
            locale?: string;
            offset?: any;
            limit?: number;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<StoreResult>;
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
    searchStores<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            countryCode?: string;
            distanceUnit?: string;
            latitude?: number;
            longitude?: number;
            maxDistance?: number;
            postalCode?: string;
            siteId: string;
            locale?: string;
            offset?: any;
            limit?: number;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : StoreResult>;
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
    getStores(options?: RequireParametersUnlessAllAreOptional<{
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
    }>): Promise<StoreResult>;
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
    getStores<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
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
    }>, rawResponse?: T): Promise<T extends true ? Response : StoreResult>;
}

type shopperStores_AttributeDefinition = AttributeDefinition;
type shopperStores_BoolFilter = BoolFilter;
type shopperStores_BoolQuery = BoolQuery;
type shopperStores_ChangeControlled = ChangeControlled;
type shopperStores_ChangeControlledDataType = ChangeControlledDataType;
type shopperStores_ClosedObject = ClosedObject;
type shopperStores_Error = Error;
type shopperStores_ErrorResponse = ErrorResponse;
type shopperStores_Filter = Filter;
type shopperStores_FilteredQuery = FilteredQuery;
type shopperStores_L10nString = L10nString;
type shopperStores_LocalizedString = LocalizedString;
type shopperStores_MatchAllQuery = MatchAllQuery;
type shopperStores_Money = Money;
type shopperStores_MoneyMnemonic = MoneyMnemonic;
type shopperStores_NestedQuery = NestedQuery;
type shopperStores_NoPropertiesAllowed = NoPropertiesAllowed;
type shopperStores_OpenObject = OpenObject;
type shopperStores_PaginatedSearchResult = PaginatedSearchResult;
type shopperStores_PaginatedSearchResultBase = PaginatedSearchResultBase;
type shopperStores_PropertyDefinition = PropertyDefinition;
type shopperStores_PropertyValueDefinition = PropertyValueDefinition;
type shopperStores_Query = Query;
type shopperStores_QueryFilter = QueryFilter;
type shopperStores_Range2Filter = Range2Filter;
type shopperStores_RangeFilter = RangeFilter;
type shopperStores_SearchRequest = SearchRequest;
type shopperStores_SearchRequestBase = SearchRequestBase;
type shopperStores_ShopperStores<ConfigParameters extends ShopperStoresParameters & Record<string, unknown>> = ShopperStores<ConfigParameters>;
declare const shopperStores_ShopperStores: typeof ShopperStores;
type shopperStores_ShopperStoresParameters = ShopperStoresParameters;
type shopperStores_ShopperStoresPathParameters = ShopperStoresPathParameters;
type shopperStores_ShopperStoresQueryParameters = ShopperStoresQueryParameters;
type shopperStores_SimpleSearchResult = SimpleSearchResult;
type shopperStores_SimpleSearchResultBase = SimpleSearchResultBase;
type shopperStores_Sort = Sort;
type shopperStores_SpecifiedPropertiesAllowed = SpecifiedPropertiesAllowed;
type shopperStores_Store = Store;
type shopperStores_StoreResult = StoreResult;
type shopperStores_TermFilter = TermFilter;
type shopperStores_TermQuery = TermQuery;
type shopperStores_TextQuery = TextQuery;
declare namespace shopperStores {
  export { type shopperStores_AttributeDefinition as AttributeDefinition, type shopperStores_BoolFilter as BoolFilter, type shopperStores_BoolQuery as BoolQuery, type shopperStores_ChangeControlled as ChangeControlled, type shopperStores_ChangeControlledDataType as ChangeControlledDataType, type shopperStores_ClosedObject as ClosedObject, type shopperStores_Error as Error, type shopperStores_ErrorResponse as ErrorResponse, type shopperStores_Filter as Filter, type shopperStores_FilteredQuery as FilteredQuery, type shopperStores_L10nString as L10nString, type shopperStores_LocalizedString as LocalizedString, type shopperStores_MatchAllQuery as MatchAllQuery, type shopperStores_Money as Money, type shopperStores_MoneyMnemonic as MoneyMnemonic, type shopperStores_NestedQuery as NestedQuery, type shopperStores_NoPropertiesAllowed as NoPropertiesAllowed, type shopperStores_OpenObject as OpenObject, type shopperStores_PaginatedSearchResult as PaginatedSearchResult, type shopperStores_PaginatedSearchResultBase as PaginatedSearchResultBase, type shopperStores_PropertyDefinition as PropertyDefinition, type shopperStores_PropertyValueDefinition as PropertyValueDefinition, type shopperStores_Query as Query, type shopperStores_QueryFilter as QueryFilter, type shopperStores_Range2Filter as Range2Filter, type shopperStores_RangeFilter as RangeFilter, type shopperStores_SearchRequest as SearchRequest, type shopperStores_SearchRequestBase as SearchRequestBase, shopperStores_ShopperStores as ShopperStores, type shopperStores_ShopperStoresParameters as ShopperStoresParameters, type shopperStores_ShopperStoresPathParameters as ShopperStoresPathParameters, type shopperStores_ShopperStoresQueryParameters as ShopperStoresQueryParameters, type shopperStores_SimpleSearchResult as SimpleSearchResult, type shopperStores_SimpleSearchResultBase as SimpleSearchResultBase, type shopperStores_Sort as Sort, type shopperStores_SpecifiedPropertiesAllowed as SpecifiedPropertiesAllowed, type shopperStores_Store as Store, type shopperStores_StoreResult as StoreResult, type shopperStores_TermFilter as TermFilter, type shopperStores_TermQuery as TermQuery, type shopperStores_TextQuery as TextQuery };
}

export { type AttributeDefinition as A, type BoolFilter as B, type ClosedObject as C, type ShopperStoresQueryParameters as D, type ErrorResponse as E, type FilteredQuery as F, type ShopperStoresParameters as G, type LocalizedString as L, type Money as M, type NoPropertiesAllowed as N, type OpenObject as O, type PropertyDefinition as P, type QueryFilter as Q, type Range2Filter as R, ShopperStores as S, type TermQuery as T, type SimpleSearchResult as a, type SearchRequest as b, type PaginatedSearchResult as c, type SpecifiedPropertiesAllowed as d, type PaginatedSearchResultBase as e, type MatchAllQuery as f, type Query as g, type TermFilter as h, type TextQuery as i, type BoolQuery as j, type SimpleSearchResultBase as k, type NestedQuery as l, type Filter as m, type Sort as n, type RangeFilter as o, type SearchRequestBase as p, type MoneyMnemonic as q, type L10nString as r, shopperStores as s, type PropertyValueDefinition as t, type ChangeControlled as u, type ChangeControlledDataType as v, type Error as w, type StoreResult as x, type Store as y, type ShopperStoresPathParameters as z };

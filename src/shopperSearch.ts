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

  export type ProductPriceTable = {
  price?: number;
  pricebook?: string;
  quantity?: number;
} & { [key: string]: any }

  export type ProductRef = {
  id: string;
} & { [key: string]: any }

  export type SuggestedTerms = {
  originalTerm: string;
  terms?: Array<SuggestedTerm>;
} & { [key: string]: any }

  export type PriceRange = {
  maxPrice?: number;
  minPrice?: number;
  pricebook?: string;
} & { [key: string]: any }

  export type CategorySuggestions = {
  categories?: Array<SuggestedCategory>;
  suggestedPhrases?: Array<SuggestedPhrase>;
  suggestedTerms: Array<SuggestedTerms>;
} & { [key: string]: any }

  export type SuggestedProduct = {
  currency: string;
  price: number;
  productId: string;
  productName: string;
} & { [key: string]: any }

  export type SuggestedPhrase = {
  exactMatch: boolean;
  phrase: string;
} & { [key: string]: any }

  export type VariationAttribute = {
  id: string;
  name?: string;
  values?: Array<VariationAttributeValue>;
} & { [key: string]: any }

  export type ProductSuggestions = {
  products?: Array<SuggestedProduct>;
  suggestedPhrases?: Array<SuggestedPhrase>;
  suggestedTerms: Array<SuggestedTerms>;
} & { [key: string]: any }

  export type SuggestedCategory = {
  id: string;
  name: string;
  parentCategoryName: string;
} & { [key: string]: any }

  export type ProductType = {
  bundle?: boolean;
  item?: boolean;
  master?: boolean;
  option?: boolean;
  set?: boolean;
  variant?: boolean;
  variationGroup?: boolean;
} & { [key: string]: any }

  export type Variant = {
  orderable?: boolean;
  price?: number;
  productId: string;
  tieredPrices?: Array<ProductPriceTable>;
  variationValues?: {
} & { [key: string]: any }
;
  productPromotions?: Array<ProductPromotion>;
} & { [key: string]: any }

  export type VariationGroup = {
  orderable: boolean;
  price: number;
  productId: string;
  variationValues: {
} & { [key: string]: any }
;
} & { [key: string]: any }

  export type BrandSuggestions = {
} & { [key: string]: any }

  export type ProductSearchRefinementValue = {
  description?: string;
  hitCount: number;
  label: string;
  presentationId?: string;
  value: string;
  values?: Array<ProductSearchRefinementValue>;
} & { [key: string]: any }

  export type ProductSearchSortingOption = {
  id: string;
  label: string;
} & { [key: string]: any }

  export type ImageGroup = {
  images: Array<Image>;
  variationAttributes?: Array<VariationAttribute>;
  viewType: string;
} & { [key: string]: any }

  export type SuggestedTerm = {
  completed: boolean;
  corrected: boolean;
  exactMatch: boolean;
  value: string;
} & { [key: string]: any }

  export type ProductSearchRefinement = {
  attributeId: string;
  label?: string;
  values?: Array<ProductSearchRefinementValue>;
} & { [key: string]: any }

  export type CustomSuggestions = {
  customSuggestion?: string;
  suggestedPhrases?: Array<SuggestedPhrase>;
  suggestedTerms: Array<SuggestedTerms>;
} & { [key: string]: any }

  export type ProductSearchHit = {
  currency?: string;
  hitType?: string;
  image?: Image;
  orderable?: boolean;
  price?: number;
  priceMax?: number;
  prices?: {
} & { [key: string]: any }
;
  productId: string;
  productName?: string;
  productType?: ProductType;
  representedProduct?: ProductRef;
  representedProducts?: Array<ProductRef>;
  variationAttributes?: Array<VariationAttribute>;
  imageGroups?: Array<ImageGroup>;
  priceRanges?: Array<PriceRange>;
  productPromotions?: Array<ProductPromotion>;
  tieredPrices?: Array<ProductPriceTable>;
  variants?: Array<Variant>;
  variationGroups?: Array<VariationGroup>;
} & { [key: string]: any }

  export type ProductSearchResult = {
  limit: number;
  hits: Array<ProductSearchHit>;
  query: string;
  refinements: Array<ProductSearchRefinement>;
  searchPhraseSuggestions: Suggestion;
  selectedRefinements?: {
} & { [key: string]: any }
;
  selectedSortingOption?: string;
  sortingOptions: Array<ProductSearchSortingOption>;
  offset: number;
  total: number;
} & { [key: string]: any }

  export type Image = {
  alt?: string;
  disBaseLink?: string;
  link: string;
  title?: string;
} & { [key: string]: any }

  export type VariationAttributeValue = {
  description?: string;
  image?: Image;
  imageSwatch?: Image;
  name?: string;
  orderable?: boolean;
  value: string;
} & { [key: string]: any }

  export type ProductPromotion = {
  calloutMsg: string;
  promotionId: string;
  promotionalPrice: number;
} & { [key: string]: any }

  export type Suggestion = {
  suggestedPhrases?: Array<SuggestedPhrase>;
  suggestedTerms: Array<SuggestedTerms>;
} & { [key: string]: any }

  export type SuggestionResult = {
  brandSuggestions?: BrandSuggestions;
  categorySuggestions?: CategorySuggestions;
  productSuggestions?: ProductSuggestions;
  customSuggestion?: CustomSuggestions;
  searchPhrase: string;
} & { [key: string]: any }

  type Unauthorized = { [key: string]: any }
type BadRequest = { [key: string]: any }

/**
 * All path parameters that are used by at least one ShopperSearch method.
 */
export type ShopperSearchPathParameters = {
  organizationId?: string;
}
/**
 * All query parameters that are used by at least one ShopperSearch method.
 */
export type ShopperSearchQueryParameters = {
  select?: string;
  siteId?: string;
  q?: string;
  refine?: Array<string>;
  sort?: string;
  currency?: string;
  locale?: string;
  expand?: Array<string>;
  allImages?: boolean;
  perPricebook?: boolean;
  allVariationProperties?: boolean;
  offset?: any;
  limit?: number;
}

/**
 * All parameters that are used by ShopperSearch.
 */
export type ShopperSearchParameters = ShopperSearchPathParameters & BaseUriParameters & ShopperSearchQueryParameters;

/**
* [Shopper Search](https://developer.salesforce.com/docs/commerce/commerce-api/references?meta=shopper-search:Summary)
* ==================================
*
* *product search and helpful search suggestions.*<br />
*
* Simple example:
*
* ```typescript
*   import { ShopperSearch } from "commerce-sdk-isomorphic";
*
*   const clientConfig = {
*     parameters: {
*       clientId: "XXXXXX",
*       organizationId: "XXXX",
*       shortCode: "XXX",
*       siteId: "XX"
*     }
*   };
*   const shopperSearchClient = new ShopperSearch(clientConfig);
* ```
*
* <span style="font-size:.7em; display:block; text-align: right">
* API Version: 1.0.41<br />
* Last Updated: <br />
* </span>
* 
*
*/
export class ShopperSearch<ConfigParameters extends ShopperSearchParameters & Record<string, unknown>> {
  // baseUri is not required on ClientConfig, but we know that we provide one in the class constructor
  public clientConfig: ClientConfig<ConfigParameters> & { baseUri: string };

  static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/search/shopper-search/{version}/";

  static readonly apiPaths = {
    productSearch: "/organizations/{organizationId}/product-search",
    getSearchSuggestions: "/organizations/{organizationId}/search-suggestions",
  };

  constructor(config: ClientConfigInit<ConfigParameters>) {
    const cfg = {...config}
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    // Type assertion is safe because ^^^
    this.clientConfig = new ClientConfig(cfg) as ClientConfig<ConfigParameters> & { baseUri: string };
  }

  static readonly paramKeys = {
    productSearch: [
      'organizationId',
      'select',
      'siteId',
      'q',
      'refine',
      'sort',
      'currency',
      'locale',
      'expand',
      'allImages',
      'perPricebook',
      'allVariationProperties',
      'offset',
      'limit',
    ],
    productSearchRequired: [
      'organizationId',
      'siteId',
    ],
    getSearchSuggestions: [
      'organizationId',
      'siteId',
      'q',
      'limit',
      'currency',
      'locale',
    ],
    getSearchSuggestionsRequired: [
      'organizationId',
      'siteId',
      'q',
    ],
  } as const;
  
      /**
      * Provides keyword and refinement search functionality for products. Only returns the product ID, link, and name in
  the product search hit. The search result contains only products that are online and assigned to site catalog.
      *
      * If you would like to get a raw Response object use the other productSearch function.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param select - The property selector declaring which fields are included into the response payload. You can specify a single field name, a comma-separated list of names, or work with wildcards.You can also sepcify Array Operations and filter expressions.The actual selector value must be enclosed within parentheses.
      * @param siteId - 
      * @param q - The query phrase to search for. For example to search for a product "shirt", type q=shirt.
      * @param refine - Parameter that represents a refinement attribute or values pair. Refinement attribute ID and
              values are separated by '='. Multiple values are supported by a subset of refinement attributes and
              can be provided by separating them using a pipe (URL
              encoded = "|") i.e. refine=c_refinementColor=red|green|blue. Value ranges can be specified like this: refine=price=(100..500) . Multiple refine parameters can be provided by using the refine as the key i.e refine=price=(0..10)&refine=c_refinementColor=green. The refinements can be a collection of custom defined attributes IDs and the system defined attributes IDs but the search can only accept a total of 9 refinements at a time.
              The following system refinement attribute ids are supported:
                
              cgid: Allows refinement per single category ID. Multiple category ids are not supported.
              price: Allows refinement per single price range. Multiple price ranges are not supported.
              pmid: Allows refinement per promotion ID.
              htype: Allow refinement by including only the provided hit types. Accepted types are 'product', 'master', 'set', 'bundle', 'slicing_group' (deprecated), 'variation_group'.
              orderable_only: Unavailable products are excluded from the search results if true is set. Multiple refinement values are not supported.                               
      * @param sort - The ID of the sorting option to sort the search hits.
      * @param currency - The currency mnemonic specified for price. This parameter is effective only if the returned results contain prices.
      * @param locale - 
      * @param expand - The expand parameter. A comma-separated list with the allowed values (availability, images, prices, represented_products, variations, promotions, custom_properties). The expand parameter `availability, images, prices, represented_products, variations` is used as the default value when no expand parameter is provided. The value `none` can be used to turn off all expand options. The expand values `promotions` and `custom_properties` are optional and are available from version 24.3 and 24.4, respectively.
      * @param allImages - When this flag is passed along with the expand parameter `images` in the request, a property named `imageGroups`, which contains an image model, is returned in the response. If the flag is set to `true`, the whole image model is returned. If it is set to `false`, the returned image model contains only matching images. If no flag is passed in the request, the response does not include the `imageGroups property`. This parameter is available from version 24.3.
      * @param perPricebook - When this flag is passed as `true` in the request, along with the expand parameter `prices`, then per PriceBook prices and tiered prices (if available) are returned. This parameter is available from version 24.3.
      * @param allVariationProperties - The flag that indicates which variation properties are to be included in the result. When the flag is passed as `true` along with the expand parameter `variations` in the request, all variation properties (`variationAttributes`, `variationGroups`, and `variants`) are returned. When it is passed as `false` along with the expand parameter `variations` in the request, only the default property (`variationAttributes`) is returned. This parameter is available from version 24.3.
      * @param offset - 
      * @param limit - Maximum records to retrieve per request, not to exceed 200. Defaults to 25.
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      *
      * @returns A promise of type ProductSearchResult.
      * 
      */
      productSearch(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            select?: string
            siteId: string
            q?: string
            refine?: Array<string>
            sort?: string
            currency?: string
            locale?: string
            expand?: Array<string>
            allImages?: boolean
            perPricebook?: boolean
            allVariationProperties?: boolean
            offset?: any
            limit?: number
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<ProductSearchResult>;
  
      /**
      * Provides keyword and refinement search functionality for products. Only returns the product ID, link, and name in
  the product search hit. The search result contains only products that are online and assigned to site catalog.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param select - The property selector declaring which fields are included into the response payload. You can specify a single field name, a comma-separated list of names, or work with wildcards.You can also sepcify Array Operations and filter expressions.The actual selector value must be enclosed within parentheses.
      * @param siteId - 
      * @param q - The query phrase to search for. For example to search for a product "shirt", type q=shirt.
      * @param refine - Parameter that represents a refinement attribute or values pair. Refinement attribute ID and
              values are separated by '='. Multiple values are supported by a subset of refinement attributes and
              can be provided by separating them using a pipe (URL
              encoded = "|") i.e. refine=c_refinementColor=red|green|blue. Value ranges can be specified like this: refine=price=(100..500) . Multiple refine parameters can be provided by using the refine as the key i.e refine=price=(0..10)&refine=c_refinementColor=green. The refinements can be a collection of custom defined attributes IDs and the system defined attributes IDs but the search can only accept a total of 9 refinements at a time.
              The following system refinement attribute ids are supported:
                
              cgid: Allows refinement per single category ID. Multiple category ids are not supported.
              price: Allows refinement per single price range. Multiple price ranges are not supported.
              pmid: Allows refinement per promotion ID.
              htype: Allow refinement by including only the provided hit types. Accepted types are 'product', 'master', 'set', 'bundle', 'slicing_group' (deprecated), 'variation_group'.
              orderable_only: Unavailable products are excluded from the search results if true is set. Multiple refinement values are not supported.                               
      * @param sort - The ID of the sorting option to sort the search hits.
      * @param currency - The currency mnemonic specified for price. This parameter is effective only if the returned results contain prices.
      * @param locale - 
      * @param expand - The expand parameter. A comma-separated list with the allowed values (availability, images, prices, represented_products, variations, promotions, custom_properties). The expand parameter `availability, images, prices, represented_products, variations` is used as the default value when no expand parameter is provided. The value `none` can be used to turn off all expand options. The expand values `promotions` and `custom_properties` are optional and are available from version 24.3 and 24.4, respectively.
      * @param allImages - When this flag is passed along with the expand parameter `images` in the request, a property named `imageGroups`, which contains an image model, is returned in the response. If the flag is set to `true`, the whole image model is returned. If it is set to `false`, the returned image model contains only matching images. If no flag is passed in the request, the response does not include the `imageGroups property`. This parameter is available from version 24.3.
      * @param perPricebook - When this flag is passed as `true` in the request, along with the expand parameter `prices`, then per PriceBook prices and tiered prices (if available) are returned. This parameter is available from version 24.3.
      * @param allVariationProperties - The flag that indicates which variation properties are to be included in the result. When the flag is passed as `true` along with the expand parameter `variations` in the request, all variation properties (`variationAttributes`, `variationGroups`, and `variants`) are returned. When it is passed as `false` along with the expand parameter `variations` in the request, only the default property (`variationAttributes`) is returned. This parameter is available from version 24.3.
      * @param offset - 
      * @param limit - Maximum records to retrieve per request, not to exceed 200. Defaults to 25.
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      * @returns A promise of type Response if rawResponse is true, a promise of type ProductSearchResult otherwise.
      * 
      */
      productSearch<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            select?: string
            siteId: string
            q?: string
            refine?: Array<string>
            sort?: string
            currency?: string
            locale?: string
            expand?: Array<string>
            allImages?: boolean
            perPricebook?: boolean
            allVariationProperties?: boolean
            offset?: any
            limit?: number
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : ProductSearchResult>;
  
      /**
      * Provides keyword and refinement search functionality for products. Only returns the product ID, link, and name in
  the product search hit. The search result contains only products that are online and assigned to site catalog.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param select - The property selector declaring which fields are included into the response payload. You can specify a single field name, a comma-separated list of names, or work with wildcards.You can also sepcify Array Operations and filter expressions.The actual selector value must be enclosed within parentheses.
      * @param siteId - 
      * @param q - The query phrase to search for. For example to search for a product "shirt", type q=shirt.
      * @param refine - Parameter that represents a refinement attribute or values pair. Refinement attribute ID and
              values are separated by '='. Multiple values are supported by a subset of refinement attributes and
              can be provided by separating them using a pipe (URL
              encoded = "|") i.e. refine=c_refinementColor=red|green|blue. Value ranges can be specified like this: refine=price=(100..500) . Multiple refine parameters can be provided by using the refine as the key i.e refine=price=(0..10)&refine=c_refinementColor=green. The refinements can be a collection of custom defined attributes IDs and the system defined attributes IDs but the search can only accept a total of 9 refinements at a time.
              The following system refinement attribute ids are supported:
                
              cgid: Allows refinement per single category ID. Multiple category ids are not supported.
              price: Allows refinement per single price range. Multiple price ranges are not supported.
              pmid: Allows refinement per promotion ID.
              htype: Allow refinement by including only the provided hit types. Accepted types are 'product', 'master', 'set', 'bundle', 'slicing_group' (deprecated), 'variation_group'.
              orderable_only: Unavailable products are excluded from the search results if true is set. Multiple refinement values are not supported.                               
      * @param sort - The ID of the sorting option to sort the search hits.
      * @param currency - The currency mnemonic specified for price. This parameter is effective only if the returned results contain prices.
      * @param locale - 
      * @param expand - The expand parameter. A comma-separated list with the allowed values (availability, images, prices, represented_products, variations, promotions, custom_properties). The expand parameter `availability, images, prices, represented_products, variations` is used as the default value when no expand parameter is provided. The value `none` can be used to turn off all expand options. The expand values `promotions` and `custom_properties` are optional and are available from version 24.3 and 24.4, respectively.
      * @param allImages - When this flag is passed along with the expand parameter `images` in the request, a property named `imageGroups`, which contains an image model, is returned in the response. If the flag is set to `true`, the whole image model is returned. If it is set to `false`, the returned image model contains only matching images. If no flag is passed in the request, the response does not include the `imageGroups property`. This parameter is available from version 24.3.
      * @param perPricebook - When this flag is passed as `true` in the request, along with the expand parameter `prices`, then per PriceBook prices and tiered prices (if available) are returned. This parameter is available from version 24.3.
      * @param allVariationProperties - The flag that indicates which variation properties are to be included in the result. When the flag is passed as `true` along with the expand parameter `variations` in the request, all variation properties (`variationAttributes`, `variationGroups`, and `variants`) are returned. When it is passed as `false` along with the expand parameter `variations` in the request, only the default property (`variationAttributes`) is returned. This parameter is available from version 24.3.
      * @param offset - 
      * @param limit - Maximum records to retrieve per request, not to exceed 200. Defaults to 25.
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type ProductSearchResult otherwise.
      * 
      */
      async productSearch(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            select?: string
            siteId: string
            q?: string
            refine?: Array<string>
            sort?: string
            currency?: string
            locale?: string
            expand?: Array<string>
            allImages?: boolean
            perPricebook?: boolean
            allVariationProperties?: boolean
            offset?: any
            limit?: number
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | ProductSearchResult> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperSearchPathParameters & Required<BaseUriParameters> = {
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
  
        const queryParams: ShopperSearchQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["select"] !== undefined) {
          queryParams["select"] = optionParams["select"];
        } else if (configParams["select"] !== undefined) {
          queryParams["select"] = configParams["select"];
        }
        if (optionParams["siteId"] !== undefined) {
          queryParams["siteId"] = optionParams["siteId"];
        } else if (configParams["siteId"] !== undefined) {
          queryParams["siteId"] = configParams["siteId"];
        }
        else {
          throw new Error('Missing required query parameter: siteId');
        }
        if (optionParams["q"] !== undefined) {
          queryParams["q"] = optionParams["q"];
        } else if (configParams["q"] !== undefined) {
          queryParams["q"] = configParams["q"];
        }
        if (optionParams["refine"] !== undefined) {
          queryParams["refine"] = optionParams["refine"];
        } else if (configParams["refine"] !== undefined) {
          queryParams["refine"] = configParams["refine"];
        }
        if (optionParams["sort"] !== undefined) {
          queryParams["sort"] = optionParams["sort"];
        } else if (configParams["sort"] !== undefined) {
          queryParams["sort"] = configParams["sort"];
        }
        if (optionParams["currency"] !== undefined) {
          queryParams["currency"] = optionParams["currency"];
        } else if (configParams["currency"] !== undefined) {
          queryParams["currency"] = configParams["currency"];
        }
        if (optionParams["locale"] !== undefined) {
          queryParams["locale"] = optionParams["locale"];
        } else if (configParams["locale"] !== undefined) {
          queryParams["locale"] = configParams["locale"];
        }
        if (optionParams["expand"] !== undefined) {
          queryParams["expand"] = optionParams["expand"];
        } else if (configParams["expand"] !== undefined) {
          queryParams["expand"] = configParams["expand"];
        }
        if (optionParams["allImages"] !== undefined) {
          queryParams["allImages"] = optionParams["allImages"];
        } else if (configParams["allImages"] !== undefined) {
          queryParams["allImages"] = configParams["allImages"];
        }
        if (optionParams["perPricebook"] !== undefined) {
          queryParams["perPricebook"] = optionParams["perPricebook"];
        } else if (configParams["perPricebook"] !== undefined) {
          queryParams["perPricebook"] = configParams["perPricebook"];
        }
        if (optionParams["allVariationProperties"] !== undefined) {
          queryParams["allVariationProperties"] = optionParams["allVariationProperties"];
        } else if (configParams["allVariationProperties"] !== undefined) {
          queryParams["allVariationProperties"] = configParams["allVariationProperties"];
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
            console.warn(`Invalid Parameter for productSearch: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/product-search",
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
  
        return response as Response | ProductSearchResult;
      }
  
      /**
      * Provides keyword search functionality for products, categories, and brands suggestions. Returns suggested products, suggested categories, and suggested brands for the given search phrase.
      *
      * If you would like to get a raw Response object use the other getSearchSuggestions function.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param siteId - 
      * @param q - The search phrase (q) for which suggestions are evaluated. Search suggestions are determined when the search phrase input is at least three (default) characters long. The value is configurable in the Business Manager.
      * @param limit - The maximum number of suggestions made per request. If no value is defined, by default five suggestions per suggestion type are evaluated. This affects all types of suggestions (category, product, brand, and custom suggestions).
      * @param currency - The currency code specified for price. This parameter is effective only for product suggestions.
      * @param locale - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      *
      * @returns A promise of type SuggestionResult.
      * 
      */
      getSearchSuggestions(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
            q: string
            limit?: number
            currency?: string
            locale?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<SuggestionResult>;
  
      /**
      * Provides keyword search functionality for products, categories, and brands suggestions. Returns suggested products, suggested categories, and suggested brands for the given search phrase.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param siteId - 
      * @param q - The search phrase (q) for which suggestions are evaluated. Search suggestions are determined when the search phrase input is at least three (default) characters long. The value is configurable in the Business Manager.
      * @param limit - The maximum number of suggestions made per request. If no value is defined, by default five suggestions per suggestion type are evaluated. This affects all types of suggestions (category, product, brand, and custom suggestions).
      * @param currency - The currency code specified for price. This parameter is effective only for product suggestions.
      * @param locale - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      * @returns A promise of type Response if rawResponse is true, a promise of type SuggestionResult otherwise.
      * 
      */
      getSearchSuggestions<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
            q: string
            limit?: number
            currency?: string
            locale?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : SuggestionResult>;
  
      /**
      * Provides keyword search functionality for products, categories, and brands suggestions. Returns suggested products, suggested categories, and suggested brands for the given search phrase.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - An identifier for the organization the request is being made by.
      * @param siteId - 
      * @param q - The search phrase (q) for which suggestions are evaluated. Search suggestions are determined when the search phrase input is at least three (default) characters long. The value is configurable in the Business Manager.
      * @param limit - The maximum number of suggestions made per request. If no value is defined, by default five suggestions per suggestion type are evaluated. This affects all types of suggestions (category, product, brand, and custom suggestions).
      * @param currency - The currency code specified for price. This parameter is effective only for product suggestions.
      * @param locale - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type SuggestionResult otherwise.
      * 
      */
      async getSearchSuggestions(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
            q: string
            limit?: number
            currency?: string
            locale?: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | SuggestionResult> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperSearchPathParameters & Required<BaseUriParameters> = {
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
  
        const queryParams: ShopperSearchQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["siteId"] !== undefined) {
          queryParams["siteId"] = optionParams["siteId"];
        } else if (configParams["siteId"] !== undefined) {
          queryParams["siteId"] = configParams["siteId"];
        }
        else {
          throw new Error('Missing required query parameter: siteId');
        }
        if (optionParams["q"] !== undefined) {
          queryParams["q"] = optionParams["q"];
        } else if (configParams["q"] !== undefined) {
          queryParams["q"] = configParams["q"];
        }
        else {
          throw new Error('Missing required query parameter: q');
        }
        if (optionParams["limit"] !== undefined) {
          queryParams["limit"] = optionParams["limit"];
        } else if (configParams["limit"] !== undefined) {
          queryParams["limit"] = configParams["limit"];
        }
        if (optionParams["currency"] !== undefined) {
          queryParams["currency"] = optionParams["currency"];
        } else if (configParams["currency"] !== undefined) {
          queryParams["currency"] = configParams["currency"];
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
            console.warn(`Invalid Parameter for getSearchSuggestions: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/search-suggestions",
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
  
        return response as Response | SuggestionResult;
      }
}

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

export type ProductPriceTable = {
  price?: number;
  pricebook?: string;
  quantity?: number;
} & { [key: string]: any }

  export type PriceRange = {
  maxPrice?: number;
  minPrice?: number;
  pricebook?: string;
} & { [key: string]: any }

  export type OptionValue = {
  default?: boolean;
  id: string;
  name?: string;
  price?: number;
} & { [key: string]: any }

  export type Master = {
  masterId: string;
  orderable?: boolean;
  price?: number;
  priceMax?: number;
  prices?: {
} & { [key: string]: any }
;
} & { [key: string]: any }

  export type Category = {
  categories?: Array<Category>;
  description?: string;
  id: string;
  image?: string;
  name?: string;
  onlineSubCategoriesCount?: any;
  pageDescription?: string;
  pageKeywords?: string;
  pageTitle?: string;
  parentCategoryId?: string;
  parentCategoryTree?: Array<PathRecord>;
  thumbnail?: string;
} & { [key: string]: any }

  export type CategoryResult = {
  limit: number;
  data: Array<Category>;
  total: number;
} & { [key: string]: any }

  export type VariationAttribute = {
  id: string;
  name?: string;
  values?: Array<VariationAttributeValue>;
} & { [key: string]: any }

  export type RecommendationType = {
  displayValue: string;
  value: number;
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

  export type Recommendation = {
  calloutMsg?: string;
  image?: Image;
  longDescription?: string;
  name?: string;
  recommendationType: RecommendationType;
  recommendedItemId?: string;
  shortDescription?: string;
} & { [key: string]: any }

  export type Variant = {
  orderable?: boolean;
  price?: number;
  productId: string;
  tieredPrices?: Array<ProductPriceTable>;
  variationValues?: {
} & { [key: string]: any }
;
} & { [key: string]: any }

  export type VariationGroup = {
  orderable: boolean;
  price: number;
  productId: string;
  variationValues: {
} & { [key: string]: any }
;
} & { [key: string]: any }

  export type ProductResult = {
  limit: number;
  data: Array<Product>;
  total: number;
} & { [key: string]: any }

  export type ProductLink = {
  sourceProductId: string;
  sourceProductLink: string;
  targetProductId: string;
  targetProductLink: string;
  type: string;
} & { [key: string]: any }

  export type Inventory = {
  ats?: number;
  backorderable?: boolean;
  id: string;
  inStockDate?: any;
  orderable?: boolean;
  preorderable?: boolean;
  stockLevel?: number;
} & { [key: string]: any }

  export type ImageGroup = {
  images: Array<Image>;
  variationAttributes?: Array<VariationAttribute>;
  viewType: string;
} & { [key: string]: any }

  export type Option = {
  description?: string;
  id: string;
  image?: string;
  name?: string;
  values?: Array<OptionValue>;
} & { [key: string]: any }

  export type Product = {
  brand?: string;
  bundledProducts?: Array<BundledProduct>;
  currency?: string;
  ean?: string;
  fetchDate?: number;
  id: string;
  imageGroups?: Array<ImageGroup>;
  inventories?: Array<Inventory>;
  inventory?: Inventory;
  longDescription?: string;
  manufacturerName?: string;
  manufacturerSku?: string;
  master?: Master;
  minOrderQuantity?: number;
  name?: string;
  options?: Array<Option>;
  pageDescription?: string;
  pageKeywords?: string;
  pageTitle?: string;
  price?: number;
  pricePerUnit?: number;
  pricePerUnitMax?: number;
  priceMax?: number;
  priceRanges?: Array<PriceRange>;
  prices?: {
} & { [key: string]: any }
;
  primaryCategoryId?: string;
  productLinks?: Array<ProductLink>;
  productPromotions?: Array<ProductPromotion>;
  recommendations?: Array<Recommendation>;
  setProducts?: Array<Product>;
  shortDescription?: string;
  slugUrl?: string;
  stepQuantity?: number;
  tieredPrices?: Array<ProductPriceTable>;
  type?: ProductType;
  unit?: string;
  upc?: string;
  validFrom?: any;
  validTo?: any;
  variants?: Array<Variant>;
  variationAttributes?: Array<VariationAttribute>;
  variationGroups?: Array<VariationGroup>;
  variationValues?: {
} & { [key: string]: any }
;
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

  export type PathRecord = {
  id?: string;
  name?: string;
} & { [key: string]: any }

  export type BundledProduct = {
  id: string;
  product: Product;
  quantity: number;
} & { [key: string]: any }

  export type ErrorResponse = {
  type: string;
  title?: string;
  detail?: string;
  instance?: string;
} & { [key: string]: any }

  type NotFound = { [key: string]: any }
type BadRequest = { [key: string]: any }
type BadRequest1 = { [key: string]: any }
type Unauthorized = { [key: string]: any }
type BadRequest2 = { [key: string]: any }
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
 * All path parameters that are used by at least one ShopperProducts method.
 */
export type ShopperProductsPathParameters = {
  organizationId?: string;
  id?: string;
}
/**
 * All query parameters that are used by at least one ShopperProducts method.
 */
export type ShopperProductsQueryParameters = {
  select?: string;
  ids?: string;
  inventoryIds?: string;
  currency?: string;
  expand?: Array<string>;
  locale?: string;
  allImages?: boolean;
  perPricebook?: boolean;
  siteId?: string;
  levels?: number;
}

/**
 * All parameters that are used by ShopperProducts.
 */
export type ShopperProductsParameters = ShopperProductsPathParameters & BaseUriParameters & ShopperProductsQueryParameters;

/**
* [Shopper Products](https://developer.salesforce.com/docs/commerce/commerce-api/references?meta=shopper-products:Summary)
* ==================================
*
* *Display product details across your storefront.*<br />
*
* Simple example:
*
* ```typescript
*   import { ShopperProducts } from "commerce-sdk-isomorphic";
*
*   const clientConfig = {
*     parameters: {
*       clientId: "XXXXXX",
*       organizationId: "XXXX",
*       shortCode: "XXX",
*       siteId: "XX"
*     }
*   };
*   const shopperProductsClient = new ShopperProducts(clientConfig);
* ```
*
* <span style="font-size:.7em; display:block; text-align: right">
* API Version: 0.0.33<br />
* Last Updated: <br />
* </span>
* 
*
*/
export class ShopperProducts<ConfigParameters extends ShopperProductsParameters & Record<string, unknown>> {
  // baseUri is not required on ClientConfig, but we know that we provide one in the class constructor
  public clientConfig: ClientConfig<ConfigParameters> & { baseUri: string };

  static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/product/shopper-products/{version}";

  static readonly apiPaths = {
    getProducts: "/organizations/{organizationId}/products",
    getProduct: "/organizations/{organizationId}/products/{id}",
    getCategories: "/organizations/{organizationId}/categories",
    getCategory: "/organizations/{organizationId}/categories/{id}",
  };

  constructor(config: ClientConfigInit<ConfigParameters>) {
    const cfg = {...config}
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    // Type assertion is safe because ^^^
    this.clientConfig = new ClientConfig(cfg) as ClientConfig<ConfigParameters> & { baseUri: string };
  }

  static readonly paramKeys = {
    getProducts: [
      'organizationId',
      'select',
      'ids',
      'inventoryIds',
      'currency',
      'expand',
      'locale',
      'allImages',
      'perPricebook',
      'siteId',
    ],
    getProductsRequired: [
      'organizationId',
      'ids',
      'siteId',
    ],
    getProduct: [
      'organizationId',
      'id',
      'select',
      'inventoryIds',
      'currency',
      'expand',
      'locale',
      'allImages',
      'perPricebook',
      'siteId',
    ],
    getProductRequired: [
      'organizationId',
      'id',
      'siteId',
    ],
    getCategories: [
      'organizationId',
      'ids',
      'levels',
      'locale',
      'siteId',
    ],
    getCategoriesRequired: [
      'organizationId',
      'ids',
      'siteId',
    ],
    getCategory: [
      'organizationId',
      'id',
      'levels',
      'locale',
      'siteId',
    ],
    getCategoryRequired: [
      'organizationId',
      'id',
      'siteId',
    ],
  } as const;
  
      /**
      * Allows access to multiple products by a single request. Only products that are online and assigned to a site catalog are returned. The maximum number of productIDs that can be requested are 24. Along with product details, the availability, product options, images, price, promotions, and variations for the valid products will be included, as appropriate.
      *
      * If you would like to get a raw Response object use the other getProducts function.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param select - The property selector declaring which fields are included into the response payload. You can specify a single field name, a comma-separated list of names, or work with wildcards.You can also sepcify Array Operations and filter expressions.The actual selector value must be enclosed within parentheses.
      * @param ids - The IDs of the requested products (comma-separated, max 24 IDs).
      * @param inventoryIds - The optional inventory list IDs, for which the availability should be shown (comma-separated, max 5 inventoryListIDs).
      * @param currency - The currency mnemonic specified for price.
      * @param expand - The expand parameter. A comma separated list with the allowed values (availability, links, promotions, options, images, prices, variations, recommendations). All expand parameters are used for the request when no expand parameter is provided. The value "none" may be used to turn off all expand options.
      * @param locale - The locale context.
      * @param allImages - The flag that indicates whether to retrieve the whole image model for the requested product.
      * @param perPricebook - The flag that indicates whether to retrieve the per PriceBook prices and tiered prices (if available) for requested Products. Available end of June, 2021.
      * @param siteId - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      *
      * @returns A promise of type ProductResult.
      * 
      */
      getProducts(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            select?: string
            ids: string
            inventoryIds?: string
            currency?: string
            expand?: Array<string>
            locale?: string
            allImages?: boolean
            perPricebook?: boolean
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<ProductResult>;
  
      /**
      * Allows access to multiple products by a single request. Only products that are online and assigned to a site catalog are returned. The maximum number of productIDs that can be requested are 24. Along with product details, the availability, product options, images, price, promotions, and variations for the valid products will be included, as appropriate.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param select - The property selector declaring which fields are included into the response payload. You can specify a single field name, a comma-separated list of names, or work with wildcards.You can also sepcify Array Operations and filter expressions.The actual selector value must be enclosed within parentheses.
      * @param ids - The IDs of the requested products (comma-separated, max 24 IDs).
      * @param inventoryIds - The optional inventory list IDs, for which the availability should be shown (comma-separated, max 5 inventoryListIDs).
      * @param currency - The currency mnemonic specified for price.
      * @param expand - The expand parameter. A comma separated list with the allowed values (availability, links, promotions, options, images, prices, variations, recommendations). All expand parameters are used for the request when no expand parameter is provided. The value "none" may be used to turn off all expand options.
      * @param locale - The locale context.
      * @param allImages - The flag that indicates whether to retrieve the whole image model for the requested product.
      * @param perPricebook - The flag that indicates whether to retrieve the per PriceBook prices and tiered prices (if available) for requested Products. Available end of June, 2021.
      * @param siteId - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      * @returns A promise of type Response if rawResponse is true, a promise of type ProductResult otherwise.
      * 
      */
      getProducts<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            select?: string
            ids: string
            inventoryIds?: string
            currency?: string
            expand?: Array<string>
            locale?: string
            allImages?: boolean
            perPricebook?: boolean
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : ProductResult>;
  
      /**
      * Allows access to multiple products by a single request. Only products that are online and assigned to a site catalog are returned. The maximum number of productIDs that can be requested are 24. Along with product details, the availability, product options, images, price, promotions, and variations for the valid products will be included, as appropriate.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param select - The property selector declaring which fields are included into the response payload. You can specify a single field name, a comma-separated list of names, or work with wildcards.You can also sepcify Array Operations and filter expressions.The actual selector value must be enclosed within parentheses.
      * @param ids - The IDs of the requested products (comma-separated, max 24 IDs).
      * @param inventoryIds - The optional inventory list IDs, for which the availability should be shown (comma-separated, max 5 inventoryListIDs).
      * @param currency - The currency mnemonic specified for price.
      * @param expand - The expand parameter. A comma separated list with the allowed values (availability, links, promotions, options, images, prices, variations, recommendations). All expand parameters are used for the request when no expand parameter is provided. The value "none" may be used to turn off all expand options.
      * @param locale - The locale context.
      * @param allImages - The flag that indicates whether to retrieve the whole image model for the requested product.
      * @param perPricebook - The flag that indicates whether to retrieve the per PriceBook prices and tiered prices (if available) for requested Products. Available end of June, 2021.
      * @param siteId - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type ProductResult otherwise.
      * 
      */
      async getProducts(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            select?: string
            ids: string
            inventoryIds?: string
            currency?: string
            expand?: Array<string>
            locale?: string
            allImages?: boolean
            perPricebook?: boolean
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | ProductResult> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperProductsPathParameters & Required<BaseUriParameters> = {
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
  
        const queryParams: ShopperProductsQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["select"] !== undefined) {
          queryParams["select"] = optionParams["select"];
        } else if (configParams["select"] !== undefined) {
          queryParams["select"] = configParams["select"];
        }
        if (optionParams["ids"] !== undefined) {
          queryParams["ids"] = optionParams["ids"];
        } else if (configParams["ids"] !== undefined) {
          queryParams["ids"] = configParams["ids"];
        }
        else {
          throw new Error('Missing required query parameter: ids');
        }
        if (optionParams["inventoryIds"] !== undefined) {
          queryParams["inventoryIds"] = optionParams["inventoryIds"];
        } else if (configParams["inventoryIds"] !== undefined) {
          queryParams["inventoryIds"] = configParams["inventoryIds"];
        }
        if (optionParams["currency"] !== undefined) {
          queryParams["currency"] = optionParams["currency"];
        } else if (configParams["currency"] !== undefined) {
          queryParams["currency"] = configParams["currency"];
        }
        if (optionParams["expand"] !== undefined) {
          queryParams["expand"] = optionParams["expand"];
        } else if (configParams["expand"] !== undefined) {
          queryParams["expand"] = configParams["expand"];
        }
        if (optionParams["locale"] !== undefined) {
          queryParams["locale"] = optionParams["locale"];
        } else if (configParams["locale"] !== undefined) {
          queryParams["locale"] = configParams["locale"];
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
        if (optionParams["siteId"] !== undefined) {
          queryParams["siteId"] = optionParams["siteId"];
        } else if (configParams["siteId"] !== undefined) {
          queryParams["siteId"] = configParams["siteId"];
        }
        else {
          throw new Error('Missing required query parameter: siteId');
        }
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for getProducts: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/products",
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
  
        return response as Response | ProductResult;
      }
  
      /**
      * Allows access to product details for a single product ID. Only products that are online and assigned to a site catalog are returned. Along with product details, the availability, images, price, bundled_products, set_products, recommedations, product options, variations, and promotions for the products will be included, as appropriate.
      *
      * If you would like to get a raw Response object use the other getProduct function.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param id - The ID of the requested product.
      * @param select - The property selector declaring which fields are included into the response payload. You can specify a single field name, a comma-separated list of names, or work with wildcards.You can also sepcify Array Operations and filter expressions.The actual selector value must be enclosed within parentheses.
      * @param inventoryIds - The optional inventory list IDs, for which the availability should be shown (comma-separated, max 5 inventoryListIDs).
      * @param currency - The currency mnemonic specified for price.
      * @param expand - The expand parameter. A comma separated list with the allowed values (availability, bundled_products, links, promotions, options, images, prices, variations, set_products, recommendations). All expand parameters are used for the request when no expand parameter is provided. The value "none" may be used to turn off all expand options.
      * @param locale - The locale context.
      * @param allImages - The flag that indicates whether to retrieve the whole image model for the requested product.
      * @param perPricebook - The flag that indicates whether to retrieve the per PriceBook prices and tiered prices (if available) for requested Products. Available end of June, 2021.
      * @param siteId - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      *
      * @returns A promise of type Product.
      * 
      */
      getProduct(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            id: string
            select?: string
            inventoryIds?: string
            currency?: string
            expand?: Array<string>
            locale?: string
            allImages?: boolean
            perPricebook?: boolean
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<Product>;
  
      /**
      * Allows access to product details for a single product ID. Only products that are online and assigned to a site catalog are returned. Along with product details, the availability, images, price, bundled_products, set_products, recommedations, product options, variations, and promotions for the products will be included, as appropriate.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param id - The ID of the requested product.
      * @param select - The property selector declaring which fields are included into the response payload. You can specify a single field name, a comma-separated list of names, or work with wildcards.You can also sepcify Array Operations and filter expressions.The actual selector value must be enclosed within parentheses.
      * @param inventoryIds - The optional inventory list IDs, for which the availability should be shown (comma-separated, max 5 inventoryListIDs).
      * @param currency - The currency mnemonic specified for price.
      * @param expand - The expand parameter. A comma separated list with the allowed values (availability, bundled_products, links, promotions, options, images, prices, variations, set_products, recommendations). All expand parameters are used for the request when no expand parameter is provided. The value "none" may be used to turn off all expand options.
      * @param locale - The locale context.
      * @param allImages - The flag that indicates whether to retrieve the whole image model for the requested product.
      * @param perPricebook - The flag that indicates whether to retrieve the per PriceBook prices and tiered prices (if available) for requested Products. Available end of June, 2021.
      * @param siteId - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      * @returns A promise of type Response if rawResponse is true, a promise of type Product otherwise.
      * 
      */
      getProduct<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            id: string
            select?: string
            inventoryIds?: string
            currency?: string
            expand?: Array<string>
            locale?: string
            allImages?: boolean
            perPricebook?: boolean
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : Product>;
  
      /**
      * Allows access to product details for a single product ID. Only products that are online and assigned to a site catalog are returned. Along with product details, the availability, images, price, bundled_products, set_products, recommedations, product options, variations, and promotions for the products will be included, as appropriate.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param id - The ID of the requested product.
      * @param select - The property selector declaring which fields are included into the response payload. You can specify a single field name, a comma-separated list of names, or work with wildcards.You can also sepcify Array Operations and filter expressions.The actual selector value must be enclosed within parentheses.
      * @param inventoryIds - The optional inventory list IDs, for which the availability should be shown (comma-separated, max 5 inventoryListIDs).
      * @param currency - The currency mnemonic specified for price.
      * @param expand - The expand parameter. A comma separated list with the allowed values (availability, bundled_products, links, promotions, options, images, prices, variations, set_products, recommendations). All expand parameters are used for the request when no expand parameter is provided. The value "none" may be used to turn off all expand options.
      * @param locale - The locale context.
      * @param allImages - The flag that indicates whether to retrieve the whole image model for the requested product.
      * @param perPricebook - The flag that indicates whether to retrieve the per PriceBook prices and tiered prices (if available) for requested Products. Available end of June, 2021.
      * @param siteId - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Product otherwise.
      * 
      */
      async getProduct(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            id: string
            select?: string
            inventoryIds?: string
            currency?: string
            expand?: Array<string>
            locale?: string
            allImages?: boolean
            perPricebook?: boolean
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | Product> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperProductsPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["id"] !== undefined) {
          pathParams["id"] = optionParams["id"];
        } else if (configParams["id"] !== undefined) {
          pathParams["id"] = configParams["id"];
        }
        else {
          throw new Error('Missing required path parameter: id');
        }
  
        const queryParams: ShopperProductsQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["select"] !== undefined) {
          queryParams["select"] = optionParams["select"];
        } else if (configParams["select"] !== undefined) {
          queryParams["select"] = configParams["select"];
        }
        if (optionParams["inventoryIds"] !== undefined) {
          queryParams["inventoryIds"] = optionParams["inventoryIds"];
        } else if (configParams["inventoryIds"] !== undefined) {
          queryParams["inventoryIds"] = configParams["inventoryIds"];
        }
        if (optionParams["currency"] !== undefined) {
          queryParams["currency"] = optionParams["currency"];
        } else if (configParams["currency"] !== undefined) {
          queryParams["currency"] = configParams["currency"];
        }
        if (optionParams["expand"] !== undefined) {
          queryParams["expand"] = optionParams["expand"];
        } else if (configParams["expand"] !== undefined) {
          queryParams["expand"] = configParams["expand"];
        }
        if (optionParams["locale"] !== undefined) {
          queryParams["locale"] = optionParams["locale"];
        } else if (configParams["locale"] !== undefined) {
          queryParams["locale"] = configParams["locale"];
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
        if (optionParams["siteId"] !== undefined) {
          queryParams["siteId"] = optionParams["siteId"];
        } else if (configParams["siteId"] !== undefined) {
          queryParams["siteId"] = configParams["siteId"];
        }
        else {
          throw new Error('Missing required query parameter: siteId');
        }
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for getProduct: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/products/{id}",
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
  
        return response as Response | Product;
      }
  
      /**
      * When you use the URL template, the server returns multiple categories (a result object of category documents). You can use this template as a convenient way of obtaining multiple categories in a single request, instead of issuing separate requests for each category. You can specify up to 50 multiple IDs. You must enclose the list of IDs in parentheses. If a category identifier contains parenthesis or the separator sign, you must URL encode the character. The server only returns online categories.
      *
      * If you would like to get a raw Response object use the other getCategories function.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param ids - The comma separated list of category IDs (max 50).
      * @param levels - Specifies how many levels of nested subcategories you want the server to return. The default value is 1. Valid values are 0, 1, or 2.
      * @param locale - The locale context.
      * @param siteId - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      *
      * @returns A promise of type CategoryResult.
      * 
      */
      getCategories(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            ids: string
            levels?: number
            locale?: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<CategoryResult>;
  
      /**
      * When you use the URL template, the server returns multiple categories (a result object of category documents). You can use this template as a convenient way of obtaining multiple categories in a single request, instead of issuing separate requests for each category. You can specify up to 50 multiple IDs. You must enclose the list of IDs in parentheses. If a category identifier contains parenthesis or the separator sign, you must URL encode the character. The server only returns online categories.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param ids - The comma separated list of category IDs (max 50).
      * @param levels - Specifies how many levels of nested subcategories you want the server to return. The default value is 1. Valid values are 0, 1, or 2.
      * @param locale - The locale context.
      * @param siteId - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      * @returns A promise of type Response if rawResponse is true, a promise of type CategoryResult otherwise.
      * 
      */
      getCategories<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            ids: string
            levels?: number
            locale?: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : CategoryResult>;
  
      /**
      * When you use the URL template, the server returns multiple categories (a result object of category documents). You can use this template as a convenient way of obtaining multiple categories in a single request, instead of issuing separate requests for each category. You can specify up to 50 multiple IDs. You must enclose the list of IDs in parentheses. If a category identifier contains parenthesis or the separator sign, you must URL encode the character. The server only returns online categories.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param ids - The comma separated list of category IDs (max 50).
      * @param levels - Specifies how many levels of nested subcategories you want the server to return. The default value is 1. Valid values are 0, 1, or 2.
      * @param locale - The locale context.
      * @param siteId - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CategoryResult otherwise.
      * 
      */
      async getCategories(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            ids: string
            levels?: number
            locale?: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | CategoryResult> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperProductsPathParameters & Required<BaseUriParameters> = {
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
  
        const queryParams: ShopperProductsQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["ids"] !== undefined) {
          queryParams["ids"] = optionParams["ids"];
        } else if (configParams["ids"] !== undefined) {
          queryParams["ids"] = configParams["ids"];
        }
        else {
          throw new Error('Missing required query parameter: ids');
        }
        if (optionParams["levels"] !== undefined) {
          queryParams["levels"] = optionParams["levels"];
        } else if (configParams["levels"] !== undefined) {
          queryParams["levels"] = configParams["levels"];
        }
        if (optionParams["locale"] !== undefined) {
          queryParams["locale"] = optionParams["locale"];
        } else if (configParams["locale"] !== undefined) {
          queryParams["locale"] = configParams["locale"];
        }
        if (optionParams["siteId"] !== undefined) {
          queryParams["siteId"] = optionParams["siteId"];
        } else if (configParams["siteId"] !== undefined) {
          queryParams["siteId"] = configParams["siteId"];
        }
        else {
          throw new Error('Missing required query parameter: siteId');
        }
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for getCategories: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/categories",
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
  
        return response as Response | CategoryResult;
      }
  
      /**
      * When you use the URL template below, the server returns a category identified by its ID; by default, the server
  also returns the first level of subcategories, but you can specify another level by setting the levels
  parameter. The server only returns online categories.
      *
      * If you would like to get a raw Response object use the other getCategory function.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param id - The ID of the requested category.
      * @param levels - 
      * @param locale - 
      * @param siteId - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      *
      * @returns A promise of type Category.
      * 
      */
      getCategory(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            id: string
            levels?: number
            locale?: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<Category>;
  
      /**
      * When you use the URL template below, the server returns a category identified by its ID; by default, the server
  also returns the first level of subcategories, but you can specify another level by setting the levels
  parameter. The server only returns online categories.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param id - The ID of the requested category.
      * @param levels - 
      * @param locale - 
      * @param siteId - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      * @returns A promise of type Response if rawResponse is true, a promise of type Category otherwise.
      * 
      */
      getCategory<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            id: string
            levels?: number
            locale?: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : Category>;
  
      /**
      * When you use the URL template below, the server returns a category identified by its ID; by default, the server
  also returns the first level of subcategories, but you can specify another level by setting the levels
  parameter. The server only returns online categories.
      *
      * @param options - An object containing the options for this method.
      * @param parameters - An object containing the parameters for this method.
      * @param organizationId - 
      * @param id - The ID of the requested category.
      * @param levels - 
      * @param locale - 
      * @param siteId - 
      * @param headers - An object literal of key value pairs of the headers to be
      * sent with this request.
      * @param rawResponse - Set to true to return entire Response object instead of DTO.
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Category otherwise.
      * 
      */
      async getCategory(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            id: string
            levels?: number
            locale?: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | Category> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperProductsPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["id"] !== undefined) {
          pathParams["id"] = optionParams["id"];
        } else if (configParams["id"] !== undefined) {
          pathParams["id"] = configParams["id"];
        }
        else {
          throw new Error('Missing required path parameter: id');
        }
  
        const queryParams: ShopperProductsQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["levels"] !== undefined) {
          queryParams["levels"] = optionParams["levels"];
        } else if (configParams["levels"] !== undefined) {
          queryParams["levels"] = configParams["levels"];
        }
        if (optionParams["locale"] !== undefined) {
          queryParams["locale"] = optionParams["locale"];
        } else if (configParams["locale"] !== undefined) {
          queryParams["locale"] = configParams["locale"];
        }
        if (optionParams["siteId"] !== undefined) {
          queryParams["siteId"] = optionParams["siteId"];
        } else if (configParams["siteId"] !== undefined) {
          queryParams["siteId"] = configParams["siteId"];
        }
        else {
          throw new Error('Missing required query parameter: siteId');
        }
  
        Object.keys(optionParams).forEach((key) => {
          if(key.startsWith('c_') && optionParams[key as keyof typeof optionParams] !== undefined) {
            queryParams[key as keyof typeof queryParams] = optionParams[key as keyof typeof optionParams]
          } else if(!queryParams.hasOwnProperty(key) && !pathParams.hasOwnProperty(key)) {
            console.warn(`Invalid Parameter for getCategory: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/categories/{id}",
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
  
        return response as Response | Category;
      }
}

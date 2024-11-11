import ClientConfig, { ClientConfigInit } from './clientConfig.mjs';
import { BaseUriParameters, RequireParametersUnlessAllAreOptional, CompositeParameters } from './helpers/types.mjs';

type ProductPriceTable = {
    price?: number;
    pricebook?: string;
    quantity?: number;
} & {
    [key: string]: any;
};
type PriceRange = {
    maxPrice?: number;
    minPrice?: number;
    pricebook?: string;
} & {
    [key: string]: any;
};
type OptionValue = {
    default?: boolean;
    id: string;
    name?: string;
    price?: number;
} & {
    [key: string]: any;
};
type Master = {
    masterId: string;
    orderable?: boolean;
    price?: number;
    priceMax?: number;
    prices?: {} & {
        [key: string]: any;
    };
} & {
    [key: string]: any;
};
type Category = {
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
} & {
    [key: string]: any;
};
type CategoryResult = {
    limit: number;
    data: Array<Category>;
    total: number;
} & {
    [key: string]: any;
};
type VariationAttribute = {
    id: string;
    name?: string;
    values?: Array<VariationAttributeValue>;
} & {
    [key: string]: any;
};
type RecommendationType = {
    displayValue: string;
    value: number;
} & {
    [key: string]: any;
};
type ProductType = {
    bundle?: boolean;
    item?: boolean;
    master?: boolean;
    option?: boolean;
    set?: boolean;
    variant?: boolean;
    variationGroup?: boolean;
} & {
    [key: string]: any;
};
type Recommendation = {
    calloutMsg?: string;
    image?: Image;
    longDescription?: string;
    name?: string;
    recommendationType: RecommendationType;
    recommendedItemId?: string;
    shortDescription?: string;
} & {
    [key: string]: any;
};
type Variant = {
    orderable?: boolean;
    price?: number;
    productId: string;
    tieredPrices?: Array<ProductPriceTable>;
    variationValues?: {} & {
        [key: string]: any;
    };
} & {
    [key: string]: any;
};
type VariationGroup = {
    orderable: boolean;
    price: number;
    productId: string;
    variationValues: {} & {
        [key: string]: any;
    };
} & {
    [key: string]: any;
};
type ProductResult = {
    limit: number;
    data: Array<Product>;
    total: number;
} & {
    [key: string]: any;
};
type ProductLink = {
    sourceProductId: string;
    sourceProductLink: string;
    targetProductId: string;
    targetProductLink: string;
    type: string;
} & {
    [key: string]: any;
};
type Inventory = {
    ats?: number;
    backorderable?: boolean;
    id: string;
    inStockDate?: any;
    orderable?: boolean;
    preorderable?: boolean;
    stockLevel?: number;
} & {
    [key: string]: any;
};
type ImageGroup = {
    images: Array<Image>;
    variationAttributes?: Array<VariationAttribute>;
    viewType: string;
} & {
    [key: string]: any;
};
type Option = {
    description?: string;
    id: string;
    image?: string;
    name?: string;
    values?: Array<OptionValue>;
} & {
    [key: string]: any;
};
type Product = {
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
    prices?: {} & {
        [key: string]: any;
    };
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
    variationValues?: {} & {
        [key: string]: any;
    };
} & {
    [key: string]: any;
};
type Image = {
    alt?: string;
    disBaseLink?: string;
    link: string;
    title?: string;
} & {
    [key: string]: any;
};
type VariationAttributeValue = {
    description?: string;
    image?: Image;
    imageSwatch?: Image;
    name?: string;
    orderable?: boolean;
    value: string;
} & {
    [key: string]: any;
};
type ProductPromotion = {
    calloutMsg: string;
    promotionId: string;
    promotionalPrice: number;
} & {
    [key: string]: any;
};
type PathRecord = {
    id?: string;
    name?: string;
} & {
    [key: string]: any;
};
type BundledProduct = {
    id: string;
    product: Product;
    quantity: number;
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
type Error = {
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
 * All path parameters that are used by at least one ShopperProducts method.
 */
type ShopperProductsPathParameters = {
    organizationId?: string;
    id?: string;
};
/**
 * All query parameters that are used by at least one ShopperProducts method.
 */
type ShopperProductsQueryParameters = {
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
};
/**
 * All parameters that are used by ShopperProducts.
 */
type ShopperProductsParameters = ShopperProductsPathParameters & BaseUriParameters & ShopperProductsQueryParameters;
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
declare class ShopperProducts<ConfigParameters extends ShopperProductsParameters & Record<string, unknown>> {
    clientConfig: ClientConfig<ConfigParameters> & {
        baseUri: string;
    };
    static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/product/shopper-products/{version}";
    static readonly apiPaths: {
        getProducts: string;
        getProduct: string;
        getCategories: string;
        getCategory: string;
    };
    constructor(config: ClientConfigInit<ConfigParameters>);
    static readonly paramKeys: {
        readonly getProducts: readonly ["organizationId", "select", "ids", "inventoryIds", "currency", "expand", "locale", "allImages", "perPricebook", "siteId"];
        readonly getProductsRequired: readonly ["organizationId", "ids", "siteId"];
        readonly getProduct: readonly ["organizationId", "id", "select", "inventoryIds", "currency", "expand", "locale", "allImages", "perPricebook", "siteId"];
        readonly getProductRequired: readonly ["organizationId", "id", "siteId"];
        readonly getCategories: readonly ["organizationId", "ids", "levels", "locale", "siteId"];
        readonly getCategoriesRequired: readonly ["organizationId", "ids", "siteId"];
        readonly getCategory: readonly ["organizationId", "id", "levels", "locale", "siteId"];
        readonly getCategoryRequired: readonly ["organizationId", "id", "siteId"];
    };
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
    getProducts(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            select?: string;
            ids: string;
            inventoryIds?: string;
            currency?: string;
            expand?: Array<string>;
            locale?: string;
            allImages?: boolean;
            perPricebook?: boolean;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<ProductResult>;
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
    getProducts<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            select?: string;
            ids: string;
            inventoryIds?: string;
            currency?: string;
            expand?: Array<string>;
            locale?: string;
            allImages?: boolean;
            perPricebook?: boolean;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : ProductResult>;
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
    getProduct(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            id: string;
            select?: string;
            inventoryIds?: string;
            currency?: string;
            expand?: Array<string>;
            locale?: string;
            allImages?: boolean;
            perPricebook?: boolean;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Product>;
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
    getProduct<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            id: string;
            select?: string;
            inventoryIds?: string;
            currency?: string;
            expand?: Array<string>;
            locale?: string;
            allImages?: boolean;
            perPricebook?: boolean;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Product>;
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
    getCategories(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            ids: string;
            levels?: number;
            locale?: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<CategoryResult>;
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
    getCategories<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            ids: string;
            levels?: number;
            locale?: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : CategoryResult>;
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
    getCategory(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            id: string;
            levels?: number;
            locale?: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Category>;
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
    getCategory<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            id: string;
            levels?: number;
            locale?: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Category>;
}

type shopperProducts_AttributeDefinition = AttributeDefinition;
type shopperProducts_BoolFilter = BoolFilter;
type shopperProducts_BoolQuery = BoolQuery;
type shopperProducts_BundledProduct = BundledProduct;
type shopperProducts_Category = Category;
type shopperProducts_CategoryResult = CategoryResult;
type shopperProducts_ChangeControlled = ChangeControlled;
type shopperProducts_ChangeControlledDataType = ChangeControlledDataType;
type shopperProducts_ClosedObject = ClosedObject;
type shopperProducts_Error = Error;
type shopperProducts_ErrorResponse = ErrorResponse;
type shopperProducts_Filter = Filter;
type shopperProducts_FilteredQuery = FilteredQuery;
type shopperProducts_Image = Image;
type shopperProducts_ImageGroup = ImageGroup;
type shopperProducts_Inventory = Inventory;
type shopperProducts_L10nString = L10nString;
type shopperProducts_LocalizedString = LocalizedString;
type shopperProducts_Master = Master;
type shopperProducts_MatchAllQuery = MatchAllQuery;
type shopperProducts_Money = Money;
type shopperProducts_MoneyMnemonic = MoneyMnemonic;
type shopperProducts_NestedQuery = NestedQuery;
type shopperProducts_NoPropertiesAllowed = NoPropertiesAllowed;
type shopperProducts_OpenObject = OpenObject;
type shopperProducts_Option = Option;
type shopperProducts_OptionValue = OptionValue;
type shopperProducts_PaginatedSearchResult = PaginatedSearchResult;
type shopperProducts_PaginatedSearchResultBase = PaginatedSearchResultBase;
type shopperProducts_PathRecord = PathRecord;
type shopperProducts_PriceRange = PriceRange;
type shopperProducts_Product = Product;
type shopperProducts_ProductLink = ProductLink;
type shopperProducts_ProductPriceTable = ProductPriceTable;
type shopperProducts_ProductPromotion = ProductPromotion;
type shopperProducts_ProductResult = ProductResult;
type shopperProducts_ProductType = ProductType;
type shopperProducts_PropertyDefinition = PropertyDefinition;
type shopperProducts_PropertyValueDefinition = PropertyValueDefinition;
type shopperProducts_Query = Query;
type shopperProducts_QueryFilter = QueryFilter;
type shopperProducts_Range2Filter = Range2Filter;
type shopperProducts_Recommendation = Recommendation;
type shopperProducts_RecommendationType = RecommendationType;
type shopperProducts_SearchRequest = SearchRequest;
type shopperProducts_SearchRequestBase = SearchRequestBase;
type shopperProducts_ShopperProducts<ConfigParameters extends ShopperProductsParameters & Record<string, unknown>> = ShopperProducts<ConfigParameters>;
declare const shopperProducts_ShopperProducts: typeof ShopperProducts;
type shopperProducts_ShopperProductsParameters = ShopperProductsParameters;
type shopperProducts_ShopperProductsPathParameters = ShopperProductsPathParameters;
type shopperProducts_ShopperProductsQueryParameters = ShopperProductsQueryParameters;
type shopperProducts_SimpleSearchResult = SimpleSearchResult;
type shopperProducts_SimpleSearchResultBase = SimpleSearchResultBase;
type shopperProducts_Sort = Sort;
type shopperProducts_SpecifiedPropertiesAllowed = SpecifiedPropertiesAllowed;
type shopperProducts_TermFilter = TermFilter;
type shopperProducts_TermQuery = TermQuery;
type shopperProducts_TextQuery = TextQuery;
type shopperProducts_Variant = Variant;
type shopperProducts_VariationAttribute = VariationAttribute;
type shopperProducts_VariationAttributeValue = VariationAttributeValue;
type shopperProducts_VariationGroup = VariationGroup;
declare namespace shopperProducts {
  export { type shopperProducts_AttributeDefinition as AttributeDefinition, type shopperProducts_BoolFilter as BoolFilter, type shopperProducts_BoolQuery as BoolQuery, type shopperProducts_BundledProduct as BundledProduct, type shopperProducts_Category as Category, type shopperProducts_CategoryResult as CategoryResult, type shopperProducts_ChangeControlled as ChangeControlled, type shopperProducts_ChangeControlledDataType as ChangeControlledDataType, type shopperProducts_ClosedObject as ClosedObject, type shopperProducts_Error as Error, type shopperProducts_ErrorResponse as ErrorResponse, type shopperProducts_Filter as Filter, type shopperProducts_FilteredQuery as FilteredQuery, type shopperProducts_Image as Image, type shopperProducts_ImageGroup as ImageGroup, type shopperProducts_Inventory as Inventory, type shopperProducts_L10nString as L10nString, type shopperProducts_LocalizedString as LocalizedString, type shopperProducts_Master as Master, type shopperProducts_MatchAllQuery as MatchAllQuery, type shopperProducts_Money as Money, type shopperProducts_MoneyMnemonic as MoneyMnemonic, type shopperProducts_NestedQuery as NestedQuery, type shopperProducts_NoPropertiesAllowed as NoPropertiesAllowed, type shopperProducts_OpenObject as OpenObject, type shopperProducts_Option as Option, type shopperProducts_OptionValue as OptionValue, type shopperProducts_PaginatedSearchResult as PaginatedSearchResult, type shopperProducts_PaginatedSearchResultBase as PaginatedSearchResultBase, type shopperProducts_PathRecord as PathRecord, type shopperProducts_PriceRange as PriceRange, type shopperProducts_Product as Product, type shopperProducts_ProductLink as ProductLink, type shopperProducts_ProductPriceTable as ProductPriceTable, type shopperProducts_ProductPromotion as ProductPromotion, type shopperProducts_ProductResult as ProductResult, type shopperProducts_ProductType as ProductType, type shopperProducts_PropertyDefinition as PropertyDefinition, type shopperProducts_PropertyValueDefinition as PropertyValueDefinition, type shopperProducts_Query as Query, type shopperProducts_QueryFilter as QueryFilter, type shopperProducts_Range2Filter as Range2Filter, type shopperProducts_Recommendation as Recommendation, type shopperProducts_RecommendationType as RecommendationType, type shopperProducts_SearchRequest as SearchRequest, type shopperProducts_SearchRequestBase as SearchRequestBase, shopperProducts_ShopperProducts as ShopperProducts, type shopperProducts_ShopperProductsParameters as ShopperProductsParameters, type shopperProducts_ShopperProductsPathParameters as ShopperProductsPathParameters, type shopperProducts_ShopperProductsQueryParameters as ShopperProductsQueryParameters, type shopperProducts_SimpleSearchResult as SimpleSearchResult, type shopperProducts_SimpleSearchResultBase as SimpleSearchResultBase, type shopperProducts_Sort as Sort, type shopperProducts_SpecifiedPropertiesAllowed as SpecifiedPropertiesAllowed, type shopperProducts_TermFilter as TermFilter, type shopperProducts_TermQuery as TermQuery, type shopperProducts_TextQuery as TextQuery, type shopperProducts_Variant as Variant, type shopperProducts_VariationAttribute as VariationAttribute, type shopperProducts_VariationAttributeValue as VariationAttributeValue, type shopperProducts_VariationGroup as VariationGroup };
}

export { type Sort as $, type SpecifiedPropertiesAllowed as A, type BundledProduct as B, type Category as C, type BoolFilter as D, type ErrorResponse as E, type PaginatedSearchResultBase as F, type MatchAllQuery as G, type FilteredQuery as H, type Inventory as I, type Query as J, type TermFilter as K, type LocalizedString as L, type Master as M, type NoPropertiesAllowed as N, type OptionValue as O, type ProductPriceTable as P, type QueryFilter as Q, type RecommendationType as R, ShopperProducts as S, type TermQuery as T, type TextQuery as U, type VariationAttribute as V, type Range2Filter as W, type BoolQuery as X, type SimpleSearchResultBase as Y, type NestedQuery as Z, type Filter as _, type PriceRange as a, type SearchRequestBase as a0, type MoneyMnemonic as a1, type L10nString as a2, type AttributeDefinition as a3, type PropertyValueDefinition as a4, type ShopperProductsPathParameters as a5, type ShopperProductsQueryParameters as a6, type ShopperProductsParameters as a7, type CategoryResult as b, type ProductType as c, type Recommendation as d, type Variant as e, type VariationGroup as f, type ProductResult as g, type ProductLink as h, type ImageGroup as i, type Option as j, type Product as k, type Image as l, type VariationAttributeValue as m, type ProductPromotion as n, type PathRecord as o, type ChangeControlled as p, type ChangeControlledDataType as q, type Error as r, shopperProducts as s, type Money as t, type SimpleSearchResult as u, type SearchRequest as v, type PropertyDefinition as w, type PaginatedSearchResult as x, type ClosedObject as y, type OpenObject as z };

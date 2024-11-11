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
type ProductPriceTable = {
    price?: number;
    pricebook?: string;
    quantity?: number;
} & {
    [key: string]: any;
};
type ProductRef = {
    id: string;
} & {
    [key: string]: any;
};
type SuggestedTerms = {
    originalTerm: string;
    terms?: Array<SuggestedTerm>;
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
type CategorySuggestions = {
    categories?: Array<SuggestedCategory>;
    suggestedPhrases?: Array<SuggestedPhrase>;
    suggestedTerms: Array<SuggestedTerms>;
} & {
    [key: string]: any;
};
type SuggestedProduct = {
    currency: string;
    price: number;
    productId: string;
    productName: string;
} & {
    [key: string]: any;
};
type SuggestedPhrase = {
    exactMatch: boolean;
    phrase: string;
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
type ProductSuggestions = {
    products?: Array<SuggestedProduct>;
    suggestedPhrases?: Array<SuggestedPhrase>;
    suggestedTerms: Array<SuggestedTerms>;
} & {
    [key: string]: any;
};
type SuggestedCategory = {
    id: string;
    name: string;
    parentCategoryName: string;
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
type Variant = {
    orderable?: boolean;
    price?: number;
    productId: string;
    tieredPrices?: Array<ProductPriceTable>;
    variationValues?: {} & {
        [key: string]: any;
    };
    productPromotions?: Array<ProductPromotion>;
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
type BrandSuggestions = {} & {
    [key: string]: any;
};
type ProductSearchRefinementValue = {
    description?: string;
    hitCount: number;
    label: string;
    presentationId?: string;
    value: string;
    values?: Array<ProductSearchRefinementValue>;
} & {
    [key: string]: any;
};
type ProductSearchSortingOption = {
    id: string;
    label: string;
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
type SuggestedTerm = {
    completed: boolean;
    corrected: boolean;
    exactMatch: boolean;
    value: string;
} & {
    [key: string]: any;
};
type ProductSearchRefinement = {
    attributeId: string;
    label?: string;
    values?: Array<ProductSearchRefinementValue>;
} & {
    [key: string]: any;
};
type CustomSuggestions = {
    customSuggestion?: string;
    suggestedPhrases?: Array<SuggestedPhrase>;
    suggestedTerms: Array<SuggestedTerms>;
} & {
    [key: string]: any;
};
type ProductSearchHit = {
    currency?: string;
    hitType?: string;
    image?: Image;
    orderable?: boolean;
    price?: number;
    priceMax?: number;
    prices?: {} & {
        [key: string]: any;
    };
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
} & {
    [key: string]: any;
};
type ProductSearchResult = {
    limit: number;
    hits: Array<ProductSearchHit>;
    query: string;
    refinements: Array<ProductSearchRefinement>;
    searchPhraseSuggestions: Suggestion;
    selectedRefinements?: {} & {
        [key: string]: any;
    };
    selectedSortingOption?: string;
    sortingOptions: Array<ProductSearchSortingOption>;
    offset: number;
    total: number;
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
type Suggestion = {
    suggestedPhrases?: Array<SuggestedPhrase>;
    suggestedTerms: Array<SuggestedTerms>;
} & {
    [key: string]: any;
};
type SuggestionResult = {
    brandSuggestions?: BrandSuggestions;
    categorySuggestions?: CategorySuggestions;
    productSuggestions?: ProductSuggestions;
    customSuggestion?: CustomSuggestions;
    searchPhrase: string;
} & {
    [key: string]: any;
};
/**
 * All path parameters that are used by at least one ShopperSearch method.
 */
type ShopperSearchPathParameters = {
    organizationId?: string;
};
/**
 * All query parameters that are used by at least one ShopperSearch method.
 */
type ShopperSearchQueryParameters = {
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
};
/**
 * All parameters that are used by ShopperSearch.
 */
type ShopperSearchParameters = ShopperSearchPathParameters & BaseUriParameters & ShopperSearchQueryParameters;
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
declare class ShopperSearch<ConfigParameters extends ShopperSearchParameters & Record<string, unknown>> {
    clientConfig: ClientConfig<ConfigParameters> & {
        baseUri: string;
    };
    static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/search/shopper-search/{version}/";
    static readonly apiPaths: {
        productSearch: string;
        getSearchSuggestions: string;
    };
    constructor(config: ClientConfigInit<ConfigParameters>);
    static readonly paramKeys: {
        readonly productSearch: readonly ["organizationId", "select", "siteId", "q", "refine", "sort", "currency", "locale", "expand", "allImages", "perPricebook", "allVariationProperties", "offset", "limit"];
        readonly productSearchRequired: readonly ["organizationId", "siteId"];
        readonly getSearchSuggestions: readonly ["organizationId", "siteId", "q", "limit", "currency", "locale"];
        readonly getSearchSuggestionsRequired: readonly ["organizationId", "siteId", "q"];
    };
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
    productSearch(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            select?: string;
            siteId: string;
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
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<ProductSearchResult>;
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
    productSearch<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            select?: string;
            siteId: string;
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
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : ProductSearchResult>;
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
    getSearchSuggestions(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            siteId: string;
            q: string;
            limit?: number;
            currency?: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<SuggestionResult>;
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
    getSearchSuggestions<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            siteId: string;
            q: string;
            limit?: number;
            currency?: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : SuggestionResult>;
}

type shopperSearch_AttributeDefinition = AttributeDefinition;
type shopperSearch_BoolFilter = BoolFilter;
type shopperSearch_BoolQuery = BoolQuery;
type shopperSearch_BrandSuggestions = BrandSuggestions;
type shopperSearch_CategorySuggestions = CategorySuggestions;
type shopperSearch_ChangeControlled = ChangeControlled;
type shopperSearch_ChangeControlledDataType = ChangeControlledDataType;
type shopperSearch_ClosedObject = ClosedObject;
type shopperSearch_CustomSuggestions = CustomSuggestions;
type shopperSearch_Error = Error;
type shopperSearch_ErrorResponse = ErrorResponse;
type shopperSearch_Filter = Filter;
type shopperSearch_FilteredQuery = FilteredQuery;
type shopperSearch_Image = Image;
type shopperSearch_ImageGroup = ImageGroup;
type shopperSearch_L10nString = L10nString;
type shopperSearch_LocalizedString = LocalizedString;
type shopperSearch_MatchAllQuery = MatchAllQuery;
type shopperSearch_Money = Money;
type shopperSearch_MoneyMnemonic = MoneyMnemonic;
type shopperSearch_NestedQuery = NestedQuery;
type shopperSearch_NoPropertiesAllowed = NoPropertiesAllowed;
type shopperSearch_OpenObject = OpenObject;
type shopperSearch_PaginatedSearchResult = PaginatedSearchResult;
type shopperSearch_PaginatedSearchResultBase = PaginatedSearchResultBase;
type shopperSearch_PriceRange = PriceRange;
type shopperSearch_ProductPriceTable = ProductPriceTable;
type shopperSearch_ProductPromotion = ProductPromotion;
type shopperSearch_ProductRef = ProductRef;
type shopperSearch_ProductSearchHit = ProductSearchHit;
type shopperSearch_ProductSearchRefinement = ProductSearchRefinement;
type shopperSearch_ProductSearchRefinementValue = ProductSearchRefinementValue;
type shopperSearch_ProductSearchResult = ProductSearchResult;
type shopperSearch_ProductSearchSortingOption = ProductSearchSortingOption;
type shopperSearch_ProductSuggestions = ProductSuggestions;
type shopperSearch_ProductType = ProductType;
type shopperSearch_PropertyDefinition = PropertyDefinition;
type shopperSearch_PropertyValueDefinition = PropertyValueDefinition;
type shopperSearch_Query = Query;
type shopperSearch_QueryFilter = QueryFilter;
type shopperSearch_Range2Filter = Range2Filter;
type shopperSearch_RangeFilter = RangeFilter;
type shopperSearch_SearchRequest = SearchRequest;
type shopperSearch_SearchRequestBase = SearchRequestBase;
type shopperSearch_ShopperSearch<ConfigParameters extends ShopperSearchParameters & Record<string, unknown>> = ShopperSearch<ConfigParameters>;
declare const shopperSearch_ShopperSearch: typeof ShopperSearch;
type shopperSearch_ShopperSearchParameters = ShopperSearchParameters;
type shopperSearch_ShopperSearchPathParameters = ShopperSearchPathParameters;
type shopperSearch_ShopperSearchQueryParameters = ShopperSearchQueryParameters;
type shopperSearch_SimpleSearchResult = SimpleSearchResult;
type shopperSearch_SimpleSearchResultBase = SimpleSearchResultBase;
type shopperSearch_Sort = Sort;
type shopperSearch_SpecifiedPropertiesAllowed = SpecifiedPropertiesAllowed;
type shopperSearch_SuggestedCategory = SuggestedCategory;
type shopperSearch_SuggestedPhrase = SuggestedPhrase;
type shopperSearch_SuggestedProduct = SuggestedProduct;
type shopperSearch_SuggestedTerm = SuggestedTerm;
type shopperSearch_SuggestedTerms = SuggestedTerms;
type shopperSearch_Suggestion = Suggestion;
type shopperSearch_SuggestionResult = SuggestionResult;
type shopperSearch_TermFilter = TermFilter;
type shopperSearch_TermQuery = TermQuery;
type shopperSearch_TextQuery = TextQuery;
type shopperSearch_Variant = Variant;
type shopperSearch_VariationAttribute = VariationAttribute;
type shopperSearch_VariationAttributeValue = VariationAttributeValue;
type shopperSearch_VariationGroup = VariationGroup;
declare namespace shopperSearch {
  export { type shopperSearch_AttributeDefinition as AttributeDefinition, type shopperSearch_BoolFilter as BoolFilter, type shopperSearch_BoolQuery as BoolQuery, type shopperSearch_BrandSuggestions as BrandSuggestions, type shopperSearch_CategorySuggestions as CategorySuggestions, type shopperSearch_ChangeControlled as ChangeControlled, type shopperSearch_ChangeControlledDataType as ChangeControlledDataType, type shopperSearch_ClosedObject as ClosedObject, type shopperSearch_CustomSuggestions as CustomSuggestions, type shopperSearch_Error as Error, type shopperSearch_ErrorResponse as ErrorResponse, type shopperSearch_Filter as Filter, type shopperSearch_FilteredQuery as FilteredQuery, type shopperSearch_Image as Image, type shopperSearch_ImageGroup as ImageGroup, type shopperSearch_L10nString as L10nString, type shopperSearch_LocalizedString as LocalizedString, type shopperSearch_MatchAllQuery as MatchAllQuery, type shopperSearch_Money as Money, type shopperSearch_MoneyMnemonic as MoneyMnemonic, type shopperSearch_NestedQuery as NestedQuery, type shopperSearch_NoPropertiesAllowed as NoPropertiesAllowed, type shopperSearch_OpenObject as OpenObject, type shopperSearch_PaginatedSearchResult as PaginatedSearchResult, type shopperSearch_PaginatedSearchResultBase as PaginatedSearchResultBase, type shopperSearch_PriceRange as PriceRange, type shopperSearch_ProductPriceTable as ProductPriceTable, type shopperSearch_ProductPromotion as ProductPromotion, type shopperSearch_ProductRef as ProductRef, type shopperSearch_ProductSearchHit as ProductSearchHit, type shopperSearch_ProductSearchRefinement as ProductSearchRefinement, type shopperSearch_ProductSearchRefinementValue as ProductSearchRefinementValue, type shopperSearch_ProductSearchResult as ProductSearchResult, type shopperSearch_ProductSearchSortingOption as ProductSearchSortingOption, type shopperSearch_ProductSuggestions as ProductSuggestions, type shopperSearch_ProductType as ProductType, type shopperSearch_PropertyDefinition as PropertyDefinition, type shopperSearch_PropertyValueDefinition as PropertyValueDefinition, type shopperSearch_Query as Query, type shopperSearch_QueryFilter as QueryFilter, type shopperSearch_Range2Filter as Range2Filter, type shopperSearch_RangeFilter as RangeFilter, type shopperSearch_SearchRequest as SearchRequest, type shopperSearch_SearchRequestBase as SearchRequestBase, shopperSearch_ShopperSearch as ShopperSearch, type shopperSearch_ShopperSearchParameters as ShopperSearchParameters, type shopperSearch_ShopperSearchPathParameters as ShopperSearchPathParameters, type shopperSearch_ShopperSearchQueryParameters as ShopperSearchQueryParameters, type shopperSearch_SimpleSearchResult as SimpleSearchResult, type shopperSearch_SimpleSearchResultBase as SimpleSearchResultBase, type shopperSearch_Sort as Sort, type shopperSearch_SpecifiedPropertiesAllowed as SpecifiedPropertiesAllowed, type shopperSearch_SuggestedCategory as SuggestedCategory, type shopperSearch_SuggestedPhrase as SuggestedPhrase, type shopperSearch_SuggestedProduct as SuggestedProduct, type shopperSearch_SuggestedTerm as SuggestedTerm, type shopperSearch_SuggestedTerms as SuggestedTerms, type shopperSearch_Suggestion as Suggestion, type shopperSearch_SuggestionResult as SuggestionResult, type shopperSearch_TermFilter as TermFilter, type shopperSearch_TermQuery as TermQuery, type shopperSearch_TextQuery as TextQuery, type shopperSearch_Variant as Variant, type shopperSearch_VariationAttribute as VariationAttribute, type shopperSearch_VariationAttributeValue as VariationAttributeValue, type shopperSearch_VariationGroup as VariationGroup };
}

export { type ImageGroup as $, type AttributeDefinition as A, type BoolFilter as B, type ClosedObject as C, type PriceRange as D, type ErrorResponse as E, type FilteredQuery as F, type CategorySuggestions as G, type SuggestedProduct as H, type SuggestedPhrase as I, type ProductSuggestions as J, type SuggestedCategory as K, type LocalizedString as L, type Money as M, type NoPropertiesAllowed as N, type OpenObject as O, type PropertyDefinition as P, type QueryFilter as Q, type Range2Filter as R, ShopperSearch as S, type TermQuery as T, type ProductType as U, type VariationAttribute as V, type Variant as W, type VariationGroup as X, type BrandSuggestions as Y, type ProductSearchRefinementValue as Z, type ProductSearchSortingOption as _, type SimpleSearchResult as a, type SuggestedTerm as a0, type ProductSearchRefinement as a1, type CustomSuggestions as a2, type ProductSearchHit as a3, type ProductSearchResult as a4, type Image as a5, type VariationAttributeValue as a6, type ProductPromotion as a7, type Suggestion as a8, type SuggestionResult as a9, type ShopperSearchPathParameters as aa, type ShopperSearchQueryParameters as ab, type ShopperSearchParameters as ac, type SearchRequest as b, type PaginatedSearchResult as c, type SpecifiedPropertiesAllowed as d, type PaginatedSearchResultBase as e, type MatchAllQuery as f, type Query as g, type TermFilter as h, type TextQuery as i, type BoolQuery as j, type SimpleSearchResultBase as k, type NestedQuery as l, type Filter as m, type Sort as n, type RangeFilter as o, type SearchRequestBase as p, type MoneyMnemonic as q, type L10nString as r, shopperSearch as s, type PropertyValueDefinition as t, type ChangeControlled as u, type ChangeControlledDataType as v, type Error as w, type ProductPriceTable as x, type ProductRef as y, type SuggestedTerms as z };

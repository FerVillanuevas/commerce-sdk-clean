import ClientConfig, { ClientConfigInit } from './clientConfig.js';
import { BaseUriParameters, RequireParametersUnlessAllAreOptional, CompositeParameters } from './helpers/types.js';

type ErrorResponse = {
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
type TaxItems = {
    taxItems?: Array<TaxItem>;
} & {
    [key: string]: any;
};
type PaymentCardSpec = {
    cardType?: string;
    checksumVerificationEnabled?: boolean;
    description?: string;
    image?: string;
    name?: string;
    numberLengths?: Array<string>;
    numberPrefixes?: Array<string>;
    securityCodeLength?: number;
} & {
    [key: string]: any;
};
type OrderAddress = {
    address1?: string;
    address2?: string;
    city?: string;
    companyName?: string;
    countryCode?: string;
    firstName?: string;
    fullName?: string;
    id?: string;
    jobTitle?: string;
    lastName?: string;
    phone?: string;
    postBox?: string;
    postalCode?: string;
    salutation?: string;
    secondName?: string;
    stateCode?: string;
    suffix?: string;
    suite?: string;
    title?: string;
} & {
    [key: string]: any;
};
type PriceAdjustmentRequest = {
    discount?: DiscountRequest;
    itemId?: string;
    itemText?: string;
    level: string;
    promotionId?: string;
    reasonCode?: string;
} & {
    [key: string]: any;
};
type PaymentCard = {
    cardType?: string;
    creditCardExpired?: boolean;
    creditCardToken?: string;
    expirationMonth?: number;
    expirationYear?: number;
    holder?: string;
    issueNumber?: string;
    maskedNumber?: string;
    numberLastDigits?: string;
    validFromMonth?: number;
    validFromYear?: number;
};
type NotesResult = {
    notes?: Array<Note>;
} & {
    [key: string]: any;
};
type ShippingItem = {
    adjustedTax?: number;
    basePrice?: number;
    itemId?: string;
    itemText?: string;
    price?: number;
    priceAdjustments?: Array<PriceAdjustment>;
    priceAfterItemDiscount?: number;
    shipmentId?: string;
    tax?: number;
    taxBasis?: number;
    taxClassId?: string;
    taxRate?: number;
} & {
    [key: string]: any;
};
type Discount = {
    amount?: number;
    percentage?: number;
    priceBookId?: string;
    type: string;
} & {
    [key: string]: any;
};
type Note = {
    createdBy?: string;
    creationDate?: any;
    id?: string;
    subject?: string;
    text?: string;
};
type CouponItem = {
    code: string;
    couponItemId?: string;
    statusCode?: string;
    valid?: boolean;
} & {
    [key: string]: any;
};
type PromotionLink = {
    calloutMsg?: string;
    name?: string;
    promotionId?: string;
    title?: string;
};
type PriceBookIds = Array<string>;
type ShippingPromotion = {
    calloutMsg?: string;
    promotionId?: string;
    promotionName?: string;
} & {
    [key: string]: any;
};
type ProductItem = {
    adjustedTax?: number;
    basePrice?: number;
    bonusDiscountLineItemId?: string;
    bonusProductLineItem?: boolean;
    bundledProductItems?: Array<ProductItem>;
    gift?: boolean;
    giftMessage?: string;
    inventoryId?: string;
    itemId?: string;
    itemText?: string;
    optionItems?: Array<OptionItem>;
    price?: number;
    priceAdjustments?: Array<PriceAdjustment>;
    priceAfterItemDiscount?: number;
    priceAfterOrderDiscount?: number;
    productId?: string;
    productListItem?: ProductListItemReference;
    productName?: string;
    quantity?: number;
    shipmentId?: string;
    shippingItemId?: string;
    tax?: number;
    taxBasis?: number;
    taxClassId?: string;
    taxRate?: number;
} & {
    [key: string]: any;
};
type BasketPaymentInstrumentRequest = {
    amount?: number;
    bankRoutingNumber?: string;
    giftCertificateCode?: string;
    paymentCard?: OrderPaymentCardRequest;
    paymentMethodId?: string;
} & {
    [key: string]: any;
};
type Taxes = {
    taxes: {} & {
        [key: string]: any;
    };
};
type OrderPaymentInstrument = {
    amount?: number;
    authorizationStatus?: Status;
    bankRoutingNumber?: string;
    maskedGiftCertificateCode?: string;
    paymentCard?: PaymentCard;
    paymentInstrumentId?: string;
    paymentMethodId?: string;
} & {
    [key: string]: any;
};
type BonusDiscountLineItem = {
    bonusProducts?: Array<ProductDetailsLink>;
    couponCode?: string;
    id?: string;
    maxBonusItems?: number;
    promotionId?: string;
} & {
    [key: string]: any;
};
type PaymentMethodResult = {
    applicablePaymentMethods?: Array<PaymentMethod>;
} & {
    [key: string]: any;
};
type Shipment = {
    adjustedMerchandizeTotalTax?: number;
    adjustedShippingTotalTax?: number;
    gift?: boolean;
    giftMessage?: string;
    merchandizeTotalTax?: number;
    productSubTotal?: number;
    productTotal?: number;
    shipmentId?: string;
    shipmentNo?: string;
    shipmentTotal?: number;
    shippingAddress?: OrderAddress;
    shippingMethod?: ShippingMethod;
    shippingStatus?: string;
    shippingTotal?: number;
    shippingTotalTax?: number;
    taxTotal?: number;
    trackingNumber?: string;
} & {
    [key: string]: any;
};
type CustomerInfo = {
    customerId?: string;
    customerName?: string;
    customerNo?: string;
    email: string;
} & {
    [key: string]: any;
};
type SimpleLink = {};
type PriceAdjustment = {
    appliedDiscount?: Discount;
    couponCode?: string;
    createdBy?: string;
    creationDate?: any;
    custom?: boolean;
    itemText?: string;
    lastModified?: any;
    manual?: boolean;
    price?: number;
    priceAdjustmentId?: string;
    promotionId?: string;
    promotionLink?: string;
    reasonCode?: string;
} & {
    [key: string]: any;
};
type ShippingMethodResult = {
    applicableShippingMethods?: Array<ShippingMethod>;
    defaultShippingMethodId?: string;
} & {
    [key: string]: any;
};
type ProductDetailsLink = {
    productDescription?: string;
    productId: string;
    productName?: string;
    title?: string;
};
type OptionItem = {
    adjustedTax?: number;
    basePrice?: number;
    bonusDiscountLineItemId?: string;
    bonusProductLineItem?: boolean;
    bundledProductItems?: Array<ProductItem>;
    gift?: boolean;
    giftMessage?: string;
    inventoryId?: string;
    itemId?: string;
    itemText?: string;
    optionId: string;
    optionItems?: Array<OptionItem>;
    optionValueId: string;
    price?: number;
    priceAdjustments?: Array<PriceAdjustment>;
    priceAfterItemDiscount?: number;
    priceAfterOrderDiscount?: number;
    productId?: string;
    productListItem?: ProductListItemReference;
    productName?: string;
    quantity?: number;
    shipmentId?: string;
    shippingItemId?: string;
    tax?: number;
    taxBasis?: number;
    taxClassId?: string;
    taxRate?: number;
} & {
    [key: string]: any;
};
type ShippingMethod = {
    description?: string;
    externalShippingMethod?: string;
    id: string;
    name?: string;
    price?: number;
    shippingPromotions?: Array<ShippingPromotion>;
} & {
    [key: string]: any;
};
type DiscountRequest = {
    type: string;
    value: number;
};
type Basket = {
    adjustedMerchandizeTotalTax?: number;
    adjustedShippingTotalTax?: number;
    agentBasket?: boolean;
    basketId?: string;
    billingAddress?: OrderAddress;
    bonusDiscountLineItems?: Array<BonusDiscountLineItem>;
    channelType?: string;
    couponItems?: Array<CouponItem>;
    creationDate?: any;
    currency?: string;
    customerInfo?: CustomerInfo;
    giftCertificateItems?: Array<GiftCertificateItem>;
    groupedTaxItems?: Array<GroupedTaxItem>;
    inventoryReservationExpiry?: any;
    lastModified?: any;
    merchandizeTotalTax?: number;
    notes?: SimpleLink;
    orderPriceAdjustments?: Array<PriceAdjustment>;
    orderTotal?: number;
    paymentInstruments?: Array<OrderPaymentInstrument>;
    productItems?: Array<ProductItem>;
    productSubTotal?: number;
    productTotal?: number;
    shipments?: Array<Shipment>;
    shippingItems?: Array<ShippingItem>;
    shippingTotal?: number;
    shippingTotalTax?: number;
    sourceCode?: string;
    taxTotal?: number;
    taxation?: string;
    taxRoundedAtGroup?: boolean;
    temporaryBasket?: boolean;
} & {
    [key: string]: any;
};
type OrderLookupRequest = {
    email: string;
    orderViewCode: string;
};
type OrderPaymentInstrumentRequest = {
    amount?: number;
    bankRoutingNumber?: string;
    giftCertificateCode?: string;
    paymentCard?: OrderPaymentCardRequest;
    paymentMethodId?: string;
} & {
    [key: string]: any;
};
type GiftCertificateItem = {
    amount: number;
    giftCertificateItemId?: string;
    message?: string;
    recipientEmail: string;
    recipientName?: string;
    senderName?: string;
    shipmentId?: string;
} & {
    [key: string]: any;
};
type ProductListLink = {
    description?: string;
    name?: string;
    public?: boolean;
    title?: string;
    type?: string;
} & {
    [key: string]: any;
};
type GroupedTaxItem = {
    taxRate?: number;
    taxValue?: number;
};
type Order = {
    adjustedMerchandizeTotalTax?: number;
    adjustedShippingTotalTax?: number;
    billingAddress?: OrderAddress;
    bonusDiscountLineItems?: Array<BonusDiscountLineItem>;
    channelType?: string;
    confirmationStatus?: string;
    couponItems?: Array<CouponItem>;
    createdBy?: string;
    creationDate?: any;
    currency?: string;
    customerInfo?: CustomerInfo;
    customerName?: string;
    exportStatus?: string;
    externalOrderStatus?: string;
    giftCertificateItems?: Array<GiftCertificateItem>;
    globalPartyId?: string;
    groupedTaxItems?: Array<GroupedTaxItem>;
    guest?: boolean;
    lastModified?: any;
    merchandizeTotalTax?: number;
    notes?: SimpleLink;
    orderNo?: string;
    orderPriceAdjustments?: Array<PriceAdjustment>;
    orderToken?: string;
    orderTotal?: number;
    orderViewCode?: string;
    paymentInstruments?: Array<OrderPaymentInstrument>;
    paymentStatus?: string;
    productItems?: Array<ProductItem>;
    productSubTotal?: number;
    productTotal?: number;
    shipments?: Array<Shipment>;
    shippingItems?: Array<ShippingItem>;
    shippingStatus?: string;
    shippingTotal?: number;
    shippingTotalTax?: number;
    siteId?: string;
    sourceCode?: string;
    status?: string;
    taxRoundedAtGroup?: boolean;
    taxTotal?: number;
    taxation?: string;
} & {
    [key: string]: any;
};
type OrderPaymentCardRequest = {
    cardType?: string;
    creditCardToken?: string;
    expirationMonth?: number;
    expirationYear?: number;
    holder?: string;
    issueNumber?: string;
    maskedNumber?: string;
    validFromMonth?: number;
    validFromYear?: number;
};
type PaymentMethod = {
    cards?: Array<PaymentCardSpec>;
    description?: string;
    id: string;
    image?: string;
    name?: string;
    paymentProcessorId?: string;
} & {
    [key: string]: any;
};
type TaxItem = {
    id: string;
    rate: number;
    value?: number;
};
type Status = {
    code?: string;
    message?: string;
    status?: number;
};
type ProductListItemReference = {
    id: string;
    priority?: number;
    productDetailsLink?: ProductDetailsLink;
    productList?: ProductListLink;
    public?: boolean;
    purchasedQuantity?: number;
    quantity?: number;
    type?: string;
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
/**
 * All path parameters that are used by at least one ShopperOrders method.
 */
type ShopperOrdersPathParameters = {
    organizationId?: string;
    orderNo?: string;
    paymentInstrumentId?: string;
};
/**
 * All query parameters that are used by at least one ShopperOrders method.
 */
type ShopperOrdersQueryParameters = {
    siteId?: string;
    locale?: string;
};
/**
 * All parameters that are used by ShopperOrders.
 */
type ShopperOrdersParameters = ShopperOrdersPathParameters & BaseUriParameters & ShopperOrdersQueryParameters;
/**
* [Shopper Orders](https://developer.salesforce.com/docs/commerce/commerce-api/references?meta=shopper-orders:Summary)
* ==================================
*
* *Finish the shopper checkout experience resulting in an order.*<br />
*
* Simple example:
*
* ```typescript
*   import { ShopperOrders } from "commerce-sdk-isomorphic";
*
*   const clientConfig = {
*     parameters: {
*       clientId: "XXXXXX",
*       organizationId: "XXXX",
*       shortCode: "XXX",
*       siteId: "XX"
*     }
*   };
*   const shopperOrdersClient = new ShopperOrders(clientConfig);
* ```
*
* <span style="font-size:.7em; display:block; text-align: right">
* API Version: 0.4.8<br />
* Last Updated: <br />
* </span>
*
*
*/
declare class ShopperOrders<ConfigParameters extends ShopperOrdersParameters & Record<string, unknown>> {
    clientConfig: ClientConfig<ConfigParameters> & {
        baseUri: string;
    };
    static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/checkout/shopper-orders/{version}";
    static readonly apiPaths: {
        createOrder: string;
        getOrder: string;
        guestOrderLookup: string;
        createPaymentInstrumentForOrder: string;
        removePaymentInstrumentFromOrder: string;
        updatePaymentInstrumentForOrder: string;
        getPaymentMethodsForOrder: string;
        getTaxesFromOrder: string;
    };
    constructor(config: ClientConfigInit<ConfigParameters>);
    static readonly paramKeys: {
        readonly createOrder: readonly ["organizationId", "siteId", "locale"];
        readonly createOrderRequired: readonly ["organizationId", "siteId"];
        readonly getOrder: readonly ["organizationId", "orderNo", "siteId", "locale"];
        readonly getOrderRequired: readonly ["organizationId", "orderNo", "siteId"];
        readonly guestOrderLookup: readonly ["organizationId", "orderNo", "siteId", "locale"];
        readonly guestOrderLookupRequired: readonly ["organizationId", "orderNo", "siteId"];
        readonly createPaymentInstrumentForOrder: readonly ["organizationId", "orderNo", "siteId", "locale"];
        readonly createPaymentInstrumentForOrderRequired: readonly ["organizationId", "orderNo", "siteId"];
        readonly removePaymentInstrumentFromOrder: readonly ["organizationId", "orderNo", "paymentInstrumentId", "siteId", "locale"];
        readonly removePaymentInstrumentFromOrderRequired: readonly ["organizationId", "orderNo", "paymentInstrumentId", "siteId"];
        readonly updatePaymentInstrumentForOrder: readonly ["organizationId", "orderNo", "paymentInstrumentId", "siteId", "locale"];
        readonly updatePaymentInstrumentForOrderRequired: readonly ["organizationId", "orderNo", "paymentInstrumentId", "siteId"];
        readonly getPaymentMethodsForOrder: readonly ["organizationId", "orderNo", "siteId", "locale"];
        readonly getPaymentMethodsForOrderRequired: readonly ["organizationId", "orderNo", "siteId"];
        readonly getTaxesFromOrder: readonly ["organizationId", "orderNo", "siteId"];
        readonly getTaxesFromOrderRequired: readonly ["organizationId", "orderNo", "siteId"];
    };
    /**
    * Submits an order based on a prepared basket. The only considered value from the request body is basketId.
    *
    * If you would like to get a raw Response object use the other createOrder function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param siteId -
    * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
Below are some valid examples:
- en-US
- de-AT
- de
- default
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type Order.
    *
    */
    createOrder(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Basket;
    }>): Promise<Order>;
    /**
    * Submits an order based on a prepared basket. The only considered value from the request body is basketId.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param siteId -
    * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
Below are some valid examples:
- en-US
- de-AT
- de
- default
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type Order otherwise.
    *
    */
    createOrder<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Basket;
    }>, rawResponse?: T): Promise<T extends true ? Response : Order>;
    /**
    * Gets information for an order.
    *
    * If you would like to get a raw Response object use the other getOrder function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param orderNo - The order number of the order to be modified.
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
    * @returns A promise of type Order.
    *
    */
    getOrder(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            orderNo: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Order>;
    /**
    * Gets information for an order.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param orderNo - The order number of the order to be modified.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Order otherwise.
    *
    */
    getOrder<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            orderNo: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Order>;
    /**
    * Use this endpoint to lookup a guest order.

**Important**: This endpoint uses the [ShopperTokenTsob](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-login?meta=security%3AShopperTokenTsob) security scheme. Always check the Security section of the endpoint documentation, which is hidden by default.
 
The API uses the `orderViewCode` generated during the order creation and the `email` of the order customer to lookup a guest order. If email is not provided on the order, the field can be left blank in the lookup request.
**Note**: In the no email on order scenario, the custom implementation must include an additional verification of an order attribute. For example, a postal code or mobile number.

This API can also be used for looking up an order for a registered customer. In addition to the verification steps used for guest order lookup, the API also verifies that the customer ID of the order matches with the customer ID supplied in the `ShopperTokenTsob`.


    *
    * If you would like to get a raw Response object use the other guestOrderLookup function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param orderNo - The order number of the order to be modified.
    * @param siteId -
    * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
Below are some valid examples:
- en-US
- de-AT
- de
- default
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type Order.
    *
    */
    guestOrderLookup(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            orderNo: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: OrderLookupRequest;
    }>): Promise<Order>;
    /**
    * Use this endpoint to lookup a guest order.

**Important**: This endpoint uses the [ShopperTokenTsob](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-login?meta=security%3AShopperTokenTsob) security scheme. Always check the Security section of the endpoint documentation, which is hidden by default.
 
The API uses the `orderViewCode` generated during the order creation and the `email` of the order customer to lookup a guest order. If email is not provided on the order, the field can be left blank in the lookup request.
**Note**: In the no email on order scenario, the custom implementation must include an additional verification of an order attribute. For example, a postal code or mobile number.

This API can also be used for looking up an order for a registered customer. In addition to the verification steps used for guest order lookup, the API also verifies that the customer ID of the order matches with the customer ID supplied in the `ShopperTokenTsob`.


    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param orderNo - The order number of the order to be modified.
    * @param siteId -
    * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
Below are some valid examples:
- en-US
- de-AT
- de
- default
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type Order otherwise.
    *
    */
    guestOrderLookup<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            orderNo: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: OrderLookupRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : Order>;
    /**
    * Adds a payment instrument to an order.

Details:

The payment instrument is added with the provided details. The payment method must be applicable for the order see GET
/baskets/\{basketId\}/payment-methods, if the payment method is 'CREDIT_CARD' a paymentCard must be specified in the request.
    *
    * If you would like to get a raw Response object use the other createPaymentInstrumentForOrder function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param orderNo - The order number of the order to be modified.
    * @param siteId -
    * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
Below are some valid examples:
- en-US
- de-AT
- de
- default
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type Order.
    *
    */
    createPaymentInstrumentForOrder(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            orderNo: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: OrderPaymentInstrumentRequest;
    }>): Promise<Order>;
    /**
    * Adds a payment instrument to an order.

Details:

The payment instrument is added with the provided details. The payment method must be applicable for the order see GET
/baskets/\{basketId\}/payment-methods, if the payment method is 'CREDIT_CARD' a paymentCard must be specified in the request.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param orderNo - The order number of the order to be modified.
    * @param siteId -
    * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
Below are some valid examples:
- en-US
- de-AT
- de
- default
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type Order otherwise.
    *
    */
    createPaymentInstrumentForOrder<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            orderNo: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: OrderPaymentInstrumentRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : Order>;
    /**
    * Removes a payment instrument of an order.
    *
    * If you would like to get a raw Response object use the other removePaymentInstrumentFromOrder function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param orderNo - The order number of the order to be modified.
    * @param paymentInstrumentId - The ID of the payment instrument to be updated.
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
    * @returns A promise of type Order.
    *
    */
    removePaymentInstrumentFromOrder(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            orderNo: string;
            paymentInstrumentId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Order>;
    /**
    * Removes a payment instrument of an order.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param orderNo - The order number of the order to be modified.
    * @param paymentInstrumentId - The ID of the payment instrument to be updated.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Order otherwise.
    *
    */
    removePaymentInstrumentFromOrder<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            orderNo: string;
            paymentInstrumentId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Order>;
    /**
    * Updates a payment instrument of an order.

Details:

The payment instrument is updated with the provided details. The payment method must be applicable for the
order see GET /baskets/\{basketId\}/payment-methods, if the payment method is 'CREDIT_CARD' a
paymentCard must be specified in the request.
    *
    * If you would like to get a raw Response object use the other updatePaymentInstrumentForOrder function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param orderNo - The order number of the order to be modified.
    * @param paymentInstrumentId - The ID of the payment instrument to be updated.
    * @param siteId -
    * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
Below are some valid examples:
- en-US
- de-AT
- de
- default
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type Order.
    *
    */
    updatePaymentInstrumentForOrder(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            orderNo: string;
            paymentInstrumentId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: OrderPaymentInstrumentRequest;
    }>): Promise<Order>;
    /**
    * Updates a payment instrument of an order.

Details:

The payment instrument is updated with the provided details. The payment method must be applicable for the
order see GET /baskets/\{basketId\}/payment-methods, if the payment method is 'CREDIT_CARD' a
paymentCard must be specified in the request.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param orderNo - The order number of the order to be modified.
    * @param paymentInstrumentId - The ID of the payment instrument to be updated.
    * @param siteId -
    * @param locale - A descriptor to provide locale context for a geographical region by both a language and/or country code. The locale pattern in the query param follows the ISO 639-1 for the language code (e.g. en, de, fr) and ISO 3166-1 for the country code (e.g. US, DE, AT). The param can be a combination of language code and country code or can just refer to the language code.
Below are some valid examples:
- en-US
- de-AT
- de
- default
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type Order otherwise.
    *
    */
    updatePaymentInstrumentForOrder<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            orderNo: string;
            paymentInstrumentId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: OrderPaymentInstrumentRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : Order>;
    /**
    * Gets the applicable payment methods for an existing order considering the open payment amount only.
    *
    * If you would like to get a raw Response object use the other getPaymentMethodsForOrder function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param orderNo - The order number of the order to be modified.
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
    * @returns A promise of type PaymentMethodResult.
    *
    */
    getPaymentMethodsForOrder(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            orderNo: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<PaymentMethodResult>;
    /**
    * Gets the applicable payment methods for an existing order considering the open payment amount only.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param orderNo - The order number of the order to be modified.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type PaymentMethodResult otherwise.
    *
    */
    getPaymentMethodsForOrder<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            orderNo: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : PaymentMethodResult>;
    /**
    * This method gives you the external taxation data of the order transferred from the basket during
order creation. This endpoint can be called only if external taxation was used. See POST /baskets
for more information.
    *
    * If you would like to get a raw Response object use the other getTaxesFromOrder function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param orderNo - The order number of the order to be modified.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type Taxes.
    *
    */
    getTaxesFromOrder(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            orderNo: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Taxes>;
    /**
    * This method gives you the external taxation data of the order transferred from the basket during
order creation. This endpoint can be called only if external taxation was used. See POST /baskets
for more information.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param orderNo - The order number of the order to be modified.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type Taxes otherwise.
    *
    */
    getTaxesFromOrder<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            orderNo: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Taxes>;
}

type shopperOrders_AttributeDefinition = AttributeDefinition;
type shopperOrders_Basket = Basket;
type shopperOrders_BasketPaymentInstrumentRequest = BasketPaymentInstrumentRequest;
type shopperOrders_BonusDiscountLineItem = BonusDiscountLineItem;
type shopperOrders_BoolFilter = BoolFilter;
type shopperOrders_BoolQuery = BoolQuery;
type shopperOrders_ChangeControlled = ChangeControlled;
type shopperOrders_ChangeControlledDataType = ChangeControlledDataType;
type shopperOrders_ClosedObject = ClosedObject;
type shopperOrders_CouponItem = CouponItem;
type shopperOrders_CustomerInfo = CustomerInfo;
type shopperOrders_Discount = Discount;
type shopperOrders_DiscountRequest = DiscountRequest;
type shopperOrders_Error = Error;
type shopperOrders_ErrorResponse = ErrorResponse;
type shopperOrders_Filter = Filter;
type shopperOrders_FilteredQuery = FilteredQuery;
type shopperOrders_GiftCertificateItem = GiftCertificateItem;
type shopperOrders_GroupedTaxItem = GroupedTaxItem;
type shopperOrders_L10nString = L10nString;
type shopperOrders_LocalizedString = LocalizedString;
type shopperOrders_MatchAllQuery = MatchAllQuery;
type shopperOrders_Money = Money;
type shopperOrders_MoneyMnemonic = MoneyMnemonic;
type shopperOrders_NestedQuery = NestedQuery;
type shopperOrders_NoPropertiesAllowed = NoPropertiesAllowed;
type shopperOrders_Note = Note;
type shopperOrders_NotesResult = NotesResult;
type shopperOrders_OpenObject = OpenObject;
type shopperOrders_OptionItem = OptionItem;
type shopperOrders_Order = Order;
type shopperOrders_OrderAddress = OrderAddress;
type shopperOrders_OrderLookupRequest = OrderLookupRequest;
type shopperOrders_OrderPaymentCardRequest = OrderPaymentCardRequest;
type shopperOrders_OrderPaymentInstrument = OrderPaymentInstrument;
type shopperOrders_OrderPaymentInstrumentRequest = OrderPaymentInstrumentRequest;
type shopperOrders_PaginatedSearchResult = PaginatedSearchResult;
type shopperOrders_PaginatedSearchResultBase = PaginatedSearchResultBase;
type shopperOrders_PaymentCard = PaymentCard;
type shopperOrders_PaymentCardSpec = PaymentCardSpec;
type shopperOrders_PaymentMethod = PaymentMethod;
type shopperOrders_PaymentMethodResult = PaymentMethodResult;
type shopperOrders_PriceAdjustment = PriceAdjustment;
type shopperOrders_PriceAdjustmentRequest = PriceAdjustmentRequest;
type shopperOrders_PriceBookIds = PriceBookIds;
type shopperOrders_ProductDetailsLink = ProductDetailsLink;
type shopperOrders_ProductItem = ProductItem;
type shopperOrders_ProductListItemReference = ProductListItemReference;
type shopperOrders_ProductListLink = ProductListLink;
type shopperOrders_PromotionLink = PromotionLink;
type shopperOrders_PropertyDefinition = PropertyDefinition;
type shopperOrders_PropertyValueDefinition = PropertyValueDefinition;
type shopperOrders_Query = Query;
type shopperOrders_QueryFilter = QueryFilter;
type shopperOrders_Range2Filter = Range2Filter;
type shopperOrders_RangeFilter = RangeFilter;
type shopperOrders_SearchRequest = SearchRequest;
type shopperOrders_SearchRequestBase = SearchRequestBase;
type shopperOrders_Shipment = Shipment;
type shopperOrders_ShippingItem = ShippingItem;
type shopperOrders_ShippingMethod = ShippingMethod;
type shopperOrders_ShippingMethodResult = ShippingMethodResult;
type shopperOrders_ShippingPromotion = ShippingPromotion;
type shopperOrders_ShopperOrders<ConfigParameters extends ShopperOrdersParameters & Record<string, unknown>> = ShopperOrders<ConfigParameters>;
declare const shopperOrders_ShopperOrders: typeof ShopperOrders;
type shopperOrders_ShopperOrdersParameters = ShopperOrdersParameters;
type shopperOrders_ShopperOrdersPathParameters = ShopperOrdersPathParameters;
type shopperOrders_ShopperOrdersQueryParameters = ShopperOrdersQueryParameters;
type shopperOrders_SimpleLink = SimpleLink;
type shopperOrders_SimpleSearchResult = SimpleSearchResult;
type shopperOrders_SimpleSearchResultBase = SimpleSearchResultBase;
type shopperOrders_Sort = Sort;
type shopperOrders_SpecifiedPropertiesAllowed = SpecifiedPropertiesAllowed;
type shopperOrders_Status = Status;
type shopperOrders_TaxItem = TaxItem;
type shopperOrders_TaxItems = TaxItems;
type shopperOrders_Taxes = Taxes;
type shopperOrders_TermFilter = TermFilter;
type shopperOrders_TermQuery = TermQuery;
type shopperOrders_TextQuery = TextQuery;
declare namespace shopperOrders {
  export { type shopperOrders_AttributeDefinition as AttributeDefinition, type shopperOrders_Basket as Basket, type shopperOrders_BasketPaymentInstrumentRequest as BasketPaymentInstrumentRequest, type shopperOrders_BonusDiscountLineItem as BonusDiscountLineItem, type shopperOrders_BoolFilter as BoolFilter, type shopperOrders_BoolQuery as BoolQuery, type shopperOrders_ChangeControlled as ChangeControlled, type shopperOrders_ChangeControlledDataType as ChangeControlledDataType, type shopperOrders_ClosedObject as ClosedObject, type shopperOrders_CouponItem as CouponItem, type shopperOrders_CustomerInfo as CustomerInfo, type shopperOrders_Discount as Discount, type shopperOrders_DiscountRequest as DiscountRequest, type shopperOrders_Error as Error, type shopperOrders_ErrorResponse as ErrorResponse, type shopperOrders_Filter as Filter, type shopperOrders_FilteredQuery as FilteredQuery, type shopperOrders_GiftCertificateItem as GiftCertificateItem, type shopperOrders_GroupedTaxItem as GroupedTaxItem, type shopperOrders_L10nString as L10nString, type shopperOrders_LocalizedString as LocalizedString, type shopperOrders_MatchAllQuery as MatchAllQuery, type shopperOrders_Money as Money, type shopperOrders_MoneyMnemonic as MoneyMnemonic, type shopperOrders_NestedQuery as NestedQuery, type shopperOrders_NoPropertiesAllowed as NoPropertiesAllowed, type shopperOrders_Note as Note, type shopperOrders_NotesResult as NotesResult, type shopperOrders_OpenObject as OpenObject, type shopperOrders_OptionItem as OptionItem, type shopperOrders_Order as Order, type shopperOrders_OrderAddress as OrderAddress, type shopperOrders_OrderLookupRequest as OrderLookupRequest, type shopperOrders_OrderPaymentCardRequest as OrderPaymentCardRequest, type shopperOrders_OrderPaymentInstrument as OrderPaymentInstrument, type shopperOrders_OrderPaymentInstrumentRequest as OrderPaymentInstrumentRequest, type shopperOrders_PaginatedSearchResult as PaginatedSearchResult, type shopperOrders_PaginatedSearchResultBase as PaginatedSearchResultBase, type shopperOrders_PaymentCard as PaymentCard, type shopperOrders_PaymentCardSpec as PaymentCardSpec, type shopperOrders_PaymentMethod as PaymentMethod, type shopperOrders_PaymentMethodResult as PaymentMethodResult, type shopperOrders_PriceAdjustment as PriceAdjustment, type shopperOrders_PriceAdjustmentRequest as PriceAdjustmentRequest, type shopperOrders_PriceBookIds as PriceBookIds, type shopperOrders_ProductDetailsLink as ProductDetailsLink, type shopperOrders_ProductItem as ProductItem, type shopperOrders_ProductListItemReference as ProductListItemReference, type shopperOrders_ProductListLink as ProductListLink, type shopperOrders_PromotionLink as PromotionLink, type shopperOrders_PropertyDefinition as PropertyDefinition, type shopperOrders_PropertyValueDefinition as PropertyValueDefinition, type shopperOrders_Query as Query, type shopperOrders_QueryFilter as QueryFilter, type shopperOrders_Range2Filter as Range2Filter, type shopperOrders_RangeFilter as RangeFilter, type shopperOrders_SearchRequest as SearchRequest, type shopperOrders_SearchRequestBase as SearchRequestBase, type shopperOrders_Shipment as Shipment, type shopperOrders_ShippingItem as ShippingItem, type shopperOrders_ShippingMethod as ShippingMethod, type shopperOrders_ShippingMethodResult as ShippingMethodResult, type shopperOrders_ShippingPromotion as ShippingPromotion, shopperOrders_ShopperOrders as ShopperOrders, type shopperOrders_ShopperOrdersParameters as ShopperOrdersParameters, type shopperOrders_ShopperOrdersPathParameters as ShopperOrdersPathParameters, type shopperOrders_ShopperOrdersQueryParameters as ShopperOrdersQueryParameters, type shopperOrders_SimpleLink as SimpleLink, type shopperOrders_SimpleSearchResult as SimpleSearchResult, type shopperOrders_SimpleSearchResultBase as SimpleSearchResultBase, type shopperOrders_Sort as Sort, type shopperOrders_SpecifiedPropertiesAllowed as SpecifiedPropertiesAllowed, type shopperOrders_Status as Status, type shopperOrders_TaxItem as TaxItem, type shopperOrders_TaxItems as TaxItems, type shopperOrders_Taxes as Taxes, type shopperOrders_TermFilter as TermFilter, type shopperOrders_TermQuery as TermQuery, type shopperOrders_TextQuery as TextQuery };
}

export { type Shipment as $, type AttributeDefinition as A, type BoolFilter as B, type ClosedObject as C, type ShippingItem as D, type ErrorResponse as E, type FilteredQuery as F, type Discount as G, type Note as H, type CouponItem as I, type PromotionLink as J, type PriceBookIds as K, type LocalizedString as L, type Money as M, type NoPropertiesAllowed as N, type OpenObject as O, type PropertyDefinition as P, type QueryFilter as Q, type Range2Filter as R, ShopperOrders as S, type TermQuery as T, type ShippingPromotion as U, type ProductItem as V, type BasketPaymentInstrumentRequest as W, type Taxes as X, type OrderPaymentInstrument as Y, type BonusDiscountLineItem as Z, type PaymentMethodResult as _, type SimpleSearchResult as a, type CustomerInfo as a0, type SimpleLink as a1, type PriceAdjustment as a2, type ShippingMethodResult as a3, type ProductDetailsLink as a4, type OptionItem as a5, type ShippingMethod as a6, type DiscountRequest as a7, type Basket as a8, type OrderLookupRequest as a9, type OrderPaymentInstrumentRequest as aa, type GiftCertificateItem as ab, type ProductListLink as ac, type GroupedTaxItem as ad, type Order as ae, type OrderPaymentCardRequest as af, type PaymentMethod as ag, type TaxItem as ah, type Status as ai, type ProductListItemReference as aj, type ChangeControlled as ak, type ChangeControlledDataType as al, type Error as am, type ShopperOrdersPathParameters as an, type ShopperOrdersQueryParameters as ao, type ShopperOrdersParameters as ap, type SearchRequest as b, type PaginatedSearchResult as c, type SpecifiedPropertiesAllowed as d, type PaginatedSearchResultBase as e, type MatchAllQuery as f, type Query as g, type TermFilter as h, type TextQuery as i, type BoolQuery as j, type SimpleSearchResultBase as k, type NestedQuery as l, type Filter as m, type Sort as n, type RangeFilter as o, type SearchRequestBase as p, type MoneyMnemonic as q, type L10nString as r, shopperOrders as s, type PropertyValueDefinition as t, type TaxItems as u, type PaymentCardSpec as v, type OrderAddress as w, type PriceAdjustmentRequest as x, type PaymentCard as y, type NotesResult as z };

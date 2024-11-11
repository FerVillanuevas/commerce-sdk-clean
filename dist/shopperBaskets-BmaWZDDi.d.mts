import ClientConfig, { ClientConfigInit } from './clientConfig.mjs';
import { BaseUriParameters, RequireParametersUnlessAllAreOptional, CompositeParameters } from './helpers/types.mjs';

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
 * All path parameters that are used by at least one ShopperBaskets method.
 */
type ShopperBasketsPathParameters = {
    organizationId?: string;
    basketId?: string;
    couponItemId?: string;
    giftCertificateItemId?: string;
    itemId?: string;
    paymentInstrumentId?: string;
    priceAdjustmentId?: string;
    shipmentId?: string;
};
/**
 * All query parameters that are used by at least one ShopperBaskets method.
 */
type ShopperBasketsQueryParameters = {
    taxMode?: string;
    temporary?: boolean;
    siteId?: string;
    locale?: string;
    overrideExisting?: boolean;
    createDestinationBasket?: boolean;
    productItemMergeMode?: string;
    removeExternalTax?: boolean;
    useAsShipping?: boolean;
    useAsBilling?: boolean;
    exchange?: boolean;
};
/**
 * All parameters that are used by ShopperBaskets.
 */
type ShopperBasketsParameters = ShopperBasketsPathParameters & BaseUriParameters & ShopperBasketsQueryParameters;
/**
* [Shopper Baskets](https://developer.salesforce.com/docs/commerce/commerce-api/references?meta=shopper-baskets:Summary)
* ==================================
*
* *Build a checkout experience.*<br />
*
* Simple example:
*
* ```typescript
*   import { ShopperBaskets } from "commerce-sdk-isomorphic";
*
*   const clientConfig = {
*     parameters: {
*       clientId: "XXXXXX",
*       organizationId: "XXXX",
*       shortCode: "XXX",
*       siteId: "XX"
*     }
*   };
*   const shopperBasketsClient = new ShopperBaskets(clientConfig);
* ```
*
* <span style="font-size:.7em; display:block; text-align: right">
* API Version: 2.0.9<br />
* Last Updated: <br />
* </span>
*
*
*/
declare class ShopperBaskets<ConfigParameters extends ShopperBasketsParameters & Record<string, unknown>> {
    clientConfig: ClientConfig<ConfigParameters> & {
        baseUri: string;
    };
    static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/{version}";
    static readonly apiPaths: {
        createBasket: string;
        transferBasket: string;
        mergeBasket: string;
        deleteBasket: string;
        getBasket: string;
        updateBasket: string;
        updateAsAgentBasket: string;
        updateBillingAddressForBasket: string;
        addCouponToBasket: string;
        removeCouponFromBasket: string;
        updateCustomerForBasket: string;
        addGiftCertificateItemToBasket: string;
        removeGiftCertificateItemFromBasket: string;
        updateGiftCertificateItemInBasket: string;
        addItemToBasket: string;
        updateItemsInBasket: string;
        removeItemFromBasket: string;
        updateItemInBasket: string;
        addTaxesForBasketItem: string;
        addPaymentInstrumentToBasket: string;
        removePaymentInstrumentFromBasket: string;
        updatePaymentInstrumentInBasket: string;
        getPaymentMethodsForBasket: string;
        addPriceAdjustmentToBasket: string;
        removePriceAdjustmentFromBasket: string;
        updatePriceAdjustmentInBasket: string;
        getPriceBooksForBasket: string;
        addPriceBooksToBasket: string;
        createShipmentForBasket: string;
        removeShipmentFromBasket: string;
        updateShipmentForBasket: string;
        updateShippingAddressForShipment: string;
        updateShippingMethodForShipment: string;
        getShippingMethodsForShipment: string;
        updateAsStorefrontBasket: string;
        getTaxesFromBasket: string;
        addTaxesForBasket: string;
    };
    constructor(config: ClientConfigInit<ConfigParameters>);
    static readonly paramKeys: {
        readonly createBasket: readonly ["organizationId", "taxMode", "temporary", "siteId", "locale"];
        readonly createBasketRequired: readonly ["organizationId", "siteId"];
        readonly transferBasket: readonly ["organizationId", "overrideExisting", "siteId", "locale"];
        readonly transferBasketRequired: readonly ["organizationId", "siteId"];
        readonly mergeBasket: readonly ["organizationId", "createDestinationBasket", "productItemMergeMode", "siteId", "locale"];
        readonly mergeBasketRequired: readonly ["organizationId", "siteId"];
        readonly deleteBasket: readonly ["organizationId", "basketId", "siteId"];
        readonly deleteBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly getBasket: readonly ["organizationId", "basketId", "siteId", "locale"];
        readonly getBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly updateBasket: readonly ["organizationId", "basketId", "removeExternalTax", "siteId", "locale"];
        readonly updateBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly updateAsAgentBasket: readonly ["organizationId", "basketId", "siteId", "locale"];
        readonly updateAsAgentBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly updateBillingAddressForBasket: readonly ["organizationId", "basketId", "useAsShipping", "removeExternalTax", "siteId", "locale"];
        readonly updateBillingAddressForBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly addCouponToBasket: readonly ["organizationId", "basketId", "siteId", "locale"];
        readonly addCouponToBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly removeCouponFromBasket: readonly ["organizationId", "basketId", "couponItemId", "siteId", "locale"];
        readonly removeCouponFromBasketRequired: readonly ["organizationId", "basketId", "couponItemId", "siteId"];
        readonly updateCustomerForBasket: readonly ["organizationId", "basketId", "siteId", "locale"];
        readonly updateCustomerForBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly addGiftCertificateItemToBasket: readonly ["organizationId", "basketId", "siteId", "locale"];
        readonly addGiftCertificateItemToBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly removeGiftCertificateItemFromBasket: readonly ["organizationId", "basketId", "giftCertificateItemId", "siteId", "locale"];
        readonly removeGiftCertificateItemFromBasketRequired: readonly ["organizationId", "basketId", "giftCertificateItemId", "siteId"];
        readonly updateGiftCertificateItemInBasket: readonly ["organizationId", "basketId", "giftCertificateItemId", "siteId", "locale"];
        readonly updateGiftCertificateItemInBasketRequired: readonly ["organizationId", "basketId", "giftCertificateItemId", "siteId"];
        readonly addItemToBasket: readonly ["organizationId", "basketId", "siteId", "locale"];
        readonly addItemToBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly updateItemsInBasket: readonly ["organizationId", "basketId", "removeExternalTax", "siteId", "locale"];
        readonly updateItemsInBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly removeItemFromBasket: readonly ["organizationId", "basketId", "itemId", "siteId", "locale"];
        readonly removeItemFromBasketRequired: readonly ["organizationId", "basketId", "itemId", "siteId"];
        readonly updateItemInBasket: readonly ["organizationId", "basketId", "itemId", "removeExternalTax", "siteId", "locale"];
        readonly updateItemInBasketRequired: readonly ["organizationId", "basketId", "itemId", "siteId"];
        readonly addTaxesForBasketItem: readonly ["organizationId", "basketId", "itemId", "siteId"];
        readonly addTaxesForBasketItemRequired: readonly ["organizationId", "basketId", "itemId", "siteId"];
        readonly addPaymentInstrumentToBasket: readonly ["organizationId", "basketId", "siteId", "locale"];
        readonly addPaymentInstrumentToBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly removePaymentInstrumentFromBasket: readonly ["organizationId", "basketId", "paymentInstrumentId", "siteId", "locale"];
        readonly removePaymentInstrumentFromBasketRequired: readonly ["organizationId", "basketId", "paymentInstrumentId", "siteId"];
        readonly updatePaymentInstrumentInBasket: readonly ["organizationId", "basketId", "paymentInstrumentId", "removeExternalTax", "siteId", "locale"];
        readonly updatePaymentInstrumentInBasketRequired: readonly ["organizationId", "basketId", "paymentInstrumentId", "siteId"];
        readonly getPaymentMethodsForBasket: readonly ["organizationId", "basketId", "siteId", "locale"];
        readonly getPaymentMethodsForBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly addPriceAdjustmentToBasket: readonly ["organizationId", "basketId", "siteId", "locale"];
        readonly addPriceAdjustmentToBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly removePriceAdjustmentFromBasket: readonly ["organizationId", "basketId", "priceAdjustmentId", "siteId", "locale"];
        readonly removePriceAdjustmentFromBasketRequired: readonly ["organizationId", "basketId", "priceAdjustmentId", "siteId"];
        readonly updatePriceAdjustmentInBasket: readonly ["organizationId", "basketId", "priceAdjustmentId", "siteId"];
        readonly updatePriceAdjustmentInBasketRequired: readonly ["organizationId", "basketId", "priceAdjustmentId", "siteId"];
        readonly getPriceBooksForBasket: readonly ["organizationId", "basketId", "siteId"];
        readonly getPriceBooksForBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly addPriceBooksToBasket: readonly ["organizationId", "basketId", "siteId"];
        readonly addPriceBooksToBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly createShipmentForBasket: readonly ["organizationId", "basketId", "siteId", "locale"];
        readonly createShipmentForBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly removeShipmentFromBasket: readonly ["organizationId", "basketId", "shipmentId", "siteId", "locale"];
        readonly removeShipmentFromBasketRequired: readonly ["organizationId", "basketId", "shipmentId", "siteId"];
        readonly updateShipmentForBasket: readonly ["organizationId", "basketId", "shipmentId", "siteId", "locale"];
        readonly updateShipmentForBasketRequired: readonly ["organizationId", "basketId", "shipmentId", "siteId"];
        readonly updateShippingAddressForShipment: readonly ["organizationId", "basketId", "shipmentId", "useAsBilling", "removeExternalTax", "siteId", "locale"];
        readonly updateShippingAddressForShipmentRequired: readonly ["organizationId", "basketId", "shipmentId", "siteId"];
        readonly updateShippingMethodForShipment: readonly ["organizationId", "basketId", "shipmentId", "siteId", "locale"];
        readonly updateShippingMethodForShipmentRequired: readonly ["organizationId", "basketId", "shipmentId", "siteId"];
        readonly getShippingMethodsForShipment: readonly ["organizationId", "basketId", "shipmentId", "siteId", "locale"];
        readonly getShippingMethodsForShipmentRequired: readonly ["organizationId", "basketId", "shipmentId", "siteId"];
        readonly updateAsStorefrontBasket: readonly ["organizationId", "basketId", "exchange", "siteId", "locale"];
        readonly updateAsStorefrontBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly getTaxesFromBasket: readonly ["organizationId", "basketId", "siteId"];
        readonly getTaxesFromBasketRequired: readonly ["organizationId", "basketId", "siteId"];
        readonly addTaxesForBasket: readonly ["organizationId", "basketId", "siteId"];
        readonly addTaxesForBasketRequired: readonly ["organizationId", "basketId", "siteId"];
    };
    /**
    * Creates a new basket.

The created basket is initialized with default values. Optional JSON data provided in the request body is populated into the created basket. It can be updated with other endpoints offered by the Shopper Baskets API.

Each customer can have just one open basket. When a basket is created, it is said to be open. It remains open until either an order is created from it or it is deleted.
    *
    * If you would like to get a raw Response object use the other createBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param taxMode - Determines how taxes are calculated.

The default value is `internal` where the tax calculation is done automatically based on internal tax tables. Setting `taxMode` to `external` allows manual modification of the tax rates and values. External tax data is mandatory for product line items, option line items, shipping line items, coupon line items, and bonus discount line item. Gift certificate line items are optional and use zero tax rate by default, which can be overwritten. Price adjustments cannot be set because they are either calculated or inherited. Depending on the type, the tax rate is either obtained from the related line item or computed as a prorate of the basket.
    * @param temporary - If set to true, the basket created is a temporary basket.
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
    * @returns A promise of type Basket.
    *
    */
    createBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            taxMode?: string;
            temporary?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Basket;
    }>): Promise<Basket>;
    /**
    * Creates a new basket.

The created basket is initialized with default values. Optional JSON data provided in the request body is populated into the created basket. It can be updated with other endpoints offered by the Shopper Baskets API.

Each customer can have just one open basket. When a basket is created, it is said to be open. It remains open until either an order is created from it or it is deleted.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param taxMode - Determines how taxes are calculated.

The default value is `internal` where the tax calculation is done automatically based on internal tax tables. Setting `taxMode` to `external` allows manual modification of the tax rates and values. External tax data is mandatory for product line items, option line items, shipping line items, coupon line items, and bonus discount line item. Gift certificate line items are optional and use zero tax rate by default, which can be overwritten. Price adjustments cannot be set because they are either calculated or inherited. Depending on the type, the tax rate is either obtained from the related line item or computed as a prorate of the basket.
    * @param temporary - If set to true, the basket created is a temporary basket.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    createBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            taxMode?: string;
            temporary?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Basket;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Transfer the previous shopper's basket to the current shopper by updating the basket's owner. No other values change. You must obtain the shopper authorization token via SLAS and you must provide the ‘guest usid‘ in both the ‘/oauth2/login‘ and ‘/oauth2/token‘ calls while fetching the registered user JWT token.

A success response contains the transferred basket.

If the current shopper has an active basket, and the `overrideExisting` request parameter is `false`, then the transfer request returns a BasketTransferException (HTTP status 409). You can proceed with one of these options:
- Keep the current shopper's active basket.
- Merge the previous and current shoppers' baskets by calling the `baskets/merge` endpoint.
- Force the transfer by calling the `baskets/transfer` endpoint again, with the parameter `overrideExisting=true`. Forcing the transfer deletes the current shopper's active basket.
    *
    * If you would like to get a raw Response object use the other transferBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param overrideExisting - If the current shopper has no active basket, this parameter is ignored. If the current shopper has an active basket, this parameter controls the behavior:
- `false` (default): Return a BasketTransferException (HTTP status 409). The basket owner doesn't change.
- `true`: Force the transfer by deleting the current shopper's active basket and making the current shopper the owner of the previous shopper's basket. Returns the transferred basket (HTTP status 200).
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
    * @returns A promise of type Basket.
    *
    */
    transferBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            overrideExisting?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Basket>;
    /**
    * Transfer the previous shopper's basket to the current shopper by updating the basket's owner. No other values change. You must obtain the shopper authorization token via SLAS and you must provide the ‘guest usid‘ in both the ‘/oauth2/login‘ and ‘/oauth2/token‘ calls while fetching the registered user JWT token.

A success response contains the transferred basket.

If the current shopper has an active basket, and the `overrideExisting` request parameter is `false`, then the transfer request returns a BasketTransferException (HTTP status 409). You can proceed with one of these options:
- Keep the current shopper's active basket.
- Merge the previous and current shoppers' baskets by calling the `baskets/merge` endpoint.
- Force the transfer by calling the `baskets/transfer` endpoint again, with the parameter `overrideExisting=true`. Forcing the transfer deletes the current shopper's active basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param overrideExisting - If the current shopper has no active basket, this parameter is ignored. If the current shopper has an active basket, this parameter controls the behavior:
- `false` (default): Return a BasketTransferException (HTTP status 409). The basket owner doesn't change.
- `true`: Force the transfer by deleting the current shopper's active basket and making the current shopper the owner of the previous shopper's basket. Returns the transferred basket (HTTP status 200).
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    transferBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            overrideExisting?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Merge data from the previous shopper's basket into the current shopper's active basket and delete the previous shopper's basket. This endpoint doesn't merge Personally Identifiable Information (PII). You must obtain the shopper authorization token via SLAS and you must provide the ‘guest usid‘ in both the ‘/oauth2/login‘ and ‘/oauth2/token‘ calls while fetching the registered user JWT token. After the merge, all basket amounts are recalculated and totaled, including lookups for prices, taxes, shipping, and promotions, unless hooks are enabled.

The following information is merged:
- custom attributes on the basket and on all copied records
- product items
- gift certificate items
- coupon items
- shipments
- ad-hoc price adjustments

To control the merging of products that exist in both baskets, use the `productItemMergeMode` parameter. By default, the higher of the two basket quantities is used for each product. Products in both baskets are considered to be the same when all of the following values match (if one product doesn't have a value, the other product is a match only if it also doesn't have that value):
- shipment
- productId
- option values
- wishlist reference
- inventory list id
- gift flag & message
- ad-hoc price adjustments

If any of the listed values don't match, then the item in the previous shopper's basket is copied to a new line item in the current shopper's basket. If the listed values all match, but the matching products have different values for any custom attribute, the merged line item keeps the custom attribute value from the current shopper's basket.

A success response contains the current shopper's active basket. The previous guest shopper's active basket is deleted.

If the current shopper doesn't have an active basket, and the createDestinationBasket request parameter is false, then the merge request returns a BasketMergeException (HTTP status 409). You can proceed with one of these options:
- Transfer the previous shopper's active basket to the current logged-in shopper by calling the `baskets/transfer` endpoint.
- Force the merge by calling the `baskets/merge` endpoint again, with the parameter `createDestinationBasket=true`. Forcing the merge creates a new basket for the current shopper and copies information from the previous shopper's basket into it. Because the merge doesn't copy all basket data, a forced merge is not the same as a transfer. For example, the new basket doesn't contain any Personally Identifiable Information (PII) from the previous basket.

### before merge
| Previous Shopper's Basket, SKU: Quantity, Custom Attributes | Current Shopper's Basket, SKU: Quantity, Custom Attributes  |
|-------------------------------------------------------------|-------------------------------------------------------------|
| SKU_A: 5\<br\> SKU_B: 3\<br\> SKU_C: 4\<br\> c_customAttr_1: 'ABC' \<br\> c_customAttr_2: 'DEF'   | SKU_A: 2\<br\> SKU_D: 6\<br\> SKU_E: 7\<br\> c_customAttr_1: 'UVW' \<br\> c_customAttr_3: 'XYZ'   |

### after merge - (previous shopper's basket is deleted)
| productItemMergeMode | Current Shopper's Basket - SKU: Quantity, Custom Attributes  |
|----------------------|--------------------------------------------------------------|
| sum_quantities         | SKU_A: 7\<br\> SKU_B: 3\<br\> SKU_C: 4\<br\> SKU_D: 6\<br\> SKU_E: 7\<br\> c_customAttr_1: 'UVW' \<br\> c_customAttr_2: 'DEF' \<br\> c_customAttr_3: 'XYZ'              |
| higher_quantity      | SKU_A: 5\<br\> SKU_B: 3\<br\> SKU_C: 4\<br\> SKU_D: 6\<br\> SKU_E: 7\<br\> c_customAttr_1: 'UVW' \<br\> c_customAttr_2: 'DEF' \<br\> c_customAttr_3: 'XYZ'              |
| saved_quantity       | SKU_A: 2\<br\> SKU_B: 3\<br\> SKU_C: 4\<br\> SKU_D: 6\<br\> SKU_E: 7\<br\> c_customAttr_1: 'UVW' \<br\> c_customAttr_2: 'DEF' \<br\> c_customAttr_3: 'XYZ'              |
| separate_item        | SKU_A: 5\<br\> SKU_B: 3\<br\> SKU_C: 4\<br\> SKU_A: 2\<br\> SKU_D: 6\<br\> SKU_E: 7\<br\> c_customAttr_1: 'UVW' \<br\> c_customAttr_2: 'DEF' \<br\> c_customAttr_3: 'XYZ' |
    *
    * If you would like to get a raw Response object use the other mergeBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param createDestinationBasket - If the current shopper has an active basket, this parameter is ignored. If the current shopper has no active basket, this parameter controls the behavior:
- `false` (default): Return a BasketMergeException (HTTP status 409).
- `true`: Force the merge by creating a basket for the current shopper and copying information from the previous shopper's basket into it. Return success (HTTP status 200).
    * @param productItemMergeMode - This parameter controls the quantity calculation for products that exist in both baskets.
- higher_quantity (default): Compare the product's quantities in each basket, and use the higher value.
- sum_quantities: Use the sum of the product's quantities from both baskets.
- saved_quantity: Use the product's quantity in the current shopper's active basket. Ignore the quantity from the previous shopper's basket.
- separate_item: Add a separate product item to the current shopper's basket for the quantity in the previous shopper's basket.
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
    * @returns A promise of type Basket.
    *
    */
    mergeBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            createDestinationBasket?: boolean;
            productItemMergeMode?: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Basket>;
    /**
    * Merge data from the previous shopper's basket into the current shopper's active basket and delete the previous shopper's basket. This endpoint doesn't merge Personally Identifiable Information (PII). You must obtain the shopper authorization token via SLAS and you must provide the ‘guest usid‘ in both the ‘/oauth2/login‘ and ‘/oauth2/token‘ calls while fetching the registered user JWT token. After the merge, all basket amounts are recalculated and totaled, including lookups for prices, taxes, shipping, and promotions, unless hooks are enabled.

The following information is merged:
- custom attributes on the basket and on all copied records
- product items
- gift certificate items
- coupon items
- shipments
- ad-hoc price adjustments

To control the merging of products that exist in both baskets, use the `productItemMergeMode` parameter. By default, the higher of the two basket quantities is used for each product. Products in both baskets are considered to be the same when all of the following values match (if one product doesn't have a value, the other product is a match only if it also doesn't have that value):
- shipment
- productId
- option values
- wishlist reference
- inventory list id
- gift flag & message
- ad-hoc price adjustments

If any of the listed values don't match, then the item in the previous shopper's basket is copied to a new line item in the current shopper's basket. If the listed values all match, but the matching products have different values for any custom attribute, the merged line item keeps the custom attribute value from the current shopper's basket.

A success response contains the current shopper's active basket. The previous guest shopper's active basket is deleted.

If the current shopper doesn't have an active basket, and the createDestinationBasket request parameter is false, then the merge request returns a BasketMergeException (HTTP status 409). You can proceed with one of these options:
- Transfer the previous shopper's active basket to the current logged-in shopper by calling the `baskets/transfer` endpoint.
- Force the merge by calling the `baskets/merge` endpoint again, with the parameter `createDestinationBasket=true`. Forcing the merge creates a new basket for the current shopper and copies information from the previous shopper's basket into it. Because the merge doesn't copy all basket data, a forced merge is not the same as a transfer. For example, the new basket doesn't contain any Personally Identifiable Information (PII) from the previous basket.

### before merge
| Previous Shopper's Basket, SKU: Quantity, Custom Attributes | Current Shopper's Basket, SKU: Quantity, Custom Attributes  |
|-------------------------------------------------------------|-------------------------------------------------------------|
| SKU_A: 5\<br\> SKU_B: 3\<br\> SKU_C: 4\<br\> c_customAttr_1: 'ABC' \<br\> c_customAttr_2: 'DEF'   | SKU_A: 2\<br\> SKU_D: 6\<br\> SKU_E: 7\<br\> c_customAttr_1: 'UVW' \<br\> c_customAttr_3: 'XYZ'   |

### after merge - (previous shopper's basket is deleted)
| productItemMergeMode | Current Shopper's Basket - SKU: Quantity, Custom Attributes  |
|----------------------|--------------------------------------------------------------|
| sum_quantities         | SKU_A: 7\<br\> SKU_B: 3\<br\> SKU_C: 4\<br\> SKU_D: 6\<br\> SKU_E: 7\<br\> c_customAttr_1: 'UVW' \<br\> c_customAttr_2: 'DEF' \<br\> c_customAttr_3: 'XYZ'              |
| higher_quantity      | SKU_A: 5\<br\> SKU_B: 3\<br\> SKU_C: 4\<br\> SKU_D: 6\<br\> SKU_E: 7\<br\> c_customAttr_1: 'UVW' \<br\> c_customAttr_2: 'DEF' \<br\> c_customAttr_3: 'XYZ'              |
| saved_quantity       | SKU_A: 2\<br\> SKU_B: 3\<br\> SKU_C: 4\<br\> SKU_D: 6\<br\> SKU_E: 7\<br\> c_customAttr_1: 'UVW' \<br\> c_customAttr_2: 'DEF' \<br\> c_customAttr_3: 'XYZ'              |
| separate_item        | SKU_A: 5\<br\> SKU_B: 3\<br\> SKU_C: 4\<br\> SKU_A: 2\<br\> SKU_D: 6\<br\> SKU_E: 7\<br\> c_customAttr_1: 'UVW' \<br\> c_customAttr_2: 'DEF' \<br\> c_customAttr_3: 'XYZ' |
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param createDestinationBasket - If the current shopper has an active basket, this parameter is ignored. If the current shopper has no active basket, this parameter controls the behavior:
- `false` (default): Return a BasketMergeException (HTTP status 409).
- `true`: Force the merge by creating a basket for the current shopper and copying information from the previous shopper's basket into it. Return success (HTTP status 200).
    * @param productItemMergeMode - This parameter controls the quantity calculation for products that exist in both baskets.
- higher_quantity (default): Compare the product's quantities in each basket, and use the higher value.
- sum_quantities: Use the sum of the product's quantities from both baskets.
- saved_quantity: Use the product's quantity in the current shopper's active basket. Ignore the quantity from the previous shopper's basket.
- separate_item: Add a separate product item to the current shopper's basket for the quantity in the previous shopper's basket.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    mergeBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            createDestinationBasket?: boolean;
            productItemMergeMode?: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Removes a basket.
    *
    * If you would like to get a raw Response object use the other deleteBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type void.
    *
    */
    deleteBasket(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<void>;
    /**
    * Removes a basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
    *
    */
    deleteBasket<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : void>;
    /**
    * Gets a basket.
    *
    * If you would like to get a raw Response object use the other getBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Basket.
    *
    */
    getBasket(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Basket>;
    /**
    * Gets a basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    getBasket<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Updates a basket. Only the currency of the basket, source code, the custom
properties of the basket, and the shipping items will be considered.
    *
    * If you would like to get a raw Response object use the other updateBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the `currency` triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values.
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
    * @returns A promise of type Basket.
    *
    */
    updateBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            removeExternalTax?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Basket;
    }>): Promise<Basket>;
    /**
    * Updates a basket. Only the currency of the basket, source code, the custom
properties of the basket, and the shipping items will be considered.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the `currency` triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    updateBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            removeExternalTax?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Basket;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Marks a basket as an agent basket.
    *
    * If you would like to get a raw Response object use the other updateAsAgentBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Basket.
    *
    */
    updateAsAgentBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Basket>;
    /**
    * Marks a basket as an agent basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    updateAsAgentBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Sets the billing address of a basket.
    *
    * If you would like to get a raw Response object use the other updateBillingAddressForBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param useAsShipping -
    * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the billing/shipping address triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values.
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
    * @returns A promise of type Basket.
    *
    */
    updateBillingAddressForBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            useAsShipping?: boolean;
            removeExternalTax?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: OrderAddress;
    }>): Promise<Basket>;
    /**
    * Sets the billing address of a basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param useAsShipping -
    * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the billing/shipping address triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    updateBillingAddressForBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            useAsShipping?: boolean;
            removeExternalTax?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: OrderAddress;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Adds a coupon to an existing basket.
    *
    * If you would like to get a raw Response object use the other addCouponToBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Basket.
    *
    */
    addCouponToBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CouponItem;
    }>): Promise<Basket>;
    /**
    * Adds a coupon to an existing basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    addCouponToBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CouponItem;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Removes a coupon from the basket.
    *
    * If you would like to get a raw Response object use the other removeCouponFromBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param couponItemId - The ID of the coupon item to be removed.
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
    * @returns A promise of type Basket.
    *
    */
    removeCouponFromBasket(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            couponItemId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Basket>;
    /**
    * Removes a coupon from the basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param couponItemId - The ID of the coupon item to be removed.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    removeCouponFromBasket<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            couponItemId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Sets customer information for an existing basket.
    *
    * If you would like to get a raw Response object use the other updateCustomerForBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Basket.
    *
    */
    updateCustomerForBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerInfo;
    }>): Promise<Basket>;
    /**
    * Sets customer information for an existing basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    updateCustomerForBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerInfo;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Adds a gift certificate item to an existing basket.
    *
    * If you would like to get a raw Response object use the other addGiftCertificateItemToBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Basket.
    *
    */
    addGiftCertificateItemToBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: GiftCertificateItem;
    }>): Promise<Basket>;
    /**
    * Adds a gift certificate item to an existing basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    addGiftCertificateItemToBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: GiftCertificateItem;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Deletes a gift certificate item from an existing basket.
    *
    * If you would like to get a raw Response object use the other removeGiftCertificateItemFromBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param giftCertificateItemId - the ID of the gift certificate item to be updated.
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
    * @returns A promise of type Basket.
    *
    */
    removeGiftCertificateItemFromBasket(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            giftCertificateItemId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Basket>;
    /**
    * Deletes a gift certificate item from an existing basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param giftCertificateItemId - the ID of the gift certificate item to be updated.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    removeGiftCertificateItemFromBasket<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            giftCertificateItemId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Updates a gift certificate item of an existing basket.
    *
    * If you would like to get a raw Response object use the other updateGiftCertificateItemInBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param giftCertificateItemId - the ID of the gift certificate item to be updated.
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
    * @returns A promise of type Basket.
    *
    */
    updateGiftCertificateItemInBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            giftCertificateItemId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: GiftCertificateItem;
    }>): Promise<Basket>;
    /**
    * Updates a gift certificate item of an existing basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param giftCertificateItemId - the ID of the gift certificate item to be updated.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    updateGiftCertificateItemInBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            giftCertificateItemId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: GiftCertificateItem;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Adds new items to a basket. The added items are associated with the
specified shipment. If no shipment id is specified, the added items are associated with the default shipment.
Considered values from the request body, for each item are:

- productId: a valid product ID. This is the ID of the product to be added to the basket. If the
product is already in the basket, the API either increments the quantity of the existing product line item or
creates a new product line item, based on the site preference 'Add Product Behavior'. For option products and
product bundles containing variation masters, the API creates a new product line item regardless of the site
preference.
- shipmentId: a valid shipment ID (optional). This is the ID of the shipment in which the product item
is created.
- quantity: a number between 0.01 and 999. This is the quantity of the product to order.
- inventoryId: a valid inventory ID (optional). This is the ID of the inventory from which the item is
allocated.
- bonusDiscountLineItemId: a valid bonus discount line item ID (optional). This is the ID of the
bonus discount line item for which the added product is a selected bonus product.
- optionItems/optionValueId: a valid option value ID. This is an option value for an option item of
an option product.  This is only possible if the product item is an option
product. To set option values, you must specify a collection of option items in the optionItems
property. These option items must contain optionId and optionValueId. Also,
the values you specify must be valid for the option product that this product item represents. Otherwise, the
server throws an InvalidProductOptionItemException or an
InvalidProductOptionValueItemException.
- custom properties in the form c_\<CUSTOM_NAME\>: the custom property must correspond to a custom
attribute (\<CUSTOM_NAME\>) defined for ProductLineItem. The value of this property must be valid for the
type of custom attribute defined for ProductLineItem.
    *
    * If you would like to get a raw Response object use the other addItemToBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Basket.
    *
    */
    addItemToBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Array<ProductItem>;
    }>): Promise<Basket>;
    /**
    * Adds new items to a basket. The added items are associated with the
specified shipment. If no shipment id is specified, the added items are associated with the default shipment.
Considered values from the request body, for each item are:

- productId: a valid product ID. This is the ID of the product to be added to the basket. If the
product is already in the basket, the API either increments the quantity of the existing product line item or
creates a new product line item, based on the site preference 'Add Product Behavior'. For option products and
product bundles containing variation masters, the API creates a new product line item regardless of the site
preference.
- shipmentId: a valid shipment ID (optional). This is the ID of the shipment in which the product item
is created.
- quantity: a number between 0.01 and 999. This is the quantity of the product to order.
- inventoryId: a valid inventory ID (optional). This is the ID of the inventory from which the item is
allocated.
- bonusDiscountLineItemId: a valid bonus discount line item ID (optional). This is the ID of the
bonus discount line item for which the added product is a selected bonus product.
- optionItems/optionValueId: a valid option value ID. This is an option value for an option item of
an option product.  This is only possible if the product item is an option
product. To set option values, you must specify a collection of option items in the optionItems
property. These option items must contain optionId and optionValueId. Also,
the values you specify must be valid for the option product that this product item represents. Otherwise, the
server throws an InvalidProductOptionItemException or an
InvalidProductOptionValueItemException.
- custom properties in the form c_\<CUSTOM_NAME\>: the custom property must correspond to a custom
attribute (\<CUSTOM_NAME\>) defined for ProductLineItem. The value of this property must be valid for the
type of custom attribute defined for ProductLineItem.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    addItemToBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Array<ProductItem>;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Updates multiple items in a basket. This behaviour matches that of updating a
single item, but the body contains an array of ProductItems to be updated that are identified by `itemId`.
The items to update can include bundled product items, although the
kind of update supported for bundled product items is limited to `productId`, `gift`, `giftMessage`
and custom properties.
The following values in the request body are considered by the server:

- `itemId` (mandatory): identifies an item to be updated.
- `productId`: a valid product ID. The purpose of this
value is to change the variation of a variation product.
- `shipmentId`: a valid shipment ID. The purpose of
this value is to move a product item to another shipment.
- `quantity`: a number between 0 and 999. The purpose of
this value is to change the quantity of the product item. If the quantity is 0,
the product item is removed.
- `optionItems`/`optionValueId`: a valid option value
ID. The purpose of this value is to exchange an option value for an
option item of an option product.
This is only possible if the product item is an option product. To change
option values, a collection of the option items to be changed must be
provided in the property `optionItems`. Those
`optionItems` must contain `optionId`
and `optionValueId`. The provided values must be valid
for the option product that this product item represents. Otherwise,
`InvalidProductOptionItemException` or
`InvalidProductOptionValueItemException` is thrown.
- custom properties `c_\<CUSTOM_NAME\>`: a
value corresponding to the type defined for custom attribute
`\<CUSTOM_NAME\>` of the ProductLineItem. The purpose of this value is to
add or change the value of a custom attribute defined for the
ProductLineItem.
- `gift`: a boolean value that specifies whether the item is a gift.
- `giftMessage`: a message to include with the gift.
    *
    * If you would like to get a raw Response object use the other updateItemsInBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the product line item quantity triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values.
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
    * @returns A promise of type Basket.
    *
    */
    updateItemsInBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            removeExternalTax?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Array<ProductItem>;
    }>): Promise<Basket>;
    /**
    * Updates multiple items in a basket. This behaviour matches that of updating a
single item, but the body contains an array of ProductItems to be updated that are identified by `itemId`.
The items to update can include bundled product items, although the
kind of update supported for bundled product items is limited to `productId`, `gift`, `giftMessage`
and custom properties.
The following values in the request body are considered by the server:

- `itemId` (mandatory): identifies an item to be updated.
- `productId`: a valid product ID. The purpose of this
value is to change the variation of a variation product.
- `shipmentId`: a valid shipment ID. The purpose of
this value is to move a product item to another shipment.
- `quantity`: a number between 0 and 999. The purpose of
this value is to change the quantity of the product item. If the quantity is 0,
the product item is removed.
- `optionItems`/`optionValueId`: a valid option value
ID. The purpose of this value is to exchange an option value for an
option item of an option product.
This is only possible if the product item is an option product. To change
option values, a collection of the option items to be changed must be
provided in the property `optionItems`. Those
`optionItems` must contain `optionId`
and `optionValueId`. The provided values must be valid
for the option product that this product item represents. Otherwise,
`InvalidProductOptionItemException` or
`InvalidProductOptionValueItemException` is thrown.
- custom properties `c_\<CUSTOM_NAME\>`: a
value corresponding to the type defined for custom attribute
`\<CUSTOM_NAME\>` of the ProductLineItem. The purpose of this value is to
add or change the value of a custom attribute defined for the
ProductLineItem.
- `gift`: a boolean value that specifies whether the item is a gift.
- `giftMessage`: a message to include with the gift.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the product line item quantity triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    updateItemsInBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            removeExternalTax?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Array<ProductItem>;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Removes a product item from the basket.
    *
    * If you would like to get a raw Response object use the other removeItemFromBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param itemId - The ID of the item to be updated.
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
    * @returns A promise of type Basket.
    *
    */
    removeItemFromBasket(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            itemId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Basket>;
    /**
    * Removes a product item from the basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param itemId - The ID of the item to be updated.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    removeItemFromBasket<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            itemId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Updates an item in a basket. The item to be updated can be a bundled product item, although the
kind of update supported for bundled product items is limited to `productId` (to support
variation products), `gift`, `giftMessage` and custom properties.
The following values in the request body are considered by the server:

- `productId`: a valid product ID. The purpose of this
value is to exchange a variation of a variation product.
- `shipmentId`: a valid shipment ID. The purpose of
this value is to move a product item to another shipment.
- `quantity`: a number between 0 and 999. The purpose of
this value is to change quantity of the product item. If quantity is 0,
the product item is removed.
- `optionItems`/`optionValueId`: a valid option value
ID. The purpose of this value is to exchange an option value for an
option item of an option product.
This is only possible if the product item is an option product. To change
option values a collection of option items to be changed need to be
provided in property optionItems. Those
optionItems need to contain optionId
and `optionValueId`. The provided values must be valid
for the option product that this product item represents. Otherwise,
`InvalidProductOptionItemException` or
`InvalidProductOptionValueItemException` is thrown.
- custom properties `c_\<CUSTOM_NAME\>`: a
value corresponding to the type defined for custom attribute
`\<CUSTOM_NAME\>` of ProductLineItem. The purpose of this value is to
add or change the value of a custom attribute defined for
ProductLineItem.
- `gift`: a boolean value that specifies whether the item is a gift
- `giftMessage`: a message for the gift
    *
    * If you would like to get a raw Response object use the other updateItemInBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param itemId - The ID of the item to be updated.
    * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the product line item quantity triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values.
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
    * @returns A promise of type Basket.
    *
    */
    updateItemInBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            itemId: string;
            removeExternalTax?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: ProductItem;
    }>): Promise<Basket>;
    /**
    * Updates an item in a basket. The item to be updated can be a bundled product item, although the
kind of update supported for bundled product items is limited to `productId` (to support
variation products), `gift`, `giftMessage` and custom properties.
The following values in the request body are considered by the server:

- `productId`: a valid product ID. The purpose of this
value is to exchange a variation of a variation product.
- `shipmentId`: a valid shipment ID. The purpose of
this value is to move a product item to another shipment.
- `quantity`: a number between 0 and 999. The purpose of
this value is to change quantity of the product item. If quantity is 0,
the product item is removed.
- `optionItems`/`optionValueId`: a valid option value
ID. The purpose of this value is to exchange an option value for an
option item of an option product.
This is only possible if the product item is an option product. To change
option values a collection of option items to be changed need to be
provided in property optionItems. Those
optionItems need to contain optionId
and `optionValueId`. The provided values must be valid
for the option product that this product item represents. Otherwise,
`InvalidProductOptionItemException` or
`InvalidProductOptionValueItemException` is thrown.
- custom properties `c_\<CUSTOM_NAME\>`: a
value corresponding to the type defined for custom attribute
`\<CUSTOM_NAME\>` of ProductLineItem. The purpose of this value is to
add or change the value of a custom attribute defined for
ProductLineItem.
- `gift`: a boolean value that specifies whether the item is a gift
- `giftMessage`: a message for the gift
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param itemId - The ID of the item to be updated.
    * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the product line item quantity triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    updateItemInBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            itemId: string;
            removeExternalTax?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: ProductItem;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * This method allows you to apply external taxation data to an existing basket to be able to pass tax rates and optional values for a specific taxable line item. This endpoint can be called only if external taxation mode was used for basket creation. See POST /baskets for more information.
    *
    * If you would like to get a raw Response object use the other addTaxesForBasketItem function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param itemId - The ID of the item to be updated.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type void.
    *
    */
    addTaxesForBasketItem(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            itemId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: TaxItems;
    }>): Promise<void>;
    /**
    * This method allows you to apply external taxation data to an existing basket to be able to pass tax rates and optional values for a specific taxable line item. This endpoint can be called only if external taxation mode was used for basket creation. See POST /baskets for more information.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param itemId - The ID of the item to be updated.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
    *
    */
    addTaxesForBasketItem<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            itemId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: TaxItems;
    }>, rawResponse?: T): Promise<T extends true ? Response : void>;
    /**
    * Adds a payment instrument to a basket.
    *
    * If you would like to get a raw Response object use the other addPaymentInstrumentToBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Basket.
    *
    */
    addPaymentInstrumentToBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: BasketPaymentInstrumentRequest;
    }>): Promise<Basket>;
    /**
    * Adds a payment instrument to a basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    addPaymentInstrumentToBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: BasketPaymentInstrumentRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Removes a payment instrument of a basket.
    *
    * If you would like to get a raw Response object use the other removePaymentInstrumentFromBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param paymentInstrumentId -
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
    * @returns A promise of type Basket.
    *
    */
    removePaymentInstrumentFromBasket(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            paymentInstrumentId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Basket>;
    /**
    * Removes a payment instrument of a basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param paymentInstrumentId -
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    removePaymentInstrumentFromBasket<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            paymentInstrumentId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Updates payment instrument of an existing basket.
    *
    * If you would like to get a raw Response object use the other updatePaymentInstrumentInBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param paymentInstrumentId -
    * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the payment instrument triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values.
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
    * @returns A promise of type Basket.
    *
    */
    updatePaymentInstrumentInBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            paymentInstrumentId: string;
            removeExternalTax?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: OrderPaymentInstrument;
    }>): Promise<Basket>;
    /**
    * Updates payment instrument of an existing basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param paymentInstrumentId -
    * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the payment instrument triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    updatePaymentInstrumentInBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            paymentInstrumentId: string;
            removeExternalTax?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: OrderPaymentInstrument;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Gets applicable payment methods for an existing basket considering the open payment amount only.
    *
    * If you would like to get a raw Response object use the other getPaymentMethodsForBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    getPaymentMethodsForBasket(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
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
    * Gets applicable payment methods for an existing basket considering the open payment amount only.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    getPaymentMethodsForBasket<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
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
    * Adds a custom manual price adjustment to the basket.
    *
    * If you would like to get a raw Response object use the other addPriceAdjustmentToBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Basket.
    *
    */
    addPriceAdjustmentToBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: PriceAdjustmentRequest;
    }>): Promise<Basket>;
    /**
    * Adds a custom manual price adjustment to the basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    addPriceAdjustmentToBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: PriceAdjustmentRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Removes a custom manual price adjustment from the basket.
    *
    * If you would like to get a raw Response object use the other removePriceAdjustmentFromBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param priceAdjustmentId -
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
    * @returns A promise of type Basket.
    *
    */
    removePriceAdjustmentFromBasket(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            priceAdjustmentId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Basket>;
    /**
    * Removes a custom manual price adjustment from the basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param priceAdjustmentId -
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    removePriceAdjustmentFromBasket<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            priceAdjustmentId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Updates a custom manual price adjustment on the basket. Only the following path values are considered for the update; all other attributes are ignored.
- `discount`
- `itemText`
- `reasonCode`
- `custom properties`
The discount `type` of a price adjustment cannot be updated and therefore, the value of the existing type must be passed. For an adjustment of type `percentage`, the `percentage` attribute is mandatory. For adjustments of type `amount` and `fixed_price`, the `amount` attribute is mandatory.
    *
    * If you would like to get a raw Response object use the other updatePriceAdjustmentInBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param priceAdjustmentId -
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type Basket.
    *
    */
    updatePriceAdjustmentInBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            priceAdjustmentId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: PriceAdjustment;
    }>): Promise<Basket>;
    /**
    * Updates a custom manual price adjustment on the basket. Only the following path values are considered for the update; all other attributes are ignored.
- `discount`
- `itemText`
- `reasonCode`
- `custom properties`
The discount `type` of a price adjustment cannot be updated and therefore, the value of the existing type must be passed. For an adjustment of type `percentage`, the `percentage` attribute is mandatory. For adjustments of type `amount` and `fixed_price`, the `amount` attribute is mandatory.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param priceAdjustmentId -
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    updatePriceAdjustmentInBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            priceAdjustmentId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: PriceAdjustment;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * ( DEPRECATED ) Gets applicable price books for an existing basket. This endpoint is deprecated. Use [Shopper Context](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-context?meta=Summary), hooks or `dw.catalog.PriceBookMgr#getApplicablePriceBooks()` instead.
    *
    * If you would like to get a raw Response object use the other getPriceBooksForBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type PriceBookIds.
    *
    */
    getPriceBooksForBasket(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<PriceBookIds>;
    /**
    * ( DEPRECATED ) Gets applicable price books for an existing basket. This endpoint is deprecated. Use [Shopper Context](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-context?meta=Summary), hooks or `dw.catalog.PriceBookMgr#getApplicablePriceBooks()` instead.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type PriceBookIds otherwise.
    *
    */
    getPriceBooksForBasket<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : PriceBookIds>;
    /**
    * ( DEPRECATED ) This method allows you to put an array of priceBookIds to an existing basket, which will be used for basket calculation. This endpoint is deprecated.  Use [Shopper Context](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-context?meta=Summary), hooks or `dw.catalog.PriceBookMgr#setApplicablePriceBooks()` instead.
    *
    * If you would like to get a raw Response object use the other addPriceBooksToBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type void.
    *
    */
    addPriceBooksToBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: PriceBookIds;
    }>): Promise<void>;
    /**
    * ( DEPRECATED ) This method allows you to put an array of priceBookIds to an existing basket, which will be used for basket calculation. This endpoint is deprecated.  Use [Shopper Context](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-context?meta=Summary), hooks or `dw.catalog.PriceBookMgr#setApplicablePriceBooks()` instead.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
    *
    */
    addPriceBooksToBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: PriceBookIds;
    }>, rawResponse?: T): Promise<T extends true ? Response : void>;
    /**
    * Creates a new shipment for a basket.

The created shipment is initialized with values provided in the body
document and can be updated with further data API calls. Considered from
the body are the following properties if specified:

- the ID
- the shipping address
- the shipping method
- gift boolean flag
- gift message
- custom properties
    *
    * If you would like to get a raw Response object use the other createShipmentForBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Basket.
    *
    */
    createShipmentForBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Shipment;
    }>): Promise<Basket>;
    /**
    * Creates a new shipment for a basket.

The created shipment is initialized with values provided in the body
document and can be updated with further data API calls. Considered from
the body are the following properties if specified:

- the ID
- the shipping address
- the shipping method
- gift boolean flag
- gift message
- custom properties
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    createShipmentForBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Shipment;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Removes a specified shipment and all associated product, gift certificate,
shipping, and price adjustment line items from a basket.
It is not allowed to remove the default shipment.
    *
    * If you would like to get a raw Response object use the other removeShipmentFromBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param shipmentId - The ID of the shipment to be modified.
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
    * @returns A promise of type Basket.
    *
    */
    removeShipmentFromBasket(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            shipmentId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Basket>;
    /**
    * Removes a specified shipment and all associated product, gift certificate,
shipping, and price adjustment line items from a basket.
It is not allowed to remove the default shipment.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param shipmentId - The ID of the shipment to be modified.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    removeShipmentFromBasket<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            shipmentId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Updates a shipment for a basket.

The shipment is initialized with values provided in the body
document and can be updated with further data API calls. Considered from
the body are the following properties if specified:
- the ID
- the shipping address
- the shipping method
- gift boolean flag
- gift message
- custom properties
    *
    * If you would like to get a raw Response object use the other updateShipmentForBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param shipmentId - The ID of the shipment to be modified.
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
    * @returns A promise of type Basket.
    *
    */
    updateShipmentForBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            shipmentId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Shipment;
    }>): Promise<Basket>;
    /**
    * Updates a shipment for a basket.

The shipment is initialized with values provided in the body
document and can be updated with further data API calls. Considered from
the body are the following properties if specified:
- the ID
- the shipping address
- the shipping method
- gift boolean flag
- gift message
- custom properties
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param shipmentId - The ID of the shipment to be modified.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    updateShipmentForBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            shipmentId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Shipment;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Sets a shipping address of a specific shipment of a basket.
    *
    * If you would like to get a raw Response object use the other updateShippingAddressForShipment function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param shipmentId - The ID of the shipment to be modified.
    * @param useAsBilling -
    * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the shipping/billing address triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values.
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
    * @returns A promise of type Basket.
    *
    */
    updateShippingAddressForShipment(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            shipmentId: string;
            useAsBilling?: boolean;
            removeExternalTax?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: OrderAddress;
    }>): Promise<Basket>;
    /**
    * Sets a shipping address of a specific shipment of a basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param shipmentId - The ID of the shipment to be modified.
    * @param useAsBilling -
    * @param removeExternalTax - If `true` (default value), the external tax rates are removed from the basket and set to null. To add external tax rates to a basket, use the `addTaxesForBasket` or `addTaxesForBasketItem` endpoint. The removal of external tax rates depends on the update performed on the basket, for example: an update to the shipping/billing address triggers a removal. Set this parameter to `false` to disable the removal of external tax rates/values.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    updateShippingAddressForShipment<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            shipmentId: string;
            useAsBilling?: boolean;
            removeExternalTax?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: OrderAddress;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Sets a shipping method to a specific shipment of a basket.
    *
    * If you would like to get a raw Response object use the other updateShippingMethodForShipment function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param shipmentId - The ID of the shipment to be modified.
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
    * @returns A promise of type Basket.
    *
    */
    updateShippingMethodForShipment(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            shipmentId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: ShippingMethod;
    }>): Promise<Basket>;
    /**
    * Sets a shipping method to a specific shipment of a basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param shipmentId - The ID of the shipment to be modified.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    updateShippingMethodForShipment<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            shipmentId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: ShippingMethod;
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * Gets the applicable shipping methods for a certain shipment of a basket.
    *
    * If you would like to get a raw Response object use the other getShippingMethodsForShipment function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param shipmentId - The ID of the shipment to be modified.
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
    * @returns A promise of type ShippingMethodResult.
    *
    */
    getShippingMethodsForShipment(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            shipmentId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<ShippingMethodResult>;
    /**
    * Gets the applicable shipping methods for a certain shipment of a basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param shipmentId - The ID of the shipment to be modified.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type ShippingMethodResult otherwise.
    *
    */
    getShippingMethodsForShipment<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            shipmentId: string;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : ShippingMethodResult>;
    /**
    * Marks a basket as a storefront basket.
    *
    * If you would like to get a raw Response object use the other updateAsStorefrontBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param exchange - If true, an existing storefront basket is exchanged and marked as an agent basket. If false, a `CustomerBasketsQuotaExceededException` is thrown.
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
    * @returns A promise of type Basket.
    *
    */
    updateAsStorefrontBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            exchange?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Basket>;
    /**
    * Marks a basket as a storefront basket.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param exchange - If true, an existing storefront basket is exchanged and marked as an agent basket. If false, a `CustomerBasketsQuotaExceededException` is thrown.
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
    * @returns A promise of type Response if rawResponse is true, a promise of type Basket otherwise.
    *
    */
    updateAsStorefrontBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            exchange?: boolean;
            siteId: string;
            locale?: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Basket>;
    /**
    * This method gives you the external taxation data set by the PUT taxes API. This endpoint can be called only if external taxation mode was used for basket creation. See POST /baskets for more information.
    *
    * If you would like to get a raw Response object use the other getTaxesFromBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type Taxes.
    *
    */
    getTaxesFromBasket(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Taxes>;
    /**
    * This method gives you the external taxation data set by the PUT taxes API. This endpoint can be called only if external taxation mode was used for basket creation. See POST /baskets for more information.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type Taxes otherwise.
    *
    */
    getTaxesFromBasket<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Taxes>;
    /**
    * This method allows you to apply external taxation data to an existing basket to be able to pass tax rates and optional values for all taxable line items. This endpoint can be called only if external taxation mode was used for basket creation. See POST /baskets for more information.
    *
    * If you would like to get a raw Response object use the other addTaxesForBasket function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type void.
    *
    */
    addTaxesForBasket(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Taxes;
    }>): Promise<void>;
    /**
    * This method allows you to apply external taxation data to an existing basket to be able to pass tax rates and optional values for all taxable line items. This endpoint can be called only if external taxation mode was used for basket creation. See POST /baskets for more information.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId - An identifier for the organization the request is being made by.
    * @param basketId - The ID of the basket to be modified.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
    *
    */
    addTaxesForBasket<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            basketId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Taxes;
    }>, rawResponse?: T): Promise<T extends true ? Response : void>;
}

type shopperBaskets_AttributeDefinition = AttributeDefinition;
type shopperBaskets_Basket = Basket;
type shopperBaskets_BasketPaymentInstrumentRequest = BasketPaymentInstrumentRequest;
type shopperBaskets_BonusDiscountLineItem = BonusDiscountLineItem;
type shopperBaskets_BoolFilter = BoolFilter;
type shopperBaskets_BoolQuery = BoolQuery;
type shopperBaskets_ChangeControlled = ChangeControlled;
type shopperBaskets_ChangeControlledDataType = ChangeControlledDataType;
type shopperBaskets_ClosedObject = ClosedObject;
type shopperBaskets_CouponItem = CouponItem;
type shopperBaskets_CustomerInfo = CustomerInfo;
type shopperBaskets_Discount = Discount;
type shopperBaskets_DiscountRequest = DiscountRequest;
type shopperBaskets_Error = Error;
type shopperBaskets_ErrorResponse = ErrorResponse;
type shopperBaskets_Filter = Filter;
type shopperBaskets_FilteredQuery = FilteredQuery;
type shopperBaskets_GiftCertificateItem = GiftCertificateItem;
type shopperBaskets_GroupedTaxItem = GroupedTaxItem;
type shopperBaskets_L10nString = L10nString;
type shopperBaskets_LocalizedString = LocalizedString;
type shopperBaskets_MatchAllQuery = MatchAllQuery;
type shopperBaskets_Money = Money;
type shopperBaskets_MoneyMnemonic = MoneyMnemonic;
type shopperBaskets_NestedQuery = NestedQuery;
type shopperBaskets_NoPropertiesAllowed = NoPropertiesAllowed;
type shopperBaskets_Note = Note;
type shopperBaskets_NotesResult = NotesResult;
type shopperBaskets_OpenObject = OpenObject;
type shopperBaskets_OptionItem = OptionItem;
type shopperBaskets_Order = Order;
type shopperBaskets_OrderAddress = OrderAddress;
type shopperBaskets_OrderLookupRequest = OrderLookupRequest;
type shopperBaskets_OrderPaymentCardRequest = OrderPaymentCardRequest;
type shopperBaskets_OrderPaymentInstrument = OrderPaymentInstrument;
type shopperBaskets_OrderPaymentInstrumentRequest = OrderPaymentInstrumentRequest;
type shopperBaskets_PaginatedSearchResult = PaginatedSearchResult;
type shopperBaskets_PaginatedSearchResultBase = PaginatedSearchResultBase;
type shopperBaskets_PaymentCard = PaymentCard;
type shopperBaskets_PaymentCardSpec = PaymentCardSpec;
type shopperBaskets_PaymentMethod = PaymentMethod;
type shopperBaskets_PaymentMethodResult = PaymentMethodResult;
type shopperBaskets_PriceAdjustment = PriceAdjustment;
type shopperBaskets_PriceAdjustmentRequest = PriceAdjustmentRequest;
type shopperBaskets_PriceBookIds = PriceBookIds;
type shopperBaskets_ProductDetailsLink = ProductDetailsLink;
type shopperBaskets_ProductItem = ProductItem;
type shopperBaskets_ProductListItemReference = ProductListItemReference;
type shopperBaskets_ProductListLink = ProductListLink;
type shopperBaskets_PromotionLink = PromotionLink;
type shopperBaskets_PropertyDefinition = PropertyDefinition;
type shopperBaskets_PropertyValueDefinition = PropertyValueDefinition;
type shopperBaskets_Query = Query;
type shopperBaskets_QueryFilter = QueryFilter;
type shopperBaskets_Range2Filter = Range2Filter;
type shopperBaskets_RangeFilter = RangeFilter;
type shopperBaskets_SearchRequest = SearchRequest;
type shopperBaskets_SearchRequestBase = SearchRequestBase;
type shopperBaskets_Shipment = Shipment;
type shopperBaskets_ShippingItem = ShippingItem;
type shopperBaskets_ShippingMethod = ShippingMethod;
type shopperBaskets_ShippingMethodResult = ShippingMethodResult;
type shopperBaskets_ShippingPromotion = ShippingPromotion;
type shopperBaskets_ShopperBaskets<ConfigParameters extends ShopperBasketsParameters & Record<string, unknown>> = ShopperBaskets<ConfigParameters>;
declare const shopperBaskets_ShopperBaskets: typeof ShopperBaskets;
type shopperBaskets_ShopperBasketsParameters = ShopperBasketsParameters;
type shopperBaskets_ShopperBasketsPathParameters = ShopperBasketsPathParameters;
type shopperBaskets_ShopperBasketsQueryParameters = ShopperBasketsQueryParameters;
type shopperBaskets_SimpleLink = SimpleLink;
type shopperBaskets_SimpleSearchResult = SimpleSearchResult;
type shopperBaskets_SimpleSearchResultBase = SimpleSearchResultBase;
type shopperBaskets_Sort = Sort;
type shopperBaskets_SpecifiedPropertiesAllowed = SpecifiedPropertiesAllowed;
type shopperBaskets_Status = Status;
type shopperBaskets_TaxItem = TaxItem;
type shopperBaskets_TaxItems = TaxItems;
type shopperBaskets_Taxes = Taxes;
type shopperBaskets_TermFilter = TermFilter;
type shopperBaskets_TermQuery = TermQuery;
type shopperBaskets_TextQuery = TextQuery;
declare namespace shopperBaskets {
  export { type shopperBaskets_AttributeDefinition as AttributeDefinition, type shopperBaskets_Basket as Basket, type shopperBaskets_BasketPaymentInstrumentRequest as BasketPaymentInstrumentRequest, type shopperBaskets_BonusDiscountLineItem as BonusDiscountLineItem, type shopperBaskets_BoolFilter as BoolFilter, type shopperBaskets_BoolQuery as BoolQuery, type shopperBaskets_ChangeControlled as ChangeControlled, type shopperBaskets_ChangeControlledDataType as ChangeControlledDataType, type shopperBaskets_ClosedObject as ClosedObject, type shopperBaskets_CouponItem as CouponItem, type shopperBaskets_CustomerInfo as CustomerInfo, type shopperBaskets_Discount as Discount, type shopperBaskets_DiscountRequest as DiscountRequest, type shopperBaskets_Error as Error, type shopperBaskets_ErrorResponse as ErrorResponse, type shopperBaskets_Filter as Filter, type shopperBaskets_FilteredQuery as FilteredQuery, type shopperBaskets_GiftCertificateItem as GiftCertificateItem, type shopperBaskets_GroupedTaxItem as GroupedTaxItem, type shopperBaskets_L10nString as L10nString, type shopperBaskets_LocalizedString as LocalizedString, type shopperBaskets_MatchAllQuery as MatchAllQuery, type shopperBaskets_Money as Money, type shopperBaskets_MoneyMnemonic as MoneyMnemonic, type shopperBaskets_NestedQuery as NestedQuery, type shopperBaskets_NoPropertiesAllowed as NoPropertiesAllowed, type shopperBaskets_Note as Note, type shopperBaskets_NotesResult as NotesResult, type shopperBaskets_OpenObject as OpenObject, type shopperBaskets_OptionItem as OptionItem, type shopperBaskets_Order as Order, type shopperBaskets_OrderAddress as OrderAddress, type shopperBaskets_OrderLookupRequest as OrderLookupRequest, type shopperBaskets_OrderPaymentCardRequest as OrderPaymentCardRequest, type shopperBaskets_OrderPaymentInstrument as OrderPaymentInstrument, type shopperBaskets_OrderPaymentInstrumentRequest as OrderPaymentInstrumentRequest, type shopperBaskets_PaginatedSearchResult as PaginatedSearchResult, type shopperBaskets_PaginatedSearchResultBase as PaginatedSearchResultBase, type shopperBaskets_PaymentCard as PaymentCard, type shopperBaskets_PaymentCardSpec as PaymentCardSpec, type shopperBaskets_PaymentMethod as PaymentMethod, type shopperBaskets_PaymentMethodResult as PaymentMethodResult, type shopperBaskets_PriceAdjustment as PriceAdjustment, type shopperBaskets_PriceAdjustmentRequest as PriceAdjustmentRequest, type shopperBaskets_PriceBookIds as PriceBookIds, type shopperBaskets_ProductDetailsLink as ProductDetailsLink, type shopperBaskets_ProductItem as ProductItem, type shopperBaskets_ProductListItemReference as ProductListItemReference, type shopperBaskets_ProductListLink as ProductListLink, type shopperBaskets_PromotionLink as PromotionLink, type shopperBaskets_PropertyDefinition as PropertyDefinition, type shopperBaskets_PropertyValueDefinition as PropertyValueDefinition, type shopperBaskets_Query as Query, type shopperBaskets_QueryFilter as QueryFilter, type shopperBaskets_Range2Filter as Range2Filter, type shopperBaskets_RangeFilter as RangeFilter, type shopperBaskets_SearchRequest as SearchRequest, type shopperBaskets_SearchRequestBase as SearchRequestBase, type shopperBaskets_Shipment as Shipment, type shopperBaskets_ShippingItem as ShippingItem, type shopperBaskets_ShippingMethod as ShippingMethod, type shopperBaskets_ShippingMethodResult as ShippingMethodResult, type shopperBaskets_ShippingPromotion as ShippingPromotion, shopperBaskets_ShopperBaskets as ShopperBaskets, type shopperBaskets_ShopperBasketsParameters as ShopperBasketsParameters, type shopperBaskets_ShopperBasketsPathParameters as ShopperBasketsPathParameters, type shopperBaskets_ShopperBasketsQueryParameters as ShopperBasketsQueryParameters, type shopperBaskets_SimpleLink as SimpleLink, type shopperBaskets_SimpleSearchResult as SimpleSearchResult, type shopperBaskets_SimpleSearchResultBase as SimpleSearchResultBase, type shopperBaskets_Sort as Sort, type shopperBaskets_SpecifiedPropertiesAllowed as SpecifiedPropertiesAllowed, type shopperBaskets_Status as Status, type shopperBaskets_TaxItem as TaxItem, type shopperBaskets_TaxItems as TaxItems, type shopperBaskets_Taxes as Taxes, type shopperBaskets_TermFilter as TermFilter, type shopperBaskets_TermQuery as TermQuery, type shopperBaskets_TextQuery as TextQuery };
}

export { type Shipment as $, type AttributeDefinition as A, type BoolFilter as B, type ClosedObject as C, type ShippingItem as D, type ErrorResponse as E, type FilteredQuery as F, type Discount as G, type Note as H, type CouponItem as I, type PromotionLink as J, type PriceBookIds as K, type LocalizedString as L, type Money as M, type NoPropertiesAllowed as N, type OpenObject as O, type PropertyDefinition as P, type QueryFilter as Q, type Range2Filter as R, ShopperBaskets as S, type TermQuery as T, type ShippingPromotion as U, type ProductItem as V, type BasketPaymentInstrumentRequest as W, type Taxes as X, type OrderPaymentInstrument as Y, type BonusDiscountLineItem as Z, type PaymentMethodResult as _, type SimpleSearchResult as a, type CustomerInfo as a0, type SimpleLink as a1, type PriceAdjustment as a2, type ShippingMethodResult as a3, type ProductDetailsLink as a4, type OptionItem as a5, type ShippingMethod as a6, type DiscountRequest as a7, type Basket as a8, type OrderLookupRequest as a9, type OrderPaymentInstrumentRequest as aa, type GiftCertificateItem as ab, type ProductListLink as ac, type GroupedTaxItem as ad, type Order as ae, type OrderPaymentCardRequest as af, type PaymentMethod as ag, type TaxItem as ah, type Status as ai, type ProductListItemReference as aj, type ChangeControlled as ak, type ChangeControlledDataType as al, type Error as am, type ShopperBasketsPathParameters as an, type ShopperBasketsQueryParameters as ao, type ShopperBasketsParameters as ap, type SearchRequest as b, type PaginatedSearchResult as c, type SpecifiedPropertiesAllowed as d, type PaginatedSearchResultBase as e, type MatchAllQuery as f, type Query as g, type TermFilter as h, type TextQuery as i, type BoolQuery as j, type SimpleSearchResultBase as k, type NestedQuery as l, type Filter as m, type Sort as n, type RangeFilter as o, type SearchRequestBase as p, type MoneyMnemonic as q, type L10nString as r, shopperBaskets as s, type PropertyValueDefinition as t, type TaxItems as u, type PaymentCardSpec as v, type OrderAddress as w, type PriceAdjustmentRequest as x, type PaymentCard as y, type NotesResult as z };

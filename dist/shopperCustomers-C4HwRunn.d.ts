import ClientConfig, { ClientConfigInit } from './clientConfig.js';
import { BaseUriParameters, RequireParametersUnlessAllAreOptional, CompositeParameters } from './helpers/types.js';

type CustomerAddress = {
    address1?: string;
    address2?: string;
    addressId: string;
    city?: string;
    companyName?: string;
    countryCode: string;
    creationDate?: any;
    firstName?: string;
    fullName?: string;
    jobTitle?: string;
    lastModified?: any;
    lastName: string;
    phone?: string;
    postBox?: string;
    postalCode?: string;
    preferred?: boolean;
    salutation?: string;
    secondName?: string;
    stateCode?: string;
    suffix?: string;
    suite?: string;
    title?: string;
} & {
    [key: string]: any;
};
type CustomerProductListResult = {
    limit: number;
    data: Array<CustomerProductList>;
    total: number;
} & {
    [key: string]: any;
};
type CustomerProductListItemPurchase = {
    id: string;
    orderNo: string;
    productListItemId: string;
    purchaserName: string;
    quantity: number;
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
type OrderAddress = {
    address1: string;
    address2?: string;
    city: string;
    companyName?: string;
    countryCode: string;
    firstName: string;
    fullName?: string;
    id?: string;
    jobTitle?: string;
    lastName: string;
    phone?: string;
    postBox?: string;
    postalCode: string;
    salutation?: string;
    secondName?: string;
    stateCode?: string;
    suffix?: string;
    suite?: string;
    title?: string;
} & {
    [key: string]: any;
};
type PublicProductListResult = {
    limit: number;
    data: Array<PublicProductListInfo>;
    total: number;
} & {
    [key: string]: any;
};
type BasketsResult = {
    baskets?: Array<Basket>;
    total: number;
} & {
    [key: string]: any;
};
type TrustedSystemAuthRequest = {
    clientId: string;
    login: string;
} & {
    [key: string]: any;
};
type ResetPasswordRequest = {
    resetToken: string;
    login: string;
    newPassword: string;
} & {
    [key: string]: any;
};
type PaymentCard = {
    cardType: string;
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
} & {
    [key: string]: any;
};
type ShippingItem = {
    adjustedTax: number;
    basePrice: number;
    itemId: string;
    itemText: string;
    price: number;
    priceAdjustments: Array<PriceAdjustment>;
    priceAfterItemDiscount: number;
    shipmentId: string;
    tax: number;
    taxBasis: number;
    taxClassId: string;
    taxRate: number;
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
type ResetPasswordToken = {
    login: string;
    email: string;
    resetToken: string;
    expiresInMinutes: number;
} & {
    [key: string]: any;
};
type CouponItem = {
    code: string;
    couponItemId?: string;
    statusCode?: string;
    valid?: boolean;
} & {
    [key: string]: any;
};
type ShippingPromotion = {
    calloutMsg: string;
    promotionId: string;
    promotionName: string;
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
type ProductListShippingAddress = {
    addressId: string;
    city?: string;
    firstName?: string;
    lastName?: string;
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
    quantity: number;
    shipmentId?: string;
    shippingItemId?: string;
    tax?: number;
    taxBasis?: number;
    taxClassId?: string;
    taxRate?: number;
} & {
    [key: string]: any;
};
type CustomerProductListRegistrant = {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
} & {
    [key: string]: any;
};
type PublicProductListInfo = {
    description?: string;
    id: string;
    name?: string;
    title: string;
    type: string;
} & {
    [key: string]: any;
};
type CustomerPaymentCardRequest = {
    cardType: string;
    creditCardToken?: string;
    expirationMonth: number;
    expirationYear: number;
    holder: string;
    issueNumber: string;
    number: string;
    validFromMonth: number;
    validFromYear: number;
} & {
    [key: string]: any;
};
type RecommendationType = {
    displayValue: string;
    value: number;
} & {
    [key: string]: any;
};
type OrderPaymentInstrument = {
    amount: number;
    authorizationStatus: Status;
    bankRoutingNumber: string;
    maskedGiftCertificateCode: string;
    paymentBankAccount: PaymentBankAccount;
    paymentCard: PaymentCard;
    paymentInstrumentId: string;
    paymentMethodId: string;
} & {
    [key: string]: any;
};
type ProductType = {
    bundle: boolean;
    item: boolean;
    master: boolean;
    option: boolean;
    set: boolean;
    variant: boolean;
    variationGroup: boolean;
} & {
    [key: string]: any;
};
type PaymentBankAccount = {
    driversLicenseLastDigits?: string;
    driversLicenseStateCode?: string;
    holder?: string;
    maskedDriversLicense?: string;
    maskedNumber?: string;
    numberLastDigits?: string;
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
    recommendedItemLink?: string;
    shortDescription?: string;
} & {
    [key: string]: any;
};
type Variant = {
    orderable?: boolean;
    price?: number;
    productId: string;
    variationValues?: {} & {
        [key: string]: any;
    };
} & {
    [key: string]: any;
};
type BonusDiscountLineItem = {
    bonusProducts: Array<ProductDetailsLink>;
    couponCode: string;
    id: string;
    maxBonusItems: number;
    promotionId: string;
} & {
    [key: string]: any;
};
type CustomerPaymentInstrument = {
    bankRoutingNumber?: string;
    creationDate?: any;
    lastModified?: any;
    maskedGiftCertificateCode?: string;
    paymentBankAccount?: PaymentBankAccount;
    paymentCard?: PaymentCard;
    paymentInstrumentId?: string;
    paymentMethodId?: string;
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
    shippingStatus: string;
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
    customerNo: string;
    email: string;
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
type SimpleLink = {
    link: string;
} & {
    [key: string]: any;
};
type PaymentBankAccountRequest = {
    driversLicense: string;
    driversLicenseStateCode: string;
    holder: string;
    number: string;
} & {
    [key: string]: any;
};
type PriceAdjustment = {
    appliedDiscount: Discount;
    couponCode: string;
    createdBy: string;
    creationDate: any;
    custom: boolean;
    itemText: string;
    lastModified: any;
    manual: boolean;
    price: number;
    priceAdjustmentId: string;
    promotionId: string;
    promotionLink: string;
    reasonCode: string;
} & {
    [key: string]: any;
};
type PublicProductListItem = {
    id: string;
    priority: number;
    product?: Product;
    type: string;
} & {
    [key: string]: any;
};
type ProductDetailsLink = {
    productDescription?: string;
    productId: string;
    productName?: string;
    title?: string;
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
type ProductListEvent = {
    city?: string;
    country?: string;
    date?: any;
    state?: string;
    type: string;
} & {
    [key: string]: any;
};
type PasswordChangeRequest = {
    currentPassword: string;
    password: string;
} & {
    [key: string]: any;
};
type AuthRequest = {
    type?: string;
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
type CustomerProductList = {
    coRegistrant?: CustomerProductListRegistrant;
    creationDate?: any;
    currentShippingAddressInfo?: CustomerAddressInfo;
    customerProductListItems?: Array<CustomerProductListItem>;
    description?: string;
    event?: ProductListEvent;
    id?: string;
    lastModified?: any;
    name?: string;
    postEventShippingAddressInfo?: CustomerAddressInfo;
    productListShippingAddress?: ProductListShippingAddress;
    public?: boolean;
    registrant?: CustomerProductListRegistrant;
    shippingAddressInfo?: CustomerAddressInfo;
    type?: string;
} & {
    [key: string]: any;
};
type Basket = {
    adjustedMerchandizeTotalTax: number;
    adjustedShippingTotalTax: number;
    agentBasket: boolean;
    basketId: string;
    billingAddress?: OrderAddress;
    bonusDiscountLineItems?: Array<BonusDiscountLineItem>;
    channelType: string;
    couponItems?: Array<CouponItem>;
    creationDate: any;
    currency: string;
    customerInfo: CustomerInfo;
    giftCertificateItems?: Array<GiftCertificateItem>;
    groupedTaxItems?: Array<GroupedTaxItem>;
    inventoryReservationExpiry?: any;
    lastModified: any;
    merchandizeTotalTax: number;
    notes: SimpleLink;
    orderPriceAdjustments?: Array<PriceAdjustment>;
    orderTotal: number;
    paymentInstruments?: Array<OrderPaymentInstrument>;
    productItems?: Array<ProductItem>;
    productSubTotal: number;
    productTotal: number;
    shipments: Array<Shipment>;
    shippingItems: Array<ShippingItem>;
    shippingTotal: number;
    shippingTotalTax: number;
    sourceCode?: string;
    taxTotal: number;
    taxation: string;
    taxRoundedAtGroup?: boolean;
    temporaryBasket?: boolean;
} & {
    [key: string]: any;
};
type CustomerPaymentInstrumentRequest = {
    bankRoutingNumber?: string;
    giftCertificateCode?: string;
    paymentBankAccount?: PaymentBankAccountRequest;
    paymentCard?: CustomerPaymentCardRequest;
    paymentMethodId?: string;
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
type CustomerRegistration = {
    customer: Customer;
    password: string;
} & {
    [key: string]: any;
};
type Customer = {
    addresses?: Array<CustomerAddress>;
    authType?: string;
    birthday?: any;
    companyName?: string;
    creationDate?: any;
    customerId?: string;
    customerNo?: string;
    currentPassword?: string;
    email?: string;
    enabled?: boolean;
    fax?: string;
    firstName?: string;
    gender?: number;
    jobTitle?: string;
    lastLoginTime?: any;
    lastModified?: any;
    lastName?: string;
    lastVisitTime?: any;
    login?: string;
    note?: string;
    paymentInstruments?: Array<CustomerPaymentInstrument>;
    phoneBusiness?: string;
    phoneHome?: string;
    phoneMobile?: string;
    preferredLocale?: string;
    previousLoginTime?: any;
    previousVisitTime?: any;
    salutation?: string;
    secondName?: string;
    suffix?: string;
    title?: string;
} & {
    [key: string]: any;
};
type PublicProductList = {
    coRegistrant?: ProductListRegistrant;
    creationDate?: any;
    description?: string;
    event?: ProductListEvent;
    id: string;
    lastModified?: any;
    name?: string;
    productListItems?: Array<PublicProductListItem>;
    productListShippingAddress?: ProductListShippingAddress;
    public: boolean;
    registrant?: ProductListRegistrant;
    type: string;
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
type CustomerOrderResult = {
    limit: number;
    data: Array<Order>;
    offset: number;
    total: number;
} & {
    [key: string]: any;
};
type CustomerExtProfileRequest = {
    authenticationProviderId: string;
    email?: string;
    externalId: string;
    firstName?: string;
    lastName?: string;
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
type CustomerExternalProfile = {
    customerId: string;
    authenticationProviderId: string;
    email?: string;
    externalId: string;
    firstName?: string;
    lastName?: string;
} & {
    [key: string]: any;
};
type CustomerAddressInfo = {
    addressId: string;
    title: string;
} & {
    [key: string]: any;
};
type ResetPasswordTokenRequest = {
    login: string;
} & {
    [key: string]: any;
};
type ProductListLink = {
    description: string;
    link: string;
    name: string;
    public: boolean;
    title: string;
    type: string;
} & {
    [key: string]: any;
};
type GroupedTaxItem = {
    taxRate?: number;
    taxValue?: number;
};
type ProductListRegistrant = {
    firstName: string;
    lastName: string;
    role: string;
} & {
    [key: string]: any;
};
type Order = {
    adjustedMerchandizeTotalTax?: number;
    adjustedShippingTotalTax?: number;
    billingAddress?: OrderAddress;
    bonusDiscountLineItems?: Array<BonusDiscountLineItem>;
    channelType?: string;
    confirmationStatus: string;
    couponItems?: Array<CouponItem>;
    createdBy?: string;
    creationDate?: any;
    currency?: string;
    customerInfo?: CustomerInfo;
    customerName?: string;
    exportStatus: string;
    externalOrderStatus?: string;
    giftCertificateItems?: Array<GiftCertificateItem>;
    globalPartyId?: string;
    lastModified?: any;
    merchandizeTotalTax?: number;
    notes?: SimpleLink;
    orderNo?: string;
    orderPriceAdjustments?: Array<PriceAdjustment>;
    orderToken?: string;
    orderTotal?: number;
    paymentInstruments?: Array<OrderPaymentInstrument>;
    paymentStatus: string;
    productItems?: Array<ProductItem>;
    productSubTotal?: number;
    productTotal?: number;
    shipments?: Array<Shipment>;
    shippingItems?: Array<ShippingItem>;
    shippingStatus: string;
    shippingTotal?: number;
    shippingTotalTax?: number;
    siteId?: string;
    sourceCode?: string;
    status: string;
    taxTotal?: number;
    taxation?: string;
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
    priceMax?: number;
    prices?: {} & {
        [key: string]: any;
    };
    primaryCategoryId?: string;
    productLinks?: Array<ProductLink>;
    productPromotions?: Array<ProductPromotion>;
    recommendations?: Array<Recommendation>;
    setProducts?: Array<Product>;
    shortDescription?: string;
    stepQuantity?: number;
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
type BundledProduct = {
    id: string;
    product: Product;
    quantity: number;
} & {
    [key: string]: any;
};
type Status = {
    code: string;
    message: string;
    status: number;
} & {
    [key: string]: any;
};
type CustomerProductListItem = {
    id?: string;
    priority: number;
    product?: Product;
    productId?: string;
    public: boolean;
    purchasedQuantity?: number;
    quantity: number;
    type?: string;
} & {
    [key: string]: any;
};
type ProductListItemReference = {
    id: string;
    priority?: number;
    productList?: ProductListLink;
    public?: boolean;
    purchasedQuantity?: number;
    quantity?: number;
    type?: string;
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
 * All path parameters that are used by at least one ShopperCustomers method.
 */
type ShopperCustomersPathParameters = {
    organizationId?: string;
    customerId?: string;
    addressName?: string;
    paymentInstrumentId?: string;
    listId?: string;
    itemId?: string;
};
/**
 * All query parameters that are used by at least one ShopperCustomers method.
 */
type ShopperCustomersQueryParameters = {
    siteId?: string;
    externalId?: string;
    authenticationProviderId?: string;
    crossSites?: boolean;
    from?: string;
    until?: string;
    status?: string;
    offset?: any;
    limit?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
};
/**
 * All parameters that are used by ShopperCustomers.
 */
type ShopperCustomersParameters = ShopperCustomersPathParameters & BaseUriParameters & ShopperCustomersQueryParameters;
/**
* [Shopper Customers](https://developer.salesforce.com/docs/commerce/commerce-api/references?meta=shopper-customers:Summary)
* ==================================
*
* *Allow customers to manage their own profiles and product lists.*<br />
*
* Simple example:
*
* ```typescript
*   import { ShopperCustomers } from "commerce-sdk-isomorphic";
*
*   const clientConfig = {
*     parameters: {
*       clientId: "XXXXXX",
*       organizationId: "XXXX",
*       shortCode: "XXX",
*       siteId: "XX"
*     }
*   };
*   const shopperCustomersClient = new ShopperCustomers(clientConfig);
* ```
*
* <span style="font-size:.7em; display:block; text-align: right">
* API Version: 0.0.49<br />
* Last Updated: <br />
* </span>
*
*
*/
declare class ShopperCustomers<ConfigParameters extends ShopperCustomersParameters & Record<string, unknown>> {
    clientConfig: ClientConfig<ConfigParameters> & {
        baseUri: string;
    };
    static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/{version}";
    static readonly apiPaths: {
        registerCustomer: string;
        resetPassword: string;
        getResetPasswordToken: string;
        registerExternalProfile: string;
        getExternalProfile: string;
        getCustomer: string;
        updateCustomer: string;
        createCustomerAddress: string;
        getCustomerAddress: string;
        removeCustomerAddress: string;
        updateCustomerAddress: string;
        getCustomerBaskets: string;
        getCustomerOrders: string;
        updateCustomerPassword: string;
        createCustomerPaymentInstrument: string;
        deleteCustomerPaymentInstrument: string;
        getCustomerPaymentInstrument: string;
        getCustomerProductLists: string;
        createCustomerProductList: string;
        deleteCustomerProductList: string;
        getCustomerProductList: string;
        updateCustomerProductList: string;
        createCustomerProductListItem: string;
        deleteCustomerProductListItem: string;
        getCustomerProductListItem: string;
        updateCustomerProductListItem: string;
        getPublicProductListsBySearchTerm: string;
        getPublicProductList: string;
        getProductListItem: string;
    };
    constructor(config: ClientConfigInit<ConfigParameters>);
    static readonly paramKeys: {
        readonly registerCustomer: readonly ["organizationId", "siteId"];
        readonly registerCustomerRequired: readonly ["organizationId", "siteId"];
        readonly resetPassword: readonly ["organizationId", "siteId"];
        readonly resetPasswordRequired: readonly ["organizationId", "siteId"];
        readonly getResetPasswordToken: readonly ["organizationId", "siteId"];
        readonly getResetPasswordTokenRequired: readonly ["organizationId", "siteId"];
        readonly registerExternalProfile: readonly ["organizationId", "siteId"];
        readonly registerExternalProfileRequired: readonly ["organizationId", "siteId"];
        readonly getExternalProfile: readonly ["organizationId", "externalId", "authenticationProviderId", "siteId"];
        readonly getExternalProfileRequired: readonly ["organizationId", "externalId", "authenticationProviderId", "siteId"];
        readonly getCustomer: readonly ["organizationId", "customerId", "siteId"];
        readonly getCustomerRequired: readonly ["organizationId", "customerId", "siteId"];
        readonly updateCustomer: readonly ["organizationId", "customerId", "siteId"];
        readonly updateCustomerRequired: readonly ["organizationId", "customerId", "siteId"];
        readonly createCustomerAddress: readonly ["organizationId", "customerId", "siteId"];
        readonly createCustomerAddressRequired: readonly ["organizationId", "customerId", "siteId"];
        readonly getCustomerAddress: readonly ["organizationId", "customerId", "addressName", "siteId"];
        readonly getCustomerAddressRequired: readonly ["organizationId", "customerId", "addressName", "siteId"];
        readonly removeCustomerAddress: readonly ["organizationId", "customerId", "addressName", "siteId"];
        readonly removeCustomerAddressRequired: readonly ["organizationId", "customerId", "addressName", "siteId"];
        readonly updateCustomerAddress: readonly ["organizationId", "customerId", "addressName", "siteId"];
        readonly updateCustomerAddressRequired: readonly ["organizationId", "customerId", "addressName", "siteId"];
        readonly getCustomerBaskets: readonly ["organizationId", "customerId", "siteId"];
        readonly getCustomerBasketsRequired: readonly ["organizationId", "customerId", "siteId"];
        readonly getCustomerOrders: readonly ["organizationId", "customerId", "crossSites", "from", "until", "status", "siteId", "offset", "limit"];
        readonly getCustomerOrdersRequired: readonly ["organizationId", "customerId", "siteId"];
        readonly updateCustomerPassword: readonly ["organizationId", "customerId", "siteId"];
        readonly updateCustomerPasswordRequired: readonly ["organizationId", "customerId", "siteId"];
        readonly createCustomerPaymentInstrument: readonly ["organizationId", "customerId", "siteId"];
        readonly createCustomerPaymentInstrumentRequired: readonly ["organizationId", "customerId", "siteId"];
        readonly deleteCustomerPaymentInstrument: readonly ["organizationId", "customerId", "paymentInstrumentId", "siteId"];
        readonly deleteCustomerPaymentInstrumentRequired: readonly ["organizationId", "customerId", "paymentInstrumentId", "siteId"];
        readonly getCustomerPaymentInstrument: readonly ["organizationId", "customerId", "paymentInstrumentId", "siteId"];
        readonly getCustomerPaymentInstrumentRequired: readonly ["organizationId", "customerId", "paymentInstrumentId", "siteId"];
        readonly getCustomerProductLists: readonly ["organizationId", "customerId", "siteId"];
        readonly getCustomerProductListsRequired: readonly ["organizationId", "customerId", "siteId"];
        readonly createCustomerProductList: readonly ["organizationId", "customerId", "siteId"];
        readonly createCustomerProductListRequired: readonly ["organizationId", "customerId", "siteId"];
        readonly deleteCustomerProductList: readonly ["organizationId", "customerId", "listId", "siteId"];
        readonly deleteCustomerProductListRequired: readonly ["organizationId", "customerId", "listId", "siteId"];
        readonly getCustomerProductList: readonly ["organizationId", "customerId", "listId", "siteId"];
        readonly getCustomerProductListRequired: readonly ["organizationId", "customerId", "listId", "siteId"];
        readonly updateCustomerProductList: readonly ["organizationId", "customerId", "listId", "siteId"];
        readonly updateCustomerProductListRequired: readonly ["organizationId", "customerId", "listId", "siteId"];
        readonly createCustomerProductListItem: readonly ["organizationId", "customerId", "listId", "siteId"];
        readonly createCustomerProductListItemRequired: readonly ["organizationId", "customerId", "listId", "siteId"];
        readonly deleteCustomerProductListItem: readonly ["organizationId", "customerId", "listId", "itemId", "siteId"];
        readonly deleteCustomerProductListItemRequired: readonly ["organizationId", "customerId", "listId", "itemId", "siteId"];
        readonly getCustomerProductListItem: readonly ["organizationId", "customerId", "listId", "itemId", "siteId"];
        readonly getCustomerProductListItemRequired: readonly ["organizationId", "customerId", "listId", "itemId", "siteId"];
        readonly updateCustomerProductListItem: readonly ["organizationId", "customerId", "listId", "itemId", "siteId"];
        readonly updateCustomerProductListItemRequired: readonly ["organizationId", "customerId", "listId", "itemId", "siteId"];
        readonly getPublicProductListsBySearchTerm: readonly ["organizationId", "email", "firstName", "lastName", "siteId"];
        readonly getPublicProductListsBySearchTermRequired: readonly ["organizationId", "siteId"];
        readonly getPublicProductList: readonly ["organizationId", "listId", "siteId"];
        readonly getPublicProductListRequired: readonly ["organizationId", "listId", "siteId"];
        readonly getProductListItem: readonly ["organizationId", "listId", "itemId", "siteId"];
        readonly getProductListItemRequired: readonly ["organizationId", "listId", "itemId", "siteId"];
    };
    /**
    * Registers a new customer. The mandatory data are the credentials, profile last name, and email. This requires a JSON Web Token (JWT) which needs to be obtained using the POST /customers/auth API with type \"guest\", or from the Shopper Login (SLAS) API. The return type object for this endpoint is a common customer object shared by multiple Shopper Customer endpoints. In this case, all customer object details are returned, but attributes that are not included in the response, although they might be part of the customer object, are ignored. For example, although address information is included in the customer object, it is not displayed in the response for this endpoint and is ignored.
    *
    * If you would like to get a raw Response object use the other registerCustomer function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type Customer.
    *
    */
    registerCustomer(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerRegistration;
    }>): Promise<Customer>;
    /**
    * Registers a new customer. The mandatory data are the credentials, profile last name, and email. This requires a JSON Web Token (JWT) which needs to be obtained using the POST /customers/auth API with type \"guest\", or from the Shopper Login (SLAS) API. The return type object for this endpoint is a common customer object shared by multiple Shopper Customer endpoints. In this case, all customer object details are returned, but attributes that are not included in the response, although they might be part of the customer object, are ignored. For example, although address information is included in the customer object, it is not displayed in the response for this endpoint and is ignored.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type Customer otherwise.
    *
    */
    registerCustomer<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerRegistration;
    }>, rawResponse?: T): Promise<T extends true ? Response : Customer>;
    /**
    * Reset customer password, after obtaining a reset token. This is the second step in the reset customer password flow, where a customer password is reset by providing the new credentials along with a reset token. This call should be preceded by a call to the /create-reset-token endpoint.
    *
    * If you would like to get a raw Response object use the other resetPassword function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type void.
    *
    */
    resetPassword(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: ResetPasswordRequest;
    }>): Promise<void>;
    /**
    * Reset customer password, after obtaining a reset token. This is the second step in the reset customer password flow, where a customer password is reset by providing the new credentials along with a reset token. This call should be preceded by a call to the /create-reset-token endpoint.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
    *
    */
    resetPassword<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: ResetPasswordRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : void>;
    /**
    * Get reset password token. This is the first step in the reset customer password flow, where a password reset token is requested for future use to reset a customer password. This call should be followed by a call to the /reset endpoint.
    *
    * If you would like to get a raw Response object use the other getResetPasswordToken function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type ResetPasswordToken.
    *
    */
    getResetPasswordToken(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: ResetPasswordTokenRequest;
    }>): Promise<ResetPasswordToken>;
    /**
    * Get reset password token. This is the first step in the reset customer password flow, where a password reset token is requested for future use to reset a customer password. This call should be followed by a call to the /reset endpoint.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type ResetPasswordToken otherwise.
    *
    */
    getResetPasswordToken<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: ResetPasswordTokenRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : ResetPasswordToken>;
    /**
    * Registers a new external profile for a customer. This endpoint accepts a guest customer ShopperToken (JWT) only.
    *
    * If you would like to get a raw Response object use the other registerExternalProfile function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type CustomerExternalProfile.
    *
    */
    registerExternalProfile(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerExtProfileRequest;
    }>): Promise<CustomerExternalProfile>;
    /**
    * Registers a new external profile for a customer. This endpoint accepts a guest customer ShopperToken (JWT) only.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type CustomerExternalProfile otherwise.
    *
    */
    registerExternalProfile<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerExtProfileRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : CustomerExternalProfile>;
    /**
    * Gets the new external profile for a customer. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * If you would like to get a raw Response object use the other getExternalProfile function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param externalId - The External ID of the customer.
    * @param authenticationProviderId - The authentication Provider Id.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type CustomerExternalProfile.
    *
    */
    getExternalProfile(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            externalId: string;
            authenticationProviderId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<CustomerExternalProfile>;
    /**
    * Gets the new external profile for a customer. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param externalId - The External ID of the customer.
    * @param authenticationProviderId - The authentication Provider Id.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type CustomerExternalProfile otherwise.
    *
    */
    getExternalProfile<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            externalId: string;
            authenticationProviderId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : CustomerExternalProfile>;
    /**
    * Gets a customer with all existing addresses and payment instruments associated with the requested customer. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * If you would like to get a raw Response object use the other getCustomer function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type Customer.
    *
    */
    getCustomer(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<Customer>;
    /**
    * Gets a customer with all existing addresses and payment instruments associated with the requested customer. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type Customer otherwise.
    *
    */
    getCustomer<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : Customer>;
    /**
    * Updates a customer. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * If you would like to get a raw Response object use the other updateCustomer function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type Customer.
    *
    */
    updateCustomer(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Customer;
    }>): Promise<Customer>;
    /**
    * Updates a customer. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type Customer otherwise.
    *
    */
    updateCustomer<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: Customer;
    }>, rawResponse?: T): Promise<T extends true ? Response : Customer>;
    /**
    * Creates a new address with the given name for the given customer. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * If you would like to get a raw Response object use the other createCustomerAddress function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type CustomerAddress.
    *
    */
    createCustomerAddress(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerAddress;
    }>): Promise<CustomerAddress>;
    /**
    * Creates a new address with the given name for the given customer. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type CustomerAddress otherwise.
    *
    */
    createCustomerAddress<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerAddress;
    }>, rawResponse?: T): Promise<T extends true ? Response : CustomerAddress>;
    /**
    * Retrieves a customer's address by address name. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * If you would like to get a raw Response object use the other getCustomerAddress function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param addressName - The name of the address to update.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type CustomerAddress.
    *
    */
    getCustomerAddress(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            addressName: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<CustomerAddress>;
    /**
    * Retrieves a customer's address by address name. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param addressName - The name of the address to update.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type CustomerAddress otherwise.
    *
    */
    getCustomerAddress<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            addressName: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : CustomerAddress>;
    /**
    * Deletes a customer's address by address name. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * If you would like to get a raw Response object use the other removeCustomerAddress function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param addressName - The name of the address to update.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type void.
    *
    */
    removeCustomerAddress(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            addressName: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<void>;
    /**
    * Deletes a customer's address by address name. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param addressName - The name of the address to update.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
    *
    */
    removeCustomerAddress<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            addressName: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : void>;
    /**
    * Updates a customer's address by address name. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * If you would like to get a raw Response object use the other updateCustomerAddress function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param addressName - The name of the address to update.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type CustomerAddress.
    *
    */
    updateCustomerAddress(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            addressName: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerAddress;
    }>): Promise<CustomerAddress>;
    /**
    * Updates a customer's address by address name. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param addressName - The name of the address to update.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type CustomerAddress otherwise.
    *
    */
    updateCustomerAddress<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            addressName: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerAddress;
    }>, rawResponse?: T): Promise<T extends true ? Response : CustomerAddress>;
    /**
    * Gets the baskets of a customer. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * If you would like to get a raw Response object use the other getCustomerBaskets function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type BasketsResult.
    *
    */
    getCustomerBaskets(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<BasketsResult>;
    /**
    * Gets the baskets of a customer. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type BasketsResult otherwise.
    *
    */
    getCustomerBaskets<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : BasketsResult>;
    /**
    * Returns a pageable list of all customer's orders. The default page size is 10. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * If you would like to get a raw Response object use the other getCustomerOrders function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param crossSites - The flag indicating whether all sites should be searched. This flag is ignored unless a valid User / Agent is present with a trusted agent on behalf (TAOB) token. Without a TAOB token, only the customer's orders placed on the site specified by siteId are returned.
    * @param from -
    * @param until -
    * @param status -
    * @param siteId -
    * @param offset -
    * @param limit - Maximum records to retrieve per request, not to exceed 50. Defaults to 10.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type CustomerOrderResult.
    *
    */
    getCustomerOrders(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            crossSites?: boolean;
            from?: string;
            until?: string;
            status?: string;
            siteId: string;
            offset?: any;
            limit?: number;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<CustomerOrderResult>;
    /**
    * Returns a pageable list of all customer's orders. The default page size is 10. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param crossSites - The flag indicating whether all sites should be searched. This flag is ignored unless a valid User / Agent is present with a trusted agent on behalf (TAOB) token. Without a TAOB token, only the customer's orders placed on the site specified by siteId are returned.
    * @param from -
    * @param until -
    * @param status -
    * @param siteId -
    * @param offset -
    * @param limit - Maximum records to retrieve per request, not to exceed 50. Defaults to 10.
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type CustomerOrderResult otherwise.
    *
    */
    getCustomerOrders<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            crossSites?: boolean;
            from?: string;
            until?: string;
            status?: string;
            siteId: string;
            offset?: any;
            limit?: number;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : CustomerOrderResult>;
    /**
    * Updates the customer's password. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * If you would like to get a raw Response object use the other updateCustomerPassword function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type void.
    *
    */
    updateCustomerPassword(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: PasswordChangeRequest;
    }>): Promise<void>;
    /**
    * Updates the customer's password. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
    *
    */
    updateCustomerPassword<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: PasswordChangeRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : void>;
    /**
    * Adds a payment instrument to the customer information. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * If you would like to get a raw Response object use the other createCustomerPaymentInstrument function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type CustomerPaymentInstrument.
    *
    */
    createCustomerPaymentInstrument(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerPaymentInstrumentRequest;
    }>): Promise<CustomerPaymentInstrument>;
    /**
    * Adds a payment instrument to the customer information. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type CustomerPaymentInstrument otherwise.
    *
    */
    createCustomerPaymentInstrument<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerPaymentInstrumentRequest;
    }>, rawResponse?: T): Promise<T extends true ? Response : CustomerPaymentInstrument>;
    /**
    * Deletes a customer's payment instrument. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * If you would like to get a raw Response object use the other deleteCustomerPaymentInstrument function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param paymentInstrumentId - The ID of the payment instrument to be retrievedCustomer.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type void.
    *
    */
    deleteCustomerPaymentInstrument(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            paymentInstrumentId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<void>;
    /**
    * Deletes a customer's payment instrument. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param paymentInstrumentId - The ID of the payment instrument to be retrievedCustomer.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
    *
    */
    deleteCustomerPaymentInstrument<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            paymentInstrumentId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : void>;
    /**
    * Retrieves a customer's payment instrument by its ID. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * If you would like to get a raw Response object use the other getCustomerPaymentInstrument function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param paymentInstrumentId - The ID of the payment instrument to be retrievedCustomer.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type CustomerPaymentInstrument.
    *
    */
    getCustomerPaymentInstrument(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            paymentInstrumentId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<CustomerPaymentInstrument>;
    /**
    * Retrieves a customer's payment instrument by its ID. This endpoint accepts a registered customer ShopperToken (JWT) only.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param paymentInstrumentId - The ID of the payment instrument to be retrievedCustomer.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type CustomerPaymentInstrument otherwise.
    *
    */
    getCustomerPaymentInstrument<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            paymentInstrumentId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : CustomerPaymentInstrument>;
    /**
    * Returns all customer product lists. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * If you would like to get a raw Response object use the other getCustomerProductLists function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type CustomerProductListResult.
    *
    */
    getCustomerProductLists(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<CustomerProductListResult>;
    /**
    * Returns all customer product lists. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductListResult otherwise.
    *
    */
    getCustomerProductLists<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : CustomerProductListResult>;
    /**
    * Creates a customer product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * If you would like to get a raw Response object use the other createCustomerProductList function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type CustomerProductList.
    *
    */
    createCustomerProductList(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerProductList;
    }>): Promise<CustomerProductList>;
    /**
    * Creates a customer product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductList otherwise.
    *
    */
    createCustomerProductList<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerProductList;
    }>, rawResponse?: T): Promise<T extends true ? Response : CustomerProductList>;
    /**
    * Deletes a customer product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer  ShopperToken.
    *
    * If you would like to get a raw Response object use the other deleteCustomerProductList function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param listId - The product list ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type void.
    *
    */
    deleteCustomerProductList(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            listId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<void>;
    /**
    * Deletes a customer product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer  ShopperToken.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param listId - The product list ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
    *
    */
    deleteCustomerProductList<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            listId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : void>;
    /**
    * Returns a customer product list of the given customer and the items in the list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * If you would like to get a raw Response object use the other getCustomerProductList function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param listId - The product list ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type CustomerProductList.
    *
    */
    getCustomerProductList(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            listId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<CustomerProductList>;
    /**
    * Returns a customer product list of the given customer and the items in the list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param listId - The product list ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductList otherwise.
    *
    */
    getCustomerProductList<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            listId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : CustomerProductList>;
    /**
    * Changes a product list. Changeable properties are the name, description, and if the list is public. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * If you would like to get a raw Response object use the other updateCustomerProductList function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param listId - The product list ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type CustomerProductList.
    *
    */
    updateCustomerProductList(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            listId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerProductList;
    }>): Promise<CustomerProductList>;
    /**
    * Changes a product list. Changeable properties are the name, description, and if the list is public. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param listId - The product list ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductList otherwise.
    *
    */
    updateCustomerProductList<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            listId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerProductList;
    }>, rawResponse?: T): Promise<T extends true ? Response : CustomerProductList>;
    /**
    * Adds an item to the customer's product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.

Considered values from the request body are:

- `type` → The type of the item to be added to the customer's product. Must be a valid type. Mandatory.
list.
- `priority` → The priority of the item to be added to the customer's product list.
- `public` → The flag that determines whether the item to be added to the customer's product list is public.
- `product_id` → The ID (SKU) of the product related to the item to be added to the customer's product list. A valid product ID, used for product item type only. Must be a valid product ID; otherwise, a `ProductListProductIdMissingException` or `ProductListProductNotFoundException` is thrown. Mandatory when item type is `product`.
- `quantity` → Used for product item type only. This is the quantity of the item to be added to the customer's product list.

You can also use a custom property of the form `c_\<CUSTOM_NAME\>`. The custom property must correspond to a custom attribute (`\<CUSTOM_NAME\>`) that is defined for `ProductListItem`. The value of this property must be valid for the type of custom attribute defined for `ProductListItem`.
    *
    * If you would like to get a raw Response object use the other createCustomerProductListItem function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param listId - The product list ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type CustomerProductListItem.
    *
    */
    createCustomerProductListItem(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            listId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerProductListItem;
    }>): Promise<CustomerProductListItem>;
    /**
    * Adds an item to the customer's product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.

Considered values from the request body are:

- `type` → The type of the item to be added to the customer's product. Must be a valid type. Mandatory.
list.
- `priority` → The priority of the item to be added to the customer's product list.
- `public` → The flag that determines whether the item to be added to the customer's product list is public.
- `product_id` → The ID (SKU) of the product related to the item to be added to the customer's product list. A valid product ID, used for product item type only. Must be a valid product ID; otherwise, a `ProductListProductIdMissingException` or `ProductListProductNotFoundException` is thrown. Mandatory when item type is `product`.
- `quantity` → Used for product item type only. This is the quantity of the item to be added to the customer's product list.

You can also use a custom property of the form `c_\<CUSTOM_NAME\>`. The custom property must correspond to a custom attribute (`\<CUSTOM_NAME\>`) that is defined for `ProductListItem`. The value of this property must be valid for the type of custom attribute defined for `ProductListItem`.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param listId - The product list ID.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductListItem otherwise.
    *
    */
    createCustomerProductListItem<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            listId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerProductListItem;
    }>, rawResponse?: T): Promise<T extends true ? Response : CustomerProductListItem>;
    /**
    * Removes an item from a customer product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * If you would like to get a raw Response object use the other deleteCustomerProductListItem function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param listId - The product list ID.
    * @param itemId - The ID of the product list item to update.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type void.
    *
    */
    deleteCustomerProductListItem(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            listId: string;
            itemId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<void>;
    /**
    * Removes an item from a customer product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param listId - The product list ID.
    * @param itemId - The ID of the product list item to update.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
    *
    */
    deleteCustomerProductListItem<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            listId: string;
            itemId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : void>;
    /**
    * Returns an item of a customer product list and the actual product details like image, availability and price. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * If you would like to get a raw Response object use the other getCustomerProductListItem function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param listId - The product list ID.
    * @param itemId - The ID of the product list item to update.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type CustomerProductListItem.
    *
    */
    getCustomerProductListItem(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            listId: string;
            itemId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<CustomerProductListItem>;
    /**
    * Returns an item of a customer product list and the actual product details like image, availability and price. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param listId - The product list ID.
    * @param itemId - The ID of the product list item to update.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductListItem otherwise.
    *
    */
    getCustomerProductListItem<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            listId: string;
            itemId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : CustomerProductListItem>;
    /**
    * Updates an item of a customer's product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
Considered values from the request body are:

priority: This is the priority of the customer's product list item.
public: This is the flag whether the customer's product list item is public.
quantity: This is the quantity of
the customer's product list item. Used for product item type only.
custom properties in the form c_\<CUSTOM_NAME\>: The custom property
must correspond to a custom attribute (\<CUSTOM_NAME\>) defined for ProductListItem.
The value of this property must be valid for the type of custom attribute defined for ProductListItem.
    *
    * If you would like to get a raw Response object use the other updateCustomerProductListItem function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param listId - The product list ID.
    * @param itemId - The ID of the product list item to update.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    *
    * @returns A promise of type CustomerProductListItem.
    *
    */
    updateCustomerProductListItem(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            listId: string;
            itemId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerProductListItem;
    }>): Promise<CustomerProductListItem>;
    /**
    * Updates an item of a customer's product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
Considered values from the request body are:

priority: This is the priority of the customer's product list item.
public: This is the flag whether the customer's product list item is public.
quantity: This is the quantity of
the customer's product list item. Used for product item type only.
custom properties in the form c_\<CUSTOM_NAME\>: The custom property
must correspond to a custom attribute (\<CUSTOM_NAME\>) defined for ProductListItem.
The value of this property must be valid for the type of custom attribute defined for ProductListItem.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param customerId - The customer ID.
    * @param listId - The product list ID.
    * @param itemId - The ID of the product list item to update.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param body - The data to send as the request body.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductListItem otherwise.
    *
    */
    updateCustomerProductListItem<T extends boolean>(options: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            customerId: string;
            listId: string;
            itemId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
        body: CustomerProductListItem;
    }>, rawResponse?: T): Promise<T extends true ? Response : CustomerProductListItem>;
    /**
    * Retrieves all public product lists as defined by the given search term (for example, email OR first name and last name). This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * If you would like to get a raw Response object use the other getPublicProductListsBySearchTerm function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param email - The email address of the customer the product lists belong to.
    * @param firstName - The first name of the customer the product lists belong to.
    * @param lastName - The last name of the customer the product lists belong to.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type PublicProductListResult.
    *
    */
    getPublicProductListsBySearchTerm(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            email?: string;
            firstName?: string;
            lastName?: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<PublicProductListResult>;
    /**
    * Retrieves all public product lists as defined by the given search term (for example, email OR first name and last name). This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param email - The email address of the customer the product lists belong to.
    * @param firstName - The first name of the customer the product lists belong to.
    * @param lastName - The last name of the customer the product lists belong to.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type PublicProductListResult otherwise.
    *
    */
    getPublicProductListsBySearchTerm<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            email?: string;
            firstName?: string;
            lastName?: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : PublicProductListResult>;
    /**
    * Retrieves a public product list by ID and the items under that product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * If you would like to get a raw Response object use the other getPublicProductList function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param listId - The ID of the list.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type PublicProductList.
    *
    */
    getPublicProductList(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            listId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<PublicProductList>;
    /**
    * Retrieves a public product list by ID and the items under that product list. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param listId - The ID of the list.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type PublicProductList otherwise.
    *
    */
    getPublicProductList<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            listId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : PublicProductList>;
    /**
    * Retrieves an item from a public product list and the actual product details like product, image, availability and price. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * If you would like to get a raw Response object use the other getProductListItem function.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param listId - The ID of the list.
    * @param itemId - The ID of the item.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    *
    * @returns A promise of type PublicProductListItem.
    *
    */
    getProductListItem(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            listId: string;
            itemId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>): Promise<PublicProductListItem>;
    /**
    * Retrieves an item from a public product list and the actual product details like product, image, availability and price. This endpoint accepts a registered customer ShopperToken (JWT) or a guest customer ShopperToken.
    *
    * @param options - An object containing the options for this method.
    * @param parameters - An object containing the parameters for this method.
    * @param organizationId -
    * @param listId - The ID of the list.
    * @param itemId - The ID of the item.
    * @param siteId -
    * @param headers - An object literal of key value pairs of the headers to be
    * sent with this request.
    * @param rawResponse - Set to true to return entire Response object instead of DTO.
    * @returns A promise of type Response if rawResponse is true, a promise of type PublicProductListItem otherwise.
    *
    */
    getProductListItem<T extends boolean>(options?: RequireParametersUnlessAllAreOptional<{
        parameters?: CompositeParameters<{
            organizationId: string;
            listId: string;
            itemId: string;
            siteId: string;
        } & {
            [key in `c_${string}`]: any;
        }, ConfigParameters>;
        headers?: {
            [key: string]: string;
        };
    }>, rawResponse?: T): Promise<T extends true ? Response : PublicProductListItem>;
}

type shopperCustomers_AttributeDefinition = AttributeDefinition;
type shopperCustomers_AuthRequest = AuthRequest;
type shopperCustomers_Basket = Basket;
type shopperCustomers_BasketsResult = BasketsResult;
type shopperCustomers_BonusDiscountLineItem = BonusDiscountLineItem;
type shopperCustomers_BoolFilter = BoolFilter;
type shopperCustomers_BoolQuery = BoolQuery;
type shopperCustomers_BundledProduct = BundledProduct;
type shopperCustomers_ChangeControlled = ChangeControlled;
type shopperCustomers_ChangeControlledDataType = ChangeControlledDataType;
type shopperCustomers_ClosedObject = ClosedObject;
type shopperCustomers_CouponItem = CouponItem;
type shopperCustomers_Customer = Customer;
type shopperCustomers_CustomerAddress = CustomerAddress;
type shopperCustomers_CustomerAddressInfo = CustomerAddressInfo;
type shopperCustomers_CustomerExtProfileRequest = CustomerExtProfileRequest;
type shopperCustomers_CustomerExternalProfile = CustomerExternalProfile;
type shopperCustomers_CustomerInfo = CustomerInfo;
type shopperCustomers_CustomerOrderResult = CustomerOrderResult;
type shopperCustomers_CustomerPaymentCardRequest = CustomerPaymentCardRequest;
type shopperCustomers_CustomerPaymentInstrument = CustomerPaymentInstrument;
type shopperCustomers_CustomerPaymentInstrumentRequest = CustomerPaymentInstrumentRequest;
type shopperCustomers_CustomerProductList = CustomerProductList;
type shopperCustomers_CustomerProductListItem = CustomerProductListItem;
type shopperCustomers_CustomerProductListItemPurchase = CustomerProductListItemPurchase;
type shopperCustomers_CustomerProductListRegistrant = CustomerProductListRegistrant;
type shopperCustomers_CustomerProductListResult = CustomerProductListResult;
type shopperCustomers_CustomerRegistration = CustomerRegistration;
type shopperCustomers_Discount = Discount;
type shopperCustomers_Error = Error;
type shopperCustomers_ErrorResponse = ErrorResponse;
type shopperCustomers_Filter = Filter;
type shopperCustomers_FilteredQuery = FilteredQuery;
type shopperCustomers_GiftCertificateItem = GiftCertificateItem;
type shopperCustomers_GroupedTaxItem = GroupedTaxItem;
type shopperCustomers_Image = Image;
type shopperCustomers_ImageGroup = ImageGroup;
type shopperCustomers_Inventory = Inventory;
type shopperCustomers_L10nString = L10nString;
type shopperCustomers_LocalizedString = LocalizedString;
type shopperCustomers_Master = Master;
type shopperCustomers_MatchAllQuery = MatchAllQuery;
type shopperCustomers_Money = Money;
type shopperCustomers_MoneyMnemonic = MoneyMnemonic;
type shopperCustomers_NestedQuery = NestedQuery;
type shopperCustomers_NoPropertiesAllowed = NoPropertiesAllowed;
type shopperCustomers_OpenObject = OpenObject;
type shopperCustomers_Option = Option;
type shopperCustomers_OptionItem = OptionItem;
type shopperCustomers_OptionValue = OptionValue;
type shopperCustomers_Order = Order;
type shopperCustomers_OrderAddress = OrderAddress;
type shopperCustomers_OrderPaymentInstrument = OrderPaymentInstrument;
type shopperCustomers_PaginatedSearchResult = PaginatedSearchResult;
type shopperCustomers_PaginatedSearchResultBase = PaginatedSearchResultBase;
type shopperCustomers_PasswordChangeRequest = PasswordChangeRequest;
type shopperCustomers_PaymentBankAccount = PaymentBankAccount;
type shopperCustomers_PaymentBankAccountRequest = PaymentBankAccountRequest;
type shopperCustomers_PaymentCard = PaymentCard;
type shopperCustomers_PriceAdjustment = PriceAdjustment;
type shopperCustomers_Product = Product;
type shopperCustomers_ProductDetailsLink = ProductDetailsLink;
type shopperCustomers_ProductItem = ProductItem;
type shopperCustomers_ProductLink = ProductLink;
type shopperCustomers_ProductListEvent = ProductListEvent;
type shopperCustomers_ProductListItemReference = ProductListItemReference;
type shopperCustomers_ProductListLink = ProductListLink;
type shopperCustomers_ProductListRegistrant = ProductListRegistrant;
type shopperCustomers_ProductListShippingAddress = ProductListShippingAddress;
type shopperCustomers_ProductPromotion = ProductPromotion;
type shopperCustomers_ProductType = ProductType;
type shopperCustomers_PropertyDefinition = PropertyDefinition;
type shopperCustomers_PropertyValueDefinition = PropertyValueDefinition;
type shopperCustomers_PublicProductList = PublicProductList;
type shopperCustomers_PublicProductListInfo = PublicProductListInfo;
type shopperCustomers_PublicProductListItem = PublicProductListItem;
type shopperCustomers_PublicProductListResult = PublicProductListResult;
type shopperCustomers_Query = Query;
type shopperCustomers_QueryFilter = QueryFilter;
type shopperCustomers_Range2Filter = Range2Filter;
type shopperCustomers_Recommendation = Recommendation;
type shopperCustomers_RecommendationType = RecommendationType;
type shopperCustomers_ResetPasswordRequest = ResetPasswordRequest;
type shopperCustomers_ResetPasswordToken = ResetPasswordToken;
type shopperCustomers_ResetPasswordTokenRequest = ResetPasswordTokenRequest;
type shopperCustomers_SearchRequest = SearchRequest;
type shopperCustomers_SearchRequestBase = SearchRequestBase;
type shopperCustomers_Shipment = Shipment;
type shopperCustomers_ShippingItem = ShippingItem;
type shopperCustomers_ShippingMethod = ShippingMethod;
type shopperCustomers_ShippingPromotion = ShippingPromotion;
type shopperCustomers_ShopperCustomers<ConfigParameters extends ShopperCustomersParameters & Record<string, unknown>> = ShopperCustomers<ConfigParameters>;
declare const shopperCustomers_ShopperCustomers: typeof ShopperCustomers;
type shopperCustomers_ShopperCustomersParameters = ShopperCustomersParameters;
type shopperCustomers_ShopperCustomersPathParameters = ShopperCustomersPathParameters;
type shopperCustomers_ShopperCustomersQueryParameters = ShopperCustomersQueryParameters;
type shopperCustomers_SimpleLink = SimpleLink;
type shopperCustomers_SimpleSearchResult = SimpleSearchResult;
type shopperCustomers_SimpleSearchResultBase = SimpleSearchResultBase;
type shopperCustomers_Sort = Sort;
type shopperCustomers_SpecifiedPropertiesAllowed = SpecifiedPropertiesAllowed;
type shopperCustomers_Status = Status;
type shopperCustomers_TermFilter = TermFilter;
type shopperCustomers_TermQuery = TermQuery;
type shopperCustomers_TextQuery = TextQuery;
type shopperCustomers_TrustedSystemAuthRequest = TrustedSystemAuthRequest;
type shopperCustomers_Variant = Variant;
type shopperCustomers_VariationAttribute = VariationAttribute;
type shopperCustomers_VariationAttributeValue = VariationAttributeValue;
type shopperCustomers_VariationGroup = VariationGroup;
declare namespace shopperCustomers {
  export { type shopperCustomers_AttributeDefinition as AttributeDefinition, type shopperCustomers_AuthRequest as AuthRequest, type shopperCustomers_Basket as Basket, type shopperCustomers_BasketsResult as BasketsResult, type shopperCustomers_BonusDiscountLineItem as BonusDiscountLineItem, type shopperCustomers_BoolFilter as BoolFilter, type shopperCustomers_BoolQuery as BoolQuery, type shopperCustomers_BundledProduct as BundledProduct, type shopperCustomers_ChangeControlled as ChangeControlled, type shopperCustomers_ChangeControlledDataType as ChangeControlledDataType, type shopperCustomers_ClosedObject as ClosedObject, type shopperCustomers_CouponItem as CouponItem, type shopperCustomers_Customer as Customer, type shopperCustomers_CustomerAddress as CustomerAddress, type shopperCustomers_CustomerAddressInfo as CustomerAddressInfo, type shopperCustomers_CustomerExtProfileRequest as CustomerExtProfileRequest, type shopperCustomers_CustomerExternalProfile as CustomerExternalProfile, type shopperCustomers_CustomerInfo as CustomerInfo, type shopperCustomers_CustomerOrderResult as CustomerOrderResult, type shopperCustomers_CustomerPaymentCardRequest as CustomerPaymentCardRequest, type shopperCustomers_CustomerPaymentInstrument as CustomerPaymentInstrument, type shopperCustomers_CustomerPaymentInstrumentRequest as CustomerPaymentInstrumentRequest, type shopperCustomers_CustomerProductList as CustomerProductList, type shopperCustomers_CustomerProductListItem as CustomerProductListItem, type shopperCustomers_CustomerProductListItemPurchase as CustomerProductListItemPurchase, type shopperCustomers_CustomerProductListRegistrant as CustomerProductListRegistrant, type shopperCustomers_CustomerProductListResult as CustomerProductListResult, type shopperCustomers_CustomerRegistration as CustomerRegistration, type shopperCustomers_Discount as Discount, type shopperCustomers_Error as Error, type shopperCustomers_ErrorResponse as ErrorResponse, type shopperCustomers_Filter as Filter, type shopperCustomers_FilteredQuery as FilteredQuery, type shopperCustomers_GiftCertificateItem as GiftCertificateItem, type shopperCustomers_GroupedTaxItem as GroupedTaxItem, type shopperCustomers_Image as Image, type shopperCustomers_ImageGroup as ImageGroup, type shopperCustomers_Inventory as Inventory, type shopperCustomers_L10nString as L10nString, type shopperCustomers_LocalizedString as LocalizedString, type shopperCustomers_Master as Master, type shopperCustomers_MatchAllQuery as MatchAllQuery, type shopperCustomers_Money as Money, type shopperCustomers_MoneyMnemonic as MoneyMnemonic, type shopperCustomers_NestedQuery as NestedQuery, type shopperCustomers_NoPropertiesAllowed as NoPropertiesAllowed, type shopperCustomers_OpenObject as OpenObject, type shopperCustomers_Option as Option, type shopperCustomers_OptionItem as OptionItem, type shopperCustomers_OptionValue as OptionValue, type shopperCustomers_Order as Order, type shopperCustomers_OrderAddress as OrderAddress, type shopperCustomers_OrderPaymentInstrument as OrderPaymentInstrument, type shopperCustomers_PaginatedSearchResult as PaginatedSearchResult, type shopperCustomers_PaginatedSearchResultBase as PaginatedSearchResultBase, type shopperCustomers_PasswordChangeRequest as PasswordChangeRequest, type shopperCustomers_PaymentBankAccount as PaymentBankAccount, type shopperCustomers_PaymentBankAccountRequest as PaymentBankAccountRequest, type shopperCustomers_PaymentCard as PaymentCard, type shopperCustomers_PriceAdjustment as PriceAdjustment, type shopperCustomers_Product as Product, type shopperCustomers_ProductDetailsLink as ProductDetailsLink, type shopperCustomers_ProductItem as ProductItem, type shopperCustomers_ProductLink as ProductLink, type shopperCustomers_ProductListEvent as ProductListEvent, type shopperCustomers_ProductListItemReference as ProductListItemReference, type shopperCustomers_ProductListLink as ProductListLink, type shopperCustomers_ProductListRegistrant as ProductListRegistrant, type shopperCustomers_ProductListShippingAddress as ProductListShippingAddress, type shopperCustomers_ProductPromotion as ProductPromotion, type shopperCustomers_ProductType as ProductType, type shopperCustomers_PropertyDefinition as PropertyDefinition, type shopperCustomers_PropertyValueDefinition as PropertyValueDefinition, type shopperCustomers_PublicProductList as PublicProductList, type shopperCustomers_PublicProductListInfo as PublicProductListInfo, type shopperCustomers_PublicProductListItem as PublicProductListItem, type shopperCustomers_PublicProductListResult as PublicProductListResult, type shopperCustomers_Query as Query, type shopperCustomers_QueryFilter as QueryFilter, type shopperCustomers_Range2Filter as Range2Filter, type shopperCustomers_Recommendation as Recommendation, type shopperCustomers_RecommendationType as RecommendationType, type shopperCustomers_ResetPasswordRequest as ResetPasswordRequest, type shopperCustomers_ResetPasswordToken as ResetPasswordToken, type shopperCustomers_ResetPasswordTokenRequest as ResetPasswordTokenRequest, type shopperCustomers_SearchRequest as SearchRequest, type shopperCustomers_SearchRequestBase as SearchRequestBase, type shopperCustomers_Shipment as Shipment, type shopperCustomers_ShippingItem as ShippingItem, type shopperCustomers_ShippingMethod as ShippingMethod, type shopperCustomers_ShippingPromotion as ShippingPromotion, shopperCustomers_ShopperCustomers as ShopperCustomers, type shopperCustomers_ShopperCustomersParameters as ShopperCustomersParameters, type shopperCustomers_ShopperCustomersPathParameters as ShopperCustomersPathParameters, type shopperCustomers_ShopperCustomersQueryParameters as ShopperCustomersQueryParameters, type shopperCustomers_SimpleLink as SimpleLink, type shopperCustomers_SimpleSearchResult as SimpleSearchResult, type shopperCustomers_SimpleSearchResultBase as SimpleSearchResultBase, type shopperCustomers_Sort as Sort, type shopperCustomers_SpecifiedPropertiesAllowed as SpecifiedPropertiesAllowed, type shopperCustomers_Status as Status, type shopperCustomers_TermFilter as TermFilter, type shopperCustomers_TermQuery as TermQuery, type shopperCustomers_TextQuery as TextQuery, type shopperCustomers_TrustedSystemAuthRequest as TrustedSystemAuthRequest, type shopperCustomers_Variant as Variant, type shopperCustomers_VariationAttribute as VariationAttribute, type shopperCustomers_VariationAttributeValue as VariationAttributeValue, type shopperCustomers_VariationGroup as VariationGroup };
}

export { type PublicProductList as $, type PaymentBankAccountRequest as A, type BasketsResult as B, type CustomerAddress as C, type Discount as D, type PriceAdjustment as E, type PublicProductListItem as F, type ProductDetailsLink as G, type ProductLink as H, type OptionItem as I, type ShippingMethod as J, type ProductListEvent as K, type PasswordChangeRequest as L, type Master as M, type AuthRequest as N, type OptionValue as O, type PublicProductListResult as P, type Inventory as Q, type ResetPasswordRequest as R, ShopperCustomers as S, type TrustedSystemAuthRequest as T, type CustomerProductList as U, type VariationAttribute as V, type Basket as W, type CustomerPaymentInstrumentRequest as X, type ImageGroup as Y, type CustomerRegistration as Z, type Customer as _, type CustomerProductListResult as a, type Option as a0, type CustomerOrderResult as a1, type CustomerExtProfileRequest as a2, type GiftCertificateItem as a3, type CustomerExternalProfile as a4, type CustomerAddressInfo as a5, type ResetPasswordTokenRequest as a6, type ProductListLink as a7, type GroupedTaxItem as a8, type ProductListRegistrant as a9, type FilteredQuery as aA, type QueryFilter as aB, type Query as aC, type TermQuery as aD, type TermFilter as aE, type TextQuery as aF, type Range2Filter as aG, type BoolQuery as aH, type SimpleSearchResultBase as aI, type NestedQuery as aJ, type Filter as aK, type Sort as aL, type SearchRequestBase as aM, type MoneyMnemonic as aN, type L10nString as aO, type AttributeDefinition as aP, type PropertyValueDefinition as aQ, type ShopperCustomersPathParameters as aR, type ShopperCustomersQueryParameters as aS, type ShopperCustomersParameters as aT, type Order as aa, type Product as ab, type Image as ac, type VariationAttributeValue as ad, type ProductPromotion as ae, type BundledProduct as af, type Status as ag, type CustomerProductListItem as ah, type ProductListItemReference as ai, type ErrorResponse as aj, type ChangeControlled as ak, type ChangeControlledDataType as al, type Error as am, type Money as an, type SimpleSearchResult as ao, type SearchRequest as ap, type PropertyDefinition as aq, type LocalizedString as ar, type PaginatedSearchResult as as, type ClosedObject as at, type OpenObject as au, type NoPropertiesAllowed as av, type SpecifiedPropertiesAllowed as aw, type BoolFilter as ax, type PaginatedSearchResultBase as ay, type MatchAllQuery as az, type CustomerProductListItemPurchase as b, type OrderAddress as c, type PaymentCard as d, type ShippingItem as e, type ResetPasswordToken as f, type CouponItem as g, type ShippingPromotion as h, type ProductListShippingAddress as i, type ProductItem as j, type CustomerProductListRegistrant as k, type PublicProductListInfo as l, type CustomerPaymentCardRequest as m, type RecommendationType as n, type OrderPaymentInstrument as o, type ProductType as p, type PaymentBankAccount as q, type Recommendation as r, shopperCustomers as s, type Variant as t, type BonusDiscountLineItem as u, type CustomerPaymentInstrument as v, type Shipment as w, type CustomerInfo as x, type VariationGroup as y, type SimpleLink as z };

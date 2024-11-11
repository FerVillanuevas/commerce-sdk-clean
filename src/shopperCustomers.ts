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

export type CustomerAddress = {
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
} & { [key: string]: any }

  export type CustomerProductListResult = {
  limit: number;
  data: Array<CustomerProductList>;
  total: number;
} & { [key: string]: any }

  export type CustomerProductListItemPurchase = {
  id: string;
  orderNo: string;
  productListItemId: string;
  purchaserName: string;
  quantity: number;
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

  export type OrderAddress = {
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
} & { [key: string]: any }

  export type PublicProductListResult = {
  limit: number;
  data: Array<PublicProductListInfo>;
  total: number;
} & { [key: string]: any }

  export type BasketsResult = {
  baskets?: Array<Basket>;
  total: number;
} & { [key: string]: any }

  export type TrustedSystemAuthRequest = {
  clientId: string;
  login: string;
} & { [key: string]: any }

  export type ResetPasswordRequest = {
  resetToken: string;
  login: string;
  newPassword: string;
} & { [key: string]: any }

  export type PaymentCard = {
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
} & { [key: string]: any }

  export type ShippingItem = {
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
} & { [key: string]: any }

  export type Discount = {
  amount?: number;
  percentage?: number;
  priceBookId?: string;
  type: string;
} & { [key: string]: any }

  export type ResetPasswordToken = {
  login: string;
  email: string;
  resetToken: string;
  expiresInMinutes: number;
} & { [key: string]: any }

  export type CouponItem = {
  code: string;
  couponItemId?: string;
  statusCode?: string;
  valid?: boolean;
} & { [key: string]: any }

  export type ShippingPromotion = {
  calloutMsg: string;
  promotionId: string;
  promotionName: string;
} & { [key: string]: any }

  export type VariationAttribute = {
  id: string;
  name?: string;
  values?: Array<VariationAttributeValue>;
} & { [key: string]: any }

  export type ProductListShippingAddress = {
  addressId: string;
  city?: string;
  firstName?: string;
  lastName?: string;
} & { [key: string]: any }

  export type ProductItem = {
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
} & { [key: string]: any }

  export type CustomerProductListRegistrant = {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
} & { [key: string]: any }

  export type PublicProductListInfo = {
  description?: string;
  id: string;
  name?: string;
  title: string;
  type: string;
} & { [key: string]: any }

  export type CustomerPaymentCardRequest = {
  cardType: string;
  creditCardToken?: string;
  expirationMonth: number;
  expirationYear: number;
  holder: string;
  issueNumber: string;
  number: string;
  validFromMonth: number;
  validFromYear: number;
} & { [key: string]: any }

  export type RecommendationType = {
  displayValue: string;
  value: number;
} & { [key: string]: any }

  export type OrderPaymentInstrument = {
  amount: number;
  authorizationStatus: Status;
  bankRoutingNumber: string;
  maskedGiftCertificateCode: string;
  paymentBankAccount: PaymentBankAccount;
  paymentCard: PaymentCard;
  paymentInstrumentId: string;
  paymentMethodId: string;
} & { [key: string]: any }

  export type ProductType = {
  bundle: boolean;
  item: boolean;
  master: boolean;
  option: boolean;
  set: boolean;
  variant: boolean;
  variationGroup: boolean;
} & { [key: string]: any }

  export type PaymentBankAccount = {
  driversLicenseLastDigits?: string;
  driversLicenseStateCode?: string;
  holder?: string;
  maskedDriversLicense?: string;
  maskedNumber?: string;
  numberLastDigits?: string;
} & { [key: string]: any }

  export type Recommendation = {
  calloutMsg?: string;
  image?: Image;
  longDescription?: string;
  name?: string;
  recommendationType: RecommendationType;
  recommendedItemId?: string;
  recommendedItemLink?: string;
  shortDescription?: string;
} & { [key: string]: any }

  export type Variant = {
  orderable?: boolean;
  price?: number;
  productId: string;
  variationValues?: {
} & { [key: string]: any }
;
} & { [key: string]: any }

  export type BonusDiscountLineItem = {
  bonusProducts: Array<ProductDetailsLink>;
  couponCode: string;
  id: string;
  maxBonusItems: number;
  promotionId: string;
} & { [key: string]: any }

  export type CustomerPaymentInstrument = {
  bankRoutingNumber?: string;
  creationDate?: any;
  lastModified?: any;
  maskedGiftCertificateCode?: string;
  paymentBankAccount?: PaymentBankAccount;
  paymentCard?: PaymentCard;
  paymentInstrumentId?: string;
  paymentMethodId?: string;
} & { [key: string]: any }

  export type Shipment = {
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
} & { [key: string]: any }

  export type CustomerInfo = {
  customerId?: string;
  customerName?: string;
  customerNo: string;
  email: string;
} & { [key: string]: any }

  export type VariationGroup = {
  orderable: boolean;
  price: number;
  productId: string;
  variationValues: {
} & { [key: string]: any }
;
} & { [key: string]: any }

  export type SimpleLink = {
  link: string;
} & { [key: string]: any }

  export type PaymentBankAccountRequest = {
  driversLicense: string;
  driversLicenseStateCode: string;
  holder: string;
  number: string;
} & { [key: string]: any }

  export type PriceAdjustment = {
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
} & { [key: string]: any }

  export type PublicProductListItem = {
  id: string;
  priority: number;
  product?: Product;
  type: string;
} & { [key: string]: any }

  export type ProductDetailsLink = {
  productDescription?: string;
  productId: string;
  productName?: string;
  title?: string;
} & { [key: string]: any }

  export type ProductLink = {
  sourceProductId: string;
  sourceProductLink: string;
  targetProductId: string;
  targetProductLink: string;
  type: string;
} & { [key: string]: any }

  export type OptionItem = {
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
} & { [key: string]: any }

  export type ShippingMethod = {
  description?: string;
  externalShippingMethod?: string;
  id: string;
  name?: string;
  price?: number;
  shippingPromotions?: Array<ShippingPromotion>;
} & { [key: string]: any }

  export type ProductListEvent = {
  city?: string;
  country?: string;
  date?: any;
  state?: string;
  type: string;
} & { [key: string]: any }

  export type PasswordChangeRequest = {
  currentPassword: string;
  password: string;
} & { [key: string]: any }

  export type AuthRequest = {
  type?: string;
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

  export type CustomerProductList = {
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
} & { [key: string]: any }

  export type Basket = {
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
} & { [key: string]: any }

  export type CustomerPaymentInstrumentRequest = {
  bankRoutingNumber?: string;
  giftCertificateCode?: string;
  paymentBankAccount?: PaymentBankAccountRequest;
  paymentCard?: CustomerPaymentCardRequest;
  paymentMethodId?: string;
} & { [key: string]: any }

  export type ImageGroup = {
  images: Array<Image>;
  variationAttributes?: Array<VariationAttribute>;
  viewType: string;
} & { [key: string]: any }

  export type CustomerRegistration = {
  customer: Customer;
  password: string;
} & { [key: string]: any }

  export type Customer = {
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
} & { [key: string]: any }

  export type PublicProductList = {
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
} & { [key: string]: any }

  export type Option = {
  description?: string;
  id: string;
  image?: string;
  name?: string;
  values?: Array<OptionValue>;
} & { [key: string]: any }

  export type CustomerOrderResult = {
  limit: number;
  data: Array<Order>;
  offset: number;
  total: number;
} & { [key: string]: any }

  export type CustomerExtProfileRequest = {
  authenticationProviderId: string;
  email?: string;
  externalId: string;
  firstName?: string;
  lastName?: string;
} & { [key: string]: any }

  export type GiftCertificateItem = {
  amount: number;
  giftCertificateItemId?: string;
  message?: string;
  recipientEmail: string;
  recipientName?: string;
  senderName?: string;
  shipmentId?: string;
} & { [key: string]: any }

  export type CustomerExternalProfile = {
  customerId: string;
  authenticationProviderId: string;
  email?: string;
  externalId: string;
  firstName?: string;
  lastName?: string;
} & { [key: string]: any }

  export type CustomerAddressInfo = {
  addressId: string;
  title: string;
} & { [key: string]: any }

  export type ResetPasswordTokenRequest = {
  login: string;
} & { [key: string]: any }

  export type ProductListLink = {
  description: string;
  link: string;
  name: string;
  public: boolean;
  title: string;
  type: string;
} & { [key: string]: any }

  export type GroupedTaxItem = {
  taxRate?: number;
  taxValue?: number;
}
  export type ProductListRegistrant = {
  firstName: string;
  lastName: string;
  role: string;
} & { [key: string]: any }

  export type Order = {
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
  priceMax?: number;
  prices?: {
} & { [key: string]: any }
;
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

  export type BundledProduct = {
  id: string;
  product: Product;
  quantity: number;
} & { [key: string]: any }

  export type Status = {
  code: string;
  message: string;
  status: number;
} & { [key: string]: any }

  export type CustomerProductListItem = {
  id?: string;
  priority: number;
  product?: Product;
  productId?: string;
  public: boolean;
  purchasedQuantity?: number;
  quantity: number;
  type?: string;
} & { [key: string]: any }

  export type ProductListItemReference = {
  id: string;
  priority?: number;
  productList?: ProductListLink;
  public?: boolean;
  purchasedQuantity?: number;
  quantity?: number;
  type?: string;
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

  type CustomerAuthenticationFailed = { [key: string]: any }
type NotFound = { [key: string]: any }
type BadRequest = { [key: string]: any }
type CustomerExtProfileNotFound = { [key: string]: any }
type Unauthorized = { [key: string]: any }
type CustomerExtProfileBadRequest = { [key: string]: any }
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
 * All path parameters that are used by at least one ShopperCustomers method.
 */
export type ShopperCustomersPathParameters = {
  organizationId?: string;
  customerId?: string;
  addressName?: string;
  paymentInstrumentId?: string;
  listId?: string;
  itemId?: string;
}
/**
 * All query parameters that are used by at least one ShopperCustomers method.
 */
export type ShopperCustomersQueryParameters = {
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
}

/**
 * All parameters that are used by ShopperCustomers.
 */
export type ShopperCustomersParameters = ShopperCustomersPathParameters & BaseUriParameters & ShopperCustomersQueryParameters;

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
export class ShopperCustomers<ConfigParameters extends ShopperCustomersParameters & Record<string, unknown>> {
  // baseUri is not required on ClientConfig, but we know that we provide one in the class constructor
  public clientConfig: ClientConfig<ConfigParameters> & { baseUri: string };

  static readonly defaultBaseUri = "https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/{version}";

  static readonly apiPaths = {
    registerCustomer: "/organizations/{organizationId}/customers",
    resetPassword: "/organizations/{organizationId}/customers/password/actions/reset",
    getResetPasswordToken: "/organizations/{organizationId}/customers/password/actions/create-reset-token",
    registerExternalProfile: "/organizations/{organizationId}/customers/external-profile",
    getExternalProfile: "/organizations/{organizationId}/customers/external-profile",
    getCustomer: "/organizations/{organizationId}/customers/{customerId}",
    updateCustomer: "/organizations/{organizationId}/customers/{customerId}",
    createCustomerAddress: "/organizations/{organizationId}/customers/{customerId}/addresses",
    getCustomerAddress: "/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}",
    removeCustomerAddress: "/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}",
    updateCustomerAddress: "/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}",
    getCustomerBaskets: "/organizations/{organizationId}/customers/{customerId}/baskets",
    getCustomerOrders: "/organizations/{organizationId}/customers/{customerId}/orders",
    updateCustomerPassword: "/organizations/{organizationId}/customers/{customerId}/password",
    createCustomerPaymentInstrument: "/organizations/{organizationId}/customers/{customerId}/payment-instruments",
    deleteCustomerPaymentInstrument: "/organizations/{organizationId}/customers/{customerId}/payment-instruments/{paymentInstrumentId}",
    getCustomerPaymentInstrument: "/organizations/{organizationId}/customers/{customerId}/payment-instruments/{paymentInstrumentId}",
    getCustomerProductLists: "/organizations/{organizationId}/customers/{customerId}/product-lists",
    createCustomerProductList: "/organizations/{organizationId}/customers/{customerId}/product-lists",
    deleteCustomerProductList: "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}",
    getCustomerProductList: "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}",
    updateCustomerProductList: "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}",
    createCustomerProductListItem: "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items",
    deleteCustomerProductListItem: "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items/{itemId}",
    getCustomerProductListItem: "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items/{itemId}",
    updateCustomerProductListItem: "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items/{itemId}",
    getPublicProductListsBySearchTerm: "/organizations/{organizationId}/product-lists",
    getPublicProductList: "/organizations/{organizationId}/product-lists/{listId}",
    getProductListItem: "/organizations/{organizationId}/product-lists/{listId}/items/{itemId}",
  };

  constructor(config: ClientConfigInit<ConfigParameters>) {
    const cfg = {...config}
    if (!cfg.baseUri) cfg.baseUri = new.target.defaultBaseUri;
    // Type assertion is safe because ^^^
    this.clientConfig = new ClientConfig(cfg) as ClientConfig<ConfigParameters> & { baseUri: string };
  }

  static readonly paramKeys = {
    registerCustomer: [
      'organizationId',
      'siteId',
    ],
    registerCustomerRequired: [
      'organizationId',
      'siteId',
    ],
    resetPassword: [
      'organizationId',
      'siteId',
    ],
    resetPasswordRequired: [
      'organizationId',
      'siteId',
    ],
    getResetPasswordToken: [
      'organizationId',
      'siteId',
    ],
    getResetPasswordTokenRequired: [
      'organizationId',
      'siteId',
    ],
    registerExternalProfile: [
      'organizationId',
      'siteId',
    ],
    registerExternalProfileRequired: [
      'organizationId',
      'siteId',
    ],
    getExternalProfile: [
      'organizationId',
      'externalId',
      'authenticationProviderId',
      'siteId',
    ],
    getExternalProfileRequired: [
      'organizationId',
      'externalId',
      'authenticationProviderId',
      'siteId',
    ],
    getCustomer: [
      'organizationId',
      'customerId',
      'siteId',
    ],
    getCustomerRequired: [
      'organizationId',
      'customerId',
      'siteId',
    ],
    updateCustomer: [
      'organizationId',
      'customerId',
      'siteId',
    ],
    updateCustomerRequired: [
      'organizationId',
      'customerId',
      'siteId',
    ],
    createCustomerAddress: [
      'organizationId',
      'customerId',
      'siteId',
    ],
    createCustomerAddressRequired: [
      'organizationId',
      'customerId',
      'siteId',
    ],
    getCustomerAddress: [
      'organizationId',
      'customerId',
      'addressName',
      'siteId',
    ],
    getCustomerAddressRequired: [
      'organizationId',
      'customerId',
      'addressName',
      'siteId',
    ],
    removeCustomerAddress: [
      'organizationId',
      'customerId',
      'addressName',
      'siteId',
    ],
    removeCustomerAddressRequired: [
      'organizationId',
      'customerId',
      'addressName',
      'siteId',
    ],
    updateCustomerAddress: [
      'organizationId',
      'customerId',
      'addressName',
      'siteId',
    ],
    updateCustomerAddressRequired: [
      'organizationId',
      'customerId',
      'addressName',
      'siteId',
    ],
    getCustomerBaskets: [
      'organizationId',
      'customerId',
      'siteId',
    ],
    getCustomerBasketsRequired: [
      'organizationId',
      'customerId',
      'siteId',
    ],
    getCustomerOrders: [
      'organizationId',
      'customerId',
      'crossSites',
      'from',
      'until',
      'status',
      'siteId',
      'offset',
      'limit',
    ],
    getCustomerOrdersRequired: [
      'organizationId',
      'customerId',
      'siteId',
    ],
    updateCustomerPassword: [
      'organizationId',
      'customerId',
      'siteId',
    ],
    updateCustomerPasswordRequired: [
      'organizationId',
      'customerId',
      'siteId',
    ],
    createCustomerPaymentInstrument: [
      'organizationId',
      'customerId',
      'siteId',
    ],
    createCustomerPaymentInstrumentRequired: [
      'organizationId',
      'customerId',
      'siteId',
    ],
    deleteCustomerPaymentInstrument: [
      'organizationId',
      'customerId',
      'paymentInstrumentId',
      'siteId',
    ],
    deleteCustomerPaymentInstrumentRequired: [
      'organizationId',
      'customerId',
      'paymentInstrumentId',
      'siteId',
    ],
    getCustomerPaymentInstrument: [
      'organizationId',
      'customerId',
      'paymentInstrumentId',
      'siteId',
    ],
    getCustomerPaymentInstrumentRequired: [
      'organizationId',
      'customerId',
      'paymentInstrumentId',
      'siteId',
    ],
    getCustomerProductLists: [
      'organizationId',
      'customerId',
      'siteId',
    ],
    getCustomerProductListsRequired: [
      'organizationId',
      'customerId',
      'siteId',
    ],
    createCustomerProductList: [
      'organizationId',
      'customerId',
      'siteId',
    ],
    createCustomerProductListRequired: [
      'organizationId',
      'customerId',
      'siteId',
    ],
    deleteCustomerProductList: [
      'organizationId',
      'customerId',
      'listId',
      'siteId',
    ],
    deleteCustomerProductListRequired: [
      'organizationId',
      'customerId',
      'listId',
      'siteId',
    ],
    getCustomerProductList: [
      'organizationId',
      'customerId',
      'listId',
      'siteId',
    ],
    getCustomerProductListRequired: [
      'organizationId',
      'customerId',
      'listId',
      'siteId',
    ],
    updateCustomerProductList: [
      'organizationId',
      'customerId',
      'listId',
      'siteId',
    ],
    updateCustomerProductListRequired: [
      'organizationId',
      'customerId',
      'listId',
      'siteId',
    ],
    createCustomerProductListItem: [
      'organizationId',
      'customerId',
      'listId',
      'siteId',
    ],
    createCustomerProductListItemRequired: [
      'organizationId',
      'customerId',
      'listId',
      'siteId',
    ],
    deleteCustomerProductListItem: [
      'organizationId',
      'customerId',
      'listId',
      'itemId',
      'siteId',
    ],
    deleteCustomerProductListItemRequired: [
      'organizationId',
      'customerId',
      'listId',
      'itemId',
      'siteId',
    ],
    getCustomerProductListItem: [
      'organizationId',
      'customerId',
      'listId',
      'itemId',
      'siteId',
    ],
    getCustomerProductListItemRequired: [
      'organizationId',
      'customerId',
      'listId',
      'itemId',
      'siteId',
    ],
    updateCustomerProductListItem: [
      'organizationId',
      'customerId',
      'listId',
      'itemId',
      'siteId',
    ],
    updateCustomerProductListItemRequired: [
      'organizationId',
      'customerId',
      'listId',
      'itemId',
      'siteId',
    ],
    getPublicProductListsBySearchTerm: [
      'organizationId',
      'email',
      'firstName',
      'lastName',
      'siteId',
    ],
    getPublicProductListsBySearchTermRequired: [
      'organizationId',
      'siteId',
    ],
    getPublicProductList: [
      'organizationId',
      'listId',
      'siteId',
    ],
    getPublicProductListRequired: [
      'organizationId',
      'listId',
      'siteId',
    ],
    getProductListItem: [
      'organizationId',
      'listId',
      'itemId',
      'siteId',
    ],
    getProductListItemRequired: [
      'organizationId',
      'listId',
      'itemId',
      'siteId',
    ],
  } as const;
  
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
      registerCustomer(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerRegistration
        }>
      ): Promise<Customer>;
  
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
      registerCustomer<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerRegistration
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : Customer>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Customer otherwise.
      * 
      */
      async registerCustomer(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerRegistration
        }>,
        rawResponse?: boolean
      ): Promise<Response | Customer> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for registerCustomer: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
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
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | Customer;
      }
  
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
      resetPassword(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: ResetPasswordRequest
        }>
      ): Promise<void>;
  
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
      resetPassword<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: ResetPasswordRequest
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : void>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
      * 
      */
      async resetPassword(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: ResetPasswordRequest
        }>,
        rawResponse?: boolean
      ): Promise<Response | void> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for resetPassword: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/password/actions/reset",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
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
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        if (rawResponse) {
          return response as Response;
        }
      }
  
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
      getResetPasswordToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: ResetPasswordTokenRequest
        }>
      ): Promise<ResetPasswordToken>;
  
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
      getResetPasswordToken<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: ResetPasswordTokenRequest
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : ResetPasswordToken>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type ResetPasswordToken otherwise.
      * 
      */
      async getResetPasswordToken(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: ResetPasswordTokenRequest
        }>,
        rawResponse?: boolean
      ): Promise<Response | ResetPasswordToken> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for getResetPasswordToken: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/password/actions/create-reset-token",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
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
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | ResetPasswordToken;
      }
  
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
      registerExternalProfile(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerExtProfileRequest
        }>
      ): Promise<CustomerExternalProfile>;
  
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
      registerExternalProfile<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerExtProfileRequest
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : CustomerExternalProfile>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CustomerExternalProfile otherwise.
      * 
      */
      async registerExternalProfile(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerExtProfileRequest
        }>,
        rawResponse?: boolean
      ): Promise<Response | CustomerExternalProfile> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for registerExternalProfile: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/external-profile",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
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
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | CustomerExternalProfile;
      }
  
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
      getExternalProfile(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            externalId: string
            authenticationProviderId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<CustomerExternalProfile>;
  
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
      getExternalProfile<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            externalId: string
            authenticationProviderId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : CustomerExternalProfile>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CustomerExternalProfile otherwise.
      * 
      */
      async getExternalProfile(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            externalId: string
            authenticationProviderId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | CustomerExternalProfile> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["externalId"] !== undefined) {
          queryParams["externalId"] = optionParams["externalId"];
        } else if (configParams["externalId"] !== undefined) {
          queryParams["externalId"] = configParams["externalId"];
        }
        else {
          throw new Error('Missing required query parameter: externalId');
        }
        if (optionParams["authenticationProviderId"] !== undefined) {
          queryParams["authenticationProviderId"] = optionParams["authenticationProviderId"];
        } else if (configParams["authenticationProviderId"] !== undefined) {
          queryParams["authenticationProviderId"] = configParams["authenticationProviderId"];
        }
        else {
          throw new Error('Missing required query parameter: authenticationProviderId');
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
            console.warn(`Invalid Parameter for getExternalProfile: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/external-profile",
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
  
        return response as Response | CustomerExternalProfile;
      }
  
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
      getCustomer(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<Customer>;
  
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
      getCustomer<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : Customer>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Customer otherwise.
      * 
      */
      async getCustomer(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | Customer> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for getCustomer: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}",
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
  
        return response as Response | Customer;
      }
  
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
      updateCustomer(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: Customer
        }>
      ): Promise<Customer>;
  
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
      updateCustomer<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: Customer
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : Customer>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type Customer otherwise.
      * 
      */
      async updateCustomer(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: Customer
        }>,
        rawResponse?: boolean
      ): Promise<Response | Customer> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for updateCustomer: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
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
            method: "PATCH",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | Customer;
      }
  
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
      createCustomerAddress(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerAddress
        }>
      ): Promise<CustomerAddress>;
  
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
      createCustomerAddress<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerAddress
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : CustomerAddress>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CustomerAddress otherwise.
      * 
      */
      async createCustomerAddress(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerAddress
        }>,
        rawResponse?: boolean
      ): Promise<Response | CustomerAddress> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for createCustomerAddress: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/addresses",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
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
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | CustomerAddress;
      }
  
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
      getCustomerAddress(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            addressName: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<CustomerAddress>;
  
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
      getCustomerAddress<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            addressName: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : CustomerAddress>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CustomerAddress otherwise.
      * 
      */
      async getCustomerAddress(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            addressName: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | CustomerAddress> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
        if (optionParams["addressName"] !== undefined) {
          pathParams["addressName"] = optionParams["addressName"];
        } else if (configParams["addressName"] !== undefined) {
          pathParams["addressName"] = configParams["addressName"];
        }
        else {
          throw new Error('Missing required path parameter: addressName');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for getCustomerAddress: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}",
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
  
        return response as Response | CustomerAddress;
      }
  
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
      removeCustomerAddress(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            addressName: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<void>;
  
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
      removeCustomerAddress<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            addressName: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : void>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
      * 
      */
      async removeCustomerAddress(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            addressName: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | void> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
        if (optionParams["addressName"] !== undefined) {
          pathParams["addressName"] = optionParams["addressName"];
        } else if (configParams["addressName"] !== undefined) {
          pathParams["addressName"] = configParams["addressName"];
        }
        else {
          throw new Error('Missing required path parameter: addressName');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for removeCustomerAddress: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}",
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
            method: "DELETE",
            headers,
            
          },
          this.clientConfig,
          rawResponse
        )
  
        if (rawResponse) {
          return response as Response;
        }
      }
  
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
      updateCustomerAddress(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            addressName: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerAddress
        }>
      ): Promise<CustomerAddress>;
  
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
      updateCustomerAddress<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            addressName: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerAddress
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : CustomerAddress>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CustomerAddress otherwise.
      * 
      */
      async updateCustomerAddress(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            addressName: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerAddress
        }>,
        rawResponse?: boolean
      ): Promise<Response | CustomerAddress> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
        if (optionParams["addressName"] !== undefined) {
          pathParams["addressName"] = optionParams["addressName"];
        } else if (configParams["addressName"] !== undefined) {
          pathParams["addressName"] = configParams["addressName"];
        }
        else {
          throw new Error('Missing required path parameter: addressName');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for updateCustomerAddress: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
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
            method: "PATCH",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | CustomerAddress;
      }
  
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
      getCustomerBaskets(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<BasketsResult>;
  
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
      getCustomerBaskets<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : BasketsResult>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type BasketsResult otherwise.
      * 
      */
      async getCustomerBaskets(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | BasketsResult> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for getCustomerBaskets: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/baskets",
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
  
        return response as Response | BasketsResult;
      }
  
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
      getCustomerOrders(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            crossSites?: boolean
            from?: string
            until?: string
            status?: string
            siteId: string
            offset?: any
            limit?: number
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<CustomerOrderResult>;
  
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
      getCustomerOrders<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            crossSites?: boolean
            from?: string
            until?: string
            status?: string
            siteId: string
            offset?: any
            limit?: number
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : CustomerOrderResult>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CustomerOrderResult otherwise.
      * 
      */
      async getCustomerOrders(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            crossSites?: boolean
            from?: string
            until?: string
            status?: string
            siteId: string
            offset?: any
            limit?: number
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | CustomerOrderResult> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["crossSites"] !== undefined) {
          queryParams["crossSites"] = optionParams["crossSites"];
        } else if (configParams["crossSites"] !== undefined) {
          queryParams["crossSites"] = configParams["crossSites"];
        }
        if (optionParams["from"] !== undefined) {
          queryParams["from"] = optionParams["from"];
        } else if (configParams["from"] !== undefined) {
          queryParams["from"] = configParams["from"];
        }
        if (optionParams["until"] !== undefined) {
          queryParams["until"] = optionParams["until"];
        } else if (configParams["until"] !== undefined) {
          queryParams["until"] = configParams["until"];
        }
        if (optionParams["status"] !== undefined) {
          queryParams["status"] = optionParams["status"];
        } else if (configParams["status"] !== undefined) {
          queryParams["status"] = configParams["status"];
        }
        if (optionParams["siteId"] !== undefined) {
          queryParams["siteId"] = optionParams["siteId"];
        } else if (configParams["siteId"] !== undefined) {
          queryParams["siteId"] = configParams["siteId"];
        }
        else {
          throw new Error('Missing required query parameter: siteId');
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
            console.warn(`Invalid Parameter for getCustomerOrders: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/orders",
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
  
        return response as Response | CustomerOrderResult;
      }
  
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
      updateCustomerPassword(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: PasswordChangeRequest
        }>
      ): Promise<void>;
  
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
      updateCustomerPassword<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: PasswordChangeRequest
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : void>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
      * 
      */
      async updateCustomerPassword(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: PasswordChangeRequest
        }>,
        rawResponse?: boolean
      ): Promise<Response | void> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for updateCustomerPassword: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/password",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
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
            method: "PUT",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        if (rawResponse) {
          return response as Response;
        }
      }
  
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
      createCustomerPaymentInstrument(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerPaymentInstrumentRequest
        }>
      ): Promise<CustomerPaymentInstrument>;
  
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
      createCustomerPaymentInstrument<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerPaymentInstrumentRequest
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : CustomerPaymentInstrument>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CustomerPaymentInstrument otherwise.
      * 
      */
      async createCustomerPaymentInstrument(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerPaymentInstrumentRequest
        }>,
        rawResponse?: boolean
      ): Promise<Response | CustomerPaymentInstrument> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for createCustomerPaymentInstrument: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/payment-instruments",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
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
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | CustomerPaymentInstrument;
      }
  
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
      deleteCustomerPaymentInstrument(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            paymentInstrumentId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<void>;
  
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
      deleteCustomerPaymentInstrument<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            paymentInstrumentId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : void>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
      * 
      */
      async deleteCustomerPaymentInstrument(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            paymentInstrumentId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | void> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
        if (optionParams["paymentInstrumentId"] !== undefined) {
          pathParams["paymentInstrumentId"] = optionParams["paymentInstrumentId"];
        } else if (configParams["paymentInstrumentId"] !== undefined) {
          pathParams["paymentInstrumentId"] = configParams["paymentInstrumentId"];
        }
        else {
          throw new Error('Missing required path parameter: paymentInstrumentId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for deleteCustomerPaymentInstrument: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/payment-instruments/{paymentInstrumentId}",
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
            method: "DELETE",
            headers,
            
          },
          this.clientConfig,
          rawResponse
        )
  
        if (rawResponse) {
          return response as Response;
        }
      }
  
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
      getCustomerPaymentInstrument(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            paymentInstrumentId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<CustomerPaymentInstrument>;
  
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
      getCustomerPaymentInstrument<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            paymentInstrumentId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : CustomerPaymentInstrument>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CustomerPaymentInstrument otherwise.
      * 
      */
      async getCustomerPaymentInstrument(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            paymentInstrumentId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | CustomerPaymentInstrument> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
        if (optionParams["paymentInstrumentId"] !== undefined) {
          pathParams["paymentInstrumentId"] = optionParams["paymentInstrumentId"];
        } else if (configParams["paymentInstrumentId"] !== undefined) {
          pathParams["paymentInstrumentId"] = configParams["paymentInstrumentId"];
        }
        else {
          throw new Error('Missing required path parameter: paymentInstrumentId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for getCustomerPaymentInstrument: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/payment-instruments/{paymentInstrumentId}",
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
  
        return response as Response | CustomerPaymentInstrument;
      }
  
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
      getCustomerProductLists(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<CustomerProductListResult>;
  
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
      getCustomerProductLists<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : CustomerProductListResult>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductListResult otherwise.
      * 
      */
      async getCustomerProductLists(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | CustomerProductListResult> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for getCustomerProductLists: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/product-lists",
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
  
        return response as Response | CustomerProductListResult;
      }
  
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
      createCustomerProductList(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerProductList
        }>
      ): Promise<CustomerProductList>;
  
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
      createCustomerProductList<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerProductList
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : CustomerProductList>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductList otherwise.
      * 
      */
      async createCustomerProductList(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerProductList
        }>,
        rawResponse?: boolean
      ): Promise<Response | CustomerProductList> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for createCustomerProductList: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/product-lists",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
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
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | CustomerProductList;
      }
  
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
      deleteCustomerProductList(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<void>;
  
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
      deleteCustomerProductList<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : void>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
      * 
      */
      async deleteCustomerProductList(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | void> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
        if (optionParams["listId"] !== undefined) {
          pathParams["listId"] = optionParams["listId"];
        } else if (configParams["listId"] !== undefined) {
          pathParams["listId"] = configParams["listId"];
        }
        else {
          throw new Error('Missing required path parameter: listId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for deleteCustomerProductList: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}",
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
            method: "DELETE",
            headers,
            
          },
          this.clientConfig,
          rawResponse
        )
  
        if (rawResponse) {
          return response as Response;
        }
      }
  
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
      getCustomerProductList(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<CustomerProductList>;
  
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
      getCustomerProductList<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : CustomerProductList>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductList otherwise.
      * 
      */
      async getCustomerProductList(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | CustomerProductList> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
        if (optionParams["listId"] !== undefined) {
          pathParams["listId"] = optionParams["listId"];
        } else if (configParams["listId"] !== undefined) {
          pathParams["listId"] = configParams["listId"];
        }
        else {
          throw new Error('Missing required path parameter: listId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for getCustomerProductList: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}",
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
  
        return response as Response | CustomerProductList;
      }
  
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
      updateCustomerProductList(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerProductList
        }>
      ): Promise<CustomerProductList>;
  
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
      updateCustomerProductList<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerProductList
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : CustomerProductList>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductList otherwise.
      * 
      */
      async updateCustomerProductList(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerProductList
        }>,
        rawResponse?: boolean
      ): Promise<Response | CustomerProductList> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
        if (optionParams["listId"] !== undefined) {
          pathParams["listId"] = optionParams["listId"];
        } else if (configParams["listId"] !== undefined) {
          pathParams["listId"] = configParams["listId"];
        }
        else {
          throw new Error('Missing required path parameter: listId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for updateCustomerProductList: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
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
            method: "PATCH",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | CustomerProductList;
      }
  
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
      createCustomerProductListItem(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerProductListItem
        }>
      ): Promise<CustomerProductListItem>;
  
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
      createCustomerProductListItem<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerProductListItem
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : CustomerProductListItem>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductListItem otherwise.
      * 
      */
      async createCustomerProductListItem(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerProductListItem
        }>,
        rawResponse?: boolean
      ): Promise<Response | CustomerProductListItem> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
        if (optionParams["listId"] !== undefined) {
          pathParams["listId"] = optionParams["listId"];
        } else if (configParams["listId"] !== undefined) {
          pathParams["listId"] = configParams["listId"];
        }
        else {
          throw new Error('Missing required path parameter: listId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for createCustomerProductListItem: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
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
            method: "POST",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | CustomerProductListItem;
      }
  
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
      deleteCustomerProductListItem(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            itemId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<void>;
  
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
      deleteCustomerProductListItem<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            itemId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : void>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type void otherwise.
      * 
      */
      async deleteCustomerProductListItem(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            itemId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | void> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
        if (optionParams["listId"] !== undefined) {
          pathParams["listId"] = optionParams["listId"];
        } else if (configParams["listId"] !== undefined) {
          pathParams["listId"] = configParams["listId"];
        }
        else {
          throw new Error('Missing required path parameter: listId');
        }
        if (optionParams["itemId"] !== undefined) {
          pathParams["itemId"] = optionParams["itemId"];
        } else if (configParams["itemId"] !== undefined) {
          pathParams["itemId"] = configParams["itemId"];
        }
        else {
          throw new Error('Missing required path parameter: itemId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for deleteCustomerProductListItem: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items/{itemId}",
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
            method: "DELETE",
            headers,
            
          },
          this.clientConfig,
          rawResponse
        )
  
        if (rawResponse) {
          return response as Response;
        }
      }
  
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
      getCustomerProductListItem(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            itemId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<CustomerProductListItem>;
  
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
      getCustomerProductListItem<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            itemId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : CustomerProductListItem>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductListItem otherwise.
      * 
      */
      async getCustomerProductListItem(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            itemId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | CustomerProductListItem> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
        if (optionParams["listId"] !== undefined) {
          pathParams["listId"] = optionParams["listId"];
        } else if (configParams["listId"] !== undefined) {
          pathParams["listId"] = configParams["listId"];
        }
        else {
          throw new Error('Missing required path parameter: listId');
        }
        if (optionParams["itemId"] !== undefined) {
          pathParams["itemId"] = optionParams["itemId"];
        } else if (configParams["itemId"] !== undefined) {
          pathParams["itemId"] = configParams["itemId"];
        }
        else {
          throw new Error('Missing required path parameter: itemId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for getCustomerProductListItem: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items/{itemId}",
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
  
        return response as Response | CustomerProductListItem;
      }
  
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
      updateCustomerProductListItem(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            itemId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerProductListItem
        }>
      ): Promise<CustomerProductListItem>;
  
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
      updateCustomerProductListItem<T extends boolean>(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            itemId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerProductListItem
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : CustomerProductListItem>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type CustomerProductListItem otherwise.
      * 
      */
      async updateCustomerProductListItem(
        options: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            customerId: string
            listId: string
            itemId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
          body: CustomerProductListItem
        }>,
        rawResponse?: boolean
      ): Promise<Response | CustomerProductListItem> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["customerId"] !== undefined) {
          pathParams["customerId"] = optionParams["customerId"];
        } else if (configParams["customerId"] !== undefined) {
          pathParams["customerId"] = configParams["customerId"];
        }
        else {
          throw new Error('Missing required path parameter: customerId');
        }
        if (optionParams["listId"] !== undefined) {
          pathParams["listId"] = optionParams["listId"];
        } else if (configParams["listId"] !== undefined) {
          pathParams["listId"] = configParams["listId"];
        }
        else {
          throw new Error('Missing required path parameter: listId');
        }
        if (optionParams["itemId"] !== undefined) {
          pathParams["itemId"] = optionParams["itemId"];
        } else if (configParams["itemId"] !== undefined) {
          pathParams["itemId"] = configParams["itemId"];
        }
        else {
          throw new Error('Missing required path parameter: itemId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for updateCustomerProductListItem: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items/{itemId}",
          this.clientConfig.baseUri,
          {
            pathParams,
            queryParams,
            origin: this.clientConfig.proxy
          }
        );
  
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
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
            method: "PATCH",
            headers,
            body: this.clientConfig.transformRequest(options.body, headers)
          },
          this.clientConfig,
          rawResponse
        )
  
        return response as Response | CustomerProductListItem;
      }
  
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
      getPublicProductListsBySearchTerm(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            email?: string
            firstName?: string
            lastName?: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<PublicProductListResult>;
  
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
      getPublicProductListsBySearchTerm<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            email?: string
            firstName?: string
            lastName?: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : PublicProductListResult>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type PublicProductListResult otherwise.
      * 
      */
      async getPublicProductListsBySearchTerm(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            email?: string
            firstName?: string
            lastName?: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | PublicProductListResult> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
        if (optionParams["email"] !== undefined) {
          queryParams["email"] = optionParams["email"];
        } else if (configParams["email"] !== undefined) {
          queryParams["email"] = configParams["email"];
        }
        if (optionParams["firstName"] !== undefined) {
          queryParams["firstName"] = optionParams["firstName"];
        } else if (configParams["firstName"] !== undefined) {
          queryParams["firstName"] = configParams["firstName"];
        }
        if (optionParams["lastName"] !== undefined) {
          queryParams["lastName"] = optionParams["lastName"];
        } else if (configParams["lastName"] !== undefined) {
          queryParams["lastName"] = configParams["lastName"];
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
            console.warn(`Invalid Parameter for getPublicProductListsBySearchTerm: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/product-lists",
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
  
        return response as Response | PublicProductListResult;
      }
  
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
      getPublicProductList(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            listId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<PublicProductList>;
  
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
      getPublicProductList<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            listId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : PublicProductList>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type PublicProductList otherwise.
      * 
      */
      async getPublicProductList(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            listId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | PublicProductList> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["listId"] !== undefined) {
          pathParams["listId"] = optionParams["listId"];
        } else if (configParams["listId"] !== undefined) {
          pathParams["listId"] = configParams["listId"];
        }
        else {
          throw new Error('Missing required path parameter: listId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for getPublicProductList: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/product-lists/{listId}",
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
  
        return response as Response | PublicProductList;
      }
  
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
      getProductListItem(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            listId: string
            itemId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>
      ): Promise<PublicProductListItem>;
  
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
      getProductListItem<T extends boolean>(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            listId: string
            itemId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: T
      ): Promise<T extends true ? Response : PublicProductListItem>;
  
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
      *
      * @returns A promise of type Response if rawResponse is true, a promise of type PublicProductListItem otherwise.
      * 
      */
      async getProductListItem(
        options?: RequireParametersUnlessAllAreOptional<{
          parameters?: CompositeParameters<{
            organizationId: string
            listId: string
            itemId: string
            siteId: string
          } & { [key in `c_${string}`]: any }, ConfigParameters>,
          headers?: { [key: string]: string },
        }>,
        rawResponse?: boolean
      ): Promise<Response | PublicProductListItem> {
        const optionParams = options?.parameters || ({} as Partial<NonNullable<NonNullable<typeof options>["parameters"]>>);
        const configParams = this.clientConfig.parameters;
  
        const pathParams: ShopperCustomersPathParameters & Required<BaseUriParameters> = {
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
        if (optionParams["listId"] !== undefined) {
          pathParams["listId"] = optionParams["listId"];
        } else if (configParams["listId"] !== undefined) {
          pathParams["listId"] = configParams["listId"];
        }
        else {
          throw new Error('Missing required path parameter: listId');
        }
        if (optionParams["itemId"] !== undefined) {
          pathParams["itemId"] = optionParams["itemId"];
        } else if (configParams["itemId"] !== undefined) {
          pathParams["itemId"] = configParams["itemId"];
        }
        else {
          throw new Error('Missing required path parameter: itemId');
        }
  
        const queryParams: ShopperCustomersQueryParameters & { [key in `c_${string}`]: any } = {};
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
            console.warn(`Invalid Parameter for getProductListItem: ${key}`)
          }
        })
  
        const url = new TemplateURL(
          "/organizations/{organizationId}/product-lists/{listId}/items/{itemId}",
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
  
        return response as Response | PublicProductListItem;
      }
}

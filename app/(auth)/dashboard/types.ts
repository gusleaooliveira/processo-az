export interface Root {
    orders_total: number
    orders_count: number
    sales_total: number
    sales_count: number
    average_ticket: number
    orders: Order[]
  }
  
  export interface Order {
    _id: string
    customer: Customer
    seller: Seller
    payment: Payment
    delivery: Delivery
    coupon?: Coupon
    products: Product[]
    invoices: Invoice[]
    order_seller_id: string
    status: string
    partner: Partner
    createdAt: string
    updatedAt: string
    user_id?: string
    refund?: Refund
    replacement_product?: ReplacementProduct
    __v?: number
  }
  
  export interface Customer {
    name: string
    doc: string
    email: string
    phone: string
    _id?: string
  }
  
  export interface Seller {
    id: string
    name: string
    email: string
    doc?: string
    sales_percentual?: number
    sales_commission?: number
  }
  
  export interface Payment {
    amount: number
    original_amount?: number
    status: string
    discount: number
    method: string
    transaction_id?: string
    installments?: number
    date: string
  }
  
  export interface Delivery {
    address: Address
    status: string
    type: string
    track_id: string
    track_url: string
    amount: number
    delivery_forecast: string
    history?: History[]
  }
  
  export interface Address {
    line1: string
    line2: string
    line3: string
    neighborhood: string
    city: string
    state: string
    postal_code: string
    country_code: string
  }
  
  export interface History {
    address: Address2
    status: string
    type: string
    track_id: string
    track_url?: string
    amount: number
    delivery_forecast: string
  }
  
  export interface Address2 {
    line1: string
    line2: string
    line3: string
    neighborhood: string
    city: string
    state: string
    postal_code: string
    country_code: string
  }
  
  export interface Coupon {
    id: string
    code: string
    name: string
    discount: number
    type: string
    application?: string
  }
  
  export interface Product {
    id: string
    seller_id: string
    name: string
    quantity: number
    sku: string
    image: string
    status: string
    price?: number
    discount: number
    original_price: number
    rating: any
    replacement_coupon?: boolean
    coupon: Coupon2
    promotion: Promotion
    amount: number
    history?: History2[]
    active?: boolean
    replacement_product: any
    attributes?: Attribute[]
    product_seller_id?: string
  }
  
  export interface Coupon2 {
    id: string
    code: string
    name: string
    discount: number
    type: string
    application: any
  }
  
  export interface Promotion {
    discount: number
    percentual: number
  }
  
  export interface History2 {
    id: string
    seller_id: string
    name: string
    quantity: number
    sku: string
    image: string
    amount: number
    discount: number
    original_amount?: number
  }
  
  export interface Attribute {
    _id: string
    key: string
    value: string
    name: string
    sort: number
  }
  
  export interface Invoice {
    id: string
    createdAt: string
    status: string
  }
  
  export interface Partner {
    id: string
    name: string
    doc: string
    sales_commission?: number
    sales_percentual: number
    sales_comission?: number
  }
  
  export interface Refund {
    bank: string
    agency: string
    account: string
  }
  
  export interface ReplacementProduct {
    type: string
    reason: string
    comment: string
    products: Product2[]
  }
  
  export interface Product2 {
    _id: string
    attributes: Attribute2[]
    quantity: number
  }
  
  export interface Attribute2 {
    _id: string
  }
  
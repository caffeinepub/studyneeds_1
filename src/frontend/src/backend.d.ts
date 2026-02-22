import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ProductAdminQueries {
    id: string;
    stockQuantity: bigint;
    name: string;
    description: string;
    discount: bigint;
    category: string;
    rating: number;
    price: number;
    images: Array<ExternalBlob>;
}
export type Time = bigint;
export interface OrderItem {
    quantity: bigint;
    product: Product;
}
export interface UserAdminQueries {
    principal: Principal;
    orderCount: bigint;
    registrationDate: Time;
    profile: UserProfile;
}
export interface Order {
    id: string;
    status: OrderStatus;
    deliveryAddress: string;
    paymentMethod: PaymentMethod;
    userId: Principal;
    isPaid: boolean;
    timestamp: Time;
    items: Array<OrderItem>;
}
export interface OrderAdminQueries {
    id: string;
    status: OrderStatus;
    deliveryAddress: string;
    paymentMethod: PaymentMethod;
    userId: Principal;
    isPaid: boolean;
    timestamp: Time;
    items: Array<OrderItem>;
}
export interface Product {
    id: string;
    stockQuantity: bigint;
    name: string;
    description: string;
    discount: bigint;
    category: string;
    rating: number;
    price: number;
    images: Array<ExternalBlob>;
}
export interface UserProfile {
    name: string;
    email: string;
    address: string;
    phone: string;
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered",
    confirmed = "confirmed"
}
export enum PaymentMethod {
    cashOnDelivery = "cashOnDelivery",
    onlinePayment = "onlinePayment"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(id: string, name: string, category: string, price: number, discount: bigint, rating: number, images: Array<ExternalBlob>, stockQuantity: bigint, description: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProduct(id: string): Promise<void>;
    getAllOrders(): Promise<Array<Order>>;
    getAllOrdersAdminProductQueries(): Promise<Array<OrderAdminQueries>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllProductsAdminProductQueries(): Promise<Array<ProductAdminQueries>>;
    getAllUsers(): Promise<Array<UserAdminQueries>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOrder(id: string): Promise<Order>;
    getOrderInternal(id: string): Promise<Order | null>;
    getProduct(id: string): Promise<Product>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getUserOrders(): Promise<Array<Order>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markOrderAsPaid(id: string): Promise<void>;
    placeOrder(id: string, userId: Principal, items: Array<OrderItem>, deliveryAddress: string, paymentMethod: PaymentMethod): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateOrderStatus(id: string, status: OrderStatus): Promise<void>;
    updateProduct(id: string, name: string, category: string, price: number, discount: bigint, rating: number, images: Array<ExternalBlob>, stockQuantity: bigint, description: string): Promise<void>;
}

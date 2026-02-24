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
export interface StudentLead {
    id: string;
    status: string;
    additionalNotes: string;
    studentName: string;
    subjectsRequired: string;
    mode: string;
    submittedAt: bigint;
    preferredTime: string;
    contactNumber: string;
    budget: bigint;
    classOrCourse: string;
    location: string;
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
export interface TeacherRegistration {
    id: string;
    status: string;
    classesTeach: string;
    subjectsTeach: string;
    idProofUrl: string;
    mode: string;
    fullName: string;
    submittedAt: bigint;
    mobileNumber: string;
    photoUrl: string;
    email: string;
    experienceYears: bigint;
    expectedFees: bigint;
    qualification: string;
    location: string;
}
export interface DocumentationRequest {
    id: string;
    status: DocumentationRequestStatus;
    uploadedDocuments: Array<ExternalBlob>;
    mode: string;
    fullName: string;
    mobileNumber: string;
    message: string;
    timestamp: bigint;
    serviceNeeded: string;
}
export interface UserProfile {
    name: string;
    email: string;
    address: string;
    phone: string;
}
export interface UpdateProductRequest {
    id: string;
    stockQuantity: bigint;
    name: string;
    description: string;
    discount: bigint;
    category: string;
    rating: number;
    price: number;
}
export enum DocumentationRequestStatus {
    pending = "pending",
    completed = "completed",
    processing = "processing"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createDocumentationRequest(fullName: string, mobileNumber: string, serviceNeeded: string, mode: string, uploadedDocuments: Array<ExternalBlob>, message: string): Promise<void>;
    createProduct(product: Product): Promise<void>;
    customQueryExample(param: bigint): Promise<bigint>;
    deleteProduct(id: string): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getAllStudentLeads(): Promise<Array<StudentLead>>;
    getAllTeacherRegistrations(): Promise<Array<TeacherRegistration>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDocumentationRequestDocuments(requestId: string): Promise<Array<ExternalBlob>>;
    getDocumentationRequests(): Promise<Array<DocumentationRequest>>;
    getProduct(id: string): Promise<Product>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitStudentLead(lead: StudentLead): Promise<string>;
    submitTeacherRegistration(reg: TeacherRegistration): Promise<string>;
    updateDocumentationRequestStatus(requestId: string, newStatus: DocumentationRequestStatus): Promise<void>;
    updateProduct(request: UpdateProductRequest): Promise<void>;
}

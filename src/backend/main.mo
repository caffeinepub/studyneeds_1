import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Blob "mo:core/Blob";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  type Product = {
    id : Text;
    name : Text;
    category : Text;
    price : Float;
    discount : Nat;
    rating : Float;
    images : [Storage.ExternalBlob];
    stockQuantity : Nat;
    description : Text;
  };

  type Order = {
    id : Text;
    userId : Principal;
    items : [OrderItem];
    deliveryAddress : Text;
    paymentMethod : PaymentMethod;
    status : OrderStatus;
    timestamp : Time.Time;
    isPaid : Bool;
  };

  type OrderItem = {
    product : Product;
    quantity : Nat;
  };

  type PaymentMethod = {
    #onlinePayment;
    #cashOnDelivery;
  };

  type OrderStatus = {
    #pending;
    #confirmed;
    #shipped;
    #delivered;
    #cancelled;
  };

  type ProductAdminQueries = Product;
  type OrderAdminQueries = Order;

  type UpdateProductRequest = {
    id : Text;
    name : Text;
    category : Text;
    price : Float;
    discount : Nat;
    rating : Float;
    stockQuantity : Nat;
    description : Text;
  };

  type StudentLead = {
    id : Text;
    studentName : Text;
    classOrCourse : Text;
    subjectsRequired : Text;
    mode : Text;
    location : Text;
    budget : Nat;
    preferredTime : Text;
    contactNumber : Text;
    additionalNotes : Text;
    submittedAt : Int;
    status : Text;
  };

  type TeacherRegistration = {
    id : Text;
    fullName : Text;
    mobileNumber : Text;
    email : Text;
    qualification : Text;
    subjectsTeach : Text;
    classesTeach : Text;
    experienceYears : Nat;
    mode : Text;
    location : Text;
    expectedFees : Nat;
    photoUrl : Text;
    idProofUrl : Text;
    submittedAt : Int;
    status : Text;
  };

  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // user profile type
  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
  };

  let products = Map.empty<Text, Product>();
  let orders = Map.empty<Text, Order>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let studentLeadsMap = Map.empty<Text, StudentLead>();
  let teacherRegistrationsMap = Map.empty<Text, TeacherRegistration>();

  let userRegistrationDates = Map.empty<Principal, Time.Time>();

  let demoProducts = [
    {
      id = "prod1";
      name = "Organic Apple";
      category = "Fruits";
      price = 2.5;
      discount = 10;
      rating = 4.5;
      images = [];
      stockQuantity = 100;
      description = "Fresh organic apples.";
    },
    {
      id = "prod2";
      name = "Almond Milk";
      category = "Beverages";
      price = 3.99;
      discount = 5;
      rating = 4.8;
      images = [];
      stockQuantity = 50;
      description = "Healthy almond milk.";
    },
    {
      id = "prod3";
      name = "Quinoa";
      category = "Grains";
      price = 4.75;
      discount = 15;
      rating = 4.3;
      images = [];
      stockQuantity = 80;
      description = "Organic quinoa grains.";
    },
  ];

  public shared ({ caller }) func createProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    if (product.name == "" or product.category == "" or product.price <= 0.0 or product.stockQuantity == 0) {
      Runtime.trap("Invalid product data. Please ensure all fields are filled correctly.");
    };

    products.add(product.id, product);
  };

  public shared ({ caller }) func updateProduct(request : UpdateProductRequest) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    switch (products.get(request.id)) {
      case (null) {
        // Product not found, throw error
        Runtime.trap("Product not found");
      };
      case (?existingProduct) {
        let updatedProduct : Product = {
          id = request.id;
          name = request.name;
          category = request.category;
          price = request.price;
          discount = request.discount;
          rating = request.rating;
          images = existingProduct.images;
          stockQuantity = request.stockQuantity;
          description = request.description;
        };
        products.add(request.id, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };

    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };

    products.remove(id);
  };

  public query func getAllProducts() : async [Product] {
    let storedProducts = products.values().toArray();
    demoProducts.concat(storedProducts);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    switch (userProfiles.get(caller)) {
      case (null) {
        userRegistrationDates.add(caller, Time.now());
      };
      case (?_) {};
    };
    userProfiles.add(caller, profile);
  };

  public query func getProduct(id : Text) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query func customQueryExample(param : Nat) : async Nat {
    param * 2;
  };

  public query func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(
      func(product) {
        product.category == category;
      }
    );
  };

  public shared ({ caller }) func submitStudentLead(lead : StudentLead) : async Text {
    if (lead.studentName == "" or lead.classOrCourse == "" or lead.subjectsRequired == "") {
      Runtime.trap("Invalid student lead data. Please ensure all required fields are filled.");
    };

    let newLead : StudentLead = {
      lead with
      id = "studentlead_" # Time.now().toText();
      submittedAt = Time.now();
      status = "Pending";
    };

    studentLeadsMap.add(newLead.id, newLead);
    "Student lead submitted successfully";
  };

  public shared ({ caller }) func submitTeacherRegistration(reg : TeacherRegistration) : async Text {
    if (reg.fullName == "" or reg.mobileNumber == "" or reg.email == "" or reg.qualification == "") {
      Runtime.trap("Invalid teacher registration data. Please ensure all required fields are filled.");
    };

    let newReg : TeacherRegistration = {
      reg with
      id = "teacherreg_" # Time.now().toText();
      submittedAt = Time.now();
      status = "Pending";
    };

    teacherRegistrationsMap.add(newReg.id, newReg);
    "Teacher registration submitted successfully";
  };

  public query ({ caller }) func getAllStudentLeads() : async [StudentLead] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view student leads");
    };
    studentLeadsMap.values().toArray();
  };

  public query ({ caller }) func getAllTeacherRegistrations() : async [TeacherRegistration] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view teacher registrations");
    };
    teacherRegistrationsMap.values().toArray();
  };

  // Begin documentation request changes

  public type DocumentationRequestStatus = {
    #pending;
    #processing;
    #completed;
  };

  public type DocumentationRequest = {
    id : Text;
    fullName : Text;
    mobileNumber : Text;
    serviceNeeded : Text;
    mode : Text; // online or centre
    uploadedDocuments : [Storage.ExternalBlob];
    message : Text;
    timestamp : Int;
    status : DocumentationRequestStatus;
  };

  let documentationRequests = Map.empty<Text, DocumentationRequest>();

  public shared ({ caller }) func createDocumentationRequest(fullName : Text, mobileNumber : Text, serviceNeeded : Text, mode : Text, uploadedDocuments : [Storage.ExternalBlob], message : Text) : async () {
    let newRequest : DocumentationRequest = {
      id = "docreq_" # Time.now().toText();
      fullName;
      mobileNumber;
      serviceNeeded;
      mode;
      uploadedDocuments;
      message;
      timestamp = Time.now();
      status = #pending;
    };
    documentationRequests.add(newRequest.id, newRequest);
  };

  public query ({ caller }) func getDocumentationRequests() : async [DocumentationRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view documentation requests");
    };
    documentationRequests.values().toArray();
  };

  public shared ({ caller }) func updateDocumentationRequestStatus(requestId : Text, newStatus : DocumentationRequestStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update documentation request status");
    };

    switch (documentationRequests.get(requestId)) {
      case (null) {
        Runtime.trap("Documentation request not found");
      };
      case (?existingRequest) {
        let updatedRequest = {
          existingRequest with
          status = newStatus;
        };
        documentationRequests.add(requestId, updatedRequest);
      };
    };
  };

  public query ({ caller }) func getDocumentationRequestDocuments(requestId : Text) : async [Storage.ExternalBlob] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access documentation request documents");
    };

    switch (documentationRequests.get(requestId)) {
      case (null) {
        Runtime.trap("Documentation request not found");
      };
      case (?request) {
        request.uploadedDocuments;
      };
    };
  };
};

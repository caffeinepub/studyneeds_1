import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Storage "blob-storage/Storage";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Float "mo:core/Float";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  public type Product = {
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

  public type Order = {
    id : Text;
    userId : Principal;
    items : [OrderItem];
    deliveryAddress : Text;
    paymentMethod : PaymentMethod;
    status : OrderStatus;
    timestamp : Time.Time;
    isPaid : Bool;
  };

  public type OrderItem = {
    product : Product;
    quantity : Nat;
  };

  public type PaymentMethod = {
    #onlinePayment;
    #cashOnDelivery;
  };

  public type OrderStatus = {
    #pending;
    #confirmed;
    #shipped;
    #delivered;
    #cancelled;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
  };

  public type ProductAdminQueries = Product;
  public type OrderAdminQueries = Order;

  public type UserAdminQueries = {
    principal : Principal;
    profile : UserProfile;
    orderCount : Nat;
    registrationDate : Time.Time;
  };

  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let products = Map.empty<Text, Product>();
  let orders = Map.empty<Text, Order>();
  let userProfiles = Map.empty<Principal, UserProfile>();
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

  public shared ({ caller }) func createProduct(product : Product) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    if (product.name == "" or product.category == "" or product.price <= 0.0 or product.stockQuantity == 0) {
      Runtime.trap("Invalid product data. Please ensure all fields are filled correctly.");
    };

    products.add(product.id, product);
    true;
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
};

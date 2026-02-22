import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Storage "blob-storage/Storage";
import Principal "mo:core/Principal";
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

  public type ProductAdminQueries = {
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

  public type OrderAdminQueries = {
    id : Text;
    userId : Principal;
    items : [OrderItem];
    deliveryAddress : Text;
    paymentMethod : PaymentMethod;
    status : OrderStatus;
    timestamp : Time.Time;
    isPaid : Bool;
  };

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

  public shared ({ caller }) func addProduct(
    id : Text,
    name : Text,
    category : Text,
    price : Float,
    discount : Nat,
    rating : Float,
    images : [Storage.ExternalBlob],
    stockQuantity : Nat,
    description : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let product : Product = {
      id;
      name;
      category;
      price;
      discount;
      rating;
      images;
      stockQuantity;
      description;
    };
    products.add(id, product);
  };

  public shared ({ caller }) func updateProduct(
    id : Text,
    name : Text,
    category : Text,
    price : Float,
    discount : Nat,
    rating : Float,
    images : [Storage.ExternalBlob],
    stockQuantity : Nat,
    description : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        let updatedProduct : Product = {
          id;
          name;
          category;
          price;
          discount;
          rating;
          images;
          stockQuantity;
          description;
        };
        products.add(id, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        products.remove(id);
      };
    };
  };

  public query func getProduct(id : Text) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(
      func(product) {
        product.category == category;
      }
    );
  };

  public shared ({ caller }) func placeOrder(
    id : Text,
    userId : Principal,
    items : [OrderItem],
    deliveryAddress : Text,
    paymentMethod : PaymentMethod,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can place orders");
    };
    if (caller != userId) {
      Runtime.trap("Unauthorized: Can only place orders for yourself");
    };
    let order : Order = {
      id;
      userId;
      items;
      deliveryAddress;
      paymentMethod;
      status = #pending;
      timestamp = Time.now();
      isPaid = false;
    };
    orders.add(id, order);
  };

  public query ({ caller }) func getOrder(id : Text) : async Order {
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        if (caller != order.userId and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own orders");
        };
        order;
      };
    };
  };

  public query ({ caller }) func getOrderInternal(id : Text) : async ?Order {
    switch (orders.get(id)) {
      case (null) { null };
      case (?order) {
        if (caller != order.userId and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own orders");
        };
        ?order;
      };
    };
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orders.values().toArray();
  };

  public query ({ caller }) func getUserOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their orders");
    };
    orders.values().toArray().filter(
      func(order) {
        order.userId == caller;
      }
    );
  };

  public shared ({ caller }) func updateOrderStatus(id : Text, status : OrderStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder = {
          order with
          status
        };
        orders.add(id, updatedOrder);
      };
    };
  };

  public shared ({ caller }) func markOrderAsPaid(id : Text) : async () {
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        if (caller != order.userId and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only mark your own orders as paid");
        };
        let updatedOrder = {
          order with
          isPaid = true;
        };
        orders.add(id, updatedOrder);
      };
    };
  };

  public query ({ caller }) func getAllOrdersAdminProductQueries() : async [OrderAdminQueries] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    let orderArray = orders.values().toArray();
    orderArray.map<Order, OrderAdminQueries>(func(order) { order });
  };

  public query ({ caller }) func getAllProductsAdminProductQueries() : async [ProductAdminQueries] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all products");
    };
    let productArray = products.values().toArray();
    productArray.map<Product, ProductAdminQueries>(func(product) { product });
  };

  public query ({ caller }) func getAllUsers() : async [UserAdminQueries] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all users");
    };

    let allOrders = orders.values().toArray();

    userProfiles.entries().toArray().map<(Principal, UserProfile), UserAdminQueries>(
      func(entry) {
        let (userPrincipal, profile) = entry;
        let orderCount = allOrders.filter(
          func(order) {
            order.userId == userPrincipal;
          }
        ).size();
        let registrationDate = switch (userRegistrationDates.get(userPrincipal)) {
          case (?date) { date };
          case (null) { Time.now() };
        };
        {
          principal = userPrincipal;
          profile = profile;
          orderCount = orderCount;
          registrationDate = registrationDate;
        };
      }
    );
  };
};

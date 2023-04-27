const express = require("express");
const router = express.Router();

const auth = require("../config/auth");
const UserController = require("../controller/userController");
const ContactController = require("../controller/contactusController");
const ProductController = require("../controller/productController");

//login
router.post("/user_login", UserController.userLogin);
router.post("/signup", UserController.Registration);
router.post(
  "/getEmployeeFromTechnology",
  UserController.getEmployeeFromTechnology
);

//product
router.post("/add/product", ProductController.AddProduct);
router.post("/add/order", ProductController.AddOrder);
router.get("/detail/product", ProductController.ProductDetail);
router.post("/detail/recentOrder", ProductController.RecentOrder);
router.post("/add/cart", ProductController.AddToCart);
router.post("/remove/cart", ProductController.RemoveFromCart);


// router.post("/update/serviceStatus", ProductController.updateDetail);

router.post("/add/contactus", ContactController.ContactUs);
router.post("/update/serviceStatus", ProductController.PaymentStatus);
module.exports = router;

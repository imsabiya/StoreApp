const express = require("express");
const {
  getProducts,
  getProductsWithFilters,
  getProductsWithFilters1,
} = require("../controllers/product-controller");

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/productsWithFilters").get(getProductsWithFilters);
router.route("/productsWithFilters1").get(getProductsWithFilters1);


module.exports = router;

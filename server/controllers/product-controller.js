const { faker } = require("@faker-js/faker");
const Product = require("../models/product-model");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      products: products,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProductsWithFilters1 = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  let queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      console.log(item, "item");
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  // 23
  // 4 7 7 7 2

  const products = await result;
  res.status(200).json({ products });
};

const getProductsWithFilters = async (req, res) => {
  const {
    featured,
    name,
    company,
    minPrice,
    maxPrice,
    minRating,
    maxRating,
    sortBy,
    color,
    page,
    pageSize,
  } = req.query;

  let filteredProducts = {};

  console.log("jkajkjaskdjk");

  if (featured) {
    filteredProducts.featured = featured === "true" ? true : false;
  }
  if (company) {
    filteredProducts.company = company;
  }

  if (name) {
    filteredProducts.name = { $regex: name, $options: "i" };
  }

  if (minPrice && maxPrice) {
    filteredProducts.price = {
      $gte: parseFloat(minPrice),
      $lte: parseFloat(maxPrice),
    };
  }

  if (minRating && maxRating) {
    filteredProducts.rating = {
      $gte: parseFloat(minRating),
      $lte: parseFloat(maxRating),
    };
  }

  if (color) {
    filteredProducts.color = color;
  }
  let sortOptions = {};
  if (sortBy === "priceLowToHigh") {
    sortOptions.price = 1;
  } else if (sortBy === "priceHighToLow") {
    sortOptions.price = -1;
  } else if (sortBy === "ratingLowToHigh") {
    sortOptions.rating = 1;
  } else if (sortBy === "ratingHighToLow") {
    sortOptions.rating = -1;
  }

  // apply pagination too
  try {
    const skip = (page - 1) * pageSize;
    const products = await Product.find(filteredProducts)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(pageSize)); // U can apply skip also here

    res.status(200).json({
      products: products,
      nbHits: products.length,
      currentPage: Number(page),
      pageSize: Number(pageSize),
      totalPages: Math.ceil(products.length / pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getProducts,
  getProductsWithFilters,
  getProductsWithFilters1,
};

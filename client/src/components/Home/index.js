// UserCard - reusable  | Name | Places No.
//Take a json for now.
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCard from "./ProductCard";

const Home = () => {
  const [productsData, setProductsData] = useState([]);
  const [searchText, setSearchText] = useState();

  const [filteredData, setFilteredData] = useState([]);

  const getProductsData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_STORE_APP_URL}/products`
      );
      const data = res.data;
      //console.log(data, "dd")
      setProductsData(data.products);
      setFilteredData(data.products);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  //console.log(filteredData,"fd")

  const handleProductSearch = (value) => {
    setSearchText(value);
    setFilteredData(() => {
      if (value) {
        return productsData.filter((product) =>
          product.name.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        return productsData;
      }
    });
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="flex flex-col mt-4 gap-2 mx-auto">
        <div className="flex justify-end mx-2">
          <input
            type="text"
            placeholder="Search user..."
            className="input input-bordered"
            value={searchText}
            onChange={(e) => handleProductSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-4 my-4 mt-8 place-items-center">
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((product) => {
              return <ProductCard product={product} />;
            })
          ) : (
            <div className="w-full flex justify-center">No Products found.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

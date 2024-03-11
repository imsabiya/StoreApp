import React from "react";
import { useNavigate } from "react-router-dom";
import { faker } from '@faker-js/faker';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="mx-4 hover:cursor-pointer"
        onClick={() => navigate(`/view-product/${product._id}`)}
        key={product._id}
      >
        <div className="flex flex-col gap-2 card w-60 h-22 card-side mx-4">
          <figure className="rounded-lg">
            <img
              src={
                faker.image.imageUrl() ||
                "https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              }
              alt="Movie"
              className="w-full h-28"
            />
          </figure>
          <div className="flex gap-2 p-1 text-black w-full justify-between place-items-center">
            <h2 className="text-md font-semibold capitalize">{product.name}</h2>
            <p>$ {product.price} </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

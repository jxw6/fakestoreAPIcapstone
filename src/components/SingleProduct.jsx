import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../API";

export default function SingleProduct({ token, navigate }) {
  const [product, setProduct] = useState([]);
  const [starRating, setStarRating] = useState([]);
  let { id } = useParams();

  function handleClick(e) {
    e.preventDefault();
  }

  useEffect(() => {
    getProduct(`${id}`, setProduct)
    }, []);
    
  return (
    <>
      <div className="productName">{product.title}</div>
      <div className="productPrice">${product.price}</div>
      <div>
        <button onClick={handleClick}>Add to Cart</button>
      </div>
      <div>
        <img src={product.image} />
      </div>
      <div>{product.description}</div>
    </>
  );
}

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../API";
import cartContext from "./cartContext";

export default function SingleProduct({ token, navigate }) {
  const [product, setProduct] = useState([]);
  const [starRating, setStarRating] = useState([]);
  let { id } = useParams();
  const { cart } = useContext(cartContext);

  function addToCart(productId) {
    if (cart.includes(productId)) {
      let index = cart.indexOf(productId);
      let y = cart.splice(index, 1);
      console.log(cart);
      localStorage.setItem("cart", cart)
      alert("Removed from cart!");
      let x = document.getElementsByClassName(productId);
      for (var i = 0; i < x.length; i++) {
        x[i].innerText = "Add to Cart";
      }
    } else {
      cart.push(productId);
      console.log(cart);
      localStorage.setItem("cart", cart)
      alert("Added to cart!");
      let x = document.getElementsByClassName(productId);
      for (var i = 0; i < x.length; i++) {
        x[i].innerText = "Remove from Cart";
      }
    }
  }
  
  function handleClick(e) {
    e.preventDefault();
  }

  useEffect(() => {
    localStorage.setItem("cart", cart)
  }, []);

  return (
    <>
      <div className="productName">{product.title}</div>
      <div className="productPrice">${product.price}</div>
      <div>
        {cart.includes(product.id) && (
          <button
            className={product.id}
            onClick={() => {
              handleClick;
              addToCart(product.id);
            }}
          >
            Remove from Cart
          </button>
        )}
        {!cart.includes(product.id) && (
          <button
            className={product.id}
            onClick={() => {
              handleClick;
              addToCart(product.id);
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
      <div>
        <img src={product.image} />
      </div>
      <div>{product.description}</div>
    </>
  );
}

import { useEffect, useState, useContext } from "react";
import cartContext from "./cartContext";

export default function Cart({ token, navigate }) {
  const { cart, productsList } = useContext(cartContext);
  let priceTotal = 0;

  function addToCart(productId) {
    let index = cart.indexOf(productId);
    let y = cart.splice(index, 1);
    console.log(cart);
    alert("Removed from cart!");
    navigate(`/cart`);
  }

  function handleClick(e) {
    e.preventDefault();
  }

  function checkOut(e) {
    e.preventDefault();
    if (cart.length > 0) {
      cart.length = 0;
      alert("Items Purchased");
      navigate("/cart");
      localStorage.setItem("cart", cart)
    } else {
      alert("No items in cart!");
    }
  }

  return (
    <>
        <h2>Your Cart:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Product Image</th>
            <th>Price</th>
            <th></th>
          </tr>
          <tr>
            <th>
              <hr></hr>
            </th>
            <th>
              <hr></hr>
            </th>
            <th>
              <hr></hr>
            </th>
            <th>
              <hr></hr>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
          {productsList
            .filter((product) => cart.includes(product.id))
            .map((product) => {
              priceTotal += product.price;
              return (
                <>
                  <tr className="productRow">
                    <td
                      className="productTitle"
                      onClick={() => {
                        navigate(`/products/${product.id}`);
                      }}
                    >
                      {product.title}
                    </td>
                    <td
                      className="productImage"
                      onClick={() => {
                        navigate(`/products/${product.id}`);
                      }}
                    >
                      <img src={product.image} />
                    </td>
                    <td className="price">${product.price.toFixed(2)}</td>
                    <td>
                      {console.log(priceTotal)}
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
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <hr></hr>
                    </td>
                    <td>
                      <hr></hr>
                    </td>
                    <td>
                      <hr></hr>
                    </td>
                    <td>
                      <hr></hr>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
      <div className="Subtotal">Subtotal: ${priceTotal}</div>
      <div>
        <button className="checkout" onClick={checkOut}>
          Checkout
        </button>
      </div>
    </>
  );
}

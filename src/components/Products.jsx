import { useEffect, useState, useContext } from "react";
import { getProducts } from "../API";
import cartContext from "./cartContext";

export default function Products({ token, navigate }) {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [filter, setFilter] = useState("");
  const [sorting, setSorting] = useState({ field: "title", ascending: true });
  const { cart, productsList, setProductsList } = useContext(cartContext);

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

  function filterUpdate(e) {
    e.preventDefault();
    setFilter(e.target.value);
  }

  function applySorting(key, ascending) {
    setSorting({ key: key, ascending: ascending });
  }

  function getClassNameFor(name) {
    if (!sorting) {
      return;
    }
    console.log("Classname:");
    console.log(
      sorting.key === name ? sorting.ascending.toString() : undefined
    );
    return sorting.key === name ? sorting.ascending.toString() : undefined;
  }

  useEffect(() => {
    getProducts(setProductsList);
    localStorage.setItem("cart", cart)
  }, []);

  useEffect(() => {
    const productsListCopy = [...productsList];
    const sortedProductsList = productsListCopy.sort((a, b) => {
      if (a[sorting.key] < b[sorting.key]) {
        return 1;
      }
      if (a[sorting.key] > b[sorting.key]) {
        return -1;
      }
      return 0;
    });
    setProductsList(
      sorting.ascending ? sortedProductsList : sortedProductsList.reverse()
    );
  }, [sorting]);

  return (
    <>
      <div className="searchBar">
        Search by name or category: 
        <input
          className="productSearch"
          onChange={filterUpdate}
          type="search"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th
              onClick={() => applySorting("title", !sorting.ascending)}
              className={"a" + getClassNameFor("title")}
            >
              Name
            </th>
            <th>Product Image</th>
            <th
              onClick={() => applySorting("price", !sorting.ascending)}
              className={"a" + getClassNameFor("price")}
            >
              Price
            </th>
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
          {console.log(productsList)}
          {productsList
            .filter(
              (product) =>
                product.title.toUpperCase().includes(filter.toUpperCase()) ||
                product.category.toUpperCase().includes(filter.toUpperCase())
            )
            .map((product) => {
              return (
                <>
                  <tr className="productRow">
                    <td
                      className="productTitle"
                      onClick={() => {
                        setSelectedProduct(product.id);
                        navigate(`/products/${product.id}`);
                      }}
                    >
                      {product.title}
                    </td>
                    <td
                      className="productImage"
                      onClick={() => {
                        setSelectedProduct(product.id);
                        navigate(`/products/${product.id}`);
                      }}
                    >
                      <img src={product.image} />
                    </td>
                    <td className="price">${product.price.toFixed(2)}</td>
                    <td>
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
    </>
  );
}

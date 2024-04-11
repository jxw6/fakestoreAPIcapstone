import { createContext, useState } from "react";

const cartContext = createContext({
    cart: []
});

export function StateProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [productsList, setProductsList] = useState([])

    return (
        <cartContext.Provider value={{ cart, setCart, productsList, setProductsList }}>
            {children}
        </cartContext.Provider>
  )
}

export default cartContext;
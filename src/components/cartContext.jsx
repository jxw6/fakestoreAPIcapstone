import { createContext, useState } from "react";

const cartContext = createContext({
    cart: []
});

export function StateProvider({ children }) {
    const [cart, setCart] = useState([]);

    return (
        <cartContext.Provider value={{ cart, setCart }}>
            {children}
        </cartContext.Provider>
  )
}

export default cartContext;
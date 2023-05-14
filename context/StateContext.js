import React, { createContext, useContext, useState, useEffect } from "react";
import { Toast, toast } from "react-hot-toast";

const Context = createContext({});

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductIncart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);

    if (checkProductIncart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product._id) {
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        } else {
          return {
            ...item,
          };
        }
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const incQty = () => {
    setQty(qty + 1);
  };
  const decQty = () => {
    setQty(() => {
      if (qty - 1 < 1) {
        return 1;
      }
      return qty - 1;
    });
  };

  const initQty = () => {
    setQty(1);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantity(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    // const newCartItems = cartItems.filter((item) => item._id !== id);
    if (value === "inc") {
      // setCartItems([
      //   ...newCartItems,
      //   { ...foundProduct, quantity: foundProduct.quantity + 1 },
      // ]);
      foundProduct.quantity += 1;
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        // setCartItems([
        //   ...newCartItems,
        //   { ...foundProduct, quantity: foundProduct.quantity - 1 },
        // ]);
        foundProduct.quantity -= 1;
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
      } else {
        onRemove(foundProduct);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        initQty,
        toggleCartItemQuantity,
        onRemove,
        setTotalQuantity,
        setTotalPrice,
        setCartItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

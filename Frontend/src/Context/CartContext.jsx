import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = createContext();
const CART_API = import.meta.env.VITE_CART_API;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;
      try {
        const response = await axios.get(CART_API, axiosConfig);

        if (Array.isArray(response.data.cart.items)) {
          setCart(response.data.cart.items);
          console.log(response.data);
        } else {
        }
      } catch (error) {
      }
    };

    fetchCart();
  }, []);

  const getStock = (id) => {
    return cart.find((item) => item.id === id)?.stocks;
  };

  const addToCart = async (product) => {
    console.log(product);

    const exists = cart.find((item) => item.id === product.id);
    if (!exists) {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);

      try {
        await axios.post(
          CART_API,
          {
            productId: product.id,
            quantity: 1,
            // productType: product.productType,
            title: product.title,
            price: product.price,
          },
          axiosConfig
        );
      } catch (error) {
        toast.error("Failed to add to cart");
        setCart(cart); // rollback
      }
    }
  };

  const removeFromCart = async (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    try {
      await axios.delete(CART_API, {
        ...axiosConfig,
        data: { productId: id },
      });
    } catch (error) {
      toast.error("Failed to remove from cart");
      setCart(cart); // rollback
    }
  };

  const updateQuantity = async (id, amount) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + amount } : item
      )
      .filter((item) => item.quantity > 0);

    const newQuantity =
      updatedCart.find((item) => item.id === id)?.quantity || 0;

    setCart(updatedCart);

    try {
      await axios.put(
        CART_API,
        {
          productId: id,
          quantity: newQuantity,
        },
        axiosConfig
      );
    } catch (error) {
      toast.error("Failed to update quantity");
      setCart(cart);
    }
  };

  const getItemQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const getTotalItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  console.log(cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        getStock,
        removeFromCart,
        updateQuantity,
        getItemQuantity,
        getTotalItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

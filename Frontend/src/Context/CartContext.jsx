import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = createContext();
const CART_API = import.meta.env.VITE_CART_API;
const PRODUCT_API = import.meta.env.VITE_PRODUCTS_API;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const [stock, setStock] = useState(0);
  const [allProducts, setAllProducts] = useState([]);


  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      let res = await axios.get(PRODUCT_API);
      let products = res?.data?.data?.allProducts;
      setAllProducts(products);
    }

    fetchProducts();
  }, [loggedIn])

  useEffect(() => {
    const fetchCart = async () => {
      setCartCount(0);
      if (!token) return;
      try {
        const response = await axios.get(CART_API, axiosConfig);
        if (Array.isArray(response.data.cart.items)) {
          setCart(response.data.cart.items);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, [loggedIn]);

  useEffect(() => {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
  }, [cart]);

  const getStock = (id) => {
    return allProducts.find((item) => item._id === id)?.Stocks;
  };

  const getItemQuantity = (id) => {
    return cart.find((item) => item.productId === id)?.quantity || 0;
  };

  const addToCart = async (product, qty) => {
    try {
      const res = await axios.post(
        CART_API,
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          quantity: qty,
        },
        axiosConfig
      );
      setCart(res?.data?.cart?.items);
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error("Could not add to cart");
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

  const updateQuantity = async (productId, change) => {
    let stock = getStock(productId);
    const currentQty = getItemQuantity(productId);
    const newQty = currentQty + change;

    if (newQty > stock) {
      return;
    }
    try {
      const res = await axios.put(
        CART_API,
        { productId, quantity: newQty },
        axiosConfig
      );
      setCart(res.data.cart.items);
    } catch (err) {
      console.error("Update quantity error:", err);
    }
  };



  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        getStock,
        getItemQuantity,
        removeFromCart,
        updateQuantity,
        setLoggedIn,
        loggedIn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

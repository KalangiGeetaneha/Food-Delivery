import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [cartItems, setCartItems] = useState({});

  const url = "https://food-delivery-backend-gdc4.onrender.com";

  const [token, setToken] = useState("");

  const [food_list, setFoodList] = useState([]);

  // ADD TO CART
  const addToCart = async (itemId) => {

    if (!cartItems[itemId]) {

      setCartItems((prev) => ({
        ...prev,
        [itemId]: 1
      }));

    } else {

      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1
      }));
    }

    if(token)
    {
         await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };

  // REMOVE FROM CART
  const removeFromCart = async (itemId) => {

    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1
    }));

    if(token)
    {
         await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  };

  // TOTAL CART AMOUNT
  const getTotalCartAmount = () => {

    let totalAmount = 0;

    for (const item in cartItems) {

      if (cartItems[item] > 0) {

        let itemInfo = food_list.find(
          (product) => product._id === item
        );

        if (itemInfo) {

          totalAmount +=
            itemInfo.price * cartItems[item];
        }
      }
    }

    return totalAmount;
  };

  // FETCH FOOD LIST
  const fetchFoodList = async () => {

    try {

      const response = await axios.get(
        url + "/api/food/list"
      );

      if (response.data.success) {
        setFoodList(response.data.data);
      }

    } catch (error) {

      console.log(error);
    }
  };

  const loadCartData = async (token) =>{
       const response= await axios.post(url+"/api/cart/get",{},{headers:{token}})
      
          setCartItems(response.data.cartData);
        

  }

  // LOAD DATA
  useEffect(() => {

    async function loadData() {

      await fetchFoodList();

      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }

    loadData();

  }, []);

  // CONTEXT VALUE
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

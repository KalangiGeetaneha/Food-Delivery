import React, { useContext, useState, useEffect } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Components/Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {

  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItems,
    url
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const placeOrder = async (e) => {

    e.preventDefault();

    // Prevent multiple clicks
    if (loading) return;

    setLoading(true);

    try {

      let order_items = [];

      food_list.forEach((item) => {

        if (cartItems[item._id] > 0) {

          let itemInfo = { ...item };

          itemInfo.quantity = cartItems[item._id];

          order_items.push(itemInfo);
        }
      });

      let orderData = {

        address: data,

        items: order_items,

        amount:
          getTotalCartAmount() === 0
            ? 0
            : getTotalCartAmount() + 20
      };

      let response = await axios.post(

        url + "/api/order/place",

        orderData,

        {
          headers: { token }
        }
      );

      if (response.data.success) {

        const { session_url } = response.data;

        window.location.replace(session_url);

      } else {

        alert("Error placing order");

        setLoading(false);
      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

      setLoading(false);
    }
  };

  useEffect(() => {

    if (!token) {

      navigate('/cart');
    }

    else if (getTotalCartAmount() === 0) {

      navigate('/cart');
    }

  }, [token]);

  return (

    <form className='place-order' onSubmit={placeOrder}>

      <div className="place-order-left">

        <p className="title">Delivery Information</p>

        <div className="multi-fields">

          <input
            type="text"
            name="first_name"
            placeholder='First Name'
            value={data.first_name}
            onChange={onChangeHandler}
            required
          />

          <input
            type="text"
            name="last_name"
            placeholder='Last Name'
            value={data.last_name}
            onChange={onChangeHandler}
            required
          />

        </div>

        <input
          type="email"
          name="email"
          placeholder='Email address'
          value={data.email}
          onChange={onChangeHandler}
          required
        />

        <input
          type="text"
          name="street"
          placeholder='Street'
          value={data.street}
          onChange={onChangeHandler}
          required
        />

        <div className="multi-fields">

          <input
            type="text"
            name="city"
            placeholder='City'
            value={data.city}
            onChange={onChangeHandler}
            required
          />

          <input
            type="text"
            name="state"
            placeholder='State'
            value={data.state}
            onChange={onChangeHandler}
            required
          />

        </div>

        <div className="multi-fields">

          <input
            type="text"
            name="zip_code"
            placeholder='Zip Code'
            value={data.zip_code}
            onChange={onChangeHandler}
            required
          />

          <input
            type="text"
            name="country"
            placeholder='Country'
            value={data.country}
            onChange={onChangeHandler}
            required
          />

        </div>

        <input
          type="text"
          name="phone"
          placeholder='Phone'
          value={data.phone}
          onChange={onChangeHandler}
          required
        />

      </div>

      <div className="place-order-right">

        <div className="cart-total">

          <h2>Cart Total</h2>

          <div>

            <div className="cart-total-details">

              <p>Sub Total</p>

              <p>₹{getTotalCartAmount()}</p>

            </div>

            <hr />

            <div className="cart-total-details">

              <p>Delivery Fee</p>

              <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>

            </div>

            <hr />

            <div className="cart-total-details">

              <b>Total</b>

              <b>
                ₹{
                  getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() + 20
                }
              </b>

            </div>

          </div>

          <button type='submit' disabled={loading}>

            {
              loading
                ? "Processing..."
                : "PROCEED TO PAYMENT"
            }

          </button>

        </div>

      </div>

    </form>
  );
};

export default PlaceOrder;
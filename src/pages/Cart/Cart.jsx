import React, { useContext, useState } from 'react'
import './Cart.css'
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartPromoApplied, selectDeliveryFee, selectDiscountAmount, selectFoodItems, selectTotalCartAmount } from '../data/selectors';
import { addToCart, applyPromo, removeFromCart, resetPromo } from '../../pages/data/slices/cart'
import { toast, ToastContainer } from 'react-toastify';

const Cart = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const getTotalCartAmount = useSelector(selectTotalCartAmount);
  const getDeliveryFee = useSelector(selectDeliveryFee);
  const foodList = useSelector(selectFoodItems);
  const discountAmount = useSelector(selectDiscountAmount);
  const promoApplied = useSelector(selectCartPromoApplied);
  const [inputValue, setInputValue] = useState("");
  const [promoMes, setPromoMes] = useState("");
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const checkPromo = (e) => {
    e.preventDefault();
    if (promoApplied) {
      setPromoMes("You already applied promocode");
    }
    else {
      if (inputValue === "sale") {
        if (getTotalCartAmount !== 0) {
          dispatch(applyPromo({ discount: 2 }));
          setPromoMes("Success!")
        }
        else { toast("Add something to your cart first"); }
      }
      else {
        dispatch(resetPromo());
        setPromoMes("Invalid promocode");
      }
    }
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Total</p>
          <p>Quantity</p>
        </div>
        <br />
        <hr />
        {foodList.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img className='dish-img' src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <div className='cart-item-counter'>
                    <img onClick={() => dispatch(removeFromCart(item._id))} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[item._id]}</p>
                    <img onClick={() => dispatch(addToCart(item._id))} src={assets.add_icon_green} alt="" />
                  </div>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className='cart-bottom'>
        <div className="cart-promo">
          <div>
            <p className='promo-text'>If you have a promocode, enter it here</p>
            <form className="promo-input">
              <input type="text" placeholder='Promocode' value={inputValue} onChange={handleChange} />
              <button onClick={checkPromo}>Submit</button>
              <ToastContainer
                position="top-right"
                hideProgressBar={true}
                autoClose={1500}
                closeOnClick={true}
                closeButton={false}
              />
            </form>
            {promoMes && <p className='promo-mes'>{promoMes}</p>}
          </div>
        </div>
        <div className="cart-total">
          <h2>Cart Total</h2>
          <hr />
          <div className='total-details'>
            <div className="total-detail">
              <p>Subtotal</p>
              <p>${getTotalCartAmount}</p>
            </div>
            <div className="total-detail">
              <p>Delivery Fee</p>
              <p>${getDeliveryFee}</p>
            </div>
            <div className="total-detail">
              <p>Discount</p>
              <p>${discountAmount}</p>
            </div>
            <hr />
            <div className="total-detail total">
              <b>Total</b>
              <b>${getTotalCartAmount + getDeliveryFee - discountAmount}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Proceed to checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart

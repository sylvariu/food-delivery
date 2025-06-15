import React, { useState } from 'react'
import './PlaceOrder.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectDeliveryFee, selectDiscountAmount, selectTotalCartAmount } from '../data/selectors';
import { ToastContainer, toast } from 'react-toastify';
import { clearCart } from '../data/slices/cart';

const PlaceOrder = () => {

  const dispatch = useDispatch();
  const getTotalCartAmount = useSelector(selectTotalCartAmount);
  const getDeliveryFee = useSelector(selectDeliveryFee);
  const discountAmount = useSelector(selectDiscountAmount);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '', // Добавлено
    email: '',
    country: '',  // Добавлено
    state: '',    // Добавлено
    city: '',     // Добавлено
    street: '',   // Добавлено
    buildingNumber: '', // Добавлено
    phone: '',    // Добавлено
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
    // Очистить ошибку при изменении поля
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Отправить данные, если нет ошибок
      console.log('Форма валидна, отправка данных:', formData);
      toast("🧡  Thanks for ordering!");
      dispatch(clearCart());
      setFormData({
        firstName: '', lastName: '', email: '', country: '', state: '', city: '', street: '', buildingNumber: '', phone: ''
      });
    } else {
      // Если есть ошибки валидации, можно показать уведомление об этом
      toast.error("Please fill in all required fields correctly.");
    }
  }


const validate = (data) => {
  let errors = {};

  if (!data.firstName.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.country.trim()) {
    errors.country = 'Country is required';
  }

  if (!data.city.trim()) {
    errors.city = 'City is required';
  }

  if (!data.street.trim()) {
    errors.street = 'Street is required';
  }

  if (!data.buildingNumber.trim()) {
    errors.buildingNumber = 'Building number is required';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  }

  return errors;
};
return (
  <form className='place-order' onSubmit={handleSubmit}>
    <div className="order-left">
      <p className="title">Delivery information</p>


      <div className="double-fields">
        <input type="text" placeholder='First name'
          name="firstName" value={FormData.firstName}
          onChange={handleChange} className={errors.firstName ? 'input-error' : ''} />
        {/*{errors.firstName && <p className="error-text">{errors.firstName}</p>} {/* Добавляем класс для стилизации текста ошибки */}
        <input type="text" placeholder='Last name'
          name="lastName" value={formData.lastName}
          onChange={handleChange} className={errors.lastName ? 'input-error' : ''}
        />
        {/*errors.lastName && <p className="error-text">{errors.lastName}</p>*/}
      </div>


      <input type="email" placeholder='Email address'
        name="email" value={FormData.email}
        onChange={handleChange} className={errors.email ? 'input-error' : ''} />
      {/*errors.email && <p className="error-text">{errors.email}</p>*/}


      <input type="text" placeholder='Country'
        name="country" value={formData.country}
        onChange={handleChange} className={errors.country ? 'input-error' : ''} />
      {/*errors.country && <p className="error-text">{errors.country}</p>*/}


      <div className="double-fields">
        <input type="text" placeholder='State'
          name="state" value={formData.state}
          onChange={handleChange} className={errors.state ? 'input-error' : ''} />
        {/*errors.state && <p className="error-text">{errors.state}</p>*/}
        <input type="text" placeholder='City'
          name="city" value={formData.city}
          onChange={handleChange} className={errors.city ? 'input-error' : ''} />
        {/*errors.city && <p className="error-text">{errors.city}</p>*/}
      </div>


      <div className="double-fields">
        <input type="text" placeholder='Street'
          name="street" value={formData.street}
          onChange={handleChange} className={errors.street ? 'input-error' : ''} />
        {/*errors.street && <p className="error-text">{errors.street}</p>*/}
        <input type="text" placeholder='Building Number'
          name="buildingNumber" value={formData.buildingNumber}
          onChange={handleChange} className={errors.buildingNumber ? 'input-error' : ''} />
        {/*errors.buildingNumber && <p className="error-text">{errors.buildingNumber}</p>*/}
      </div>


      <input type="text" placeholder='Phone'
        name="phone" value={formData.phone}
        onChange={handleChange} className={errors.phone ? 'input-error' : ''} />
      {/*errors.phone && <p className="error-text">{errors.phone}</p>*/}

    </div>
    <div className="order-right">
      <div className="cart-total-pay">
        <h2>Cart Total</h2>
        <hr />
        <div className='total-details'>
          <div className="total-detail">
            <p>Subtotal</p>
            <p>${getTotalCartAmount.toFixed(2)}</p>
          </div>
          <div className="total-detail">
            <p>Delivery Fee</p>
            <p>${getDeliveryFee.toFixed(2)}</p>
          </div>
          <div className="total-detail">
            <p>Discount</p>
            <p>${discountAmount.toFixed(2)}</p>
          </div>
          <hr />
          <div className="total-detail total">
            <b>Total</b>
            <b>${(getTotalCartAmount + getDeliveryFee - discountAmount).toFixed(2)}</b>
          </div>
        </div>
        <button type="submit" className='button-pay'>Proceed to payment</button>
        <ToastContainer
          position="top-right"
          hideProgressBar={true}
          autoClose={1500}
          closeOnClick={true}
          closeButton={false}
          limit={1}
        />
      </div>
    </div>
  </form>
)
}


export default PlaceOrder

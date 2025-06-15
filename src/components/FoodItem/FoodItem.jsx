import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../pages/data/selectors'
import { addToCart, removeFromCart } from '../../pages/data/slices/cart'

const FoodItem = ({id, name, price, weight, image}) => {

    const dispatch = useDispatch(); 
    const cartItems = useSelector(selectCartItems); 
    const itemQuantity = cartItems[id];


    const navigate = useNavigate();

  return (

    <div className='food-item' >

      <div className="food-item-image-container">
        <img className='food-item-image' src={image} alt="" />
        {!itemQuantity
            ?<img className='add' onClick={()=>dispatch(addToCart(id))} src={assets.add_icon_white} alt="" />
            :<div className='food-item-counter'>
                <img onClick={()=>dispatch(removeFromCart(id))} src={assets.remove_icon_red} alt=""/>
                <p>{itemQuantity}</p>
                <img onClick={()=>dispatch(addToCart(id))} src={assets.add_icon_green} alt=""/>
            </div>
        }
      </div>
      <div className="food-item-info" onClick={()=>navigate( `/dish/${id}`)}>
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{weight} g</p>
        <p className="food-item-price">${price}</p>
        
      </div>
    </div>
  )
}

export default FoodItem

import React from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { useSelector } from 'react-redux'
import { selectFoodItems, selectFoodItemsLoading } from '../../pages/data/selectors'

const FoodDisplay = ({category}) => {

  const foodList = useSelector(selectFoodItems); 
  const loading = useSelector(selectFoodItemsLoading);
  if (loading) {
        return <div className='loading'>Loading...</div>; 
  }

  return (
    <div className='food-display' id='food-display'>
        <h2>Our top dishes</h2>
        <div className="food-display-list">
            {foodList.map((item, index)=>{
                if (category==="All" || category===item.category) {
                    return <FoodItem key={index} id={item._id} name={item.name} weight={item.weight} price={item.price} image={item.image} />
                }
                })}
        </div>
    </div>
  )
}

export default FoodDisplay

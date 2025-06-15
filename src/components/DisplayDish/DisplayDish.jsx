import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './DisplayDish.css'
import { assets } from '../../assets/assets'
import FoodItem from '../FoodItem/FoodItem'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems, selectFoodItems } from '../../pages/data/selectors'
import { addToCart, removeFromCart } from '../../pages/data/slices/cart'

const DisplayDish = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const allDishes = useSelector(selectFoodItems);
    const dishData = allDishes.find(dish => dish._id === id);
    const cartItems = useSelector(selectCartItems);

    const relatedDishes = allDishes.filter(dish => dishData && dish.category === dishData.category && dish._id !== dishData._id);

    /*const goBack = () => {
        localStorage.setItem('scrollPosition', window.scrollY); // сохраняем позицию
        window.history.back();
        localStorage.removeItem('scrollPosition'); // удаляем позицию после прокрутки
    };
    <p onClick={goBack} className='back'>Menu</p>
    */
    
    /*useEffect(() => {
        const scrollPosition = localStorage.getItem('scrollPosition');
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition, 10)); // прокручиваем на сохранённую позицию
            localStorage.removeItem('scrollPosition'); // удаляем позицию после прокрутки
        }
    }, []);*/

    useEffect(() => {
        window.scrollTo(0, 0);  //прокручиваем страницу вверх при загрузке компонента
    }, [id]);

    return (
        <div className="dish-display">
            <div className="dish-display-title">
                <p>{'/'}</p>
                <Link to='/' className='back'>Menu</Link> 
                <p>{'/'}</p>
                <p>{dishData.name}</p>
            </div><h1>{dishData.name}</h1>
            <div className='dish'>
                <img src={dishData.image} alt="" />
                <div className="dish-info">
                    <div className="dish-info-title">
                        <h1>${dishData.price}</h1>
                        {!cartItems[id]
                            ? <button onClick={() => dispatch(addToCart(id))}>Add to Cart</button>
                            : <div className='dish-counter'>
                                <img onClick={() => dispatch(removeFromCart(id))} src={assets.remove_icon_red} alt="" />
                                <p>{cartItems[id]}</p>
                                <img onClick={() => dispatch(addToCart(id))} src={assets.add_icon_green} alt="" />
                            </div>
                        }
                    </div>
                    <hr />
                    <div className="nutrients">
                        <p><span>216</span> calories</p>
                        <p><span>8.5</span> proteins</p>
                        <p><span>7.6</span> fats</p>
                        <p><span>28.1</span> carbs</p>
                    </div>
                    <hr />
                    <p>{dishData.description}</p>
                    <p className='dish-ingred'>Ingredients</p>
                    <p>Quinoa, power aioli (lean mayonnaise, peanut butter, mango chili sauce, yuzu dressing, soy sauce), marinated tofu (tofu, honey, kimchi, rice vinegar, sugar), green peas, edamame beans, baked pumpkin (pumpkin, salt, pepper), salad mix, cherry tomatoes, sesame seeds, grain mix (sesame, cashews, flax, pumpkin seeds).</p>
                </div>
            </div>

            <h2 className='dishes-in-same-category'>You may be interested in</h2>
            <div className="related-dishes">
                {relatedDishes.map(dish => (
                    <FoodItem
                        key={dish._id}
                        id={dish._id}
                        name={dish.name}
                        price={dish.price}
                        weight={dish.weight}
                        image={dish.image}
                    />
                ))}
            </div>
            
        </div>
    )
}

export default DisplayDish

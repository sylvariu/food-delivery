import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import DisplayDish from './components/DisplayDish/DisplayDish'
import { useDispatch } from 'react-redux'
import { food_list } from './assets/assets'
import { setFoodItems, setLoading } from './pages/data/slices/foodList'

const App = () => {

  const[showLogin,setShowLogin] = useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
        const fetchFoodItems =  () => { //async
            dispatch(setLoading(true)); //состояние загрузки
            try {
                //await new Promise(resolve => setTimeout(resolve, 500))  //для имитации загрузки
                dispatch(setFoodItems(food_list)); 
            } catch (error) {
                console.log("Cannot load info") // ошибка
            }
        };
        fetchFoodItems();
    }, [dispatch]);

  useEffect(() => {
          window.scrollTo(0, 0);  //прокручиваем страницу вверх при загрузке компонента
      });

  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<PlaceOrder/>} />
          <Route path='/dish/:id' element={<DisplayDish/>} />
        </Routes>
      </div>
      <Footer/>
    </>
    
  )
}

export default App

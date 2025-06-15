import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalCartAmount } from '../../pages/data/selectors';

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' }); // прокручиваем к элементу
  } else {
    console.error(`Element with id "${id}" not found`); // сообщение об ошибке
  }
};

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");

  const cartItems = useSelector(selectTotalCartAmount); 

  const location = useLocation(); 
    const handleClick = (e) => {  //при нажатии на лого
        if (location.pathname === '/') {    //если мы уже на основной странице
            e.preventDefault(); // предотвращаем переход по ссылке
            window.scrollTo({top: 0});   //просто скроллим на верх сайта
        }
    };

  return (
    <div className='navbar'>
      <Link to='/' onClick={handleClick}><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <Link to='/' onClick={() => { setMenu("menu"); setTimeout(() => scrollToSection('explore-menu'), 100); }} className={menu === "menu" ? "active" : ""}>menu</Link>
        <Link to='/' onClick={() => { setMenu("mobile-app"); setTimeout(() => scrollToSection('app-download'), 100); }} className={menu === "mobile-app" ? "active" : ""}>mobile app</Link>
        <Link to='/' onClick={() => { setMenu("contact-us"); setTimeout(() => scrollToSection('footer'), 100); }} className={menu === "contact-us" ? "active" : ""}>contact us</Link>
      </ul>
      <div className="navbar-right">
        <div className="navbar-basket-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={cartItems === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>sign in</button>
      </div>
    </div>
  )
}

export default Navbar

//Создаем компонент Navbar

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context';
const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className='navbar'>
            <MyButton onClick={logout}>
                 Выйти   
            </MyButton>
            <h1 style={{marginLeft: 750}}>Post of Life</h1>
            <div className='navbar__links' style={{border: '2px solid rgb(224, 171, 171)', padding: 7, borderRadius: 10}}>
              <Link to='/about' style={{textDecoration: 'none', paddingRight: '15px', fontSize: '20px'}}>О сайте</Link>
              <Link to='/posts'style={{textDecoration: 'none', fontSize: '20px'}}>Посты</Link>
            </div>
        </div>
    );
};

export default Navbar;
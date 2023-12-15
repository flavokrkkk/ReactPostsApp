import React, { useContext } from 'react';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import { AuthContext } from '../context';

const Login = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const login = (event) => {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div style={{border: ' 5px solid #fff', marginTop: '200px'}} >
            <h1 style={{textAlign: 'center'}}>Авторизация</h1>
            <form onSubmit={login} style={{padding: '20px'}}>
                <MyInput type='text' placeholder='Введите логин'/>
                <MyInput type='password' placeholder='Введите логин'/>
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );
};

export default Login;
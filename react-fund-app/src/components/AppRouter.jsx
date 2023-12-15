import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '../router';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {

    //Доступ авторизованным и не авторизованным
    const {isAuth, isLoading} = useContext(AuthContext)
    console.log(isAuth)

    if(isLoading){
        return <Loader/>
    }

    return (
        isAuth
        ?<Routes>
            {privateRoutes.map(route => 
                <Route 
                    element={<route.element/>} 
                    path={route.path} 
                    exact={route.exact}
                    key={route.path}
                    />
            )}
                <Route path='*' element={<Navigate replace to='/posts'/>} />
        </Routes>

        : <Routes>
        {publicRoutes.map(route => 
            <Route 
                element={<route.element/>} 
                path={route.path} 
                exact={route.exact}
                key={route.path}
                />
        )}
            <Route path='*' element={<Navigate replace to='/login'/>} />
          </Routes>

    );
};

export default AppRouter;
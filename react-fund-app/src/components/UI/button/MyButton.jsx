//Создание компонента кнопки

import React from 'react';
import classes from './MyButton.module.css'
const MyButton = ({children, ...props}) => {
    return (
        <div>
            <button {...props} className={classes.myBtn} style={{marginLeft: '10px', marginTop: '10px', marginBottom: '10px'}}>
                {children}
            </button>
        </div>
    );
};

export default MyButton;
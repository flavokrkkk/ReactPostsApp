//Создаем компонент модального окна
import React from 'react';
import cl from './MyModal.module.css'


const MyModal = ({children, visible, setVisible}) => {

    const rootclasses = [cl.myModal]
    if(visible){
        rootclasses.push(cl.active)
    }

    return (
        <div className={rootclasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;
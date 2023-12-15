import React from 'react';
import classes from './MySelect.module.css'
const MySelect = ({options, defaultVelue, value, onChange}) => {
    return (
        <select className={classes.mySelect}
        value={value}
        onChange={event => onChange(event.target.value)}
        style={{marginTop: '15px'}}
        >
            <option disabled value='' className={classes.mySelect}>{defaultVelue}</option>
            {options.map(option => 
                    <option key={option.value} value={option.value} className={classes.mySelect}>
                        {option.name}
                    </option>
                )}
        </select>
    );

};

export default MySelect;
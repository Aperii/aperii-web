import React from 'react';
import styles from '../styles/DropdownItem.module.css'
function DropdownItem(props) {
    const {label, icon, loc} = props
    function goToHref(){
        if(loc){
            if(typeof window != 'undefined'){
                window.location = loc
            }
        }
    }
    return (
        <div className={styles.dropdownitem} onClick={goToHref}>
            <img width='15px' height="15px" src={icon ? `/icons/${icon}.svg` : ''} style={{margin: '10px'}}></img>
            <p style={{margin:0}}>{label}</p>
        </div>
    );
}

export default DropdownItem;
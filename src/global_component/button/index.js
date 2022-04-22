import React from 'react';
import PropTypes from 'prop-types'
const Button = ({btnName, style, click})=>{
    return(
        <div className={style}>
            <button onClick={click}>{btnName}</button>
        </div>
    )
}
Button.propTypes = {
    btnName: PropTypes.string,
    style: PropTypes.node,
    click: PropTypes.func
}
export default Button;
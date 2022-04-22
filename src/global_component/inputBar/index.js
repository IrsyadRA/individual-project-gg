import React from 'react';
import PropTypes from 'prop-types'

const InputBar = ({style, value, onChange, placeHolder}) =>{
    return(
        <div>
            <input className={style} type='text' value={value} onChange={onChange} placeholder={placeHolder}></input>
        </div>
    )
}
InputBar.propTypes = {
    style: PropTypes.node,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeHolder: PropTypes.string
}
export {InputBar};
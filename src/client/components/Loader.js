import React from 'react'

const Loader = (props) => {
    return props.on ? <div className="lds-ellipsis">
        <div/>
        <div/>
        <div/>
        <div/>
    </div> : null
};

export default Loader;
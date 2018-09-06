import React from 'react'

export const ItemInfo = (props) => {
    let item = props.item;
    return (
        <div>
            <hr/>
            <h3 className="text-center">{item.name}</h3>
            <h3 className="text-center"> {item.model}</h3>
            <p className="card-text desc-cart">{item.description}</p>
            <h5 className="card-text price-card">{item.price}$</h5>
            <div className="row text-center">
                {props.children}
            </div>
        </div>
    )
};
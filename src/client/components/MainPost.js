import React from 'react'
import {Link} from 'react-router-dom'

export const MainPost = (props) => {
    if (props.cards !== []) {
        return props.cards.map((item, key) => (
            <div className="col-lg-4 text-center card" key={key}>
                <Link to={{pathname: `/bicycle/${item._id}`}} className="">
                    <img className="card-img-top" src={item.photos[0]["path"]} alt={item.model + " " + item.name}/>
                    <div className="card-body">
                        <h5 className="card-title model-mark">{item.model}</h5>
                        <h6 className="card-title">{item.name}</h6>
                        <button className="btn btn-primary">View more</button>
                    </div>
                </Link>
            </div>
        ))
    }
};
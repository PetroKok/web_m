import React from 'react'
import {Link} from 'react-router-dom'

export const ListAdmin = (props) => {
    return props.item.map((item, key) => (
        <div className="card text-center" key={key}>
            <img className="card-img-top" src={item.photos[0]["path"]} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">
                    <Link to={{pathname: `/bicycle/${item._id}`}}>{item.name}</Link>
                </h5>
                <div className="row">
                    <div className="col">
                        <button onClick={() => props.remove(item._id)}
                                className="btn btn-danger width-100">REMOVE
                        </button>
                    </div>
                    <div className="col">
                        <button className="btn btn-warning width-100">EDIT
                        </button>
                    </div>
                </div>

            </div>
        </div>
    ))
}
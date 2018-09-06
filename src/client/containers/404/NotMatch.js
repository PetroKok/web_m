import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default class NotMatch extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="error-template align-content-center">
                            <h1>Oops!</h1>
                            <h2>404 Not Found</h2>
                            <Link to="/"><button className="btn btn-dark">Go home</button></Link>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
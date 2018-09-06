import React, {Component} from 'react'

class Search extends Component {

    constructor(){
        super();
        this.state = {
            val: ""
        };
        this.getValue = this.getValue.bind(this)
    }

    getValue(e){
        this.props.value(e.target.value);
    }

    render() {
        return (
            <div className="input-group">
                <input onChange={this.getValue} type="text" className="form-control" aria-label="Text input with segmented dropdown button"/>
                <div className="input-group-append">
                    <button type="button" className="btn btn-outline-secondary">Search</button>
                    <button type="button"
                            className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="sr-only"/>
                    </button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Random music</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;
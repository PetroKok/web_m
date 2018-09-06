import React from 'react'
import ReactDOM from 'react-dom'

export class ImageView extends React.Component {

    componentWillMount() {
        this.root = document.createElement("div");
        document.body.appendChild(this.root);
    }

    componentWillUnmount() {
        document.body.removeChild(this.root);
    }

    render() {
        return ReactDOM.createPortal(
            <div>
                <div className="modal-window" onClick={this.props.onClose}>
                </div>
                <div className="modal-info">
                    {this.props.children}
                </div>
            </div>
            ,
            this.root
        )
    }
}
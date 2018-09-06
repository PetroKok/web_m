import React, {Component} from 'react';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {registerUser} from '../../actions/authentication'

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit() {
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        };
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.userAuth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="container mt-5" style={{ width: '700px'}}>
                <h2 style={{marginBottom: '40px'}}>Registration</h2>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        className="form-control"
                        name="name"
                        onChange={this.handleInputChange}
                        value={this.state.name}
                    />
                    { errors.name !== "" ? <div className="invalid-feedback" style={{display: "block"}}>{errors.name}</div> : null}
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        name="email"
                        onChange={this.handleInputChange}
                        value={this.state.email}
                    />
                    { errors.email !== "" ? <div className="invalid-feedback" style={{display: "block"}}>{errors.email}</div> : null}
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        name="password"
                        onChange={this.handleInputChange}
                        value={this.state.password}
                    />
                    { errors.password !== "" ? <div className="invalid-feedback" style={{display: "block"}}>{errors.password}</div> : null}
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="form-control"
                        name="password_confirm"
                        onChange={this.handleInputChange}
                        value={this.state.password_confirm}
                    />
                    { errors.password_confirm !== "" ? <div className="invalid-feedback" style={{display: "block"}}>{errors.password_confirm}</div> : null}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
                        Register User
                    </button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errors,
        userAuth: state.userAuth
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({registerUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
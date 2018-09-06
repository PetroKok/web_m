import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {loginUser} from '../../actions/authentication'

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        if(this.props.userAuth.isAuthenticated){
            this.props.history.push('/')
        }
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

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginUser(user, this.props.history)
    }

    render() {
        let { errors } = this.state;
        return (
            <div className="container" style={{marginTop: '50px', width: '700px'}}>
                <h2 style={{marginBottom: '40px'}}>Login</h2>
                <form>
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
                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
                            Login User
                        </button>
                    </div>
                </form>
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
    return bindActionCreators({loginUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
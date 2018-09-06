import React from 'react'
import AdminMusic from './Admin'
import AdminBicycles from './adminBicycles'

class AdminLayout extends React.Component{

    componentWillReceiveProps(nextProps){
        if(!nextProps.userAuth.isAuthenticated || nextProps.userAuth.user.name !== "Admin") {
            this.props.history.push('/')
        }
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <AdminMusic/>
                    </div>
                    <div className="col">
                        <AdminBicycles/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminLayout;
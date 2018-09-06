import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
//---------------------COMPS
import NavBar from './components/NavBar'
import NotMatch from "./containers/404/NotMatch";
import Home from './containers/Home/Home'
import Register from "./containers/Auth/Register";
import Login from "./containers/Auth/Login";
import Music from './containers/Music/Music'
import Goods from "./containers/Goods/Goods";
import Player from './components/Player'
import AdminLayout from './containers/Admin/AdminLayout'
//----------STYLES-----------
import '../../public/css/bootstrap.min.css'
import '../../public/css/styles.css'
//---------------------------
class App extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/music" component={Music}/>
                    <Route path="/admin" component={AdminLayout}/>
                    <Route path="/bicycle/:id" component={Goods}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route component={NotMatch}/>
                </Switch>
                <Player/>
            </div>

        )
    }
}

export default App;
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getMusic, resetCurrent, setCurrent} from '../../actions/musicAction'
import MusicList from '../../components/musicList'
import Layout from "../../components/Layout";

class Music extends Component {

    constructor() {
        super();
        this.state = {
            cur: 0
        };
    }

    render() {
        return (
           <Layout>
               <MusicList music={this.props.music} add={this.props.setCurrent} clear={this.props.resetCurrent}
                          getMusic={this.props.getMusic} img={this.props.current.img}/>
           </Layout>
        )
    }
}

function mapStateToProps(state) {
    return {
        music: state.music,
        current: state.current
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getMusic, setCurrent, resetCurrent}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Music);
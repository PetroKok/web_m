import React, {Component} from 'react';
import Sound from 'react-sound'
import {getMusic, resetCurrent, setCurrent} from "../actions/musicAction";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import current from "../reducers/current";

class Player extends Component {

    constructor() {
        super();
        this.state = {
            status: Sound.status.STOPPED,
            position: 0,
            progress: "0",
            play: "/public/files-photo/play.png",
            isHidden: false,
            changeFirst: 0
        };
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.handleSongPlaying = this.handleSongPlaying.bind(this);
        this.getPosition = this.getPosition.bind(this);
        this.next_prev = this.next_prev.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({position: 0});
        if (this.state.status === Sound.status.PAUSED){
            this.setState({status: Sound.status.PLAYING});
            this.setState({play: '/public/files-photo/pause.png'})
        }
    }

    componentWillMount() {
        if(this.props.music.length < 1)
            this.props.getMusic();
    }

    handleSongPlaying(e) {
        if (this.state.status === Sound.status.PLAYING) {
            this.state.position = e.position;
            this.setState({progress: (e.position * 100) / e.duration})
        }
    }

    next_prev(e) {
        let music = this.props.music;
        let path = this.props.current.path;

        for (let i = 0; i < music.length; i++) {
            if (music[i]['path'] === path) {
                if (e < 0 && i === 0) {
                    i = music.length - 1;
                    this.props.setCurrent(music[i]);
                } else if (e > 0 && i === music.length - 1) {
                    this.props.setCurrent(music[0]);
                } else {
                    this.props.setCurrent(music[i + e]);
                }

            }
        }
    }

    handleSongFinishedPlaying() {
        this.next_prev(1)
    }

    play() {
        if (this.state.status === Sound.status.PLAYING) {
            this.setState({status: Sound.status.PAUSED});
            this.setState({play: '/public/files-photo/play.png'})
        } else if (this.state.status === Sound.status.STOPPED) {
            this.setState({status: Sound.status.PLAYING});
            this.setState({play: '/public/files-photo/pause.png'})
        } else {
            this.setState({status: Sound.status.PLAYING});
            this.setState({play: '/public/files-photo/pause.png'})
        }
    }

    stop() {
        this.setState({status: Sound.status.STOPPED});
        this.state.position = 0;
    }

    getPosition(e) {
        let windowX = window.innerWidth;
        let clientX = e.clientX;
        let duration = (100 * this.state.position) / this.state.progress;
        let res = (clientX * duration) / windowX;
        this.setState({position: res});
        this.setState({progress: (res * 100) / duration})
    }

    controls() {
        return (
            <div className="col panel">
                <div className="row">
                    <div className="progress" onClick={e => this.getPosition(e)}>
                        <div className="progress-bar bg-dark" role="progressbar"
                             style={{width: this.state.progress + "%"}}
                             aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                            <p className="title-music">{this.props.current.title.slice(0, -4) || ""}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="text-center posit-control row2">
                        <img onClick={() => this.next_prev(-1)} src="/public/files-photo/prev.png"
                             className="m-0 control-panel"/>
                        <img src={this.state.play} className="m-0 control-panel" onClick={this.play}/>
                        <img onClick={() => this.next_prev(1)} src="/public/files-photo/prev.png"
                             className="m-0 control-panel next"/>
                        <img src="/public/files-photo/stop.png" className="m-0 control-panel" onClick={this.stop}/>
                    </div>
                </div>

            </div>
        )
    }

    render() {
        return (
            <div className="bg-light player">
                {
                    this.controls()
                }
                <Sound
                    url={"/"+this.props.current.path || ""}
                    playStatus={this.state.status}
                    position={this.state.position}
                    playFromPosition={this.state.position}
                    onLoading={this.handleSongLoading}
                    onPlaying={this.handleSongPlaying}
                    onFinishedPlaying={() => this.handleSongFinishedPlaying()}
                />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Player);
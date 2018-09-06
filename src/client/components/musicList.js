import React, {Component} from 'react'
import Search from "./Search";
import Loader from "./Loader";

class MusicList extends Component {

    constructor() {
        super();
        this.state = {
            music: [],
            data: undefined,
            value: ''
        };
        this.makeList = this.makeList.bind(this);
        this.makePlay = this.makePlay.bind(this);
        this.filterList = this.filterList.bind(this);

    }

    filterList(e) {
        let updateList = this.props.music;
        updateList = updateList.filter(item => {
            return item.title.toLowerCase().search(e.toLowerCase()) !== -1;
        });
        this.setState({data: updateList});
        console.log(this.state.data);
    }

    makePlay(path) {
        this.props.add(path);
    }

    makeList(data) {
        if (data === "LOADING") {
            return <Loader on="true"/>
        } else if (data === "FAILURE") {
            return <li>FAILURE</li>
        } else if (data) {
            return data.map((mus, k) => (
                <li className="list-group-item list-group-item-action cursor-active li-play"
                    key={k}>
                    <img src={mus.img} className="btn-play rounded-circle" style={{marginRight: -40}}/>
                    <img src="/public/files-photo/play-white.png" className="btn-play" onClick={() => this.makePlay(mus)}/>
                    {mus.title.slice(0, -4)}
                </li>
            ))
        } else {
            return <li></li>
        }
    }

    render() {
        return (
            <div>
                <Search value={this.filterList}/>
                <ul className="list-group pt-4">
                    {this.makeList(this.state.data || this.props.music)}
                </ul>
            </div>
        )
    }
}

export default MusicList;
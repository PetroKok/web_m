import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {MainPost} from "../../components/MainPost";
import {Carousel} from "../../components/Carousel";
import {URL} from '../../url'
import Loader from '../../components/Loader'

class Home extends Component {

    constructor() {
        super();
        this.state = {
            cards: [],
            posts: [],
            date: new Date().getFullYear()
        };
        this.listinfo = this.listinfo.bind(this);

    }

    componentWillMount() {
        fetch(URL+'/bicycles/3/0', {
            method: "POST"
        })
            .then(r => r.json())
            .then(d => {
                this.setState({cards: d});
            });
        fetch(URL+'/bicycles/3/3', {
            method: "POST"
        })
            .then(r => r.json())
            .then(d => {
                this.setState({posts: d});
            });
    }

    listinfo() {
        if (this.state.posts !== []) {
            return this.state.posts.map((post, key) =>
                <div key={key}>
                    <div className="row featurette" key={key}>
                        <div className="col-md-7">
                            <img className="featurette-image img-fluid mx-auto"
                                 alt="500x500"
                                 src={post.photos[0]["path"]}
                                 data-holder-rendered="true"/>
                        </div>
                        <div className="col-md-5">
                            <h2 className="featurette-heading">{post.model} <span
                                className="text-muted"><Link to={{pathname: `/bicycle/${post._id}`}}>{post.name}</Link></span>
                            </h2>
                            <p className="lead" style={{fontSize: 15}}>{post.description}</p>
                        </div>
                    </div>
                    <hr className="featurette-divider"/>
                </div>
            )
        } else {
            return <Loader on="true"/>
        }
    }

    render() {
        return (
            <main role="main">
                <Carousel/>
                <div className="col bg-dark">
                </div>
                <div className="container marketing mt-2">
                    <div className="row card-deck">
                        {<MainPost cards={this.state.cards}/> || <Loader on="true"/>}
                    </div>
                    <hr className="featurette-divider"/>
                    {this.listinfo()}
                </div>

                <footer className="container">
                    <p className="float-right"><a href="#">Back to top</a></p>
                    <p>© {this.state.date} Company, Inc.</p>
                </footer>
            </main>
        )
    }
}

export default Home;
//------------MODULES
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
//-----------ACTIONS---
import {getItems} from '../../actions/adminPostActions'
//-----------COMPONENTS
import Dropzone from 'react-dropzone'
import {ListAdmin} from '../../components/ListAdmin'
import axios from "axios";

class AdminBicycles extends Component {

    constructor() {
        super();
        this.state = {
            filesToBeSent: [],
            loadingFiles: null,
            printCount: 10,
            process: "",
            posts: [],
            //-----
            name: "",
            model: "",
            price: 0,
            description: ""
        };
        this.handle = this.handle.bind(this);
        this.name = this.name.bind(this);
        this.price = this.price.bind(this);
        this.description = this.description.bind(this);
        this.model = this.model.bind(this);
        this.load = this.load.bind(this);
        this.clearArchive = this.clearArchive.bind(this);
    }

    componentWillMount() {
        this.load();
    }

    load() {
        this.props.getItems(0, 0);
    }

    list() {
        if (this.props.item === "LOADING") {
            return "LOADING"
        } else if (this.props.item === "FAILURE") {
            return "FAILURE"
        } else {
            return <ListAdmin item={this.props.item} remove={(id) => this.removeBicycle(id)}/>
        }
    }

    onDrop(acceptedFiles) {
        if (acceptedFiles.length < this.state.printCount) {
            this.setState({printCount: this.state.printCount - acceptedFiles.length});
            for (let i in acceptedFiles) {
                this.state.filesToBeSent.push(acceptedFiles[i]);
            }
            console.log(this.state.filesToBeSent)
        } else {
            alert("You've reached the limit of uploaded files")
        }
    }

    removeBicycle(id) {
        if(this.props.userAuth.isAuthenticated){
            if(this.props.userAuth.user.id === "5b7c7d0764d09c13b4346d82"){
                fetch("/remove-bicycle/" + id, {
                    method: "POST"
                })
                    .then(r => r.json())
                    .then(data => {
                        if (data === 200) {
                            this.setState({posts: []});
                            this.load();
                        }
                    })
            }
        } else {
            alert("SORRY, you have no rights to delete the object!")
        }
    }

    clearArchive() {
        this.setState({filesToBeSent: [], name: "", model: "", price: 0, description: "", printCount: 10})
    }

    handle(e) {
        e.preventDefault();
        if (this.state.filesToBeSent.length > 0) {
            const data = new FormData();
            let files = this.state.filesToBeSent;
            console.log(files);

            for (let i in files) {
                data.append(files[i].name, files[i]);

            }
            data.append("name", this.state.name);
            data.append("model", this.state.model);
            data.append("price", this.state.price);
            data.append("description", this.state.description);

            fetch('/upload-bicycle', {
                method: 'POST',
                body: data
            })
                .then(res => res.json())
                .then(body => {
                    if (body === "200") {
                        this.clearArchive();
                    }
                });
            this.clearArchive();
        } else {
            alert('Choose some files!')
        }
    }

    name(e) {
        this.setState({name: e.target.value});
    }

    model(e) {
        this.setState({model: e.target.value});
    }

    price(e) {
        this.setState({price: e.target.value});
    }

    description(e) {
        this.setState({description: e.target.value});
    }

    render() {
        return (
            <div className="container">
                <div className="col">
                    <form className="form-enter">
                        <h2 className="text-justify row">Add new item</h2>
                        <div className="row">
                            <div className="form-group mr-2">
                                <input onChange={this.name} type="text" className="form-control"
                                       placeholder="Enter name" value={this.state.name}/>
                            </div>
                            <div className="form-group mr-2">
                                <input onChange={this.model} type="text" className="form-control"
                                       placeholder="Enter model" value={this.state.model}/>
                            </div>
                            <div className="form-group mr-2">
                                <input onChange={this.price} type="text" className="form-control"
                                       placeholder="Price" value={this.state.price}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group mr-4">
                                <textarea cols="50" rows="8" onChange={this.description} className="form-control"
                                          placeholder="Enter description" value={this.state.description}/>
                            </div>
                            <Dropzone onDrop={files => this.onDrop(files)}>
                                <div className="dropzone ml-4">
                                    Try dropping some photos here!
                                </div>
                            </Dropzone>
                        </div>
                        <button onClick={this.handle} className="btn btn-primary mt-3">Save</button>
                    </form>
                </div>
                <hr/>
                <div className="col">
                    <div className="list-admin-bikes">
                        <span onClick={this.load} className="update-btn"><img src="/public/ico/refresh.png" alt=""/></span>
                        {this.list()}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        item: state.item,
        userAuth: state.userAuth
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getItems}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminBicycles);

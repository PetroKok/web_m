//------------MODULES
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import axios from 'axios'
//-----------ACTIONS---
import {getMusic} from '../../actions/musicAction'
//-----------COMPONENTS
import Dropzone from 'react-dropzone'
import Layout from "../../components/Layout";
import Loader from '../../components/Loader'


class Admin extends Component {

    constructor() {
        super();
        this.state = {
            filesToBeSent: [],
            printCount: 2,
            mus: [],
            loadingFiles: null
        };
        this.handle = this.handle.bind(this);
        this.renderList = this.renderList.bind(this);
        this.remove = this.remove.bind(this);
    }

    remove(id) {
        if(this.props.userAuth.isAuthenticated){
            if(this.props.userAuth.user.id === "5b7c7d0764d09c13b4346d82"){
                axios.post(`/remove/${id}`)
                    .then(data => {
                        console.log(data.data);
                        this.props.getMusic();
                    })
            }

        } else {
            alert("SORRY, you have no rights to delete the object!")
        }
    }

    componentWillMount() {
        if (!this.props.music.length) {
            this.props.getMusic();
        }
    }

    onDrop(acceptedFiles) {
        console.log(acceptedFiles);
        if (acceptedFiles.length <= this.state.printCount) {
            this.setState({printCount: this.state.printCount - acceptedFiles.length});
            for (let i in acceptedFiles) {
                this.state.filesToBeSent.push(acceptedFiles[i]);
            }
            console.log(this.state.filesToBeSent)
        } else {
            alert("You've reached the limit of uploaded files")
        }
    }

    handle() {
        console.log(this.state.filesToBeSent.length);
        if (this.state.filesToBeSent.length > 0) {
            const data = new FormData();
            let files = this.state.filesToBeSent;
            console.log(files);

            for (let i in files) {
                data.append(files[i].name, files[i]);
            }

            // data.append("name", "banzai - more people");

            fetch('/upload-files', {
                method: 'POST',
                body: data
            })
                .then(res => res.json())
                .then(body => {
                    if (body === "200") {
                        console.log("Saved!");
                        this.props.getMusic();
                        this.setState({printCount: 2, filesToBeSent: []})
                    }
                })

        } else {
            alert('Choose some files!')
        }
    }

    renderList() {
        let data = this.props.music;
        if (data === "LOADING") {
            return <Loader on="true"/>
        } else if (data === "FAILURE") {
            return <li>FAILURE</li>
        } else if (data !== []) {
            return data.map((m, k) => (
                <li key={k}>
                    <button className="btn btn-sm btn-danger" onClick={() => this.remove(m._id)}>REMOVE</button>
                    {m.path}
                </li>
            ))
        }
    }

    render() {
        return (
            <Layout>
                <Dropzone onDrop={files => this.onDrop(files)}>
                    <div>
                        Try dropping some files here!
                    </div>
                </Dropzone>
                <button onClick={this.handle}>Send files</button>
                <button onClick={this.click}>get</button>
                <hr/>
                <ul>
                    {this.renderList()}
                </ul>
            </Layout>
        )
    }
}

function mapStateToProps(state) {
    return {
        music: state.music,
        current: state.current,
        userAuth: state.userAuth
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getMusic}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)

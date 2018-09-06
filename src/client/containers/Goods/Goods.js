import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getSelected} from '../../actions/itemsAction'
import {addToCart} from '../../actions/shopCart'
import {Carousel} from "../../components/Carousel";
import {ItemInfo} from "../../components/item-info";
import {ImageView} from '../../components/image-view'

class Goods extends Component {

    constructor() {
        super();
        this.state = {
            arr: [],
            photo: '',
            toggle: false
        };
        this.toggle = this.toggle.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    componentWillMount() {
        this.props.getSelected(this.props.match.params.id);
    }

    toggle(){
        this.setState({toggle: !this.state.toggle})
    }

    addToCart() {
        let Item = {
            item: this.props.selected._id,
            user: this.props.userAuth.user.id
        }
        console.log(Item);
        this.props.addToCart(Item, this.props.shopCart)
    }


    render() {
        let item = this.props.selected;
        if (item === "LOADING") {
            return "LOADING"
        } else if (item === "FAILURE") {
            return "FAILURE"
        } else if (item._id === this.props.match.params.id) {
            return (
                <div className="col text-center">
                    <div className="row">
                        <div className="col-lg-6">
                            <hr/>
                            <img onClick={this.toggle} src={"/"+item.photos[0]["path"]} className="goods-image"/>
                            {
                                this.state.toggle &&
                                <ImageView onClose={this.toggle}>
                                    <Carousel data={item.photos}/>
                                </ImageView>
                            }
                        </div>
                        <div className="col-lg-6">
                            <ItemInfo item={item}>
                                <button className="btn btn-success mr-4 item-btn">Buy</button>
                                <button onClick={this.addToCart} className="btn btn-primary item-btn">Add to cart</button>
                            </ItemInfo>
                        </div>
                    </div>
                    <hr/>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

function mapStateToProps(state) {
    return {
        selected: state.selected,
        userAuth: state.userAuth,
        shopCart: state.shopCart
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getSelected, addToCart}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Goods);
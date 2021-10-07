import React, { Component } from 'react';
import formatCurrency from "../util";
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import {connect} from "react-redux";
import {fetchProducts} from "../actions/productActions";
import {addToCart} from "../actions/cartActions";

class Products extends Component { //class based component, using addToCart in products.js --- assigned addToCart in Product div in app.js
    constructor(props) { //setting modal for animation --- initial state of product (null)
        super(props);
        this.state = {
            product: null,
        };
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    openModal = (product) => {
        this.setState({product}); //filling the state of product with selected product
    };

    closeModal = (product) => {
        this.setState({product:null}); //setting product to null when closing modal
    };
    
    render() {
        const { product } = this.state;
        return (
            <div>

                <Fade bottom cascade> 
                    {
                        !this.props.products ? (<div>Loading...</div>) : //if no products, will just show loading
                    

                        ( <ul className="products">

                            {this.props.products.map((product) => ( //will error if no products yet, make conditional above

                                <li key={product._id}>
                                    <div className="product">
                                        <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                                            <img src={product.image} alt={product.title}></img>
                                            <p>
                                                {product.title}
                                            </p>
                                        </a>
                                    

                                        <div className="product-price">
                                            <div>
                                                {formatCurrency(product.price)}
                                            </div>
                                            <button onClick={() => this.props.addToCart(product)} className="button primary"> 
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>
                                </li>


                            ))} 

                        </ul> )
                     }

                </Fade>

                {
                    product && ( //if product exists, then show modal component
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className="close-modal" onClick={this.closeModal}> x </button>
                                <div className="product-details">
                                    <img src={product.image} alt={product.title}></img>
                                    <div className="product-details-description">
                                        <p>
                                            <strong>{product.title}</strong>
                                        </p>
                                        <p>
                                            <strong>{product.description}</strong>
                                        </p>
                                        <p>
                                            Available Sizes:{" "}
                                            {product.availableSizes.map(x=>(
                                                <span>
                                                    {" "}
                                                    <button className="button">{x}</button>
                                                </span>    
                                            ))}
                                        </p>

                                        <div className="product-price">
                                            <div>{formatCurrency(product.price)}</div>
                                            <button className="button primary" onClick={()=>{
                                                this.props.addToCart(product);
                                                this.closeModal();
                                            }}>
                                                Add To Cart
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }

            </div>
        );
    }
}

export default connect((state)=>({products: state.products.filteredItems}), {
    fetchProducts,
    addToCart
})(Products);

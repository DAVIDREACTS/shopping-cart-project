import React from "react";
//import data from "./data.json";
import Products from "./components/products";
import Filter from "./components/filter";
import Cart from "./components/cart";
import store from "./store";
import { Provider } from "react-redux";


class App extends React.Component { //class component

  //state initializations
  // constructor() {
  //   super();
  //   this.state = {
  //     //products: data.products,
  //     cartItems: localStorage.getItem("cartItems") 
  //     ? JSON.parse(localStorage.getItem("cartItems")) 
  //     : [], //initial state of cart items 
  //     //size:"",
  //     //sort:"",
  //   };
  // }

  // COMING FROM REDUX STORE
  // createOrder = (order) => {
  //   alert("Need to save order for " + order.name); //need to pass it below in cart component to be used as a prop and passed to cart.js
  // };

  // COMING FROM REDUX STORE
  // removeFromCart = (product) => {
  //   const cartItems = this.state.cartItems.slice();
  //   this.setState({
  //     cartItems: cartItems.filter(x=>x._id !== product._id)
  //   })
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x=>x._id !== product._id))); //updating cart items
  // }

  // addToCart = (product) => {
  //   const cartItems = this.state.cartItems.slice(); //clone copy of cart items in state

  //   let alreadyInCart = false;

  //   cartItems.forEach((item) => {
  //     if(item._id === product._id) {
  //       item.count++;
  //       alreadyInCart=true;
  //     }
  //   });

    // if(!alreadyInCart) {
    //   cartItems.push({...product, count: 1}); //use spread operator to include the entire product at the count of 1
    // }

  //   this.setState({cartItems}); //updating state after adding to cart

  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // };

  //ADDED REDUX ACTION

  // sortProducts = (event) => {

  //     const sort = event.target.value;
  //     console.log(event.target.value);
  //     this.setState((state) => ({
  //       sort: sort,
  //       products: this.state.products.slice().sort((a,b) => 

  //         sort === "lowest" ? a.price > b.price ? 1: -1: //lowest to highest
  //         sort === "highest"? a.price < b.price ? 1: -1:  //highest to lowest
  //         a._id < b._id ? 1:-1

  //       ),
  //     }));
  // };
    
  //ADDED REDUX ACTION

  // filterProducts = (event) => { //method function --- access 'this'
  //   console.log(event.target.value);
  //   if (event.target.value === ""){ //empty, setting initial state

  //     this.setState({size: event.target.value, products: data.products}); 

  //   } else {

  //     this.setState({
  //       size: event.target.value,
  //       products: data.products.filter((product) => product.availableSizes.indexOf(event.target.value)>=0), //makings sure there's the value in size array
  //     });

  //   }
  // };

  render() {
    return ( //wrapping it all in a store
      <Provider store={store}>
        <div container="grid-container">
          <header>
            <a href="/">Shopping Cart Project</a>
          </header>

          <main>
            <div className="content">

              <div className="main">
                <Filter 
                  // coming from redux store
                  // count={this.state.products.length}
                  // size={this.state.size}
                  // sort={this.state.sort}
                  // filterProducts={this.filterProducts}
                  // sortProducts={this.sortProducts}
                  >
                </Filter>
                <Products //products={this.state.products} --- coming from redux store
                //addToCart={this.addToCart} -- coming from redux store
                ></Products>  
              </div>

              <div className="sidebar">

                <Cart 
                //cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder} --- coming from redux store
                />

              </div>
              
            </div> 
          </main>

          <footer>
            All rights are reserved
          </footer>
        </div>
      </Provider>
    );
  }
}

export default App;

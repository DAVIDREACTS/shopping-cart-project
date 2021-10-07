const express = require('express');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');

const app = express();
//app.use(bodyParser.json()); --- deprecated
app.use(express.urlencoded({extended:true}));
app.use(express.json()); //substitute for bodyParser

mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
});

const Product = mongoose.model( //creating product model
    "products",
    new mongoose.Schema({
        _id : {type: String, default: shortid.generate }, //new id created and assigned to _id
        title: String,
        description: String,
        image: String,
        price: Number,
        availableSizes: [String],
    })
);

app.get("/", function (req, res) {
    res.send('SHOW SOMETHING');
});

app.get("/api/products", async (req, res)=>{
    const products = await Product.find({}); //getting products
    res.send(products);
});

app.post("/api/products", async (req, res)=>{
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save(); //saving product to database
    res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res)=>{
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});

const Order = mongoose.model("order", new mongoose.Schema({ //createdAt and updatedAt
       _id:{
            type: String,
            default: shortid.generate,
        },
        email: String,
        name: String,
        address: String,
        total: Number,
        cartItems: [{
            _id: String,
            title: String,
            price: Number,
            count: Number,
        },
    ],
},
        {
            timestamps: true,
        }
    )
);

app.post("/api/orders", async(req, res)=>{
    if (!req.body.name ||
        !req.body.email ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems
        ) {
            return res.send({message: "Data is required."}); //if at least one of the fields is missing
        }
    const order = await Order(req.body).save();
    res.send(order);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));
// backend/seed.js
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb+srv://anwarfarhan339_db_user:cannonx100@cluster0.jt15riq.mongodb.net/?appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

const sampleProducts = [
 // Example product objects
{
  name: "Slim Fit Black Formals",
  type: "Pants",
  description: "Stretch denim, comfortable all-day wear.",
  price: 799,
  imageUrl: "/pant1.png"
},
{
  name: "Black Shirt",
  type: "Shirt",
  description: "Stretch denim, comfortable all-day wear.",
  price: 799,
  imageUrl: "/shirt1.png"
},
{
  name: "Formal Shirt",
  type: "Shirt",
  description: "Stretch denim, comfortable all-day wear.",
  price: 799,
  imageUrl: "/shirt2.png"
},
{
  name: "Black Shoes",
  type: "Shoes",
  description: "Stretch denim, comfortable all-day wear.",
  price: 799,
  imageUrl: "/shoes1.png"
},
{
  name: "Cap",
  type: "Cap",
  description: "Stretch denim, comfortable all-day wear.",
  price: 799,
  imageUrl: "/cap1.png"
},
{
  name: "White Shorts",
  type: "Short",
  description: "Stretch denim, comfortable all-day wear.",
  price: 799,
  imageUrl: "/short1.png"
},

];

Product.insertMany(sampleProducts)
  .then(() => {
    console.log('Sample products inserted!');
    mongoose.disconnect();
  });

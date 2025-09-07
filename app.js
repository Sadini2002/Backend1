const express = require('express');
const mongoose = require('mongoose');
const router = require('./Route/User_route'); 



const app = express();
app.use(express.json());


 const User_route = require('./Route/User_route');
 app.use("/users", User_route);




app.use("users",(req,res, next)=>{
    res.send("Hello from Backend");
});

mongoose.connect('mongodb://localhost:27017', )
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
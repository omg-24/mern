const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')
require('dotenv').config();
require('./Models/db')

const PORT = process.env.PORT || 3000;

app.get('/ping',(req, res) => {
    res.send("pong");
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/product',ProductRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
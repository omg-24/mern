const jwt = require('jsonwebtoken');
const express = require('express')
const cors = require('cors');
const app = express();
app.use(cors());

const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers['authorization'];

    if(!auth){
        return res.status(403)
           .json({message:"Unauthorized, JWT token is require"})

    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return  res.status(403)
          .json({message:'Unauthorized, JWT token wrong or expired'})
    }
}

module.exports= ensureAuthenticated;
const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
   .then(()=>{
      console.log('MongoDb Connected...')
   }).catch(()=>{
    console.log('MongoDb connection error')
   })
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const axios = require('axios');

app.get('/',async (req,res)=>{
    data= await axios.get('http://cricscore-api.appspot.com/csa?id=1144523');
    //console.log(data.data)
    res.json(data.data)
})
app.use(express.json())

app.listen(port, ()=>{
    console.log('srever is listening on port'+port)
})
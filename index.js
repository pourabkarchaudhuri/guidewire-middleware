var request = require('request')
var express = require('express')
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
const app = express()
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.get("/",(req,res)=>{
 
    res.send("Server is running successfully. Use /guidewire endpoint")
 
})
 
app.post('/guidewire', (req, res) => {
 
    console.log(req.body.VehModel)
    // res.send(req.body)
 
    var options = {
        method: 'POST',
        url: 'http://18.224.142.110:8280/pc/service/edge/quote/quote',
        headers:
        {
            'cache-control': 'no-cache',
            'Authorization': 'Basic c3U6Z3c=',
            'Content-Type': 'application/json'
        },
        body:
        {
            jsonrpc: '2.0',
            method: 'quickQuote_Ext',
            params:
                [{
                    DriverName: 'Name',
                    DriverAge: '34',
                    VehModel: req.body.VehModel,
                    VehMake: req.body.VehMake,
                    NumClaims: req.body.NumClaims,
                    NumConvictions: req.body.NumConvictions,
                    yearOfManufacture: req.body.yearOfManufacture,
                    VehicleCost: req.body.VehicleCost
                }]
        },
        json: true
    };
 
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
 
        console.log(body);
        res.send(body)
    });
 
})
 
app.listen(port,()=>{
    console.log("app listening on 8000")
})

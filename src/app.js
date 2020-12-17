const path = require('path')
const express = require('express');
const geocode = require('./utils/geocode')
const weather = require('./utils/weather');
const { Z_FIXED } = require('zlib');
const { send } = require('process');

const serveDir = path.join(__dirname, '../whatstheweather/dist/whatstheweather');

const app = express();

app.use(express.static(serveDir))

app.use(function(req,res, next){
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();

})

app.get('/help', (req, res) => {

    console.log("test");

    if(!req.query.address){
        res.send({
            error:'You must provide an address'
        })
    }else{
        geocode(req.query.address, (error, geocodeData) => {

           const latitude = geocodeData.latitude;
           const longitude = geocodeData.longitude;

           if(error){
               return res.send({
                   error: error
               })
           }
           else{
               weather(latitude , longitude, (error, weatherData)=>{
                   if(error){
                       console.log("error", error);
                       res.send({
                           error: error
                       })

                   }else{
                       console.log(weatherData);
                    //    console.log("test");

                       res.send({

                           location: geocodeData.location,
                           weather : weatherData
                       }
                    // console.log("test")
                       )

                   }

               })
           }

       })

    }

})

app.get('/help', (req, res) => {
    res.send('Help page')
})

app.get('/about', (req, res) => {
    res.send('About page')
})
app.get('/weather', (req, res) => {
})


app.listen(5000, () => {
    console.log("Server is up on port 5000");
})
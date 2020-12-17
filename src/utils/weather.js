const request = require('request')


//options and function when we have the data we wanted or there was an err

// request({url: url},(error, response) => {

//     const data= JSON.parse(response.body)
//     console.log(data.current);

// })

const weather = (latitude, longitude, callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=e4e7623ba47a297c577c49e8a66e09f4&query='+ latitude+','+ longitude+''
    console.log(url);

    request({url: url, json: true},(error, response) => {

        if(error){
            callback("Unable to connect to weather app", undefined);
        } else if(response.body.error){
            callback("Unable to find location on the weather, enter another location", undefined);
        }else{
            callback(undefined, "Current temperature is: " + response.body.current.temperature
                     + " but it feels like " + response.body.current.feelslike + "!")
        }
    })
}

module.exports = weather;
const request = require('request');


const geocode = (address,callback) =>{
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic3RlZmFudmVsa29za2kiLCJhIjoiY2tpb2M0dDZ1MWJoeDMxcWp2eDJjeHRkaCJ9.XiXbXGD-hDcTdRA-bgC0ow&limit=1'

    request({url: url2,json: true},(error, response) => {

        if(error){
                // console.log("Unable to connect to location");
                callback("Unable to connect to location", undefined)
        }else if(response.body.features.length ==0){
                callback("Try anoth er search, cannot find location",undefined);
        }else{
            callback(undefined,{
             latitude : response.body.features[0].center[1],
             longitude : response.body.features[0].center[0],
             location: response.body.features[0].place_name
            })
        }
    })
}
module.exports = geocode;